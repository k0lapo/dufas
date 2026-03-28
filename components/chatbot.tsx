"use client"

import { useState, useRef, useEffect, type FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, X, Heart, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface Message {
  role: "user" | "bot"
  content: string
}

const generateSessionId = () => `session_${Date.now()}`

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hello! I'm your Foundation Assistant. How can I help you support our mission today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && !sessionId) setSessionId(generateSessionId())
  }, [isOpen, sessionId])

  // Improved Scroll to bottom
  useEffect(() => {
    const scrollContainer = document.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isLoading])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMsg = input
    setMessages((prev) => [...prev, { role: "user", content: userMsg }])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, sessionId }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error)

      setMessages((prev) => [...prev, { role: "bot", content: data.reply }])
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", content: "I'm having trouble connecting. Please try again later." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="mb-4 w-[calc(100vw-48px)] sm:w-[400px] origin-bottom-right"
          >
            <Card className="h-[550px] flex flex-col shadow-2xl border-[#025043]/20 rounded-[2rem] overflow-hidden">
              <CardHeader className="bg-[#025043] text-white py-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-black italic flex items-center gap-2 tracking-tight">
                    <Sparkles className="text-emerald-400 w-5 h-5" />
                    DUSAF AI
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10 rounded-full">
                    <X size={20} />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-grow p-0 bg-slate-50">
                <ScrollArea className="h-[380px] p-6" ref={scrollAreaRef}>
                  <div className="space-y-6">
                    {messages.map((m, i) => (
                      <div key={i} className={cn("flex items-start gap-3", m.role === "user" ? "justify-end" : "justify-start")}>
                        {m.role === "bot" && (
                          <div className="w-8 h-8 rounded-full bg-[#025043] flex items-center justify-center shrink-0">
                            <Heart size={14} className="text-white fill-white" />
                          </div>
                        )}
                        <div className={cn(
                          "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                          m.role === "user" ? "bg-[#025043] text-white rounded-tr-none" : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                        )}>
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-2 p-4 bg-white rounded-2xl w-fit border border-slate-100 animate-pulse">
                        <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="p-4 bg-white border-t border-slate-100">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask us anything..."
                    className="flex-1 rounded-xl border-slate-200 focus-visible:ring-[#025043]"
                  />
                  <Button type="submit" disabled={isLoading} className="bg-[#025043] hover:bg-[#025043]/90 rounded-xl">
                    <Send size={18} />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#025043] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" />}
      </motion.button>
    </div>
  )
}