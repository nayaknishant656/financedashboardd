import React, { useState } from 'react'
import Insightstime from './ui/insightstime'
import Insightsheader from './ui/Insightsheader'
import Pie from "./ui/pie"
import Stacked from "./ui/stacked"
import Card from "./ui/cards"
import Transection from "./ui/transection"
import Quarterexpense from './ui/quarterexpense'
import dashboardStats from '../dashboard/data/dashboardStats.json'

export default function Insights() {
    const [range, setRange] = useState('month'); // default

    const currentData = dashboardStats.insightsData[range] || [];

    return (
        <div className="p-0">
            <Card />
            <Insightsheader range={range} setRange={setRange} />
            <div className="grid grid-cols-12 gap-4 px-4 mt-2">
                <div className="col-span-12 lg:col-span-8">
                    <Insightstime data={currentData} range={range} />
                </div>
                <div className="col-span-12 lg:col-span-4">
                    <Pie />
                </div>

                <div className="col-span-12 lg:col-span-6">
                    <Stacked />
                </div>
                <div className="col-span-12 lg:col-span-6">
                    <Quarterexpense />
                </div>

                <div className="col-span-12 flex justify-center py-2">
                    <div style={{ width: '80vw' }}>
                        <Transection />
                    </div>
                </div>

            </div>
        </div>
    )
}
