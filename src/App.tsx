import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPortfolio from './components/MainPortfolio';
import AdminApp from './admin';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="/admin" element={<AdminApp />} />
      </Routes>
    </Router>
  );
};

export default App; 