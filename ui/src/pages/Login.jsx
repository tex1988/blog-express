import { useContext, useState } from 'react';
import { UserContext } from '../App';
import { fetchUser, fetchUserByUsername } from '../api/api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [input, setInput] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function onInput(event) {
    setInput(event.target.value);
  }

  function onSignIn() {
    fetchUserByUsername(input)
      .then((user) => {
        if (user) {
          setUser(user);
          navigate(`/user/${user.userId}/post`);
        } else {
          alert(`User '${input}' not found`);
        }
      });
  }

  function onInputKeyPress(event) {
    if (event.key === 'Enter') {
      onSignIn();
    }
  }

  return (
    <div className='login-container'>
      <div className='login-form'>
        <h3 style={styles.header}>Sign in to BLOG-EXPRESS</h3>
        <p>Username</p>
        <input
          value={input}
          onInput={onInput}
          onKeyDown={onInputKeyPress}
          style={styles.userInput}
        />
        <button onClick={onSignIn} disabled={input.length < 1}>Sign in</button>
        <span>New to BLOG-EXPRESS?</span>
        <Link to='/'>Create an account</Link>
      </div>
    </div>
  );
};

const styles = {
  header: {
    textAlign: 'center',
    margin: '10px 0 20px 0',
    color: 'white',
  },
  userInput: {
    textAlign: 'center',
  },

  button: {
    backgroundColor: 'green',
    color: 'white',
    border: 'green',
  }
};

export default Login;
