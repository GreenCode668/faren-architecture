import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Reservations from './components/Reservations';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ReservationFlow from './pages/ReservationFlow';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { checkAuthStatus } from './store/slices/authSlice';
import { useEffect } from 'react';

const AppContent = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (isAuthenticated && user?.isVerified) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <Reservations />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white custom-cursor">
      <CustomCursor />
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/services" element={
          <>
            <Header />
            <ServicesPage />
            <Footer />
          </>
        } />
        <Route path="/portfolio" element={
          <>
            <Header />
            <PortfolioPage />
            <Footer />
          </>
        } />
        <Route path="/reservation" element={
          <>
            <Header />
            <ReservationFlow />
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
