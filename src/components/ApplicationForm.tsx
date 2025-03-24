
import React, { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft, ArrowRight, Upload, Check, Clock, Zap, BrainCircuit, LineChart, CreditCard, Rocket } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const steps = [
  {
    id: "founder-basics",
    title: "Founder Basics: Who's Raising",
    description: "Who's Raising",
    icon: <Check className="h-5 w-5" />,
  },
  {
    id: "raise-overview",
    title: "Raise Overview",
    description: "Basic details about your raise",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    id: "bold-idea",
    title: "The Bold Idea",
    description: "Tell us about your vision",
    icon: <BrainCircuit className="h-5 w-5" />,
  },
  {
    id: "traction",
    title: "Traction & Vision",
    description: "Optional but powerful",
    icon: <LineChart className="h-5 w-5" />,
  },
  {
    id: "payment-legal",
    title: "Payments & Legal",
    description: "Setup your raise properly",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: "launch",
    title: "Launch Preview",
    description: "Ready to go!",
    icon: <Rocket className="h-5 w-5" />,
  },
];

const ApplicationForm: React.FC = () => {
  const { user, submitApplication } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const schema = z.object({
    // Step 1: Founder Basics
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    linkedin: z.string().optional(),
    country: z.string().min(2, "Please enter your country"),
    companyName: z.string().min(1, "Please enter your company or project name"),
    isRegistered: z.enum(["Yes", "No", "In progress"]),
    
    // Step 2: Raise Overview
    raiseAmount: z.enum(["€25K", "€50K", "€100K", "Custom"]),
    customRaiseAmount: z.string().optional(),
    minInvestment: z.enum(["€100", "€250", "€500", "Custom"]),
    customMinInvestment: z.string().optional(),
    raiseType: z.enum(["SAFE", "Equity", "Token", "Not sure (we help)"]),
    timeline: z.enum(["2 weeks", "4 weeks", "flexible"]),
    expectedBackers: z.enum(["Friends", "Fans", "Angels", "All of the above"]),
    
    // Step 3: The Bold Idea
    elevatorPitch: z.string().min(10, "Please provide a short pitch").max(200, "Keep it concise"),
    buildingWhat: z.string().min(20, "Please tell us more about what you're building"),
    targetUsers: z.string().min(5, "Please describe your target users"),
    unfairAdvantage: z.string().min(10, "Please share what makes you the right person"),
    fundUsage: z.string().min(10, "Please explain how you'll use the funds"),
    
    // Step 4: Traction & Vision (optional)
    hasProduct: z.enum(["Yes", "No"]).optional(),
    productLink: z.string().url("Please enter a valid URL").optional(),
    traction: z.string().optional(),
    longTermVision: z.string().optional(),
    
    // Step 5: Payments & Legal
    businessCountry: z.string().min(1, "Please specify your business country"),
    legalSetup: z.enum(["SAFE", "SPV", "Need help"]),
    paymentMethod: z.enum(["Stripe", "Wise"]),
    
    // Step 6: Final Setup
    raiseLink: z.string().min(3, "Please choose a unique link").regex(/^[a-z0-9-]+$/i, "Only letters, numbers, and hyphens allowed"),
    enableNotifications: z.boolean().default(true),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      // We'll only use defaultValues for fields in the current step
      fullName: "",
      email: "",
      linkedin: "",
      country: "",
      companyName: "",
      enableNotifications: true,
    },
  });

  const handleNext = async () => {
    const fields = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fields as any);
    
    if (isValid) {
      const currentValues = form.getValues();
      setFormData(prev => ({ ...prev, ...currentValues }));
      
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo(0, 0);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Fix: Convert boolean to string for enableNotifications
      const formValues = form.getValues();
      const allData = {
        ...formData,
        ...formValues,
        // Convert boolean to string to match expected type
        enableNotifications: formValues.enableNotifications ? "true" : "false",
        logoFilename: logoFile?.name || null,
      };
      
      if (!user) {
        sessionStorage.setItem("pendingApplication", JSON.stringify(allData));
        navigate("/register");
        return;
      }
      
      const applicationId = await submitApplication(allData);
      
      if (applicationId) {
        toast.success("Your raise has been created successfully!", {
          description: "You'll be redirected to your dashboard."
        });
        navigate(`/dashboard`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create your raise");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getFieldsForStep = (step: number): string[] => {
    switch (step) {
      case 0: // Founder Basics
        return ["fullName", "email", "linkedin", "country", "companyName", "isRegistered"];
      case 1: // Raise Overview
        return ["raiseAmount", "customRaiseAmount", "minInvestment", "customMinInvestment", "raiseType", "timeline", "expectedBackers"];
      case 2: // The Bold Idea
        return ["elevatorPitch", "buildingWhat", "targetUsers", "unfairAdvantage", "fundUsage"];
      case 3: // Traction & Vision
        return ["hasProduct", "productLink", "traction", "longTermVision"];
      case 4: // Payments & Legal
        return ["businessCountry", "legalSetup", "paymentMethod"];
      case 5: // Final Setup
        return ["raiseLink", "enableNotifications"];
      default:
        return [];
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderFounderBasics();
      case 1:
        return renderRaiseOverview();
      case 2:
        return renderBoldIdea();
      case 3:
        return renderTractionVision();
      case 4:
        return renderPaymentsLegal();
      case 5:
        return renderFinalSetup();
      default:
        return null;
    }
  };

  const renderFounderBasics = () => (
    <>
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Your name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Email address</FormLabel>
            <FormControl>
              <Input type="email" placeholder="your@email.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="linkedin"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>LinkedIn profile (optional)</FormLabel>
            <FormControl>
              <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Country of residence</FormLabel>
            <FormControl>
              <Input placeholder="Your country" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Company or project name</FormLabel>
            <FormControl>
              <Input placeholder="Your startup name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="isRegistered"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Is this a registered company?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Yes" />
                  </FormControl>
                  <FormLabel className="font-normal">Yes</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="No" />
                  </FormControl>
                  <FormLabel className="font-normal">No</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="In progress" />
                  </FormControl>
                  <FormLabel className="font-normal">In progress</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  const renderRaiseOverview = () => (
    <>
      <FormField
        control={form.control}
        name="raiseAmount"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>How much are you raising?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="€25K" />
                  </FormControl>
                  <FormLabel className="font-normal">€25K</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="€50K" />
                  </FormControl>
                  <FormLabel className="font-normal">€50K</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="€100K" />
                  </FormControl>
                  <FormLabel className="font-normal">€100K</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Custom" />
                  </FormControl>
                  <FormLabel className="font-normal">Custom</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {form.watch("raiseAmount") === "Custom" && (
        <FormField
          control={form.control}
          name="customRaiseAmount"
          render={({ field }) => (
            <FormItem className="mb-4 ml-6">
              <FormLabel>Specify custom amount</FormLabel>
              <FormControl>
                <Input placeholder="e.g. €75K" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      
      <FormField
        control={form.control}
        name="minInvestment"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>What's the minimum investment amount?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="€100" />
                  </FormControl>
                  <FormLabel className="font-normal">€100</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="€250" />
                  </FormControl>
                  <FormLabel className="font-normal">€250</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="€500" />
                  </FormControl>
                  <FormLabel className="font-normal">€500</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Custom" />
                  </FormControl>
                  <FormLabel className="font-normal">Custom</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {form.watch("minInvestment") === "Custom" && (
        <FormField
          control={form.control}
          name="customMinInvestment"
          render={({ field }) => (
            <FormItem className="mb-4 ml-6">
              <FormLabel>Specify custom minimum</FormLabel>
              <FormControl>
                <Input placeholder="e.g. €1000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      
      <FormField
        control={form.control}
        name="raiseType"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Type of raise</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="SAFE" />
                  </FormControl>
                  <FormLabel className="font-normal">SAFE</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Equity" />
                  </FormControl>
                  <FormLabel className="font-normal">Equity</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Token" />
                  </FormControl>
                  <FormLabel className="font-normal">Token</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Not sure (we help)" />
                  </FormControl>
                  <FormLabel className="font-normal">Not sure (we help)</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="timeline"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Timeline to raise (start to finish)</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="2 weeks" />
                  </FormControl>
                  <FormLabel className="font-normal">2 weeks</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="4 weeks" />
                  </FormControl>
                  <FormLabel className="font-normal">4 weeks</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="flexible" />
                  </FormControl>
                  <FormLabel className="font-normal">Flexible</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="expectedBackers"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Who do you expect to back you?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Friends" />
                  </FormControl>
                  <FormLabel className="font-normal">Friends</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Fans" />
                  </FormControl>
                  <FormLabel className="font-normal">Fans</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Angels" />
                  </FormControl>
                  <FormLabel className="font-normal">Angels</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="All of the above" />
                  </FormControl>
                  <FormLabel className="font-normal">All of the above</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  const renderBoldIdea = () => (
    <>
      <FormField
        control={form.control}
        name="elevatorPitch"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>What's the big idea? (1-2 sentence elevator pitch)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="A simple description of your startup in 1-2 sentences" 
                {...field} 
                className="min-h-[80px]" 
              />
            </FormControl>
            <FormDescription>
              Keep it concise - this will be the first thing investors see
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="buildingWhat"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>What are you building, and why now?</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your product/service and why the timing is right" 
                {...field} 
                className="min-h-[120px]" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="targetUsers"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Who is it for? (Target users/customers)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your target audience" 
                {...field} 
                className="min-h-[80px]" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="unfairAdvantage"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>What's your unfair advantage or story?</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="What makes YOU the right person to build this?" 
                {...field} 
                className="min-h-[120px]" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="fundUsage"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>How will you use the funds?</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="E.g., team, product, launch, marketing" 
                {...field} 
                className="min-h-[120px]" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Upload logo (optional)</h3>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="border-2 border-dashed border-border rounded-md p-4 text-center cursor-pointer hover:bg-secondary/50 transition-colors">
              <input
                type="file"
                id="logo-upload"
                className="hidden"
                accept="image/*"
                onChange={handleLogoUpload}
              />
              <label htmlFor="logo-upload" className="cursor-pointer flex flex-col items-center">
                <Upload className="h-6 w-6 mb-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {logoFile ? "Change logo" : "Upload your company logo"}
                </span>
              </label>
            </div>
          </div>
          
          {logoPreview && (
            <div className="w-20 h-20 rounded-md overflow-hidden border border-border">
              <img 
                src={logoPreview} 
                alt="Logo preview" 
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Add a video (optional)</h3>
        <div className="border border-border rounded-md p-4">
          <p className="text-sm text-muted-foreground mb-2">
            You can add a short video about your startup (Loom, YouTube, or record natively)
          </p>
          <Input placeholder="Paste a Loom, YouTube or video URL" />
        </div>
      </div>
    </>
  );

  const renderTractionVision = () => (
    <>
      <div className="mb-6 bg-secondary/30 rounded-md p-4">
        <p className="text-sm font-medium">
          This section is optional but can significantly strengthen your pitch
        </p>
      </div>
      
      <FormField
        control={form.control}
        name="hasProduct"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Do you have a prototype or product?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Yes" />
                  </FormControl>
                  <FormLabel className="font-normal">Yes</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="No" />
                  </FormControl>
                  <FormLabel className="font-normal">No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {form.watch("hasProduct") === "Yes" && (
        <FormField
          control={form.control}
          name="productLink"
          render={({ field }) => (
            <FormItem className="mb-4 ml-6">
              <FormLabel>Link to your product</FormLabel>
              <FormControl>
                <Input placeholder="https://your-product.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      
      <FormField
        control={form.control}
        name="traction"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Any traction to share?</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Users, revenue, waitlist, press, etc." 
                {...field} 
                className="min-h-[120px]" 
              />
            </FormControl>
            <FormDescription>
              Share any metrics or achievements that demonstrate progress
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="longTermVision"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>What's your long-term vision?</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Where are you going in 5 years?" 
                {...field} 
                className="min-h-[120px]" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  const renderPaymentsLegal = () => (
    <>
      <FormField
        control={form.control}
        name="businessCountry"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Where is your business registered (or where will it be)?</FormLabel>
            <FormControl>
              <Input placeholder="Country name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="legalSetup"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>We'll set up your raise legally via:</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="SAFE" />
                  </FormControl>
                  <FormLabel className="font-normal">SAFE (if US or simple setup)</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="SPV" />
                  </FormControl>
                  <FormLabel className="font-normal">SPV (if EU/UK – via Odin or Roundtable)</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Need help" />
                  </FormControl>
                  <FormLabel className="font-normal">Need help</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="paymentMethod"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Connect payment account for payouts</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Stripe" />
                  </FormControl>
                  <FormLabel className="font-normal">Connect Stripe</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Wise" />
                  </FormControl>
                  <FormLabel className="font-normal">Connect Wise</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="mb-6 border border-border rounded-md p-4">
        <h3 className="text-sm font-medium mb-2">ID Verification (KYC)</h3>
        <p className="text-sm text-muted-foreground mb-3">
          For compliance, we'll need to verify your identity before launching your raise.
        </p>
        <div className="border-2 border-dashed border-border rounded-md p-4 text-center cursor-pointer hover:bg-secondary/50 transition-colors">
          <Upload className="h-6 w-6 mb-2 mx-auto text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Upload ID document (passport, driver's license)
          </p>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Your documents are encrypted and secure. We'll guide you through this step later.
        </p>
      </div>
    </>
  );

  const renderFinalSetup = () => (
    <>
      <div className="mb-6 bg-secondary/30 rounded-md p-4 border-l-4 border-kaas-pink">
        <h3 className="font-medium mb-1">Almost there!</h3>
        <p className="text-sm text-muted-foreground">
          Let's finalize your raise setup. After this, you'll be ready to launch!
        </p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Your pitch page preview</h3>
        <div className="border border-border rounded-md p-4 bg-background">
          <div className="flex items-center gap-3 mb-4">
            {logoPreview ? (
              <img src={logoPreview} alt="Company logo" className="w-12 h-12 rounded-md object-contain" />
            ) : (
              <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                <span className="text-xl font-bold text-muted-foreground">
                  {form.getValues().companyName?.substring(0, 1) || "C"}
                </span>
              </div>
            )}
            <div>
              <h3 className="font-bold">{form.getValues().companyName || "Your Company"}</h3>
              <p className="text-sm text-muted-foreground">By {form.getValues().fullName || "Founder Name"}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm font-medium">{form.getValues().elevatorPitch || "Your elevator pitch will appear here"}</p>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm">
              <span className="font-bold">{form.getValues().raiseAmount || "€XXK"}</span>
              <span className="text-muted-foreground ml-1">target</span>
            </div>
            <div className="text-sm">
              <span className="font-bold">{form.getValues().minInvestment || "€XXX"}</span>
              <span className="text-muted-foreground ml-1">min investment</span>
            </div>
            <div className="text-sm">
              <span className="font-bold">{form.getValues().timeline || "X weeks"}</span>
              <span className="text-muted-foreground ml-1">timeline</span>
            </div>
          </div>
          
          <Button variant="outline" className="w-full">View Full Pitch</Button>
        </div>
      </div>
      
      <FormField
        control={form.control}
        name="raiseLink"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Pick your raise link</FormLabel>
            <FormControl>
              <div className="flex">
                <div className="bg-muted rounded-l-md flex items-center px-3 border border-r-0 border-input">
                  <span className="text-sm text-muted-foreground">backthebold.com/</span>
                </div>
                <Input 
                  className="rounded-l-none" 
                  placeholder="yourcompany" 
                  {...field} 
                />
              </div>
            </FormControl>
            <FormDescription>
              This will be the link you share with potential backers
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="enableNotifications"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-6">
            <FormControl>
              <input
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Enable notifications and updates to your backers</FormLabel>
              <FormDescription>
                Investors love regular updates. We'll remind you to keep them posted.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">What happens next?</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-secondary rounded-full p-1 mt-0.5">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <p className="text-sm">Welcome email with your raise link</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-secondary rounded-full p-1 mt-0.5">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <p className="text-sm">Share kit (LinkedIn copy, WhatsApp message, Instagram story)</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-secondary rounded-full p-1 mt-0.5">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <p className="text-sm">Founder dashboard to track backers & messages</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-secondary rounded-full p-1 mt-0.5">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <p className="text-sm">Auto-updates for investors</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => {
              if (index <= currentStep) setCurrentStep(index);
            }}
            className={`flex flex-col items-center ${
              index <= currentStep ? "cursor-pointer" : "cursor-not-allowed opacity-50"
            }`}
            disabled={index > currentStep}
          >
            <div className={`rounded-full h-10 w-10 flex items-center justify-center mb-2 ${
              index < currentStep 
                ? "bg-green-500 text-white" 
                : index === currentStep 
                  ? "bg-kaas-pink text-white" 
                  : "bg-muted text-muted-foreground"
            }`}>
              {index < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span className="text-xs text-center font-medium">{step.title}</span>
          </button>
        ))}
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          {steps[currentStep].icon}
          {steps[currentStep].title}
        </h2>
        <p className="text-muted-foreground mt-1">{steps[currentStep].description}</p>
      </div>
      
      <Form {...form}>
        <form className="space-y-4">
          {renderStepContent()}
          
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <Button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? (
                isSubmitting ? (
                  <>
                    <Clock className="h-4 w-4 animate-spin" />
                    Launching...
                  </>
                ) : (
                  <>
                    <Rocket className="h-4 w-4" />
                    Launch My Raise
                  </>
                )
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
