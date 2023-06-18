import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Error from '../pages/Error';
import { ErrorBoundary } from 'react-error-boundary';

const MainLayout = () => {
  return (
    <>
      <div className="container">
        <Navbar />
        <ErrorBoundary FallbackComponent={Error}>
          <Outlet />
        </ErrorBoundary>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
