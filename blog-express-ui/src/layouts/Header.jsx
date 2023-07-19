import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserMenu from '../components/UserMenu';
import styled from 'styled-components';
import useAuthContext from '../hooks/useAuthContext';
import { basicTransition } from '../components/animation/motionComponents';
import { motion } from 'framer-motion';

const Header = () => {
  const { user } = useAuthContext();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userName = user ? user.username : 'Sign in';
  const ref = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  function handleClickOutside(event) {
    if (ref.current && !ref.current?.contains(event.target)) {
      setShowUserMenu(false);
    }
  }

  function toggleMenuVisibility() {
    if (user) {
      setShowUserMenu(!showUserMenu);
    } else {
      navigate('/login');
    }
  }

  return (
    <HeaderWrapper>
      <nav>
        <div className="nav-group">
          <Link className="logo" to="/">
            BLOG-EXPRESS
          </Link>
          {user && (
            <div>
              <Link to={`/user/${user.userId}/post`}> My posts</Link>
              {location.pathname === `/user/${user.userId}/post` && (
                <motion.div
                  key={'nav1'}
                  layoutId={'nav'}
                  transition={basicTransition}
                  className="underline"
                />
              )}
            </div>
          )}
          <div>
            <Link to="/post">All posts</Link>
            {location.pathname === '/post' && (
              <motion.div
                key={'nav2'}
                layoutId={'nav'}
                transition={basicTransition}
                className="underline"
              />
            )}
          </div>
        </div>
        <div className="user-info" ref={ref}>
          <span onClick={toggleMenuVisibility}>{userName}</span>
          <UserMenu showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu} />
        </div>
      </nav>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header.attrs({
  className: 'container',
})`
  nav {
    position: fixed;
    width: inherit;
    max-width: inherit;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #282828;
    font-family: Arial, sans-serif;
    font-size: 15px;
    height: 55px;
    border-bottom: 1px solid #4b4b4b;
    z-index: 2;
  }

  a {
    display: inline-block;
    width: 100px;
    height: 100%;
    color: #f6f6f6;
    text-align: center;
    line-height: 55px;
    text-decoration: none;
    box-sizing: border-box;
  }

  .active {
    border-bottom: 3px solid RoyalBlue;
    color: white;
  }

  .underline {
    position: relative;
    top: -3px;
    left: 0;
    right: 0;
    height: 3px;
    background: RoyalBlue;
  }

  .sticky {
    position: fixed;
  }

  .logo {
    width: 120px;
    height: 100%;
    background-color: RoyalBlue;
    font-weight: bold;
    font-size: 13px;
  }

  .nav-group {
    display: flex;
  }

  .user-info {
    display: inline-block;
    width: 100px;
    line-height: 55px;
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default Header;
