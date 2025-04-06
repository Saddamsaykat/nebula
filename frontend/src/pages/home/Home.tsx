/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../component/navbar/Navbar";
import Footer from "../../component/footer/Footer";
import { useSelector } from "react-redux";
import { getThemeStyles } from "../../utils/themeStyles/themeStyles";
import Chatbot from "../../component/main/chatbot/Chatbot";

const Home = () => {
  const location = useLocation();

  const hideNavbarFooter =
    location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/dashboard" || location.pathname === "/dashboard/profile";

  const theme = useSelector((state: any) => state.theme.theme);
  const styles = getThemeStyles(theme);

  return (
    <div style={styles}>
      {!hideNavbarFooter && (
        <p className="text-center text-3xl">
          Welcome to the Alumni Association of ZHSUST University!{" "}
          <span className="text-lime-500 ">আপনাকে স্বাগতম</span>{" "}
        </p>
      )}
      {!hideNavbarFooter && <Navbar />}
      <Outlet />
      {!hideNavbarFooter && <Footer />}
      {!hideNavbarFooter && <Chatbot />}
    </div>
  );
};

export default Home;
