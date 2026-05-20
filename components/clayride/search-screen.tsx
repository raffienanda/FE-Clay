'use client'

import { motion } from 'framer-motion'
import {
  Search,
  ArrowLeft,
  Clock,
  MapPin,
  Star,
  ChevronRight,
  Building2,
  ShoppingBag,
  Coffee,
  Plane,
} from 'lucide-react'
import type { Screen } from '@/app/page'

interface SearchScreenProps {
  onNavigate: (screen: Screen) => void
}

const popularSearches = [
  'Monas', 'Grand Indonesia', 'Senayan City', 'PIK', 'Kemang', 'Sudirman'
]

const recentDestinations = [
  { name: 'Grand Indonesia', address: 'Jl. MH Thamrin, Jakarta Pusat', icon: Building2 },
  { name: 'Plaza Indonesia', address: 'Jl. MH Thamrin No.28-30', icon: ShoppingBag },
  { name: 'Pacific Place', address: 'Jl. Jend. Sudirman, SCBD', icon: Coffee },
]

const recommendations = [
  { name: 'Bandara Soekarno-Hatta', address: 'Tangerang, Banten', icon: Plane, distance: '25 km' },
  { name: 'Ancol Dreamland', address: 'Pademangan, Jakarta Utara', icon: Star, distance: '12 km' },
]

export function SearchScreen({ onNavigate }: SearchScreenProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 py-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('home')}
          className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="px-5 py-2">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari tujuan..."
            className="w-full h-14 bg-card rounded-2xl shadow-soft pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            autoFocus
          />
        </div>
      </div>

      {/* Promo Carousel */}
      <div className="px-5 py-4">
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
          {[
            { text: 'Gratis perjalanan hingga Rp 25.000', bg: 'bg-primary' },
            { text: 'Diskon 20% pesan makanan', bg: 'bg-accent' },
          ].map((promo, index) => (
            <motion.div
              key={promo.text}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`min-w-[220px] h-16 ${promo.bg} rounded-2xl px-4 flex items-center justify-between shadow-soft`}
            >
              <span className="text-white text-sm font-medium">{promo.text}</span>
              <ChevronRight className="w-4 h-4 text-white/70" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Popular Searches */}
        <div className="px-5 py-2">
          <h3 className="text-sm font-semibold text-foreground mb-3">Pencarian Populer</h3>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search, index) => (
              <motion.button
                key={search}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('destination')}
                className="px-4 py-2 bg-card rounded-full shadow-soft text-sm text-foreground font-medium hover:bg-primary/10 transition-colors"
              >
                {search}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Destinations */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Tujuan Terakhir</h3>
          </div>
          <div className="space-y-2">
            {recentDestinations.map((dest, index) => (
              <motion.button
                key={dest.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('destination')}
                className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 shadow-soft text-left"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <dest.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{dest.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{dest.address}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="px-5 py-2 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Rekomendasi</h3>
          </div>
          <div className="space-y-2">
            {recommendations.map((rec, index) => (
              <motion.button
                key={rec.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('destination')}
                className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 shadow-soft text-left"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <rec.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{rec.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{rec.address}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-muted-foreground">{rec.distance}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
