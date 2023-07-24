import { Link } from 'react-router-dom';
import { useState } from 'react';
import useRegisterQuery from '../hooks/useRegisterQuery';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';

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
    <motion.div
      className='centered-wrapper'
      exit={{ opacity: 0, y: -400, transition: { duration: 0.25 } }}>
      <div>
        <motion.h3
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.3 } }}>
          BLOG-EXPRESS
        </motion.h3>
        <motion.form
          className='form'
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}>
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
          </div>
          <Button
            type='submit'
            loading={isLoading}
            label='Register'
            loadingLabel='Registering'
            color='#238636'
            hoveredColor='#26a641'
            pressedColor='#016401'
            disabledColor='#016401'
          />
        </motion.form>
        <motion.div
          className='form-info'
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}>
          <span>By clicking Register or registering through a third party you accept the</span>
          <span>
            BLOG-EXPRESS{' '}
            <Link to='/register'>
              Terms of Use and acknowledge the Privacy Policy and Cookie Policy
            </Link>
          </span>
        </motion.div>
        <motion.div
          className='form-info'
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }}>
          <span>
            Already have an account? <Link to='/login'>Sign in</Link>
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Register;
