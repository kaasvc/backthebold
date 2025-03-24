
import { toast } from "sonner";

export interface FormField {
  id: string;
  label: string;
  type: "text" | "textarea" | "email" | "number" | "url" | "radio" | "select" | "file";
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  options?: string[];
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

export const formSections: FormSection[] = [
  {
    id: "founders",
    title: "1. Founder & Team",
    description: "Tell us about the founding team and what you need help with.",
    fields: [
      {
        id: "foundersImpressive",
        label: "What is the most impressive thing each founder has built or achieved (outside of this startup)?",
        type: "textarea",
        placeholder: "Share the most notable achievements of each founder...",
        required: true,
      },
      {
        id: "foundersHistory",
        label: "How long have the founders known one another, and how did you meet?",
        type: "textarea",
        placeholder: "Only applicable for multiple founders. Skip if you're a solo founder.",
        required: false,
      },
      {
        id: "previouslyWorked",
        label: "Have any of the founders worked together on projects before?",
        type: "radio",
        options: ["Yes", "No"],
        required: true,
      },
      {
        id: "previouslyWorkedDetails",
        label: "If yes, please describe",
        type: "textarea",
        placeholder: "Describe previous collaborations...",
        required: false,
      },
      {
        id: "fullTimeStatus",
        label: "Who is full-time, and who isn't? (If not full-time yet, when do you plan to be?)",
        type: "textarea",
        placeholder: "List each founder and their commitment status...",
        required: true,
      },
      {
        id: "teamSize",
        label: "How many people currently work at your company (including founders)?",
        type: "number",
        placeholder: "Enter team size",
        required: true,
      },
      {
        id: "needHelp",
        label: "What do you need the most help with right now?",
        type: "select",
        options: ["Product", "Hiring", "Growth", "Funding", "Partnerships", "Other"],
        required: true,
      },
      {
        id: "needHelpDetails",
        label: "Please provide more details on what you need help with",
        type: "textarea",
        placeholder: "Explain what specific help you're looking for...",
        required: true,
      },
    ],
  },
  {
    id: "company",
    title: "2. Company Information",
    description: "Tell us about your company and what you're building.",
    fields: [
      {
        id: "companyName",
        label: "Company Name",
        type: "text",
        placeholder: "Your company name",
        required: true,
      },
      {
        id: "shortDescription",
        label: "Describe what your company does in 50 characters or less",
        type: "text",
        placeholder: "Brief description (max 50 chars)",
        required: true,
      },
      {
        id: "tagline",
        label: "Catchy tagline for your company",
        type: "text",
        placeholder: "Your company's tagline",
        required: true,
      },
      {
        id: "companyUrl",
        label: "Company URL, if any",
        type: "url",
        placeholder: "https://",
        required: false,
      },
      {
        id: "companyLogo",
        label: "Company Logo (square format recommended)",
        type: "file",
        required: true,
        helperText: "This will be shown on your profile page",
      },
      {
        id: "coverImage",
        label: "Cover image for your profile page",
        type: "file",
        required: false,
        helperText: "Banner image for your raise profile",
      },
      {
        id: "demoFile",
        label: "If you have a demo, attach it below",
        type: "file",
        required: false,
      },
      {
        id: "productDescription",
        label: "What is your company going to make?",
        type: "textarea",
        placeholder: "Describe your product and what it does and will do...",
        required: true,
      },
      {
        id: "location",
        label: "Where do you live now, and where is your company based?",
        type: "textarea",
        placeholder: "Describe your current location(s)...",
        required: true,
      },
      {
        id: "locationChange",
        label: "Will your location change in the coming 12 months?",
        type: "radio",
        options: ["Yes", "No"],
        required: true,
      },
      {
        id: "locationChangeDetails",
        label: "If yes, please explain",
        type: "textarea",
        placeholder: "Explain your relocation plans...",
        required: false,
      },
    ],
  },
  {
    id: "progress",
    title: "3. Progress & Traction",
    description: "Tell us about your company's progress and current status.",
    fields: [
      {
        id: "progressStage",
        label: "How far along are you?",
        type: "textarea",
        placeholder: "Do you have a working prototype or beta version? If not, when will you?",
        required: true,
      },
      {
        id: "techStack",
        label: "What tech stack are you using, or planning to use, to build this product?",
        type: "textarea",
        placeholder: "List your technologies and frameworks...",
        required: true,
      },
      {
        id: "usersStatus",
        label: "Are people using your product?",
        type: "radio",
        options: ["Yes", "No"],
        required: true,
      },
      {
        id: "usersDetails",
        label: "If yes, how many and how frequently?",
        type: "textarea",
        placeholder: "Describe your user metrics...",
        required: false,
      },
      {
        id: "userGrowthRate",
        label: "What is your user growth rate?",
        type: "text",
        placeholder: "e.g., 10% week-over-week",
        required: false,
      },
      {
        id: "revenueStatus",
        label: "Do you have revenue?",
        type: "radio",
        options: ["Yes", "No"],
        required: true,
      },
      {
        id: "revenueDetails",
        label: "If yes, how much?",
        type: "textarea",
        placeholder: "Describe your revenue figures...",
        required: false,
      },
      {
        id: "revenueGrowth",
        label: "What is your monthly revenue growth rate?",
        type: "text",
        placeholder: "e.g., 15% month-over-month",
        required: false,
      },
      {
        id: "keyMetrics",
        label: "What are your key metrics?",
        type: "textarea",
        placeholder: "List your most important metrics and current values",
        required: true,
      },
      {
        id: "aiUsage",
        label: "Are you incorporating AI into your product? If so, how?",
        type: "textarea",
        placeholder: "Explain if AI is a core part of your technology or if you plan to leverage it in the future...",
        required: true,
      },
      {
        id: "acceleratorStatus",
        label: "Have you participated or committed to participate in an incubator, accelerator, or pre-accelerator program?",
        type: "radio",
        options: ["Yes", "No"],
        required: true,
      },
      {
        id: "acceleratorDetails",
        label: "If yes, which one?",
        type: "text",
        placeholder: "Name of the program",
        required: false,
      },
    ],
  },
  {
    id: "idea",
    title: "4. Idea & Market",
    description: "Tell us about your idea and the market you're targeting.",
    fields: [
      {
        id: "ideaOrigin",
        label: "Why did you pick this idea to work on?",
        type: "textarea",
        placeholder: "Explain what inspired you to work on this idea...",
        required: true,
      },
      {
        id: "domainExpertise",
        label: "Do you have domain expertise in this area? How do you know people need what you're making?",
        type: "textarea",
        placeholder: "Describe your background in this field and your understanding of user needs...",
        required: true,
      },
      {
        id: "competitors",
        label: "Who are your competitors?",
        type: "textarea",
        placeholder: "What do you understand about your business that they don't?",
        required: true,
      },
      {
        id: "uniqueness",
        label: "What's new about what you're making?",
        type: "textarea",
        placeholder: "What substitutes do people currently use because your solution doesn't exist (or they don't know about it)?",
        required: true,
      },
      {
        id: "marketSize",
        label: "How big is your target market?",
        type: "textarea",
        placeholder: "Provide TAM, SAM, and SOM if possible",
        required: true,
      },
      {
        id: "longTermTrend",
        label: "What long-term trend is your company playing into?",
        type: "select",
        options: [
          "AI & AGI (Artificial General Intelligence)",
          "Longevity & Human Enhancement",
          "Robotics & Automation",
          "Web3, Blockchain & Crypto",
          "Space Economy & Moonshot Ventures",
          "The Future of Work & Investing",
          "The Convergence of Exponential Technologies",
          "Other"
        ],
        required: true,
      },
      {
        id: "longTermTrendOther",
        label: "If you selected 'Other', please describe the long-term trend",
        type: "textarea",
        placeholder: "Describe the long-term trend your company is playing into...",
        required: false,
      },
      {
        id: "category",
        label: "Which category best applies to your company?",
        type: "select",
        options: ["Consumer", "SaaS", "Marketplace", "Fintech", "Hardware", "AI", "Healthcare", "Education", "Developer Tools", "Enterprise", "Other"],
        required: true,
      },
    ],
  },
  {
    id: "crowdfunding",
    title: "5. Crowdfunding Readiness & Fit for KaasX",
    description: "Tell us about your crowdfunding plans and how KaasX can help.",
    fields: [
      {
        id: "crowdfundingReason",
        label: "Why do you think crowdfunding is the right path for your company?",
        type: "textarea",
        placeholder: "Explain your rationale for choosing crowdfunding...",
        required: true,
      },
      {
        id: "minimumFunding",
        label: "How much funding do you need to execute on your next stage of growth?",
        type: "text",
        placeholder: "e.g., $50,000",
        required: true,
      },
      {
        id: "targetAmount",
        label: "What is your target raise amount?",
        type: "text",
        placeholder: "e.g., $100,000",
        required: true,
      },
      {
        id: "useOfFunds",
        label: "If your campaign is successfully funded, how will you use the money?",
        type: "textarea",
        placeholder: "Describe your planned allocation of funds...",
        required: true,
      },
      {
        id: "raiseDuration",
        label: "How long do you want your raise to be open?",
        type: "select",
        options: ["30 days", "45 days", "60 days", "90 days"],
        required: true,
      },
      {
        id: "equityOffered",
        label: "What percentage of equity are you offering?",
        type: "text",
        placeholder: "e.g., 5%",
        required: true,
      },
      {
        id: "minimumInvestment",
        label: "What is the minimum investment amount?",
        type: "text",
        placeholder: "e.g., $100",
        required: true,
      },
      {
        id: "planB",
        label: "What will happen if you don't hit your crowdfunding target? What's your Plan B?",
        type: "textarea",
        placeholder: "Describe your contingency plans...",
        required: true,
      },
      {
        id: "audienceStrategy",
        label: "Have you built an engaged audience, or do you have a strategy for attracting backers to your campaign?",
        type: "textarea",
        placeholder: "Explain your marketing and community-building approach...",
        required: true,
      },
      {
        id: "socialMediaLinks",
        label: "Links to your social media profiles",
        type: "textarea",
        placeholder: "Twitter, LinkedIn, Instagram, etc.",
        required: false,
        helperText: "These will be displayed on your profile page",
      },
      {
        id: "idealBackers",
        label: "Who would you ideally like to see backing your campaign?",
        type: "textarea",
        placeholder: "Investors, customers, celebrities, influencers, strategic partners?",
        required: true,
      },
    ],
  },
  {
    id: "financials",
    title: "6. Financials & Growth Strategy",
    description: "Tell us about your financial status and growth plans.",
    fields: [
      {
        id: "legalEntity",
        label: "Have you formed a legal entity?",
        type: "radio",
        options: ["Yes", "No"],
        required: true,
      },
      {
        id: "legalEntityDetails",
        label: "If yes, which structure?",
        type: "text",
        placeholder: "e.g., LLC, C-Corp, etc.",
        required: false,
      },
      {
        id: "incorporationDate",
        label: "When was your company incorporated?",
        type: "text",
        placeholder: "MM/YYYY",
        required: false,
      },
      {
        id: "investmentStatus",
        label: "Have you taken any investment?",
        type: "radio",
        options: ["Yes", "No"],
        required: true,
      },
      {
        id: "investmentDetails",
        label: "If yes, from whom and how much?",
        type: "textarea",
        placeholder: "Describe your previous funding...",
        required: false,
      },
      {
        id: "currentValuation",
        label: "What is your company's current valuation?",
        type: "text",
        placeholder: "e.g., $1,000,000",
        required: true,
      },
      {
        id: "valuationBasis",
        label: "What is the basis for this valuation?",
        type: "textarea",
        placeholder: "Explain how you arrived at this valuation...",
        required: true,
      },
      {
        id: "revenueModel",
        label: "How do or will you make money?",
        type: "textarea",
        placeholder: "Explain your revenue model...",
        required: true,
      },
      {
        id: "projectedRevenue",
        label: "How much could you make in the next 12 months with your current plan?",
        type: "textarea",
        placeholder: "Provide revenue projections...",
        required: true,
      },
      {
        id: "burnRate",
        label: "What is your current monthly burn rate?",
        type: "text",
        placeholder: "e.g., $10,000/month",
        required: false,
      },
      {
        id: "runway",
        label: "How much runway do you have?",
        type: "text",
        placeholder: "e.g., 8 months",
        required: false,
      },
      {
        id: "fundingStrategy",
        label: "What is your long-term funding strategy?",
        type: "textarea",
        placeholder: "Describe your funding roadmap...",
        required: true,
      },
      {
        id: "growthStrategy",
        label: "Do you want to bootstrap and become profitable quickly, or do you plan to raise VC funding for explosive growth? Why?",
        type: "textarea",
        placeholder: "Explain your growth philosophy...",
        required: true,
      },
    ],
  },
  {
    id: "postFunding",
    title: "7. Post-Funding Growth & Scaling",
    description: "Tell us about your plans after successful funding.",
    fields: [
      {
        id: "keyMilestones",
        label: "What are your key milestones after crowdfunding?",
        type: "textarea",
        placeholder: "How will you keep growing after your raise?",
        required: true,
      },
      {
        id: "milestoneTimeline",
        label: "Timeline for your key milestones",
        type: "textarea",
        placeholder: "When do you expect to hit each milestone?",
        required: true,
      },
      {
        id: "vcPlans",
        label: "Do you plan to raise follow-up funding from VCs?",
        type: "radio",
        options: ["Yes", "No"],
        required: true,
      },
      {
        id: "vcTimeline",
        label: "If yes, what's your ideal timeline?",
        type: "textarea",
        placeholder: "When do you plan to approach VCs?",
        required: false,
      },
      {
        id: "exitStrategy",
        label: "What is your exit strategy?",
        type: "textarea",
        placeholder: "Acquisition, IPO, or long-term private company?",
        required: true,
      },
      {
        id: "kaasxHelp",
        label: "How can KaasX help you beyond funding?",
        type: "textarea",
        placeholder: "Talent attraction, sales, strategic coaching, investor connections?",
        required: true,
      },
    ],
  },
  {
    id: "community",
    title: "8. Community & Engagement",
    description: "Tell us about your community building and marketing strategies.",
    fields: [
      {
        id: "communityBuilding",
        label: "How do you plan to build and engage a community around your product or service?",
        type: "textarea",
        placeholder: "Describe your community strategy...",
        required: true,
      },
      {
        id: "marketingStrategies",
        label: "What marketing strategies will you use to attract and retain customers?",
        type: "textarea",
        placeholder: "Describe your marketing approach...",
        required: true,
      },
      {
        id: "existingFollowing",
        label: "Have you already built a following on social media, email lists, or other platforms? If so, provide details.",
        type: "textarea",
        placeholder: "Describe your current audience and engagement...",
        required: true,
      },
      {
        id: "backerCommunication",
        label: "How do you plan to communicate with your backers during and after the raise?",
        type: "textarea",
        placeholder: "Regular updates, exclusive content, events?",
        required: true,
      },
      {
        id: "backerBenefits",
        label: "Are you offering any perks or benefits to early backers?",
        type: "textarea",
        placeholder: "Early access, discounts, exclusive features?",
        required: false,
      },
      {
        id: "founderVideo",
        label: "Founder introduction video URL (highly recommended)",
        type: "url",
        placeholder: "YouTube or Vimeo link",
        required: false,
        helperText: "A personal video greatly increases conversion rates",
      },
    ],
  },
  {
    id: "legal",
    title: "9. Legal & Risks",
    description: "Tell us about any legal considerations or risks for your business.",
    fields: [
      {
        id: "nonCompetes",
        label: "Are any of the founders covered by non-competes or intellectual property agreements that overlap with your project?",
        type: "textarea",
        placeholder: "Describe any potential legal conflicts...",
        required: true,
      },
      {
        id: "externalIP",
        label: "Was any of your code, product design, or intellectual property developed by someone who is not a founder?",
        type: "textarea",
        placeholder: "If so, how can you safely use it?",
        required: true,
      },
      {
        id: "regulations",
        label: "Are there any legal or regulatory barriers to launching or scaling your business?",
        type: "textarea",
        placeholder: "Describe any regulatory challenges...",
        required: true,
      },
      {
        id: "keyRisks",
        label: "What are the biggest risks to your business?",
        type: "textarea",
        placeholder: "Market, technical, team, financial risks?",
        required: true,
        helperText: "Transparency builds trust with investors",
      },
    ],
  },
  {
    id: "additional",
    title: "10. Additional Information",
    description: "Share any other relevant information about you and your team.",
    fields: [
      {
        id: "otherIdeas",
        label: "If you had any other ideas you considered applying with, please list them.",
        type: "textarea",
        placeholder: "Share alternative ideas you've explored...",
        required: false,
      },
      {
        id: "pitchDeck",
        label: "Upload your pitch deck (if available)",
        type: "file",
        required: false,
        helperText: "PDF format preferred",
      },
      {
        id: "additionalLinks",
        label: "Any additional links you want to share (press coverage, awards, etc.)",
        type: "textarea",
        placeholder: "One link per line",
        required: false,
      },
      {
        id: "funFact",
        label: "What is something surprising, amusing, or interesting about you or your team?",
        type: "textarea",
        placeholder: "Share something unique about your team...",
        required: false,
      },
      {
        id: "whyKaasX",
        label: "Why do you want to be part of KaasX, and how can we help you succeed?",
        type: "textarea",
        placeholder: "Explain why KaasX is a good fit for your startup...",
        required: true,
      },
    ],
  },
];

export const validateField = (value: string, field: FormField): string | null => {
  if (field.required && (!value || value.trim() === '')) {
    return `${field.label} is required`;
  }
  
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
  }
  
