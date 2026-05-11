import { HeaderNavigation } from "@/components/navigation";
import { CreditCard, Plus, ShieldCheck } from "lucide-react";

export default function CardsPage() {
  return (
    <div className="min-h-screen bg-brand-obsidian font-body text-neutral-light">
      <HeaderNavigation />
      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[32px] py-[40px] lg:py-[72px]">
        <div className="mb-[40px] lg:mb-[72px] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-[32px] md:text-[42px] lg:text-[49px] font-[480] leading-[1.1] mb-4 text-surface-white">
              Virtual Cards
            </h1>
            <p className="font-display text-[16px] md:text-[21px] text-neutral-medium leading-[1.5]">
              Manage your active cards and secure your online purchases.
            </p>
          </div>
          <button className="bg-brand-wine hover:bg-brand-wine-dark active:bg-brand-obsidian text-surface-white font-body text-[16px] h-[40px] rounded-[40px] px-[24px] flex items-center justify-center gap-2 transition-colors shadow-subtle shrink-0">
            <Plus className="w-5 h-5" />
            Register New Virtual Card
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px]">
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            {/* Virtual Card Component */}
            <div className="relative w-full max-w-[400px] xl:max-w-full aspect-[1.586/1] rounded-[24px] overflow-hidden p-6 text-white shadow-large group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-navy to-brand-wine z-0"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0 mix-blend-overlay"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="text-xl font-display font-bold tracking-wider opacity-90 italic drop-shadow-sm">
                    Financio
                  </div>
                  <WifiIcon />
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-9 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-md shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 border border-black/10 rounded-md"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/10"></div>
                    <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-black/10"></div>
                    <div className="absolute left-2/3 top-0 bottom-0 w-[1px] bg-black/10"></div>
                  </div>
                  
                  <div className="font-mono text-[22px] tracking-[0.2em] font-medium drop-shadow-sm">
                    •••• •••• •••• 9012
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div className="uppercase tracking-widest font-body text-[13px] font-[600] opacity-80">
                      Cardholder Name
                    </div>
                    <div className="flex space-x-4 font-mono text-[14px]">
                      <div className="flex flex-col items-center">
                        <span className="text-[8px] uppercase tracking-wider opacity-60 leading-none mb-1">Valid Thru</span>
                        <span>12/28</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 bg-surface-white p-[32px] shadow-medium rounded-[0px]">
            <h3 className="font-body text-[18px] font-[600] text-brand-obsidian mb-6">Card Settings</h3>
            <div className="space-y-6">
               <div className="flex items-center justify-between py-4 border-b border-[#E0E0E8]">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-[rgba(86,86,118,0.1)] flex items-center justify-center text-interact-slate">
                     <ShieldCheck className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="font-body text-[16px] font-[600] text-brand-obsidian">Online Transactions</p>
                     <p className="font-body text-[14px] text-neutral-medium">Enable for web and in-app purchases</p>
                   </div>
                 </div>
                 <div className="w-12 h-6 bg-brand-wine rounded-full relative cursor-pointer">
                   <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm transition-all duration-300"></div>
                 </div>
               </div>

               <div className="flex items-center justify-between py-4 border-b border-[#E0E0E8]">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-[rgba(86,86,118,0.1)] flex items-center justify-center text-interact-slate">
                     <CreditCard className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="font-body text-[16px] font-[600] text-brand-obsidian">Spending Limit</p>
                     <p className="font-body text-[14px] text-neutral-medium">$2,500.00 / month</p>
                   </div>
                 </div>
                 <button className="text-brand-wine font-body text-[14px] font-[600] hover:underline">Edit</button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function WifiIcon() {
  return (
    <svg className="w-6 h-6 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
      <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
      <line x1="12" y1="20" x2="12.01" y2="20"></line>
    </svg>
  );
}
