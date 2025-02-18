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
import TutorRoute from "../privet/TutorRoute";
import StudentRoute from "../privet/StudentRoute";
import AllSession from "../pages/admin page/AllSession";
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
        path: "/all-sessions",
        element: <AllSession></AllSession>,
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
        element: (
          <Privet>
            <BookedDetails></BookedDetails>
          </Privet>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <Privet>
            <Payment></Payment>
          </Privet>
        ),
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
        element: (
          <TutorRoute>
            <CreateStudy></CreateStudy>
          </TutorRoute>
        ),
      },
      {
        path: "view-all-study",
        element: (
          <TutorRoute>
            <ViewAllStudy></ViewAllStudy>
          </TutorRoute>
        ),
      },
      {
        path: "upload-materials",
        element: (
          <TutorRoute>
            <UploadMaterials></UploadMaterials>
          </TutorRoute>
        ),
      },
      {
        path: "view-all-materials",
        element: (
          <TutorRoute>
            <ViewAllMaterials></ViewAllMaterials>,
          </TutorRoute>
        ),
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
        element: (
          <StudentRoute>
            <ViewBookedSession></ViewBookedSession>,
          </StudentRoute>
        ),
      },
      {
        path: "create-note",
        element: (
          <StudentRoute>
            <CreateNote></CreateNote>,
          </StudentRoute>
        ),
      },
      {
        path: "personal-note",
        element: (
          <StudentRoute>
            <ManagePersonalNotes></ManagePersonalNotes>,
          </StudentRoute>
        ),
      },
      {
        path: "all-study-materials",
        element: (
          <StudentRoute>
            <ViewStudyMaterials></ViewStudyMaterials>,
          </StudentRoute>
        ),
      },
      {
        path: "booked-details/:id",
        element: (
          <StudentRoute>
            <BookedDetails></BookedDetails>,
          </StudentRoute>
        ),
      },
    ],
  },
]);
