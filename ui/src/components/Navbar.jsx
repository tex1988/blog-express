import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../App';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';
import styled from 'styled-components';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const userName = user ? user.username : 'Sign in';
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => document.removeEventListener('click', handleClickOutside, true);
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
    <Nav currentLocation={location.pathname}>
      <div className="nav-group">
        <NavLink className="logo" to="/">BLOG-EXPRESS</NavLink>
        {user && <NavLink to={`/user/${user.userId}/post`}>My posts</NavLink>}
        <NavLink to="/">All posts</NavLink>
      </div>
      <div className="user-info" ref={ref} onClick={toggleMenuVisibility}>
        {userName}
        <UserMenu showUserMenu={showUserMenu} />
      </div>
    </Nav>
  );
};

const Nav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #282828;
  font-family: Arial, sans-serif;
  font-size: 15px;
  height: 55px;
  border-bottom: 1px solid #4b4b4b;

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

export default Navbar;
