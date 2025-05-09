import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../components/layouts/RootLayout';
import LoginPage from '../components/auth/LoginPage';
import RegisterPage from '../components/auth/RegisterPage';
import DashboardPage from '../components/dashboard/DashboardPage';
import ListPage from '../components/lists/ListPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'lists/:id', element: <ListPage /> },
    ],
  },
]);