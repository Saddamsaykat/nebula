import { useEffect, useState } from "react";
import { VscThreeBars } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/slice/themeSlice";
import { NavLink } from "react-router-dom";
import zhLogo from "../../assets/FavIcon.jpg";
import { getThemeStyles, themes } from "../../utils/themeStyles/themeStyles";
import { checkAuthState } from "../../authActions/authActions";
import NavDataOtherDevice from "./navData/NavDataOtherDevice";
import ImageDropdown from "../../utils/imageDropdown/ImageDropdown";
import { useMenuItems } from "../../hook/NavLinkPath";

const Navbar: React.FC = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme);
  const NavLinkPath = useMenuItems()

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
    <header className="p-4 dark:bg-gray-100 dark:text-gray-800 border border-black container mx-auto">
      <div className="container flex justify-between items-center h-16 mx-auto">
        <div className="flex justify-center items-center">
          <img className="w-10 h-10" src={zhLogo} alt="Logo" />
        </div>

        {/* Desktop Navigation */}
        <ul
          style={styles}
          className="hidden md:flex md:items-center lg:flex lg:items-center ml-2 gap-6 text-xl text-gray-700"
        >
          {NavLinkPath.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-medium text-xl"
                    : "hover:text-blue-500"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <select
              value={theme}
              onChange={handleThemeChange}
              className="border border-violet-500 rounded p-1 text-xl bg-white text-gray-700 cursor-pointer focus:outline-none"
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
          </li>
        </ul>

        {/* User Login / Dashboard */}
        <div className="hidden md:flex lg:flex items-center">
          {user?.email ? (
            <div>
              <ImageDropdown user={user}/>
            </div>
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

        {/* Mobile Menu Button */}
        <button
          className="p-4 lg:hidden md:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <VscThreeBars className="text-2xl" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>
      <NavDataOtherDevice
        NavLinkPath={NavLinkPath}
        handleThemeChange={handleThemeChange}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        styles={styles}
        theme={theme}
        themes={themes}
        user={user}
      />
    </header>
  );
};

export default Navbar;
