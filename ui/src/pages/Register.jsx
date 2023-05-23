import { Link } from 'react-router-dom';

export const Register = () => {
  return (
    <div className='centered-wrapper'>
      <h3>BLOG-EXPRESS</h3>
      <form className='form'>
        <div className='flex-row-center'>
          <div className='flex-column'>
            <label className='input-label' htmlFor='fname'>First name</label>
            <input id='fname' autoComplete='given-name'/>
          </div>
          <div className='flex-column'>
            <label className='input-label' htmlFor='lname'>Last name</label>
            <input id='lname' autoComplete='family-name'/>
          </div>
        </div>
        <div className='flex-row-center mt-10'>
          <div className='flex-column'>
            <label className='input-label' htmlFor='username'>Username</label>
            <input id='username' autoComplete='nickname'/>
          </div>
        </div>
        <div className='flex-row-center mt-10'>
          <div className='flex-column'>
            <label className='input-label' htmlFor='email'>Email</label>
            <input id='email' autoComplete='email'/>
          </div>
        </div>
        <button type='submit'>Register</button>
      </form>
      <div className='form-info'>
        <span>By clicking Register or registering through a third party you accept the</span>
        <span>BLOG-EXPRESS <Link to='/register'>Terms of Use and acknowledge the Privacy Policy and Cookie Policy</Link></span>
      </div>
      <div className='form-info'>
        <span>Already have an account? <Link to='/login'>Sign in</Link></span>
      </div>
    </div>
  );
};

export default Register;