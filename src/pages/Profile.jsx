import React from 'react';
import { useAuthStatus } from '../custom_hooks/useAuthStatus';

function Profile() {
  const { loggedIn } = useAuthStatus();
  return <div>Profile</div>;
}

export default Profile;
