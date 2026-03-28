"use client"

import { motion } from "framer-motion"
import { Heart, Copy, Check, Landmark, ShieldCheck, Zap, Coins } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function DonationSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const bankDetails = [
    { label: "Account Name", value: "Dr. Ufadime Seyi-Akinnubi Foundation", icon: <Landmark className="w-4 h-4" /> },
    { label: "Account Number", value: "5601593309", icon: <Coins className="w-4 h-4" /> },
    { label: "Bank Name", value: "Fidelity Bank Nigeria", icon: <ShieldCheck className="w-4 h-4" /> },
  ]

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <section id="donate" className="py-24 px-4 md:px-8 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Minimalist & Bold */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl text-left"
          >
            <h4 className="text-[#025043] font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#025043]"></span> Make an Impact
            </h4>
            <h2 className="text-5xl md:text-7xl font-black text-[#025043] leading-[0.9] tracking-tighter">
              SUPPORT <br /> OUR MISSION
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-slate-500 max-w-md font-medium leading-relaxed"
          >
            Your contribution provides maternal screenings and dental care to those who need it most.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Bank Details (The "Action" Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#025043]/10 p-3 rounded-2xl text-[#025043]">
                   <Landmark className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-[#025043] uppercase italic">Bank Transfer</h3>
              </div>

              <div className="space-y-4">
                {bankDetails.map((detail, idx) => (
                  <div key={idx} className="group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4 mb-1 block">
                      {detail.label}
                    </label>
                    <div 
                      onClick={() => copyToClipboard(detail.value, idx)}
                      className="flex items-center justify-between bg-slate-50 border border-slate-100 p-5 rounded-2xl cursor-pointer group-hover:border-[#025043]/30 group-hover:bg-white transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-slate-300 group-hover:text-[#025043] transition-colors">
                          {detail.icon}
                        </span>
                        <p className="font-bold text-slate-800 md:text-lg tracking-tight">
                          {detail.value}
                        </p>
                      </div>
                      <div className={cn(
                        "p-2 rounded-xl transition-all",
                        copiedIndex === idx ? "bg-emerald-500 text-white" : "bg-slate-200/50 text-slate-400 group-hover:bg-[#025043] group-hover:text-white"
                      )}>
                        {copiedIndex === idx ? <Check size={18} /> : <Copy size={18} />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-[#025043]/5 rounded-2xl border border-[#025043]/10 flex gap-4">
                <Zap className="w-5 h-5 text-[#025043] shrink-0" />
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Please use your name as the payment reference so we can acknowledge your kindness.
                </p>
              </div>
            </div>
            
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#025043]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          </motion.div>

          {/* RIGHT: Why Support Us (The "Trust" Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-[#025043] rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden">
               <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                 <Heart className="w-6 h-6 fill-white" /> Why Support Us?
               </h3>
               <ul className="space-y-5">
                 {[
                   { t: "Maternal Health", d: "Screenings to prevent birth complications." },
                   { t: "Child Dental", d: "Preventive care for children aged 3-15." },
                   { t: "Health Literacy", d: "Educating families on early warning signs." },
                   { t: "Direct Impact", d: "Every Naira goes to community service." }
                 ].map((item, i) => (
                   <li key={i} className="flex gap-4">
                     <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                       <Check className="w-3 h-3 text-white" />
                     </div>
                     <div>
                       <span className="block font-bold text-lg leading-tight">{item.t}</span>
                       <span className="text-white/70 text-sm font-medium">{item.d}</span>
                     </div>
                   </li>
                 ))}
               </ul>
            </div>

            {/* Micro-Impact Statement */}
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
                <p className="text-slate-600 font-medium leading-relaxed">
                  <span className="text-[#025043] font-black text-xl">₦5,000</span> screens a mother for complications. <br />
                  <span className="text-[#025043] font-black text-xl">₦10,000</span> treats five children.
                </p>
                <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "70%" }}
                    transition={{ duration: 2 }}
                    className="h-full bg-[#025043]" 
                  />
                </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}