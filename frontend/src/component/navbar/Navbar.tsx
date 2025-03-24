import { useEffect, useState } from "react";
import { VscThreeBars } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/slice/themeSlice";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import NavLinkPath from "../../json/NavLinkPath.json";
import zhlogo from "../../assets/FavIcon.jpg";
import { getThemeStyles } from "../../utils/themeStyles/themeStyles";
const Navbar: React.FC = () => {
  const [user, setUser] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme);
  const themes = [
    "light",
    "dark",
    "blue",
    "green",
    "magenta",
    "orange",
    "purple",
    "red",
    "teal",
    "yellow",
  ];

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
    <header className="p-4 dark:bg-gray-100 dark:text-gray-800 border border-black container mx-auto" >
      <div className="container flex justify-between items-center h-16 mx-auto">
        <div className="flex justify-center items-center">
          <img className="w-10 h-10" src={zhlogo} alt="" />
          <div className="flex justify-center items-center gap-14">
            <ul style={styles}
           className="hidden md:flex md:justify-center md:items-center lg:flex lg:justify-center lg:items-center ml-2 gap-6 text-gray-700">
              {NavLinkPath.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 font-medium"
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
                    className="border border-violet-500 rounded-full px-2 py-2.5 text-xl bg-white text-gray-700 cursor-pointer focus:outline-none"
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
          </div>
        </div>
        <div className="items-center flex-shrink-0 hidden md:flex lg:flex">
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
        <button className="p-4 lg:hidden md:hidden">
          <VscThreeBars />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
