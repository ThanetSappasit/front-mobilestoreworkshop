'use client'
import { config } from "@/app/config";
import axios from "axios";
import { useEffect, useState } from "react"
import { BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import Swal from "sweetalert2";

export default function Page(){
    const [data, setData] = useState <any[]>([])
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalRepair, setTotalRepair] = useState(0)
    const [totalSale, setTotalSale] = useState(0)

    useEffect(() => {
        renderChart();
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const res = await axios.get(`${config.apiUrl}/dashboard/sum`)
            console.log(res.data);
            
            setTotalIncome(res.data.totalIncome._sum.price)
            setTotalRepair(res.data.totalRepair)
            setTotalSale(res.data.totalSale)
        } catch (error : any) {
            Swal.fire({
                title: 'error',
                text: error.message,
                icon: 'error'
            })
        }
    }

    const renderChart = () => {
        const months = [
            'มกราคม',
            'กุมภาพันธ์',
            'มีนาคม',
            'เมษายน',
            'พฤษภาคม',
            'มิถุนายน',
            'กรกฎาคม',
            'สิงหาคม',
            'กันยายน',
            'ตุลาคม',
            'พฤศจิกายน',
            'ธันวาคม'
        ];
        const data = months.map((month, index) => ({
            name: month,
            income: Math.floor(Math.random() * 10000)
        }));

        setData(data)
    }

    const box = (color: string, title: string, value: string) => {
        return (
            <div className={`flex flex-col gap-4 items-end w-full ${color} p-4 rounded-lg text-white`}>
                <div className="text-2xl font-bold">{title}</div>
                <div className="text-4xl font-bold">{value}</div>
            </div>
        )
    }

    return(
        <div>
            <div>
                <h1 className="content-header">Dashboard</h1>
                <div className="flex gap-4">
                    {box('bg-purple-600', 'ยอดขายทั้งหมด', totalIncome.toLocaleString() + ' บาท')}
                    {box('bg-purple-600', 'งานรับซ่อม', totalRepair.toLocaleString() + ' งาน')}
                    {box('bg-purple-600', 'รายการขาย', totalSale.toLocaleString() + ' รายการ')}
                </div>
                <div className="text-center mb-4 mt-5 text-xl font-bold">รายได้แต่ละเดือน</div>
                <div style={{width: '100%', height: 400}}>
                    <ResponsiveContainer>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray= "3 3" />
                            <XAxis dataKey="name"></XAxis>
                            <YAxis></YAxis>
                            <Tooltip formatter={(value: number) => ''}></Tooltip>
                            <Legend/>
                            <Bar dataKey="income" fill= "teal" opacity={0.5}></Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}