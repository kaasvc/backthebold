
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { AtSign, Lock, User } from "lucide-react";

interface SignupFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onComplete, onCancel }) => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast.error("Please fill out all fields");
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await register(name, email, password);
      if (success) {
        toast.success("Account created successfully");
        onComplete();
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-muted/50 rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create Your Account</h2>
      <p className="text-muted-foreground mb-6">
        Sign up to start your fundraising journey with Back the Bold
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              className="pl-10"
              required
              minLength={6}
            />
          </div>
        </div>
        
        <div className="pt-2 space-y-4">
          <Button 
            type="submit" 
            variant="kaas" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full" 
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
        
        <p className="text-sm text-center text-muted-foreground pt-2">
          Already have an account? <a href="/login" className="text-kaas-pink hover:underline">Log in</a>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
