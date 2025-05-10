import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import ListPage from '../components/lists/ListPage';
import { AuthLayout } from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '', element: <Navigate to="/login" replace /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/',
    element: <DashboardLayout children={undefined} />,
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'lists/:id', element: <ListPage /> },
    ],
  },
]);