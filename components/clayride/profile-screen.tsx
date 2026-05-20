'use client'

import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ChevronRight,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  Shield,
  Bell,
  MapPin,
  Heart,
  Gift,
  Star,
  Edit3,
  Camera,
} from 'lucide-react'
import Image from 'next/image'
import type { Screen } from '@/app/page'

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void
}

const menuItems = [
  { icon: CreditCard, label: 'Metode Pembayaran', description: '2 kartu tersimpan', screen: 'wallet' as Screen },
  { icon: MapPin, label: 'Alamat Tersimpan', description: '3 alamat', screen: 'home' as Screen },
  { icon: Heart, label: 'Favorit', description: '12 tempat favorit', screen: 'home' as Screen },
  { icon: Gift, label: 'Voucher Saya', description: '5 voucher aktif', screen: 'voucher' as Screen },
  { icon: Star, label: 'ClayPoints', description: '2.500 poin', screen: 'home' as Screen },
  { icon: Bell, label: 'Notifikasi', description: 'Aktif', screen: 'notifications' as Screen },
  { icon: Shield, label: 'Keamanan', description: 'Verifikasi 2 langkah aktif', screen: 'settings' as Screen },
  { icon: Settings, label: 'Pengaturan', description: 'Bahasa, tema, dll', screen: 'settings' as Screen },
  { icon: HelpCircle, label: 'Bantuan', description: 'FAQ & dukungan', screen: 'help' as Screen },
]

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 py-3 flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('home')}
          className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </motion.button>
        <h1 className="text-lg font-bold text-foreground">Profil Saya</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        {/* Profile Header */}
        <div className="px-5 py-6 flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-[#5A9FFF]/20 p-1">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face"
                  alt="Profile"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('Fitur ganti foto profil akan segera hadir!')}
              className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-soft"
            >
              <Camera className="w-4 h-4 text-white" />
            </motion.button>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-foreground">Ahmad Rizki</h2>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => alert('Edit profil: Ahmad Rizki')}
              >
                <Edit3 className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            </div>
            <p className="text-sm text-muted-foreground">+62 812 3456 7890</p>
            <p className="text-sm text-muted-foreground">ahmad.rizki@email.com</p>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">156</p>
              <p className="text-xs text-muted-foreground">Perjalanan</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">4.9</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">2.5K</p>
              <p className="text-xs text-muted-foreground">Poin</p>
            </div>
          </div>
        </div>

        {/* Membership Card */}
        <div className="px-5 py-2">
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-br from-[#FFB84D] to-[#FF8C00] rounded-2xl p-4 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-xs font-medium">Member Status</p>
                <p className="text-white text-lg font-bold">Gold Member</p>
                <p className="text-white/70 text-xs mt-1">500 poin lagi ke Platinum</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
            </div>
            <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
              <div className="bg-white h-full rounded-full" style={{ width: '70%' }} />
            </div>
          </motion.div>
        </div>

        {/* Menu Items */}
        <div className="px-5 py-4">
          <div className="bg-card rounded-2xl shadow-soft overflow-hidden divide-y divide-border">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate(item.screen)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="w-full p-4 flex items-center gap-4 text-left"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-5 py-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin keluar?')) {
                onNavigate('home')
              }
            }}
            className="w-full bg-accent/10 rounded-2xl p-4 flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5 text-accent" />
            <span className="text-accent font-medium">Keluar</span>
          </motion.button>
        </div>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground py-4">
          CLAY App v2.1.0
        </p>
      </div>
    </div>
  )
}
