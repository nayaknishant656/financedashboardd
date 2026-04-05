import React from 'react'
import Box from '@mui/material/Box'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart'
import dashboardStats from '../../dashboard/data/dashboardStats.json'

export default function Pie() {
    const data = dashboardStats.financeInsights.assetAllocation;

    return (
        <div className="p-4 pt-1 h-full">
            <div className="bg-card p-6 rounded-2xl border border-divider shadow-sm min-h-[400px] flex flex-col items-center">
                <div className="flex justify-between items-center mb-6 w-full">
                    <h3 className="text-[11px] font-black text-text-secondary uppercase tracking-widest leading-none">Portfolio Allocation</h3>
                    <div className="px-3 py-1 bg-background border border-divider rounded-full">
                        <span className="text-[9px] font-bold text-text-secondary uppercase">Live Meta</span>
                    </div>
                </div>

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <PieChart
                        series={[
                            {
                                data: data,
                                arcLabel: (item) => `${item.value}%`,
                                arcLabelMinAngle: 35,
                                arcLabelRadius: '55%',
                                innerRadius: 50,
                                outerRadius: 100,
                                paddingAngle: 3,
                                cornerRadius: 4,
                            },
                        ]}
                        sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                                fill: 'white',
                                fontWeight: '900',
                                fontSize: '10px'
                            },
                        }}
                        width={300}
                        height={260}
                        slotProps={{
                            legend: { hidden: true }
                        }}
                    />
                </Box>

                <div className="w-full mt-6 grid grid-cols-2 gap-3 pb-2">
                    {data.map((item) => (
                        <div key={item.category} className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }}></div>
                            <span className="text-[10px] font-black text-text-primary uppercase tracking-tighter truncate">{item.category}</span>
                            <span className="text-[9px] font-bold text-text-secondary">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
