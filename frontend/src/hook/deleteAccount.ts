/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDeletePostMutation } from "../redux/slice/postData/postDataSlice";
import { deleteAccount } from "../authActions/authActions";
import { useDeleteImageMutation } from "../redux/slice/imageAPi/imageApi";

export const useDeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deletePost] = useDeletePostMutation();
  const [deleteImage] = useDeleteImageMutation();
  const showAlert = async (
    title: string,
    message: string,
    icon: "success" | "error" | "warning"
  ) => {
    await Swal.fire({
      title,
      text: message,
      icon,
      confirmButtonColor: "#3085d6",
    });
  };
  const deleteAccountHandler = async (
    userInfo: any,
    userEmail: string | undefined
  ) => {
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

      const deletePayload = {
        batch: String(userInfo?.batch || ""),
        department: userInfo?.department || "",
        studentId: userInfo?.student?.studentId || "",
      };

      if (userEmail) {
        await dispatch(deleteAccount(userEmail) as any);
        await showAlert(
          "Deleted!",
          "Your account has been successfully deleted.",
          "success"
        );
        navigate("/login");
      } else {
        throw new Error("User email is undefined.");
      }
      const imageID = userInfo?.student?.image || "";
      await deleteImage(imageID);
      await deletePost(deletePayload);
    } catch (error) {
      console.error(error);
      await showAlert(
        "Error!",
        "Failed to delete account. Please try again.",
        "error"
      );
    }
  };

  return { deleteAccountHandler };
};
