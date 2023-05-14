import { useContext } from 'react';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const userName = user ? user.username : 'Sign in';

  return (
    <nav id="topnav">
      <Link id="logo" className="nav-link" to='/'>
        BLOGGO
      </Link>
      <Link className="nav-link" to='/'>
        All posts
      </Link>
      {user && (
        <Link className="nav-link" to={`/user/${user.userId}/post`}>
          My posts
        </Link>
      )}
      <Link id="about" className="nav-link" to={user ? `/user/${user.userId}/post` : '/login'}>
        {userName}
      </Link>
    </nav>
  );
};

export default Navbar;