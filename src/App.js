
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home'
import Login from './pages/login/Login';
import Cart from './pages/cart/Cart'
import Orders from './pages/orders/Orders'
import Protected from './Protected'
import Signup from './pages/signup/Signup';
import ProductDetails from './pages/productDetails/ProductDetails'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: "/cart",
          element: <Protected><Cart /></Protected>
        },
        {
          path: "/orders",
          element: <Protected><Orders /></Protected>
        },

        {
          path: '/signup',
          element: <Signup />
        },
        {
          path: '/products/:id',
          element: <ProductDetails />
        }
      ]
    }
  ])


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

