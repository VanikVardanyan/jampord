import { Box, Button, Container, Typography, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema, RegisterFormValues } from "./schema";
import TextFieldControlled from "@/components/TextField/TextFieldControlled";
import { registerUser } from "../../services/firebase/firebaseAuthService";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async (data: RegisterFormValues) => {
    const { email, password } = data;
    try {
      await registerUser(email, password);
      navigate(ROUTES.profile);
      toast.success("Регистрация успешна");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("Произошла неизвестная ошибка");
      }
    }
  });

  return (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column">
        <Typography variant="h5" textAlign="center" gutterBottom mb={2}>
          Регистрация
        </Typography>

        <Box component={"form"} display="flex" flexDirection="column" gap={1} onSubmit={onSubmit} noValidate>
          <TextFieldControlled
            name="email"
            control={control}
            label="Email (только Gmail)"
            placeholder="example@gmail.com"
            fullWidth
          />

          <TextFieldControlled name="password" control={control} label="Пароль" fullWidth placeholder="Пароль" />

          <TextFieldControlled
            name="confirmPassword"
            control={control}
            label="Повторите пароль"
            fullWidth
            placeholder="Пароль"
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={isSubmitting}>
            Зарегистрироваться
          </Button>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate(ROUTES.login)}
          sx={{ textDecoration: "underline" }}
        >
          Вход
        </Link>
      </Box>
    </Container>
  );
};
