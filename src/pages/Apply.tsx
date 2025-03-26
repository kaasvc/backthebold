
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SignupForm from "@/components/SignupForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Apply = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showSignup, setShowSignup] = useState(false);

  const applicationSections = [
    {
      title: "Company Information",
      items: [
        "Company name",
        "Website",
        "Company stage",
        "Industry/sector",
        "Short description",
      ],
    },
    {
      title: "Founder Information",
      items: [
        "Founding team details",
        "Previous startup experience",
        "Roles and responsibilities",
        "Relevant experience",
      ],
    },
    {
      title: "Business Model",
      items: [
        "Revenue model",
        "Customer acquisition strategy",
        "Target market",
        "Market size",
        "Competitive landscape",
      ],
    },
    {
      title: "Traction & Metrics",
      items: [
        "Current users/customers",
        "Revenue (if any)",
        "Growth rate",
        "Key performance indicators",
      ],
    },
    {
      title: "Funding Request",
      items: [
        "Amount seeking to raise",
        "Valuation expectation",
        "Use of funds",
        "Previous funding (if any)",
      ],
    }
  ];

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
      <h1 className="text-3xl font-bold mb-8">Start Your Raise</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-muted/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Quick Start</h3>
          <p className="text-muted-foreground mb-4">
            Get started quickly by providing just the essential information about your startup.
          </p>
          <Button 
            onClick={() => user ? navigate("/founder") : setShowSignup(true)} 
            variant="kaas" 
            className="w-full"
          >
            Create Your Deal
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Detailed Application</h3>
          <p className="text-muted-foreground mb-4">
            Submit a comprehensive application with all details about your startup and fundraising needs.
          </p>
          <Button 
            onClick={() => user ? navigate("/apply/form") : setShowSignup(true)} 
            variant="outline" 
            className="w-full"
          >
            Full Application Form
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Application Overview</h2>
        <p className="text-muted-foreground mb-6">
          Our application process is designed to understand your business and help us determine how we can best support your growth. Here's what you'll need to provide:
        </p>
        
        <Accordion type="single" collapsible className="mb-6">
          {applicationSections.map((section, index) => (
            <AccordionItem key={index} value={`section-${index}`}>
              <AccordionTrigger className="text-lg font-medium">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Apply;
