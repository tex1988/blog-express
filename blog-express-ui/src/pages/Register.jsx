import { Link } from 'react-router-dom';
import { useState } from 'react';
import useRegisterQuery from '../hooks/useRegisterQuery';
import Button from '../components/ui/Button';

export const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const user = { firstName, lastName, username, password, email };
  const { register, isLoading } = useRegisterQuery();

  function onSubmit(event) {
    event.preventDefault();
    register(user);
  }

  return (
    <div className="centered-wrapper">
      <div>
        <h3>BLOG-EXPRESS</h3>
        <form className="form" onSubmit={onSubmit}>
          <div className="flex-row-center">
            <div className="flex-column">
              <label className="input-label" htmlFor="fname">
                First name
              </label>
              <input
                id="fname"
                autoComplete="given-name"
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
                disabled={isLoading}
              />
            </div>
            <div className="flex-column">
              <label className="input-label" htmlFor="lname">
                Last name
              </label>
              <input
                id="lname"
                autoComplete="family-name"
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex-row-center">
            <div className="flex-column">
              <label className="input-label" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                autoComplete="nickname"
                onChange={(event) => setUsername(event.target.value)}
                value={username}
                disabled={isLoading}
              />
            </div>
            <div className="flex-column">
              <label className="input-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                autoComplete="password"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex-row-center mt-10">
            <div className="flex-column">
              <label className="input-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                disabled={isLoading}
              />
            </div>
          </div>
          <Button
            type="submit"
            loading={isLoading}
            label="Register"
            loadingLabel="Registering"
            color="#238636"
            hoveredColor="#26a641"
            pressedColor="#016401"
            disabledColor="#016401"
          />
        </form>
        <div className="form-info">
          <span>By clicking Register or registering through a third party you accept the</span>
          <span>
            BLOG-EXPRESS{' '}
            <Link to="/register">
              Terms of Use and acknowledge the Privacy Policy and Cookie Policy
            </Link>
          </span>
        </div>
        <div className="form-info">
          <span>
            Already have an account? <Link to="/login">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
