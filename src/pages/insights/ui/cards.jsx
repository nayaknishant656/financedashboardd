import React from 'react'
import { FiTrendingUp, FiTrendingDown, FiTarget, FiChevronRight } from 'react-icons/fi'
import dashboardStats from '../../dashboard/data/dashboardStats.json'

export default function Cards() {
    const { past3MonthsSaved, past3MonthsSpent, potentialSavings } = dashboardStats.savingsInsights;

    const cardsData = [
        {
            title: "Net Profit (L3M)",
            amount: past3MonthsSaved,
            color: "text-success",
            bgColor: "bg-success/10",
            icon: <FiTrendingUp />,
            desc: "Net accumulation after tax & interest"
        },
        {
            title: "Op. Expenses (L3M)",
            amount: past3MonthsSpent,
            color: "text-danger",
            bgColor: "bg-danger/10",
            icon: <FiTrendingDown />,
            desc: "Total operational burn rate for Q1"
        },
        {
            title: "Projected Growth Capital",
            amount: potentialSavings,
            color: "text-primary",
            bgColor: "bg-primary/10",
            icon: <FiTarget />,
            desc: "Estimated reinvestment capacity"
        }
    ];

    return (
        <div className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cardsData.map((card, idx) => (
                    <div key={idx} className="bg-card p-4 rounded-2xl border border-divider shadow-sm group hover:border-primary transition-all duration-300 relative overflow-hidden">
                        {/* Decorative circle backdrop */}
                        <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${card.bgColor} opacity-20 group-hover:scale-125 transition-transform duration-500`}></div>

                        <div className="flex items-center space-x-4 relative">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-inner ${card.bgColor} ${card.color}`}>
                                {card.icon}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">{card.title}</span>
                                <div className="flex items-baseline space-x-1">
                                    <span className="text-xl font-black text-text-primary tracking-tight">
                                        ₹{card.amount.toLocaleString()}
                                    </span>
                                    <span className="text-[10px] font-bold text-text-secondary opacity-50 uppercase">INR</span>
                                </div>
                                <p className="text-[9px] font-bold text-text-secondary mt-1">{card.desc}</p>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between relative">
                            <div className="px-2 py-0.5 bg-background rounded-md border border-divider text-[8px] font-black uppercase text-text-secondary">
                                Q1 Fiscal Status
                            </div>
                            <FiChevronRight className="text-divider group-hover:text-primary transition-colors cursor-pointer" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
