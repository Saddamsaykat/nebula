import { FiSearch } from "react-icons/fi";
import { IoIosChatbubbles, IoMdSettings } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import useUserDetails from "../hook/useUserDetails";

const navItems = [
  {
    label: "Dashboard",
    to: "/dashboard/profile",
    icon: MdOutlineSpaceDashboard,
    roles: ["admin", "student", "superAdmin"],
  },
  {
    label: "Update Profile",
    to: "/dashboard/update-profile",
    icon: FiSearch,
    roles: ["student", "admin", "superAdmin"],
  },
  {
    label: "Chat History",
    to: "/dashboard/chat-history",
    icon: IoIosChatbubbles,
    roles: ["student"],
  },
  {
    label: "Settings",
    to: "/dashboard/settings",
    icon: IoMdSettings,
    roles: ["superAdmin", "admin"],
  },
];

// Render navigation items based on role
const RenderNavItems = () => {
  const { userInfo } = useUserDetails();

  const userRole = userInfo?.student?.role;

  return (
    <ul>
      {navItems
        .filter((item) => item.roles.includes(userRole))
        .map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center p-2 space-x-3 rounded-md ${
                  isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                }`
              }
            >
              <item.icon className="text-xl" />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
    </ul>
  );
};

export default RenderNavItems;
