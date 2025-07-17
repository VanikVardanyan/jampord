import { Box, Button, Container, Typography, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import { forgotPasswordSchema, ForgotPasswordFormValues } from "./schema";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import TextFieldControlled from "@/components/TextField/TextFieldControlled";

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = handleSubmit(async ({ email }: ForgotPasswordFormValues) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Письмо для восстановления пароля отправлено!");
      navigate(ROUTES.login);
    } catch (error) {
      toast.error("Ошибка при отправке письма. Проверьте правильность Email.");
      console.error(error);
    }
  });

  return (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column">
        <Typography variant="h5" textAlign="center" gutterBottom mb={2}>
          Восстановление пароля
        </Typography>

        <Box component="form" display="flex" flexDirection="column" gap={1} onSubmit={onSubmit} noValidate>
          <TextFieldControlled name="email" control={control} label="Email" placeholder="Введите ваш email" fullWidth />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={isSubmitting}>
            Отправить письмо
          </Button>

          <Link
            component="button"
            variant="body2"
            onClick={() => navigate(ROUTES.login)}
            sx={{ mt: 2, textDecoration: "underline", alignSelf: "center" }}
          >
            Вернуться ко входу
          </Link>
        </Box>
      </Box>
    </Container>
  );
};
