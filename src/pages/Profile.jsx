import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  console.log(auth.currentUser);

  const onLogout = async () => {
    try {
      await signOut(auth);
      navigate('/sign-in');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <header>
        <p>Profile</p>
        <button onClick={onLogout}>Log Out</button>
      </header>

      <main>
        <div className='personalDetailsHeader'>
          <p>Personal Details</p>
          <p>Change Details</p>
        </div>
      </main>
    </div>
  );
}

export default Profile;
