'use client'

import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Navigation,
  Plus,
  Minus,
  Crosshair,
} from 'lucide-react'
import type { Screen } from '@/app/page'

interface PickupMapProps {
  onNavigate: (screen: Screen) => void
}

export function PickupMap({ onNavigate }: PickupMapProps) {
  return (
    <div className="h-full flex flex-col bg-[#E8F4FF] relative">
      {/* Full Screen Map */}
      <div className="flex-1 relative">
        {/* Map Pattern */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mapGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#8BBEFF" strokeWidth="0.5" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mapGrid)" />
          </svg>
        </div>

        {/* Simulated Roads */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main Road */}
          <div className="absolute w-full h-3 bg-white/80 top-1/3 left-0 shadow-sm" />
          <div className="absolute w-3 h-full bg-white/80 left-1/4 top-0 shadow-sm" />
          <div className="absolute w-full h-2 bg-white/60 top-2/3 left-0 rotate-12" />
          <div className="absolute w-2 h-full bg-white/60 right-1/3 top-0" />
        </div>

        {/* Buildings */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-8 w-16 h-20 bg-[#D4E9FF] rounded-lg shadow-sm" />
          <div className="absolute top-32 right-12 w-12 h-16 bg-[#C5DFFF] rounded-lg shadow-sm" />
          <div className="absolute bottom-40 left-16 w-20 h-14 bg-[#D4E9FF] rounded-lg shadow-sm" />
          <div className="absolute bottom-60 right-8 w-14 h-24 bg-[#C5DFFF] rounded-lg shadow-sm" />
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
