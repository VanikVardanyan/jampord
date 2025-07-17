import MuiTextField, { TextFieldProps } from "@mui/material/TextField";
export type Props = TextFieldProps;
import cn from "classnames";
import { useStyles } from "./TextField.styles";

export const TextField = ({
  variant = "outlined",
  children,
  className,
  size = "medium",
  autoComplete = "off",
  fullWidth = true,
  margin = "normal",
  label,
  error,
  helperText,
  ...rest
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {label && <div className={classes.label}>{label}</div>}

      <MuiTextField
        className={cn(className, classes.root)}
        variant={variant}
        margin={margin}
        size={size}
        fullWidth={fullWidth}
        autoComplete={autoComplete}
        slotProps={{
          ...rest.slotProps,
          select: { native: true, ...rest.slotProps?.select },
        }}
        {...rest}
      >
        {children}
      </MuiTextField>
      {helperText && <div className={cn(classes.helperText, { [classes.error]: error })}>{helperText}</div>}
    </div>
  );
};
