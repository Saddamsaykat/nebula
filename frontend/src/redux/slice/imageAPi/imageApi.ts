import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../../api/baseUrl";

export const imageApi = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Image"],
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (image) => ({
        url: "/upload-image",
        method: "POST",
        body: image,
      }),
      invalidatesTags: ["Image"],
    }),

    getProjectImage: builder.query<string | null, string>({
      query: (image: string) => {
        if (!image) {
          throw new Error('Id is required');
        }
        return {
          url: `/upload-image/${image}`,
          method: "GET",
          responseHandler: (response: Response) => response.blob(),
        };
      },
      transformResponse: (response: Blob) => {
        if (!response || response.size <= 90) return null;
        return URL.createObjectURL(response);
      },
      
      providesTags: ["Image"],
    }),

    // getAllImage: builder.query({
    //   query: () => ({
    //     url: "/upload-image",
    //     method: "GET",
    //   }),
    //   providesTags: ["Image"],
    // }),

    deleteImage: builder.mutation({
      query: (imageId: string) => ({
        url: `/upload-image/${imageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Image"],
    }),
  }),
});

export const {
  useUploadImageMutation,
  useGetProjectImageQuery,
  useDeleteImageMutation,
  // useGetAllImageQuery,
} = imageApi;
