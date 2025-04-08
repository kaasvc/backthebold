
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: React.ReactNode; // Accept ReactNode for helperText
  error?: string;
  required?: boolean;
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
  required,
  options,
}) => {
  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <Textarea
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className="resize-none"
          />
        );
      case "radio":
        return (
          <RadioGroup onValueChange={onChange} defaultValue={value}>
            <div className="flex items-center space-x-2">
              {options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${id}-${option}`} />
                  <Label htmlFor={`${id}-${option}`}>{option}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );
      case "select":
        return (
          <Select onValueChange={onChange} defaultValue={value}>
            <SelectTrigger id={id}>
              <SelectValue placeholder={placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <FormItem>
        <FormLabel htmlFor={id}>{label}{required && <span className="text-destructive ml-1">*</span>}</FormLabel>
        {renderInput()}
        {helperText && <FormDescription>{helperText}</FormDescription>}
        {error && <FormMessage>{error}</FormMessage>}
      </FormItem>
    </div>
  );
};

export default FormInput;
