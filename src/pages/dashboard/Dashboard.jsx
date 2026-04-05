import React from 'react'
import TopSectionDashboard from './ui/TopSectionDashboard'
import Timeserieschart from './ui/Timeserieschart'
import SpendTransection from './ui/SpendTransection'
import StackingSpend from './ui/Stackingspend'
import Stackedcompare from './ui/Stackedcompare'
export default function Dashboard() {
    return (
        <div className='top-section'>
            <TopSectionDashboard />
            <div className='grid grid-cols-12 gap-4 px-2 md:px-4 items-start'>
                <div className="col-span-12 lg:col-span-8">
                    <Timeserieschart />
                </div>
                <div className="col-span-12 lg:col-span-4">
                    <StackingSpend />
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 items-start pb-8 mt-4'>
                <SpendTransection />
                <Stackedcompare />
            </div>
        </div>
    )
}

