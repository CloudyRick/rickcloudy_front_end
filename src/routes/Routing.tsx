import Home from "../pages/Home";
import { RouteObject } from "react-router-dom";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import AboutMe from "../pages/AboutMe";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import AdminDashboard from "../pages/private/admin/AdminDashboard";
import BlogCreation from "../pages/private/admin/BlogCreation";
import BlogsPage from "../pages/BlogLists";
import BlogDetail from "../pages/BlogDetail";
import AdminBlogList from "../pages/private/admin/AdminBlogList";
import UpdateBlog from "../pages/private/admin/UpdateBlog";

export const adminRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "create-blog",
    element: <BlogCreation />,
  },
  {
    path: "blogs",
    element: <AdminBlogList />,
  },
  {
    path: "update-blog/:id",
    element: <UpdateBlog />,
  },
  {
    path: "*",
    element: <NotFound />,
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
    path: "/blogs",
    element: <BlogsPage />,
  },
  {
    path: "/blogs/:id",
    element: <BlogDetail />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
