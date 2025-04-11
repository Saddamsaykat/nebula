/* eslint-disable @typescript-eslint/no-explicit-any */
import { VscThreeBars } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import zhLogo from "../../assets/FavIcon.jpg";
import { useSelector } from "react-redux";
import { getThemeStyles } from "../../utils/themeStyles/themeStyles";

type NavbarItemProps = {
  renderNavLinks: (closeMenu?: () => void) => React.ReactNode;
  renderThemeSelector: (className: string) => React.ReactNode;
  renderAuthSection: (closeMenu?: () => void) => React.ReactNode;
  setMenuOpen: (open: boolean) => void;
  menuOpen: boolean;
};

const NavbarItem: React.FC<NavbarItemProps> = ({
  renderNavLinks,
  renderThemeSelector,
  renderAuthSection,
  setMenuOpen,
  menuOpen,
}) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = getThemeStyles(theme);

  return (
    <div className="relative z-50">
      {/* Desktop Navbar */}
      <div
        className={`hidden md:flex justify-center ${styles} md:top-4 md:left-1/2 w-full`}
      >
        <div className="p-[2px] md:rounded-full bg-gradient-to-r from-emerald-600 via-cyan-600 to-indigo-800 animate-gradient-x md:min-w-[550px] mx-auto">
          <nav className="backdrop-blur-md md:rounded-full px-6 py-2.5 flex items-center gap-4">
            {renderNavLinks()}
            {renderThemeSelector("text-gray-300 bg-transparent")}
            {renderAuthSection()}
          </nav>
        </div>
      </div>

      {/* Mobile Navbar */}
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
          {renderNavLinks(() => setMenuOpen(false))}
          {renderThemeSelector("text-black")}
          {renderAuthSection(() => setMenuOpen(false))}
        </div>
      </div>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Animations */}
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

export default NavbarItem;
