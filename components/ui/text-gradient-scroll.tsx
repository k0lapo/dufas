"use client"

import type React from "react"
import { createContext, useContext, useRef } from "react"
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

type TextOpacityEnum = "none" | "soft" | "medium"
type ViewTypeEnum = "word" | "letter"

type TextGradientScrollType = {
  text: string
  type?: ViewTypeEnum
  className?: string
  textOpacity?: TextOpacityEnum
}

type LetterType = {
  children: string
  progress: MotionValue<number>
  range: number[]
}

type WordType = {
  children: React.ReactNode
  progress: MotionValue<number>
  range: number[]
}

type CharType = {
  children: React.ReactNode
  progress: MotionValue<number>
  range: number[]
}

type TextGradientScrollContextType = {
  textOpacity?: TextOpacityEnum
  type?: ViewTypeEnum
}

const TextGradientScrollContext = createContext<TextGradientScrollContextType>({})

function useGradientScroll() {
  const context = useContext(TextGradientScrollContext)
  return context
}

/**
 * Enhanced for Foundation UI: 
 * Uses #025043, tighter tracking, and high-impact reveal logic.
 */
export default function TextGradientScroll({ 
  text, 
  className, 
  type = "letter", 
  textOpacity = "soft" 
}: TextGradientScrollType) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.2"], // Adjusted for a smoother reveal in the viewport
  })

  const words = text.split(" ")

  return (
    <TextGradientScrollContext.Provider value={{ textOpacity, type }}>
      <p 
        ref={ref} 
        className={cn(
          "relative flex flex-wrap leading-[1.1] tracking-tighter text-[#025043]", 
          className
        )}
      >
        {words.map((word, i) => {
          const start = i / words.length
          const end = start + 1 / words.length
          return type === "word" ? (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          ) : (
            <Letter key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Letter>
          )
        })}
      </p>
    </TextGradientScrollContext.Provider>
  )
}

const Word = ({ children, progress, range }: WordType) => {
  const opacity = useTransform(progress, range, [0, 1])
  const scale = useTransform(progress, range, [0.98, 1]) // Subtle scale for impact

  return (
    <span className="relative me-[0.25em] mb-2">
      <span className="absolute opacity-[0.08] select-none">{children}</span>
      <motion.span
        style={{
          opacity: opacity,
          scale: scale,
        }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  )
}

const Letter = ({ children, progress, range }: LetterType) => {
  const amount = range[1] - range[0]
  const step = amount / children.length
  return (
    <span className="relative me-[0.3em] mb-2 inline-flex">
      {children.split("").map((char: string, i: number) => {
        const start = range[0] + i * step
        const end = range[0] + (i + 1) * step
        return (
          <Char key={`c_${i}`} progress={progress} range={[start, end]}>
            {char}
          </Char>
        )
      })}
    </span>
  )
}

const Char = ({ children, progress, range }: CharType) => {
  const opacity = useTransform(progress, range, [0, 1])
  const y = useTransform(progress, range, [4, 0]) // Tiny lift effect
  const { textOpacity } = useGradientScroll()

  return (
    <span className="relative inline-block">
      <span
        className={cn("absolute select-none", {
          "opacity-0": textOpacity === "none",
          "opacity-[0.08]": textOpacity === "soft",
          "opacity-[0.15]": textOpacity === "medium",
        })}
      >
        {children}
      </span>
      <motion.span
        style={{
          opacity: opacity,
          y: y,
        }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  )
}

export { TextGradientScroll }
