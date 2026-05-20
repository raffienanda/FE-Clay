'use client'

import { motion } from 'framer-motion'
import {
  Bell,
  ChevronLeft,
  Filter,
  Check,
  X,
} from 'lucide-react'
import type { DriverScreen } from '@/app/driver/page'

interface DriverNotificationsProps {
  onNavigate: (screen: DriverScreen) => void
}

const notifications = [
  {
    id: 1,
    type: 'incentive',
    title: 'Bonus Trip Hampir Tercapai!',
    message: 'Anda tinggal 3 trip lagi untuk mendapatkan bonus Rp 50.000',
    time: '5 menit lalu',
    unread: true,
  },
  {
    id: 2,
    type: 'promo',
    title: 'Area Ramai di Sudirman',
    message: 'Permintaan tinggi di area Sudirman. Pergi ke sana untuk dapat lebih banyak order!',
    time: '15 menit lalu',
    unread: true,
  },
  {
    id: 3,
    type: 'system',
    title: 'Rating Anda Meningkat',
    message: 'Selamat! Rating Anda naik menjadi 4.92. Pertahankan pelayanan yang baik!',
    time: '1 jam lalu',
    unread: false,
  },
  {
    id: 4,
    type: 'payment',
    title: 'Pencairan Berhasil',
    message: 'Dana sebesar Rp 1.500.000 telah ditransfer ke rekening Anda',
    time: '2 jam lalu',
    unread: false,
  },
  {
    id: 5,
    type: 'system',
    title: 'Tips dari Penumpang',
    message: 'Anda menerima tips sebesar Rp 10.000 dari perjalanan terakhir',
    time: '3 jam lalu',
    unread: false,
  },
]

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'incentive':
      return 'bg-[#52D49F]'
    case 'promo':
      return 'bg-[#FFB84D]'
    case 'payment':
      return 'bg-primary'
    default:
      return 'bg-muted'
  }
}

export function DriverNotifications({ onNavigate }: DriverNotificationsProps) {
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
          <h1 className="text-lg font-bold text-foreground">Notifikasi</h1>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
        >
          <Filter className="w-4 h-4 text-muted-foreground" />
        </motion.button>
      </div>

      {/* Notification Actions */}
      <div className="px-5 pb-3 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">2 notifikasi belum dibaca</p>
        <button className="text-xs text-primary font-medium">Tandai semua dibaca</button>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="space-y-3">
          {notifications.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-card rounded-2xl p-4 shadow-soft ${notif.unread ? 'border-l-4 border-primary' : ''}`}
            >
              <div className="flex gap-3">
                <div className={`w-10 h-10 rounded-xl ${getNotificationColor(notif.type)} flex items-center justify-center flex-shrink-0`}>
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">{notif.title}</p>
                    {notif.unread && (
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notif.message}</p>
                  <p className="text-[10px] text-muted-foreground/70 mt-2">{notif.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
