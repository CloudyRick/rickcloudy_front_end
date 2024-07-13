import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PageLayout from "./components/Layout";
import PrivateRoutes from "./routes/PrivateRoutes";
import { adminRoutes, protectedRoutes, publicRoutes } from "./routes/Routing";
import ProtectedRoutes from "./routes/ProtectedRoutes";

const isAuth: boolean = false;

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
        // path: '/',
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

const App = () => <RouterProvider router={router} />;

export default App;
