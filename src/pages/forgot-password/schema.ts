// src/pages/forgot-password/schema.ts

import * as yup from "yup";

export const forgotPasswordSchema = yup.object({
  email: yup.string().email("Некорректный Email").required("Email обязателен"),
});

export type ForgotPasswordFormValues = yup.InferType<typeof forgotPasswordSchema>;
