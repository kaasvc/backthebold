
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Check, Loader2, Linkedin } from "lucide-react";
import SuccessHighlight from "./SuccessHighlight";
import { toast } from "sonner";

interface Founder {
  name: string;
  email: string;
  linkedin: string;
  bio?: string;
  title?: string;
  skills?: string;
}

interface FounderSectionProps {
  founders: Founder[];
  onChange: (founders: Founder[]) => void;
  errors: Record<string, string>;
  successHighlight?: string;
}

const FounderSection: React.FC<FounderSectionProps> = ({ 
  founders, 
  onChange, 
  errors,
  successHighlight
}) => {
  const [isLoading, setIsLoading] = useState<Record<number, boolean>>({});

  const addFounder = () => {
    onChange([...founders, { name: "", email: "", linkedin: "", bio: "", title: "", skills: "" }]);
  };

  const removeFounder = (index: number) => {
    const newFounders = [...founders];
    newFounders.splice(index, 1);
    onChange(newFounders);
  };

  const updateFounder = (index: number, field: keyof Founder, value: string) => {
    const newFounders = [...founders];
    newFounders[index] = { ...newFounders[index], [field]: value };
    onChange(newFounders);
  };

  const extractLinkedInData = async (index: number) => {
    const linkedinUrl = founders[index].linkedin;
    
    if (!linkedinUrl || !linkedinUrl.includes('linkedin.com')) {
      toast.error("Please enter a valid LinkedIn URL");
      return;
    }
    
    setIsLoading(prev => ({ ...prev, [index]: true }));
    
    try {
      // For now we'll simulate data extraction
      // In a real implementation, you would call an edge function
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Example simulated data
      const fakeData = {
        name: founders[index].name || "John Smith",
        title: "CEO & Co-Founder",
        bio: "Experienced entrepreneur with a background in technology and finance. Passionate about building innovative solutions to complex problems.",
        skills: "Product Management, Entrepreneurship, Fundraising, Strategy"
      };
      
      // Update founder
      const newFounders = [...founders];
      newFounders[index] = { 
        ...newFounders[index], 
        name: fakeData.name || newFounders[index].name,
        title: fakeData.title,
        bio: fakeData.bio,
        skills: fakeData.skills
      };
      
      onChange(newFounders);
      toast.success("LinkedIn data extracted successfully!");
    } catch (error) {
      console.error("Error extracting LinkedIn data:", error);
      toast.error("Failed to extract LinkedIn data");
    } finally {
      setIsLoading(prev => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className="section bg-gradient-to-br from-white to-kaas-pink/5 p-6 rounded-lg border border-kaas-pink/10 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Founding Team</h2>
        <p className="text-muted-foreground">
          Tell us about the founding team. Add each founder below.
        </p>
      </div>

      {successHighlight && (
        <SuccessHighlight>{successHighlight}</SuccessHighlight>
      )}

      <div className="space-y-8">
        {founders.map((founder, index) => (
          <div key={index} className="p-5 bg-background border border-kaas-pink/20 rounded-lg shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-kaas-darkpink">Founder {index + 1}</h3>
              {founders.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFounder(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`founder-${index}-name`} className="text-gray-700">
                  Full Name
                  <span className="text-kaas-pink ml-1">*</span>
                </Label>
                <Input
                  id={`founder-${index}-name`}
                  value={founder.name}
                  onChange={(e) => updateFounder(index, "name", e.target.value)}
                  placeholder="John Doe"
                  className="border-gray-300 focus-visible:ring-kaas-pink"
                />
                {errors[`founder_${index}_name`] && (
                  <p className="text-sm text-red-500">{errors[`founder_${index}_name`]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`founder-${index}-email`} className="text-gray-700">
                  Email Address
                  <span className="text-kaas-pink ml-1">*</span>
                </Label>
                <Input
                  id={`founder-${index}-email`}
                  type="email"
                  value={founder.email}
                  onChange={(e) => updateFounder(index, "email", e.target.value)}
                  placeholder="founder@example.com"
                  className="border-gray-300 focus-visible:ring-kaas-pink"
                />
                {errors[`founder_${index}_email`] && (
                  <p className="text-sm text-red-500">{errors[`founder_${index}_email`]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`founder-${index}-title`} className="text-gray-700">
                  Job Title
                </Label>
                <Input
                  id={`founder-${index}-title`}
                  value={founder.title || ""}
                  onChange={(e) => updateFounder(index, "title", e.target.value)}
                  placeholder="CEO, CTO, etc."
                  className="border-gray-300 focus-visible:ring-kaas-pink"
                />
              </div>

              <div className="space-y-2">
                <Label 
                  htmlFor={`founder-${index}-linkedin`} 
                  className="flex items-center justify-between text-gray-700"
                >
                  <span>LinkedIn URL</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={!founder.linkedin || isLoading[index]}
                    onClick={() => extractLinkedInData(index)}
                    className="text-xs"
                  >
                    {isLoading[index] ? (
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    ) : (
                      <Linkedin className="h-3 w-3 mr-1" />
                    )}
                    {isLoading[index] ? 'Loading...' : 'Import Profile'}
                  </Button>
                </Label>
                <Input
                  id={`founder-${index}-linkedin`}
                  value={founder.linkedin}
                  onChange={(e) => updateFounder(index, "linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="border-gray-300 focus-visible:ring-kaas-pink"
                />
                {errors[`founder_${index}_linkedin`] && (
                  <p className="text-sm text-red-500">{errors[`founder_${index}_linkedin`]}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Add your LinkedIn URL to automatically import your profile information
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`founder-${index}-bio`} className="text-gray-700">
                  Short Bio
                </Label>
                <textarea
                  id={`founder-${index}-bio`}
                  value={founder.bio || ""}
                  onChange={(e) => updateFounder(index, "bio", e.target.value)}
                  placeholder="Brief professional background and expertise..."
                  className="w-full min-h-[100px] border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-kaas-pink"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`founder-${index}-skills`} className="text-gray-700">
                  Key Skills
                </Label>
                <Input
                  id={`founder-${index}-skills`}
                  value={founder.skills || ""}
                  onChange={(e) => updateFounder(index, "skills", e.target.value)}
                  placeholder="Product Management, Engineering, Marketing, etc."
                  className="border-gray-300 focus-visible:ring-kaas-pink"
                />
                <p className="text-xs text-muted-foreground">
                  Comma-separated list of key skills and areas of expertise
                </p>
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="mt-4 border-kaas-pink/50 text-kaas-darkpink hover:bg-kaas-pink/10"
          onClick={addFounder}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Founder
        </Button>
      </div>
    </div>
  );
};

export default FounderSection;
