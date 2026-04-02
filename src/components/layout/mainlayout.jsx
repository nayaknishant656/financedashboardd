import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import Sidebar from './sidebar/sidebar'
// import Dashboard from '../../pages/dashboard/Dashboard'
export default function mainlayout() {
    return (
        <>
            <Header />
            <Sidebar />
            <Outlet />
        </>
    )
}
