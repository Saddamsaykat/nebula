/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const restApiSlice = createApi({
  reducerPath: "restApi",
  tagTypes: ["Country"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://restcountries.com/v3.1/",
  }),
  endpoints: (builder) => ({
    getCountry: builder.query<any, void>({
      query: () => "all",
      providesTags: ["Country"],
    }),
  }),
});

export const { useGetCountryQuery } = restApiSlice;
export default restApiSlice.reducer;
