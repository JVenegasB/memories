import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import CreateNewMemory from './pages/CreateNewMemory.tsx'
import Memory from './pages/Memory.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import Layout from './components/Layout.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      }, {
        path: '/new-memory',
        element: <CreateNewMemory />,
      }, {
        path: '/memory',
        element: <Memory />,
      }

    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
