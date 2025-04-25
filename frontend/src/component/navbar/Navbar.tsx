/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { setTheme } from "../../redux/slice/themeSlice";
import { checkAuthState } from "../../authActions/authActions";
import { themes } from "../../utils/themeStyles/themeStyles";
import { useMenuItems } from "../../hook/useMenuItems";
import ImageDropdown from "../../utils/imageDropdown/ImageDropdown";

const Navbar: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const renderThemeSelector = () => (
    <div
      className="relative inline-block group"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <div className="flex items-center justify-between pr-8 pl-3 py-1.5 rounded-full text-sm font-medium bg-transparent text-black cursor-pointer">
        {theme.charAt(0).toUpperCase() + theme.slice(1)}
        <span className="ml-2 text-xs">
          {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {isDropdownOpen && (
        <ul className="absolute z-50 left-0 mt-0.5 w-full bg-white rounded-md shadow-md text-sm overflow-hidden">
          {themes.map((t) => (
            <li
              key={t}
              onClick={() => {
                handleThemeChange({
                  target: { value: t },
                } as React.ChangeEvent<HTMLSelectElement>);
                setIsDropdownOpen(false);
              }}
              className="px-3 py-1.5 text-black hover:bg-gray-200 cursor-pointer"
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </li>
          ))}
        </ul>
      )}
      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
    </div>
  );

  const renderAuthSection = () =>
    user?.email ? (
      <ImageDropdown />
    ) : (
      <NavLink to="/login" className="text-black hover:text-[#3B9DF8]">
        Login
      </NavLink>
    );

  return (
    <>
      {/* Sticky Top Navbar */}
      <nav className="sticky top-0 z-30 bg-white flex items-center justify-between w-full rounded-full px-[10px] py-[8px] shadow-sm">
        {/* Logo */}
        <img
          src="https://i.ibb.co/0BZfPq6/darklogo.png"
          alt="logo"
          className="w-[45px] sm:w-[55px]"
        />

        {/* Desktop Nav Links */}
        <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex hidden">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px]
                before:transition-all before:duration-300 before:absolute relative before:rounded-full
                before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0
                cursor-pointer capitalize ${isActive ? "text-[#3B9DF8]" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </ul>
        {/* Right Actions */}
        <div className="items-center gap-[10px] flex">
          <Link to={"register"}>Register</Link>
          <div className="sm:flex hidden">{renderAuthSection()}</div>
          <div className="sm:flex hidden">{renderThemeSelector()}</div>
          <CiMenuFries
            className="text-[1.8rem] mr-1 text-[#424242] cursor-pointer md:hidden flex"
            onClick={() => setMobileSidebarOpen(true)}
          />
        </div>
      </nav>

      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-10 transition-opacity duration-300 ${
          mobileSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } md:hidden`}
        onClick={() => setMobileSidebarOpen(false)}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-[65px] right-0 bg-white z-20 rounded-l-lg shadow-md transition-transform duration-300 md:hidden
        ${mobileSidebarOpen ? "translate-x-0" : "translate-x-full"}
        w-full sm:w-[70%] md:w-[50%] h-[calc(100vh-65px)] overflow-y-auto p-4`}
      >
        <ul className="flex flex-col gap-4 text-[1rem] text-gray-700">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileSidebarOpen(false)}
              className="relative capitalize transition-colors duration-300 hover:text-[#3B9DF8] before:w-0 hover:before:w-full before:h-[2px] before:bg-[#3B9DF8] before:absolute before:bottom-[-2px] before:left-0 before:transition-all before:duration-300 before:rounded-full"
            >
              {label}
            </NavLink>
          ))}
          <Link to={"register"}>Register</Link>
          <li>{renderAuthSection()}</li>
          <li>{renderThemeSelector()}</li>
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
