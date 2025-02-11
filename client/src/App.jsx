import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import RouteGuard from "./components/route-guard";
import { useContext } from 'react'
import { AuthContext } from "./context/auth-context";
import InstructorDashboardpage from "./pages/instructor";
import AddNewCoursePage from "./pages/instructor/add-new-course";
import AdminDashboardpage from "./pages/admin";
import AdminAddNewCoursePage from "./pages/admin/add-new-course";
import AddNewUserPage from "./pages/admin/add-new-user";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import StudentLandingPage from "./pages/student/landing";
import StudentHomePage from "./pages/student/home";
import AboutPage from "./pages/student/about";
import AccountStudent from "./pages/student/account";
import NotFoundPage from "./pages/not-found";
import StudentViewCoursesPage from "./pages/student/courses";
import StudentViewCourseDetailsPage from "./pages/student/course-details";
import PaypalPaymentReturnPage from "./pages/student/payment-return";
import StudentCoursesPage from "./pages/student/student-courses";
import StudentViewCourseProgressPage from "./pages/student/course-progress";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'

function App() {

  const { auth } = useContext(AuthContext);

  return (
    <div>
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      <Routes>
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<AuthPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />

      <Route
        path="/instructor"
        element={
          <RouteGuard
            element={<InstructorDashboardpage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/create-new-course"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />

      <Route
        path="/instructor/edit-course/:courseId"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />

      <Route
        path="/admin"
        element={
          <RouteGuard
            element={<AdminDashboardpage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      {/* <Route
        path="/admin/create-new-course"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      */}
      <Route
        path="/admin/edit-course/:courseId"
        element={
          <RouteGuard
            element={<AdminAddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />

      <Route
        path="/admin/edit-user/:userId"
        element={
          <RouteGuard
            element={<AddNewUserPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />

      <Route
        path="/admin/create-new-user"
        element={
          <RouteGuard
            element={<AddNewUserPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />

       

      <Route
        path="/"
        element={
          <RouteGuard
            element={<StudentViewCommonLayout />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      >
        <Route path="" element={<StudentLandingPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="home" element={<StudentHomePage />} />
        <Route path="courses" element={<StudentViewCoursesPage />} />
        
        <Route path="account" element={<AccountStudent />} />
        <Route
          path="course/details/:id"
          element={<StudentViewCourseDetailsPage />}
        />
        <Route path="student-courses" element={<StudentCoursesPage />} />
        <Route path="payment-return" element={<PaypalPaymentReturnPage />} />
        <Route
          path="course-progress/:id"
          element={<StudentViewCourseProgressPage />}
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </ Routes>

  </div>
  )
}

export default App
