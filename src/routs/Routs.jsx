import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/Home";
import MainLayout from "../main layout/MainLayout";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/dashboard/Dashboard";
import CreateStudy from "../pages/Tutor-page/CreateStudy";
import ViewAllStudy from "../pages/Tutor-page/ViewAllStudy";
import ViewAllMaterials from "../pages/Tutor-page/ViewAllMaterials";
import UploadMaterials from "../pages/Tutor-page/UploadMaterials";
import AllUsers from "../pages/admin page/AllUsers";
import AllStudySession from "../pages/admin page/AllStudySession";
import AllMaterials from "../pages/admin page/AllMaterials";
import ViewBookedSession from "../pages/student page/ViewBookedSession";
import CreateNote from "../pages/student page/CreateNote";
import ManagePersonalNotes from "../pages/student page/ManagePersonalNotes";
import ViewStudyMaterials from "../pages/student page/ViewStudyMaterials";
import SessionDetails from "../components/studey session section/SessionDetails";
import Privet from "../privet/privet";
import BookedDetails from "../pages/student page/BookedDetails";
import Payment from "../components/studey session section/payment/Payment";
import AdminRoute from "../privet/AdminRoute";
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
      {
        path: "/session-details/:id",
        element: (
          <Privet>
            <SessionDetails></SessionDetails>
          </Privet>
        ),
      },
      {
        path: "/booked-details/:id",
        element: <BookedDetails></BookedDetails>,
      },
      {
        path: "/payment/:id",
        element: <Payment></Payment>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
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
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "all-study-session",
        element: (
          <AdminRoute>
            <AllStudySession></AllStudySession>
          </AdminRoute>
        ),
      },
      {
        path: "all-materials",

        element: (
          <AdminRoute>
            <AllMaterials></AllMaterials>
          </AdminRoute>
        ),
      },

      //student routs only
      {
        path: "view-book-session",
        element: <ViewBookedSession></ViewBookedSession>,
      },
      {
        path: "create-note",
        element: <CreateNote></CreateNote>,
      },
      {
        path: "personal-note",
        element: <ManagePersonalNotes></ManagePersonalNotes>,
      },
      {
        path: "all-study-materials",
        element: <ViewStudyMaterials></ViewStudyMaterials>,
      },
      {
        path: "booked-details/:id",
        element: <BookedDetails></BookedDetails>,
      },
    ],
  },
]);
