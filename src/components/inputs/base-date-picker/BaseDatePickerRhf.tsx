import React from "react";
import { Controller, Control, FieldValues } from "react-hook-form";
import BaseDatePicker, { BaseDatePickerProps } from "./BaseDatePicker";

interface BaseDatePickerRhfProps<T extends FieldValues>
  extends Omit<BaseDatePickerProps, "value" | "onChange"> {
  name: string;
  control: Control<T>;
}

const BaseDatePickerRhf = <T extends FieldValues>({
  name,
  control,
  ...props
}: BaseDatePickerRhfProps<T>) => {
  return (
    <Controller
      name={name as any}
      control={control}
      defaultValue={undefined as any}
      render={({ field, fieldState }) => (
        <BaseDatePicker
          {...props}
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

export default BaseDatePickerRhf;
