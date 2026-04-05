import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import dashboardStats from '../../dashboard/data/dashboardStats.json';

export default function Stacked() {
    return (
        <div className="p-0">
            <div className="bg-card p-4 rounded-2xl border border-divider shadow-sm min-h-[400px]">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[11px] font-black text-text-secondary uppercase tracking-widest leading-none">Company Expenses Audit</h3>
                    <div className="px-3 py-1 bg-background border border-divider rounded-full">
                        <span className="text-[9px] font-bold text-text-secondary uppercase tracking-tighter">Dept Burn Rate</span>
                    </div>
                </div>

                <Box width="100%">
                    <BarChart
                        height={320}
                        dataset={dashboardStats.companyExpenses}
                        series={[
                            {
                                id: 'amount',
                                dataKey: 'amount',
                                stack: 'company expenses',
                                valueFormatter: (value) => `${value}% Capacity`,
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
                                    thresholds: [50, 75],
                                    colors: ['#EF4444', '#F59E0B', '#10B981'],
                                },
                            },
                        ]}
                        barLabel={(v) => `${v.value}%`}
                        yAxis={[
                            {
                                scaleType: 'band',
                                dataKey: 'category',
                                width: 120,
                            },
                        ]}
                        slotProps={{
                            legend: {
                                axisDirection: 'x',
                                markType: 'square',
                                labelPosition: 'inline-start',
                                labelFormatter: ({ index }) => {
                                    if (index === 0) return 'OVER BUDGET';
                                    if (index === 1) return 'OPTIMAL';
                                    return 'HIGH EFFICIENCY';
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
