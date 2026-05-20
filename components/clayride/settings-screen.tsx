'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Bell,
  Moon,
  Globe,
  Shield,
  Lock,
  Smartphone,
  Eye,
  Trash2,
  ChevronRight,
  Toggle,
} from 'lucide-react'
import type { Screen } from '@/app/page'

interface SettingsScreenProps {
  onNavigate: (screen: Screen) => void
}

export function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [biometric, setBiometric] = useState(true)

  const settingsGroups = [
    {
      title: 'Preferensi',
      items: [
        {
          icon: Bell,
          label: 'Notifikasi',
          description: 'Push notification & email',
          toggle: true,
          value: notifications,
          onChange: setNotifications,
        },
        {
          icon: Moon,
          label: 'Mode Gelap',
          description: 'Tema aplikasi',
          toggle: true,
          value: darkMode,
          onChange: setDarkMode,
        },
        {
          icon: Globe,
          label: 'Bahasa',
          description: 'Indonesia',
          action: true,
        },
      ],
    },
    {
      title: 'Keamanan',
      items: [
        {
          icon: Lock,
          label: 'Ubah Password',
          description: 'Terakhir diubah 30 hari lalu',
          action: true,
        },
        {
          icon: Smartphone,
          label: 'Autentikasi Biometrik',
          description: 'Face ID / Fingerprint',
          toggle: true,
          value: biometric,
          onChange: setBiometric,
        },
        {
          icon: Shield,
          label: 'Verifikasi 2 Langkah',
          description: 'Aktif',
          action: true,
        },
      ],
    },
    {
      title: 'Privasi',
      items: [
        {
          icon: Eye,
          label: 'Privasi Data',
          description: 'Kelola data pribadi',
          action: true,
        },
        {
          icon: Trash2,
          label: 'Hapus Akun',
          description: 'Hapus akun secara permanen',
          action: true,
          danger: true,
        },
      ],
    },
  ]

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 py-3 flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('profile')}
          className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </motion.button>
        <h1 className="text-lg font-bold text-foreground">Pengaturan</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        {settingsGroups.map((group, groupIndex) => (
          <div key={group.title} className="px-5 py-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              {group.title}
            </h3>
            <div className="bg-card rounded-2xl shadow-soft overflow-hidden divide-y divide-border">
              {group.items.map((item, itemIndex) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (groupIndex * 0.1) + (itemIndex * 0.05) }}
                  className="p-4 flex items-center gap-4"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.danger ? 'bg-accent/10' : 'bg-primary/10'
                  }`}>
                    <item.icon className={`w-5 h-5 ${item.danger ? 'text-accent' : 'text-primary'}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${item.danger ? 'text-accent' : 'text-foreground'}`}>
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  {item.toggle ? (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => item.onChange?.(!item.value)}
                      className={`w-12 h-7 rounded-full p-1 transition-colors ${
                        item.value ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <motion.div
                        animate={{ x: item.value ? 20 : 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="w-5 h-5 bg-white rounded-full shadow-sm"
                      />
                    </motion.button>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* App Info */}
        <div className="px-5 py-6 text-center">
          <p className="text-sm text-muted-foreground mb-1">CLAY Super App</p>
          <p className="text-xs text-muted-foreground">Versi 2.1.0 (Build 2024.12.20)</p>
        </div>
      </div>
    </div>
  )
}
