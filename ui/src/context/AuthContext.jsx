import React, { createContext, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

export const USER_CONTEXT_KEY = 'user';

const AuthContextProvider = ({ children }) => {
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
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };