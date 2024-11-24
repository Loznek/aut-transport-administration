import { Controller, ControllerProps, FieldValues } from 'react-hook-form';
import { Autocomplete, AutocompleteProps, TextField, TextFieldProps } from '@mui/material';
import * as React from 'react';
import { ChipTypeMap } from '@mui/material/Chip';

interface AutocompleteWithControllerProps<
  FormValues extends FieldValues,
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
> extends Omit<
    AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>,
    'renderInput' | 'onChange'
  > {
  controllerProps: Omit<ControllerProps<FormValues>, 'render'>;
  textFieldProps?: Omit<TextFieldProps, 'variant' | 'error' | 'helperText' | 'ref'>;
}

const AutocompleteWithController = <
  FormValues extends FieldValues,
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
>({
  controllerProps,
  textFieldProps,
  options,
  ...autocompleteProps
}: AutocompleteWithControllerProps<FormValues, Value, Multiple, DisableClearable, FreeSolo, ChipComponent>) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Autocomplete
          {...autocompleteProps}
          options={options}
          onChange={(_, value) => onChange(value)}
          renderInput={(params) => (
            <TextField {...params} {...textFieldProps} variant="outlined" error={!!error} helperText={error?.message} />
          )}
        />
      )}
    />
  );
};

export default AutocompleteWithController;
