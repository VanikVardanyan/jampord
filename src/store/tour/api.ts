import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../baseQueryWithAuth";
import { mapProfileDataToFirestoreFields, mapFirestoreFieldsToProfileData } from "@/services/firebase/profileService";
import { TourDataType } from "./types";
import { FirestoreDocument, FirestoreSingleDocument } from "@/types";

export const tourApi = createApi({
  reducerPath: "tourApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Tour"],
  endpoints: (builder) => ({
    // Получить все туры
    getTours: builder.query<TourDataType[], void>({
      query: () => `/tours`,
      transformResponse: (response: { documents?: FirestoreDocument[] }) => {
        if (!response.documents) return [];
        return response.documents.map((doc) => ({
          id: doc.name.split("/").pop(), // вытащить ID документа
          ...mapFirestoreFieldsToProfileData(doc.fields),
        })) as TourDataType[];
      },
      providesTags: ["Tour"],
    }),

    // Получить один тур
    getTour: builder.query<TourDataType, string>({
      query: (tourId) => `/tours/${tourId}`,
      transformResponse: (response: FirestoreSingleDocument) => {
        const fields = response.fields || {};
        return {
          id: response.name.split("/").pop(),
          ...mapFirestoreFieldsToProfileData(fields),
        } as TourDataType;
      },
      providesTags: (_result, _error, tourId) => [{ type: "Tour", id: tourId }],
    }),

    // Создать тур
    createTour: builder.mutation<TourDataType, { tourId: string; data: TourDataType }>({
      query: ({ tourId, data }) => ({
        url: `/tours/${tourId}`,
        method: "PATCH",
        body: {
          fields: mapProfileDataToFirestoreFields(data),
        },
      }),
      invalidatesTags: ["Tour"],
    }),

    // Обновить тур
    updateTour: builder.mutation<void, { tourId: string; data: Partial<TourDataType> }>({
      query: ({ tourId, data }) => ({
        url: `/tours/${tourId}`,
        method: "PATCH",
        body: {
          fields: mapProfileDataToFirestoreFields(data),
        },
      }),
      invalidatesTags: (_result, _error, { tourId }) => [{ type: "Tour", id: tourId }],
    }),

    // Удалить тур
    deleteTour: builder.mutation<void, string>({
      query: (tourId) => ({
        url: `/tours/${tourId}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Tour" }],
    }),
    // Получить мои туры
    getMyTours: builder.query<TourDataType[], string>({
      query: () => `/tours`,
      transformResponse: (response: { documents?: FirestoreDocument[] }, _meta, userId: string) => {
        if (!response.documents) return [];

        return response.documents
          .map((doc): TourDataType => {
            const fields = mapFirestoreFieldsToProfileData(doc.fields);
            return {
              id: doc.name.split("/").pop() || "",
              ...fields,
            } as TourDataType;
          })
          .filter((tour) => tour.createdBy === userId);
      },
      providesTags: (result) =>
        result
          ? [...result.map((tour) => ({ type: "Tour" as const, id: tour.id })), { type: "Tour", id: "LIST" }]
          : [{ type: "Tour", id: "LIST" }],
    }),
  }),
});

export const {
  useGetToursQuery,
  useGetTourQuery,
  useCreateTourMutation,
  useUpdateTourMutation,
  useDeleteTourMutation,
  useGetMyToursQuery,
} = tourApi;
