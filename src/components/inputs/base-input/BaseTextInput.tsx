import { EyeClosedIcon, EyeOpenIcon } from "@/components/icons/BaseIcon";
import React, { ReactNode, useState } from "react";

export interface BaseTextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  className?: string;
  required?: boolean;
  icon?: ReactNode;
  size?: "small" | "medium";
}

const BaseTextInput: React.FC<BaseTextInputProps> = ({
  label,
  error,
  className = "",
  required = false,
  icon,
  size = "medium",
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="form-control w-full my-2">
      {label && (
        <label className="label">
          <span className="text-(--color-text) font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </span>
        </label>
      )}

      {/* ✅ Thêm relative để định vị icon */}
      <div
        className={`bg-(--color-card) relative flex items-center border-2 transition-all duration-200 ${
          focus
            ? "ring-[#FF567166] border-[#FF567199] shadow-none ring-2"
            : "border-(--color-dark-light)"
        }`}
      >
        {icon && <div className="w-5 ml-2">{icon}</div>}

        <input
          {...props}
          type={
            props.type === "password"
              ? showPass
                ? "text"
                : "password"
              : props.type
          }
          spellCheck={false}
          value={props.value ?? ""}
          required={required}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`disabled:bg-(--color-dark-light) text-(--color-text) font-normal px-3 w-full focus:outline-none ${
            size === "small" ? "h-9" : "h-11"
          } ${props.type === "password" ? "pr-10" : ""} ${className} ${
            error ? "input-error" : ""
          }`}
        />

        {props.type === "password" && (
          <button
            type="button"
            onClick={() => setShowPass((prev) => !prev)}
            className={`absolute right-3 text-(--color-text) opacity-70  ${
              props.disabled === true ? "hover:opacity-70" : "hover:opacity-100"
            }`}
          >
            {showPass && props.disabled === false ? (
              <EyeClosedIcon />
            ) : (
              <EyeOpenIcon />
            )}
          </button>
        )}
      </div>

      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default BaseTextInput;
