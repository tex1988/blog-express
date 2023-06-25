import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { QueryBoundaries } from '../components/errorHandling/QueryBoundaries';

const MainLayout = () => {
  return (
    <>
      <div className="container">
        <Navbar />
        <QueryBoundaries>
          <Outlet />
        </QueryBoundaries>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
