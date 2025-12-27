import { Controller, Control, FieldValues } from "react-hook-form";
import BaseSelectMulti, { BaseSelectMultiProps } from "./BaseSelectMulti";

interface BaseSelectMultiRhfProps<T extends FieldValues>
  extends Omit<BaseSelectMultiProps, "value" | "onChange"> {
  name: string;
  control: Control<T>;
}

const BaseSelectMultiRhf = <T extends FieldValues>({
  name,
  control,
  ...props
}: BaseSelectMultiRhfProps<T>) => {
  return (
    <Controller
      name={name as any}
      control={control}
      defaultValue={[] as any}
      render={({ field, fieldState }) => (
        <BaseSelectMulti
          {...props}
          value={field.value || []}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

export default BaseSelectMultiRhf;
