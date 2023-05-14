import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { createContext, useState } from 'react';
import MainLayout from './layouts/MainLayout';
import MyPosts from './pages/MyPosts';

export const UserContext = createContext(undefined);

function App() {
  const [user, setUser] = useState(undefined);
  const value = { user: user, setUser: setUser };

  return (
    // <Routes>
    //   <Route
    //     path="/"
    //     element={
    //       <UserContext.Provider value={value}>
    //         <Home />
    //       </UserContext.Provider>
    //     }
    //   />
    //   <Route
    //     path="/login"
    //     element={
    //       <UserContext.Provider value={value}>
    //         <Login />
    //       </UserContext.Provider>
    //     }
    //   />
    // </Routes>

    <Routes>
      <Route
        path="/"
        element={
          <UserContext.Provider value={value}>
            <MainLayout />
          </UserContext.Provider>
        }>
        <Route path="/" element={<MyPosts />} />
      </Route>
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
