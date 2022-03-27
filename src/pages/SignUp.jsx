import React from 'react';
import { useState } from 'react';
import { db } from '../firebase.config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

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
    setFormData((formData) => ({ ...formData, [e.target.id]: e.target.value }));
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

      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        password,
        timestamp: serverTimestamp(),
      });
      setFormData({ name: '', email: '', password: '' });
      navigate('/profile');
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
        </main>
      </div>
    </>
  );
}

export default SignUp;