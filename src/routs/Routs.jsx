import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/Home";
import MainLayout from "../main layout/MainLayout";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Privet from "../privet/privet";
import Dashboard from "../pages/dashboard/Dashboard";
import CreateStudy from "../pages/Tutor-page/CreateStudy";
import ViewAllStudy from "../pages/Tutor-page/ViewAllStudy";
import ViewAllMaterials from "../pages/Tutor-page/ViewAllMaterials";
import UploadMaterials from "../pages/Tutor-page/UploadMaterials";
import AllUsers from "../pages/admin page/AllUsers";
import AllStudySession from "../pages/admin page/AllStudySession";
import AllMaterials from "../pages/admin page/AllMaterials";
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
  {
    path: "/dashboard",
    element: (
      <Privet>
        <Dashboard></Dashboard>
      </Privet>
    ),
    children: [
      //tutor routs only
      {
        path: "create-study",
        element: <CreateStudy></CreateStudy>,
      },
      {
        path: "view-all-study",
        element: <ViewAllStudy></ViewAllStudy>,
      },
      {
        path: "upload-materials",
        element: <UploadMaterials></UploadMaterials>,
      },
      {
        path: "view-all-materials",
        element: <ViewAllMaterials></ViewAllMaterials>,
      },

      //admin routs only
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "all-study-session",
        element: <AllStudySession></AllStudySession>,
      },
      {
        path: "all-materials",
        element: <AllMaterials></AllMaterials>,
      },
    ],
  },
]);
