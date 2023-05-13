import { useContext, useState } from 'react';
import { UserContext } from '../App';
import { fetchUser, fetchUserByUsername } from '../api/api';
import { redirect, useNavigate } from 'react-router-dom';

const Login = () => {
  const [input, setInput] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function onLogin() {
    fetchUser(1)
      .then((json) => setUser(json));
  }

  function onInput(event) {
    setInput(event.target.value);
  }

  function onClick() {
    fetchUserByUsername(input)
      .then((user) => setUser(user))
      .then(() => navigate('/'));
  }

  function onInputKeyPress(event) {
    if (event.key === 'Enter') {
      onClick();
    }
  }

  return (
    <div className='login-container'>
      <div className='login-form'><h3 style={{ textAlign: 'center' }}>Sign in</h3>
        <input value={input} onInput={onInput} onKeyDown={onInputKeyPress} placeholder='Username'
               style={{ textAlign: 'center' }} />
        <button onClick={onClick}>Log in</button>
      </div>
    </div>
  );
};

export default Login;
