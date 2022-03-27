import React, { useRef, useEffect, useState } from 'react';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    const auth = getAuth();
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
        } else {
          console.log(`user is not signed in`);
        }
      });
    }
    return (isMounted.current = false);
  }, [isMounted]);

  return { loggedIn };
}

export default useAuthStatus;