  if (field.type === 'url' && value) {
    try {
      new URL(value);
    } catch (error) {
      return 'Please enter a valid URL';
    }
  }
  
  return null;
};

export const validateSection = (formData: Record<string, string>, section: FormSection): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  section.fields.forEach(field => {
    const value = formData[field.id] || '';
    const error = validateField(value, field);
    if (error) {
      errors[field.id] = error;
    }
  });
  
  return errors;
};

export const validateAllSections = (formData: Record<string, string>): Record<string, string> => {
  let allErrors: Record<string, string> = {};
  
  formSections.forEach(section => {
    const sectionErrors = validateSection(formData, section);
    allErrors = { ...allErrors, ...sectionErrors };
  });
  
  const foundersData = formData.founders ? JSON.parse(formData.founders) : [];
  if (foundersData.length === 0) {
    allErrors["founders"] = "Please add at least one founder";
  } else {
    foundersData.forEach((founder: any, index: number) => {
      if (!founder.name.trim()) {
        allErrors[`founder_${index}_name`] = "Founder name is required";
      }
      if (founder.linkedin && !/^https?:\/\/([a-z]{2,3}\.)?linkedin\.com\/.*$/i.test(founder.linkedin)) {
        allErrors[`founder_${index}_linkedin`] = "Please enter a valid LinkedIn URL";
      }
    });
  }
  
  if (formData.previouslyWorked === 'Yes' && !formData.previouslyWorkedDetails) {
    allErrors.previouslyWorkedDetails = "Please provide details about previous collaborations";
  }
  
  if (formData.locationChange === 'Yes' && !formData.locationChangeDetails) {
    allErrors.locationChangeDetails = "Please explain your relocation plans";
  }
  
  if (formData.usersStatus === 'Yes' && !formData.usersDetails) {
    allErrors.usersDetails = "Please provide details about your users";
  }
  
  if (formData.revenueStatus === 'Yes' && !formData.revenueDetails) {
    allErrors.revenueDetails = "Please provide details about your revenue";
  }
  
  if (formData.acceleratorStatus === 'Yes' && !formData.acceleratorDetails) {
    allErrors.acceleratorDetails = "Please provide the name of the program";
  }
  
  if (formData.legalEntity === 'Yes' && !formData.legalEntityDetails) {
    allErrors.legalEntityDetails = "Please provide your legal entity structure";
  }
  
  if (formData.investmentStatus === 'Yes' && !formData.investmentDetails) {
    allErrors.investmentDetails = "Please provide details about your investment";
  }
  
  if (formData.vcPlans === 'Yes' && !formData.vcTimeline) {
    allErrors.vcTimeline = "Please provide your VC funding timeline";
  }
  
  if (formData.longTermTrend === 'Other' && !formData.longTermTrendOther) {
    allErrors.longTermTrendOther = "Please describe the long-term trend your company is playing into";
  }
  
  return allErrors;
};

export const submitForm = async (formData: Record<string, string>): Promise<boolean> => {
  try {
    console.log('Form data submitted:', formData);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Application submitted successfully", {
      description: "We've received your application and will be in touch soon.",
    });
    
    return true;
  } catch (error) {
    console.error('Error submitting form:', error);
    
    toast.error("Failed to submit application", {
      description: "Please try again later or contact support.",
    });
    
    return false;
  }
};
