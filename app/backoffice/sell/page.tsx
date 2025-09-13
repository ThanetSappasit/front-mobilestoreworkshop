'use client'

import { config } from "@/app/config";
import axios from "axios";
import { useEffect, useState } from "react"
import Swal from "sweetalert2";

export default function SellPage(){
    const [serial, setSerial] = useState('');
    const [price, setPrice] = useState(0);
    const [sells, setSells] = useState([]);
    const [id, setId] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    
    const handleSave = async () => {
        try {
            const payload = {
                serial: serial,
                price: price,
            }
            await axios.post(`${config.apiUrl}/sell/create`, payload);
            fetchData();
            Swal.fire({
                icon: 'success',
                title: 'ซื้อสินค้าสำเร็จ',
                timer: 2000
            })
        } catch (error : any) {
            if (error.response.status === 400) {
                Swal.fire({
                icon: 'error',
                title: 'ไม่พบรายการสินค้า',
                text: 'ไม่พบรายการสินค้า หรือไม่มีในสต็อก'
            })
            }else{
                Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: error.message
            })
            }
            
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const button = await Swal.fire({
                text: 'คุณต้องการลบรายการนี้หรือไม่?',
                title: 'ลบรายการขาย',
                icon: 'question',
                confirmButtonText: 'ยืนยัน',
                cancelButtonText: 'ยกเลิก',
            })
            if (button.isConfirmed) {
                await axios.delete(`${config.apiUrl}/sell/remove/${id}`);
                fetchData();
            }
        } catch (error : any) {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: error.message
            })
        }
    }

    const handleConfirm = async () => {
        try {
            const button = await Swal.fire({
                text: 'ยืนยันการขายหรือไม่',
                title: 'ยืนยันการขาย?',
                icon: 'question',
                confirmButtonText: 'ยืนยัน',
                cancelButtonText: 'ยกเลิก',
            })
            if (button.isConfirmed) {
                await axios.put(`${config.apiUrl}/sell/confirm`);
                fetchData();
            }
        } catch (error : any) {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: error.message
            })
        }
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/sell/list`);
            setSells(response.data);

            let total = 0;
            for (let i = 0; i < response.data.length; i++) {
                total += response.data[i].price;
            }
            
            setTotalAmount(total);
        } catch (error : any) {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: error.message
            })
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return(
        <div>
            <div className="content-header">ขายสินค้า</div>
            <div className="flex gap-2 items-end">
                <div className="w-full">
                    <div>serial</div>
                    <input type="text" className="form-control" onChange={(e) => setSerial(e.target.value)}/>
                </div>
                <div className="text-right">
                    <div>ราคา</div>
                    <input type="text" className="form-control" onChange={(e) => setPrice(Number(e.target.value))}   />
                </div>
                <div>
                    <button className="btn flex items-center" onClick={handleSave}>
                        <i className="fa-solid fa-save mr-2"></i>
                        บันทึก
                    </button>
                </div>
            </div>

            <table className="table mt-5">
                <thead>
                    <tr>
                        <th className="text-left">serial</th>
                        <th className="text-left">รายการสินค้า</th>
                        <th className="text-right pr-0">ราคา</th>
                        <th className="w-[50px]"></th>
                    </tr>
                </thead>
                <tbody>
                    {sells.map((item:any)=>(
                        <tr key={item.id}>
                            <td>{item.product.serial}</td>
                            <td>{item.product.name}</td>
                            <td className="text-right">{item.price}</td>
                            <td className="text-center">
                                <button className="btn-delete" onClick={() => handleDelete(item.id)}>
                                    <i className="fa-solid fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            {sells.length > 0 ? (
                <>
                    <div className="mt-5 flex justify-between">
                        <div>ยอดรวมทั้งหมด</div>
                        <div className="text-right font-bold bg-gray-300 p-2 rounded-md">{totalAmount.toLocaleString()}</div>
                    </div>

                    <div className="mt-5 text-center">
                        <button className="btn" onClick={handleConfirm}>
                            <i className="fa-solid fa-check mr-2"></i>
                            ยืนยันการขาย
                        </button>
                    </div>
                </>
            ): (
                <div className="mt-5 text-center text-gray-500">
                    ไม่มีรายการสินค้า
                </div>
            )}
        </div>
    )
}