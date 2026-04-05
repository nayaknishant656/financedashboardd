# 📊 Quantra Finance Dashboard | Corporate Management System

A high-performance, professional corporate financial management system built with **React**, designed for real-time audit tracing, fiscal performance visualization, and **Role-Based Access Control (RBAC)**.

---

## 🚀 Key Features & Functionality

### 1. Unified Financial Performance Tracking
- **Time-Series Analysis**: A centralized annual performance chart (Jan-Dec) tracking **Revenue** vs. **Operational Expenses**.
- **Burn Rate Indicators**: Scaled corporate figures providing high-level balance and investment insight.

### 2. Operational Expenditure Audit
- **Efficiency Logic**: Bar charts visualizing departmental cost efficiency (Talent, Marketing, Maintenance, etc.).
- **Budget Thresholds**: Built-in color-mapped logic to identify "Over Budget" vs. "High Efficiency" sectors.

### 3. Detailed Audit Stream (Transactions)
- **Comprehensive Ledger**: A searchable and filterable history of all corporate incoming/outgoing flows.
- **RBAC Gating**: Advanced transaction controls integrated with the authentication context.
- **Admin Capabilities**: Only authorized Administrators can **Edit** or **Delete** ledger entries.
- **Auditing Tools**: Real-time stats on 30-day volume and debit/credit splits.

### 4. Portfolio Allocation & Forecasting
- **Asset Breakdown**: Visualized pie charts for asset distribution (Cash, Liquid, Fixed).
- **Quarterly Breakdowns**: Historical spend analysis grouped by calendar quarters.

---

## 🛡️ Authentication & State Management

The application utilizes a custom **AuthContext** built with the React Context API to manage the security lifecycle.

### `AuthContext.js` Implementation
- **Role Persistence**: Tracks the active session context (`Admin` vs. `User`).
- **State Propagation**: Provides `userRole`, `login()`, and `logout()` hooks globally.
- **Feature Layering**:
    - **Admin Context**: Enables administrative actions in the transaction ledger.
    - **User Context**: Read-only access to historical data with standard dashboard views.

### Protected Routing
- **Guarded Access**: All dashboard routes are wrapped in a `ProtectedRoute` component.
- **Seamless Redirection**: Unauthenticated attempts automatically trigger a redirect to the **Secure Authentication Gateway** (Login Page).

---

## 📱 Mobile-First Responsive Architecture

- **Adaptive Grid**: Utilizes Tailwind CSS grid systems to transition from multi-column desktop layouts to single-stack mobile views.
- **Responsive Charts**: Charts dynamically recalculate dimensions for consistent rendering on tablets and handsets.
- **Touch Navigation**: Integrated mobile hamburger menu and scrollable audit tables for data-heavy views on small screens.

---

## 🛠️ Technical Stack

- **Core**: React 18+
- **Styling**: Tailwind CSS (JIT Engine)
- **Data Visualization**: MUI X-Charts, ApexCharts
- **Icons**: React-Icons (Feather/Fi)
- **Context API**: Global state management for authentication.

---

## 📂 Source of Truth
All dashboard metrics, transaction history, and fiscal targets are consolidated in `/src/pages/dashboard/data/dashboardStats.json`, ensuring consistent data injection across the entire analytical suite.