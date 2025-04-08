import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../pages/dashboard/Dashboard";
import Profile from "../../component/dashboard/Profile";
import Home from "../../pages/home/Home";
import Register from "../../pages/register/Register";
import Login from "../../pages/login/Login";
import RootPage from "../../pages/rootPage/RootPage";
import ForgetPassword from "../../pages/forgatPassword/ForgetPassword";
import PrivateRoute from "../privateRoutes/PrivateRoutes";
import Weather from "../../pages/weather/Weather";
import Alumni from "../../pages/alumni/Alumni";
import Gallery from "../../component/main/galary/Gallery";

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
        path: "/register",
        element: (
          <Register
            setSelectedCountry={() => {}}
            selectedCountry={""}
            selectedCity={""}
            setSelectedCity={() => {}}
          />
        ),
      },
      {
        path: "events",
        element: <div>jfdsal</div>,
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
            element: (
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default MainRoutes;
