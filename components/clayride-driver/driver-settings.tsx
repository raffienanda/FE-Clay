'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Bell,
  Moon,
  Sun,
  Globe,
  Lock,
  Smartphone,
  MapPin,
  Volume2,
  Vibrate,
  Shield,
  Trash2,
} from 'lucide-react'
import type { DriverScreen } from '@/app/driver/page'

interface DriverSettingsProps {
  onNavigate: (screen: DriverScreen) => void
}

export function DriverSettings({ onNavigate }: DriverSettingsProps) {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    sound: true,
    vibration: true,
    locationSharing: true,
    autoAccept: false,
  })

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const settingSections = [
    {
      title: 'Tampilan',
      items: [
        {
          icon: settings.darkMode ? Moon : Sun,
          label: 'Mode Gelap',
          type: 'toggle' as const,
          key: 'darkMode' as const,
        },
        {
          icon: Globe,
          label: 'Bahasa',
          type: 'link' as const,
          value: 'Indonesia',
        },
      ],
    },
    {
      title: 'Notifikasi',
      items: [
        {
          icon: Bell,
          label: 'Notifikasi Push',
          type: 'toggle' as const,
          key: 'notifications' as const,
        },
        {
          icon: Volume2,
          label: 'Suara',
          type: 'toggle' as const,
          key: 'sound' as const,
        },
        {
          icon: Vibrate,
          label: 'Getaran',
          type: 'toggle' as const,
          key: 'vibration' as const,
        },
      ],
    },
    {
      title: 'Privasi',
      items: [
        {
          icon: MapPin,
          label: 'Bagikan Lokasi',
          type: 'toggle' as const,
          key: 'locationSharing' as const,
        },
        {
          icon: Lock,
          label: 'Ubah PIN',
          type: 'link' as const,
        },
        {
          icon: Smartphone,
          label: 'Perangkat Terhubung',
          type: 'link' as const,
        },
      ],
    },
    {
      title: 'Order',
      items: [
        {
          icon: Shield,
          label: 'Auto Accept Order',
          description: 'Terima order otomatis saat rating tinggi',
          type: 'toggle' as const,
          key: 'autoAccept' as const,
        },
      ],
    },
  ]

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 py-4 flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('profile')}
          className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </motion.button>
        <h1 className="text-lg font-bold text-foreground">Pengaturan</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {settingSections.map((section, sectionIndex) => (
          <div key={section.title} className="px-5 py-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              {section.title}
            </h3>
            <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
              {section.items.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (sectionIndex * section.items.length + index) * 0.03 }}
                  className="px-4 py-4 flex items-center gap-4 border-b border-border last:border-b-0"
                >
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    {'description' in item && item.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                    )}
                  </div>
                  {item.type === 'toggle' && 'key' in item && (
                    <button
                      onClick={() => toggleSetting(item.key)}
                      className={`w-12 h-7 rounded-full flex items-center p-1 transition-all ${
                        settings[item.key] ? 'bg-primary justify-end' : 'bg-muted justify-start'
                      }`}
                    >
                      <motion.div
                        layout
                        className="w-5 h-5 bg-white rounded-full shadow-sm"
                      />
                    </button>
                  )}
                  {item.type === 'link' && (
                    <div className="flex items-center gap-2">
                      {'value' in item && item.value && (
                        <span className="text-sm text-muted-foreground">{item.value}</span>
                      )}
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Danger Zone */}
        <div className="px-5 py-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Zona Berbahaya
          </h3>
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-accent/10 rounded-2xl p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 text-left">
              <span className="text-sm font-medium text-accent">Hapus Akun</span>
              <p className="text-xs text-accent/70">Tindakan ini tidak dapat dibatalkan</p>
            </div>
            <ChevronRight className="w-5 h-5 text-accent" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
