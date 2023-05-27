import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { createContext, useEffect, useState } from 'react';
import MainLayout from './layouts/MainLayout';
import MyPosts from './pages/MyPosts';
import Post from './pages/Post';
import AllPosts from './pages/AllPosts';
import Register from './pages/Register';
import { getFromLocalStorage } from '../utils/utils';

export const UserContext = createContext(undefined);
export const USER_KEY = 'user';

function App() {
  const [user, setUser] = useState(undefined);
  const value = { user: user, setUser: setUser };

  useEffect(() => {
    const user = getFromLocalStorage(USER_KEY);
    setUser(user);
  }, [])

  return (
    <Routes>
      <Route
        path='/'
        element={
          <UserContext.Provider value={value}>
            <MainLayout />
          </UserContext.Provider>
        }>
        <Route path='/' element={<AllPosts />} />
        <Route path='/user/:userId/post' element={<MyPosts />} />
        <Route path={'/user/:userId/post/:postId'} element={<Post />} />
      </Route>
      <Route
        path='/login'
        element={
          <UserContext.Provider value={value}>
            <Login />
          </UserContext.Provider>
        }
      />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
}

export default App;
