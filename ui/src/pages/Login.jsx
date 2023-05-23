import { useContext, useState } from 'react';
import { UserContext } from '../App';
import { fetchUserByUsername } from '../api/api';
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
    <div className='login-wrapper'>
      <h3>Sign in</h3>
      <h3>to BLOG-EXPRESS</h3>
      <div className='login-form'>
        <span className='input-label'>Username</span>
        <input
          value={input}
          onInput={onInput}
          onKeyDown={onInputKeyPress}
        />
        <button onClick={onSignIn} disabled={input.length < 1}>Sign in</button>
      </div>
      <div className='sign-info'>
        <span>New to BLOG-EXPRESS?</span>
        <Link to='/'>Create an account</Link>
      </div>
    </div>
  );
};

export default Login;