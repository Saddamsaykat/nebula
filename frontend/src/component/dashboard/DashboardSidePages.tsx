/* eslint-disable @typescript-eslint/no-explicit-any */
import { GiExitDoor } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getThemeStyles } from "../../utils/themeStyles/themeStyles";
import renderNavItems from "../../json/navItem";
import { RootState } from "../../redux/store";
import { DashboardSidePagesProps } from "./dashboardPropsTypes";
import { useLogout } from "../../hook/logout";
import { useDeleteAccount } from "../../hook/deleteAccount";
import useUserDetails from "../../hook/useUserDetails";
import { useProjectImage } from "../../hook/getImageUrl";
import defaultProjectImage from "../../assets/public/upload.png";

const DashboardSidePages: React.FC<DashboardSidePagesProps> = () => {
  const { handleLogout, logoutMessage } = useLogout();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const themeStyles = getThemeStyles(theme);
  const { deleteAccountHandler } = useDeleteAccount();
  const { userInfo, userEmail } = useUserDetails();
  const image = userInfo?.student?.image;
  const { imageUrl, isLoading } = useProjectImage(image);
  return (
    <>
      {logoutMessage && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2">
          {logoutMessage && <p>{logoutMessage}</p>}
        </div>
      )}

      <div className={`h-screen p-3 w-72 ${themeStyles}`}>
        <div className="flex items-center p-2 space-x-4">
          {isLoading ? (
            <div className="relative w-[260px] h-[150px] bg-gray-100 overflow-hidden mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-[shimmer_1s_infinite]"></div>
            </div>
          ) : (
            <img
              className="object-cover object-center w-10 h-10 rounded"
              src={imageUrl || defaultProjectImage}
              alt="User Profile"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold">
              {userInfo?.student?.name || "User"}
            </h2>
            <Link to="/dashboard/profile" className="text-xs hover:underline">
              View profile
            </Link>
          </div>
        </div>
        <div className="divide-y">
          <ul className="pt-2 pb-4 space-y-1 text-sm">{renderNavItems()}</ul>
          <ul className="pt-4 pb-2 space-y-1 text-sm">
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
          <button
            onClick={() => deleteAccountHandler(userInfo, userEmail)}
            className="p-2 bg-red-500 text-white rounded-md mt-4"
          >
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardSidePages;
