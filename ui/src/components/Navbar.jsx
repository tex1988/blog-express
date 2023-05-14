import { useContext } from 'react';
import { UserContext } from '../App';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const userName = user ? user.username : 'Sign in'

  return (
    <nav id="topnav">
      <a id="logo" className="nav-link" href="#">BLOGGO</a>
      <a className="nav-link" href="#">All posts</a>
      <a className="nav-link" href="#">My posts</a>
      <a id="about" className="nav-link" href="#">{userName}</a>
    </nav>
  )
}

export default Navbar;