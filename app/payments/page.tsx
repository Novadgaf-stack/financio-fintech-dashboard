import { HeaderNavigation } from "@/components/navigation";
import { Zap, Droplets, Wifi, Tv, ArrowRight } from "lucide-react";

export default function PaymentsPage() {
  const utilities = [
    { id: "elec", name: "Electricity", provider: "National Grid", icon: Zap, color: "text-brand-wine", bg: "bg-brand-wine/10" },
    { id: "water", name: "Water", provider: "City Water Corp", icon: Droplets, color: "text-brand-wine", bg: "bg-brand-wine/10" },
    { id: "internet", name: "Internet", provider: "FiberX Networks", icon: Wifi, color: "text-brand-wine", bg: "bg-brand-wine/10" },
    { id: "cable", name: "Cable TV", provider: "VisionMedia", icon: Tv, color: "text-brand-wine", bg: "bg-brand-wine/10" },
  ];

  return (
    <div className="min-h-screen bg-brand-obsidian font-body text-neutral-light">
      <HeaderNavigation />
      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[32px] py-[40px] lg:py-[72px]">
        <div className="mb-[40px] lg:mb-[72px]">
          <h1 className="font-display text-[32px] md:text-[42px] lg:text-[49px] font-[480] leading-[1.1] mb-4 text-surface-white">
            Payments
          </h1>
          <p className="font-display text-[16px] md:text-[21px] text-neutral-medium leading-[1.5]">
            Schedule and review your upcoming utility payments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[24px]">
          {utilities.map((util) => (
            <div key={util.id} className="bg-surface-white p-[32px] shadow-medium rounded-[0px] flex flex-col justify-between">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${util.bg} ${util.color} flex items-center justify-center`}>
                    <util.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-body text-[18px] font-[600] text-brand-obsidian">{util.name}</h3>
                    <p className="font-body text-[14px] text-neutral-medium">{util.provider}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex flex-col gap-2">
                <label className="font-body text-[14px] font-[600] text-brand-obsidian">Amount to Pay</label>
                <div className="flex flex-col sm:flex-row rounded-[32px]">
                  <div className="relative w-full sm:w-2/3">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-medium font-body text-[16px]">$</span>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      className="w-full bg-surface-soft text-brand-obsidian placeholder-neutral-medium font-body text-[16px] h-[46px] rounded-[32px] sm:rounded-[32px_0px_0px_32px] pl-8 pr-5 border border-neutral-medium/30 sm:border-r-0 focus:outline-none focus:border-brand-wine focus:bg-surface-white relative z-10 transition-all mb-[12px] sm:mb-0"
                    />
                  </div>
                  <button className="w-full sm:w-1/3 bg-brand-wine hover:bg-brand-wine-dark active:bg-brand-obsidian text-surface-white font-body text-[16px] h-[40px] sm:h-[46px] rounded-[40px] sm:rounded-[0px_32px_32px_0px] px-[20px] flex items-center justify-center transition-colors">
                     Pay Instantly
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
