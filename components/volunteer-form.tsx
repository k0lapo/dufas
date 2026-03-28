"use client"

import { motion } from "framer-motion"
import { Users, X, CheckCircle, AlertCircle, Loader2, ChevronDown } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FormData {
  name: string
  age: string
  email: string
  phone: string
  sex: string
  skills: string
  reason: string
}

interface VolunteerFormProps {
  isOpen: boolean
  onClose: () => void
}

export default function VolunteerForm({ isOpen, onClose }: VolunteerFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    email: "",
    phone: "",
    sex: "",
    skills: "",
    reason: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, sex: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to submit form")

      setSubmitStatus("success")
      setFormData({ name: "", age: "", email: "", phone: "", sex: "", skills: "", reason: "" })

      setTimeout(() => {
        onClose()
        setSubmitStatus("idle")
      }, 3500)
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="w-full">
      {/* Success State */}
      {submitStatus === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center py-10"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-black text-[#025043] mb-3 uppercase italic">Application Sent!</h2>
          <p className="text-slate-500 max-w-xs font-medium">
            Thank you for stepping up. Our team will review your details and reach out shortly.
          </p>
        </motion.div>
      ) : (
        <>
          <div className="mb-10">
            <h4 className="text-[#025043] font-bold tracking-[0.2em] text-xs uppercase mb-2">Join the mission</h4>
            <h2 className="text-4xl font-black text-[#025043] leading-none tracking-tighter italic uppercase">
              Become a Volunteer
            </h2>
          </div>

          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-3 items-center"
            >
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <p className="text-sm font-semibold text-red-800">{errorMessage}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-[#025043] ml-1">Full Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Jane Doe"
                  required
                  className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:ring-2 focus:ring-[#025043]/10 focus:border-[#025043] transition-all"
                />
              </div>

              {/* Age */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-[#025043] ml-1">Age</label>
                <Input
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="age"
                  required
                  className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:ring-2 focus:ring-[#025043]/10 focus:border-[#025043] transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-[#025043] ml-1">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  required
                  className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:ring-2 focus:ring-[#025043]/10 focus:border-[#025043] transition-all"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-[#025043] ml-1">Phone Number</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234..."
                  required
                  className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:ring-2 focus:ring-[#025043]/10 focus:border-[#025043] transition-all"
                />
              </div>
            </div>

            {/* Sex Select */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-[#025043] ml-1">Gender</label>
              <Select value={formData.sex} onValueChange={handleSelectChange}>
                <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:ring-2 focus:ring-[#025043]/10 focus:border-[#025043]">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-200 shadow-xl">
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                  <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Skills */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-[#025043] ml-1">Skills & Expertise</label>
              <Textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="List your healthcare or technical skills..."
                required
                className="rounded-2xl bg-slate-50 border-slate-200 focus:ring-2 focus:ring-[#025043]/10 focus:border-[#025043] resize-none py-4 transition-all"
                rows={2}
              />
            </div>

            {/* Reason */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-[#025043] ml-1">Motivation</label>
              <Textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="What drives you to join our foundation?"
                required
                className="rounded-2xl bg-slate-50 border-slate-200 focus:ring-2 focus:ring-[#025043]/10 focus:border-[#025043] resize-none py-4 transition-all"
                rows={2}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-16 bg-[#025043] hover:bg-[#013d33] text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-[#025043]/20 transition-all active:scale-[0.98]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" /> SUBMITTING...
                </span>
              ) : (
                "SUBMIT APPLICATION"
              )}
            </Button>
          </form>
        </>
      )}
    </div>
  )
}