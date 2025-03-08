
import { toast } from "sonner";

export interface FormField {
  id: string;
  label: string;
  type: "text" | "textarea" | "email" | "number" | "url";
  placeholder?: string;
  required?: boolean;
  helperText?: string;
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

// Sample form structure - we'll replace this with actual questions when provided
export const formSections: FormSection[] = [
  {
    id: "company",
    title: "Company Information",
    description: "Tell us about your company and what you're building.",
    fields: [
      {
        id: "companyName",
        label: "Company name",
        type: "text",
        placeholder: "Your company name",
        required: true,
      },
      {
        id: "companyUrl",
        label: "Company URL",
        type: "url",
        placeholder: "https://",
        required: false,
      },
      {
        id: "companyDescription",
        label: "What does your company do?",
        type: "textarea",
        placeholder: "Describe your company in a few sentences...",
        required: true,
        helperText: "Provide a clear and concise description of your company's core product or service.",
      },
    ],
  },
  {
    id: "founders",
    title: "Founders",
    description: "Tell us about the founding team.",
    fields: [
      {
        id: "founderNames",
        label: "Founder names",
        type: "text",
        placeholder: "Names of all founders, separated by commas",
        required: true,
      },
      {
        id: "founderRoles",
        label: "Who are the technical founders?",
        type: "text",
        placeholder: "Names of technical founders, if any",
        required: false,
      },
      {
        id: "foundingStory",
        label: "How did the founding team meet?",
        type: "textarea",
        placeholder: "Tell us your founding story...",
        required: true,
      },
    ],
  },
  {
    id: "traction",
    title: "Traction & Metrics",
    description: "Tell us about your company's progress and key metrics.",
    fields: [
      {
        id: "userBase",
        label: "How many users do you have?",
        type: "number",
        placeholder: "Number of users",
        required: false,
      },
      {
        id: "revenue",
        label: "What is your current monthly revenue?",
        type: "text",
        placeholder: "$0 / month",
        required: false,
      },
      {
        id: "growth",
        label: "What is your month-over-month growth rate?",
        type: "text",
        placeholder: "e.g., 15% monthly growth",
        required: false,
      },
      {
        id: "keyMetrics",
        label: "What are your key metrics and how have they evolved?",
        type: "textarea",
        placeholder: "Describe your key performance indicators...",
        required: true,
      },
    ],
  },
  {
    id: "market",
    title: "Market & Competition",
    description: "Tell us about your market opportunity and competitive landscape.",
    fields: [
      {
        id: "marketSize",
        label: "What is your market size?",
        type: "textarea",
        placeholder: "Describe your total addressable market...",
        required: true,
      },
      {
        id: "competitors",
        label: "Who are your competitors and how are you different?",
        type: "textarea",
        placeholder: "List main competitors and your unique advantages...",
        required: true,
      },
    ],
  },
  {
    id: "fundraising",
    title: "Fundraising",
    description: "Tell us about your fundraising plans and history.",
    fields: [
      {
        id: "amountRaising",
        label: "How much are you raising?",
        type: "text",
        placeholder: "$",
        required: true,
      },
      {
        id: "previousFunding",
        label: "Have you raised funding previously? If so, how much and from whom?",
        type: "textarea",
        placeholder: "Details about previous fundraising rounds...",
        required: false,
      },
      {
        id: "useOfFunds",
        label: "How will you use the funds?",
        type: "textarea",
        placeholder: "Describe your plans for using the investment...",
        required: true,
      },
    ],
  },
];

export const validateField = (value: string, field: FormField): string | null => {
  if (field.required && (!value || value.trim() === '')) {
    return `${field.label} is required`;
  }
  
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
  }
  
  if (field.type === 'url' && value) {
    try {
      new URL(value);
    } catch (error) {
      return 'Please enter a valid URL';
    }
  }
  
  return null;
};

export const validateSection = (formData: Record<string, string>, section: FormSection): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  section.fields.forEach(field => {
    const value = formData[field.id] || '';
    const error = validateField(value, field);
    if (error) {
      errors[field.id] = error;
    }
  });
  
  return errors;
};

export const submitForm = async (formData: Record<string, string>): Promise<boolean> => {
  try {
    // This would normally be an API call to your backend
    // For now, we'll just simulate a successful submission
    console.log('Form data submitted:', formData);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    toast.success("Application submitted successfully", {
      description: "We've received your application and will be in touch soon.",
    });
    
    return true;
  } catch (error) {
    console.error('Error submitting form:', error);
    
    toast.error("Failed to submit application", {
      description: "Please try again later or contact support.",
    });
    
    return false;
  }
};
