import { createHashRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StorageListPage from './pages/StorageListPage'
import PageLayout from './components/PageLayout'
import { Router } from '@remix-run/router'
import StorageDetailPage from './pages/StorageDetailPage'

export const router: Router = createHashRouter([
  {
    element: <PageLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/storage',
        element: <StorageListPage />
      },
      {
        path: '/storage-detail/:storageId',
        element: <StorageDetailPage />
      }
    ]
  }
])
