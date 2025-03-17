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

// export const postDataSlice = createApi({
//   reducerPath: "postApi",
//   baseQuery: fetchBaseQuery({ baseUrl }),
//   tagTypes: ["Post"],
//   endpoints: (builder) => ({
//     getPosts: builder.query<Post[], void>({
//       query: () => {
//         const token = localStorage.getItem("token"); // Get token from localStorage
//         return {
//           url: "getPosts",
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//         };
//       },
//       providesTags: ["Post"],
//     }),

//     addPost: builder.mutation<Post, Partial<Post>>({
//       query: (postData) => ({
//         url: "createPost",
//         method: "POST",
//         body: postData,
//         headers: { "Content-Type": "application/json" },
//       }),
//       invalidatesTags: ["Post"],
//     }),
//     deletePost: builder.mutation<{ success: boolean }, string>({
//       query: (postId) => ({
//         url: `deletePost/${postId}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Post"],
//     }),
//     patchPost: builder.mutation<Post, Partial<Post>>({
//       query: (postData) => ({
//         url: `updatePost/${postData._id}`,
//         method: "PATCH",
//         body: postData,
//         headers: { "Content-Type": "application/json" },
//       }),
//       invalidatesTags: ["Post"],
//     }),
//   }),
// });




export const postDataSlice = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => ({
        url: "getPosts",
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (postData) => ({
        url: "createPost",
        method: "POST",
        body: postData,
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