/* eslint-disable @typescript-eslint/no-explicit-any */
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
        const token = localStorage.getItem('Token');
        if (!image) {
          throw new Error('Id is required');
        }
        return {
          url: `/upload-image/${image}`,
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
          responseHandler: (response: Response) => response.blob(),
        };
      },
      transformResponse: (response: Blob) => {
        if (!response || response.size <= 90) return null;
        return URL.createObjectURL(response);
      },
      
      providesTags: ["Image"],
    }),
    
    updateProfileImage: builder.mutation<any, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/upload-image/${id}`,
        method: "PUT",
        body: formData,
        headers: {
          Authorization: (() => {
            const token = localStorage.getItem("Token");
            return token ? `Bearer ${token}` : "";
          })(),
        },
      }),
      invalidatesTags: ["Image"],
    }),
    
    

    getAllImage: builder.query<string[] | null, void>({
      query: () => {
        const token = localStorage.getItem('Token');
        return {
          url: 'upload-image', // Make sure this matches your Express route
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
          // Expect JSON response, not Blob
          responseHandler: async (response: Response) => await response.json(),
        };
      },
      transformResponse: (response: any) => {
        if (!response || !response.success || !Array.isArray(response.images)) {
          return null;
        }
      
        return response.images.map((img: any) => {
          if (img?.data?.$binary?.base64 && img?.contentType) {
            return `data:${img.contentType};base64,${img.data.$binary.base64}`;
          }
          return null;
        }).filter((url: any): url is string => !!url);
      },      
      providesTags: ['Image'],
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
  useGetAllImageQuery,
  useUpdateProfileImageMutation,
} = imageApi;
