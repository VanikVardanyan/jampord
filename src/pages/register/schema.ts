import * as yup from "yup";

export const registerSchema = yup.object({
  email: yup
    .string()
    .email("Некорректный email")
    .matches(/@gmail\.com$/, "Только Gmail разрешён")
    .required("Email обязателен"),
  password: yup.string().min(6, "Минимум 6 символов").required("Пароль обязателен"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают")
    .required("Подтвердите пароль"),
});

export type RegisterFormValues = yup.InferType<typeof registerSchema>;
