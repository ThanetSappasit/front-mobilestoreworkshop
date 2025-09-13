'use client'

import { useState } from "react"
import { config} from "../config"
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation"

export default function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleSignin = async () => {
        try {
            const payload = {
                username : username,
                password : password
            }
            const respone = await axios.post(`${config.apiUrl}/user/signIn`, payload)

            if (respone.data.token !== null) {
                localStorage.setItem('token', respone.data.token)
                router.push('/backoffice/dashboard')
            }else{
                Swal.fire({
                    title: 'ตรวจสอบ user',
                    text: 'ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง',
                    icon: 'warning',
                    timer: 2000
                })
            }
        } catch (error: any) {
            if (error.status === 401) {
                Swal.fire({
                    title: 'ตรวจสอบ user',
                    text: error.mesage,
                    icon: "warning"
                })
            }else{
                Swal.fire({
                    title: 'Error',
                    text: error.mesage,
                    icon: "error"
                })
            }
            
        }
    }

    return <div className="signin-container">
        <div className="signin-box">
            <h1 className="text-2xl font-bold">Sign in</h1>

            <div className="mt-4">Username</div>
            <input type="text" placeholder="enter your email" value={username} onChange={(e) => setUsername(e.target.value)} />
            <div className="mt-4">Password</div>
            <input type="text" placeholder="enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="mt-4" onClick={handleSignin}>
                Sign in 
                <i className=" fas fa-sign-in-alt ml-2"></i>
            </button>
        </div>
    </div>
}