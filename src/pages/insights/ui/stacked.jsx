import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import dashboardStats from '../../dashboard/data/dashboardStats.json';

export default function Stacked() {
    return (
        <div className="p-4 pt-1">
            <div className="bg-card p-6 rounded-2xl border border-divider shadow-sm min-h-[400px]">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[11px] font-black text-text-secondary uppercase tracking-widest leading-none">Comparative Turnout Audit</h3>
                    <div className="px-3 py-1 bg-background border border-divider rounded-full">
                        <span className="text-[9px] font-bold text-text-secondary uppercase tracking-tighter">EU Stats Audit</span>
                    </div>
                </div>

                <Box width="100%">
                    <BarChart
                        height={320}
                        dataset={dashboardStats.votesTurnout}
                        series={[
                            {
                                id: 'turnout',
                                dataKey: 'turnout',
                                stack: 'voter turnout',
                                valueFormatter: (value) => `${value}%`,
                            },
                        ]}
                        layout="horizontal"
                        xAxis={[
                            {
                                id: 'color',
                                min: 0,
                                max: 100,
                                colorMap: {
                                    type: 'piecewise',
                                    thresholds: [50, 85],
                                    colors: ['#EF4444', '#3B82F6', '#10B981'], // Use dashboard palette (Red, Blue, Green)
                                },
                                valueFormatter: (value) => `${value}%`,
                            },
                        ]}
                        barLabel={(v) => `${v.value}%`}
                        yAxis={[
                            {
                                scaleType: 'band',
                                dataKey: 'country',
                                width: 100,
                            },
                        ]}
                        slotProps={{
                            legend: {
                                axisDirection: 'x',
                                markType: 'square',
                                labelPosition: 'inline-start',
                                labelFormatter: ({ index }) => {
                                    if (index === 0) return 'LOWEST';
                                    if (index === 1) return 'AVERAGE';
                                    return 'HIGHEST';
                                },
                                labelStyle: { fontSize: 9, fontWeight: 900, fill: '#64748B' }
                            },
                        }}
                    />
                </Box>
            </div>
        </div>
    );
}
