
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ChevronRight, User, Briefcase, Building, Landmark, Globe, Sparkles, Trophy, Star, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    investmentExperience: [] as string[],
    investmentInterests: [] as string[],
    linkedinProfile: "",
    referralSource: ""
  });
  
  const investmentExperienceOptions = [
    "Angel Investments", 
    "Venture Capital", 
    "Private Equity", 
    "Real Estate", 
    "Hedge Funds", 
    "None"
  ];
  
  const industriesOptions = [
    "FinTech", 
    "HealthTech", 
    "AI", 
    "Climate", 
    "SaaS", 
    "Real Estate", 
    "Consumer Goods", 
    "Biotech"
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleExperienceToggle = (experience: string) => {
    setFormData(prev => {
      const currentExperience = prev.investmentExperience as string[];
      if (currentExperience.includes(experience)) {
        return { 
          ...prev, 
          investmentExperience: currentExperience.filter(item => item !== experience) 
        };
      } else {
        return { 
          ...prev, 
          investmentExperience: [...currentExperience, experience] 
        };
      }
    });
  };
  
  const handleIndustryToggle = (industry: string) => {
    setFormData(prev => {
      const currentInterests = prev.investmentInterests as string[];
      if (currentInterests.includes(industry)) {
        return { 
          ...prev, 
          investmentInterests: currentInterests.filter(item => item !== industry) 
        };
      } else {
        return { 
          ...prev, 
          investmentInterests: [...currentInterests, industry] 
        };
      }
    });
  };
  
  const isStepComplete = () => {
    if (step === 1) {
      return formData.fullName && formData.email;
    } else if (step === 2) {
      return formData.profession && formData.company;
    } else if (step === 3) {
      return (formData.investmentExperience as string[]).length > 0 && 
             (formData.investmentInterests as string[]).length > 0;
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
    localStorage.setItem("kaasInvestorProfile", JSON.stringify(formData));
    
    toast.success("Investor profile created successfully!");
    onComplete(dealName);
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="bg-purple-100 p-6 rounded-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-[#8B5CF6]" />
                <h3 className="font-semibold text-lg text-[#8B5CF6]">Join the KaasX Investor Community</h3>
              </div>
              <p className="text-sm text-gray-700">
                Get exclusive early access to promising startups and connect with visionary founders. Your profile helps founders understand your potential strategic value beyond capital.
              </p>
            </div>
            
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
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg mb-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-[#0EA5E9]" />
                <h3 className="font-semibold text-[#0EA5E9]">Your Expertise Matters</h3>
              </div>
              <p className="text-sm text-gray-700">
                Founders are looking for smart money. Your professional background could make you the perfect strategic investor for the right startup.
              </p>
            </div>
            
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
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-lg mb-4 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-[#F97316]" />
                <h3 className="font-semibold text-[#F97316]">Unlock Investment Opportunities</h3>
              </div>
              <p className="text-sm text-gray-700">
                Tell us your investment preferences to get matched with startups that align with your interests. This helps us personalize your deal flow.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2 mb-2">
                <Landmark className="h-4 w-4 text-kaas-pink" />
                Investment Experience * ({formData.investmentExperience.length} selected)
              </Label>
              <div className="flex flex-wrap gap-2">
                {investmentExperienceOptions.map((experience) => {
                  const isSelected = (formData.investmentExperience as string[]).includes(experience);
                  return (
                    <Badge
                      key={experience}
                      onClick={() => handleExperienceToggle(experience)}
                      className={`cursor-pointer px-3 py-1 border ${
                        isSelected 
                          ? "bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-white border-transparent" 
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {experience}
                    </Badge>
                  );
                })}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-kaas-pink" />
                Industries of Interest * ({(formData.investmentInterests as string[]).length} selected)
              </Label>
              <div className="flex flex-wrap gap-2">
                {industriesOptions.map((industry) => {
                  const isSelected = (formData.investmentInterests as string[]).includes(industry);
                  return (
                    <Badge
                      key={industry}
                      onClick={() => handleIndustryToggle(industry)}
                      className={`cursor-pointer px-3 py-1 border ${
                        isSelected 
                          ? "bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-white border-transparent" 
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {industry}
                    </Badge>
                  );
                })}
              </div>
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
            <div className="bg-gradient-to-r from-green-100 to-teal-100 p-4 rounded-lg mb-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-emerald-600" />
                <h3 className="font-semibold text-emerald-600">You're Almost There!</h3>
              </div>
              <p className="text-sm text-gray-700">
                Join our community of forward-thinking investors backing Europe's most innovative startups. Complete your profile to get started.
              </p>
            </div>
            
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
                <li className="flex flex-col">
                  <span className="text-slate-500">Experience:</span>
                  <span className="font-medium">{(formData.investmentExperience as string[]).join(", ")}</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-500">Interests:</span>
                  <span className="font-medium">{(formData.investmentInterests as string[]).join(", ")}</span>
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
          <DialogTitle className="text-center text-xl">
            {step === 1 ? (
              <div className="space-y-1">
                <p className="font-bold text-2xl">Sign up as Investor</p>
              </div>
            ) : (
              step < 4 ? (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#D946EF]" />
                  Become a KaasX Investor
                  <Sparkles className="h-5 w-5 text-[#D946EF]" />
                </span>
              ) : (
                "Confirm Your Profile"
              )
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-4">
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] transition-all duration-300 ease-in-out" 
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
            className="flex items-center gap-1 sm:w-auto w-full bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:from-[#7C3AED] hover:to-[#C026D3]"
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
