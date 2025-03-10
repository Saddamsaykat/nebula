import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import iconImg from "../../../assets/FavIcon.jpg";
import NavDataOtherDevice from "./NavDataOtherDevice";
import NavDataForPc from "./NavDataForPc";

const NavData = () => {
  const [user, setUser] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 text-2xl">
          {/* Logo or Title */}
          <div className="text-xl font-semibold">
            <img className="w-8 h-8" src={iconImg} alt="" />
          </div>
          <NavDataForPc user={user} />

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
