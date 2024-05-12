import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GlobalStyles from './globalStyles'
import { Home } from '@/pages/home'
import { Items } from '@/pages/items'
import { Item } from '@/pages/item'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { Paths } from '@/Paths'
import { Login } from '@/pages/login'
import { Register } from '@/pages/registration'
import { EditPage } from '@/pages/edit'

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
    path: Paths.item,
    element: <Item />,
  },
  {
    path: Paths.editCollection,
    element: <EditPage />,
  },
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
    <GlobalStyles />
  </Provider>
  // </React.StrictMode>
)
