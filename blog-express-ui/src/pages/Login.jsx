import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLoginQuery from '../hooks/useLoginQuery';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const credentials = { username, password };
  const { logIn, isLoading } = useLoginQuery();

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
    <motion.div
      className='centered-wrapper'
      exit={{ opacity: 0, y: -400, transition: { duration: 0.25 } }}>
      <div>
        <motion.h3
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.3 } }}>
          Sign in
        </motion.h3>
        <motion.h3
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.3 } }}>
          to BLOG-EXPRESS
        </motion.h3>
        <motion.form
          className='form'
          onSubmit={onSignIn}
          style={{ width: '250px' }}
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}>
          <label className='input-label' htmlFor='username'>
            Username
          </label>
          <input
            id='username'
            autoComplete='nickname'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            onKeyDown={onInputKeyPress}
            disabled={isLoading}
          />
          <label className='input-label' htmlFor='password'>
            Password
          </label>
          <input
            id='password'
            autoComplete='password'
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={onInputKeyPress}
            disabled={isLoading}
          />
          <Button
            className='mt-10'
            type='submit'
            disabled={username.length < 4 || password.length < 4 || isLoading}
            loading={isLoading}
            label='Sign in'
            loadingLabel='Signin in'
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
          <span>New to BLOG-EXPRESS?</span>
          <Link to='/register'>Create an account</Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
