"use client";

import { HeaderNavigation } from "@/components/navigation";
import { ArrowDownLeft, ArrowUpRight, ArrowRight, Wallet, TrendingUp, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<any[]>([
    { id: 1, name: "Apple Store", category: "Electronics", amount: -1299.00, date: "Oct 24, 2024", status: "Completed" },
    { id: 2, name: "Stripe Transfer", category: "Income", amount: 4500.00, date: "Oct 22, 2024", status: "Completed" },
    { id: 3, name: "AWS Cloud", category: "Software", amount: -245.50, date: "Oct 21, 2024", status: "Completed" },
  ]);
  const [balance, setBalance] = useState<number>(124500.00);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);
  const supabase = createSupabaseClient();

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);
      
    if (data && data.length > 0) {
      setTransactions(data);
      const sum = data.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
      setBalance(120000.00 + sum);
    }
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTransfer = async () => {
    if (!amount || !recipient) {
      return;
    }
    
    if (!user) {
      // In a real app we'd trigger sign-in or show toast, simple alert for demo
      alert("Please sign in first.");
      return;
    }
    
    setIsTransferring(true);
    const transferAmount = -Math.abs(parseFloat(amount));
    
    const { error } = await supabase.from("transactions").insert({
      amount: transferAmount,
      name: `Transfer to ACC:${recipient}`,
      category: "Transfer",
      status: "Completed",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });

    if (!error) {
      setAmount("");
      setRecipient("");
      await fetchTransactions();
    } else {
      console.error(error);
      // Fallback optimistic UI if table doesn't exist yet
      const newTx = {
         id: Date.now(),
         name: `Transfer to ACC:${recipient}`,
         category: "Transfer",
         amount: transferAmount,
         date: "Today",
         status: "Completed"
      };
      setTransactions(prev => [newTx, ...prev].slice(0, 5));
      setBalance(prev => prev + transferAmount);
      setAmount("");
      setRecipient("");
    }
    setIsTransferring(false);
  };

  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "Guest";

  return (
    <div className="min-h-screen bg-brand-obsidian font-body text-neutral-light">
      <HeaderNavigation />

      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[32px] py-[40px] lg:py-[72px]">
        {/* Header Section */}
        <div className="mb-[40px] lg:mb-[72px]">
          <h1 className="font-display text-[32px] md:text-[42px] lg:text-[49px] font-[480] leading-[1.1] mb-4 text-surface-white">
            Good morning, {firstName}.
          </h1>
          <p className="font-display text-[16px] md:text-[21px] text-neutral-medium leading-[1.5]">
            Here is your financial overview for this week.
          </p>
        </div>

        {/* Top Grid: Overview details & Quick Transfer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[40px] lg:mb-[72px]">
          
          {/* Main Balance Card */}
          <div className="bg-surface-white p-[32px] shadow-medium rounded-[0px] lg:col-span-8 flex flex-col justify-between min-h-[240px]">
             <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
               <div>
                 <div className="flex items-center gap-3 mb-2">
                   <p className="font-body text-[14px] text-neutral-medium uppercase tracking-wider font-[600]">Total Balance</p>
                   <span className="font-mono text-[12px] text-neutral-medium bg-surface-light px-2 py-1 rounded-[4px]">ACC: 4099238102</span>
                 </div>
                 <h2 className="font-display text-[36px] md:text-[49px] font-[480] text-neutral-black leading-none">
                   ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                 </h2>
               </div>
               <div className="flex items-center gap-3 w-full sm:w-auto">
                 <button className="flex-1 sm:flex-none bg-brand-wine/10 hover:bg-brand-wine/20 text-brand-wine font-body text-[16px] h-[40px] px-[20px] rounded-[40px] flex items-center justify-center transition-colors">
                   Receive
                 </button>
                 <button className="flex-1 sm:flex-none bg-brand-wine hover:bg-brand-wine-dark active:bg-brand-obsidian text-surface-white font-body text-[16px] h-[40px] px-[20px] rounded-[40px] flex items-center justify-center transition-colors shadow-subtle">
                   Send
                 </button>
               </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
               <div>
                 <div className="flex items-center gap-2 mb-1">
                   <div className="w-6 h-6 rounded-full bg-brand-wine/10 flex items-center justify-center text-brand-wine">
                     <ArrowDownLeft className="w-3 h-3" />
                   </div>
                   <p className="font-body text-[14px] text-neutral-medium font-[600]">Income</p>
                 </div>
                 <p className="font-display text-[21px] text-neutral-black">$8,450.00</p>
               </div>
               <div>
                 <div className="flex items-center gap-2 mb-1">
                   <div className="w-6 h-6 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy">
                     <ArrowUpRight className="w-3 h-3" />
                   </div>
                   <p className="font-body text-[14px] text-neutral-medium font-[600]">Expenses</p>
                 </div>
                 <p className="font-display text-[21px] text-neutral-black">$3,240.00</p>
               </div>
             </div>
          </div>

          {/* Quick Transfer Card */}
          <div className="bg-surface-white p-[32px] shadow-medium rounded-[0px] lg:col-span-4 flex flex-col justify-between">
             <div className="flex items-center gap-3 mb-6">
                <Wallet className="text-brand-wine w-6 h-6" />
                <h3 className="font-body text-[16px] font-[400] text-neutral-black">Quick Transfer</h3>
             </div>
             
             <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="font-body text-[14px] font-[600] text-neutral-black">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-medium font-body text-[16px]">$</span>
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-surface-soft text-brand-obsidian placeholder-neutral-medium font-body text-[16px] h-[46px] rounded-[32px] pl-8 pr-5 border border-neutral-medium/30 focus:outline-none focus:border-brand-wine focus:shadow-[0px_0px_0px_2px_rgba(158,27,50,0.1)] transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-body text-[14px] font-[600] text-neutral-black">Recipient Account</label>
                  <div className="flex flex-col md:flex-row rounded-[32px]">
                    <input 
                      type="text" 
                      maxLength={10}
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value.replace(/\D/g, ''))}
                      placeholder="10-digit number"
                      className="w-full bg-surface-soft text-brand-obsidian placeholder-neutral-medium font-mono text-[16px] h-[46px] rounded-[32px] md:rounded-[32px_0px_0px_32px] px-5 border border-neutral-medium/30 md:border-r-0 focus:outline-none focus:border-brand-wine focus:bg-surface-white relative z-10 transition-all mb-[12px] md:mb-0"
                    />
                    <button 
                      onClick={handleTransfer}
                      disabled={isTransferring}
                      className="bg-brand-wine hover:bg-brand-wine-dark active:bg-brand-obsidian text-surface-white font-body text-[16px] h-[40px] md:h-[46px] rounded-[40px] md:rounded-[0px_32px_32px_0px] px-[20px] flex items-center justify-center transition-colors min-w-[120px] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                       {isTransferring ? 'Sending...' : 'Send'}
                    </button>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-surface-white p-[32px] shadow-medium rounded-[0px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h3 className="font-display text-[24px] md:text-[28px] font-[480] text-neutral-black">Recent Transactions</h3>
            
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-medium" />
              <input 
                type="text" 
                placeholder="Search..."
                className="w-full sm:w-[240px] bg-surface-soft text-brand-obsidian placeholder-neutral-medium font-body text-[16px] h-[46px] rounded-[32px] pl-10 pr-4 border border-neutral-medium/30 focus:outline-none focus:border-brand-wine focus:bg-surface-white transition-all"
              />
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
             <table className="w-full text-left font-body">
               <thead>
                 <tr className="border-b border-[#E0E0E8]">
                   <th className="py-4 text-[14px] font-[600] text-neutral-medium uppercase tracking-wider font-body">Transaction</th>
                   <th className="py-4 text-[14px] font-[600] text-neutral-medium uppercase tracking-wider font-body">Category</th>
                   <th className="py-4 text-[14px] font-[600] text-neutral-medium uppercase tracking-wider font-body">Date</th>
                   <th className="py-4 text-[14px] font-[600] text-neutral-medium uppercase tracking-wider font-body">Status</th>
                   <th className="py-4 text-[14px] font-[600] text-neutral-medium uppercase tracking-wider font-body text-right">Amount</th>
                 </tr>
               </thead>
               <tbody>
                 {transactions.map((tx, i) => (
                   <tr key={tx.id || i} className="border-b border-[rgba(237,237,243,1)] hover:bg-[rgba(237,237,243,0.2)] transition-colors">
                     <td className="py-4">
                       <p className="text-[16px] font-body text-neutral-black">{tx.name}</p>
                     </td>
                     <td className="py-4">
                       <p className="text-[16px] font-body text-neutral-medium">{tx.category}</p>
                     </td>
                     <td className="py-4">
                       <p className="text-[16px] font-body text-neutral-medium">{tx.date}</p>
                     </td>
                     <td className="py-4">
                       <span className={`text-[14px] font-body px-3 py-1 rounded-[40px] ${
                         tx.status === 'Completed' 
                          ? 'bg-brand-wine/10 text-brand-wine' 
                          : 'bg-neutral-medium/20 text-neutral-medium'
                       }`}>
                         {tx.status}
                       </span>
                     </td>
                     <td className="py-4 text-right">
                       <p className={`text-[16px] font-[480] font-body ${Number(tx.amount) > 0 ? 'text-brand-wine' : 'text-brand-obsidian'}`}>
                         {Number(tx.amount) > 0 ? '+' : ''}{Number(tx.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                       </p>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>

          {/* Mobile Grid View */}
          <div className="md:hidden flex flex-col gap-4">
            {transactions.map((tx, i) => (
              <div key={tx.id || i} className="p-[24px] border border-surface-soft bg-surface-white flex flex-col gap-3 rounded-[0px]">
                 <div className="flex justify-between items-start">
                   <div>
                     <p className="font-body text-[16px] text-neutral-black font-[600]">{tx.name}</p>
                     <p className="font-body text-[14px] text-neutral-medium mt-1">{tx.category}</p>
                   </div>
                   <p className={`font-body text-[16px] font-[480] ${Number(tx.amount) > 0 ? 'text-brand-wine' : 'text-brand-obsidian'}`}>
                     {Number(tx.amount) > 0 ? '+' : ''}{Number(tx.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                   </p>
                 </div>
                 <div className="flex justify-between items-center mt-1 pt-3 border-t border-neutral-medium/20">
                   <p className="font-body text-[14px] text-neutral-medium">{tx.date}</p>
                    <span className={`text-[12px] font-body uppercase font-[600] tracking-wider px-2 py-1 rounded-[40px] ${
                         tx.status === 'Completed' 
                          ? 'text-brand-wine bg-brand-wine/10' 
                          : 'text-neutral-medium bg-neutral-medium/20'
                       }`}>
                         {tx.status}
                    </span>
                 </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <button className="bg-transparent border border-neutral-medium text-brand-obsidian hover:bg-surface-soft font-body text-[16px] h-[40px] px-6 rounded-[40px] transition-all flex items-center gap-2">
              View All Transactions <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
