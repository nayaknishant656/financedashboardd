import React from 'react'
import { Link } from 'react-router-dom'

export default function header() {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <span className="text-2xl font-bold text-blue-600 tracking-tight">FinanceFlow</span>
                    </div>
                    <nav className="flex space-x-8">
                        <Link
                            to="/"
                            className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-blue-500 transition-colors duration-200"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/insights"
                            className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-blue-500 transition-colors duration-200 hover:text-gray-900"
                        >
                            Insights
                        </Link>
                    </nav>
                    <div className="flex items-center">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md transform active:scale-95">
                            Get Help
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
