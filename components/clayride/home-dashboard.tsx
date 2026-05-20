'use client'

import { motion } from 'framer-motion'
import {
  Home,
  Search,
  MessageCircle,
  Bell,
  Plus,
  CreditCard,
  Clock,
  Car,
  UtensilsCrossed,
  Package,
  PawPrint,
  Trash2,
  Heart,
  MoreHorizontal,
  ChevronRight,
  Wallet,
  Gift,
} from 'lucide-react'
import Image from 'next/image'
import type { Screen } from '@/app/page'

interface HomeDashboardProps {
  onNavigate: (screen: Screen) => void
  cartItemsCount?: number
  currentScreen?: string
}

const services = [
  { icon: Car, label: 'ClayRide', color: 'bg-primary', iconColor: 'text-white', screen: 'destination' as Screen },
  { icon: UtensilsCrossed, label: 'ClayFood', color: 'bg-accent', iconColor: 'text-white', screen: 'clayfood' as Screen },
  { icon: Package, label: 'ClaySend', color: 'bg-[#52D49F]', iconColor: 'text-white', screen: 'claysend' as Screen },
  { icon: PawPrint, label: 'ClayPet', color: 'bg-[#FFB84D]', iconColor: 'text-white', screen: 'claypet' as Screen },
  { icon: Trash2, label: 'ClayWaste', color: 'bg-[#9B7DFF]', iconColor: 'text-white', screen: 'claywaste' as Screen },
  { icon: Heart, label: 'ClayCare', color: 'bg-[#FF8FAB]', iconColor: 'text-white', screen: 'claycare' as Screen },
  { icon: MoreHorizontal, label: 'Lainnya', color: 'bg-muted', iconColor: 'text-muted-foreground', screen: 'other-services' as Screen },
]

const promos = [
  { title: 'Diskon 50% Ride Pertama', subtitle: 'Khusus pengguna baru', gradient: 'from-primary to-[#5A9FFF]' },
  { title: 'Gratis Ongkir', subtitle: 'Pesanan di atas Rp100.000', gradient: 'from-accent to-[#FF8FAB]' },
]

export function HomeDashboard({ onNavigate, cartItemsCount = 0, currentScreen = 'home' }: HomeDashboardProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-[#5A9FFF] flex items-center justify-center shadow-soft">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="font-bold text-lg text-foreground tracking-tight">CLAY</span>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('notifications')}
            className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center relative"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent rounded-full text-[10px] text-white flex items-center justify-center font-medium">
              3
            </span>
          </motion.button>
          {/* Premium Profile Avatar */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-[#5A9FFF]/20 p-0.5 shadow-elevated"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-[#5A9FFF] flex items-center justify-center overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face"
                alt="Profile"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-5 py-2">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('search')}
          className="w-full h-12 bg-card rounded-2xl shadow-soft flex items-center px-4 gap-3"
        >
          <Search className="w-5 h-5 text-muted-foreground" />
          <span className="text-muted-foreground text-sm">Mau pergi ke mana?</span>
        </motion.button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Wallet Card */}
        <div className="px-5 py-4">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onNavigate('wallet')}
            className="w-full bg-gradient-to-br from-primary via-[#5A9FFF] to-primary rounded-3xl p-5 shadow-elevated text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/70 text-xs font-medium">Saldo ClayPay</p>
                <p className="text-white text-2xl font-bold">Rp 2.500.000</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex gap-3">
              <motion.div
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onNavigate('topup'); }}
                className="flex-1 h-10 bg-white/20 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">Top Up</span>
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onNavigate('wallet'); }}
                className="flex-1 h-10 bg-white/20 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">Bayar</span>
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onNavigate('activity'); }}
                className="flex-1 h-10 bg-white/20 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Clock className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">Riwayat</span>
              </motion.div>
            </div>
          </motion.button>
        </div>

        {/* Services */}
        <div className="px-5 py-2">
          <h3 className="text-sm font-semibold text-foreground mb-4">Layanan</h3>
          <div className="grid grid-cols-4 gap-3">
            {services.map((service, index) => (
              <motion.button
                key={service.label}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onNavigate(service.screen)}
                className="flex flex-col items-center gap-2"
              >
                <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center shadow-soft`}>
                  <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                </div>
                <span className="text-xs text-foreground font-medium">{service.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Promos */}
        <div className="px-5 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Promo Spesial</h3>
            <button 
              onClick={() => onNavigate('voucher')}
              className="text-xs text-primary font-medium flex items-center gap-1"
            >
              Lihat Semua <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {promos.map((promo, index) => (
              <motion.button
                key={promo.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('voucher')}
                className={`min-w-[260px] h-32 bg-gradient-to-br ${promo.gradient} rounded-2xl p-4 flex flex-col justify-between shadow-soft text-left`}
              >
                <div>
                  <p className="text-white font-bold text-lg">{promo.title}</p>
                  <p className="text-white/80 text-sm">{promo.subtitle}</p>
                </div>
                <div className="self-start px-4 py-2 bg-white/20 rounded-xl text-white text-xs font-medium flex items-center gap-1">
                  <Gift className="w-3 h-3" />
                  Klaim Sekarang
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="px-5 py-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Aktivitas Terbaru</h3>
            <button 
              onClick={() => onNavigate('activity')}
              className="text-xs text-primary font-medium"
            >
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3">
            {[
              { icon: Car, title: 'Perjalanan ke Monas', time: 'Hari ini, 14:30', price: '-Rp 35.000', status: 'Selesai' },
              { icon: UtensilsCrossed, title: 'Nasi Goreng Spesial', time: 'Kemarin, 19:00', price: '-Rp 85.000', status: 'Selesai' },
            ].map((activity, index) => (
              <motion.button
                key={activity.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onNavigate('activity')}
                className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 shadow-soft text-left"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <activity.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-foreground block">{activity.price}</span>
                  <span className="text-[10px] text-green-500 font-medium">{activity.status}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - 3 items only */}
      <div className="absolute bottom-6 left-5 right-5">
        <div className="bg-white/80 backdrop-blur-xl rounded-full px-8 py-4 flex items-center justify-between shadow-elevated border border-white/50">
          {[
            { icon: Home, label: 'Beranda', screen: 'home' as Screen },
            { icon: Clock, label: 'Aktivitas', screen: 'activity' as Screen },
            { icon: MessageCircle, label: 'Pesan', screen: 'chat' as Screen, badge: 2 },
          ].map((item) => {
            const isActive = currentScreen === item.screen || (item.screen === 'home' && currentScreen === 'home')
            return (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.9 }}
                onClick={() => onNavigate(item.screen)}
                className="flex flex-col items-center gap-1 relative"
              >
                <div className={`relative ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  <item.icon className="w-6 h-6" />
                  {item.badge && (
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
