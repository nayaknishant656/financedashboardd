import React from 'react'
import { FiCalendar, FiClock, FiActivity } from 'react-icons/fi'

export default function Insightsheader({ range, setRange }) {
    const ranges = [
        { id: 'day', label: 'Day', icon: <FiClock /> },
        { id: 'month', label: 'Month', icon: <FiCalendar /> },
        { id: 'year', label: 'Year', icon: <FiActivity /> }
    ];

    return (
        <div className="px-8 pt-8 pb-4 bg-background">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-2xl font-black text-text-primary tracking-tight uppercase italic">Strategic Insights</h1>
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mt-1">Real-time market analytics and trend forecasting</p>
                </div>

                <div className="flex bg-card border border-divider p-1 rounded-xl shadow-sm">
                    {ranges.map((r) => (
                        <button
                            key={r.id}
                            onClick={() => setRange(r.id)}
                            className={`flex items-center space-x-2 px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${range === r.id
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-background'
                                }`}
                        >
                            <span className="text-xs">{r.icon}</span>
                            <span>{r.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
