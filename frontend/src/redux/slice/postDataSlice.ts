export interface Department {
  CSE: Student[];
}

export interface Student {
  name: string;
  email: string;
  number: string;
  presentAddress: string;
  permanentAddress: string;
}

export interface Post {
  _id: string;
  batch: string;
  department: Department;
}

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/baseUrl";
console.log(baseUrl);

export const postDataSlice = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => {
        const token = localStorage.getItem("Token");
        console.log("Chase Token", token)
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

    addPost: builder.mutation<Post, Partial<Post>>({
      query: (postData) => ({
        url: "students",
        method: "POST",
        body: postData,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation<{ success: boolean }, { batch: string; department: string; studentId: string }>({
      query: ({ batch, department, studentId }) => ({
        url: `students`, // No studentId in the URL
        method: "DELETE",
        body: { batch, department, studentId }, // Send data in the request body
      }),
      invalidatesTags: ["Post"],
    }),
    patchPost: builder.mutation<Post, Partial<Post>>({
      query: (postData) => ({
        url: `updatePost/${postData._id}`,
        method: "PATCH",
        body: postData,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});


export const {
  useAddPostMutation,
  useGetPostsQuery,
  useDeletePostMutation,
  usePatchPostMutation,
} = postDataSlice;

export default postDataSlice;
