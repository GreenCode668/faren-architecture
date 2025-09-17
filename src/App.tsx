import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Orders from './components/Orders';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ResourcesPage from './pages/ResourcesPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const AppContent = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user?.isVerified) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <Orders />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white custom-cursor">
      <CustomCursor />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
