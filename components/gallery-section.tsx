"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Images, X, Maximize2, Loader2, PlusCircle } from "lucide-react"
import { useState, useEffect } from "react"

interface GalleryImage {
  id: string
  url: string
  caption: string
  alt: string
  category?: string
}

export default function GallerySection() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  // Professional Placeholders that look like NGO work
  const placeholderImages: GalleryImage[] = [
    { id: "1", url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000", caption: "Community Outreach Program", alt: "Outreach", category: "Community" },
     { id: "3", url: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=800", caption: "Child Dental Initiative", alt: "Dental", category: "Dental" },
    { id: "4", url: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?q=80&w=1000", caption: "Preventive Care Workshop", alt: "Workshop", category: "Education" },
    { id: "5", url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=800", caption: "Healthcare Consultation", alt: "Consultation", category: "Medical" },
    { id: "6", url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800", caption: "Team Training Session", alt: "Training", category: "Community" },
  ]

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch("/api/gallery")
        if (response.ok) {
          const data = await response.json()
          setGalleryImages(data.images?.length > 0 ? data.images : placeholderImages)
        } else {
          setGalleryImages(placeholderImages)
        }
      } catch (error) {
        setGalleryImages(placeholderImages)
      } finally {
        setIsLoading(false)
      }
    }
    fetchGalleryImages()
  }, [])

  return (
    <section id="gallery" className="py-24 px-4 md:px-8 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Consistent with your Brand Style */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl text-left"
          >
            <h4 className="text-[#025043] font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#025043]"></span> Visual Impact
            </h4>
            <h2 className="text-5xl md:text-7xl font-black text-[#025043] leading-[0.9] tracking-tighter">
              OUR WORK IN <br /> COMMUNITIES
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-slate-500 max-w-sm font-medium leading-relaxed"
          >
            A visual record of our mission to restore smiles and protect motherhood across underserved regions.
          </motion.p>
        </div>

        {/* Gallery Grid - Editorial Masonry-like Layout */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-96 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-[#025043]" />
            <p className="text-[#025043] font-bold tracking-widest uppercase text-xs">Loading Gallery...</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative group cursor-pointer break-inside-avoid rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  crossOrigin="anonymous"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#025043]/90 via-[#025043]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/20">
                      {image.category || 'Impact'}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-xl leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {image.caption}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-[0.2em] transform opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                    <Maximize2 size={14} /> View Full Image
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer Link (Simulated for Admin) */}
        <div className="mt-16 text-center">
            <p className="text-slate-400 text-sm font-medium italic">
              New photos are added weekly by our field coordinators.
            </p>
        </div>
      </div>

      {/* Lightbox / Full-Screen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-[#025043]/95 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full z-10"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-16 right-0 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
              >
                <X size={24} />
              </button>
              
              <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  className="w-full h-auto max-h-[70vh] object-cover"
                />
                <div className="p-8 md:p-10 bg-white">
                   <h3 className="text-3xl font-black text-[#025043] uppercase italic mb-2">
                     {selectedImage.caption}
                   </h3>
                   <p className="text-slate-500 font-medium">
                     Part of our ongoing mission to improve healthcare access in underserved regions.
                   </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}