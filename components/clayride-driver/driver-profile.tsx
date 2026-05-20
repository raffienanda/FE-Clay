'use client'

import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Car,
  Clock,
  MapPin,
  Camera,
  Edit3,
  Shield,
  FileText,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  Wallet,
  User,
  Award,
  TrendingUp,
} from 'lucide-react'
import Image from 'next/image'
import type { DriverScreen } from '@/app/driver/page'

interface DriverProfileProps {
  onNavigate: (screen: DriverScreen) => void
}

const stats = [
  { label: 'Trip', value: '1,248', icon: Car },
  { label: 'Rating', value: '4.92', icon: Star },
  { label: 'Jam Online', value: '892h', icon: Clock },
]

const achievements = [
  { title: 'Driver Teladan', icon: Award, color: 'bg-[#FFB84D]' },
  { title: 'Top Performer', icon: TrendingUp, color: 'bg-[#52D49F]' },
  { title: '1000+ Trip', icon: Car, color: 'bg-primary' },
]

const menuItems = [
  { icon: FileText, label: 'Dokumen', screen: null },
  { icon: CreditCard, label: 'Rekening Bank', screen: null },
  { icon: Car, label: 'Data Kendaraan', screen: null },
  { icon: Shield, label: 'Keamanan Akun', screen: null },
  { icon: Settings, label: 'Pengaturan', screen: 'settings' as DriverScreen },
  { icon: HelpCircle, label: 'Bantuan', screen: 'help' as DriverScreen },
]

export function DriverProfile({ onNavigate }: DriverProfileProps) {
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
          <h1 className="text-lg font-bold text-foreground">Profil Saya</h1>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
        >
          <Edit3 className="w-4 h-4 text-muted-foreground" />
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Profile Card */}
        <div className="px-5 py-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl p-5 shadow-soft"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face"
                    alt="Driver"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-soft">
                  <Camera className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-foreground">Ahmad Rizki</h2>
                <p className="text-sm text-muted-foreground">+62 812-3456-7890</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-[#52D49F]/10 text-[#52D49F] text-xs font-medium rounded-full">
                    Terverifikasi
                  </span>
                  <span className="px-2 py-0.5 bg-[#FFB84D]/10 text-[#FFB84D] text-xs font-medium rounded-full">
                    Gold Partner
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <stat.icon className="w-4 h-4 text-primary" />
                    <span className="text-lg font-bold text-foreground">{stat.value}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <div className="px-5 py-3">
          <h3 className="text-sm font-semibold text-foreground mb-3">Pencapaian</h3>
          <div className="flex gap-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex-1 bg-card rounded-2xl p-3 shadow-soft text-center"
              >
                <div className={`w-10 h-10 ${achievement.color} rounded-xl mx-auto mb-2 flex items-center justify-center`}>
                  <achievement.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-[10px] font-medium text-foreground">{achievement.title}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="px-5 py-3">
          <h3 className="text-sm font-semibold text-foreground mb-3">Kendaraan</h3>
          <div className="bg-card rounded-2xl p-4 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Car className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Honda Vario 150</p>
                <p className="text-sm text-muted-foreground">B 1234 XYZ</p>
                <p className="text-xs text-muted-foreground">Putih | 2022</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-5 py-3">
          <h3 className="text-sm font-semibold text-foreground mb-3">Pengaturan Akun</h3>
          <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => item.screen && onNavigate(item.screen)}
                className="w-full px-4 py-4 flex items-center gap-4 text-left border-b border-border last:border-b-0"
              >
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-5 py-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-accent/10 rounded-2xl p-4 flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5 text-accent" />
            <span className="font-medium text-accent">Keluar</span>
          </motion.button>
        </div>

        {/* Version */}
        <div className="text-center py-4">
          <p className="text-xs text-muted-foreground">ClayRide Driver v2.5.0</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 left-5 right-5">
        <div className="bg-white/80 backdrop-blur-xl rounded-full px-6 py-4 flex items-center justify-between shadow-elevated border border-white/50">
          {[
            { icon: Car, label: 'Beranda', active: false, screen: 'home' as DriverScreen },
            { icon: Clock, label: 'Riwayat', active: false, screen: 'history' as DriverScreen },
            { icon: Wallet, label: 'Pendapatan', active: false, screen: 'earnings' as DriverScreen },
            { icon: User, label: 'Profil', active: true, screen: 'profile' as DriverScreen },
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
