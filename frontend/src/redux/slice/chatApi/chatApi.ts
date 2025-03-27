import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (userMessage) => ({
        url: '/chatMassage',
        method: 'POST',
        body: { userMessage },
      }),
    }),
  }),
});

export const { useSendMessageMutation } = chatApi;
