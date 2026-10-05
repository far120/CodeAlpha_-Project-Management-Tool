import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Loader from "../../components/Feedback/Loader";

const NotFound = lazy(() => import("./NotFound"));
const HomePage = lazy(() => import("../../pages/HomePage"));
const MainLayout = lazy(() => import("../../components/Layout/MainLayout"));
import Login from "../../features/auth/components/Login";
import Register from "../../features/auth/components/Register";
import Profile from "../../features/user/components/profile";
import ChangePassword from "../../features/user/components/changepassword";
import Dashboard from "../../features/user/components/dashboard";
import UserManagement from "../../features/user/components/UserManagement";
import UserActivityLogs from "../../features/logs/components/UserActivityLogs";
import ProtectedRoute from "./ProtectedRoute";
import ProjectList from "../../features/project/components/test";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    hydrateFallbackElement: <Loader />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/change-password",
            element: <ChangePassword />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/projects",
            element: <ProjectList />,
          },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={["super-admin", "admin"]} />,
        children: [
          {
            path: "/dashboard/users",
            element: <UserManagement />,
          },
          {
            path: "/dashboard/logs",
            element: <UserActivityLogs />,
          },
        ],
      },
    ],
  },
]);


