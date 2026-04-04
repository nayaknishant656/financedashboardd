import React from 'react'
import StatCard from '../../../components/ui/StatCard'
import dashboardStats from '../data/dashboardStats.json'

export default function TopSectionDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {dashboardStats.summary.map((stat, index) => (
                <StatCard
                    key={index}
                    title={stat.title}
                    amount={stat.amount}
                    change={stat.change}
                    isPositive={stat.isPositive}
                />
            ))}
        </div>
    )
}
