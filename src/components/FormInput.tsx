
import React from "react";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Check, X } from "lucide-react";

interface FormInputProps {
  id: string;
  label: string;
  type: "text" | "textarea" | "email" | "number" | "url" | "radio" | "select" | "file";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  className?: string;
  options?: string[];
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
  options = [],
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    onChange(e.target.value);
  };

  // Check if this is a Yes/No radio question
  const isYesNoQuestion = type === "radio" && 
    options.length === 2 && 
    options.includes("Yes") && 
    options.includes("No");

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
      ) : type === "select" && options && options.length > 0 ? (
        <select
          id={id}
          value={value}
          onChange={handleChange}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-red-500" : "border-input"
          )}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : isYesNoQuestion ? (
        <ToggleGroup 
          type="single" 
          value={value} 
          onValueChange={(val) => val && onChange(val)}
          className="flex justify-start"
        >
          <ToggleGroupItem 
            value="Yes" 
            aria-label="Yes"
            className={cn(
              "flex gap-2 border border-input px-4 py-2 rounded-l-md",
              value === "Yes" ? "bg-primary/10 border-primary/50" : ""
            )}
          >
            <Check className="h-4 w-4" />
            <span>Yes</span>
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="No" 
            aria-label="No"
            className={cn(
              "flex gap-2 border border-input px-4 py-2 rounded-r-md border-l-0",
              value === "No" ? "bg-primary/10 border-primary/50" : ""
            )}
          >
            <X className="h-4 w-4" />
            <span>No</span>
          </ToggleGroupItem>
        </ToggleGroup>
      ) : type === "radio" && options && options.length > 0 ? (
        <div className="space-y-2">
          {options.map((option) => (
            <label key={option} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={id}
                value={option}
                checked={value === option}
                onChange={() => onChange(option)}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
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
