// Login.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/UserAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { doSignInWithEmailAndPassword } from '../context/UserAuthContext'


const Login = () => {
    const navigate = useNavigate();

    const { error } = useAuth();
    const [err, setError] = useState('');

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)

    useEffect(() => {
        if (error) {
            setInterval(() => {
                setError('');
            }, 5000);
            setError(error);
        }
    }, [error]);

    const onSubmit = async (e) => {
      e.preventDefault();
      if (!isSigningIn) {
          setIsSigningIn(true);
          try {
              await doSignInWithEmailAndPassword(email, password);
              navigate('/');
          } catch (error) {
            console.log(errorMessage)
            if (error.code === 'auth/invalid-login-credentials') {
                  setErrorMessage('Invalid email or password. Please try again.');
              } else {
                  setErrorMessage('An error occurred. Please try again later.');
              }
          } finally {
              setIsSigningIn(false);
          }
      }
  };
  
  
  

    return (
        <div className='box'>
            {errorMessage && <p className='error'>{errorMessage}</p>}

            <form onSubmit={onSubmit} className='form'>
                <h2>Login Form</h2>
                <div className='inputfield'>
                    <input type='text' placeholder='Email' value={email} name='email' onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className='inputfield'>
                    <input type='password' placeholder='Password' value={password} name='password' onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className='inputfield'>
                    <input type='submit' />
                </div>
                <p className="forget">Don't have an account? <Link to={'/signup'}>Sign up</Link></p>
            </form>
        </div>
    );
};

export default Login;
