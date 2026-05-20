'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  ChevronRight,
  Clock,
  MapPin,
  Power,
  Star,
  TrendingUp,
  Wallet,
  Car,
  MessageCircle,
  User,
  Zap,
  Target,
  Gift,
} from 'lucide-react'
import Image from 'next/image'
import type { DriverScreen } from '@/app/driver/page'

interface DriverHomeProps {
  onNavigate: (screen: DriverScreen) => void
  isOnline: boolean
  setIsOnline: (online: boolean) => void
}

const stats = [
  { label: 'Hari Ini', value: 'Rp 385.000', icon: Wallet, color: 'bg-primary' },
  { label: 'Trip', value: '12', icon: Car, color: 'bg-[#52D49F]' },
  { label: 'Rating', value: '4.92', icon: Star, color: 'bg-[#FFB84D]' },
  { label: 'Jam Online', value: '6.5h', icon: Clock, color: 'bg-[#9B7DFF]' },
]

const incentives = [
  { title: 'Bonus 15 Trip', progress: 12, target: 15, reward: 'Rp 50.000', gradient: 'from-primary to-[#5A9FFF]' },
  { title: 'Jam Sibuk', progress: 4, target: 5, reward: 'Rp 25.000', gradient: 'from-[#52D49F] to-[#3BBF88]' },
]

export function DriverHome({ onNavigate, isOnline, setIsOnline }: DriverHomeProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('profile')}
            className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-[#5A9FFF]/20 p-0.5 shadow-soft"
          >
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                alt="Driver"
                width={44}
                height={44}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.button>
          <div>
            <p className="text-sm font-bold text-foreground">Halo, Ahmad!</p>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-[#FFB84D] fill-[#FFB84D]" />
              <span className="text-xs text-muted-foreground">4.92 Rating</span>
            </div>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('notifications')}
          className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center relative"
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent rounded-full text-[10px] text-white flex items-center justify-center font-medium">
            2
          </span>
        </motion.button>
      </div>

      {/* Online/Offline Toggle */}
      <div className="px-5 py-3">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOnline(!isOnline)}
          className={`w-full rounded-2xl p-4 flex items-center justify-between transition-all duration-300 ${
            isOnline 
              ? 'bg-gradient-to-r from-[#52D49F] to-[#3BBF88] shadow-lg shadow-[#52D49F]/30' 
              : 'bg-card shadow-soft'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isOnline ? 'bg-white/20' : 'bg-muted'
            }`}>
              <Power className={`w-6 h-6 ${isOnline ? 'text-white' : 'text-muted-foreground'}`} />
            </div>
            <div className="text-left">
              <p className={`font-semibold ${isOnline ? 'text-white' : 'text-foreground'}`}>
                {isOnline ? 'Anda Sedang Online' : 'Anda Sedang Offline'}
              </p>
              <p className={`text-xs ${isOnline ? 'text-white/80' : 'text-muted-foreground'}`}>
                {isOnline ? 'Siap menerima orderan' : 'Ketuk untuk mulai bekerja'}
              </p>
            </div>
          </div>
          <div className={`w-14 h-8 rounded-full flex items-center p-1 transition-all ${
            isOnline ? 'bg-white/30 justify-end' : 'bg-muted justify-start'
          }`}>
            <motion.div
              layout
              className={`w-6 h-6 rounded-full shadow-sm ${isOnline ? 'bg-white' : 'bg-card'}`}
            />
          </div>
        </motion.button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Quick Stats */}
        <div className="px-5 py-3">
          <div className="grid grid-cols-4 gap-2">
            {stats.map((stat, index) => (
              <motion.button
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => stat.label === 'Hari Ini' ? onNavigate('earnings') : undefined}
                className="bg-card rounded-2xl p-3 shadow-soft text-center"
              >
                <div className={`w-9 h-9 ${stat.color} rounded-xl mx-auto mb-2 flex items-center justify-center`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Earnings Card */}
        <div className="px-5 py-3">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onNavigate('earnings')}
            className="w-full bg-gradient-to-br from-primary via-[#5A9FFF] to-primary rounded-3xl p-5 shadow-elevated text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-white/70 text-xs font-medium">Penghasilan Minggu Ini</p>
                <p className="text-white text-2xl font-bold">Rp 2.450.000</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 bg-white/20 rounded-lg flex items-center gap-1">
                <Zap className="w-3 h-3 text-white" />
                <span className="text-white text-xs font-medium">+15% dari minggu lalu</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/70" />
            </div>
          </motion.button>
        </div>

        {/* Active Incentives */}
        <div className="px-5 py-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Insentif Aktif</h3>
            <button 
              onClick={() => onNavigate('incentives')}
              className="text-xs text-primary font-medium flex items-center gap-1"
            >
              Lihat Semua <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {incentives.map((incentive, index) => (
              <motion.div
                key={incentive.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-4 shadow-soft"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${incentive.gradient} flex items-center justify-center`}>
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{incentive.title}</p>
                      <p className="text-xs text-muted-foreground">{incentive.progress}/{incentive.target} selesai</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{incentive.reward}</p>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(incentive.progress / incentive.target) * 100}%` }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className={`h-full rounded-full bg-gradient-to-r ${incentive.gradient}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tips & Promo Zone */}
        <div className="px-5 py-3">
          <h3 className="text-sm font-semibold text-foreground mb-3">Area Ramai</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {[
              { area: 'Gegerkalong', demand: 'Tinggi', color: 'bg-accent' },
              { area: 'Setiabudi', demand: 'Sedang', color: 'bg-[#FFB84D]' },
              { area: 'Dago', demand: 'Tinggi', color: 'bg-accent' },
            ].map((zone, index) => (
              <motion.div
                key={zone.area}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="min-w-[140px] bg-card rounded-2xl p-4 shadow-soft"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">{zone.area}</span>
                </div>
                <span className={`text-[10px] px-2 py-1 ${zone.color} text-white rounded-full font-medium`}>
                  Permintaan {zone.demand}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Trips */}
        <div className="px-5 py-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Trip Terbaru</h3>
            <button 
              onClick={() => onNavigate('history')}
              className="text-xs text-primary font-medium"
            >
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3">
            {[
              { from: 'Gegerkalong', to: 'UPI', time: '14:30', earnings: 'Rp 35.000', rating: 5 },
              { from: 'Setiabudi', to: 'Dago', time: '13:15', earnings: 'Rp 28.000', rating: 5 },
            ].map((trip, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onNavigate('history')}
                className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 shadow-soft text-left"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Car className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{trip.from} - {trip.to}</p>
                  <p className="text-xs text-muted-foreground">Hari ini, {trip.time}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-foreground block">{trip.earnings}</span>
                  <div className="flex items-center gap-0.5 justify-end">
                    {[...Array(trip.rating)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 text-[#FFB84D] fill-[#FFB84D]" />
                    ))}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 left-5 right-5">
        <div className="bg-white/80 backdrop-blur-xl rounded-full px-6 py-4 flex items-center justify-between shadow-elevated border border-white/50">
          {[
            { icon: Car, label: 'Beranda', active: true, screen: 'home' as DriverScreen },
            { icon: Clock, label: 'Riwayat', active: false, screen: 'history' as DriverScreen },
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
