import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider,} from "react-router-dom"
import Login from './pages/LoginPage';
import Dashbord from './pages/Dashboard';
import './index.css';
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Login/>
  },
  {
    path: "/Dashbord",
    element: <Dashbord/>
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
