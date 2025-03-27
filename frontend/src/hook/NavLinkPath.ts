import { useSelector } from "react-redux";

export const useMenuItems = () => {
  const user = useSelector((state: any) => state.auth.user);

  return [
    { to: "/home", label: "Home" },
    ...(user ? [{ to: "/about", label: "About" }] : []),
    { to: "/contact", label: "Contact" },
    ...(user ? [{ to: "/alumni", label: "Alumni" }] : []),
    { to: "/events", label: "Events" },
    ...(user ? [{ to: "/gallery", label: "Gallery" }]: []),
    { to: "/weather", label: "Weather" },
  ];
};
