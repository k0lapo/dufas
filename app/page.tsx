"use client"

import HeroSection from "../hero-section"
import TextGradientScroll from "@/components/ui/text-gradient-scroll"
import { Timeline } from "@/components/ui/timeline"
import "./globals.css"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import { motion } from "framer-motion"
import Chatbot from "../components/chatbot"
import DonationSection from "@/components/donation-section"
import VolunteerSection from "@/components/volunteer-section"
import GallerySection from "@/components/gallery-section"
import Footer from "@/components/footer"

export default function Page() {
  const missionStatement =
    "To improve maternal and child health outcomes in underserved communities by providing integrated preventive dental services, basic maternal health screening, and structured education on early warning signs of pregnancy-related complications."

  const timelineEntries = [
    {
      id: 1,
      image: "/maternal.jpg",
      alt: "Pregnant woman receiving health screening",
      title: "Maternal Health Screening",
      description: "We provide comprehensive basic maternal health screenings for pregnant women in underserved communities. Early detection of complications can be life-saving.",
      layout: "left" as const,
    },
    {
      id: 2,
      image: "/child-dent.jpg",
      alt: "Child receiving dental care",
      title: "Preventive Dental Services",
      description: "Oral health is essential to overall wellness. We offer integrated preventive dental services for children aged 3-15, ensuring healthy smiles.",
      layout: "right" as const,
    },
    {
      id: 3,
      image: "/education.jpg",
      alt: "Community health education session",
      title: "Health Education",
      description: "Knowledge is power. We provide structured education on early warning signs of pregnancy-related complications and preventive health practices.",
      layout: "left" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-[#025043] selection:text-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Mission Statement Section */}
      <section id="mission" className="relative py-32 md:py-48 bg-white overflow-hidden">
        {/* Brand Accent Blur */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#025043]/5 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/20 rounded-full blur-[120px] -ml-64 -mb-64" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl">
            <motion.h4 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#025043] font-bold tracking-[0.3em] uppercase mb-8 flex items-center gap-3 text-xs md:text-sm"
            >
              <span className="w-12 h-[2px] bg-[#025043]"></span> Our Core Purpose
            </motion.h4>
            
            <TextGradientScroll
              text={missionStatement}
              className="text-4xl md:text-5xl lg:text-6xl font-black italic uppercase leading-[0.95] tracking-tighter"
              type="word"
              textOpacity="soft"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="community" className="relative py-32 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-6 mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h4 className="text-[#025043] font-bold tracking-[0.2em] uppercase mb-4 text-xs">Commitment</h4>
              <h2 className="text-5xl md:text-7xl font-black text-[#025043] italic uppercase leading-none tracking-tighter">
                SERVICES WE <br /> PROVIDE
              </h2>
            </div>
            <p className="text-xl text-slate-500 max-w-sm font-medium leading-relaxed">
              Comprehensive healthcare designed to reach the mothers and children who need it most.
            </p>
          </div>
        </div>

        <Timeline entries={timelineEntries} />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-32 bg-white">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h4 className="text-[#025043] font-bold tracking-[0.2em] uppercase mb-4 text-xs text-center">Testimonials</h4>
            <h2 className="text-5xl md:text-7xl font-black text-center text-[#025043] italic uppercase leading-none tracking-tighter mb-8">
              VOICES OF <br /> THE FAMILIES
            </h2>
          </motion.div>

          <StaggerTestimonials />
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />

      {/* Engagement Sections */}
      <div className="bg-[#F8FAFC]">
        <VolunteerSection />
        <DonationSection />
      </div>

      <Footer />
      <Chatbot />
    </div>
  )
}