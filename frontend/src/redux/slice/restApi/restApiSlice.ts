/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { restCountry } from "../../../api/baseUrl";

export const restApiSlice = createApi({
  reducerPath: "restApi",
  tagTypes: ["Country"],
  baseQuery: fetchBaseQuery({
    baseUrl: restCountry,
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
