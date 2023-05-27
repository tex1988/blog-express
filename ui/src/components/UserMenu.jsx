import { useContext } from 'react';
import { USER_KEY, UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { removeFromLocalStorage } from '../../utils/utils';

const UserMenu = () => {
  const { user } = useContext(UserContext);
  const { firstName, lastName, userName, email } = user;
  const navigate = useNavigate();

  function logOut() {
    removeFromLocalStorage(USER_KEY)
    navigate('/')
  }

  return (
    <div style={{ position: 'relative', lineHeight: 'normal' }}>
      <div style={styles.menu}>
        <span style={styles.item}>{`${firstName} ${lastName}`}</span>
        <span style={styles.item}>{email}</span>
        <span onClick={logOut} style={{ ...styles.item, textDecoration: 'underline', marginTop: '20px', textAlign: 'center' }}>Log out</span>
      </div>
    </div>
  );
};

const styles = {
  menu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: '#2f2f2f',
    border: '1px solid #4b4b4b',
    borderRadius: '5px',
    padding: '10px',
    marginTop: '-10px'
  },

  item: {
    color: 'white',
    fontSize: '13px',
    marginTop: '5px',
  },
};

export default UserMenu;