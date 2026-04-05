import React from 'react'
import Box from '@mui/material/Box'
import { BarChart } from '@mui/x-charts/BarChart'
import dashboardStats from '../data/dashboardStats.json'

export default function Stackingspend() {
    const talentData = dashboardStats.timeSeries.map(item => item.essential);
    const marketingData = dashboardStats.timeSeries.map(item => item.luxury);
    const rndData = dashboardStats.timeSeries.map(item => item.investment);
    const xLabels = dashboardStats.timeSeries.map(item => item.label);

    return (
        <div className="w-full h-full">
            <div className="bg-card p-4 rounded-2xl border border-divider shadow-sm h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[11px] font-bold text-text-secondary uppercase tracking-widest leading-none">Expenditure Distribution</h3>
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-[#10B981] mr-1"></div>
                            <span className="text-[9px] font-bold text-text-secondary uppercase">Talent</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-[#3B82F6] mr-1"></div>
                            <span className="text-[9px] font-bold text-text-secondary uppercase">Marketing</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-[#F59E0B] mr-1"></div>
                            <span className="text-[9px] font-bold text-text-secondary uppercase">R&D</span>
                        </div>
                    </div>
                </div>

                <Box sx={{ width: '100%', height: 320, flex: 1 }}>
                    <BarChart
                        height={300}
                        series={[
                            { data: talentData, label: 'Talent', stack: 'total', color: '#10B981' },
                            { data: marketingData, label: 'Marketing', stack: 'total', color: '#3B82F6' },
                            { data: rndData, label: 'R&D', stack: 'total', color: '#F59E0B' },
                        ]}
                        xAxis={[{ scaleType: 'band', data: xLabels, categoryGapRatio: 0.6 }]}
                        margin={{ left: 10, right: 10, top: 10, bottom: 20 }}
                        slotProps={{
                            legend: { hidden: true }
                        }}
                    />
                </Box>
            </div>
        </div>
    )
}
