import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Deal, useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import SuccessHighlight from "./SuccessHighlight";

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
    description: "",
    minInvestment: 500,
    noteDiscount: 30,
    industry: [],
    raised: 0,
    target: 0,
    isActive: true,
    stage: "Seed",
    categories: [],
    investmentType: "Convertible Loan Agreement",
    backers: 0,
    comments: 0,
    valuation: 0,
    number: 0
  });
  const [industryInput, setIndustryInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [successHighlight, setSuccessHighlight] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dealId && !isCreate) {
      const deal = getDeal(dealId);
      if (deal) {
        setFormData({
          companyName: deal.companyName,
          logo: deal.logo,
          shortDescription: deal.shortDescription,
          description: deal.description || "",
          minInvestment: deal.minInvestment,
          noteDiscount: deal.noteDiscount,
          industry: [...deal.industry],
          raised: deal.raised,
          target: deal.target,
          isActive: deal.isActive,
          stage: deal.stage || "Seed",
          categories: deal.categories || [],
          investmentType: deal.investmentType || "Convertible Loan Agreement",
          backers: deal.backers || 0,
          comments: deal.comments || 0,
          valuation: deal.valuation || 0,
          number: deal.number || 0,
          successHighlight: deal.successHighlight || ""
        });
        setSuccessHighlight(deal.successHighlight || "");
      }
    } else {
      setFormData({
        companyName: "",
        logo: "/placeholder.svg",
        shortDescription: "",
        description: "",
        minInvestment: 500,
        noteDiscount: 30,
        industry: [],
        raised: 0,
        target: 0,
        isActive: true,
        stage: "Seed",
        categories: [],
        investmentType: "Convertible Loan Agreement",
        backers: 0,
        comments: 0,
        valuation: 0,
        number: 0
      });
      setSuccessHighlight("");
    }
    setIndustryInput("");
    setCategoryInput("");
  }, [dealId, isCreate, isOpen, getDeal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  const handleAddCategory = () => {
    if (categoryInput.trim() && !formData.categories?.includes(categoryInput.trim())) {
      setFormData(prev => ({
        ...prev,
        categories: [...(prev.categories || []), categoryInput.trim()]
      }));
      setCategoryInput("");
    }
  };

  const handleRemoveCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories?.filter(c => c !== category) || []
    }));
  };

  const handleSubmit = async () => {
    if (!formData.companyName || !formData.shortDescription) {
      toast.error("Please fill out all required fields");
      return;
    }

    setLoading(true);

    try {
      const fullFormData = {
        ...formData,
        successHighlight: successHighlight
      };
      
      if (isCreate) {
        const newDealId = await createDeal(fullFormData as Omit<Deal, "id" | "createdAt">);
        if (newDealId) {
          onClose();
        }
      } else if (dealId) {
        const success = await updateDeal(dealId, fullFormData);
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

  const investmentTypes = ["Direct Equity", "Convertible Loan Agreement"];
  
  const stages = ["Pre-seed", "Seed", "Series A", "Series B", "Growth", "Angel"];

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
          
          <div className="grid gap-2">
            <Label htmlFor="description">Full Description</Label>
            <Textarea 
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed company description"
              rows={3}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="successHighlight">Success Highlight</Label>
            <Textarea 
              id="successHighlight"
              value={successHighlight}
              onChange={(e) => setSuccessHighlight(e.target.value)}
              placeholder="What's the most impressive thing already working?"
              rows={3}
            />
            {successHighlight && (
              <div className="mt-2">
                <Label className="text-xs text-muted-foreground mb-1">Preview:</Label>
                <SuccessHighlight>{successHighlight}</SuccessHighlight>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="stage">Stage *</Label>
              <Select 
                value={formData.stage || "Seed"} 
                onValueChange={(value) => handleSelectChange("stage", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map(stage => (
                    <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="investmentType">Investment Type *</Label>
              <Select 
                value={formData.investmentType || "Convertible Loan Agreement"} 
                onValueChange={(value) => handleSelectChange("investmentType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {investmentTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
            <Label htmlFor="categories">Business Categories</Label>
            <div className="flex gap-2">
              <Input 
                id="categories"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                placeholder="Add business category"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCategory())}
              />
              <Button type="button" onClick={handleAddCategory} variant="secondary">Add</Button>
            </div>
            
            {formData.categories && formData.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.categories.map((category) => (
                  <div 
                    key={category} 
                    className="bg-slate-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {category}
                    <button 
                      type="button" 
                      className="text-slate-400 hover:text-slate-600"
                      onClick={() => handleRemoveCategory(category)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
                      <X className="h-3 w-3" />
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
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="backers">Backers Count</Label>
              <Input 
                id="backers"
                name="backers"
                type="number"
                value={formData.backers}
                onChange={handleChange}
                placeholder="0"
                min="0"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="valuation">Valuation (€)</Label>
              <Input 
                id="valuation"
                name="valuation"
                type="number"
                value={formData.valuation}
                onChange={handleChange}
                placeholder="0"
                min="0"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="comments">Comments Count</Label>
              <Input 
                id="comments"
                name="comments"
                type="number"
                value={formData.comments}
                onChange={handleChange}
                placeholder="0"
                min="0"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="number">Display Order</Label>
              <Input 
                id="number"
                name="number"
                type="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="0"
                min="0"
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
