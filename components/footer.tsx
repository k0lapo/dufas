"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Instagram, Twitter, Heart } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#025043] text-white pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 border-b border-white/10 pb-16">
          
          {/* Brand Column */}
          <div className="max-w-md">
            <h2 className="text-3xl font-black tracking-tighter italic leading-none mb-4">
              DR. UFADIME SEYI-AKINNUBI <br />
              <span className="text-emerald-400">FOUNDATION</span>
            </h2>
            <p className="text-white/60 font-medium leading-relaxed mb-8">
              Ensuring safe motherhood and bright smiles for underserved communities through medical and dental outreach.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter].map((Icon, i) => (
                <Link key={i} href="#" className="w-11 h-11 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10 transition-all border border-white/10">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Contact Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 lg:gap-16">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Visit Us</h4>
              <p className="text-white/80 font-bold text-sm leading-tight flex gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                Lagos, Nigeria
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Reach Out</h4>
              <a href="mailto:info@ufadimefoundation.org" className="text-white/80 font-bold text-sm block hover:text-emerald-400 transition-colors">
                info@ufadimefoundation.org
              </a>
              <a href="tel:+234000000000" className="text-white/80 font-bold text-sm block hover:text-emerald-400 transition-colors">
                +234 (0) 000 000 0000
              </a>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Quick Links</h4>
              <nav className="flex flex-col gap-2">
                <Link href="#volunteer" className="text-white/60 hover:text-white text-sm font-bold transition-colors">Volunteer</Link>
                <Link href="#donate" className="text-white/60 hover:text-white text-sm font-bold transition-colors">Donate</Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col justify-between items-center gap-4">
          <p className="text-white/30 text-xs font-bold tracking-wider uppercase">
            © {currentYear} ALL RIGHTS RESERVED
          </p>
          
         
        </div>
      </div>
    </footer>
  )
}