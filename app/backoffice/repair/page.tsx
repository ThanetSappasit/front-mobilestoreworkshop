'use client'

import { useState } from "react"
import Modal from "../modal";
import Swal from "sweetalert2";
import axios from "axios";
import { config } from "@/app/config";

export default function RepairPage() {
    const [isShowModal, setIsShowModal] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [remark, setRemark] = useState('');
    const [id, setId] = useState(0);
    const [repairs, setRepaires] = useState([]);

    const handleOpenModal = () => {
        setIsShowModal(true);
        setId(id);
    }

    const handleCloseModal = () => {
        setIsShowModal(false);
    }

    const handleSave = async () => {
        try {
            const payload = {
                name: name,
                price: price,
                remark: remark
            }

            const res = await axios.post(`${config.apiUrl}/service/create`, payload)
            handleClearForm();
            handleCloseModal();
            
        } catch (error : any) {
            Swal.fire({
                icon: 'error',
                title: 'ผิดพลาด',
                text: error.message
            })
        }
    }

    const handleClearForm = () => {
        setName('');
        setPrice(0);
        setRemark('');
    }

    return (
        <div>
            <h1 className="content-header">งานบริการ</h1>
            <div>
                <button className="btn" onClick={handleOpenModal}>
                    <i className="fa-solid fa-plus mr-2"></i>
                    บันทึกงานบริการ
                </button>
            </div>
            <Modal isOpen={isShowModal} title="บันทึกงานบริการ" onClose={handleCloseModal} >
                <div>
                    <div>ชื่องานบริการ</div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <div className="mt-4">ราคา</div>
                    <input type="text" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                    <div className="mt-4">หมายเหตุ</div>
                    <input type="text" value={remark} onChange={(e) => setRemark(e.target.value)} />

                    <div className="mt-4">
                        <button className="btn" onClick={handleSave}>
                            <i className="fa-solid fa-save mr-2"></i>
                            บันทึก
                        </button>
                    </div>
                </div>
            </Modal>
        </div>

        

    )
} 