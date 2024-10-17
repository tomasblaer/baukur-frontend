import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import axios from 'axios'
import Login from './views/login/Login.jsx'
import Categories from './views/categories/Categories.jsx'

axios.defaults.baseURL = 'http://localhost:8080'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/categories',
    element: <Categories />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
