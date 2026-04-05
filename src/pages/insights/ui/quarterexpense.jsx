import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function Quarterexpense() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                {
                    label: 'Quarterly Expenditures',
                    data: [540000, 325000, 702000, 620000],
                    backgroundColor: [
                        'rgba(37, 99, 235, 0.2)', // Primary Blue
                        'rgba(16, 185, 129, 0.2)', // Success Green
                        'rgba(245, 158, 11, 0.2)', // Investment Orange
                        'rgba(139, 92, 246, 0.2)'  // Purple
                    ],
                    borderColor: [
                        'rgb(37, 99, 235)',
                        'rgb(16, 185, 129)',
                        'rgb(245, 158, 11)',
                        'rgb(139, 92, 246)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(203, 213, 225, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#64748B',
                        font: { size: 10, weight: 'bold' },
                        callback: (value) => `₹${value / 1000}k`
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#64748B',
                        font: { size: 10, weight: 'bold' }
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="p-0">
            <div className="bg-card p-4 rounded-2xl border border-divider shadow-sm min-h-[400px] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[11px] font-black text-text-secondary uppercase tracking-widest leading-none">Quarterly Expense Breakdown</h3>
                    <div className="px-3 py-1 bg-background border border-divider rounded-full">
                        <span className="text-[9px] font-bold text-text-secondary">FY 2024</span>
                    </div>
                </div>

                <div className="flex-1 min-h-[300px]">
                    <Chart type="bar" data={chartData} options={chartOptions} className="w-full h-full" />
                </div>
            </div>
        </div>
    )
}
