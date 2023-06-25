import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUser } from '../api/api';

export const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const user = { firstName, lastName, username, password, email };
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    createUser(user).then(() => {
      navigate('/login');
    });
  }

  return (
    <div className='centered-wrapper'>
      <div>
        <h3>BLOG-EXPRESS</h3>
        <form className='form' onSubmit={onSubmit}>
          <div className='flex-row-center'>
            <div className='flex-column'>
              <label className='input-label' htmlFor='fname'>
                First name
              </label>
              <input
                id='fname'
                autoComplete='given-name'
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
              />
            </div>
            <div className='flex-column'>
              <label className='input-label' htmlFor='lname'>
                Last name
              </label>
              <input
                id='lname'
                autoComplete='family-name'
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
              />
            </div>
          </div>
          <div className='flex-row-center'>
            <div className='flex-column'>
              <label className='input-label' htmlFor='username'>
                Username
              </label>
              <input
                id='username'
                autoComplete='nickname'
                onChange={(event) => setUsername(event.target.value)}
                value={username}
              />
            </div>
            <div className='flex-column'>
              <label className='input-label' htmlFor='password'>
                Password
              </label>
              <input
                id='password'
                autoComplete='password'
                type='password'
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />

            </div>
          </div>
          <div className='flex-row-center mt-10'>
            <div className='flex-column'>
              <label className='input-label' htmlFor='email'>
                Email
              </label>
              <input
                id='email'
                autoComplete='email'
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
            </div>
          </div>
          <button type='submit'>Register</button>
        </form>
        <div className='form-info'>
          <span>By clicking Register or registering through a third party you accept the</span>
          <span>
            BLOG-EXPRESS{' '}
            <Link to='/register'>
              Terms of Use and acknowledge the Privacy Policy and Cookie Policy
            </Link>
          </span>
        </div>
        <div className='form-info'>
          <span>
            Already have an account? <Link to='/login'>Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
