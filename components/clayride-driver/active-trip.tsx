'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Navigation,
  Phone,
  MessageCircle,
  MapPin,
  User,
  Clock,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  Star,
  Banknote,
  Shield,
  Crosshair,
  Plus,
  Minus,
} from 'lucide-react'
import Image from 'next/image'
import type { DriverScreen } from '@/app/driver/page'

interface ActiveTripProps {
  onNavigate: (screen: DriverScreen) => void
  tripStatus: 'pickup' | 'ongoing' | 'arrived'
  setTripStatus: (status: 'pickup' | 'ongoing' | 'arrived') => void
  onComplete: () => void
}

export function ActiveTrip({ onNavigate, tripStatus, setTripStatus, onComplete }: ActiveTripProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusInfo = () => {
    switch (tripStatus) {
      case 'pickup':
        return {
          title: 'Menuju Titik Jemput',
          subtitle: 'Jl. Gegerkalong Hilir No. 15',
          eta: '3 min',
          color: 'from-primary to-[#5A9FFF]',
          action: 'Sudah di Lokasi',
          nextStatus: 'ongoing' as const,
        }
      case 'ongoing':
        return {
          title: 'Dalam Perjalanan',
          subtitle: 'Menuju UPI Bandung',
          eta: '12 min',
          color: 'from-[#52D49F] to-[#3BBF88]',
          action: 'Sudah Sampai',
          nextStatus: 'arrived' as const,
        }
      case 'arrived':
        return {
          title: 'Sampai di Tujuan',
          subtitle: 'Universitas Pendidikan Indonesia',
          eta: '-',
          color: 'from-[#FFB84D] to-[#FF9500]',
          action: 'Selesaikan Trip',
          nextStatus: 'arrived' as const,
        }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <div className="h-full flex flex-col bg-[#E8F4FF] relative">
      {/* Map Area */}
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

        {/* Driver Car */}
        <motion.div
          className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            x: tripStatus === 'ongoing' ? 50 : 0,
            y: tripStatus === 'ongoing' ? -30 : 0 
          }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <Navigation className="w-6 h-6 text-white -rotate-45" />
          </div>
        </motion.div>

        {/* Destination Marker */}
        <div className="absolute right-1/4 top-1/3 translate-x-1/2">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg">
            <MapPin className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Status Header */}
        <div className="absolute top-4 left-5 right-5">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`bg-gradient-to-r ${statusInfo.color} rounded-2xl p-4 shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-xs font-medium">{statusInfo.title}</p>
                <p className="text-white font-semibold">{statusInfo.subtitle}</p>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-xs">Estimasi</p>
                <p className="text-white font-bold text-lg">{statusInfo.eta}</p>
              </div>
            </div>
          </motion.div>
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

        {/* Emergency Button */}
        <div className="absolute left-5 bottom-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg"
          >
            <Shield className="w-5 h-5 text-white" />
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
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex justify-center pt-3 pb-2"
        >
          <motion.div 
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="w-10 h-1 bg-muted rounded-full flex items-center justify-center"
          >
            <ChevronUp className="w-4 h-4 text-muted-foreground absolute" />
          </motion.div>
        </button>

        <div className="px-5 pb-6">
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
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#FFB84D] fill-[#FFB84D]" />
                  <span className="text-xs text-muted-foreground">4.8</span>
                </div>
                <span className="text-muted-foreground">|</span>
                <div className="flex items-center gap-1">
                  <Banknote className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Rp 35.000 - Tunai</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
              >
                <Phone className="w-4 h-4 text-primary" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('chat')}
                className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
              >
                <MessageCircle className="w-4 h-4 text-primary" />
              </motion.button>
            </div>
          </div>

          {/* Expanded Content */}
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="bg-card rounded-2xl p-4 mb-4 shadow-soft">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-3 h-3 bg-[#52D49F] rounded-full" />
                  <div className="w-0.5 h-8 bg-muted" />
                  <div className="w-3 h-3 bg-accent rounded-full" />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Jemput</p>
                      <p className="text-sm font-medium text-foreground">Jl. Gegerkalong Hilir No. 15</p>
                    </div>
                    {tripStatus !== 'pickup' && (
                      <CheckCircle className="w-5 h-5 text-[#52D49F]" />
                    )}
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Tujuan</p>
                      <p className="text-sm font-medium text-foreground">Universitas Pendidikan Indonesia</p>
                    </div>
                    {tripStatus === 'arrived' && (
                      <CheckCircle className="w-5 h-5 text-[#52D49F]" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-[#FFB84D]/10 rounded-2xl p-3 mb-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-[#FFB84D]" />
              <p className="text-xs text-foreground">Catatan: Tolong tunggu di depan lobby gedung</p>
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (tripStatus === 'arrived') {
                onComplete()
              } else {
                setTripStatus(statusInfo.nextStatus)
              }
            }}
            className={`w-full h-14 bg-gradient-to-r ${statusInfo.color} rounded-2xl flex items-center justify-center shadow-lg`}
          >
            <span className="text-white font-semibold">{statusInfo.action}</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
