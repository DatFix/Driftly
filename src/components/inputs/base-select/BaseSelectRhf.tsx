import React from "react";
import { Controller, Control, FieldValues } from "react-hook-form";
import BaseSelect, { BaseSelectProps } from "./BaseSelect";

interface BaseSelectRhfProps<T extends FieldValues>
  extends Omit<BaseSelectProps, "value" | "onChange"> {
  name: string;
  control: Control<T>;
}

const BaseSelectRhf = <T extends FieldValues>({
  name,
  control,
  ...props
}: BaseSelectRhfProps<T>) => {
  return (
    <Controller
      name={name as any}
      control={control}
      defaultValue={"" as any}
      render={({ field, fieldState }) => (
        <BaseSelect
          {...props}
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

export default BaseSelectRhf;
