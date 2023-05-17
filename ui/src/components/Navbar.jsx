import { useContext } from 'react';
import { UserContext } from '../App';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const userName = user ? user.username : 'Sign in';
  const location = useLocation();

  return (
    <nav id="topnav" style={styles.topNav}>
      <Link id="logo" style={{ ...styles.navLink, ...styles.logo }} to="/">
        BLOG-EXPRESS
      </Link>
      {user && (
        <Link
          style={
            location.pathname === `/user/${user.userId}/post`
              ? { ...styles.navLink, ...styles.active }
              : styles.navLink
          }
          to={`/user/${user.userId}/post`}>
          My posts
        </Link>
      )}
      <Link
        style={location.pathname === '/' ? { ...styles.navLink, ...styles.active } : styles.navLink}
        to="/">
        All posts
      </Link>
      <Link
        id="about"
        style={{ ...styles.navLink, ...styles.about }}
        to={user ? `/user/${user.userId}/post` : '/login'}>
        {userName}
      </Link>
    </nav>
  );
};

const styles = {
  topNav: {
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'Black',
    fontFamily: 'Arial, sans-serif',
    fontSize: '15px',
  },

  navLink: {
    display: 'inline-block',
    width: '100px',
    height: '55px',
    color: 'white',
    textAlign: 'center',
    lineHeight: '55px',
    textDecoration: 'none',
    boxSizing: 'border-box',
  },

  active: {
    borderBottom: '3px solid RoyalBlue',
  },

  logo: {
    width: '120px',
    backgroundColor: 'RoyalBlue',
    fontWeight: 'bold',
    fontSize: '13px',
  },

  about: {
    position: 'absolute',
    top: '0',
    right: '0',
  },
};

export default Navbar;
