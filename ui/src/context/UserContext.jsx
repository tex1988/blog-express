import React, { createContext, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const UserContext = createContext(null);

export const USER_CONTEXT_KEY = 'user';

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage(USER_CONTEXT_KEY);

  function signIn(user) {
    setUser(user);
  }

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  const contextValue = useMemo(() => ({
    user,
    signIn,
    signOut
  }), [user, signIn, signOut])

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };