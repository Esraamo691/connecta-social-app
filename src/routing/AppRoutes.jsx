import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/auth/Login/Login";
import Layout from "../Components/Layout/Layout";
import Register from "../Pages/auth/Register/Register";
import Posts from "../Pages/Posts/Posts";
import NotFound from "../Pages/NotFound/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedAuthRoutes from "./ProtectedAuthRoutes";
import PostDetails from "../Pages/PostDetails/PostDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            <Posts />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/posts",
        element: (
          <ProtectedRoutes>
            <Posts />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/posts/:id",
        element: (
          <ProtectedRoutes>
            <PostDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedAuthRoutes>
            <Login />
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedAuthRoutes>
            <Register />
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
