import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AllPosts from '../pages/AllPosts';
import RequireAuth from '../hoc/RequireAuth';
import MyPosts from '../pages/MyPosts';
import Post from '../pages/Post';
import Login from '../pages/Login';
import Register from '../pages/Register';

function AppRoutes() {
  const location = useLocation();

  return (
    <Routes key={location.pathname} location={location}>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<Navigate to='/post' replace />} />
        <Route path='/post' element={<AllPosts />} />
        <Route
          path='/user/:userId/post'
          element={
            <RequireAuth>
              <MyPosts />
            </RequireAuth>
          }
        />
        <Route path='/user/:userId/post/:postId' element={<Post />} />
      </Route>
      <Route key={'/login'} path='/login' element={<Login />} />
      <Route key={'/register'} path='/register' element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;