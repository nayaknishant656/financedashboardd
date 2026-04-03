import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    FiGrid,
    FiCreditCard,
    FiPieChart,
    FiBox,
    FiSettings,
    FiLogOut
} from 'react-icons/fi'

export default function Sidebar() {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: <FiGrid /> },
        { name: 'Transactions', path: '/transactions', icon: <FiCreditCard /> },
        { name: 'Report & Insights', path: '/insights', icon: <FiPieChart /> },
        { name: 'Integration', path: '/integration', icon: <FiBox /> },
    ];

    return (
        <div className="flex flex-col h-full bg-sidebar py-4 text-sidebar-text font-sans">
            <div className="px-5 mb-8">
                <span className="text-sidebar-text/40 text-[10px] uppercase font-bold tracking-[0.2em]">Menu</span>
            </div>

            <nav className="flex-1 space-y-1 px-3">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <div className={`w-8 h-8 flex items-center justify-center rounded-md mr-3 transition-colors ${isActive ? 'bg-white/10' : 'text-sidebar-text group-hover:text-white'
                                }`}>
                                <span className="text-lg">{item.icon}</span>
                            </div>
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="px-5 mt-10 mb-4">
                <span className="text-sidebar-text/40 text-[10px] uppercase font-bold tracking-[0.2em]">System</span>
            </div>

            <div className="px-3 space-y-1">
                <Link to="/settings" className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-white/5 hover:text-white transition-all text-sidebar-text">
                    <div className="w-8 h-8 flex items-center justify-center rounded-md mr-3 transition-colors text-sidebar-text group-hover:text-white">
                        <span className="text-lg"><FiSettings /></span>
                    </div>
                    Settings
                </Link>
                <Link to="/logout" className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-danger/20 text-sidebar-text hover:text-danger transition-all">
                    <div className="w-8 h-8 flex items-center justify-center rounded-md mr-3 transition-colors text-sidebar-text group-hover:text-danger">
                        <span className="text-lg"><FiLogOut /></span>
                    </div>
                    Logout
                </Link>
            </div>
        </div>
    )
}
