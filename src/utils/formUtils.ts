import { FormSection } from "@/types/form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const formSections: FormSection[] = [
  {
    id: "company",
    title: "Company Information",
    description: "Tell us about your company and what you do.",
    fields: [
      {
        id: "companyName",
        label: "Company Name",
        type: "text",
        placeholder: "Enter your company name",
        required: true,
      },
      {
        id: "companyUrl",
        label: "Company URL",
        type: "url",
        placeholder: "https://www.example.com",
        helperText: "Enter your company's website URL.",
      },
      {
        id: "shortDescription",
        label: "Short Description",
        type: "textarea",
        placeholder: "A brief description of your company",
        required: true,
        helperText: "Keep it concise and to the point.",
      },
      {
        id: "tagline",
        label: "Tagline",
        type: "text",
        placeholder: "Your company's catchy tagline",
        helperText: "A memorable phrase that represents your company.",
      },
      {
        id: "category",
        label: "Category",
        type: "select",
        placeholder: "Select a category",
        options: ["SaaS", "Marketplace", "E-commerce", "Fintech", "Other"],
        helperText: "Select the category that best describes your company.",
      },
    ],
  },
  {
    id: "funding",
    title: "Funding Information",
    description: "Details about your funding needs and current status.",
    fields: [
      {
        id: "stage",
        label: "Stage",
        type: "select",
        placeholder: "Select your current stage",
        options: ["Pre-seed", "Seed", "Series A", "Series B", "Growth"],
        required: true,
        helperText: "Select the current stage of your company.",
      },
      {
        id: "fundingAmount",
        label: "Funding Amount",
        type: "number",
        placeholder: "Enter the amount you're seeking",
        required: true,
        helperText: "Specify the amount of funding you are looking to raise.",
      },
      {
        id: "fundingTarget",
        label: "Funding Target",
        type: "number",
        placeholder: "Enter your total funding target",
        required: true,
        helperText: "Specify the total funding target for this round.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    description: "How can we get in touch with you?",
    fields: [
      {
        id: "contactName",
        label: "Contact Name",
        type: "text",
        placeholder: "Enter your name",
        required: true,
        helperText: "Enter the name of the primary contact person.",
      },
      {
        id: "contactEmail",
        label: "Contact Email",
        type: "email",
        placeholder: "Enter your email",
        required: true,
        helperText: "Enter the email address for contact purposes.",
      },
      {
        id: "contactPhone",
        label: "Contact Phone",
        type: "text",
        placeholder: "Enter your phone number",
        helperText: "Enter the phone number for contact purposes.",
      },
    ],
  },
  {
    id: "terms",
    title: "Terms and Conditions",
    description: "Please agree to our terms and conditions to proceed.",
    fields: [
      {
        id: "termsAgreement",
        label: "I agree to the terms and conditions",
        type: "radio",
        options: ["Yes", "No"],
        required: true,
        helperText: "You must agree to the terms and conditions to proceed.",
      },
    ],
  },
];

export const validateField = (formData: Record<string, string>, fieldId: string, required: boolean): string | undefined => {
  const value = formData[fieldId];

  if (required && !value) {
    return "This field is required";
  }

  // Additional validation logic based on field type can be added here
  if (fieldId === "contactEmail" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Invalid email format";
  }

  if (fieldId === "companyUrl" && value && !/^(ftp|http|https):\/\/[^ "]+$/.test(value)) {
    return "Invalid URL format";
  }

  return undefined;
};

export const validateSection = (formData: Record<string, string>, section: FormSection): Record<string, string> => {
  const errors: Record<string, string> = {};

  section.fields.forEach(field => {
    const error = validateField(formData, field.id, field.required || false);
    if (error) {
      errors[field.id] = error;
    }
  });

  return errors;
};

export const validateAllSections = (formData: Record<string, string>): Record<string, string> => {
  let allErrors: Record<string, string> = {};

  formSections.forEach(section => {
    const sectionErrors = validateSection(formData, section);
    allErrors = { ...allErrors, ...sectionErrors };
  });

  // Validate founders
  try {
    const founders = JSON.parse(formData.founders || '[]');
    founders.forEach((founder: any, index: number) => {
      if (!founder.name) {
        allErrors[`founder_${index}_name`] = "Founder name is required";
      }
      if (!founder.email) {
        allErrors[`founder_${index}_email`] = "Founder email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(founder.email)) {
        allErrors[`founder_${index}_email`] = "Invalid email format";
      }
    });
  } catch (error) {
    console.error("Error parsing founders:", error);
    allErrors.founders = "Invalid founders data";
  }

  return allErrors;
};

export const submitForm = async (formData: Record<string, string>): Promise<boolean> => {
  try {
    // Attempt to save to Supabase (this will be handled in the Apply component directly)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return success (in a real implementation, this would check the API response)
    return true;
  } catch (error) {
    console.error("Error submitting form:", error);
    return false;
  }
};
