import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/Home";
import MainLayout from "../main layout/MainLayout";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Privet from "../privet/privet";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);
