import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLoginQuery from '../hooks/useLoginQuery';
import Button from '../components/ui/Button';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const credentials = { username, password };
  const { logIn, error, isLoading } = useLoginQuery(credentials);

  function onSignIn(event) {
    event.preventDefault();
    logIn(credentials);
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
          <Button
            className="mt-10"
            type="submit"
            disabled={username.length < 4 || password.length < 4 || isLoading}
            loading={isLoading}
            label="Sign in"
            loadingLabel="Signin in"
            color="#238636"
            hoveredColor="#26a641"
            pressedColor="#016401"
            disabledColor="#016401"
          />
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
