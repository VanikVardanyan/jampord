import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../baseQueryWithAuth";
import { mapFirestoreFieldsToProfileData, mapProfileDataToFirestoreFields } from "@/services/firebase/profileService";
import { TourRequestData } from "./types";
import { FirestoreDocument, FirestoreSingleDocument } from "@/types";
import { safeCast } from "@/utils/safeCast";

export const tourRequestApi = createApi({
  reducerPath: "tourRequestApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["TourRequest"],
  endpoints: (builder) => ({
    // Получить все заявки
    getAllTourRequests: builder.query<TourRequestData[], void>({
      query: () => "/tourRequests",
      transformResponse: (response: { documents?: FirestoreDocument[] }) => {
        if (!response.documents) return [];

        return response.documents.map((doc) => {
          const fields = mapFirestoreFieldsToProfileData(doc.fields);
          return safeCast<TourRequestData>({
            id: doc.name.split("/").pop()!,
            ...fields,
          });
        });
      },
      providesTags: ["TourRequest"],
    }),

    // Получить мои заявки
    getMyTourRequests: builder.query<TourRequestData[], string>({
      query: () => "/tourRequests",
      transformResponse: (response: { documents?: FirestoreDocument[] }, _, userId: string) => {
        if (!response.documents) return [];

        return response.documents
          .map((doc) => {
            const id = doc.name.split("/").pop();
            if (!id) return null;

            const rawData = mapFirestoreFieldsToProfileData(doc.fields);

            if ("createdBy" in rawData && rawData.createdBy === userId) {
              return {
                id,
                ...(rawData as object),
              } as unknown as TourRequestData;
            }

            return null;
          })
          .filter((item): item is TourRequestData => item !== null);
      },
      providesTags: ["TourRequest"],
    }),

    // Получить одну заявку (если нужно)
    getTourRequest: builder.query<TourRequestData, string>({
      query: (id) => `/tourRequests/${id}`,
      transformResponse: (response: FirestoreSingleDocument) => {
        const rawData = mapFirestoreFieldsToProfileData(response.fields);

        return {
          id: response.name.split("/").pop()!,
          ...(rawData as object),
        } as unknown as TourRequestData;
      },
      providesTags: (_result, _err, id) => [{ type: "TourRequest", id }],
    }),

    // Создать заявку
    createTourRequest: builder.mutation<TourRequestData, { id: string; data: TourRequestData }>({
      query: ({ id, data }) => ({
        url: `/tourRequests/${id}`,
        method: "PATCH",
        body: {
          fields: mapProfileDataToFirestoreFields(data),
        },
      }),
      invalidatesTags: ["TourRequest"],
    }),

    // Обновить заявку
    updateTourRequest: builder.mutation<void, { id: string; data: Partial<TourRequestData> }>({
      query: ({ id, data }) => ({
        url: `/tourRequests/${id}`,
        method: "PATCH",
        body: {
          fields: mapProfileDataToFirestoreFields(data),
        },
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "TourRequest", id }, { type: "TourRequest" }],
    }),

    // Удалить заявку
    deleteTourRequest: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tourRequests/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "TourRequest", id }, { type: "TourRequest" }],
    }),
  }),
});

export const {
  useGetAllTourRequestsQuery,
  useGetMyTourRequestsQuery,
  useGetTourRequestQuery,
  useCreateTourRequestMutation,
  useUpdateTourRequestMutation,
  useDeleteTourRequestMutation,
} = tourRequestApi;
