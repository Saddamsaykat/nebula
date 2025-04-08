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
    <div>
      {/* <header className="fixed top-0 left-0 w-full z-50 bg-gray-900/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none"> */}
      <div className={`md:top-4 md:left-1/2 w-full flex justify-center ${styles}`}>
        <div className="p-[2px] md:rounded-full bg-gradient-to-r from-emerald-600 via-cyan-600 to-indigo-800 animate-gradient-x  md:min-w-[550px] mx-auto md:mx-0">
          <nav className=" backdrop-blur-md md:rounded-full px-4 md:px-6 py-2.5">
            {/* Mobile Menu Button */}
            <div className="flex justify-between items-center md:hidden px-2">
              <img className="w-10 h-10" src={zhLogo} alt="Logo" />
              <button
                className="text-white p-2"
                onClick={() => setMenuOpen(true)}
              >
                <VscThreeBars className="text-2xl" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className={`${menuOpen ? "block" : "hidden"} md:block`}>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-1 lg:gap-2 py-4 md:py-0">
                {NavLinkPath.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `px-3 py-2 md:py-1.5 rounded-lg md:rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:bg-white/10 ${
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
                  className="px-3 py-2 md:py-1.5 rounded-lg md:rounded-full text-sm font-medium transition-all duration-300 flex items-center text-gray-300  cursor-pointer focus:outline-none"
                >
                  {themes.map((t) => (
                    <option
                      key={t}
                      value={t}
                      className="text-black cursor-pointer max-w-2.5"
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </option>
                  ))}
                </select>
                {/* User Login / Dashboard */}
                <div className="">
                  {user?.email ? (
                    <div className=''>
                      <ImageDropdown/>
                    </div>
                  ) : (
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive
                          ? "font-medium text-2xl"
                          : "hover:text-blue-500"
                      }
                    >
                      Login
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

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
      {/* </header> */}
    </div>
  );
};

export default Navbar;
