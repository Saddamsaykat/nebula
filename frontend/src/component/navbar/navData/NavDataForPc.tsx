import { NavLink } from "react-router-dom";

const NavDataForPc = ({ user }) => {
  const navData = (
    <>
      <ul className="hidden md:flex gap-6 text-gray-700">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-medium text-2xl"
                : "hover:text-blue-500"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-medium text-2xl"
                : "hover:text-blue-500"
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-medium text-2xl"
                : "hover:text-blue-500"
            }
          >
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-medium text-2xl"
                : "hover:text-blue-500"
            }
          >
            News
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-medium text-2xl"
                : "hover:text-blue-500"
            }
          >
            Events
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-medium text-2xl"
                : "hover:text-blue-500"
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/donate"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-medium text-2xl"
                : "hover:text-blue-500"
            }
          >
            Donate
          </NavLink>
        </li>
       
      </ul>
      <div className="hidden md:flex">
        {user ? (
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-medium text-2xl"
                : "hover:text-blue-500"
            }
          >
            Profile
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-medium text-2xl"
                : "hover:text-blue-500"
            }
          >
            Login
          </NavLink>
        )}
      </div>
    </>
  );

  return <>{navData}</>;
};

export default NavDataForPc;
