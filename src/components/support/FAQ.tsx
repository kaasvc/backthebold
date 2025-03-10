
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="bg-card rounded-lg border p-6">
      <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How does the funding process work?</AccordionTrigger>
          <AccordionContent>
            Our funding process begins with your application, which our team reviews thoroughly. If your startup aligns with our investment criteria, you'll be invited to a meeting with our investment team. Once approved, we'll help you structure your round and connect you with strategic investors from our network.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger>What kind of startups do you invest in?</AccordionTrigger>
          <AccordionContent>
            We focus on early-stage European startups with strong founding teams, clear market potential, and innovative solutions. We're sector-agnostic but have particular interest in fintech, healthtech, SaaS, sustainability, and consumer technologies.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3">
          <AccordionTrigger>What investment stages do you cover?</AccordionTrigger>
          <AccordionContent>
            We primarily invest at pre-seed and seed stages, typically when companies are looking to raise between €250K-€3M. However, we occasionally participate in Series A rounds for exceptional companies within our portfolio.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4">
          <AccordionTrigger>How is KaasX different from traditional VCs?</AccordionTrigger>
          <AccordionContent>
            Unlike traditional VCs, we combine strategic angel investors with crowdfunding capabilities, allowing more diverse participation in funding rounds. This approach provides founders with access to a wider network of supporters, customers, and advocates beyond just financial capital.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5">
          <AccordionTrigger>How long does the investment process take?</AccordionTrigger>
          <AccordionContent>
            From initial application to receiving funds, the process typically takes 4-8 weeks. This timeline can vary based on the complexity of your business, the stage of investment, and how prepared you are with necessary documentation and due diligence materials.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-6">
          <AccordionTrigger>What support do you provide besides funding?</AccordionTrigger>
          <AccordionContent>
            Beyond funding, we offer strategic guidance, networking opportunities with industry experts, recruitment assistance, marketing support, and access to our platform of tools and resources designed specifically for startups. Our goal is to be true partners in your growth journey.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
