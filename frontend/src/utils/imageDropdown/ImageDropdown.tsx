import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetPostsQuery } from "../../redux/slice/postDataSlice";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../authActions/authActions";
import Swal from "sweetalert2";

const ImageDropdown = ({ user }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",  
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutUser());
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
        }).then(() => {
          navigate("/login");
        });
      }
    });
  };

  const { data } = useGetPostsQuery();
  const userEmail = user?.email;

  const getUserDetails = (data: any[], userEmail: string) => {
    if (!data || !userEmail) return null;

    for (const batchData of data) {
      for (const department in batchData.department) {
        const users = batchData.department[department];

        const matchedUser = users.find((user: any) => user.email === userEmail);

        if (matchedUser) {
          return {
            batch: batchData.batch,
            department,
            student: matchedUser,
          };
        }
      }
    }

    return null;
  };

  const userInfo = getUserDetails(data, userEmail);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Image acting as dropdown trigger */}
      <div
        className="cursor-pointer flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={userInfo?.student?.image}
          alt="Profile"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-50 right-0 mt-2 w-[102px] bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className="py-2 text-sm text-gray-700">
            <NavLink
              to={"/dashboard"}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Dashboard
            </NavLink>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageDropdown;
