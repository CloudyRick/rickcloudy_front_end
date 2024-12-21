import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { adminRoutes, protectedRoutes, publicRoutes } from "./Routing";
import ProtectedRoutes from "./ProtectedRoutes";
import PageLayout from "../components/Layout";
import PrivateRoutes from "./PrivateRoutes";
import { useAuth } from "../utils/auth/AuthContext";

const AppRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth(); // Now inside AuthProvider, this works properly

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state until authentication status is ready
  }

  const futureFlags: any = {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  };
  const router = createBrowserRouter(
    [
      {
        element: <PrivateRoutes isAuthenticated={isAuthenticated} />,
        children: [
          {
            path: "admin/*",
            element: <PageLayout isAuthenticated={isAuthenticated} />,
            children: adminRoutes,
          },
        ],
      },
      {
        element: <ProtectedRoutes isAuthenticated={isAuthenticated} />,
        children: [
          {
            element: <PageLayout isAuthenticated={isAuthenticated} />,
            children: protectedRoutes,
          },
        ],
      },
      {
        element: <PageLayout isAuthenticated={isAuthenticated} />,
        children: publicRoutes,
      },
    ],
    {
      future: futureFlags,
    }
  );

  return <RouterProvider router={router} />;
};

export default AppRoutes;
