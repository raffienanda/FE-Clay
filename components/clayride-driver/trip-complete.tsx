'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Star,
  ThumbsUp,
  MessageCircle,
  X,
  CheckCircle,
  Banknote,
  Navigation,
  Clock,
} from 'lucide-react'
import Image from 'next/image'
import type { DriverScreen } from '@/app/driver/page'

interface TripCompleteProps {
  onNavigate: (screen: DriverScreen) => void
  onClose: () => void
}

const compliments = [
  { id: 'friendly', label: 'Ramah', icon: '😊' },
  { id: 'safe', label: 'Berkendara Aman', icon: '🛡️' },
  { id: 'clean', label: 'Kendaraan Bersih', icon: '✨' },
  { id: 'ontime', label: 'Tepat Waktu', icon: '⏰' },
]

export function TripComplete({ onNavigate, onClose }: TripCompleteProps) {
  const [rating, setRating] = useState(5)
  const [selectedCompliments, setSelectedCompliments] = useState<string[]>([])

  const toggleCompliment = (id: string) => {
    setSelectedCompliments(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Success Header */}
      <div className="bg-gradient-to-br from-[#52D49F] to-[#3BBF88] pt-8 pb-12 px-5 relative">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="absolute top-4 right-5 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
        >
          <X className="w-4 h-4 text-white" />
        </motion.button>

        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center"
          >
            <CheckCircle className="w-8 h-8 text-[#52D49F]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-bold text-white mb-1"
          >
            Trip Selesai!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-sm"
          >
            Terima kasih telah mengantar dengan aman
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 -mt-6 bg-background rounded-t-[32px] px-5 pt-6 pb-6 overflow-y-auto">
        {/* Earnings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl p-5 shadow-soft mb-5"
        >
          <p className="text-sm text-muted-foreground mb-2">Penghasilan Trip Ini</p>
          <p className="text-3xl font-bold text-foreground mb-4">Rp 35.000</p>
          
          <div className="flex items-center justify-between py-3 border-t border-border">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Jarak</span>
            </div>
            <span className="text-sm font-medium text-foreground">3.2 km</span>
          </div>
          <div className="flex items-center justify-between py-3 border-t border-border">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Durasi</span>
            </div>
            <span className="text-sm font-medium text-foreground">15 menit</span>
          </div>
          <div className="flex items-center justify-between py-3 border-t border-border">
            <div className="flex items-center gap-2">
              <Banknote className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Pembayaran</span>
            </div>
            <span className="text-sm font-medium text-foreground">Tunai</span>
          </div>
        </motion.div>

        {/* Customer Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-2xl p-5 shadow-soft mb-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
                alt="Customer"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-foreground">Sarah Putri</p>
              <p className="text-xs text-muted-foreground">Beri rating untuk penumpang</p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileTap={{ scale: 0.9 }}
                onClick={() => setRating(star)}
                className="p-1"
              >
                <Star
                  className={`w-10 h-10 transition-colors ${
                    star <= rating
                      ? 'text-[#FFB84D] fill-[#FFB84D]'
                      : 'text-muted'
                  }`}
                />
              </motion.button>
            ))}
          </div>

          {/* Compliments */}
          <p className="text-sm text-muted-foreground mb-3 text-center">Pilih pujian (opsional)</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {compliments.map((compliment) => (
              <motion.button
                key={compliment.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleCompliment(compliment.id)}
                className={`px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1 transition-colors ${
                  selectedCompliments.includes(compliment.id)
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <span>{compliment.icon}</span>
                {compliment.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center shadow-soft mb-3"
        >
          <span className="text-white font-semibold">Kirim Rating</span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="w-full h-12 bg-card rounded-2xl flex items-center justify-center shadow-soft"
        >
          <span className="text-muted-foreground font-medium">Lewati</span>
        </motion.button>
      </div>
    </div>
  )
}
