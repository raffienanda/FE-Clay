'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  Calendar,
  Car,
  Star,
  MapPin,
  Clock,
  Banknote,
  Filter,
  ChevronRight,
  Wallet,
  User,
} from 'lucide-react'
import type { DriverScreen } from '@/app/driver/page'

interface DriverHistoryProps {
  onNavigate: (screen: DriverScreen) => void
}

const tripHistory = [
  {
    id: 1,
    date: 'Hari Ini',
    trips: [
      {
        id: 't1',
        from: 'Jl. Sudirman No. 45',
        to: 'Plaza Indonesia',
        customer: 'Sarah Putri',
        time: '14:30',
        duration: '15 min',
        distance: '3.2 km',
        earnings: 35000,
        rating: 5,
        payment: 'Tunai',
      },
      {
        id: 't2',
        from: 'Kuningan City',
        to: 'Senayan City',
        customer: 'Budi Santoso',
        time: '11:15',
        duration: '12 min',
        distance: '2.8 km',
        earnings: 28000,
        rating: 5,
        payment: 'ClayPay',
      },
      {
        id: 't3',
        from: 'Menteng',
        to: 'Kemang',
        customer: 'Dewi Lestari',
        time: '09:30',
        duration: '25 min',
        distance: '6.5 km',
        earnings: 45000,
        rating: 4,
        payment: 'ClayPay',
      },
    ],
  },
  {
    id: 2,
    date: 'Kemarin',
    trips: [
      {
        id: 't4',
        from: 'Gandaria',
        to: 'SCBD',
        customer: 'Ahmad Rizki',
        time: '18:45',
        duration: '20 min',
        distance: '4.5 km',
        earnings: 38000,
        rating: 5,
        payment: 'Tunai',
      },
      {
        id: 't5',
        from: 'Blok M',
        to: 'Kuningan',
        customer: 'Lisa Permata',
        time: '15:00',
        duration: '18 min',
        distance: '4.0 km',
        earnings: 32000,
        rating: 5,
        payment: 'ClayPay',
      },
    ],
  },
]

export function DriverHistory({ onNavigate }: DriverHistoryProps) {
  const [selectedFilter, setSelectedFilter] = useState<'semua' | 'hari-ini' | 'minggu-ini'>('semua')

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <h1 className="text-lg font-bold text-foreground">Riwayat Trip</h1>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
          >
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
          >
            <Filter className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-5 pb-3">
        <div className="flex gap-2">
          {[
            { key: 'semua', label: 'Semua' },
            { key: 'hari-ini', label: 'Hari Ini' },
            { key: 'minggu-ini', label: 'Minggu Ini' },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFilter === filter.key
                  ? 'bg-primary text-white'
                  : 'bg-card text-muted-foreground shadow-soft'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="px-5 py-2">
        <div className="bg-card rounded-2xl p-4 shadow-soft">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">88</p>
              <p className="text-xs text-muted-foreground">Total Trip</p>
            </div>
            <div className="text-center border-x border-border">
              <p className="text-2xl font-bold text-foreground">4.92</p>
              <div className="flex items-center justify-center gap-1">
                <Star className="w-3 h-3 text-[#FFB84D] fill-[#FFB84D]" />
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">285</p>
              <p className="text-xs text-muted-foreground">Km</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trip List */}
      <div className="flex-1 overflow-y-auto px-5 pb-28">
        {tripHistory.map((group) => (
          <div key={group.id} className="mb-4">
            <p className="text-sm font-semibold text-muted-foreground mb-3">{group.date}</p>
            <div className="space-y-3">
              {group.trips.map((trip, index) => (
                <motion.button
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-full bg-card rounded-2xl p-4 shadow-soft text-left"
                >
                  {/* Trip Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Car className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{trip.customer}</p>
                        <p className="text-xs text-muted-foreground">{trip.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#52D49F]">
                        +Rp {trip.earnings.toLocaleString('id-ID')}
                      </p>
                      <div className="flex items-center gap-0.5 justify-end">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-2.5 h-2.5 ${
                              i < trip.rating
                                ? 'text-[#FFB84D] fill-[#FFB84D]'
                                : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex flex-col items-center gap-1 mt-1">
                      <div className="w-2 h-2 bg-[#52D49F] rounded-full" />
                      <div className="w-0.5 h-6 bg-muted" />
                      <div className="w-2 h-2 bg-accent rounded-full" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <p className="text-xs text-foreground truncate">{trip.from}</p>
                      <p className="text-xs text-foreground truncate">{trip.to}</p>
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="flex items-center gap-4 pt-3 border-t border-border">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{trip.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{trip.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Banknote className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{trip.payment}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 left-5 right-5">
        <div className="bg-white/80 backdrop-blur-xl rounded-full px-6 py-4 flex items-center justify-between shadow-elevated border border-white/50">
          {[
            { icon: Car, label: 'Beranda', active: false, screen: 'home' as DriverScreen },
            { icon: Clock, label: 'Riwayat', active: true, screen: 'history' as DriverScreen },
            { icon: Wallet, label: 'Pendapatan', active: false, screen: 'earnings' as DriverScreen },
            { icon: User, label: 'Profil', active: false, screen: 'profile' as DriverScreen },
          ].map((item) => (
            <motion.button
              key={item.label}
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate(item.screen)}
              className="flex flex-col items-center gap-1 relative"
            >
              <item.icon className={`w-5 h-5 ${item.active ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-[10px] font-medium ${item.active ? 'text-primary' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
              {item.active && (
                <motion.div
                  layoutId="driverActiveTab"
                  className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
