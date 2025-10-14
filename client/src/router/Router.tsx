import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/user/Home/Home";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import MyPost from "../pages/user/MyPost/MyPost";
import Detail from "../pages/user/Detail/Detail";
import ManagerUser from "../pages/admin/ManagerUser/ManagerUser";
import AdminHome from "../pages/admin/AdminHome/AdminHome";
import ManagerEnties from "../pages/admin/ManagerEntries/ManagerEnties";
import ManagerArticle from "../pages/admin/ManagerArticle/ManagerArticle";
import Protected from "../components/Protected/Protected";
import DontAdmin from "../pages/admin/DontAdmin/DontAdmin";

export default function Router() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
      path: "/mypost",
      element: (
        <Protected>
          <MyPost />
        </Protected>
      ),
    },
    {
      path: "/detail/:id",
      element: (
        <Protected>
          <Detail />
        </Protected>
      ),
    },
    {
      path: "/admin",
      element: <AdminHome />,
      children: [
        {
          path: "user",
          element: <ManagerUser />,
        },
        {
          path: "entries",
          element: <ManagerEnties />,
        },
        {
          path: "article",
          element: <ManagerArticle />,
        },
      ],
    },
    {
      path: "/dont-admin",
      element: <DontAdmin />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={routers} />
    </div>
  );
}
