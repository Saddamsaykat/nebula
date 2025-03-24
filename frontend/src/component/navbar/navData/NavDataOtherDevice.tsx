import { MdClose, MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

interface NavLinkItem {
  to: string;
  label: string;
}

interface NavDataOtherDeviceProps {
  menuOpen: boolean;
  styles?: React.CSSProperties;
  setMenuOpen: (open: boolean) => void;
  NavLinkPath: NavLinkItem[];
  theme: string;
  handleThemeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  themes: string[];
  user: string;
}

const NavDataOtherDevice: React.FC<NavDataOtherDeviceProps> = ({
  menuOpen,
  styles,
  setMenuOpen,
  NavLinkPath,
  theme,
  handleThemeChange,
  themes,
  user,
}) => {
  return (
    <div
      className={`fixed z-50 top-0 left-0 w-64 h-full bg-white shadow-lg transform ${
        menuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
      style={styles}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={() => setMenuOpen(false)}>
          <MdClose className="text-2xl text-gray-600" />
        </button>
      </div>

      <ul className="p-4 space-y-4">
        {NavLinkPath.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-medium text-xl"
                  : "hover:text-blue-500 block p-2"
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          </li>
        ))}
        <div>
          <select
            value={theme}
            onChange={handleThemeChange}
            className="border border-violet-500 rounded p-2 w-[150px] text-sm bg-white text-gray-700 focus:outline-none"
          >
            {themes.map((t) => (
              <option key={t} value={t} className="bg-amber-500">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </ul>
      <div className="p-4 space-y-4">
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
  );
};

export default NavDataOtherDevice;
