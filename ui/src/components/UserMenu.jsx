import { useContext } from 'react';
import { USER_KEY, UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { removeFromLocalStorage } from '../../utils/utils';

const UserMenu = (props) => {
  const { showUserMenu } = props;
  const { user, setUser } = useContext(UserContext);
  const { firstName, lastName, username, email } = user;
  const navigate = useNavigate();

  function logOut() {
    removeFromLocalStorage(USER_KEY);
    setUser(undefined);
    navigate('/');
  }

  return (
    <div
      style={showUserMenu ? { ...styles.container, opacity: '1', zIndex: '1' } : styles.container}>
      <div style={styles.menu}>
        <span style={styles.item}>
          Signed in as <b>{username}</b>
        </span>
        <span style={styles.item}>{`${firstName} ${lastName}`}</span>
        <span style={styles.item}>{email}</span>
        <span style={{ ...styles.item, ...styles.action }}>Edit</span>
        <span onClick={logOut} style={{ ...styles.item, ...styles.action, borderBottom: 'none' }}>
          Sign out
        </span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    lineHeight: 'normal',
    cursor: 'auto',
    top: '-10px',
    right: '50px',
    opacity: '0',
    zIndex: '-1',
    transition: 'all 200ms linear',
  },

  menu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: '#2f2f2f',
    border: '1px solid #4b4b4b',
    borderRadius: '5px',
    padding: '0 10px 0 10px',
  },

  item: {
    color: 'white',
    fontSize: '13px',
    paddingBottom: '10px',
    marginTop: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #4b4b4b',
  },

  action: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

export default UserMenu;
