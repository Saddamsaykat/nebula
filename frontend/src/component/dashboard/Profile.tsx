/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { getThemeStyles } from "../../utils/themeStyles/themeStyles";
import defaultProjectImage from "../../assets/public/bg-image.jpg";
import useUserDetails from "../../hook/useUserDetails";
import { useProjectImage } from "../../hook/getImageUrl";
import { downloadFile } from "../../hook/downloadImage";

const Profile = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = getThemeStyles(theme);
  const { userInfo, userEmail } = useUserDetails();
  const projectId = userInfo?.student?.image;
  const { imageUrl, isLoading } = useProjectImage(projectId);

  const handleExport = async () => {
    try {
      if (!imageUrl) {
        alert("No image URL available.");
        return;
      }

      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch image.");
      }

      const blob = await response.blob();
      const fileName = `project-image-${userInfo?.student?.name || "user"}.jpg`;
      downloadFile(blob, fileName);
    } catch (error: any) {
      alert("Error downloading image: " + error.message);
    }
  };

  return (
    <div className="h-[440px] flex justify-center items-center">
      <div
        className={`max-w-md p-8 sm:space-x-6 border border-amber-300 rounded ${styles}`}
      >
        <div className="flex justify-center items-center">
          <div className="w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
            {isLoading ? (
              <div className="relative w-[260px] h-[150px] bg-gray-100 overflow-hidden mx-auto ">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-[shimmer_1s_infinite]"></div>
              </div>
            ) : (
              <img
                className="object-cover object-center w-full h-full rounded-full border-amber-300 border-2"
                src={imageUrl || defaultProjectImage}
                alt={"User Profile"}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">
              {userInfo?.student?.firstName} {userInfo?.student?.lastName}
            </h2>
            <span className="text-sm dark:text-gray-600">
              {userInfo?.student?.role}
            </span>
          </div>
          <div className="space-y-1">
            <span className="flex items-center space-x-2">
              <span>{userEmail}</span>
            </span>
            <span className="flex items-center space-x-2">
              <span>{userInfo?.student?.number}</span>
            </span>
          </div>
          <button
            onClick={handleExport}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400 cursor-pointer"
          >
            Download Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
