import * as yup from "yup";

export type EntertainmentTourRequestData = {
  activityType: string;
  peopleCount: number;
  date: string;
  description: string;
  createdBy?: string;
};

export const entertainmentTourSchema: yup.ObjectSchema<EntertainmentTourRequestData> = yup.object({
  activityType: yup.string().required("Տեսակը պարտադիր է"),
  peopleCount: yup.number().min(1, "Առնվազն 1 մարդ").required("Մարդկանց քանակը պարտադիր է"),
  date: yup.string().required(),
  description: yup.string().required("Նկարագրությունը պարտադիր է"),
  createdBy: yup.string().optional(),
});
