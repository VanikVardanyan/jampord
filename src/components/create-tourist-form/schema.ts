import * as yup from "yup";
import { InferType } from "yup";

export const touristProfileSchema = yup.object({
  name: yup.string().required("Имя обязательно"),
  phone: yup.string().required("Телефон обязателен"),
  avatar: yup.string().url("Некорректная ссылка").optional(),
});

export type TouristFormData = InferType<typeof touristProfileSchema>;
