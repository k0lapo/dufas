"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Heart, Stethoscope, BookOpen, Briefcase, Users, Laptop, Palette, CheckCircle2, X } from "lucide-react"
import { useState } from "react"
import VolunteerForm from "./volunteer-form"

export default function VolunteerSection() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  const opportunities = [
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: "Healthcare Professionals",
      description: "Doctors, nurses, and dental professionals providing critical screenings.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Health Educators",
      description: "Empower communities through maternal health and preventive care workshops.",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Administrative Support",
      description: "Streamline operations, coordination, and program management.",
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Outreach",
      description: "Mobilize local communities and connect families to vital health resources.",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: <Laptop className="w-6 h-6" />,
      title: "Technical Skills",
      description: "Support our mission through web development and data management.",
      color: "bg-slate-50 text-slate-600",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Creative Talents",
      description: "Design and content creation for high-impact awareness campaigns.",
      color: "bg-rose-50 text-rose-600",
    },
  ]

  return (
    <>
      <section id="volunteer" className="py-24 px-4 md:px-8 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl text-left"
            >
              <h4 className="text-[#025043] font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-[#025043]"></span> Support Our Cause
              </h4>
              <h2 className="text-5xl md:text-7xl font-black text-[#025043] leading-[0.9] tracking-tighter">
                VOLUNTEER <br /> WITH US
              </h2>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-slate-500 max-w-md font-medium leading-relaxed"
            >
              Join a dedicated team of professionals changing lives in underserved communities. We need your unique skills.
            </motion.p>
          </div>

          {/* Modern Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {opportunities.map((opp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative bg-white border border-slate-200 p-8 rounded-[2rem] hover:bg-[#025043] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500 group-hover:bg-white/20 group-hover:text-white", opp.color)}>
                  {opp.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-white transition-colors duration-500">{opp.title}</h3>
                <p className="text-slate-500 leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                  {opp.description}
                </p>
                
                {/* Decorative background element */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-50 rounded-full group-hover:bg-white/5 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Interactive Feature List & CTA */}
          <div className="grid lg:grid-cols-2 gap-12 items-center bg-[#025043] rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-8">Why join our mission?</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  "Direct Impact on Health",
                  "Professional Networking",
                  "Flexible Arrangements",
                  "Specialized Training",
                  "Passionate Community",
                  "Field Experience"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-400 w-5 h-5 shrink-0" />
                    <span className="font-medium text-white/90">{item}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => setIsFormOpen(true)}
                className="mt-12 inline-flex items-center gap-3 px-10 py-5 bg-white text-[#025043] font-black text-lg rounded-full transition-all hover:scale-105 shadow-xl hover:shadow-white/10"
              >
                BECOME A VOLUNTEER
                <Heart className="w-5 h-5 fill-[#025043]" />
              </button>
            </div>

            <div className="hidden lg:block relative h-64 opacity-20">
               {/* Aesthetic abstract shapes */}
               <div className="absolute top-0 right-0 w-64 h-64 border-[40px] border-white/10 rounded-full" />
               <div className="absolute bottom-0 left-20 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* RE-ENGINEERED MODAL */}
<AnimatePresence>
  {isFormOpen && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsFormOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-y-auto no-scrollbar"
      >
        <button 
          onClick={() => setIsFormOpen(false)}
          className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors z-10"
        >
          <X className="w-6 h-6 text-slate-600" />
        </button>

        <div className="p-8 md:p-12">
          {/* PASS THE PROPS HERE TO FIX THE ERROR */}
          <VolunteerForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
    </>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}