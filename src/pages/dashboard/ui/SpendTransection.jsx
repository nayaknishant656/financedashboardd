import React from 'react'
import { FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi'
import dashboardStats from '../data/dashboardStats.json'

export default function SpendTransection() {
    return (
        <div className="p-4 pt-1">
            <div className="bg-card p-6 rounded-2xl border border-divider shadow-sm min-h-[400px]">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[11px] font-black text-text-secondary uppercase tracking-widest leading-none">Recent Transactions</h3>
                    <button className="text-[10px] font-bold text-primary uppercase hover:underline">View All</button>
                </div>

                <div className="space-y-1">
                    {dashboardStats.transactionHistory.slice(0, 5).map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between py-3 px-2 hover:bg-background rounded-xl transition-all duration-200 group">
                            <div className="flex items-center space-x-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${tx.type === 'credit' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                                    }`}>
                                    {tx.type === 'credit' ? <FiArrowUpRight /> : <FiArrowDownLeft />}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-text-primary tracking-tight">{tx.company}</span>
                                    <span className="text-[10px] font-medium text-text-secondary uppercase">
                                        {tx.date} • {tx.category}
                                    </span>
                                </div>
                            </div>
                            <span className={`text-sm font-black ${tx.type === 'credit' ? 'text-success' : 'text-text-primary'
                                }`}>
                                {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
