import { HeaderNavigation } from "@/components/navigation";

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-brand-obsidian font-body text-neutral-light">
      <HeaderNavigation />
      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[32px] py-[40px] lg:py-[72px]">
        <div className="mb-[40px] lg:mb-[72px]">
          <h1 className="font-display text-[32px] md:text-[42px] lg:text-[49px] font-[480] leading-[1.1] mb-4 text-surface-white">
            Transactions
          </h1>
          <p className="font-display text-[16px] md:text-[21px] text-neutral-medium leading-[1.5]">
            View and manage your complete transaction history.
          </p>
        </div>
        <div className="bg-surface-white p-[32px] shadow-medium rounded-[0px]">
           <p className="text-neutral-medium font-body text-[16px]">Transaction history details will appear here.</p>
        </div>
      </main>
    </div>
  );
}
