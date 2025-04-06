/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiSearch } from "react-icons/fi";
import { IoIosChatbubbles, IoMdSettings } from "react-icons/io";
import { GiExitDoor } from "react-icons/gi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { deleteAccount, logoutUser } from "../../authActions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useDeletePostMutation } from "../../redux/slice/postData/postDataSlice";
import Swal from "sweetalert2";
import { getThemeStyles } from "../../utils/themeStyles/themeStyles";

interface DashboardSidePagesProps {
  userInfo: {
    student?: {
      name?: string;
      image?: string;
      studentId?: string;
    };
    batch?: any;
    department?: string;
  } | null;
  userEmail?: string;
}

const DashboardSidePages = ({ userInfo, userEmail }: DashboardSidePagesProps) => {
  const [logoutMessage, setLogoutMessage] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = getThemeStyles(theme);
  const [deletePost] = useDeletePostMutation();

  const handleLogout = () => {
    dispatch(logoutUser() as any);
    setLogoutMessage("You have successfully logged out.");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const handleDeleteAccount = async (userInfo: any, userEmail: string) => {
    try {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone. Your account will be permanently deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
  
      if (!confirmation.isConfirmed) return;
  
      const payload = {
        batch: userInfo?.batch,
        department: userInfo?.department,
        studentId: userInfo?.student?.studentId,
      };
  
      await deletePost(payload); 
      await dispatch(deleteAccount(userEmail) as any);
  
      await Swal.fire({
        title: "Deleted!",
        text: "Your account has been successfully deleted.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
  
      navigate("/login"); // Redirect after deletion
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete account. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
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
      <div className={`h-screen p-3 space-y-2 w-72 ${styles}`}>
        <div className="flex items-center p-2 space-x-4">
          <img
            src={userInfo?.student?.image}
            alt="User"
            className="w-12 h-12 rounded-full dark:bg-gray-500"
          />
          <div>
            <h2 className="text-xl font-semibold">{userInfo?.student?.name}</h2>
            <Link to={'/dashboard/profile'}  className="flex items-center space-x-1">
              <a
                href="#"
                className="text-xs hover:underline dark:text-gray-600"
              >
                View profile
              </a>
            </Link>
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
                <span>Update Profile</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <IoIosChatbubbles />
                <span>Chat History</span>
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
              onClick={() => handleDeleteAccount(userInfo, userEmail as string)}
              className="p-2 bg-red-500 text-white rounded-md mt-4"
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
