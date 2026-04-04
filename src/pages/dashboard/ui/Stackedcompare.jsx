import React from 'react'
import Box from '@mui/material/Box'
import { BarChart } from '@mui/x-charts/BarChart'

const seriesA = {
    data: [2000, 3000, 1500, 4000, 5000],
    label: 'Essential',
    color: '#10B981'
};
const seriesB = {
    data: [3000, 1000, 4000, 2000, 1000],
    label: 'Luxury',
    color: '#3B82F6'
};
const seriesC = {
    data: [3000, 2000, 4000, 5000, 1000],
    label: 'Investment',
    color: '#F59E0B'
};

const xLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];

export default function Stackedcompare() {
    return (
        <div className="p-4">
            <div className="bg-card p-6 rounded-2xl border border-divider shadow-sm min-h-[400px]">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[11px] font-black text-text-secondary uppercase tracking-widest leading-none">Weekly Stacked Comparison</h3>
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                            <div className="w-2.5 h-2.5 rounded-sm bg-[#10B981] mr-1.5"></div>
                            <span className="text-[9px] font-bold text-text-secondary uppercase">Ess</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2.5 h-2.5 rounded-sm bg-[#3B82F6] mr-1.5"></div>
                            <span className="text-[9px] font-bold text-text-secondary uppercase">Lux</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2.5 h-2.5 rounded-sm bg-[#F59E0B] mr-1.5"></div>
                            <span className="text-[9px] font-bold text-text-secondary uppercase">Inv</span>
                        </div>
                    </div>
                </div>

                <Box sx={{ width: '100%', height: 320 }}>
                    <BarChart
                        height={300}
                        series={[
                            { ...seriesA, stack: 'total' },
                            { ...seriesB, stack: 'total' },
                            { ...seriesC, stack: 'total' },
                        ]}
                        xAxis={[{ scaleType: 'band', data: xLabels, categoryGapRatio: 0.5 }]}
                        margin={{ left: 40, right: 10, top: 20, bottom: 30 }}
                        slotProps={{
                            legend: { hidden: true }
                        }}
                    />
                </Box>
            </div>
        </div>
    )
}
