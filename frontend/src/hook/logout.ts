/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { logoutUser } from "../authActions/authActions";

export const useLogout = () => {
  const [logoutMessage, setLogoutMessage] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutUser() as any);
        setLogoutMessage("You have successfully logged out.");
        Swal.fire({
          title: "Logged Out",
          text: "You have successfully logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        setTimeout(() => navigate("/login"), 1500);
      }
    });
  };

  return { handleLogout, logoutMessage };
};
