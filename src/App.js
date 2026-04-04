import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mainlayout from './components/layout/mainlayout';
import Dashboard from './components/layout/Outlet/Dashboard';
import Insights from './components/layout/Outlet/Insights';
import Transactions from './components/layout/Outlet/Transactions';
import Integration from './components/layout/Outlet/Integration';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-background min-h-screen font-sans antialiased text-text-primary">
        <Routes>
          <Route path="/" element={<Mainlayout />}>
            <Route index element={<Dashboard />} />
            <Route path="insights" element={<Insights />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="integration" element={<Integration />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
