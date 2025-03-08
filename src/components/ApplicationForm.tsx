
import React, { useState } from "react";
import FormSection from "./FormSection";
import FormProgress from "./FormProgress";
import SubmitSection from "./SubmitSection";
import { formSections, submitForm, validateSection } from "@/utils/formUtils";
import { toast } from "@/components/ui/sonner";

const ApplicationForm: React.FC = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isReviewStep = currentSectionIndex === formSections.length;

  // Handle changing form values
  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // Navigate to previous section
  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Navigate to next section
  const handleNext = () => {
    const currentSection = formSections[currentSectionIndex];
    const sectionErrors = validateSection(formData, currentSection);
    
    if (Object.keys(sectionErrors).length === 0) {
      setCurrentSectionIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setErrors(prev => ({ ...prev, ...sectionErrors }));
      
      // Focus the first field with an error
      const firstErrorField = Object.keys(sectionErrors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.focus();
        }
      }
    }
  };

  // Handle direct navigation from progress bar
  const handleSectionClick = (index: number) => {
    // Only allow clicking on completed sections or the next available section
    if (index <= currentSectionIndex || index === currentSectionIndex + 1) {
      setCurrentSectionIndex(index);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.info("Complete the current section first");
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate all sections first
    let hasErrors = false;
    
    formSections.forEach(section => {
      const sectionErrors = validateSection(formData, section);
      if (Object.keys(sectionErrors).length > 0) {
        hasErrors = true;
      }
    });
    
    if (hasErrors) {
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
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {!isSubmitted && (
        <FormProgress
          sections={[...formSections, { id: "review", title: "Review", fields: [] }]}
          currentSectionIndex={currentSectionIndex}
          onSectionClick={handleSectionClick}
        />
      )}

      <div className="py-6">
        {isReviewStep ? (
          <SubmitSection
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isSubmitted={isSubmitted}
          />
        ) : (
          <FormSection
            section={formSections[currentSectionIndex]}
            formData={formData}
            onChange={handleChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirst={currentSectionIndex === 0}
            isLast={false}
            errors={errors}
            setErrors={setErrors}
          />
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;
