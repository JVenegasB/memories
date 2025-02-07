import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import CreateNewMemory from './pages/CreateNewMemory.tsx'
import CalendarPage from './pages/CalendarPage.tsx'
import TodoListPage from './pages/TodoListPage.tsx'
import Memory from './pages/Memory.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import Layout from './components/Layout.tsx'
import Signup from './pages/SignupPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import DetailsPage from './pages/DetailsPage.tsx'

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
      }, {
        path: '/calendar',
        element: <CalendarPage />,
      },{
        path: '/todo-list',
        element: <TodoListPage />,
      },
      {
        path: '/details',
        element: <DetailsPage />
      }
    ]
  },{
    path:'/signup',
    element: <Signup />
  },{
    path:'/login',
    element: <LoginPage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
