'use client'

import { motion } from 'framer-motion'
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Star,
  Clock,
  Home,
  Briefcase,
  ChevronRight,
} from 'lucide-react'
import type { Screen } from '@/app/page'

interface DestinationInputProps {
  onNavigate: (screen: Screen) => void
}

const favorites = [
  { icon: Home, label: 'Rumah', address: 'Jl. Kemang Raya No. 45' },
  { icon: Briefcase, label: 'Kantor', address: 'Wisma 46, Sudirman' },
]

const recentPlaces = [
  { name: 'Grand Indonesia', address: 'Jl. MH Thamrin, Jakarta Pusat', time: '2 jam lalu' },
  { name: 'Senayan City', address: 'Jl. Asia Afrika, Senayan', time: 'Kemarin' },
  { name: 'Mall Kelapa Gading', address: 'Kelapa Gading, Jakarta Utara', time: '3 hari lalu' },
]

export function DestinationInput({ onNavigate }: DestinationInputProps) {
  return (
    <div className="h-full flex flex-col bg-background relative">
      {/* Map Preview */}
      <div className="h-[45%] bg-gradient-to-b from-[#E8F4FF] to-[#D4E9FF] relative">
        {/* Map Grid Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8BBEFF" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Map Elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Roads */}
            <div className="absolute w-48 h-1 bg-white/60 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute w-1 h-32 bg-white/60 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            {/* Current Location Marker */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative z-10"
            >
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <div className="absolute -inset-3 bg-primary/20 rounded-full animate-ping" />
            </motion.div>
          </div>
        </div>

        {/* Back Button */}
        <div className="absolute top-4 left-5">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full glass shadow-soft flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
        </div>
      </div>

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="flex-1 bg-card rounded-t-[32px] -mt-8 shadow-elevated relative z-10"
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-muted rounded-full" />
        </div>

        <div className="px-5 py-2 h-[calc(100%-20px)] overflow-y-auto">
          {/* Location Inputs */}
          <div className="space-y-3 mb-6">
            {/* Pickup */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Navigation className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 h-12 bg-secondary rounded-xl px-4 flex items-center">
                <span className="text-sm text-foreground">Lokasi Saat Ini</span>
              </div>
            </div>

            {/* Connector Line */}
            <div className="flex items-center gap-3">
              <div className="w-10 flex justify-center">
                <div className="w-0.5 h-4 bg-muted" />
              </div>
            </div>

            {/* Destination */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('pickup')}
              className="flex items-center gap-3 w-full"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1 h-12 bg-secondary rounded-xl px-4 flex items-center border-2 border-dashed border-primary/30">
                <span className="text-sm text-muted-foreground">Mau ke mana?</span>
              </div>
            </motion.button>
          </div>

          {/* Favorites */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-[#FFB84D]" />
              <h3 className="text-sm font-semibold text-foreground">Favorit</h3>
            </div>
            <div className="flex gap-3">
              {favorites.map((fav, index) => (
                <motion.button
                  key={fav.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('pickup')}
                  className="flex-1 bg-secondary rounded-2xl p-4 text-left"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                    <fav.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{fav.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{fav.address}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Recent Places */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Terbaru</h3>
            </div>
            <div className="space-y-2">
              {recentPlaces.map((place, index) => (
                <motion.button
                  key={place.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('pickup')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{place.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{place.address}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">{place.time}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
