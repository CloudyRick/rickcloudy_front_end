import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PageLayout from "./components/Layout";
import PrivateRoutes from "./routes/PrivateRoutes";
import { adminRoutes, protectedRoutes, publicRoutes } from "./routes/Routing";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { AuthProvider } from "./utils/auth/AuthContext";

const isAuth: boolean = true;

const router = createBrowserRouter([
  {
    element: <PrivateRoutes isAuthenticated={isAuth} />,
    children: [
      {
        path: "/admin/",
        element: <PageLayout isAuthenticated={isAuth} />,
        children: adminRoutes,
      },
    ],
  },
  {
    element: <ProtectedRoutes isAuthenticated={isAuth} />,
    children: [
      {
        element: <PageLayout isAuthenticated={isAuth} />,
        children: protectedRoutes,
      },
    ],
  },
  {
    element: <PageLayout isAuthenticated={isAuth} />,
    children: publicRoutes,
  },
]);

const App = () => {
  return (
    <AuthProvider.Provider>
        <RouterProvider router={router} />;
      <AuthProvider/>
  )
  
};

export default App;
