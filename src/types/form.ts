
export interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string | React.ReactNode;
  options?: string[];
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}
