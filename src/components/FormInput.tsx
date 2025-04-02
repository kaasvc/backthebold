import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: React.ReactNode; // Changed from string to ReactNode
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
  const formField = useFormField();

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
                <FormItem key={option} className="space-y-0">
                  <FormControl>
                    <RadioGroupItem value={option} id={`${id}-${option}`} />
                  </FormControl>
                  <FormLabel htmlFor={`${id}-${option}`}>{option}</FormLabel>
                </FormItem>
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
    <FormField
      control={{}}
      name={id}
    >
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          {renderInput()}
        </FormControl>
        {helperText && <FormDescription>{helperText}</FormDescription>}
        {error && <FormMessage>{error}</FormMessage>}
      </FormItem>
    </FormField>
  );
};

export default FormInput;
