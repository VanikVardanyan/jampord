import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { TextField, Props as TextFieldProps } from './TextField';

type TransformFunction = (value: string) => string | number | boolean | null;

export type Props<T extends FieldValues> = Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur'> & {
  control: Control<T>;
  name: Path<T>;
  transform?: TransformFunction;
  handleChange?: (value: ReturnType<TransformFunction>) => void;
  handleBlur?: () => void;
  onlyNumbers?: boolean;
};

const TextFieldControlled = <T extends FieldValues>({
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
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  const handleFieldChange: TextFieldProps['onChange'] = (event) => {
    const newValue = transform(event.target.value);

    if (onlyNumbers && isNaN(Number(newValue))) {
      return;
    }

    onChange(newValue);
    handleChange?.(newValue);
  };

  const handleFieldBlur: TextFieldProps['onBlur'] = () => {
    onBlur();
    handleBlur?.();
  };

  return (
    <TextField
      inputRef={ref}
      value={value}
      onChange={handleFieldChange}
      onBlur={handleFieldBlur}
      error={invalid}
      helperText={error?.message || helperText}
      {...rest}
    />
  );
};

export default TextFieldControlled;
