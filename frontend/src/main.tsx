import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AppRoutes from "./routes/AppRoutes"
import CssBaseline from '@mui/material/CssBaseline'
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <SnackbarProvider maxSnack={3}>
      <RouterProvider router={AppRoutes} />
    </SnackbarProvider>
  </StrictMode>,
)
