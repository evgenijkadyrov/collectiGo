import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GlobalStyles from './globalStyles'
import { Home } from '@/pages/home'
import { Items } from '@/pages/items'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { Paths } from '@/Paths'
import { Login } from '@/pages/login'
import { Register } from '@/pages/registration'
import { EditCollectionPage } from '@/pages/editCollection'
import { EditItemPage } from '@/pages/editItem'
import React from 'react'

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Home />,
  },
  {
    path: Paths.collection,
    element: <Items />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
  {
    path: Paths.editCollection,
    element: <EditCollectionPage />,
  },
  {
    path: Paths.editItem,
    element: <EditItemPage />,
  },
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <GlobalStyles />
    </Provider>
  </React.StrictMode>
)
