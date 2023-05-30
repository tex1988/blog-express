import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../App';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const userName = user ? user.username : 'Sign in';
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current?.contains(event.target)) {
      setShowUserMenu(false)
    }
  };

  const toggleMenuVisibility = () => {
    if(user) {
      setShowUserMenu(!showUserMenu)
    } else {
      navigate('/login');
    }
  };

  return (
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
        <div
          ref={ref}
          onClick={toggleMenuVisibility}
          style={{ ...styles.navLink, ...styles.userInfo }}>
          {userName}
          {showUserMenu && <UserMenu showUserMenu={showUserMenu}/>}
        </div>
      </nav>
  );
};

const styles = {
  topNav: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#282828',
    fontFamily: 'Arial, sans-serif',
    fontSize: '15px',
    height: '55px',
    borderBottom: '1px solid #4b4b4b'
  },

  navLink: {
    display: 'inline-block',
    width: '100px',
    height: '100%',
    color: '#f6f6f6',
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
    color: 'white'
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
    cursor: 'pointer'
  },
};

export default Navbar;
