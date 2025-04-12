/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/slice/themeSlice";
import { checkAuthState } from "../../authActions/authActions";
import { themes } from "../../utils/themeStyles/themeStyles";
import { useMenuItems } from "../../hook/useMenuItems";
import ImageDropdown from "../../utils/imageDropdown/ImageDropdown";
import NavbarItem from "./NavbarItem";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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
          `relative px-3 py-1.5 md:py-1.5 rounded-full text-sm font-medium transition-all duration-300
          ${
            isActive
              ? "text-white after:scale-x-100"
              : "text-gray-300 hover:text-white hover:after:scale-x-100"
          }
          after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full
          after:bg-white after:origin-left after:scale-x-0 after:transition-transform after:duration-300`
        }
      >
        {label}
      </NavLink>
    ));


    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const renderThemeSelector = (customClasses = "") => {
      return (
        <div
          className="relative inline-block group"
          onMouseEnter={() => {
            setIsDropdownOpen(true);
          }}
          onMouseLeave={() => {
            setIsDropdownOpen(false);
          }}
        >
          {/* Trigger button */}
          <div
            className={`flex items-center justify-between pr-8 pl-3 py-1.5
            rounded-full text-sm font-medium bg-transparent text-white cursor-pointer
            
            ${customClasses}`}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
            <span className="ml-2 text-xs">
              {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
    
          {/* Dropdown */}
          {isDropdownOpen && (
            <ul className="absolute z-50 left-0 mt-0.5 w-full bg-white rounded-md shadow-md z-10 text-sm overflow-hidden">
              {themes.map((t) => (
                <li
                  key={t}
                  onClick={() => {
                    handleThemeChange({ target: { value: t } } as React.ChangeEvent<HTMLSelectElement>);
                    setIsDropdownOpen(false);
                  }}
                  className="px-3 py-1.5 text-black hover:bg-gray-200 cursor-pointer"
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </li>
              ))}
            </ul>
          )}
    
          {/* Underline animation */}
          <span className="absolute bottom-0 left-0 h-[2px] w-full bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
        </div>
      );
    };
    

  const renderAuthSection = (onClick?: () => void) =>
    user?.email ? (
      <ImageDropdown />
    ) : (
      <NavLink to="/login" onClick={onClick} className="text-white">
        Login
      </NavLink>
    );

  return (
    <div className="">
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
