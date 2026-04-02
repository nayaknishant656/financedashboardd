import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mainlayout from './components/layout/mainlayout';
import Dashboard from './components/layout/Outlet/Dashboard';
import Insights from './components/layout/Outlet/Insights';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Mainlayout />}>
            <Route index element={<Dashboard />} />
            <Route path="insights" element={<Insights />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
