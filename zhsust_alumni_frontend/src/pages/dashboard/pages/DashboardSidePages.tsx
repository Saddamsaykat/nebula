import { FiSearch } from "react-icons/fi";
import { IoIosChatbubbles, IoMdSettings } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { GiExitDoor } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const DashboardSidePages = () => {
  return (
    <div className="h-screen p-3 space-y-2 w-60 dark:bg-gray-50 dark:text-gray-800">
      <div className="flex items-center p-2 space-x-4">
        <img
          src="https://source.unsplash.com/100x100/?portrait"
          alt=""
          className="w-12 h-12 rounded-full dark:bg-gray-500"
        />
        <div>
          <h2 className="text-lg font-semibold">Leroy Jenkins</h2>
          <span className="flex items-center space-x-1">
            <a
              rel="noopener noreferrer"
              href="#"
              className="text-xs hover:underline dark:text-gray-600"
            >
              View profile
            </a>
          </span>
        </div>
      </div>
      <div className="divide-y dark:divide-gray-300">
        <ul className="pt-2 pb-4 space-y-1 text-sm">
          <NavLink to={'/dashboard/profile'} className="dark:bg-gray-100 dark:text-gray-900">
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center p-2 space-x-3 rounded-md"
            >
             <MdDashboard />
              <span>Dashboard</span>
            </a>
          </NavLink>
          <li>
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center p-2 space-x-3 rounded-md"
            >
              <FiSearch />
              <span>Search</span>
            </a>
          </li>
          <li>
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center p-2 space-x-3 rounded-md"
            >
              <IoIosChatbubbles />
              <span>Chat</span>
            </a>
          </li>
          <li>
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center p-2 space-x-3 rounded-md"
            >
              <FaHeart />
              <span>Wishlist</span>
            </a>
          </li>
        </ul>
        <ul className="pt-4 pb-2 space-y-1 text-sm">
          <li>
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center p-2 space-x-3 rounded-md"
            >
              <IoMdSettings />
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center p-2 space-x-3 rounded-md"
            >
            <GiExitDoor />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidePages;
