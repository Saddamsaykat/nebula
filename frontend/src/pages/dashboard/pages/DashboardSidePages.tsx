import { FiSearch } from "react-icons/fi";
import { IoIosChatbubbles, IoMdSettings } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteAccount, logoutUser } from "../../../authActions/authActions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useDeletePostMutation } from "../../../redux/slice/postDataSlice";

const DashboardSidePages = ({ userInfo, userEmail }) => {
  console.log(userInfo);
  const [logoutMessage, setLogoutMessage] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Call the mutation at the top level
  const [deletePost] = useDeletePostMutation();

  const handleLogout = () => {
    dispatch(logoutUser());
    setLogoutMessage("You have successfully logged out.");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const handleDeleteAccount = async (userInfo, userEmail) => {
    try {
      const payload = {
        batch: userInfo?.batch,
        department: userInfo?.department,
        studentId: userInfo?.student?.studentId,
      };

      await deletePost(payload); // ✅ Corrected Hook Usage
      await dispatch(deleteAccount(userEmail));

      alert("Your account has been successfully deleted.");
    } catch (error) {
      alert("Failed to delete account. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      {logoutMessage && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2">
          {logoutMessage}
        </div>
      )}
      <div className="h-screen p-3 space-y-2 w-60 dark:bg-gray-50 dark:text-gray-800">
        <div className="flex items-center p-2 space-x-4">
          <img
            src={userInfo?.student?.image}
            alt="User"
            className="w-12 h-12 rounded-full dark:bg-gray-500"
          />
          <div>
            <h2 className="text-xl font-semibold">{userInfo?.student?.name}</h2>
            <span className="flex items-center space-x-1">
              <a
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
            <li>
              <NavLink
                to="/dashboard/profile"
                className="flex items-center p-2 space-x-3 rounded-md dark:bg-gray-100 dark:text-gray-900"
              >
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <FiSearch />
                <span>Search</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <IoIosChatbubbles />
                <span>Chat</span>
              </a>
            </li>
            <li>
              <a
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
                href="#"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <IoMdSettings />
                <span>Settings</span>
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-2 space-x-3 rounded-md text-red-500 hover:text-red-700"
              >
                <GiExitDoor />
                <span>Logout</span>
              </button>
            </li>
          </ul>
          <div>
            <button
              onClick={() => handleDeleteAccount(userInfo, userEmail)}
              className="p-2 bg-red-500 text-white rounded-md"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidePages;
