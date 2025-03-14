import { NavLink } from "react-router-dom";
import NavLinkPath from '../../../json/NavLinkPath.json';

const NavDataOtherDevice = ({ menuOpen, user }) => {
  const mobileDeviceNav = (
    <>
   <ul
  className={`${
    menuOpen ? "block" : "hidden"
  } md:hidden bg-white shadow-lg rounded-lg py-2 text-center`}
>
  {NavLinkPath.map(({ to, label }) => (
    <li key={to}>
      <NavLink to={to} className="block py-2 hover:bg-gray-100">
        {label}
      </NavLink>
    </li>
  ))}
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
