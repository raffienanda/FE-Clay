'use client'

import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Navigation,
  Plus,
  Minus,
  Crosshair,
} from 'lucide-react'
import Image from 'next/image'
import type { Screen } from '@/app/page'

interface PickupMapProps {
  onNavigate: (screen: Screen) => void
}

export function PickupMap({ onNavigate }: PickupMapProps) {
  return (
    <div className="h-full flex flex-col bg-[#E8F4FF] relative">
      {/* Full Screen Map */}
      <div className="flex-1 relative">
        {/* Map Background */}
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oQYqsMJKeOPL4EUQzEeyeUyRucQYQs.png"
            alt="Map Bandung"
            fill
            className="object-cover"
          />
        </div>

        {/* Center Pickup Pin */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative"
          >
            {/* Pin Shadow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-2 bg-black/20 rounded-full blur-sm" />
            
            {/* Pin */}
            <div className="relative">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <Navigation className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-primary" />
            </div>

            {/* Pulse Animation */}
            <div className="absolute inset-0 -m-4">
              <div className="w-full h-full bg-primary/20 rounded-full animate-ping" />
            </div>
          </motion.div>
        </div>

        {/* Back Button */}
        <div className="absolute top-4 left-5">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('destination')}
            className="w-10 h-10 rounded-full glass shadow-soft flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
        </div>

        {/* Map Controls */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl glass shadow-soft flex items-center justify-center"
          >
            <Plus className="w-5 h-5 text-foreground" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl glass shadow-soft flex items-center justify-center"
          >
            <Minus className="w-5 h-5 text-foreground" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl glass shadow-soft flex items-center justify-center"
          >
            <Crosshair className="w-5 h-5 text-primary" />
          </motion.button>
        </div>
      </div>

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="glass rounded-t-[32px] shadow-elevated border-t border-white/30"
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-muted rounded-full" />
        </div>

        <div className="px-5 pb-8">
          {/* Address Display */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-1">Lokasi Penjemputan</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Navigation className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Jl. Sudirman</p>
                <p className="text-xs text-muted-foreground">Dekat Gedung Wisma 46</p>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('confirm-destination')}
            className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center shadow-soft"
          >
            <span className="text-white font-semibold">Konfirmasi Titik Jemput</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
