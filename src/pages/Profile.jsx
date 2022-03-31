import { async } from '@firebase/util';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const [changeDetails, setChangeDetails] = useState(false);

  const { name, email } = formData;

  const onLogout = async () => {
    try {
      await signOut(auth);
      navigate('/sign-in');
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (e) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        email: email,
      }).then(console.log(`updated profile in auth`));
      console.log(auth.currentUser.uid);

      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, {
        name: name,
        email: email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div>
      <header>
        <p>Profile Header</p>
        <button onClick={onLogout}>Log Out</button>
      </header>

      <main>
        <div className='personalDetailsHeader'>
          <p>Personal Details</p>
          <p
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? `Set Details` : `Edit Details`}
          </p>
        </div>
        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              value={name}
              disabled={!changeDetails}
              className={!changeDetails ? 'profileInfo' : 'profileInfoActive'}
              onChange={onChange}
            />
            <input
              type='email'
              id='email'
              value={email}
              disabled={!changeDetails}
              className={!changeDetails ? 'profileInfo' : 'profileInfoActive'}
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
