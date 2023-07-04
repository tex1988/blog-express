import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './layouts/MainLayout';
import MyPosts from './pages/MyPosts';
import Post from './pages/Post';
import AllPosts from './pages/AllPosts';
import Register from './pages/Register';
import { AuthContextProvider } from './context/AuthContext';
import RequireAuth from './hoc/RequireAuth';
import { NotificationContextProvider } from './context/NotificationContext';
import Notifications from './components/Notifications';

function App() {
  return (
    <AuthContextProvider>
      <NotificationContextProvider>
        <Notifications/>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/post" replace />} />
            <Route path="/post" element={<AllPosts />} />
            <Route
              path="/user/:userId/post"
              element={
                <RequireAuth>
                  <MyPosts />
                </RequireAuth>
              }
            />
            <Route path="/user/:userId/post/:postId" element={<Post />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </NotificationContextProvider>
    </AuthContextProvider>
  );
}

export default App;
