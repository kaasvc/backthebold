
import React from "react";
import FormInput from "./FormInput";
import { FormSection as FormSectionType } from "@/utils/formUtils";

interface ContinuousFormSectionProps {
  section: FormSectionType;
  formData: Record<string, string>;
  onChange: (id: string, value: string) => void;
  errors: Record<string, string>;
}

const ContinuousFormSection: React.FC<ContinuousFormSectionProps> = ({
  section,
  formData,
  onChange,
  errors,
}) => {
  return (
    <div className="section bg-muted/10 p-6 rounded-lg">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
        {section.description && (
          <p className="text-muted-foreground">{section.description}</p>
        )}
      </div>

      <div className="space-y-6">
        {section.fields.map((field) => (
          <FormInput
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            value={formData[field.id] || ""}
            onChange={(value) => onChange(field.id, value)}
            placeholder={field.placeholder}
            helperText={field.helperText}
            error={errors[field.id]}
            required={field.required}
            options={field.options}
          />
        ))}
      </div>
    </div>
  );
};

export default ContinuousFormSection;
