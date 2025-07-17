import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../baseQueryWithAuth";
import { mapFirestoreFieldsToProfileData, mapProfileDataToFirestoreFields } from "@/services/firebase/profileService";
import { AgencyProfileData, FirestoreField, TouristProfileData } from "@/types";

type ProfileDataType = AgencyProfileData | TouristProfileData;

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileDataType, string>({
      query: (userId) => `/profiles/${userId}`,
      transformResponse: (response: unknown) => {
        const { fields } = response as { fields: Record<string, FirestoreField> };
        return mapFirestoreFieldsToProfileData(fields) as unknown as ProfileDataType;
      },
      providesTags: (_result, _error, userId) => [{ type: "Profile", id: userId }], // <--- СВЯЗАЛИ
    }),
    createProfile: builder.mutation<ProfileDataType, { userId: string; data: ProfileDataType }>({
      query: ({ userId, data }) => ({
        url: `/profiles/${userId}`,
        method: "PATCH",
        body: {
          fields: mapProfileDataToFirestoreFields(data),
        },
      }),
      transformResponse: (response: { fields: Record<string, FirestoreField> }) => {
        return mapFirestoreFieldsToProfileData(response.fields) as unknown as ProfileDataType;
      },
      invalidatesTags: (_result, _error, { userId }) => [{ type: "Profile", id: userId }],
    }),
    updateProfile: builder.mutation<void, { userId: string; data: Partial<ProfileDataType> }>({
      query: ({ userId, data }) => ({
        url: `/profiles/${userId}`,
        method: "PATCH",
        body: {
          fields: mapProfileDataToFirestoreFields(data),
        },
      }),
      invalidatesTags: (_result, _error, { userId }) => [{ type: "Profile", id: userId }],
    }),
  }),
});

export const { useGetProfileQuery, useCreateProfileMutation, useUpdateProfileMutation } = profileApi;
