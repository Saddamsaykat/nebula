import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: string;
}

const themes = ["light", "dark", "blue", "green", "magenta", "orange"];

const initialState: ThemeState = {
  theme: localStorage.getItem("theme") || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const currentIndex = themes.indexOf(state.theme);
      const nextTheme = themes[(currentIndex + 1) % themes.length];
      state.theme = nextTheme;
      localStorage.setItem("theme", state.theme);
    },
    setTheme: (state, action: PayloadAction<string>) => {
      if (themes.includes(action.payload)) {
        state.theme = action.payload;
        localStorage.setItem("theme", state.theme);
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;