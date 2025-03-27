
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface Founder {
  name: string;
  email: string;
  linkedin: string;
}

interface FounderSectionProps {
  founders: Founder[];
  onChange: (founders: Founder[]) => void;
  errors: Record<string, string>;
}

const FounderSection: React.FC<FounderSectionProps> = ({ 
  founders, 
  onChange, 
  errors 
}) => {
  const addFounder = () => {
    onChange([...founders, { name: "", email: "", linkedin: "" }]);
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

  return (
    <div className="section bg-muted/10 p-6 rounded-lg">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Founding Team</h2>
        <p className="text-muted-foreground">
          Tell us about the founding team. Add each founder below.
        </p>
      </div>

      <div className="space-y-8">
        {founders.map((founder, index) => (
          <div key={index} className="p-5 bg-background border border-border/40 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Founder {index + 1}</h3>
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
                <Label htmlFor={`founder-${index}-name`}>
                  Full Name
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id={`founder-${index}-name`}
                  value={founder.name}
                  onChange={(e) => updateFounder(index, "name", e.target.value)}
                  placeholder="John Doe"
                />
                {errors[`founder_${index}_name`] && (
                  <p className="text-sm text-red-500">{errors[`founder_${index}_name`]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`founder-${index}-email`}>
                  Email Address
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id={`founder-${index}-email`}
                  type="email"
                  value={founder.email}
                  onChange={(e) => updateFounder(index, "email", e.target.value)}
                  placeholder="founder@example.com"
                />
                {errors[`founder_${index}_email`] && (
                  <p className="text-sm text-red-500">{errors[`founder_${index}_email`]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`founder-${index}-linkedin`}>
                  LinkedIn URL
                </Label>
                <Input
                  id={`founder-${index}-linkedin`}
                  value={founder.linkedin}
                  onChange={(e) => updateFounder(index, "linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/username"
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
          variant="outline"
          className="mt-4"
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
