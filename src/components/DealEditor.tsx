
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Deal, useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface DealEditorProps {
  dealId: string | null;
  isOpen: boolean;
  onClose: () => void;
  isCreate?: boolean;
}

const DealEditor: React.FC<DealEditorProps> = ({ dealId, isOpen, onClose, isCreate = false }) => {
  const { getDeal, updateDeal, createDeal } = useAuth();
  const [formData, setFormData] = useState<Partial<Deal>>({
    companyName: "",
    logo: "/placeholder.svg",
    shortDescription: "",
    minInvestment: 500,
    noteDiscount: 30,
    industry: [],
    raised: 0,
    target: 0,
    isActive: true
  });
  const [industryInput, setIndustryInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dealId && !isCreate) {
      const deal = getDeal(dealId);
      if (deal) {
        setFormData({
          companyName: deal.companyName,
          logo: deal.logo,
          shortDescription: deal.shortDescription,
          minInvestment: deal.minInvestment,
          noteDiscount: deal.noteDiscount,
          industry: [...deal.industry],
          raised: deal.raised,
          target: deal.target,
          isActive: deal.isActive
        });
      }
    } else {
      // Reset form for create mode
      setFormData({
        companyName: "",
        logo: "/placeholder.svg",
        shortDescription: "",
        minInvestment: 500,
        noteDiscount: 30,
        industry: [],
        raised: 0,
        target: 0,
        isActive: true
      });
    }
    setIndustryInput("");
  }, [dealId, isCreate, isOpen, getDeal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "number") {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddIndustry = () => {
    if (industryInput.trim() && !formData.industry?.includes(industryInput.trim())) {
      setFormData(prev => ({
        ...prev,
        industry: [...(prev.industry || []), industryInput.trim()]
      }));
      setIndustryInput("");
    }
  };

  const handleRemoveIndustry = (industry: string) => {
    setFormData(prev => ({
      ...prev,
      industry: prev.industry?.filter(i => i !== industry) || []
    }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.companyName || !formData.shortDescription) {
      toast.error("Please fill out all required fields");
      return;
    }

    setLoading(true);

    try {
      if (isCreate) {
        // Create new deal
        const newDealId = await createDeal(formData as Omit<Deal, "id" | "createdAt">);
        if (newDealId) {
          onClose();
        }
      } else if (dealId) {
        // Update existing deal
        const success = await updateDeal(dealId, formData);
        if (success) {
          onClose();
        }
      }
    } catch (error) {
      console.error("Error saving deal:", error);
      toast.error("Failed to save deal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{isCreate ? "Start Your Raise" : "Edit Deal"}</DialogTitle>
          <DialogDescription>
            {isCreate 
              ? "Enter the details for the new deal." 
              : "Update the deal information."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <Input 
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company name"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="logo">Logo URL</Label>
            <Input 
              id="logo"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              placeholder="URL to company logo"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="shortDescription">Short Description *</Label>
            <Input 
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Brief company description"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="minInvestment">Minimum Investment (€) *</Label>
              <Input 
                id="minInvestment"
                name="minInvestment"
                type="number"
                value={formData.minInvestment}
                onChange={handleChange}
                placeholder="500"
                min="500"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="noteDiscount">Note Discount (%) *</Label>
              <Input 
                id="noteDiscount"
                name="noteDiscount"
                type="number"
                value={formData.noteDiscount}
                onChange={handleChange}
                placeholder="30"
                min="0"
                max="100"
                required
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="industry">Industry Tags</Label>
            <div className="flex gap-2">
              <Input 
                id="industry"
                value={industryInput}
                onChange={(e) => setIndustryInput(e.target.value)}
                placeholder="Add industry tag"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddIndustry())}
              />
              <Button type="button" onClick={handleAddIndustry} variant="secondary">Add</Button>
            </div>
            
            {formData.industry && formData.industry.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.industry.map((tag) => (
                  <div 
                    key={tag} 
                    className="bg-slate-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button 
                      type="button" 
                      className="text-slate-400 hover:text-slate-600"
                      onClick={() => handleRemoveIndustry(tag)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="raised">Amount Raised (€) *</Label>
              <Input 
                id="raised"
                name="raised"
                type="number"
                value={formData.raised}
                onChange={handleChange}
                placeholder="0"
                min="0"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="target">Target Amount (€) *</Label>
              <Input 
                id="target"
                name="target"
                type="number"
                value={formData.target}
                onChange={handleChange}
                placeholder="100000"
                min="1"
                required
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="isActive" className="text-sm font-medium">Active Deal</Label>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button 
            variant="admin" 
            onClick={handleSubmit} 
            disabled={loading}
          >
            {loading ? "Saving..." : isCreate ? "Start Your Raise" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DealEditor;
