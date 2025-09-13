'use client'

import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { config } from "../config";
import Modal from "./modal"
import Swal from "sweetalert2";

export default function Sidebar() {
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [level, setLevel] = useState('');
    const router = useRouter();
    const [isShow, setShowModal] = useState(false);
    
    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    useEffect( () => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const res = await axios.get(`${config.apiUrl}/user/info`, {
            headers: headers,
        })
        setName(res.data.name);
        setUserName(res.data.username)
        setLevel(res.data.level);
    }

    const handleLogout = () =>{
        localStorage.removeItem('token');
        router.push('/')
    }

    const handleSave = async () => {
        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'รหัสผ่านไม่ตรงกัน',
                text: 'กรุณาตรวจสอบรหัสผ่านอีกครั้ง',
            });
            return;
        }

        const payload = {
            name : name,
            username: username,
            password: password,
            level: level,
        }
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        await axios.put(`${config.apiUrl}/user/update`, payload, {
            headers: headers
        });

        
        fetchData();
        handleCloseModal();
    }

    return (
        <div className="bg-gray-600 h-screen w-64 fixed">
            <div className="p-5 bg-gray-700 text-white">
                <h1 className="font-bold text-2xl">Mobile Shop</h1>
                <div className="flex items-center gap-2 mt-3">
                    <i className="fa fa-user"></i>
                    <span className="w-full ">{name} : {level}</span>
                    <button className="bg-blue-600 rounded-full px-2 py-1" onClick={handleShowModal}>
                        <i className="fa fa-pencil"></i>
                    </button>
                    <button onClick={handleLogout} className="bg-red-600 rounded-full px-2 py-1">
                        <i className="fa fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>
            <div className="p-5 text-white">
                <div>
                    <Link rel="stylesheet" href="/backoffice/dashboard">
                        <i className="fa fa-tachometer-alt mr-2"></i> 
                        Dashboard
                    </Link>
                </div>
                <div>
                    <Link rel="stylesheet" href="/backoffice/buy" >
                        <i className="fa fa-shopping-cart mr-2"></i> 
                    ซื้อสินค้า
                    </Link>
                </div>
                <div>
                    <Link rel="stylesheet" href="/backoffice/sell" >
                        <i className="fa fa-dollar mr-2"></i> 
                    ขายสินค้า
                    </Link>
                </div>
                <div>
                    <Link rel="stylesheet" href="/backoffice/repair" >
                        <i className="fa fa-wrench mr-2"></i> 
                    ซ่อมสินค้า
                    </Link>
                </div>
                <div>
                    <Link rel="stylesheet" href="/backoffice/company" >
                        <i className="fa fa-building mr-2"></i> 
                    ข้อมูลร้าน
                    </Link>
                </div>
                <div>
                    <Link rel="stylesheet" href="/backoffice/user" >
                        <i className="fa fa-users mr-2"></i> 
                    ผู้ใช้งาน
                    </Link>
                </div>
            </div>
            <Modal title= "แก้ไขข้อมูลผู้ใช้งาน" isOpen={isShow} onClose={ handleCloseModal }>
                <div className="    ">
                    <div className="mt-3">ชื่อผู้ใช้</div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="ชื่อผู้ใช้" />
                    <div className="mt-3">username</div>
                    <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} className="form-control" placeholder="ชื่อผู้ใช้" />
                    <div className="mt-3">รหัสผ่าน</div>
                    <input type="text" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="รหัสผ่าน" />
                    <div className="mt-3">ยืนยันรหัสผ่าน</div>
                    <input type="text" onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" placeholder="รหัสผ่าน" />
                    <div className="mt-3">
                        <button className="btn" onClick={handleSave}> 
                            <i className="fa fa-save mr-2"></i>
                            บันทึก
                        </button>
                        <button className="btn" onClick={handleCloseModal}> 
                            <i className="fa fa-save mr-2"></i>
                            ยกเลิก
                        </button>
                    </div>
                    
                    
                </div>
            </Modal>
        </div>
    )
}