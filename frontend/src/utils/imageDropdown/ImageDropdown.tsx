/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetPostsQuery } from "../../redux/slice/postData/postDataSlice";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../authActions/authActions";
import Swal from "sweetalert2";
import { useProjectImage } from "../../hook/getImageUrl";
// import { useFindImageById } from "../../hook/getImageUrl";
import defaultProjectImage from "../../assets/public/upload.png";

const ImageDropdown = ({ user }: any) => {
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
        dispatch(logoutUser() as any);
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

  const userInfo = getUserDetails(data as any, userEmail);
  const projectId = userInfo?.student?.image;
  const { imageUrl, isLoading } = useProjectImage(projectId);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Image acting as dropdown trigger */}
      <div
        className="cursor-pointer flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isLoading ? (
          <div className="relative w-[260px] h-[150px] bg-gray-100 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-[shimmer_1s_infinite]"></div>
          </div>
        ) : (
          <img
            className="object-cover object-center w-10 h-10 rounded"
            src={imageUrl || defaultProjectImage}
            alt="User Profile"
          />
        )}
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
