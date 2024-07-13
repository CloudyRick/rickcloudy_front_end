import Home from "../pages/Home";
import { RouteObject } from "react-router-dom";
import SignIn from "../pages/HireMe";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import AdminDashboard from "../pages/protected/admin/AdminDashboard";
import AboutMe from "../pages/AboutMe";
import NotFound from "../pages/NotFound";
import BlogCreation from "../pages/protected/admin/BlogCreation";

export const adminRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "create-blog",
    element: <BlogCreation />,
  },
];

export const protectedRoutes: RouteObject[] = [
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
];

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about-me",
    element: <AboutMe />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
