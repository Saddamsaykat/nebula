import { Outlet } from "react-router-dom";
import Navbar from "../../component/navbar/Navbar";
import Footer from "../../component/footer/footer";

const Home = () => {
  return (
    <div>
      <p className="text-center text-3xl">Welcome to the Alumni Association of ZHSUST University! <span className="text-lime-500 ">আপনাকে স্বাগতম</span> </p>
      <Navbar/>
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Home;
