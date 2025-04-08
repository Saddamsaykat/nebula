/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, useLocation } from "react-router-dom";
import DashboardSidePages from "../../component/dashboard/DashboardSidePages";
import { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { getThemeStyles } from "../../utils/themeStyles/themeStyles";
import useUserDetails from "../../hook/useUserDetails";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = getThemeStyles(theme);
  const { userInfo } = useUserDetails();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false); // Close on route change
  }, [location.pathname]);

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        style={styles}
        className={`fixed inset-y-0 z-50 left-0 w-80 border p-4 transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-x-hidden overflow-y-auto`}
      >
        <button
          className="lg:hidden absolute top-4 right-4 text-xl"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>
        <ul className="menu text-base-content h-full">
          <DashboardSidePages />
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Mobile Menu Button */}
        <div className="lg:hidden p-4">
          <button onClick={() => setIsOpen(true)} className="text-2xl">
            <FiMenu />
          </button>
        </div>
        <div className="p-6">
          <div className="flex justify-center items-center h-16 bg-gray-800 text-white">
            <span>
              Welcome Back {userInfo?.student?.firstName}{" "}
              {userInfo?.student?.lastName}
            </span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
