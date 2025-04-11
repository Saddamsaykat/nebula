/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useProjectImage } from "../../hook/getImageUrl";
import useUserDetails from "../../hook/useUserDetails";
import { getThemeStyles } from "../../utils/themeStyles/themeStyles";
import { downloadFile } from "../../hook/downloadImage";

const Welcome = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = getThemeStyles(theme);
  const { userInfo } = useUserDetails();
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
    <div className="overflow-hidden" style={styles}>
      <div className="">
        <div className="">
          <h1 className="text-xl md:text-2xl lg:text-4xl">Welcome Back!</h1>
          <hr  className="p-5"/>
          <h2 className="text-xl md:text-2xl lg:text-4xl flex justify-center items-center text-center">
          {userInfo?.student?.firstName} {userInfo?.student?.lastName}
        </h2>
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center mt-5">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <img
              src={imageUrl || ""}
              alt="Project"
              className="h-auto rounded-lg shadow-lg"
            />
          )}
        </div>
        <div className="flex justify-center items-center mt-5">
          <button
            onClick={handleExport}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Export Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
