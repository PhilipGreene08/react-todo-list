import React from 'react';
import { useState } from 'react';
import { db } from '../firebase.config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  //sign up new user
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });
      //I should delete the password here but for the sake of
      //simplicity I wont just yet

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      //setFormData({ name: '', email: '', password: '' });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <header>
          <h1>Sign Up</h1>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              id='name'
              placeholder='name'
              className='nameInput'
              value={name}
              onChange={onChange}
            />
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
            <div className='signUp'>
              <p className='signUpText'>Sign Up</p>
              <button className='signUpButton'>Sign Up</button>
            </div>
          </form>
          <Link to='/sign-in' className='signInUpLink'>
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignUp;
