// components/tour-request/forms/EntertainmentTourRequestForm.tsx
import { Box, Button, MenuItem, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextFieldControlled from "@/components/TextField/TextFieldControlled";
import { entertainmentTourSchema, EntertainmentTourRequestData } from "./schema";

const entertainmentOptions = ["Ճիպինգ", "Ճանապարհորդություն ձիերով", "Զիփլայն", "Քեմփինգ", "Լեռնային արշավ"];

type Props = {
  defaultValues?: Partial<EntertainmentTourRequestData>;
  submitHandler: (data: EntertainmentTourRequestData) => void;
  isLoading?: boolean;
};

export const EntertainmentTourRequestForm = ({ defaultValues, submitHandler, isLoading }: Props) => {
  const form = useForm<EntertainmentTourRequestData>({
    defaultValues: {
      activityType: "",
      peopleCount: 1,
      description: "",
      date: "",
      ...defaultValues,
    },
    resolver: yupResolver(entertainmentTourSchema),
  });

  return (
    <Box component="form" onSubmit={form.handleSubmit(submitHandler)} sx={{ maxWidth: 500, mx: "auto" }}>
      <Typography variant="h5" mb={3}>
        Հայտ՝ ժամանցային տուրի համար
      </Typography>

      <TextFieldControlled
        control={form.control}
        name="activityType"
        label="Տեսակը"
        select
        fullWidth
        required
        helperText="Ընտրեք ժամանցի տեսակը"
      >
        {entertainmentOptions.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </TextFieldControlled>

      <TextFieldControlled
        control={form.control}
        name="peopleCount"
        type="number"
        label="Մարդկանց քանակը"
        fullWidth
        required
        helperText="Քանի հոգու համար է"
      />

      <TextFieldControlled
        control={form.control}
        name="date"
        label="Ցանկալի ամսաթիվ"
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
        helperText="Որ օրը եք ցանկանում"
      />

      <TextFieldControlled
        control={form.control}
        name="description"
        label="Նկարագրություն"
        multiline
        rows={4}
        fullWidth
        helperText="Լրացուցիչ մանրամասներ"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        disabled={form.formState.isSubmitting || isLoading}
      >
        Ուղարկել հայտ
      </Button>
    </Box>
  );
};
