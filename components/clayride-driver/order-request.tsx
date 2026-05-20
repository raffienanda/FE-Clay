'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Navigation,
  Clock,
  Banknote,
  User,
  Star,
  X,
  Check,
  Phone,
  MessageCircle,
} from 'lucide-react'
import Image from 'next/image'
import type { DriverScreen } from '@/app/driver/page'

interface OrderRequestProps {
  onNavigate: (screen: DriverScreen) => void
  onAccept: () => void
  onDecline: () => void
}

export function OrderRequest({ onNavigate, onAccept, onDecline }: OrderRequestProps) {
  const [countdown, setCountdown] = useState(15)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onDecline()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onDecline])

  const progress = (countdown / 15) * 100

  return (
    <div className="h-full flex flex-col bg-[#E8F4FF] relative">
      {/* Map Background */}
      <div className="flex-1 relative">
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oQYqsMJKeOPL4EUQzEeyeUyRucQYQs.png"
            alt="Map Bandung"
            fill
            className="object-cover"
          />
        </div>

        {/* Pickup Point */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative"
          >
            <div className="w-10 h-10 bg-[#52D49F] rounded-full flex items-center justify-center shadow-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-[#52D49F]" />
          </motion.div>
        </div>

        {/* Destination Point */}
        <div className="absolute top-2/3 right-1/4 translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-accent" />
          </motion.div>
        </div>

        {/* Route Line */}
        <svg className="absolute inset-0 pointer-events-none">
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
            d="M 90 280 Q 150 300 200 350 Q 250 400 280 420"
            fill="none"
            stroke="#8BBEFF"
            strokeWidth="4"
            strokeDasharray="8 8"
          />
        </svg>
      </div>

      {/* Order Request Card */}
      <motion.div
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        className="glass rounded-t-[32px] shadow-elevated border-t border-white/30"
      >
        {/* Progress Timer */}
        <div className="h-1 bg-muted mx-5 mt-4 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-[#52D49F] to-[#3BBF88]"
          />
        </div>

        <div className="px-5 py-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">{countdown}s</span>
              <span className="text-sm text-muted-foreground">untuk menerima</span>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
              <Banknote className="w-4 h-4 text-primary" />
              <span className="font-bold text-primary">Rp 35.000</span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
                alt="Customer"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Sarah Putri</p>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-[#FFB84D] fill-[#FFB84D]" />
                <span className="text-xs text-muted-foreground">4.8 Rating</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center">
                <Phone className="w-4 h-4 text-primary" />
              </button>
              <button className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-primary" />
              </button>
            </div>
          </div>

          {/* Route Info */}
          <div className="bg-card rounded-2xl p-4 mb-4 shadow-soft">
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center gap-1">
                <div className="w-3 h-3 bg-[#52D49F] rounded-full" />
                <div className="w-0.5 h-8 bg-muted" />
                <div className="w-3 h-3 bg-accent rounded-full" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Jemput</p>
                  <p className="text-sm font-medium text-foreground">Jl. Gegerkalong Hilir No. 15</p>
                  <p className="text-xs text-muted-foreground">500m dari lokasi Anda</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tujuan</p>
                  <p className="text-sm font-medium text-foreground">Universitas Pendidikan Indonesia</p>
                  <p className="text-xs text-muted-foreground">3.2 km perjalanan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div className="flex items-center justify-around mb-5 py-3 bg-muted/50 rounded-2xl">
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center">
                <Navigation className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">3.2 km</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Jarak</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">12 min</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Estimasi</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center">
                <Banknote className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">Tunai</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Pembayaran</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pb-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onDecline}
              className="flex-1 h-14 bg-card border border-border rounded-2xl flex items-center justify-center gap-2 shadow-soft"
            >
              <X className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold text-muted-foreground">Tolak</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onAccept}
              className="flex-[2] h-14 bg-gradient-to-r from-[#52D49F] to-[#3BBF88] rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#52D49F]/30"
            >
              <Check className="w-5 h-5 text-white" />
              <span className="font-semibold text-white">Terima Order</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
