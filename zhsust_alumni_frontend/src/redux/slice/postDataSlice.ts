import { baseUrl } from './../../api/baseUrl';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postDataSlice = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl }), 
  tagTypes: ["Post"], // Define a tag type for caching
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "/getPosts",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      providesTags: ["Post"], // Provides cache tags
    }),
    addPost: builder.mutation({
      query: (postData) => ({
        url: "createPost",
        method: "POST",
        body: postData,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Post"], // Refetch after mutation
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `deletePost/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"], // Refetch after deletion
    }),
    patchPost: builder.mutation({
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

export const { useAddPostMutation, useGetPostsQuery, useDeletePostMutation, usePatchPostMutation } = postDataSlice;
export default postDataSlice;
