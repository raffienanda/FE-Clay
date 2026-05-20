'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Home,
  Clock,
  MessageCircle,
  Car,
  UtensilsCrossed,
  Package,
  PawPrint,
  Trash2,
  Heart,
  ChevronRight,
  Calendar,
  Filter,
  Star,
} from 'lucide-react'
import type { Screen } from '@/app/page'

interface ActivityScreenProps {
  onNavigate: (screen: Screen) => void
  currentScreen?: string
}

type ActivityType = 'all' | 'ride' | 'food' | 'send' | 'pet' | 'waste' | 'care'

const filters: { type: ActivityType; label: string; icon: typeof Car }[] = [
  { type: 'all', label: 'Semua', icon: Clock },
  { type: 'ride', label: 'Ride', icon: Car },
  { type: 'food', label: 'Food', icon: UtensilsCrossed },
  { type: 'send', label: 'Send', icon: Package },
  { type: 'pet', label: 'Pet', icon: PawPrint },
  { type: 'waste', label: 'Waste', icon: Trash2 },
  { type: 'care', label: 'Care', icon: Heart },
]

const activities = [
  {
    id: '1',
    type: 'ride' as ActivityType,
    icon: Car,
    title: 'ClayRide ke Monas',
    subtitle: 'Jl. Sudirman → Monas',
    time: 'Hari ini, 14:30',
    price: 'Rp 35.000',
    status: 'completed',
    driver: 'Budi Santoso',
    rating: 5,
  },
  {
    id: '2',
    type: 'food' as ActivityType,
    icon: UtensilsCrossed,
    title: 'Nasi Goreng Spesial',
    subtitle: 'Warung Pak Joko',
    time: 'Kemarin, 19:00',
    price: 'Rp 85.000',
    status: 'completed',
    driver: 'Andi Driver',
    rating: 4,
  },
  {
    id: '3',
    type: 'send' as ActivityType,
    icon: Package,
    title: 'Kirim Paket',
    subtitle: 'Dokumen ke Kelapa Gading',
    time: '18 Des, 10:00',
    price: 'Rp 15.000',
    status: 'completed',
    driver: 'Kurniawan',
    rating: 5,
  },
  {
    id: '4',
    type: 'ride' as ActivityType,
    icon: Car,
    title: 'ClayRide ke Mall',
    subtitle: 'Rumah → Grand Indonesia',
    time: '17 Des, 15:45',
    price: 'Rp 42.000',
    status: 'completed',
    driver: 'Agus Prasetyo',
    rating: 5,
  },
  {
    id: '5',
    type: 'care' as ActivityType,
    icon: Heart,
    title: 'Konsultasi Dokter',
    subtitle: 'Dr. Sarah - Umum',
    time: '16 Des, 09:00',
    price: 'Rp 150.000',
    status: 'completed',
    driver: null,
    rating: 5,
  },
  {
    id: '6',
    type: 'pet' as ActivityType,
    icon: PawPrint,
    title: 'Grooming Kucing',
    subtitle: 'Happy Pet Salon',
    time: '15 Des, 11:00',
    price: 'Rp 120.000',
    status: 'completed',
    driver: null,
    rating: 4,
  },
  {
    id: '7',
    type: 'waste' as ActivityType,
    icon: Trash2,
    title: 'Jemput Sampah',
    subtitle: 'Sampah Plastik - 5kg',
    time: '14 Des, 08:00',
    price: '+Rp 25.000',
    status: 'completed',
    driver: 'Tim ClayWaste',
    rating: 5,
  },
]

export function ActivityScreen({ onNavigate, currentScreen = 'activity' }: ActivityScreenProps) {
  const [activeFilter, setActiveFilter] = useState<ActivityType>('all')

  const filteredActivities = activeFilter === 'all' 
    ? activities 
    : activities.filter(a => a.type === activeFilter)

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 py-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-foreground">Aktivitas</h1>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
          >
            <Calendar className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
          {filters.map((filter) => (
            <motion.button
              key={filter.type}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.type)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeFilter === filter.type
                  ? 'bg-primary text-white shadow-soft'
                  : 'bg-card text-muted-foreground shadow-soft'
              }`}
            >
              <filter.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{filter.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto pb-28">
        <div className="px-5 py-2 space-y-3">
          {filteredActivities.map((activity, index) => (
            <motion.button
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-card rounded-2xl p-4 shadow-soft text-left"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <activity.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-semibold text-foreground truncate pr-2">{activity.title}</p>
                    <span className={`text-sm font-bold ${activity.price.startsWith('+') ? 'text-green-500' : 'text-foreground'}`}>
                      {activity.price}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 truncate">{activity.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                    <div className="flex items-center gap-1">
                      {activity.rating && (
                        <>
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs text-muted-foreground">{activity.rating}.0</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </div>
              {activity.driver && (
                <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-muted" />
                  <span className="text-xs text-muted-foreground">{activity.driver}</span>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 left-5 right-5">
        <div className="bg-white/80 backdrop-blur-xl rounded-full px-8 py-4 flex items-center justify-between shadow-elevated border border-white/50">
          {[
            { icon: Home, label: 'Beranda', screen: 'home' as Screen },
            { icon: Clock, label: 'Aktivitas', screen: 'activity' as Screen },
            { icon: MessageCircle, label: 'Pesan', screen: 'chat' as Screen, badge: 2 },
          ].map((item) => {
            const isActive = currentScreen === item.screen
            return (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.9 }}
                onClick={() => onNavigate(item.screen)}
                className="flex flex-col items-center gap-1 relative"
              >
                <div className={`relative ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  <item.icon className="w-6 h-6" />
                  {item.badge && !isActive && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full text-[10px] text-white flex items-center justify-center font-medium">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
