import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { baseUrl } from '../../api/baseUrl';

export const loginSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    verifyJwt: builder.mutation({
      query: (user) => ({
        url: 'jwtAuth',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
      transformResponse: (response) => {
        console.log(response)
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
