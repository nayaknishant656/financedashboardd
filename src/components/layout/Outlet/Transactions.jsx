import React, { useState, useMemo } from 'react'
import { FiSearch, FiFilter, FiArrowUpRight, FiArrowDownLeft, FiChevronDown, FiCalendar } from 'react-icons/fi'
import dashboardStats from '../../../pages/dashboard/data/dashboardStats.json'

export default function Transactions() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(dashboardStats.transactionHistory.map(tx => tx.category));
        return ['all', ...Array.from(cats)];
    }, []);

    const filteredTransactions = useMemo(() => {
        let result = [...dashboardStats.transactionHistory];

        // Search Filter
        if (searchTerm) {
            result = result.filter(tx =>
                tx.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tx.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Type Filter
        if (filterType !== 'all') {
            result = result.filter(tx => tx.type === filterType);
        }

        // Category Filter
        if (filterCategory !== 'all') {
            result = result.filter(tx => tx.category === filterCategory);
        }

        // Sorting
        result.sort((a, b) => {
            let valA = a[sortConfig.key];
            let valB = b[sortConfig.key];

            if (sortConfig.key === 'amount') {
                return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
            }

            return sortConfig.direction === 'asc'
                ? valA.localeCompare(valB)
                : valB.localeCompare(valA);
        });

        return result;
    }, [searchTerm, filterType, filterCategory, sortConfig]);

    const handleSort = (key) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === 'desc' ? 'asc' : 'desc'
        });
    };

    return (
        <div className="p-8 bg-background min-h-[calc(100vh-64px)]">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0 border-b border-divider pb-6">
                    <h1 className="text-2xl font-black text-text-primary tracking-tight uppercase">Audit Logs</h1>

                    <div className="flex flex-wrap items-center gap-3">
                        {/* Search Bar */}
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                            <input
                                type="text"
                                placeholder="Search audited entries..."
                                className="pl-10 pr-4 py-2 bg-card border border-divider rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary w-64 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Category Dropdown */}
                        <div className="relative flex items-center bg-card border border-divider rounded-xl px-3 py-2 cursor-pointer hover:border-primary transition-all group">
                            <FiFilter className="text-text-secondary group-hover:text-primary mr-2" />
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="bg-transparent text-[10px] font-black uppercase text-text-secondary focus:outline-none cursor-pointer pr-4 appearance-none"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <FiChevronDown className="absolute right-2 text-text-secondary pointer-events-none" />
                        </div>

                        {/* Type Toggle */}
                        <div className="flex bg-card border border-divider rounded-xl p-1">
                            {['all', 'credit', 'debit'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${filterType === type
                                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                                        : 'text-text-secondary hover:text-text-primary'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-divider rounded-2xl shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-background/50 border-b border-divider">
                                <th onClick={() => handleSort('company')} className="px-6 py-4 text-[10px] font-black text-text-secondary uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">
                                    Entity <FiChevronDown className="inline ml-1" />
                                </th>
                                <th className="px-6 py-4 text-[10px] font-black text-text-secondary uppercase tracking-widest">Category</th>
                                <th onClick={() => handleSort('date')} className="px-6 py-4 text-[10px] font-black text-text-secondary uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">
                                    Audit Date <FiChevronDown className="inline ml-1" />
                                </th>
                                <th onClick={() => handleSort('amount')} className="px-6 py-4 text-right text-[10px] font-black text-text-secondary uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">
                                    Amount <FiChevronDown className="inline ml-1" />
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-divider/50">
                            {filteredTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-background/40 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className={`p-2 rounded-lg ${tx.type === 'credit' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                                                }`}>
                                                {tx.type === 'credit' ? <FiArrowUpRight /> : <FiArrowDownLeft />}
                                            </div>
                                            <span className="text-sm font-bold text-text-primary tracking-tight">{tx.company}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-background border border-divider rounded-full text-[10px] font-bold text-text-secondary uppercase">
                                            {tx.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-text-secondary">
                                        <div className="flex items-center">
                                            <FiCalendar className="mr-2 opacity-50" />
                                            {tx.date}
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 text-sm font-black text-right ${tx.type === 'credit' ? 'text-success' : 'text-text-primary'
                                        }`}>
                                        {tx.type === 'credit' ? '+' : '-'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredTransactions.length === 0 && (
                        <div className="p-12 text-center">
                            <p className="text-sm font-bold text-text-secondary uppercase tracking-widest">No matching audited entries found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
