"use client";

import { useState, useEffect } from "react";
import { Menu, X, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { AuthModal } from "@/components/auth-modal";

export function HeaderNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const supabase = createSupabaseClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignIn = () => {
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Transactions", href: "/transactions" },
    { name: "Payments", href: "/payments" },
    { name: "Cards", href: "/cards" },
  ];

  return (
    <header className="bg-brand-obsidian h-[72px] px-8 py-4 shadow-subtle flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-wine flex items-center justify-center">
            <span className="text-neutral-white font-bold font-display text-lg">F</span>
          </div>
          <span className="text-neutral-white font-display text-xl tracking-wide font-medium">Financio</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[16px] font-body transition-colors pb-1 border-b-2 ${
                  isActive 
                    ? "text-brand-wine border-brand-wine" 
                    : "text-neutral-light border-transparent hover:text-brand-wine-light hover:border-brand-wine-light"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-neutral-light hover:text-brand-wine-light transition-colors hidden sm:block">
          <Bell className="w-5 h-5" />
        </button>
        
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-neutral-light font-body text-[14px]">
                {user.user_metadata?.full_name || user.email}
              </span>
              {user.user_metadata?.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Avatar" 
                  className="w-8 h-8 rounded-full border border-[rgba(237,237,243,0.3)]" 
                />
              ) : null}
              <button 
                onClick={handleSignOut}
                className="bg-brand-wine/10 hover:bg-brand-wine/20 text-neutral-light h-[32px] px-4 rounded-[40px] items-center justify-center font-body text-[14px] transition-colors"
               >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              onClick={handleSignIn}
              className="bg-brand-wine text-surface-white hover:bg-brand-wine-dark h-[32px] px-4 rounded-[40px] flex items-center justify-center font-body text-[14px] transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-neutral-light hover:text-brand-wine-light transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-brand-obsidian border-t border-[rgba(237,237,243,0.1)] shadow-[rgba(86,86,118,0.1)_0px_0px_6px_0px] flex flex-col md:hidden z-40">
          <div className="px-4 py-6 flex flex-col gap-4">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[16px] font-body px-4 py-3 rounded-[4px] transition-colors ${
                    isActive 
                      ? "bg-brand-wine/10 text-brand-wine-light" 
                      : "text-neutral-light hover:bg-brand-wine/10 hover:text-brand-wine-light"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {user ? (
               <button 
                 onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}
                 className="mt-4 bg-brand-wine/10 text-neutral-light h-[40px] rounded-[40px] w-full font-body text-[16px] transition-colors hover:bg-brand-wine/20 active:bg-brand-wine-dark"
               >
                  Sign Out
               </button>
            ) : (
               <button 
                 onClick={() => { handleSignIn(); setIsMobileMenuOpen(false); }}
                 className="mt-4 bg-brand-wine text-surface-white h-[40px] rounded-[40px] w-full font-body text-[16px] transition-colors hover:bg-brand-wine-dark active:bg-brand-navy"
               >
                  Open Account / Sign In
               </button>
            )}
          </div>
        </div>
      )}
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
}
