import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../pages/dashboard/Dashboard";
import Profile from "../../component/dashboard/Profile";
import Home from "../../pages/home/Home";
import Register from "../../pages/register/Register";
import Login from "../../pages/login/Login";
import RootPage from "../../pages/rootPage/RootPage";
import ForgetPassword from "../../pages/forgatPassword/ForgetPassword";
import PrivateRoute from "../privateRoutes/PrivateRoutes";
import Alumni from "../../pages/alumni/Alumni";
import Gallery from "../../component/main/galary/Gallery";
import UpdateProfile from "../../component/dashboard/UpdateProfile";
import Settings from "../../component/dashboard/settings/Settings";
import Welcome from "../../component/dashboard/Welcome";
import About from "../../component/about/About";
import AlumniFullView from "../../pages/alumni/AlumniFullView";
import UpdateImage from "../../component/dashboard/updateImage/UpdateImage";
import EmailVerification from "../../pages/emailVerification/EmailVerification";

const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div className="text-red-600 h-screen flex items-center justify-center">Not Found............</div>,
    children: [
      {
        path: "/",
        element: <RootPage />,
      },
      {
        path: "/home",
        element: <RootPage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <div>Contact</div>,
      },
      {
        path: "alumni",
        element: (
          <PrivateRoute>
            <Alumni />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: (
          <Register
            formData={{
              firstName: "",
              lastName: "",
              email: "",
              number: "",
              gender: "",
              presentAddress: "",
              permanentAddress: "",
              whatsapp: "",
              facebook: "",
              linkedin: "",
              github: "",
              aboutYourself: "",
              image: null,
              password: "",
              confirmPassword: "",
              batch: "",
              department: "",
              agree: false,
              jobDescription: "",
            }}
            setFormData={() => {}}
            selectedCountry=""
            setSelectedCountry={() => {}}
            selectedCity={{ name: { common: "" } }}
            setSelectedCity={() => {}}
          />
        ),
      },
      {
        path: "/emailVerification",
        element: <EmailVerification/>,
      },
      {
        path: "gallery",
        element: (
          <PrivateRoute>
            <Gallery />
          </PrivateRoute>
        ),
      },
      {
        path: "/forgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "*",
        element: <div>Not Found</div>,
      },
      {
        path: "/alumni-students/:id",
        element: <AlumniFullView />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <Welcome />,
          },
          {
            path: "/dashboard/profile",
            element: (
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/update-profile",
            element: (
              <PrivateRoute>
                <UpdateProfile />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/settings",
            element: (
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            ),
          },
          {
            path: '/dashboard/updateImage',
            element: <UpdateImage />
          }
        ],
      },
    ],
  },
]);

export default MainRoutes;
