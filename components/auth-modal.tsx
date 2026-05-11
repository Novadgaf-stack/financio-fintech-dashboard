"use client";

import { useState } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";
import { X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createSupabaseClient();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        });
        if (signUpError) throw signUpError;
        // In dev, sometimes it auto-signs in, sometimes requires confirm. 
        // We'll show a message if it doesn't log them in automatically but doesn't error.
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-obsidian/70 p-4 backdrop-blur-sm">
      <div className="bg-surface-white w-full max-w-[480px] p-[40px] shadow-[rgba(0,0,0,0.05)_0px_0px_3px_0px,rgba(0,0,0,0.05)_0px_8px_12px_0px,rgba(0,0,0,0.05)_0px_12px_20px_0px] relative rounded-[0px]">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-medium hover:text-brand-obsidian transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="font-display text-[32px] md:text-[42px] font-[480] text-brand-obsidian mb-2 leading-tight">
          {isLogin ? "Welcome back" : "Create account"}
        </h2>
        <p className="font-body text-[16px] text-neutral-medium mb-8">
          {isLogin ? "Enter your details to access your account." : "Start managing your finances today."}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-body text-[14px] font-[600] text-brand-obsidian">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-surface-soft text-brand-obsidian placeholder-neutral-medium font-body text-[16px] h-[46px] rounded-[32px] px-[20px] border border-neutral-medium/30 focus:outline-none focus:border-brand-wine focus:shadow-[0px_0px_0px_2px_rgba(158,27,50,0.1)] focus:bg-surface-white transition-all"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="font-body text-[14px] font-[600] text-brand-obsidian">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-surface-soft text-brand-obsidian placeholder-neutral-medium font-body text-[16px] h-[46px] rounded-[32px] px-[20px] border border-neutral-medium/30 focus:outline-none focus:border-brand-wine focus:shadow-[0px_0px_0px_2px_rgba(158,27,50,0.1)] focus:bg-surface-white transition-all"
            />
          </div>

          {error && (
            <p className="text-[#E53E3E] font-body text-[14px]">{error}</p>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-brand-wine hover:bg-brand-wine-dark active:bg-brand-obsidian text-surface-white font-body text-[16px] h-[40px] rounded-[40px] flex items-center justify-center transition-colors shadow-none mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Please wait..." : (isLogin ? "Sign In" : "Sign Up")}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            className="text-brand-wine font-body text-[16px] font-[400] underline hover:text-brand-wine-dark hover:no-underline transition-all"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
