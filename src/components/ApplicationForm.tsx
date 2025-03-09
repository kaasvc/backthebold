import React, { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { formSections, submitForm, validateAllSections } from "@/utils/formUtils";
import { Button } from "@/components/ui/button";
import FormInput from "./FormInput";
import { Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const ApplicationForm: React.FC = () => {
  const { user, submitApplication } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [founders, setFounders] = useState<Array<{ name: string; linkedin: string }>>([]);
  const [files, setFiles] = useState<Record<string, File | null>>({});

  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleFileChange = (id: string, file: File | null) => {
    setFiles(prev => ({ ...prev, [id]: file }));
    
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleAddFounder = () => {
    setFounders(prev => [...prev, { name: "", linkedin: "" }]);
    
    if (errors["founders"]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors["founders"];
        return newErrors;
      });
    }
  };

  const handleFounderChange = (index: number, field: "name" | "linkedin", value: string) => {
    const updatedFounders = [...founders];
    updatedFounders[index][field] = value;
    setFounders(updatedFounders);

    setFormData(prev => ({ ...prev, founders: JSON.stringify(updatedFounders) }));
    
    const errorKey = `founder_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const handleRemoveFounder = (index: number) => {
    const updatedFounders = founders.filter((_, i) => i !== index);
    setFounders(updatedFounders);
    
    setFormData(prev => ({ ...prev, founders: JSON.stringify(updatedFounders) }));
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`founder_${index}_name`];
      delete newErrors[`founder_${index}_linkedin`];
      return newErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const dataToSubmit = {
      ...formData,
      founders: JSON.stringify(founders)
    };
    
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        dataToSubmit[`${key}_filename`] = file.name;
      }
    });
    
    const validationErrors = validateAllSections(dataToSubmit);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      
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
      if (!user) {
        sessionStorage.setItem("pendingApplication", JSON.stringify(dataToSubmit));
        navigate("/register");
        return;
      }
      
      const applicationId = await submitApplication(dataToSubmit);
      
      if (applicationId) {
        setIsSubmitted(true);
        navigate(`/application/${applicationId}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderConditionalField = (parentId: string, parentValue: string, fieldId: string) => {
    const field = formSections
      .flatMap(section => section.fields)
      .find(field => field.id === fieldId);
    
    if (!field) return null;
    
    return formData[parentId] === parentValue ? (
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
        className="ml-6 mt-4 border-l-2 border-muted pl-4"
      />
    ) : null;
  };

  const renderChoiceField = (field: any) => {
    if (field.type === "radio" && field.options) {
      return (
        <div className="form-question w-full space-y-2" key={field.id}>
          <div className="flex items-baseline justify-between">
            <label className="text-sm font-medium leading-none">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {field.options.map((option: string) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`${field.id}-${option}`}
                  name={field.id}
                  value={option}
                  checked={formData[field.id] === option}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
          {errors[field.id] && (
            <p className="text-sm text-red-500">{errors[field.id]}</p>
          )}
        </div>
      );
    } else if (field.type === "select" && field.options) {
      return (
        <div className="form-question w-full space-y-2" key={field.id}>
          <div className="flex items-baseline justify-between">
            <label
              htmlFor={field.id}
              className="text-sm font-medium leading-none"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
          <select
            id={field.id}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className={`flex h-10 w-full rounded-md border ${
              errors[field.id] ? "border-red-500" : "border-input"
            } bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <option value="">Select an option</option>
            {field.options.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors[field.id] && (
            <p className="text-sm text-red-500">{errors[field.id]}</p>
          )}
        </div>
      );
    } else if (field.type === "file") {
      return (
        <div className="form-question w-full space-y-2" key={field.id}>
          <div className="flex items-baseline justify-between">
            <label
              htmlFor={field.id}
              className="text-sm font-medium leading-none"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
          <input
            id={field.id}
            type="file"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              handleFileChange(field.id, file);
            }}
            className={`flex w-full rounded-md border ${
              errors[field.id] ? "border-red-500" : "border-input"
            } bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 disabled:cursor-not-allowed disabled:opacity-50`}
          />
          {files[field.id] && (
            <p className="text-sm text-muted-foreground">
              Selected file: {files[field.id]?.name}
            </p>
          )}
          {errors[field.id] && (
            <p className="text-sm text-red-500">{errors[field.id]}</p>
          )}
        </div>
      );
    }
    return null;
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-3xl mx-auto text-center py-12">
        <div className="bg-green-50 text-green-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-3">Application Submitted!</h2>
          <p className="mb-4">
            Thank you for submitting your application to KaasX. Our team will review your information and get back to you soon.
          </p>
          <Button 
            variant="kaas" 
            onClick={() => navigate("/dashboard")}
            className="mt-4"
          >
            Go to Dashboard
          </Button>
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
              {section.id === "founders" && (
                <div className="mb-8">
                  <div className="flex items-baseline justify-between mb-4">
                    <label className="text-sm font-medium leading-none">
                      List all co-founders and their roles <span className="text-red-500">*</span>
                    </label>
                  </div>
                  
                  {founders.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-border rounded-md">
                      <p className="text-muted-foreground mb-4">No founders added yet</p>
                      <Button 
                        type="button" 
                        variant="kaas" 
                        onClick={handleAddFounder}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add Founder
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {founders.map((founder, index) => (
                        <div key={index} className="p-4 border border-border rounded-md">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-medium">Founder {index + 1}</h3>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveFounder(index)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="form-question w-full space-y-2">
                              <div className="flex items-baseline justify-between">
                                <label
                                  htmlFor={`founder-${index}-name`}
                                  className="text-sm font-medium leading-none"
                                >
                                  Name <span className="text-red-500">*</span>
                                </label>
                              </div>
                              <input
                                id={`founder-${index}-name`}
                                type="text"
                                value={founder.name}
                                onChange={(e) => handleFounderChange(index, "name", e.target.value)}
                                placeholder="Founder name"
                                className={`flex h-10 w-full rounded-md border ${
                                  errors[`founder_${index}_name`] ? "border-red-500" : "border-input"
                                } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 disabled:cursor-not-allowed disabled:opacity-50`}
                              />
                              {errors[`founder_${index}_name`] && (
                                <p className="text-sm text-red-500">{errors[`founder_${index}_name`]}</p>
                              )}
                            </div>

                            <div className="form-question w-full space-y-2">
                              <div className="flex items-baseline justify-between">
                                <label
                                  htmlFor={`founder-${index}-linkedin`}
                                  className="text-sm font-medium leading-none"
                                >
                                  LinkedIn URL
                                </label>
                              </div>
                              <input
                                id={`founder-${index}-linkedin`}
                                type="url"
                                value={founder.linkedin}
                                onChange={(e) => handleFounderChange(index, "linkedin", e.target.value)}
                                placeholder="https://linkedin.com/in/username"
                                className={`flex h-10 w-full rounded-md border ${
                                  errors[`founder_${index}_linkedin`] ? "border-red-500" : "border-input"
                                } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 disabled:cursor-not-allowed disabled:opacity-50`}
                              />
                              {errors[`founder_${index}_linkedin`] && (
                                <p className="text-sm text-red-500">{errors[`founder_${index}_linkedin`]}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        type="button" 
                        variant="kaas" 
                        onClick={handleAddFounder}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add Another Founder
                      </Button>
                      
                      {errors["founders"] && (
                        <p className="text-sm text-red-500 mt-2">{errors["founders"]}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {section.fields.map((field) => {
                if (field.type === "radio" || field.type === "select" || field.type === "file") {
                  return renderChoiceField(field);
                }
                
                if (
                  field.id === "previouslyWorkedDetails" ||
                  field.id === "locationChangeDetails" ||
                  field.id === "usersDetails" ||
                  field.id === "revenueDetails" ||
                  field.id === "acceleratorDetails" ||
                  field.id === "legalEntityDetails" ||
                  field.id === "investmentDetails" ||
                  field.id === "vcTimeline" ||
                  field.id === "longTermTrendOther"
                ) {
                  return null;
                }
                
                return (
                  <React.Fragment key={field.id}>
                    <FormInput
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
                    
                    {field.id === "previouslyWorked" && renderConditionalField("previouslyWorked", "Yes", "previouslyWorkedDetails")}
                    {field.id === "locationChange" && renderConditionalField("locationChange", "Yes", "locationChangeDetails")}
                    {field.id === "usersStatus" && renderConditionalField("usersStatus", "Yes", "usersDetails")}
                    {field.id === "revenueStatus" && renderConditionalField("revenueStatus", "Yes", "revenueDetails")}
                    {field.id === "acceleratorStatus" && renderConditionalField("acceleratorStatus", "Yes", "acceleratorDetails")}
                    {field.id === "legalEntity" && renderConditionalField("legalEntity", "Yes", "legalEntityDetails")}
                    {field.id === "investmentStatus" && renderConditionalField("investmentStatus", "Yes", "investmentDetails")}
                    {field.id === "vcPlans" && renderConditionalField("vcPlans", "Yes", "vcTimeline")}
                    {field.id === "longTermTrend" && renderConditionalField("longTermTrend", "Other", "longTermTrendOther")}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ))}
        
        <div className="py-6 flex justify-center">
          <Button
            type="submit"
            variant="kaas"
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
