import React from 'react';
import { useState } from 'react';
import { db } from '../firebase.config';
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((formData) => ({ ...formData, [e.target.id]: e.target.value }));
  };

  //sign up new user
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      //const user = userCredential.user;

      console.log(`signed In`);
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <header>
          <h1>Sign In</h1>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type='email'
              id='email'
              placeholder='email'
              className='emailInput'
              value={email}
              onChange={onChange}
            />
            <input
              type='password'
              id='password'
              placeholder='password'
              className='passwordInput'
              value={password}
              onChange={onChange}
            />
            <div className='signIn'>
              <p className='signInText'>Sign In</p>
              <button className='signInButton'>Sign In</button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default SignIn;
