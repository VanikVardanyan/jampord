import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import TextFieldControlled from "@/components/TextField/TextFieldControlled";
import { schema } from "./schema";
import { toast } from "react-toastify";

import { defaultValuesForm, TourFormData, TourFormProps } from "./types";

export const CreateTourForm = (props: TourFormProps) => {
  const { successCallback, defaultValues = defaultValuesForm } = props;

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<TourFormData>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit = async (data: TourFormData) => {
    try {
      const newTour = {
        name: data.name,
        description: data.description,
        price: data.price,
        startDate: data.startDate,
        endDate: data.endDate,
        image: data.image,
      };

      successCallback(newTour);
    } catch (error) {
      console.error("Ошибка при создании тура:", error);
      toast.error("Սխալ ստեղծելու ժամանակ");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", e.target.files as FileList);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 500, mx: "auto", p: 2 }}>
      <Typography variant="h5" mb={3}>
        Ստեղծել Տուր
      </Typography>

      {/* Картинка */}
      <Button variant="contained" component="label" sx={{ mb: 2 }}>
        Վերբեռնել Նկար
        <input type="file" hidden accept="image/*" {...register("image")} onChange={handleImageChange} />
      </Button>

      {preview && (
        <Box mb={2}>
          <img src={preview} alt="Preview" style={{ width: "100%", borderRadius: 8 }} />
        </Box>
      )}

      {/* Название */}
      <TextFieldControlled
        name="name"
        control={control}
        label="Անուն"
        fullWidth
        placeholder="Մուտքագրեք տուրի անունը"
        helperText={errors.name?.message}
      />

      {/* Описание */}
      <TextFieldControlled
        name="description"
        control={control}
        label="Նկարագրություն"
        fullWidth
        placeholder="Մուտքագրեք նկարագրությունը"
        multiline
        rows={4}
        helperText={errors.description?.message}
      />

      {/* Цена */}
      <TextFieldControlled
        name="price"
        control={control}
        label="Գին (դրամ)"
        onlyNumbers
        fullWidth
        placeholder="Մուտքագրեք գինը (ոչ պարտադիր)"
        helperText={errors.price?.message}
      />

      {/* Дата начала */}
      <TextFieldControlled
        name="startDate"
        control={control}
        label="Մեկնարկի ամսաթիվ"
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
        helperText={errors.startDate?.message}
      />
      {/* Дата конца */}
      <TextFieldControlled
        name="endDate"
        control={control}
        label="Ավարտի ամսաթիվ"
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
        helperText={errors.endDate?.message}
      />

      {/* Кнопка */}
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
        Ստեղծել
      </Button>
    </Box>
  );
};
