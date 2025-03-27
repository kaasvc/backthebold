
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SignupForm from "@/components/SignupForm";
import FormSection from "@/components/FormSection";
import { formSections, validateAllSections, submitForm } from "@/utils/formUtils";

const Apply = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showSignup, setShowSignup] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (currentSectionIndex < formSections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    const allErrors = validateAllSections(formData);
    
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
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
          onComplete={() => navigate("/apply/form")} 
          onCancel={() => setShowSignup(false)} 
        />
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Startup Application</h1>
      
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="bg-kaas-pink text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
            {currentSectionIndex + 1}
          </div>
          <h2 className="text-xl font-semibold">
            {formSections[currentSectionIndex].title}
          </h2>
        </div>
        
        <div className="w-full bg-muted/30 h-2 rounded-full mb-8">
          <div 
            className="bg-kaas-pink h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentSectionIndex + 1) / formSections.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <FormSection
        section={formSections[currentSectionIndex]}
        formData={formData}
        onChange={handleChange}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isFirst={currentSectionIndex === 0}
        isLast={currentSectionIndex === formSections.length - 1}
        errors={errors}
        setErrors={setErrors}
      />
    </div>
  );
};

export default Apply;
