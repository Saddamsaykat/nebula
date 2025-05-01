/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../component/navbar/Navbar";
import Footer from "../../component/footer/Footer";
import { useSelector } from "react-redux";
import { getThemeStyles } from "../../utils/themeStyles/themeStyles";
import Chatbot from "../../component/main/chatbot/Chatbot";
import Weather from "../weather/Weather";

const Home = () => {
  const location = useLocation();

  const hideNavbarFooter =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/dashboard/profile" ||
    location.pathname === "/dashboard/update-profile" ||
    location.pathname === "/forget-password" ||
    location.pathname === "/dashboard/settings" ||
    location.pathname === "/dashboard/updateImage" ||
    location.pathname === "/dashboard/chat-history";

  const theme = useSelector((state: any) => state.theme.theme);
  const styles = getThemeStyles(theme);

  return (
    <div style={styles}>
      {!hideNavbarFooter && (
        <p className="text-center text-sm md:text-base  lg:text-lg xl:text-2xl 2xl:text-3xl mt-4 mb-4">
          Welcome to the Alumni Association of CSE Family{" "}
          <span className="text-lime-500 ">আপনাকে স্বাগতম</span>{" "}
        </p>
      )}
      {!hideNavbarFooter && <Navbar />}
      
      <Outlet />
      {!hideNavbarFooter && <Footer />}
      {!hideNavbarFooter && <Chatbot />}
      {!hideNavbarFooter && <Weather />}
    </div>
  );
};

export default Home;
