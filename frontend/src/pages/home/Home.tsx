import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../component/navbar/Navbar";
import Footer from "../../component/footer/Footer";

const Home = () => {
  const location = useLocation();

  const hideNavbarFooter = location.pathname === "/login" || location.pathname === "/register";
  
  return (
    <div>
      {!hideNavbarFooter && (
        <p className="text-center text-3xl">
          Welcome to the Alumni Association of ZHSUST University!{" "}
          <span className="text-lime-500 ">আপনাকে স্বাগতম</span>{" "}
        </p>
      )}
      {!hideNavbarFooter && <Navbar />}
      <div className="min-h-screen">
        <Outlet /> {/* Renders the nested routes */}
      </div>
      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

export default Home;
