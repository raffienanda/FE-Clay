'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  X,
  MapPin,
  CreditCard,
  Phone,
  MessageCircle,
  Star,
  Shield,
} from 'lucide-react'
import type { Screen } from '@/app/page'

interface OrderConfirmationProps {
  onNavigate: (screen: Screen) => void
}

export function OrderConfirmation({ onNavigate }: OrderConfirmationProps) {
  const [eta, setEta] = useState(3)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setEta(prev => (prev > 1 ? prev - 1 : prev))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Map with Route */}
      <div className="h-[40%] bg-gradient-to-b from-[#E8F4FF] to-[#D4E9FF] relative">
        {/* Map Grid */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="confirmGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8BBEFF" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#confirmGrid)" />
          </svg>
        </div>

        {/* Route Line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            d="M 20 75 Q 30 60 40 55 Q 50 50 60 45 Q 70 40 80 25"
            fill="none"
            stroke="#8BBEFF"
            strokeWidth="1.5"
          />
        </svg>

        {/* Driver Car */}
        <motion.div
          initial={{ x: '-50%', y: 0 }}
          animate={{ 
            x: ['-50%', '-40%', '-30%'],
            y: [0, -5, -10]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          className="absolute bottom-[25%] left-[25%]"
        >
          <div className="w-8 h-8 bg-[#52D49F] rounded-xl flex items-center justify-center shadow-lg border-2 border-white rotate-45">
            <span className="text-sm -rotate-45">🚗</span>
          </div>
        </motion.div>

        {/* Pickup Point */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute bottom-[20%] left-[20%]"
        >
          <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg" />
        </motion.div>

        {/* Destination Point */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-[25%] right-[20%]"
        >
          <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <MapPin className="w-3 h-3 text-white" />
          </div>
        </motion.div>

        {/* Close Button */}
        <div className="absolute top-4 left-5">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full glass shadow-soft flex items-center justify-center"
          >
            <X className="w-5 h-5 text-foreground" />
          </motion.button>
        </div>

        {/* ETA Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-5"
        >
          <div className="glass rounded-2xl px-4 py-2 shadow-soft">
            <p className="text-xs text-muted-foreground">Driver tiba dalam</p>
            <p className="text-lg font-bold text-primary">{eta} menit</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="flex-1 bg-card rounded-t-[32px] -mt-6 shadow-elevated relative z-10 flex flex-col"
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-muted rounded-full" />
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {/* Booking Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#52D49F]/10 rounded-full mb-2">
              <div className="w-2 h-2 bg-[#52D49F] rounded-full animate-pulse" />
              <span className="text-sm font-medium text-[#52D49F]">Driver sedang menuju lokasi</span>
            </div>
          </motion.div>

          {/* Driver Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-secondary rounded-2xl p-4 mb-4"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">👨‍✈️</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Budi Santoso</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#FFB84D] fill-[#FFB84D]" />
                    <span className="text-xs text-foreground font-medium">4.9</span>
                  </div>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">2.345 trip</span>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 text-primary" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 text-primary" />
                </motion.button>
              </div>
            </div>

            {/* Car Info */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">Kendaraan</p>
                <p className="text-sm font-medium text-foreground">Toyota Avanza (Putih)</p>
              </div>
              <div className="px-3 py-1.5 bg-foreground rounded-lg">
                <span className="text-xs font-bold text-card">B 1234 XYZ</span>
              </div>
            </div>
          </motion.div>

          {/* Route Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-secondary rounded-2xl p-4 mb-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center pt-1">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <div className="w-0.5 h-10 bg-muted" />
                <div className="w-3 h-3 bg-accent rounded-full" />
              </div>
              <div className="flex-1">
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground">Jemput</p>
                  <p className="text-sm font-medium text-foreground">Jl. Sudirman, Jakarta</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tujuan</p>
                  <p className="text-sm font-medium text-foreground">Grand Indonesia, Thamrin</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-secondary rounded-2xl p-4 mb-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Clay Wallet</p>
                  <p className="text-xs text-muted-foreground">Pembayaran terkonfirmasi</p>
                </div>
              </div>
              <p className="text-lg font-bold text-foreground">Rp 25.000</p>
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-border">
              <Shield className="w-4 h-4 text-[#52D49F]" />
              <span className="text-xs text-muted-foreground">Perjalanan Anda diasuransikan</span>
            </div>
          </motion.div>
        </div>

        {/* Cancel Button */}
        <div className="px-5 pb-6 pt-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin membatalkan perjalanan?')) {
                onNavigate('home')
              }
            }}
            className="w-full h-14 bg-accent/10 rounded-2xl flex items-center justify-center"
          >
            <span className="text-accent font-semibold">Batalkan Perjalanan</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
