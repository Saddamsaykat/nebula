import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../api/baseUrl';

export const loginSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    verifyJwt: builder.mutation({
      query: (user) => ({
        url: '/jwtAuth',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
      transformResponse: (response) => {
        return response;
      }
    }),
  }),
});

export const { useVerifyJwtMutation } = loginSlice;
