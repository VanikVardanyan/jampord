import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Некорректный email")
    .matches(/@gmail\.com$/, "Только Gmail разрешён")
    .required("Email обязателен"),
  password: yup.string().required("Пароль обязателен"),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;
