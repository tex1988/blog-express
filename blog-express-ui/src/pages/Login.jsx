import { useState } from 'react';
import { logInUser } from '../api/api';
import { Link, useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const credentials = {username, password};
  const { signIn } = useAuthContext();
  const navigate = useNavigate();

  function onSignIn(event) {
    event.preventDefault();
    logInUser(credentials)
      .then((user) => {
        signIn(user)
        navigate(`/user/${user.userId}/post`);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function onInputKeyPress(event) {
    if (event.key === 'Enter') {
      onSignIn(event);
    }
  }

  return (
    <div className="centered-wrapper">
      <div>
        <h3>Sign in</h3>
        <h3>to BLOG-EXPRESS</h3>
        <form className="form" onSubmit={onSignIn} style={{ width: '250px' }}>
          <label className="input-label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            autoComplete="nickname"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            onKeyDown={onInputKeyPress}
          />
          <label className="input-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            autoComplete="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={onInputKeyPress}
          />
          <button type="submit" disabled={username.length < 4 || password.length < 4}>
            Sign in
          </button>
        </form>
        <div className="form-info">
          <span>New to BLOG-EXPRESS?</span>
          <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;