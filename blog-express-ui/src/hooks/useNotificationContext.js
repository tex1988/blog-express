import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

export default function useNotificationContext() {
  return useContext(NotificationContext);
}