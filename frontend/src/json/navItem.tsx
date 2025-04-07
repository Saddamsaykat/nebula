import { FiSearch } from "react-icons/fi";
import { IoIosChatbubbles, IoMdSettings } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    to: "/dashboard/profile",
    icon: MdOutlineSpaceDashboard, // React component reference
  },
  {
    label: "Update Profile",
    to: "/dashboard/update-profile",
    icon: FiSearch,
  },
  {
    label: "Chat History",
    to: "/dashboard/chat-history",
    icon: IoIosChatbubbles,
  },
  {
    label: "Settings",
    to: "/dashboard/settings",
    icon: IoMdSettings,
  },
];

// Render navigation items
const renderNavItems = () => {
  return navItems.map((item, index) => (
    <li key={index}>
      <NavLink to={item.to} className="flex items-center p-2 space-x-3 rounded-md">
        <item.icon /> {/* Render as a JSX component */}
        <span>{item.label}</span>
      </NavLink>
    </li>
  ));
};

export default renderNavItems;