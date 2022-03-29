import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { useEffect, useState } from 'react';

function Profile() {
  const [user, setUser] = useState({});
  const auth = getAuth();

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  return user ? <h1>{user.displayName}</h1> : <h1>No User</h1>;
}

export default Profile;
