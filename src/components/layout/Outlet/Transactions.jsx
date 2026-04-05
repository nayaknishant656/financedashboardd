import React, { useState, useMemo } from 'react'
import { FiSearch, FiFilter, FiArrowUpRight, FiArrowDownLeft, FiChevronDown, FiCalendar, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi'
import dashboardStats from '../../../pages/dashboard/data/dashboardStats.json'
import { useAuth } from '../../../context/AuthContext'

export default function Transactions() {
    const { userRole } = useAuth();
    const isAdmin = userRole === 'Admin';

    const [transactions, setTransactions] = useState(dashboardStats.transactionHistory);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

    // Edit state
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(transactions.map(tx => tx.category));
        return ['all', ...Array.from(cats)];
    }, [transactions]);

    const filteredTransactions = useMemo(() => {
        let result = [...transactions];

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
                ? valA.toString().localeCompare(valB.toString())
                : valB.toString().localeCompare(valA.toString());
        });

        return result;
    }, [transactions, searchTerm, filterType, filterCategory, sortConfig]);

    const handleSort = (key) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === 'desc' ? 'asc' : 'desc'
        });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this transaction record?')) {
            setTransactions(transactions.filter(tx => tx.id !== id));
        }
    };

    const startEdit = (tx) => {
        setEditingId(tx.id);
        setEditData({ ...tx });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditData({});
    };

    const saveEdit = () => {
        setTransactions(transactions.map(tx => tx.id === editingId ? editData : tx));
        setEditingId(null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: name === 'amount' ? parseFloat(value) : value
        }));
    };

    // Calculate 30-day metrics
    const stats30Days = useMemo(() => {
        const thirtyDaysAgo = new Date('2024-04-05');
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recent = transactions.filter(tx => new Date(tx.date) >= thirtyDaysAgo);
        const outgoing = recent.filter(tx => tx.type === 'debit').length;

        return { total: recent.length, outgoing };
    }, [transactions]);

    return (
        <div className="p-8 bg-background min-h-[calc(100vh-64px)]">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-6 lg:space-y-0 border-b border-divider pb-8">
                    <div className="flex items-center space-x-8">
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-black text-text-primary tracking-tight uppercase">Audit Logs</h1>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${isAdmin ? 'bg-primary/20 text-primary' : 'bg-text-secondary/20 text-text-secondary'}`}>
                                    {userRole} Context
                                </span>
                            </div>
                            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mt-1">Full financial history and tracking</p>
                        </div>

                        <div className="h-10 w-px bg-divider hidden sm:block"></div>

                        <div className="hidden sm:flex items-center space-x-8">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-text-secondary uppercase tracking-tighter">Rolling 30 Days</span>
                                <span className="text-xl font-black text-primary">{stats30Days.total} <span className="text-[10px] text-text-secondary font-bold">TXNS</span></span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-text-secondary uppercase tracking-tighter">Outgoing Flow</span>
                                <span className="text-xl font-black text-danger">{stats30Days.outgoing} <span className="text-[10px] text-text-secondary font-bold">DEBITS</span></span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
                        {/* Search Bar */}
                        <div className="relative w-full lg:w-64">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                            <input
                                type="text"
                                placeholder="Search audited entries..."
                                className="pl-10 pr-4 py-2 bg-card border border-divider rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
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
                </div>

                <div className="bg-card border border-divider rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-[800px] lg:min-w-full text-left border-collapse">
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
                                    {isAdmin && (
                                        <th className="px-6 py-4 text-center text-[10px] font-black text-text-secondary uppercase tracking-widest">
                                            Actions
                                        </th>
                                    )}
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
                                                {editingId === tx.id ? (
                                                    <input
                                                        name="company"
                                                        value={editData.company}
                                                        onChange={handleEditChange}
                                                        className="bg-background border border-primary rounded px-2 py-1 text-sm font-bold w-40"
                                                    />
                                                ) : (
                                                    <span className="text-sm font-bold text-text-primary tracking-tight">{tx.company}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {editingId === tx.id ? (
                                                <input
                                                    name="category"
                                                    value={editData.category}
                                                    onChange={handleEditChange}
                                                    className="bg-background border border-primary rounded px-2 py-1 text-[10px] font-bold w-24"
                                                />
                                            ) : (
                                                <span className="px-3 py-1 bg-background border border-divider rounded-full text-[10px] font-bold text-text-secondary uppercase">
                                                    {tx.category}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-text-secondary">
                                            <div className="flex items-center">
                                                <FiCalendar className="mr-2 opacity-50" />
                                                {editingId === tx.id ? (
                                                    <input
                                                        name="date"
                                                        type="date"
                                                        value={editData.date}
                                                        onChange={handleEditChange}
                                                        className="bg-background border border-primary rounded px-2 py-1 text-sm"
                                                    />
                                                ) : (
                                                    tx.date
                                                )}
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 text-sm font-black text-right ${tx.type === 'credit' ? 'text-success' : 'text-text-primary'
                                            }`}>
                                            {editingId === tx.id ? (
                                                <div className="flex items-center justify-end">
                                                    <span>₹</span>
                                                    <input
                                                        name="amount"
                                                        type="number"
                                                        value={editData.amount}
                                                        onChange={handleEditChange}
                                                        className="bg-background border border-primary rounded px-2 py-1 text-sm font-black w-24 text-right"
                                                    />
                                                </div>
                                            ) : (
                                                `${tx.type === 'credit' ? '+' : '-'}₹${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                                            )}
                                        </td>
                                        {isAdmin && (
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center space-x-2">
                                                    {editingId === tx.id ? (
                                                        <>
                                                            <button
                                                                onClick={saveEdit}
                                                                className="p-2 bg-success text-white rounded-lg hover:bg-success/90 transition-all shadow-lg shadow-success/20"
                                                                title="Save"
                                                            >
                                                                <FiSave />
                                                            </button>
                                                            <button
                                                                onClick={cancelEdit}
                                                                className="p-2 bg-text-secondary text-white rounded-lg hover:bg-text-secondary/90 transition-all"
                                                                title="Cancel"
                                                            >
                                                                <FiX />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => startEdit(tx)}
                                                                className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                                                                title="Edit Transaction"
                                                            >
                                                                <FiEdit2 />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(tx.id)}
                                                                className="p-2 text-text-secondary hover:text-danger hover:bg-danger/10 rounded-lg transition-all"
                                                                title="Delete Transaction"
                                                            >
                                                                <FiTrash2 />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        )}
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
        </div>
    );
}
