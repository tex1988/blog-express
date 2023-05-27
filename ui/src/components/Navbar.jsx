import { useContext, useState } from 'react';
import { UserContext } from '../App';
import { Link, useLocation } from 'react-router-dom';
import UserMenu from './UserMenu';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const userName = user ? user.username : 'Sign in';
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      <nav style={styles.topNav}>
        <div style={styles.navLinkGroup}>
          <Link style={{ ...styles.navLink, ...styles.logo }} to='/'>
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
            style={
              location.pathname === '/' ? { ...styles.navLink, ...styles.active } : styles.navLink
            }
            to='/'>
            All posts
          </Link>
        </div>
        <Link
          onClick={() => setShowUserMenu(!showUserMenu)}
          style={{ ...styles.navLink, ...styles.userInfo }}
          to={user ? `/user/${user.userId}/post` : '/login'}>
          {userName}
          {showUserMenu && <UserMenu />}
        </Link>
      </nav>
     </>
  );
};

const styles = {
  topNav: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'Black',
    fontFamily: 'Arial, sans-serif',
    fontSize: '15px',
    height: '55px',
  },

  navLink: {
    display: 'inline-block',
    width: '100px',
    height: '100%',
    color: 'white',
    textAlign: 'center',
    lineHeight: '55px',
    textDecoration: 'none',
    boxSizing: 'border-box',
  },

  navLinkGroup: {
    display: 'flex',
  },

  active: {
    borderBottom: '3px solid RoyalBlue',
  },

  logo: {
    width: '120px',
    height: '100%',
    backgroundColor: 'RoyalBlue',
    fontWeight: 'bold',
    fontSize: '13px',
  },

  userInfo: {
    textDecoration: 'underline',
  },
};

export default Navbar;
