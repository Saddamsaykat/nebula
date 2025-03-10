import { NavLink } from "react-router-dom";

const NavDataOtherDevice = ({ menuOpen, user }) => {
  const mobileDeviceNav = (
    <>
      <ul
        className={`${
          menuOpen ? "block" : "hidden"
        } md:hidden bg-white shadow-lg rounded-lg py-2 text-center`}
      >
        <li>
          <NavLink to="/" className="block py-2 hover:bg-gray-100">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="block py-2 hover:bg-gray-100">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="block py-2 hover:bg-gray-100">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/news" className="block py-2 hover:bg-gray-100">
            News
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" className="block py-2 hover:bg-gray-100">
            Events
          </NavLink>
        </li>
        <li>
          <NavLink to="/donate" className="block py-2 hover:bg-gray-100">
            Donate
          </NavLink>
        </li>
        <li>
          {user ? (
            <NavLink to="/profile" className="block py-2 hover:bg-gray-100">
              Profile
            </NavLink>
          ) : (
            <NavLink to="/login" className="block py-2 hover:bg-gray-100">
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </>
  );
  return <div>{mobileDeviceNav}</div>;
};

export default NavDataOtherDevice;
