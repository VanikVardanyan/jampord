import { Control, FieldValues, Path, useController } from "react-hook-form";
import { Props as TextFieldProps } from "./TextField";
import { MuiTelInput } from "mui-tel-input";

type TransformFunction = (value: string) => string | number | boolean | null;

export type Props<T extends FieldValues> = Omit<TextFieldProps, "name" | "value" | "onChange" | "onBlur"> & {
  control: Control<T>;
  name: Path<T>;
  transform?: TransformFunction;
  handleChange?: (value: ReturnType<TransformFunction>) => void;
  handleBlur?: () => void;
  onlyNumbers?: boolean;
};

const PhoneFieldControlled = <T extends FieldValues>({
  control,
  name,
  helperText,
  transform = (value) => value,
  handleChange,
  handleBlur,
  onlyNumbers,
  ...rest
}: Props<T>) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  const handleFieldChange = (value: string) => {
    const newValue = transform(value);

    if (onlyNumbers && isNaN(Number(newValue))) {
      return;
    }

    onChange(newValue);
    handleChange?.(newValue);
  };

  const handleFieldBlur: TextFieldProps["onBlur"] = () => {
    onBlur();
    handleBlur?.();
  };

  return (
    <MuiTelInput
      value={value}
      onChange={handleFieldChange}
      onBlur={handleFieldBlur}
      error={invalid}
      variant="outlined"
      defaultCountry="AM"
      helperText={error?.message || helperText}
      {...rest}
    />
  );
};

export default PhoneFieldControlled;
