import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export interface BaseSelectOption {
  label: string;
  value: string;
}

export interface BaseSelectProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  options: BaseSelectOption[];
  className?: string;
  size?: "small" | "medium";
}

const BaseSelect: React.FC<BaseSelectProps> = ({
  label,
  placeholder = "Select...",
  value,
  onChange,
  error,
  required = false,
  options,
  className = "",
  size = "medium",
}) => {
  return (
    <div className="form-control w-full my-2">
      {label && (
        <label className="label">
          <span className="text-(--color-text) font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </span>
        </label>
      )}

      <Select onValueChange={onChange} value={value}>
        <SelectTrigger
          className={`bg-(--color-card) border-2 text-md w-full  text-(--color-text) ${
            size === "small" ? "h-10" : "h-12!"
          } ${
            error ? "border-red-500" : "border-(--color-dark-light)"
          } ${className}`}
        >
          <SelectValue
            className="text-(--color-text)!"
            placeholder={placeholder}
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="text-(--color-text)"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default BaseSelect;
