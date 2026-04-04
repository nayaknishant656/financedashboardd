import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiBell, FiUser, FiLogOut, FiSettings, FiChevronDown } from 'react-icons/fi'

export default function Header() {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [showProfile, setShowProfile] = useState(false);

    const navLinks = [
        { name: 'Overview', path: '/' },
        { name: 'Analytics', path: '/analytics' },
        { name: 'Reports', path: '/reports' }
    ];

    return (
        <header className="bg-card border-b border-divider sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-[1600px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center space-x-8">
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                            F
                        </div>
                        <span className="text-xl font-bold text-text-primary tracking-tight">Finance<span className="text-primary">Hub</span></span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${location.pathname === link.path
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-background'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-4">
                    <button className="p-2 text-text-secondary hover:text-primary transition-colors relative">
                        <FiBell size={18} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-card"></span>
                    </button>

                    <div className="h-6 w-px bg-divider mx-2"></div>

                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowProfile(!showProfile)}
                                className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-background transition-all border border-transparent hover:border-divider"
                            >
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    <FiUser size={18} />
                                </div>
                                <div className="hidden sm:block text-left">
                                    <p className="text-[11px] font-black text-text-primary uppercase leading-tight">Admin User</p>
                                    <p className="text-[9px] font-bold text-text-secondary uppercase">Super Admin</p>
                                </div>
                                <FiChevronDown size={14} className={`text-text-secondary transition-transform ${showProfile ? 'rotate-180' : ''}`} />
                            </button>

                            {showProfile && (
                                <div className="absolute right-0 mt-2 w-48 bg-card border border-divider rounded-2xl shadow-xl overflow-hidden py-1 animate-in fade-in zoom-in duration-200">
                                    <button className="flex items-center w-full px-4 py-2.5 text-[10px] font-bold text-text-secondary uppercase hover:bg-background hover:text-primary transition-all">
                                        <FiUser className="mr-3" /> Profile Settings
                                    </button>
                                    <button className="flex items-center w-full px-4 py-2.5 text-[10px] font-bold text-text-secondary uppercase hover:bg-background hover:text-primary transition-all underline decoration-divider">
                                        <FiSettings className="mr-3" /> Account Config
                                    </button>
                                    <div className="border-t border-divider my-1"></div>
                                    <button
                                        onClick={() => setIsLoggedIn(false)}
                                        className="flex items-center w-full px-4 py-2.5 text-[10px] font-bold text-danger uppercase hover:bg-danger/10 transition-all"
                                    >
                                        <FiLogOut className="mr-3" /> Logout Audit
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsLoggedIn(true)}
                            className="px-5 py-2 bg-primary text-white text-[11px] font-black uppercase rounded-xl hover:opacity-90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-95"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </header>
    )
}
