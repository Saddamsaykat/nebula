import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../api/baseUrl';

export const loginSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    verifyJwt: builder.mutation({
      query: (user) => ({
        url: 'jwtAuth',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useVerifyJwtMutation } = loginSlice;
