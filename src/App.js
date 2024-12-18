import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Cart from './pages/cart/Cart';
import Orders from './pages/orders/Orders';
import Protected from './Protected';
import Signup from './pages/signup/Signup';
import ProductDetails from './pages/productDetails/ProductDetails';
import { useDispatch } from 'react-redux';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { makeUserPersistence } from './redux/reducers/authReducer';
import LandingPage from './pages/landingPage/LandingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(makeUserPersistence({ token: user }));
      }
      setLoading(false); // Set loading to false once auth state is determined
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: '/search',
          element: <Home />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/cart',
          element: <Protected><Cart /></Protected>,
        },
        {
          path: '/orders',
          element: <Protected><Orders /></Protected>,
        },
        {
          path: '/signup',
          element: <Signup />,
        },
        {
          path: '/products/:id',
          element: <ProductDetails />,
        },
      ],
    },
  ]);

  return (
    <>
      {loading ? (
        <div className="loading-screen">
          <h1 className='bubble-text'>Welcome to SwiftShoppers</h1>
        </div>
      ) : (
        <div className="App">
          <ToastContainer />
          <RouterProvider router={router} />
        </div>
      )}
    </>
  );
}

export default App;
