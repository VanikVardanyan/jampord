import { Box, Button, Container, Typography, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, LoginFormValues } from "./schema";
import TextFieldControlled from "@/components/TextField/TextFieldControlled";
import { loginUser, signInWithGoogle } from "@/services/firebase/firebaseAuthService";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import GoogleLoginButton from "@/components/google-button";

export const LoginPage = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data: LoginFormValues) => {
    const { email, password } = data;
    try {
      await loginUser(email, password);
      navigate(ROUTES.profile);
      toast.success("Вход успешен");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("Произошла неизвестная ошибка");
      }
    }
  });

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      toast.success(`Добро пожаловать через Google, ${user.displayName ?? user.email}`);
      navigate(ROUTES.profile);
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("Произошла неизвестная ошибка");
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column">
        <Typography variant="h5" textAlign="center" gutterBottom mb={2}>
          Вход
        </Typography>

        <Box component="form" display="flex" flexDirection="column" gap={1} onSubmit={onSubmit} noValidate>
          <TextFieldControlled
            name="email"
            control={control}
            label="Email (только Gmail)"
            placeholder="example@gmail.com"
            fullWidth
          />

          <TextFieldControlled name="password" control={control} label="Пароль" placeholder="пароль" fullWidth />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={isSubmitting}>
            Войти
          </Button>

          <GoogleLoginButton onClick={handleGoogleLogin} />
        </Box>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate(ROUTES.forgotPassword)}
            sx={{ textDecoration: "underline" }}
          >
            Забыли пароль?
          </Link>

          <Link
            component="button"
            variant="body2"
            onClick={() => navigate(ROUTES.register)}
            sx={{ textDecoration: "underline" }}
          >
            Регистрация
          </Link>
        </Box>
      </Box>
    </Container>
  );
};
