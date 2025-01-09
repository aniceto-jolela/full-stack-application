import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AppRoutes from "./routes/AppRoutes"
import CssBaseline from '@mui/material/CssBaseline'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <RouterProvider router={AppRoutes} />
  </StrictMode>,
)
