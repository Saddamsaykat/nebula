export const getThemeStyles = (theme: string) => ({
  backgroundColor:
    theme === "dark"
      ? "#1a202c"
      : theme === "blue"
      ? "#2b6cb0"
      : theme === "green"
      ? "#2f855a"
      : theme === "magenta"
      ? "#be31ac"
      : theme === "orange"
      ? "#df7c20"
      : theme === "yellow"
      ? "#df7c20"
      : theme === "red"
      ? "#e53e3e"
      : theme === "purple"
      ? "#633399"
      : theme === "teal"
      ? "#3498db"
      : theme === "pink"
      ? "#e831b9"
      : theme === "gray"
      ? "#818181"
      : theme === "blue-gray"
      ? "#34495e"
      : theme === "brown"
      ? "#563d7c"
      : "#edf2f7",

  color:
    theme === "dark"
      ? "#ffffff"
      : theme === "blue"
      ? "#ebf8ff"
      : theme === "green"
      ? "#f0fff4"
      : theme === "magenta"
      ? "#f0fff4"
      : theme === "orange"
      ? "#f0fff4"
      : theme === "yellow"
      ? "#f0fff4"
      : theme === "red"
      ? "#ffffff"
      : theme === "purple"
      ? "#ffffff"
      : theme === "teal"
      ? "#f0fff4"
      : theme === "pink"
      ? "#f0fff4"
      : theme === "gray"
      ? "#f0fff4"
      : theme === "blue-gray"
      ? "#f0fff4"
      : theme === "brown"
      ? "#f0fff4"
      : "#1a202c", // Default text color
});

export const themes = [
  "light",
  "dark",
  "blue",
  "green",
  "magenta",
  "orange",
  "purple",
  "red",
  "teal",
  "yellow",
];
