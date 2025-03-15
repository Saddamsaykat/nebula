import { NavLink } from "react-router-dom";
import NavLinkPath from "../../../json/NavLinkPath.json";

interface NavDataPcProps {
  user: string;
  themes: string[];
  handleThemeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  theme: string;
}

const NavDataForPc: React.FC<NavDataPcProps> = ({ user , themes, handleThemeChange, theme}) => {

  const navData = (
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
      </ul>

      <div className="hidden md:flex items-center gap-4">
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
        <div className="relative">
          <select
            value={theme}
            onChange={handleThemeChange}
            className="border border-violet-500 rounded-full px-4 py-2 text-xl bg-white text-gray-700 cursor-pointer focus:outline-none"
          >
            {themes.map((t) => (
              <option key={t} value={t} className="text-black cursor-pointer">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  return <>{navData}</>;
};

export default NavDataForPc;
