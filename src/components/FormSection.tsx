
import React, { useEffect } from "react";
import FormInput from "./FormInput";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FormSection as FormSectionType, validateSection } from "@/utils/formUtils";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  section: FormSectionType;
  formData: Record<string, string>;
  onChange: (id: string, value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const FormSection: React.FC<FormSectionProps> = ({
  section,
  formData,
  onChange,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  errors,
  setErrors,
}) => {
  // Validate when user tries to proceed to next section
  const handleNext = () => {
    const sectionErrors = validateSection(formData, section);
    
    if (Object.keys(sectionErrors).length === 0) {
      onNext();
    } else {
      setErrors(prev => ({ ...prev, ...sectionErrors }));
    }
  };

  // Clear errors when changing values
  const handleChange = (id: string, value: string) => {
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
    onChange(id, value);
  };

  // Auto-focus first field when section becomes visible
  useEffect(() => {
    const firstField = section.fields[0];
    if (firstField) {
      const element = document.getElementById(firstField.id);
      if (element) {
        setTimeout(() => {
          element.focus();
        }, 300); // Delay focus to allow animation to complete
      }
    }
  }, [section]);

  return (
    <div className="form-section w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">{section.title}</h2>
        {section.description && (
          <p className="mt-2 text-muted-foreground">{section.description}</p>
        )}
      </div>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
        {section.fields.map((field) => (
          <FormInput
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            value={formData[field.id] || ""}
            onChange={(value) => handleChange(field.id, value)}
            placeholder={field.placeholder}
            helperText={field.helperText}
            error={errors[field.id]}
            required={field.required}
          />
        ))}

        <div className={cn("flex pt-4", isFirst ? "justify-end" : "justify-between")}>
          {!isFirst && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onPrevious}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
          )}
          
          <Button
            type="submit"
            className="flex items-center gap-2"
          >
            {isLast ? "Submit Application" : "Next"}
            {!isLast && <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormSection;
