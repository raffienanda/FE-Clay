'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  Calendar,
  ChevronRight,
  Wallet,
  Clock,
  Car,
  Target,
  ArrowUpRight,
  Filter,
  Download,
} from 'lucide-react'
import type { DriverScreen } from '@/app/driver/page'

interface DriverEarningsProps {
  onNavigate: (screen: DriverScreen) => void
}

const weeklyData = [
  { day: 'Sen', amount: 280000, trips: 8 },
  { day: 'Sel', amount: 350000, trips: 12 },
  { day: 'Rab', amount: 420000, trips: 14 },
  { day: 'Kam', amount: 380000, trips: 11 },
  { day: 'Jum', amount: 520000, trips: 16 },
  { day: 'Sab', amount: 480000, trips: 15 },
  { day: 'Min', amount: 385000, trips: 12 },
]

const maxAmount = Math.max(...weeklyData.map(d => d.amount))

const recentTransactions = [
  { id: 1, type: 'trip', title: 'Sudirman - Monas', time: '14:30', amount: 35000 },
  { id: 2, type: 'bonus', title: 'Bonus 15 Trip', time: '12:00', amount: 50000 },
  { id: 3, type: 'trip', title: 'Kuningan - Senayan', time: '11:15', amount: 28000 },
  { id: 4, type: 'tips', title: 'Tips dari Sarah P.', time: '10:45', amount: 10000 },
  { id: 5, type: 'trip', title: 'Menteng - Kemang', time: '09:30', amount: 45000 },
]

export function DriverEarnings({ onNavigate }: DriverEarningsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'hari' | 'minggu' | 'bulan'>('minggu')

  const totalWeekly = weeklyData.reduce((sum, d) => sum + d.amount, 0)
  const totalTrips = weeklyData.reduce((sum, d) => sum + d.trips, 0)

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
          <h1 className="text-lg font-bold text-foreground">Pendapatan</h1>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
          >
            <Filter className="w-4 h-4 text-muted-foreground" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
          >
            <Download className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Period Selector */}
        <div className="px-5 py-2">
          <div className="bg-card rounded-2xl p-1 flex shadow-soft">
            {(['hari', 'minggu', 'bulan'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  selectedPeriod === period
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)} Ini
              </button>
            ))}
          </div>
        </div>

        {/* Total Earnings Card */}
        <div className="px-5 py-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary via-[#5A9FFF] to-primary rounded-3xl p-5 shadow-elevated"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/70 text-sm">Total Pendapatan</p>
                <p className="text-white text-3xl font-bold">
                  Rp {totalWeekly.toLocaleString('id-ID')}
                </p>
              </div>
              <div className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full">
                <TrendingUp className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">+15%</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/15 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Car className="w-4 h-4 text-white/70" />
                  <span className="text-white/70 text-xs">Trip</span>
                </div>
                <p className="text-white font-bold text-lg">{totalTrips}</p>
              </div>
              <div className="bg-white/15 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-white/70" />
                  <span className="text-white/70 text-xs">Jam</span>
                </div>
                <p className="text-white font-bold text-lg">42.5</p>
              </div>
              <div className="bg-white/15 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-white/70" />
                  <span className="text-white/70 text-xs">Bonus</span>
                </div>
                <p className="text-white font-bold text-lg">Rp 125K</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Weekly Chart */}
        <div className="px-5 py-3">
          <div className="bg-card rounded-2xl p-4 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Grafik Mingguan</h3>
              <button className="flex items-center gap-1 text-xs text-primary font-medium">
                <Calendar className="w-3 h-3" />
                13-19 Jan
              </button>
            </div>
            
            <div className="flex items-end justify-between gap-2 h-32">
              {weeklyData.map((data, index) => (
                <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.amount / maxAmount) * 100}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`w-full rounded-t-lg ${
                      index === 4 ? 'bg-primary' : 'bg-primary/30'
                    }`}
                  />
                  <span className="text-[10px] text-muted-foreground">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-5 py-3">
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="bg-card rounded-2xl p-4 shadow-soft flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-[#52D49F]/10 rounded-xl flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-[#52D49F]" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">Cairkan Dana</p>
                <p className="text-xs text-muted-foreground">Rp 1.850.000</p>
              </div>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('incentives')}
              className="bg-card rounded-2xl p-4 shadow-soft flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-[#FFB84D]/10 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-[#FFB84D]" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">Insentif</p>
                <p className="text-xs text-muted-foreground">3 aktif</p>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="px-5 py-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Transaksi Terbaru</h3>
            <button 
              onClick={() => onNavigate('history')}
              className="text-xs text-primary font-medium flex items-center gap-1"
            >
              Lihat Semua <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {recentTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-2xl p-4 flex items-center gap-3 shadow-soft"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  transaction.type === 'trip' ? 'bg-primary/10' :
                  transaction.type === 'bonus' ? 'bg-[#FFB84D]/10' : 'bg-[#52D49F]/10'
                }`}>
                  {transaction.type === 'trip' ? (
                    <Car className={`w-5 h-5 text-primary`} />
                  ) : transaction.type === 'bonus' ? (
                    <Target className="w-5 h-5 text-[#FFB84D]" />
                  ) : (
                    <Wallet className="w-5 h-5 text-[#52D49F]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{transaction.title}</p>
                  <p className="text-xs text-muted-foreground">Hari ini, {transaction.time}</p>
                </div>
                <p className="text-sm font-semibold text-[#52D49F]">
                  +Rp {transaction.amount.toLocaleString('id-ID')}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 left-5 right-5">
        <div className="bg-white/80 backdrop-blur-xl rounded-full px-6 py-4 flex items-center justify-between shadow-elevated border border-white/50">
          {[
            { icon: Car, label: 'Beranda', active: false, screen: 'home' as DriverScreen },
            { icon: Clock, label: 'Riwayat', active: false, screen: 'history' as DriverScreen },
            { icon: Wallet, label: 'Pendapatan', active: true, screen: 'earnings' as DriverScreen },
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
