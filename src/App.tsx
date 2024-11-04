// src/App.tsx
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PortfolioPage from './pages/PortfolioPage';
import { isAuthenticated } from './utils/auth';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route
        path="/portfolio"
        element={
          <PrivateRoute>
            <PortfolioPage/>
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
);

export default App;
