import { Controller, Control, FieldValues } from "react-hook-form";
import BaseTextInput, { BaseTextInputProps } from "./BaseTextInput";

interface BaseTextInputRhfProps<T extends FieldValues>
  extends Omit<BaseTextInputProps, "value" | "onChange"> {
  name: string;
  control: Control<T>;
}

const BaseTextInputRhf = <T extends FieldValues>({
  name,
  control,
  ...props
}: BaseTextInputRhfProps<T>) => {
  return (
    <Controller
      name={name as any}
      control={control}
      defaultValue={"" as any}
      render={({ field, fieldState }) => (
        <BaseTextInput
          {...field}
          {...props}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

export default BaseTextInputRhf;
