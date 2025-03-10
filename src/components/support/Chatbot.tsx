
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SendIcon, Bot } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hi there! I'm your KaasX assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate bot thinking and response
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    // Simple response logic - in a real app, this would connect to a proper chatbot service
    const input = userInput.toLowerCase();
    
    if (input.includes("funding") || input.includes("invest")) {
      return "Our funding process begins with an application. Would you like me to guide you through the application process?";
    } else if (input.includes("contact") || input.includes("speak") || input.includes("human")) {
      return "If you'd like to speak with our team directly, please use the Contact Us form in the next tab. Someone will get back to you within 24 hours.";
    } else if (input.includes("application") || input.includes("apply")) {
      return "You can apply for funding by visiting our Apply page. Would you like me to provide the link?";
    } else if (input.includes("investor") || input.includes("investing")) {
      return "If you're interested in investing in startups through KaasX, please check out our Deals page or contact our investor relations team.";
    } else {
      return "Thanks for your message. If you have specific questions about our funding process, startup applications, or investment opportunities, please let me know. For other inquiries, our team is ready to help through the Contact Us form.";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const connectWithAgent = () => {
    toast({
      title: "Request Received",
      description: "A support agent will contact you shortly via email.",
    });
    
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: "We've received your request to speak with a support agent. Someone from our team will contact you soon via email.",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="bg-card rounded-lg border flex flex-col h-[600px]">
      <div className="p-4 flex items-center gap-2 border-b">
        <Bot className="h-6 w-6 text-kaas-pink" />
        <h2 className="text-lg font-semibold">KaasX Support</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === "user"
                    ? "bg-kaas-pink text-white"
                    : "bg-muted"
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef}></div>
        </div>
      </div>
      
      <div className="p-4 border-t">
        <Button 
          onClick={connectWithAgent} 
          variant="outline" 
          className="mb-3 w-full"
        >
          Connect with a human agent
        </Button>
        
        <Separator className="mb-3" />
        
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <SendIcon className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
