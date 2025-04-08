/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../authActions/authActions";
import Swal from "sweetalert2";
import { useProjectImage } from "../../hook/getImageUrl";
import defaultProjectImage from "../../assets/public/upload.png";
import useUserDetails from "../../hook/useUserDetails";

const ImageDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

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

  // Get user image
  const { userInfo } = useUserDetails();
  const projectId = userInfo?.student?.image;
  const { imageUrl, isLoading } = useProjectImage(projectId);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    <div className="relative z-50" ref={dropdownRef}>
      {/* Avatar trigger */}
      <div
        className="cursor-pointer flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-gray-300"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isLoading ? (
          <div className="relative w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-[shimmer_1s_infinite]" />
          </div>
        ) : (
          <img
            className="object-cover object-center w-10 h-10 rounded-full border border-gray-300"
            src={imageUrl || defaultProjectImage}
            alt="User Profile"
          />
        )}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 sm:left-0 mt-2 w-[120px] bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className="py-2 text-sm text-gray-700">
            <NavLink
              to={"/dashboard"}
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>
            <li
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
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
