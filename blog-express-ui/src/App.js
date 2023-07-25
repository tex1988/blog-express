import { AuthContextProvider } from './context/AuthContext';
import { NotificationContextProvider } from './context/NotificationContext';
import Notifications from './components/Notifications';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthContextProvider>
      <NotificationContextProvider>
        <Notifications />
        <AppRoutes />
      </NotificationContextProvider>
    </AuthContextProvider>
  );
}

export default App;
