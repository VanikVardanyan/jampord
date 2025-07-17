import { AgencyFormData, agencyProfileSchema, defaultAgencyValues } from "./schema";
import { useForm } from "react-hook-form";
import { Typography, Box, Button, Paper, Stack } from "@mui/material";
import TextFieldControlled from "@/components/TextField/TextFieldControlled";
import { yupResolver } from "@hookform/resolvers/yup";
import PhoneFieldControlled from "@/components/TextField/PhoneFieldControlled";

type Props = {
  submitHandler: (data: AgencyFormData) => void;
  onBack?: () => void;
  defaultValues?: AgencyFormData;
};

export const AgencyForm = ({ submitHandler, onBack, defaultValues = defaultAgencyValues }: Props) => {
  const { control, handleSubmit } = useForm<AgencyFormData>({
    resolver: yupResolver(agencyProfileSchema),
    defaultValues,
  });

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Box component="form" onSubmit={handleSubmit(submitHandler)} noValidate>
          <Typography variant="h5" textAlign="center" mb={3}>
            Создание профиля агентства
          </Typography>
          <Stack spacing={2}>
            <TextFieldControlled
              control={control}
              name="companyName"
              label="Название агентства"
              fullWidth
              margin="normal"
            />
            <PhoneFieldControlled control={control} name="phone" label="Телефон" fullWidth margin="normal" />
            <TextFieldControlled control={control} name="country" label="Страна" fullWidth margin="normal" />
            <TextFieldControlled
              control={control}
              name="about"
              label="О компании"
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />
          </Stack>
          <Typography variant="h6" mt={3} mb={2}>
            Социальные сети (необязательно)
          </Typography>
          <Stack spacing={2}>
            <TextFieldControlled control={control} name="fb" label="Facebook" fullWidth margin="normal" />
            <TextFieldControlled control={control} name="tiktok" label="TikTok" fullWidth margin="normal" />
            <TextFieldControlled control={control} name="telegram" label="Telegram" fullWidth margin="normal" />
            <TextFieldControlled control={control} name="instagram" label="Instagram" fullWidth margin="normal" />
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
            <Button type="submit" variant="contained" fullWidth>
              Создать профиль
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};
