import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { Suspense } from 'react';
import MainLayout from './layouts/MainLayout';
import MyPosts from './pages/MyPosts';
import Post from './pages/Post';
import AllPosts from './pages/AllPosts';
import Register from './pages/Register';
import Loading from './components/Loading';
import { UserContextProvider } from './context/UserContext';

function App() {

  return (
    <Routes>
      <Route
        path="/"
        element={
          <UserContextProvider>
            <MainLayout />
          </UserContextProvider>
        }>
        <Route path="/" element={<AllPosts />} />
        <Route path="/user/:userId/post" element={<MyPosts />} />
        <Route
          path={'/user/:userId/post/:postId'}
          element={
            <Suspense fallback={<Loading />}>
              <Post />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/login"
        element={
          <UserContextProvider>
            <Login />
          </UserContextProvider>
        }
      />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
