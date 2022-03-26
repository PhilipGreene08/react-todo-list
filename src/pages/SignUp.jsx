import React from 'react';
import { useState } from 'react';
import { db } from '../firebase.config';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

function SignUp() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;
  const onChange = (e) => {
    setFormData((formData) => ({ ...formData, [e.target.id]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          console.log(userCredential);
        }
      );
      setFormData({ name: '', email: '', password: '' });
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
