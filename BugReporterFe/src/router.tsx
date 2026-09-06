import { createBrowserRouter } from 'react-router-dom';

import Home from "./pages/home/home.tsx";
import Signup from "./pages/signup/signup.tsx";
import Login from "./pages/login/login.tsx";
import NotFound from './pages/404/notFound.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/*',
    element: <NotFound />
  }
])

export default router;