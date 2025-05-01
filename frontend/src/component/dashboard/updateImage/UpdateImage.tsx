import { useState, useRef } from "react";
import { useProjectImage } from "../../../hook/getImageUrl";
import useUserDetails from "../../../hook/useUserDetails";
import { useUpdateProfileImageMutation } from "../../../redux/slice/imageAPi/imageApi";
import Swal from "sweetalert2";
import { CgProfile } from "react-icons/cg";

const UpdateImage = () => {
  const { userInfo } = useUserDetails();
  const projectId = userInfo?.student?.image;
  const { imageUrl, isLoading } = useProjectImage(projectId);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [updateProfileImage, { isLoading: isUpdating }] =
    useUpdateProfileImageMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !projectId) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await updateProfileImage({
        id: projectId,
        formData,
      }).unwrap();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Image updated successfully!",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.error("Error uploading:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
      <div className="text-center">
        <input
          type="file"
          accept="image/*"
          id="image_input"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
        />

        <div className="w-[150px] h-[150px] rounded-full border border-[#e5eaf2] flex items-center justify-center overflow-hidden">
          {isLoading ? (
            <p>Loading...</p>
          ) : previewImage ? (
            <img
              src={previewImage}
              alt="preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <CgProfile className="text-[10rem] text-[#e5eaf2]" />
          )}
        </div>

        <div className="flex flex-col gap-3 items-center mt-5">
          <button
            className="px-4 py-2 bg-[#3B9DF8] text-white rounded-md"
            onClick={handleUploadImage}
          >
            Upload Profile
          </button>

          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md disabled:opacity-50"
            onClick={handleUpload}
            disabled={!selectedFile || isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Image"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateImage;
