/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../api/baseUrl';

interface JwtVerifyRequest {
  user: any;
}

interface JwtVerifyResponse {
  token: string;
}

export const loginSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    verifyJwt: builder.mutation<JwtVerifyResponse, JwtVerifyRequest>({
      query: (user) => ({
        url: '/jwtAuth',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
      transformResponse: (response ) => {
        return response as any;
      }
    }),
  }),
});

export const { useVerifyJwtMutation } = loginSlice;
