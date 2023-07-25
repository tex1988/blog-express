import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AllPosts from '../pages/AllPosts';
import RequireAuth from '../hoc/RequireAuth';
import MyPosts from '../pages/MyPosts';
import Post from '../pages/Post';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { AnimatePresence } from 'framer-motion';

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
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
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AppRoutes;