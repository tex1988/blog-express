import { useContext, useState } from 'react';
import { UserContext } from '../App';
import { fetchUser, fetchUserByUsername } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [input, setInput] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function onInput(event) {
    setInput(event.target.value);
  }

  function onSignIn() {
    fetchUserByUsername(input).then((user) => {
      setUser(user);
      navigate(`/user/${user.userId}/post`);
    });
  }

  function onInputKeyPress(event) {
    if (event.key === 'Enter') {
      onSignIn();
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h3 style={{ textAlign: 'center', margin: '10px 0 20px 0' }}>Sign in to BLOG-EXPRESS</h3>
        <input
          value={input}
          onInput={onInput}
          onKeyDown={onInputKeyPress}
          placeholder="Username"
          style={{ textAlign: 'center' }}
        />
        <button onClick={onSignIn}>Sign in</button>
      </div>
    </div>
  );
};

export default Login;
