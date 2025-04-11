/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";

export const useMenuItems = () => {
  const user = useSelector((state: any) => state.auth.user);

  return [
    { to: "/home", label: "Home" },
    ...(user ? [{ to: "/about", label: "About" }] : []),
    ...(user ? [{ to: "/alumni", label: "Alumni" }] : []),
    ...(user ? [{ to: "/gallery", label: "Gallery / Event" }] : []),
  ];
};
