import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiZap, FiCheckCircle } from 'react-icons/fi';

const Login = () => {
    const [selectedRole, setSelectedRole] = useState('User');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        login(selectedRole);
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-success/5 rounded-full blur-3xl"></div>

            <div className="w-full max-w-md bg-card border border-divider rounded-3xl shadow-2xl p-10 relative z-10">
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30">
                        <FiZap className="text-white text-3xl" />
                    </div>
                </div>

                <h1 className="text-3xl font-black text-text-primary text-center mb-2 tracking-tight uppercase">Quantra Finance</h1>
                <p className="text-[12px] font-bold text-text-secondary text-center uppercase tracking-widest mb-10">Select your authorization context</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <label
                            className={`relative flex flex-col items-center justify-center p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${selectedRole === 'User'
                                    ? 'border-primary bg-primary/5 shadow-inner'
                                    : 'border-divider bg-transparent hover:border-text-secondary/30'
                                }`}
                        >
                            <input
                                type="radio"
                                name="role"
                                value="User"
                                checked={selectedRole === 'User'}
                                onChange={() => setSelectedRole('User')}
                                className="sr-only"
                            />
                            <div className={`p-3 rounded-xl mb-3 ${selectedRole === 'User' ? 'bg-primary text-white' : 'bg-background text-text-secondary'}`}>
                                <FiUser className="text-xl" />
                            </div>
                            <span className={`text-[12px] font-black uppercase tracking-tighter ${selectedRole === 'User' ? 'text-primary' : 'text-text-secondary'}`}>Standard User</span>
                            {selectedRole === 'User' && <FiCheckCircle className="absolute top-3 right-3 text-primary text-sm animate-in fade-in" />}
                        </label>

                        <label
                            className={`relative flex flex-col items-center justify-center p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${selectedRole === 'Admin'
                                    ? 'border-primary bg-primary/5 shadow-inner'
                                    : 'border-divider bg-transparent hover:border-text-secondary/30'
                                }`}
                        >
                            <input
                                type="radio"
                                name="role"
                                value="Admin"
                                checked={selectedRole === 'Admin'}
                                onChange={() => setSelectedRole('Admin')}
                                className="sr-only"
                            />
                            <div className={`p-3 rounded-xl mb-3 ${selectedRole === 'Admin' ? 'bg-primary text-white' : 'bg-background text-text-secondary'}`}>
                                <FiZap className="text-xl" />
                            </div>
                            <span className={`text-[12px] font-black uppercase tracking-tighter ${selectedRole === 'Admin' ? 'text-primary' : 'text-text-secondary'}`}>Administrator</span>
                            {selectedRole === 'Admin' && <FiCheckCircle className="absolute top-3 right-3 text-primary text-sm animate-in fade-in" />}
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest py-4 rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98] mt-4 flex items-center justify-center group"
                    >
                        Access Dashboard
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-divider flex flex-col items-center">
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">Secure Authentication Gateway</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
