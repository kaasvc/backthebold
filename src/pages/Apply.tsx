
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ContinuousFormSection from "@/components/ContinuousFormSection";
import FounderSection from "@/components/FounderSection";
import { formSections, validateAllSections, submitForm } from "@/utils/formUtils";
import { toast } from "sonner";

const Apply = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<Record<string, string>>({
    founders: JSON.stringify([{ name: "", email: "", linkedin: "", bio: "", title: "", skills: "" }])
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Clear error when field is changed
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleFoundersChange = (founders: any[]) => {
    setFormData(prev => ({ 
      ...prev, 
      founders: JSON.stringify(founders) 
    }));
    
    // Clear founder errors
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith('founder_')) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const allErrors = validateAllSections(formData);
    
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      
      // Scroll to the first error
      const firstErrorId = Object.keys(allErrors)[0];
      const errorElement = document.getElementById(firstErrorId);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
      
      toast.error("Please fix the errors in the form");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (user) {
        // If user is logged in, submit directly
        const success = await submitForm(formData);
        if (success) {
          navigate("/founder");
        }
      } else {
        // If not logged in, store application data and redirect to register
        sessionStorage.setItem("pendingApplication", JSON.stringify(formData));
        navigate("/register");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Start Your Raise</h1>
      
      <div className="bg-gradient-to-br from-white to-kaas-pink/10 rounded-lg p-6 mb-8 border border-kaas-pink/20 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Begin Your Funding Journey</h2>
        <p className="text-muted-foreground mb-6">
          Join thousands of founders who have successfully raised funding through our platform. Our application process is designed to understand your business and help us determine how we can best support your growth.
        </p>
        <div className="text-sm text-kaas-darkpink font-medium">
          <p>💡 <strong>Pro tip:</strong> Add your company URL and LinkedIn profiles to auto-fill information and save time!</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-12">
        <FounderSection 
          founders={JSON.parse(formData.founders || '[]')}
          onChange={handleFoundersChange}
          errors={errors}
        />
        
        {formSections.map((section, index) => (
          <ContinuousFormSection
            key={section.id}
            section={section}
            formData={formData}
            onChange={handleChange}
            errors={errors}
            successHighlight={index === 0 ? 
              "Their AI-powered maintenance prediction algorithm has shown 85% accuracy in early testing, helping landlords prevent costly repairs before they happen. The platform has already saved beta users an average of €2,200 per property in annual maintenance costs." : undefined}
          />
        ))}
        
        <div className="py-6 bg-gradient-to-br from-white to-kaas-pink/5 px-6 rounded-lg border border-kaas-pink/10 shadow-sm">
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="kaas"
              className="w-full md:w-auto shadow-md hover:shadow-lg transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting Application..." : user ? "Submit Application" : "Continue to Create Account"}
              {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Apply;
