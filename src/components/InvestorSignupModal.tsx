
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ChevronRight, User, Briefcase, Building, Landmark, Globe } from "lucide-react";

interface InvestorSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealName: string;
  onComplete: (dealName: string) => void;
}

const InvestorSignupModal = ({
  isOpen,
  onClose,
  dealName,
  onComplete
}: InvestorSignupModalProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    profession: "",
    company: "",
    investmentExperience: "",
    investmentInterests: "",
    linkedinProfile: "",
    referralSource: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const isStepComplete = () => {
    if (step === 1) {
      return formData.fullName && formData.email;
    } else if (step === 2) {
      return formData.profession && formData.company;
    } else if (step === 3) {
      return formData.investmentExperience && formData.investmentInterests;
    }
    return true;
  };
  
  const handleNextStep = () => {
    if (!isStepComplete()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handleSubmit = () => {
    // In a real application, this would send the data to a server
    
    // Store investor data in localStorage for persistence
    localStorage.setItem("kaasInvestorProfile", JSON.stringify(formData));
    
    toast.success("Investor profile created successfully!");
    onComplete(dealName);
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="h-4 w-4 text-kaas-pink" />
                Full Name *
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-kaas-pink" />
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profession" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-kaas-pink" />
                Profession/Role *
              </Label>
              <Input
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                placeholder="e.g. Product Manager, Entrepreneur, etc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center gap-2">
                <Building className="h-4 w-4 text-kaas-pink" />
                Company/Organization *
              </Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your current company or organization"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedinProfile" className="flex items-center gap-2">
                LinkedIn Profile (optional)
              </Label>
              <Input
                id="linkedinProfile"
                name="linkedinProfile"
                value={formData.linkedinProfile}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="investmentExperience" className="flex items-center gap-2">
                <Landmark className="h-4 w-4 text-kaas-pink" />
                Investment Experience *
              </Label>
              <Input
                id="investmentExperience"
                name="investmentExperience"
                value={formData.investmentExperience}
                onChange={handleChange}
                placeholder="e.g. Angel investor, First-time investor, etc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="investmentInterests" className="flex items-center gap-2">
                Industries of Interest *
              </Label>
              <Input
                id="investmentInterests"
                name="investmentInterests"
                value={formData.investmentInterests}
                onChange={handleChange}
                placeholder="e.g. FinTech, HealthTech, AI, Climate, etc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="referralSource" className="flex items-center gap-2">
                How did you hear about us? (optional)
              </Label>
              <Input
                id="referralSource"
                name="referralSource"
                value={formData.referralSource}
                onChange={handleChange}
                placeholder="e.g. Social media, Friend, Event, etc."
              />
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
              <h3 className="font-medium text-sm mb-3">Your Investor Profile Summary</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-slate-500">Name:</span>
                  <span className="font-medium">{formData.fullName}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-medium">{formData.email}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">Profession:</span>
                  <span className="font-medium">{formData.profession}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">Company:</span>
                  <span className="font-medium">{formData.company}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">Experience:</span>
                  <span className="font-medium">{formData.investmentExperience}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">Interests:</span>
                  <span className="font-medium">{formData.investmentInterests}</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md text-xs text-blue-700 border border-blue-100">
              <p>By creating your investor profile, you're joining our community of investors. Founders will be able to see your profile when you express interest in their ventures.</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step < 4 ? `Investor Profile (${step}/4)` : "Confirm Your Profile"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-4">
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-kaas-pink transition-all duration-300 ease-in-out" 
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {renderStepContent()}
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 mt-4">
          {step > 1 ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setStep(step - 1)}
              className="sm:w-auto w-full"
            >
              Back
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onClose}
              className="sm:w-auto w-full"
            >
              Cancel
            </Button>
          )}
          
          <Button 
            variant="kaas" 
            size="sm" 
            onClick={handleNextStep}
            disabled={!isStepComplete()}
            className="flex items-center gap-1 sm:w-auto w-full"
          >
            {step === 4 ? "Complete Profile" : "Continue"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvestorSignupModal;
