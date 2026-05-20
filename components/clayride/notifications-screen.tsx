'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Bell,
  Gift,
  Car,
  UtensilsCrossed,
  Package,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  Settings,
  Trash2,
} from 'lucide-react'
import type { Screen } from '@/app/page'

interface NotificationsScreenProps {
  onNavigate: (screen: Screen) => void
}

const notifications = [
  {
    id: '1',
    type: 'promo',
    icon: Gift,
    iconBg: 'bg-accent',
    title: 'Diskon 50% untuk Ride Pertama!',
    message: 'Gunakan kode NEWUSER50 untuk perjalanan pertamamu',
    time: '5 menit lalu',
    read: false,
  },
  {
    id: '2',
    type: 'order',
    icon: Car,
    iconBg: 'bg-primary',
    title: 'Driver menuju lokasi',
    message: 'Budi Santoso sedang dalam perjalanan ke lokasi penjemputanmu',
    time: '15 menit lalu',
    read: false,
  },
  {
    id: '3',
    type: 'order',
    icon: CheckCircle,
    iconBg: 'bg-green-500',
    title: 'Perjalanan selesai',
    message: 'Terima kasih telah menggunakan ClayRide. Jangan lupa beri rating!',
    time: '2 jam lalu',
    read: false,
  },
  {
    id: '4',
    type: 'payment',
    icon: CreditCard,
    iconBg: 'bg-[#9B7DFF]',
    title: 'Top Up Berhasil',
    message: 'Saldo ClayPay Anda bertambah Rp 500.000',
    time: '5 jam lalu',
    read: true,
  },
  {
    id: '5',
    type: 'order',
    icon: UtensilsCrossed,
    iconBg: 'bg-[#FFB84D]',
    title: 'Pesanan makanan selesai',
    message: 'Pesanan dari Warung Pak Joko telah diantar',
    time: 'Kemarin',
    read: true,
  },
  {
    id: '6',
    type: 'order',
    icon: Package,
    iconBg: 'bg-[#52D49F]',
    title: 'Paket terkirim',
    message: 'Paket Anda telah sampai di tujuan',
    time: 'Kemarin',
    read: true,
  },
  {
    id: '7',
    type: 'info',
    icon: AlertCircle,
    iconBg: 'bg-blue-500',
    title: 'Update Aplikasi Tersedia',
    message: 'Versi terbaru CLAY App (v2.1.0) sudah tersedia',
    time: '2 hari lalu',
    read: true,
  },
  {
    id: '8',
    type: 'promo',
    icon: Gift,
    iconBg: 'bg-accent',
    title: 'Gratis Ongkir ClayFood',
    message: 'Pesan makanan di atas Rp 100.000 dan nikmati gratis ongkir',
    time: '3 hari lalu',
    read: true,
  },
]

export function NotificationsScreen({ onNavigate }: NotificationsScreenProps) {
  const [activeFilter, setActiveFilter] = useState(0)
  const [notificationList, setNotificationList] = useState(notifications)

  const unreadCount = notificationList.filter(n => !n.read).length

  const handleClearAll = () => {
    setNotificationList([])
  }

  const handleMarkRead = (id: string) => {
    setNotificationList(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const filteredNotifications = notificationList.filter((notif, index) => {
    if (activeFilter === 0) return true
    if (activeFilter === 1) return notif.type === 'promo'
    if (activeFilter === 2) return notif.type === 'order'
    if (activeFilter === 3) return notif.type === 'payment'
    return true
  })

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Notifikasi</h1>
            {unreadCount > 0 && (
              <p className="text-xs text-muted-foreground">{unreadCount} belum dibaca</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('settings')}
            className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="px-5 py-2 flex gap-2">
        {['Semua', 'Promo', 'Pesanan', 'Pembayaran'].map((filter, index) => (
          <motion.button
            key={filter}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(index)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              index === activeFilter ? 'bg-primary text-white' : 'bg-card text-muted-foreground shadow-soft'
            }`}
          >
            {filter}
          </motion.button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto pb-8">
        <div className="px-5 py-2 space-y-2">
          {filteredNotifications.map((notif, index) => (
            <motion.button
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleMarkRead(notif.id)}
              className={`w-full p-4 rounded-2xl flex items-start gap-4 text-left transition-colors ${
                notif.read ? 'bg-card' : 'bg-primary/5 border border-primary/20'
              } shadow-soft`}
            >
              <div className={`w-12 h-12 ${notif.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <notif.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className={`text-sm font-semibold ${notif.read ? 'text-foreground' : 'text-primary'}`}>
                    {notif.title}
                  </p>
                  {!notif.read && (
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-1.5" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{notif.message}</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                </div>
              </div>
            </motion.button>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Tidak ada notifikasi</p>
            </div>
          )}
        </div>

        {/* Clear All Button */}
        {notificationList.length > 0 && (
          <div className="px-5 py-6">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleClearAll}
              className="w-full py-3 rounded-2xl border border-border flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-medium">Hapus Semua Notifikasi</span>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  )
}
