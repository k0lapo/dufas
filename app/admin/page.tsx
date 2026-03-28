"use client"

import { useState, useEffect, useRef } from "react"
import { Upload, Trash2, Image as ImageIcon, AlertCircle, CheckCircle2, Loader2, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

interface GalleryImage {
  id: string | number; // Update this
  url: string;
  caption: string;
  alt: string;
}

export default function AdminDashboard() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [caption, setCaption] = useState("")
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; msg: string }>({
    type: "idle",
    msg: "",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  // 1. Fetch existing images from your API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/gallery")
        if (!res.ok) throw new Error("Failed to load")
        const data = await res.json()
        setImages(data.images || [])
      } catch (err) {
        console.error("Gallery fetch error:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchImages()
  }, [])

  // 2. Handle File Selection & Preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!selectedFile || !caption) return

  setIsUploading(true)
  console.log("🚀 Starting upload process...")

  try {
    const fileExt = selectedFile.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `uploads/${fileName}`

    // STEP 1: UPLOAD TO STORAGE
    console.log("📤 Attempting to push to Supabase Storage bucket: 'gallery-images'...")
    const { error: uploadError, data } = await supabase.storage
      .from('gallery-images') 
      .upload(filePath, selectedFile)

    if (uploadError) {
      console.error("❌ STORAGE ERROR:", uploadError.message, uploadError)
      throw new Error(`Storage failed: ${uploadError.message}`)
    }

    console.log("✅ Storage success! Getting public URL...")
    const { data: { publicUrl } } = supabase.storage
      .from('gallery-images')
      .getPublicUrl(filePath)

    // STEP 2: SAVE TO DATABASE
    console.log("💾 Saving URL to database table: 'gallery'...")
    const response = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: publicUrl, caption, alt: caption }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("❌ DATABASE ERROR:", errorData)
      throw new Error("Database sync failed")
    }

    const newImage = await response.json()
    setImages([newImage, ...images])
    setStatus({ type: "success", msg: "Asset published successfully!" })
    
    // Reset
    setCaption(""); setSelectedFile(null); setPreviewUrl(null)
  } catch (error: any) {
    console.error("🕵️ Full Error Details:", error)
    setStatus({ type: "error", msg: error.message || "Upload failed." })
  } finally {
    setIsUploading(false)
  }
}
const handleDelete = async (id: string | number) => {
  try {
    // We pass the ID as a query string: ?id=123
    const response = await fetch(`/api/gallery?id=${encodeURIComponent(String(id))}`, { 
      method: "DELETE" 
    });
    
    if (!response.ok) throw new Error("Delete failed");
    
    setImages((prev) => prev.filter((img) => String(img.id) !== String(id)));
    setStatus({ type: "success", msg: "Asset removed successfully." });
  } catch (err) {
    setStatus({ type: "error", msg: "Could not delete image." });
  }
  setTimeout(() => setStatus({ type: "idle", msg: "" }), 2000);
};

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 selection:bg-[#025043] selection:text-white">
      {/* Brand Header */}
      <header className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
          <h4 className="text-[#025043] font-bold tracking-[0.3em] uppercase mb-3 text-xs">Administrative Portal</h4>
          <h1 className="text-5xl md:text-7xl font-black text-[#025043] italic uppercase leading-none tracking-tighter">
            Gallery <br /> Management
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Sticky Upload Panel */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-10 sticky top-12">
            <h2 className="text-2xl font-black text-[#025043] uppercase italic mb-8 flex items-center gap-3">
              <Plus className="w-6 h-6" /> Add New Content
            </h2>

            <form onSubmit={handleUpload} className="space-y-6">
              {/* File Dropzone */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "relative aspect-video rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden",
                  previewUrl ? "border-[#025043] bg-white" : "border-slate-200 bg-slate-50 hover:bg-slate-100/50"
                )}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="image/*" 
                />
                
                {previewUrl ? (
                  <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="flex flex-col items-center text-slate-400">
                    <Upload className="w-10 h-10 mb-2" />
                    <p className="text-[10px] uppercase font-black tracking-widest">Select Image Asset</p>
                  </div>
                )}
              </div>

              {/* Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-black tracking-widest text-[#025043] mb-2 block">Image Caption</label>
                  <Input
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="e.g., Free Medical Outreach 2026"
                    className="h-12 rounded-xl border-slate-200 focus-visible:ring-[#025043] font-medium"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isUploading || !selectedFile || !caption}
                className="w-full bg-[#025043] hover:bg-[#025043]/90 text-white h-14 rounded-2xl font-black uppercase tracking-widest transition-transform active:scale-95 shadow-lg shadow-[#025043]/20"
              >
                {isUploading ? <Loader2 className="animate-spin" /> : "Publish to Gallery"}
              </Button>
            </form>

            <AnimatePresence>
              {status.type !== "idle" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className={cn(
                    "mt-6 p-4 rounded-2xl text-sm font-bold flex items-center gap-3",
                    status.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                  )}
                >
                  {status.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  {status.msg}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Gallery Grid */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-[#025043] uppercase italic flex items-center gap-3">
              <ImageIcon className="w-6 h-6" /> Live Assets
            </h3>
            <div className="px-4 py-1.5 rounded-full bg-[#025043] text-white text-[10px] font-black uppercase tracking-widest">
              {images.length} Total
            </div>
          </div>

          {isLoading ? (
            <div className="py-32 flex flex-col items-center justify-center text-slate-300">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p className="uppercase font-black text-[10px] tracking-widest">Synchronizing Database...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 py-32 text-center">
              <p className="text-slate-400 italic font-medium tracking-tight">Gallery is currently empty.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {images.map((image) => (
                <motion.div 
                  layout
                  key={image.id} 
                  className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img src={image.url} alt={image.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <button 
                      onClick={() => handleDelete(image.id)}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white shadow-xl"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="p-6">
                    <p className="text-[#025043] font-black uppercase text-sm mb-1 italic leading-tight">{image.caption}</p>
                   <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    Asset ID: {String(image.id).slice(-6)}
                  </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}