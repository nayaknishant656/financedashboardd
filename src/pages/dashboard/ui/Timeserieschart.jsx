import React from 'react'
import Box from '@mui/material/Box'
import { LineChart } from '@mui/x-charts/LineChart'
import dashboardStats from '../data/dashboardStats.json'

export default function Timeserieschart() {
    // Extract data from the JSON source
    const balanceData = dashboardStats.timeSeries.map(item => item.balance);
    const spendData = dashboardStats.timeSeries.map(item => item.spend);
    const xLabels = dashboardStats.timeSeries.map(item => item.label);

    return (
        <div className="w-full">
            <div className="bg-card p-4 rounded-2xl border border-divider shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Financial Trends</h3>
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] mr-1.5"></div>
                            <span className="text-[10px] font-bold text-text-secondary uppercase">Balance</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] mr-1.5"></div>
                            <span className="text-[10px] font-bold text-text-secondary uppercase">Spending</span>
                        </div>
                    </div>
                </div>

                <Box sx={{ width: '100%', height: 320 }}>
                    <LineChart
                        series={[
                            { data: balanceData, label: 'Balance', color: '#2563EB', area: true },
                            { data: spendData, label: 'Spending', color: '#8B5CF6' }
                        ]}
                        xAxis={[{ scaleType: 'point', data: xLabels, height: 28 }]}
                        yAxis={[{ width: 50 }]}
                        margin={{ left: 10, right: 10, top: 10, bottom: 0 }}
                        bottomAxis={null}
                        leftAxis={null}
                        slotProps={{
                            legend: { hidden: true }
                        }}
                    />
                </Box>
            </div>
        </div>
    )
}
