
import React, { useState } from "react";
import { toast } from "sonner";
import { formSections, submitForm, validateAllSections } from "@/utils/formUtils";
import { Button } from "@/components/ui/button";
import FormSection from "./FormSection";

const ApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle changing form values
  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Clear error when field is updated
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const validationErrors = validateAllSections(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      
      // Focus the first field with an error
      const firstErrorField = Object.keys(validationErrors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => element.focus(), 500);
        }
      }
      
      toast.error("Please complete all required fields", {
        description: "There are some missing or invalid fields in your application."
      });
      
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await submitForm(formData);
      if (success) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-3xl mx-auto text-center py-12">
        <div className="bg-green-50 text-green-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-3">Application Submitted!</h2>
          <p className="mb-4">
            Thank you for submitting your application to KaasX. Our team will review your information and get back to you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-12 w-full max-w-3xl mx-auto">
        {formSections.map((section) => (
          <div key={section.id} className="py-6 border-b border-border/40 last:border-0">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              {section.description && (
                <p className="mt-2 text-muted-foreground">{section.description}</p>
              )}
            </div>
            
            <div className="space-y-6">
              {section.fields.map((field) => (
                <div key={field.id} className="form-question w-full space-y-2">
                  <div className="flex items-baseline justify-between">
                    <label
                      htmlFor={field.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                  </div>

                  {field.type === "textarea" ? (
                    <textarea
                      id={field.id}
                      value={formData[field.id] || ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className={`flex min-h-24 w-full rounded-md border ${
                        errors[field.id] ? "border-red-500" : "border-input"
                      } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 disabled:cursor-not-allowed disabled:opacity-50`}
                    />
                  ) : (
                    <input
                      id={field.id}
                      type={field.type}
                      value={formData[field.id] || ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className={`flex h-10 w-full rounded-md border ${
                        errors[field.id] ? "border-red-500" : "border-input"
                      } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 disabled:cursor-not-allowed disabled:opacity-50`}
                    />
                  )}

                  {field.helperText && !errors[field.id] && (
                    <p className="text-sm text-muted-foreground">{field.helperText}</p>
                  )}
                  
                  {errors[field.id] && <p className="text-sm text-red-500">{errors[field.id]}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="py-6 flex justify-center">
          <Button
            type="submit"
            className="w-full md:w-auto px-8"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
