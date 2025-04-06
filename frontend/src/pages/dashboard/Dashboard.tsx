/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from "react-router-dom";
import DashboardSidePages from "../../component/dashboard/DashboardSidePages";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { getThemeStyles } from "../../utils/themeStyles/themeStyles";
import { useGetPostsQuery } from "../../redux/slice/postData/postDataSlice";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
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
            student: matchedUser, // Return the entire student object
          };
        }
      }
    }

    return null; // Return null if no match is found
  };

  const userInfo = data ? getUserDetails(data, userEmail) : null;
  console.log(userInfo);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        style={styles}
        className={`fixed inset-y-0 left-0 z-50 w-80 border p-4 transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-x-auto`}
      >
        <button
          className="lg:hidden absolute top-4 right-4 text-xl"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>
        <ul className="menu text-base-content h-full">
          <DashboardSidePages userInfo={userInfo} userEmail={userEmail} />
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full ">
        {/* Mobile Menu Button */}
        <div className="lg:hidden p-4">
          <button onClick={() => setIsOpen(true)} className="text-2xl">
            <FiMenu />
          </button>
        </div>
        <div className="p-6">
          <div className="flex justify-center items-center h-16 bg-gray-800 text-white">
            <span>Welcome Back {userInfo?.student?.name}</span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
