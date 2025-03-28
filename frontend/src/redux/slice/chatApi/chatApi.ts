import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/' }),
  endpoints: (builder) => ({
    generateChatResponse: builder.mutation({
      query: (question) => ({
        url: `gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`,
        method: 'POST',
        body: { contents: [{ parts: [{ text: question }] }] },
      }),
    }),
  }),
});

export const { useGenerateChatResponseMutation } = chatApi;