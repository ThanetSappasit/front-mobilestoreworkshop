import { Children, ReactNode } from "react";
import Sidebar from "./sidebar";

export default function BackofficeLayout({children}: { children : ReactNode}){
    return (
        <div className="flex">
            <Sidebar></Sidebar>
            <div className="flex-1 p-5 bg-gray-300 h-screen ml-64">
                <div className="bg-white p-5 rounded-lg shadow-lg shadow-gray-500">
                    {children}
                </div>
            </div>
        </div>
    )
}