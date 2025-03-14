import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import iconImg from "../../../assets/FavIcon.jpg";
import NavDataOtherDevice from "./NavDataOtherDevice";
import NavDataForPc from "./NavDataForPc";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../../redux/slice/themeSlice";
import { Link } from "react-router-dom";

const NavData = () => {
  const [user, setUser] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme);
  const themes = ["light", "dark", "blue", "green"];

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

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 text-2xl">
          {/* Logo or Title */}
          <Link to={"/"} className="text-xl font-semibold">
            <img className="w-8 h-8" src={iconImg} alt="Logo" />
          </Link>

          <NavDataForPc
            user={user}
            handleThemeChange={handleThemeChange}
            theme={theme}
            themes={themes}
          />

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-gray-700"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu (Hidden by default) */}
        <NavDataOtherDevice menuOpen={menuOpen} user={user} />
      </div>
    </nav>
  );
};

export default NavData;
