import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  userMessage: "",
  loading: false,
};

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    setUserMessage: (state, action) => {
      state.userMessage = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { setUserMessage, addMessage, setLoading, clearMessages } =
  chatbotSlice.actions;

export default chatbotSlice.reducer;
