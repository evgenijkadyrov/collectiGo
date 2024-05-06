import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GlobalStyles from './globalStyles'
import { Home } from '@/pages/home'
import { Items } from '@/pages/items'
import { Item } from '@/pages/item'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/:collectionId',
    element: <Items />,
    children:[
      {
        path: '/:collectionId/items/:itemId',
        element: <Item />,

      },
    ]
  },

])
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <>
    <RouterProvider router={router} />
    <GlobalStyles />
  </>
  // </React.StrictMode>
)
