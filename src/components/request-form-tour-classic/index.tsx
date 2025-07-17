import { Box, Button, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ClassicTourRequestSchema, ClassicTourRequestFormData } from "./schema";
import TextFieldControlled from "@/components/TextField/TextFieldControlled";
import countries from "i18n-iso-countries";
import ruLocale from "i18n-iso-countries/langs/ru.json";
import { Controller } from "react-hook-form";
import Select from "react-select";

countries.registerLocale(ruLocale);
type CountryOption = {
  label: string;
  value: string;
};

const countryOptions: CountryOption[] = Object.entries(countries.getNames("ru", { select: "official" })).map(
  ([code, name]) => ({
    label: name,
    value: code,
  })
);

type Props = {
  submitHandler: (data: ClassicTourRequestFormData) => void;
  defaultValues?: Partial<ClassicTourRequestFormData>;
  onBack?: () => void;
};

export const ClassicTourRequestForm = ({ submitHandler, defaultValues, onBack }: Props) => {
  const form = useForm<ClassicTourRequestFormData>({
    resolver: yupResolver(ClassicTourRequestSchema),
    defaultValues: {
      peopleCount: 1,
      childrenCount: 0,
      withAnimals: false,
      visaDeniedBefore: false,
      ...defaultValues,
    },
  });

  const {
    control,
    watch,
    register,
    formState: { errors },
  } = form;

  const selectedCountry = watch("country");

  return (
    <Box component="form" onSubmit={form.handleSubmit(submitHandler)} sx={{ maxWidth: 500, mx: "auto", p: 2 }}>
      <Typography variant="h6" mb={2}>
        Դիմում դասական տուրի համար
      </Typography>

      <TextFieldControlled
        name="peopleCount"
        control={control}
        label="Մարդկանց քանակ"
        type="number"
        fullWidth
        helperText={errors.peopleCount?.message}
      />

      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <Select<CountryOption, false>
            {...field}
            options={countryOptions}
            getOptionLabel={(e) => e.label}
            getOptionValue={(e) => e.value}
            onChange={(option) => field.onChange(option?.value)}
            value={countryOptions.find((opt) => opt.value === field.value)}
            placeholder="Ընտրեք երկիրը"
            isClearable
          />
        )}
      />
      {selectedCountry && (
        <TextFieldControlled name="city" control={control} label="Քաղաք" fullWidth helperText={errors.city?.message} />
      )}

      <TextFieldControlled
        name="description"
        control={control}
        label="Նկարագրություն"
        fullWidth
        multiline
        rows={3}
        helperText={errors.description?.message}
      />

      <TextFieldControlled
        name="budget"
        control={control}
        label="Բյուջե"
        fullWidth
        helperText={errors.budget?.message}
      />

      <FormControlLabel control={<Checkbox {...register("withAnimals")} />} label="Ունեմ կենդանիներ" />

      <TextFieldControlled
        name="preferredDate"
        control={control}
        label="Նախընտրելի ամսաթիվ"
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
        helperText={errors.preferredDate?.message}
      />

      <TextFieldControlled
        name="daysCount"
        control={control}
        label="Տևողությունը (օր)"
        fullWidth
        helperText={errors.daysCount?.message}
      />

      <FormControlLabel
        control={<Checkbox {...register("visaDeniedBefore")} />}
        label="Անցյալում եղել է մերժված վիզա"
      />

      <TextFieldControlled
        name="childrenCount"
        control={control}
        label="Երեխաների քանակ"
        type="number"
        fullWidth
        helperText={errors.childrenCount?.message}
      />

      <Box display="flex" justifyContent="space-between" mt={3}>
        {onBack && (
          <Button variant="outlined" onClick={onBack}>
            Վերադառնալ
          </Button>
        )}
        <Button variant="contained" type="submit">
          Ուղարկել հայտը
        </Button>
      </Box>
    </Box>
  );
};
