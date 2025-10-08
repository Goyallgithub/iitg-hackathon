import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import AppLayout from './App.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Pumps from './pages/Pumps.jsx'
import Solar from './pages/Solar.jsx'
import MLPrediction from './pages/MLPrediction.jsx'
import Reports from './pages/Reports.jsx'
import SystemHealth from './pages/SystemHealth.jsx'
import Optimizer from './pages/Optimizer.jsx'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/pumps', element: <Pumps /> },
      { path: '/solar', element: <Solar /> },
      { path: '/ml', element: <MLPrediction /> },
      { path: '/reports', element: <Reports /> },
      { path: '/health', element: <SystemHealth /> },
      { path: '/optimizer', element: <Optimizer /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
