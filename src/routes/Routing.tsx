import Home from "../pages/Home";
import { RouteObject } from "react-router-dom";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import AboutMe from "../pages/AboutMe";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import AdminDashboard from "../pages/private/admin/AdminDashboard";
import BlogCreation from "../pages/private/admin/BlogCreation";

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
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "login",
    element: <Login />,
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
