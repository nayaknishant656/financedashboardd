import React from 'react'
import TopSectionDashboard from './ui/TopSectionDashboard'
import Timeserieschart from './ui/Timeserieschart'
import SpendTransection from './ui/SpendTransection'
import StackingSpend from './ui/Stackingspend'
import Stackedcompare from './ui/Stackedcompare'
import dashboardStats from './data/dashboardStats.json'
import { FiDownload } from 'react-icons/fi'

export default function Dashboard() {
    const exportToCSV = () => {
        const transactions = dashboardStats.transactionHistory;
        const csvHeader = "ID,Company,Category,Date,Amount,Type\n";
        const csvRows = transactions.map(tx =>
            `${tx.id},"${tx.company}","${tx.category}",${tx.date},${tx.amount},${tx.type}`
        ).join("\n");

        const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Quantra_Audit_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className='top-section'>
            <div className="flex justify-between items-center px-4 pt-4 mb-2">
                <div className="hidden sm:block">
                    <h2 className="text-sm font-black text-text-primary uppercase tracking-widest">Audit Overview</h2>
                    <p className="text-[10px] font-bold text-text-secondary uppercase">Live Fiscal Telemetry</p>
                </div>
                <button
                    onClick={exportToCSV}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl hover:bg-primary hover:text-white transition-all text-[11px] font-black uppercase shadow-lg shadow-primary/5 active:scale-95 group"
                >
                    <FiDownload className="group-hover:animate-bounce" />
                    <span>CSV Export</span>
                </button>
            </div>
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

