
import React from "react";
import { cn } from "@/lib/utils";

interface FormInputProps {
  id: string;
  label: string;
  type: "text" | "textarea" | "email" | "number" | "url";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  helperText,
  error,
  required = false,
  className,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn("form-question w-full space-y-2", className)}>
      <div className="flex items-baseline justify-between">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>

      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-red-500" : "border-input"
          )}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-red-500" : "border-input"
          )}
        />
      )}

      {helperText && !error && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
      
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
