/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { VscThreeBars } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/slice/themeSlice";
import { NavLink } from "react-router-dom";
import zhLogo from "../../assets/FavIcon.jpg";
import { getThemeStyles, themes } from "../../utils/themeStyles/themeStyles";
import { checkAuthState } from "../../authActions/authActions";
import { useMenuItems } from "../../hook/useMenuItems";
import ImageDropdown from "../../utils/imageDropdown/ImageDropdown";
import { IoClose } from "react-icons/io5";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme);
  const NavLinkPath = useMenuItems();

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    document.documentElement.classList.remove(...themes);
    document.documentElement.classList.add(theme);
  }, [theme]);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value;
    if (themes.includes(selectedTheme)) {
      dispatch(setTheme(selectedTheme));
    }
  };

  const styles = getThemeStyles(theme);

  return (
    <div className="relative z-50">
      {/* Navbar - Desktop */}
      <div
        className={`hidden md:flex justify-center ${styles} md:top-4 md:left-1/2 w-full`}
      >
        <div className="p-[2px] md:rounded-full bg-gradient-to-r from-emerald-600 via-cyan-600 to-indigo-800 animate-gradient-x md:min-w-[550px] mx-auto">
          <nav className="backdrop-blur-md md:rounded-full px-6 py-2.5 flex items-center gap-4">
            {NavLinkPath.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/10 ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <select
              value={theme}
              onChange={handleThemeChange}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-300 bg-transparent"
            >
              {themes.map((t) => (
                <option key={t} value={t} className="text-black">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
            {user?.email ? (
              <ImageDropdown />
            ) : (
              <NavLink to="/login" className="text-white">
                Login
              </NavLink>
            )}
          </nav>
        </div>
      </div>

      {/* Navbar - Mobile */}
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-900">
        <img className="w-10 h-10" src={zhLogo} alt="Logo" />
        <button onClick={() => setMenuOpen(true)}>
          <VscThreeBars className="text-2xl text-white" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden z-50`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700">
          <img className="w-10 h-10" src={zhLogo} alt="Logo" />
          <button onClick={() => setMenuOpen(false)}>
            <IoClose className="text-2xl" />
          </button>
        </div>
        <div className="flex flex-col px-4 py-2 gap-2">
          {NavLinkPath.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <select
            value={theme}
            onChange={handleThemeChange}
            className="px-3 py-2 rounded-lg text-sm font-medium text-black"
          >
            {themes.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
          {user?.email ? (
            <ImageDropdown />
          ) : (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-white"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 6s linear infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
