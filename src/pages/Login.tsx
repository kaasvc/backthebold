
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Rocket, Sparkles } from "lucide-react";

const Login: React.FC = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  if (user) {
    navigate(user.role === "admin" ? "/admin" : "/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(email, password);
    
    setIsLoading(false);
    
    if (success) {
      // Redirect handled by the if(user) check above on next render
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link to="/" className="mr-4 flex items-center space-x-2">
            <div className="flex items-center">
              <Rocket className="h-8 w-8 text-kaas-pink" />
              <Sparkles className="h-6 w-6 text-kaas-darkpink -ml-2 -mt-3" />
              <span className="font-bold text-2xl ml-1">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-kaas-pink to-kaas-darkpink">Kaas</span>
                <span className="text-black">X</span>
              </span>
            </div>
          </Link>
        </div>
      </header>
      
      <main className="container py-10">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your KaasX account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="link"
                className="px-0 font-normal text-xs"
                type="button"
              >
                Forgot password?
              </Button>
            </div>
            
            <Button
              type="submit"
              variant="kaas"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-kaas-pink hover:underline">
                Sign up
              </Link>
            </p>
            
            <div className="mt-4 p-4 bg-muted rounded-md">
              <p className="text-xs text-muted-foreground mb-2">Demo Accounts:</p>
              <p className="text-xs">
                Admin: admin@kaas.vc / password
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
