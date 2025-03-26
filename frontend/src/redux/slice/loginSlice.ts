import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../api/baseUrl';
console.log(baseUrl)

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
    // Get Data from jwt token
    getUserData: builder.query({
      query: () => '/users',
      providesTags: ['User'],
    }),
  }),
});

export const { useVerifyJwtMutation , useGetUserDataQuery } = loginSlice;
