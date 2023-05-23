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

  function onSignIn(event) {
    event.preventDefault();
    fetchUserByUsername(input).then((user) => {
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
    <div className="centered-wrapper">
      <h3>Sign in</h3>
      <h3>to BLOG-EXPRESS</h3>
      <form className="form" onSubmit={onSignIn} style={{ width: '250px' }}>
        <label className="input-label" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          autoComplete="nickname"
          value={input}
          onInput={onInput}
          onKeyDown={onInputKeyPress}
        />
        <button type="submit" disabled={input.length < 1}>
          Sign in
        </button>
      </form>
      <div className="form-info">
        <span>New to BLOG-EXPRESS?</span>
        <Link to="/register">Create an account</Link>
      </div>
    </div>
  );
};

export default Login;