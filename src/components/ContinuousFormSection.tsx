
import React, { useState } from "react";
import FormInput from "./FormInput";
import { FormSection } from "@/types/form";
import SuccessHighlight from "./SuccessHighlight";
import { Button } from "@/components/ui/button";
import { Loader2, Globe, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface ContinuousFormSectionProps {
  section: FormSection;
  formData: Record<string, string>;
  onChange: (id: string, value: string) => void;
  errors: Record<string, string>;
  successHighlight?: string;
}

const ContinuousFormSection: React.FC<ContinuousFormSectionProps> = ({
  section,
  formData,
  onChange,
  errors,
  successHighlight,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const extractDomainData = async () => {
    const domain = formData.companyUrl;
    
    if (!domain || !domain.includes('.')) {
      toast.error("Please enter a valid company URL");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // For now we'll simulate data extraction
      // In a real implementation, you would call an edge function
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      // Example simulated data
      const companyData = {
        companyName: "Acme Technologies",
        shortDescription: "AI-powered property management platform",
        tagline: "Simplifying property management with AI",
        category: "SaaS",
      };
      
      // Update form data with company information
      onChange("companyName", companyData.companyName);
      onChange("shortDescription", companyData.shortDescription);
      onChange("tagline", companyData.tagline);
      onChange("category", companyData.category);
      
      toast.success("Company data extracted successfully!");
    } catch (error) {
      console.error("Error extracting company data:", error);
      toast.error("Failed to extract company data");
    } finally {
      setIsLoading(false);
    }
  };

  // Determine if this is the company section where we want to add the domain extraction feature
  const isCompanySection = section.id === "company";

  return (
    <div className="section bg-gradient-to-br from-white to-kaas-pink/5 p-6 rounded-lg border border-kaas-pink/10 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{section.title}</h2>
        {section.description && (
          <p className="text-muted-foreground">{section.description}</p>
        )}
      </div>

      {successHighlight && (
        <SuccessHighlight>{successHighlight}</SuccessHighlight>
      )}

      <div className="space-y-6">
        {section.fields.map((field) => {
          // Special handling for company URL field to add the extraction button
          if (isCompanySection && field.id === "companyUrl") {
            return (
              <div key={field.id} className="space-y-2">
                <FormInput
                  id={field.id}
                  label={field.label}
                  type={field.type}
                  value={formData[field.id] || ""}
                  onChange={(value) => onChange(field.id, value)}
                  placeholder={field.placeholder}
                  helperText={
                    <>
                      {field.helperText}
                      <div className="mt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={!formData[field.id] || isLoading}
                          onClick={extractDomainData}
                          className="text-sm"
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Globe className="h-4 w-4 mr-2" />
                          )}
                          {isLoading ? 'Extracting data...' : 'Extract Company Info'}
                          {!isLoading && <ArrowRight className="h-4 w-4 ml-2" />}
                        </Button>
                      </div>
                    </>
                  }
                  error={errors[field.id]}
                  required={field.required}
                  options={field.options}
                />
              </div>
            );
          }

          // Default handling for all other fields
          return (
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
          );
        })}
      </div>
    </div>
  );
};

export default ContinuousFormSection;
