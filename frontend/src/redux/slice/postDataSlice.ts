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

// import { baseUrl } from "./../../api/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postDataSlice = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => ({
        url: "getPosts",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      providesTags: ["Post"],
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (postData) => ({
        url: 'createPost',
        method: "POST",
        body: postData,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation<{ success: boolean }, string>({
      query: (postId) => ({
        url: `deletePost/${postId}`,
        method: "DELETE",
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
