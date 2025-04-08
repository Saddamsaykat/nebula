import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../../api/baseUrl";
import { postDataProps } from "./postDataProps";

export const postDataSlice = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<postDataProps[], void>({
      query: () => {
        const token = localStorage.getItem("Token");
        return {
          url: "students",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
      providesTags: ["Post"],
    }),

    addPost: builder.mutation<postDataProps, Partial<postDataProps>>({
      query: (postData) => ({
        url: "students",
        method: "POST",
        body: postData,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Post"],
    }),

    deletePost: builder.mutation<
      { success: boolean },
      { batch: string; department: string; studentId: string }
    >({
      query: ({ batch, department, studentId }) => ({
        url: `students`,
        method: "DELETE",
        body: { batch, department, studentId },
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation<
    { message: string },
    {
      updateFields: Partial<postDataProps>;
    }
  >({
    query: (updateFields) => {
      const token = localStorage.getItem("Token");
      return {
        url: `students`,
        method: "PATCH",
        body: updateFields,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
    },
    invalidatesTags: ["Post"], // Automatically refetches relevant data
  }),
  }),

});

export const {
  useAddPostMutation,
  useGetPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postDataSlice;

export default postDataSlice;
