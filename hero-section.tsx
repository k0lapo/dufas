"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "Mission", href: "#mission" },
  { name: "Services", href: "#community" },
  { name: "Gallery", href: "#gallery" },
];

const slides = [
  {
    image: "/hero11.jpg",
    alt: "Safe Mothers initiative",
  },
  {
    image: "/hero2.jpg",
    alt: "Community support",
  },
  {
    image: "/hero3.jpg",
    alt: "Healthcare excellence",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  // 1. SCROLL SPY LOGIC: Updates active state based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      let current = "#hero";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = `#${section}`;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. NAVIGATION HANDLERS
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const scrollToSection = (href: string) => {
    setActiveSection(href);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      
      {/* BACKGROUND SLIDER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}
        >
          {/* Brand Overlay */}
          <div className="absolute inset-0 bg-[#025043]/45" />
        </motion.div>
      </AnimatePresence>

      {/* FLOATING GLASS NAVBAR */}
      <header className="fixed top-8 left-0 w-full z-50 px-4 flex justify-center">
        <nav className="bg-white/85 backdrop-blur-md rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.15)] border border-white/40 px-6 py-2.5 flex items-center gap-10 transition-all">
          
          <Link href="/#">
            <img 
              src="/logos.png" 
              alt="Logo" 
              className="h-12 w-auto object-contain transition-transform scale-150 origin-left" 
            />
          </Link>

          {/* Desktop Links with Active State */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-5 py-2 rounded-full text-[15px] font-semibold transition-all duration-300 ${
                    isActive 
                      ? " text-emerald-600  " 
                      : "text-[#025043] hover:bg-[#025043]/5"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Right Section: CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection("#volunteer")}
              className="hidden md:block bg-[#025043] text-white px-7 py-3 rounded-full text-[12px] font-extrabold hover:bg-[#013d33] hover:shadow-lg transition-all active:scale-95"
            >
              Join Us
            </button>

            <button 
              className="md:hidden text-[#025043] p-1 bg-white/50 rounded-full" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="md:hidden absolute top-24 w-[90%] bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 flex flex-col gap-3"
            >
              {navItems.map((item) => (
                <button 
                  key={item.name} 
                  className={`text-lg font-bold text-left px-5 py-4 rounded-2xl transition-colors ${
                      activeSection === item.href 
                        ? "bg-[#025043] text-white" 
                        : "text-[#025043] bg-[#025043]/5"
                  }`}
                  onClick={() => scrollToSection(item.href)}
                >
                  {item.name}
                </button>
              ))}
              <button 
                className="bg-[#025043] text-white text-center py-5 mt-2 rounded-2xl font-black text-xl shadow-lg"
                onClick={() => scrollToSection("#volunteer")}
              >
                JOIN NOW
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO MAIN CONTENT */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center text-white max-w-5xl"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 leading-[0.85] text-white drop-shadow-2xl">
            SAFE MOTHERS,<br />BRIGHT SMILES
          </h1>
          <p className="text-lg md:text-2xl font-medium tracking-[0.3em] mb-12 text-white/90 uppercase drop-shadow-md">
            Dr. Ufadime Seyi-Akinnubi Foundation
          </p>

          <LiquidButton
            size="lg"
            className="font-black text-lg tracking-widest px-20 py-10"
            onClick={() => scrollToSection("#volunteer")}
          >
            GET STARTED
          </LiquidButton>
        </motion.div>
      </div>

      {/* SLIDER NAVIGATION (BOTTOM) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-8 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl">
        <button onClick={prevSlide} className="text-white/70 hover:text-white transition-colors">
          <ChevronLeft size={32} />
        </button>
        
        <div className="flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2.5 transition-all duration-500 rounded-full ${
                currentSlide === i ? "w-12 bg-white" : "w-2.5 bg-white/30"
              }`}
            />
          ))}
        </div>

        <button onClick={nextSlide} className="text-white/70 hover:text-white transition-colors">
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}