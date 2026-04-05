import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Mainlayout from './components/layout/mainlayout';
import Dashboard from './components/layout/Outlet/Dashboard';
import Insights from './components/layout/Outlet/Insights';
import Transactions from './components/layout/Outlet/Transactions';
import Integration from './components/layout/Outlet/Integration';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { userRole } = useAuth();
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="bg-background min-h-screen font-sans antialiased text-text-primary">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Mainlayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="insights" element={<Insights />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="integration" element={<Integration />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
