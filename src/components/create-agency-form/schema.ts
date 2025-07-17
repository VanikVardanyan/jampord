import * as yup from "yup";
import { InferType } from "yup";

export const agencyProfileSchema = yup.object({
  companyName: yup.string().required("Название агентства обязательно"),
  phone: yup.string().required("Телефон обязателен"),
  country: yup.string().required("Страна обязательна"),
  about: yup.string().required("Описание обязательно"),
  fb: yup.string().url("Некорректная ссылка").optional(),
  tiktok: yup.string().url("Некорректная ссылка").optional(),
  telegram: yup.string().url("Некорректная ссылка").optional(),
  instagram: yup.string().url("Некорректная ссылка").optional(),
  avatar: yup.string().url("Некорректная ссылка").optional(),
});

export type AgencyFormData = InferType<typeof agencyProfileSchema>;

export const defaultAgencyValues = {
  companyName: "",
  phone: "",
  country: "",
  about: "",
  fb: "",
  tiktok: "",
  telegram: "",
  instagram: "",
  avatar: "",
};
