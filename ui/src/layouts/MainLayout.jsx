import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import { QueryBoundaries } from '../components/errorHandling/QueryBoundaries';

const MainLayout = () => {
  return (
    <div className="container">
      <Navbar />
      <QueryBoundaries>
        <Outlet />
      </QueryBoundaries>
      <Footer />
    </div>
  );
};

export default MainLayout;
