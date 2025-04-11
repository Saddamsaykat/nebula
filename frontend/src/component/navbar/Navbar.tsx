/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/slice/themeSlice";
import { checkAuthState } from "../../authActions/authActions";
import {  themes } from "../../utils/themeStyles/themeStyles";
import { useMenuItems } from "../../hook/useMenuItems";
import ImageDropdown from "../../utils/imageDropdown/ImageDropdown";
import NavbarItem from "./NavbarItem";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const theme = useSelector((state: any) => state.theme.theme);
  const navItems = useMenuItems();

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

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

  const renderNavLinks = (onClick?: () => void) =>
    navItems.map(({ to, label }) => (
      <NavLink
        key={to}
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          `px-3 py-1.5 md:py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
            isActive
              ? "bg-white/15 text-white"
              : "text-gray-300 hover:text-white hover:bg-white/10"
          }`
        }
      >
        {label}
      </NavLink>
    ));

  const renderThemeSelector = (customClasses = "") => (
    <select
      value={theme}
      onChange={handleThemeChange}
      className={`px-3 py-1.5 rounded-full text-sm font-medium ${customClasses}`}
    >
      {themes.map((t) => (
        <option key={t} value={t} className="text-black">
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </option>
      ))}
    </select>
  );

  const renderAuthSection = (onClick?: () => void) =>
    user?.email ? (
      <ImageDropdown />
    ) : (
      <NavLink to="/login" onClick={onClick} className="text-white">
        Login
      </NavLink>
    );

  return (
    <div>
      <NavbarItem
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        renderNavLinks={renderNavLinks}
        renderThemeSelector={renderThemeSelector}
        renderAuthSection={renderAuthSection}
      />
    </div>
  );
};

export default Navbar;
