import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import Sidebar from './sidebar/sidebar'
// import Dashboard from '../../pages/dashboard/Dashboard'
export default function mainlayout() {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-background">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <aside className="w-64 bg-sidebar hidden md:flex flex-col border-r border-border shrink-0">
                    <Sidebar />
                </aside>
                <main className="flex-1 overflow-y-auto bg-background p-0">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
