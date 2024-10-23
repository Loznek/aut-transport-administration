import { TextField, TextFieldProps } from '@mui/material';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';

interface TextFieldWithControllerProps<TForm extends FieldValues> extends Omit<TextFieldProps<'outlined'>, 'variant'> {
  controllerProps: Omit<ControllerProps<TForm>, 'render'>;
}

const TextFieldWithController = <TForm extends FieldValues>({
  controllerProps,
  ...textFieldProps
}: TextFieldWithControllerProps<TForm>) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} error={!!error} helperText={error?.message} {...textFieldProps} variant="outlined" />
      )}
    />
  );
};

export default TextFieldWithController;
