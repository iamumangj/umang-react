import React, { lazy, Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import Error from "./components/Error/Error";
import RestaurantMenu from "./components/RestaurantMenu/RestaurantMenu";
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";
import RestroCard from "./components/ShimmerUI/RestroCard";
import { CartProvider } from "./utils/CartContext";
import { AuthProvider } from "./utils/AuthContext";
import { useAuth } from "./utils/AuthContext";
import "./index.css";

/**
 * Chunking
 * Lazy Loading
 * Code Splitting
 * Dynamic Imports
 * Dynamic Bundding
 * Prefetching
 * Suspense
 * On-Demand Loading
 */

const About = lazy(() => import("./components/About/About"));
const Body = lazy(() => import("./components/Body/Body"));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <RestroCard />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Layout for authenticated users
const AppLayout = () => {
  const location = useLocation();

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <CartProvider>
      <div className="app">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </CartProvider>
  );
};

// Layout for login page (without protected routes)
const LoginLayout = () => {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <LoginLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<RestroCard />}>
              <Body />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/about",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<h1>Loading...</h1>}>
              <About />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/contact",
        element: (
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        ),
      },
      {
        path: "/restaurants/:resId",
        element: (
          <ProtectedRoute>
            <RestaurantMenu />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

// Root component with AuthProvider at the top level
const RootApp = () => {
  return (
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RootApp />);
