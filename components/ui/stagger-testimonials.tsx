"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const SQRT_5000 = Math.sqrt(5000)

// NGO-tailored testimonials
const testimonials = [
  {
    tempId: 0,
    testimonial:
      "The foundation provided me with the medical care I couldn't afford. Because of their support, I had a safe delivery and my baby is thriving.",
    by: "Amina Bello, Mother of two",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=AminaBello&backgroundColor=025043&textColor=ffffff",
  },
  {
    tempId: 1,
    testimonial:
      "Witnessing the 'Bright Smiles' initiative firsthand was life-changing. We aren't just giving aid; we are building a safer future for every mother.",
    by: "Dr. Adeyemi, Volunteer Physician",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=DrAdeyemi&backgroundColor=025043&textColor=ffffff",
  },
  {
    tempId: 2,
    testimonial:
      "The prenatal workshops gave me the confidence I needed. I learned how to care for myself and my child in ways I never knew before.",
    by: "Chioma Okoro, New Mother",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=ChiomaOkoro&backgroundColor=025043&textColor=ffffff",
  },
  {
    tempId: 3,
    testimonial:
      "This foundation is a beacon of hope. They reached our remote village when no one else would, ensuring every woman was seen and heard.",
    by: "Sarah Abraham, Community Leader",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=SarahAbraham&backgroundColor=025043&textColor=ffffff",
  },
  {
    tempId: 4,
    testimonial:
      "Serving as a volunteer has been the most rewarding experience of my career. The dedication to maternal health here is unmatched.",
    by: "Nurse Joy, Foundation Staff",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=NurseJoy&backgroundColor=025043&textColor=ffffff",
  },
  {
    tempId: 5,
    testimonial:
      "The safe delivery kits provided by the foundation saved my life during an emergency. I am eternally grateful to Dr. Ufadime and the team.",
    by: "Fatima Yusuf, Beneficiary",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=FatimaYusuf&backgroundColor=025043&textColor=ffffff",
  },
]

interface TestimonialCardProps {
  position: number
  testimonial: (typeof testimonials)[0]
  handleMove: (steps: number) => void
  cardSize: number
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0
  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-[#025043] text-white border-[#025043]" // Applied NGO Green
          : "z-0 bg-white text-gray-900 border-gray-200 hover:border-[#025043]/30",
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 24px rgba(2, 80, 67, 0.3)" : "none",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-white/20"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <img
        src={testimonial.imgSrc || "/placeholder.svg"}
        alt={`${testimonial.by.split(",")[0]}`}
        className="mb-4 h-16 w-16 rounded-full bg-white/10 object-cover p-1 border border-white/20"
      />
      <h3 className={cn("text-base sm:text-xl font-semibold leading-snug", isCenter ? "text-white" : "text-[#025043]")}>
        "{testimonial.testimonial}"
      </h3>
      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 text-sm font-medium",
          isCenter ? "text-white/80" : "text-gray-500",
        )}
      >
        — {testimonial.by}
      </p>
    </div>
  )
}

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365)
  const [testimonialsList, setTestimonialsList] = useState(testimonials)

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList]
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift()
        if (!item) return
        newList.push({ ...item, tempId: Math.random() })
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop()
        if (!item) return
        newList.unshift({ ...item, tempId: Math.random() })
      }
    }
    setTestimonialsList(newList)
  }

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)")
      setCardSize(matches ? 380 : 300)
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return (
    <div className="relative w-full overflow-hidden bg-gray-50/50" style={{ height: 650 }}>
      <div className="text-center">
          <h2 className="text-[#025043] text-3xl md:text-4xl font-black uppercase tracking-tight">Our Impact</h2>
          <p className="text-gray-500 font-medium">Voices from the mothers and volunteers we serve</p>
      </div>

      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2 ? index - (testimonialsList.length + 1) / 2 : index - testimonialsList.length / 2
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-4">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full transition-all",
            "bg-white border-2 border-[#025043]/20 text-[#025043] hover:bg-[#025043] hover:text-white shadow-sm",
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full transition-all",
            "bg-white border-2 border-[#025043]/20 text-[#025043] hover:bg-[#025043] hover:text-white shadow-sm",
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}