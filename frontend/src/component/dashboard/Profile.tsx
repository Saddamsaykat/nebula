/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { getThemeStyles } from "../../utils/themeStyles/themeStyles";
import { useGetPostsQuery } from "../../redux/slice/postData/postDataSlice";
import defaultProjectImage from "../../assets/public/bg-image.jpg";
import { useProjectImage } from "../../hook/getImageUrl";

const Profile = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = getThemeStyles(theme);
  const user = useSelector((state: any) => state.auth.user);
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

  const userInfo = data ? getUserDetails(data, userEmail) : null;
  const projectId = userInfo?.student?.projectId;
  const { imageUrl, isLoading, downloadImage } = useProjectImage(projectId);
  
  return (
    <div className="h-screen flex justify-center items-center">
      <div className={`max-w-md p-8 sm:flex sm:space-x-6 ${styles}`}>
        <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
          {isLoading ? (
            <div className="relative w-[260px] h-[150px] bg-gray-100 overflow-hidden mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-[shimmer_1s_infinite]"></div>
            </div>
          ) : (
            <img
              className="object-cover object-center w-full h-full rounded"
              src={imageUrl ? imageUrl : defaultProjectImage}
              alt={"User Profile"}
            />
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">
              {userInfo?.student?.name}
            </h2>
            <span className="text-sm dark:text-gray-600">
              {userInfo?.student?.role}
            </span>
          </div>
          <div className="space-y-1">
            <span className="flex items-center space-x-2">
              <span>{userInfo?.student?.email}</span>
            </span>
            <span className="flex items-center space-x-2">
              <span>{userInfo?.student?.number}</span>
            </span>
          </div>
          <button
            onClick={downloadImage}
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
