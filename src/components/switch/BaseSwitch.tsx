import React from "react";
import { Switch } from "@/components/ui/switch";

export interface BaseSwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

const BaseSwitch: React.FC<BaseSwitchProps> = ({
  label,
  checked = false,
  onChange,
  error,
  required = false,
  className = "",
}) => {
  return (
    <div className="form-control w-full my-2">
      <div className="flex items-center justify-between">
        {label && (
          <label className="text-(--color-text) font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <Switch
          checked={checked}
          onCheckedChange={onChange}
          className={className}
        />
      </div>

      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default BaseSwitch;
