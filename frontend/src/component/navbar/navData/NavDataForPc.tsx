import { NavLink } from "react-router-dom";
import NavLinkPath from "../../../hook/NavLinkPath";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthState, } from "../../../authActions/authActions";
import { useEffect } from "react";
import { RootState } from "@reduxjs/toolkit/query";
import { MdDashboard } from "react-icons/md";

interface NavDataPcProps {
  themes: string[];
  handleThemeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  theme: string;
}

const NavDataForPc: React.FC<NavDataPcProps> = ({
  themes,
  handleThemeChange,
  theme,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <div className="flex gap-14">
        <ul className="hidden md:flex gap-6 text-gray-700">
          {NavLinkPath.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-medium text-2xl"
                    : "hover:text-blue-500"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <div className="relative">
              <select
                value={theme}
                onChange={handleThemeChange}
                className="border border-violet-500 rounded-full px-4 py-2 text-xl bg-white text-gray-700 cursor-pointer focus:outline-none"
              >
                {themes.map((t) => (
                  <option
                    key={t}
                    value={t}
                    className="text-black cursor-pointer"
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {user?.email ? (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold text-lg bg-gray-100 px-4 py-2 rounded-lg"
                  : "text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-300"
              }
            >
              <MdDashboard className="mr-2" />
              <span>{user?.email.slice(0, 5)}</span>
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
      </div>
    </>
  );
};

export default NavDataForPc;
