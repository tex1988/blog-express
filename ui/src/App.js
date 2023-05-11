import Main from './pages/Main';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext(undefined);

function App() {
  const [user, setUser] = useState(undefined);
  const value = { user: user, setUser: setUser };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <UserContext.Provider value={value}>
            <Main />
          </UserContext.Provider>
        }
      />
      <Route
        path="/login"
        element={
          <UserContext.Provider value={value}>
            <Login />
          </UserContext.Provider>
        }
      />
    </Routes>
  );
}

export default App;
