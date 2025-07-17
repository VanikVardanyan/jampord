import { useForm } from "react-hook-form";
import { Typography, Box, Button, Paper, Stack } from "@mui/material";
import TextFieldControlled from "@/components/TextField/TextFieldControlled";
import { yupResolver } from "@hookform/resolvers/yup";
import PhoneFieldControlled from "@/components/TextField/PhoneFieldControlled";
import { TouristFormData, touristProfileSchema } from "./schema";
import { defaultValuesForm, TouristFormProps } from "./types";

export const TouristForm = ({ submitHandler, onBack, defaultValues = defaultValuesForm }: TouristFormProps) => {
  const { handleSubmit, control } = useForm<TouristFormData>({
    resolver: yupResolver(touristProfileSchema),
    defaultValues,
  });

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Box component="form" onSubmit={handleSubmit(submitHandler)} noValidate>
          <Typography variant="h5" textAlign="center" mb={3}>
            Создание профиля туриста
          </Typography>
          <Stack spacing={2}>
            <TextFieldControlled control={control} name="name" label="Имя" fullWidth margin="normal" />
            <PhoneFieldControlled control={control} name="phone" label="Телефон" fullWidth margin="normal" />

            <TextFieldControlled
              control={control}
              name="avatar"
              label="Ссылка на аватар (необязательно)"
              fullWidth
              margin="normal"
            />
          </Stack>
          <Stack direction="row" spacing={2} mt={4}>
            <Button onClick={onBack} variant="outlined" fullWidth>
              Назад
            </Button>
            <Button type="submit" onClick={handleSubmit(submitHandler)} variant="contained" fullWidth>
              Создать профиль
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};
