
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, MessageCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import FAQ from "@/components/support/FAQ";
import Chatbot from "@/components/support/Chatbot";
import ContactForm from "@/components/support/ContactForm";

const ContactSupport = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <div className="flex items-center scale-[0.7] origin-left">
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-kaas-pink text-white font-bold text-2xl px-1.5 py-0.5 rounded-l-md">KAAS</span>
                <span className="bg-black text-white font-bold text-2xl px-1.5 py-0.5 rounded-r-md">X</span>
              </div>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-4">
              <Link
                to="/"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary"
                )}
              >
                Back to Home
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">How can we help you?</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get answers to your questions or contact our support team
          </p>
        </div>
        
        <Tabs defaultValue="faq" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" /> FAQ
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" /> Chat with us
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> Contact Us
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq" className="p-4">
            <FAQ />
          </TabsContent>
          
          <TabsContent value="chatbot" className="p-4">
            <Chatbot />
          </TabsContent>
          
          <TabsContent value="contact" className="p-4">
            <ContactForm />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="border-t border-border/40 bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} KaasX. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactSupport;
