
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SignupForm from "@/components/SignupForm";
import ContinuousFormSection from "@/components/ContinuousFormSection";
import FounderSection from "@/components/FounderSection";
import { formSections, validateAllSections, submitForm } from "@/utils/formUtils";

const Apply = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showSignup, setShowSignup] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({
    founders: JSON.stringify([{ name: "", email: "", linkedin: "" }])
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await submitForm(formData);
      if (success) {
        navigate("/founder");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user && !showSignup) {
    return (
      <div className="container max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Start Your Raise</h1>
        
        <div className="bg-muted/30 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Begin Your Funding Journey</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of founders who have successfully raised funding through our platform. Our application process is designed to understand your business and help us determine how we can best support your growth.
          </p>
          
          <Button 
            onClick={() => setShowSignup(true)} 
            variant="kaas" 
            className="w-full md:w-auto"
          >
            Create an Account to Apply
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  if (showSignup) {
    return (
      <div className="container max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Create Your Account</h1>
        <SignupForm 
          onComplete={() => navigate("/apply")} 
          onCancel={() => setShowSignup(false)} 
        />
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Start Your Raise</h1>
      
      <div className="bg-muted/30 p-6 rounded-lg mb-8">
        <p className="text-muted-foreground">
          Please complete all sections of the application below. You can save your progress at any time and return later to finish.
          Fields marked with an asterisk (*) are required.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-12">
        <FounderSection 
          founders={JSON.parse(formData.founders || '[]')}
          onChange={handleFoundersChange}
          errors={errors}
        />
        
        {formSections.map((section) => (
          <ContinuousFormSection
            key={section.id}
            section={section}
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        ))}
        
        <div className="py-6 bg-muted/10 px-6 rounded-lg">
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="kaas"
              className="w-full md:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting Application..." : "Submit Application"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Apply;
