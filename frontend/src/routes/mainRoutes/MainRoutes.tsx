import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../pages/dashboard/Dashboard";
import Profile from "../../pages/dashboard/pages/Profile";
import Home from "../../pages/home/Home";
import Register from "../../pages/register/Register";
import Login from "../../pages/login/Login";
import RootPage from "../../pages/rootPage/RootPage";
import ForgetPassword from "../../pages/forgatPassword/ForgetPassword";
import PrivateRoute from "../privateRoutes/PrivateRoutes";
import Weather from "../../pages/weather/Weather";
import Alumni from "../../pages/alumni/Alumni";

const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/home",
        element: <RootPage />,
      },
      {
        path: "about",
        element: <div>About</div>,
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
        path: "/events",
        element: <>sdjjdsfl</>,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "events",
        element: <div>Events</div>,
      },
      {
        path: "donate",
        element: <div>Donate</div>,
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
        path: "/weather",
        element: <Weather />,
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
            path: "/dashboard/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

export default MainRoutes;
