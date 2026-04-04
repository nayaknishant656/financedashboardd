import React from 'react'

export default function StatCard({ title, amount, change, isPositive }) {
    return (
        <div className="bg-card p-6 rounded-2xl border border-divider shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between group">
            <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">{title}</span>
                <div className={`flex items-center text-[10px] font-black px-2 py-1 rounded-full ${isPositive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                    }`}>
                    {change}
                </div>
            </div>
            <div className="flex flex-col">
                <h3 className="text-2xl font-black text-text-primary tracking-tight font-sans leading-none">{amount}</h3>
                <p className="text-[10px] text-text-secondary/60 font-medium mt-2">vs last 30 days</p>
            </div>
        </div>
    )
}
