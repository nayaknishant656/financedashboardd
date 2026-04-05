import React, { useState, useMemo } from 'react'
import { FiArrowUpRight, FiArrowDownLeft, FiChevronLeft, FiChevronRight, FiClock, FiTag } from 'react-icons/fi'
import dashboardStats from '../../dashboard/data/dashboardStats.json'

export default function Transection() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const allTransactions = dashboardStats.transactionHistory;
    const totalPages = Math.ceil(allTransactions.length / itemsPerPage);

    const pagedItems = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return allTransactions.slice(start, start + itemsPerPage);
    }, [currentPage, allTransactions]);

    return (
        <div className="p-0 h-full">
            <div className="bg-card rounded-2xl border border-divider shadow-sm flex flex-col h-full overflow-hidden">
                <div className="p-4 border-b border-divider flex justify-between items-center bg-card/50">
                    <div>
                        <h3 className="text-[11px] font-black text-text-secondary uppercase tracking-widest leading-none">Detailed Audit Stream</h3>
                        <p className="text-[9px] font-bold text-text-secondary mt-1 uppercase opacity-60">Full historical trace for compliance</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-black text-text-primary uppercase tracking-tighter">Page {currentPage} of {totalPages}</span>
                    </div>
                </div>

                <div className="flex-1 overflow-auto">
                    <div className="divide-y divide-divider/50">
                        {pagedItems.map((tx) => (
                            <div key={tx.id} className="p-4 hover:bg-background/40 transition-colors flex items-center justify-between group">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-3 rounded-xl ${tx.type === 'credit' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                                        } shadow-inner`}>
                                        {tx.type === 'credit' ? <FiArrowUpRight className="text-lg" /> : <FiArrowDownLeft className="text-lg" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm font-black text-text-primary tracking-tight">{tx.company}</span>
                                            {tx.type === 'credit' ? (
                                                <span className="text-[8px] font-black text-success bg-success/10 px-1.5 py-0.5 rounded uppercase tracking-widest">Received</span>
                                            ) : (
                                                <span className="text-[8px] font-black text-danger bg-danger/10 px-1.5 py-0.5 rounded uppercase tracking-widest">Sent To</span>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-3 mt-1">
                                            <div className="flex items-center text-[9px] font-bold text-text-secondary uppercase">
                                                <FiClock className="mr-1 opacity-50" /> {tx.date}
                                            </div>
                                            <div className="flex items-center text-[9px] font-bold text-text-secondary uppercase">
                                                <FiTag className="mr-1 opacity-50" /> {tx.category}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-sm font-black tracking-tighter ${tx.type === 'credit' ? 'text-success' : 'text-text-primary'
                                        }`}>
                                        {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </div>
                                    <div className="text-[8px] font-bold text-text-secondary uppercase mt-0.5 opacity-50">Settled Audit</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 bg-background/30 border-t border-divider flex items-center justify-center space-x-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-divider hover:border-primary text-text-secondary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <FiChevronLeft />
                    </button>

                    <div className="flex items-center space-x-1">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${currentPage === i + 1
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-text-secondary hover:bg-card border border-transparent'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-divider hover:border-primary text-text-secondary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <FiChevronRight />
                    </button>
                </div>
            </div>
        </div>
    )
}
