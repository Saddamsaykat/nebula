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
      query: (projectId: string) => {
        if (!projectId) {
          throw new Error('Id is required');
        }
        return {
          url: `/upload-image/${projectId}`,
          method: "GET",
          responseHandler: (response: Response) => response.blob(),
        };
      },
      transformResponse: (response: Blob | MediaSource) => {
        if (!response || (response instanceof Blob && response.size <= 90)) {
          return null;
        }
        return URL.createObjectURL(response as Blob);
      },
      providesTags: ["Image"],
    }),

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
} = imageApi;
