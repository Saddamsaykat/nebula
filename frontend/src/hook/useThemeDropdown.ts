import { useState } from "react";

const useThemeDropdown = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsDropdownOpen(false);
  };

  return {
    isHovered,
    isDropdownOpen,
    handleMouseEnter,
    handleMouseLeave,
  };
};

export default useThemeDropdown;
