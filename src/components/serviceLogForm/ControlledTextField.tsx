import { ErrorOutline } from "@mui/icons-material";
import { Box, Stack, TextField, Typography, type TextFieldProps } from "@mui/material";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";

interface ControlledTextFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: boolean;
  helperText?: string;
  type?: string;
  htmlInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  textFieldProps?: Omit<TextFieldProps, "name" | "label" | "error" | "helperText" | "type">;
}

const ControlledTextField = <T extends FieldValues>({
  name,
  control,
  label,
  error,
  helperText,
  type,
  htmlInputProps,
  textFieldProps,
}: ControlledTextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box sx={{ width: "100%" }}>
          <TextField
            {...field}
            label={label}
            type={type}
            error={error}
            helperText={null}
            fullWidth
            slotProps={{
              htmlInput: htmlInputProps,
            }}
            {...textFieldProps}
          />
          {helperText && (
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              sx={{ mt: 0.5, ml: 1.75 }}
            >
              {error && (
                <ErrorOutline
                  sx={{
                    fontSize: "0.875rem",
                    color: "error.main",
                  }}
                />
              )}
              <Typography
                variant="caption"
                sx={{
                  color: error ? "error.main" : "text.secondary",
                }}
              >
                {helperText}
              </Typography>
            </Stack>
          )}
        </Box>
      )}
    />
  );
};

export default ControlledTextField;
