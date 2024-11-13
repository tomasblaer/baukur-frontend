import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import axios from 'axios'
import Categories from './views/categories/Categories.jsx'
import Register from './views/register/Register.jsx'
import Expenses from './views/expenses/Expenses.jsx'
import { Toaster } from 'react-hot-toast'
import Dashboard from './views/dashboard/Dashboard.jsx'
import Header from './components/Header.jsx'
import User from './views/user/User.jsx'

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true;
axios.interceptors.response.use(response =>{
  return response;
}, error => {
  if (error.response.status === 403) {
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/categories',
    element: <Categories />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/expenses',
    element: <Expenses />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/user',
    element: <User/>,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>,
)
