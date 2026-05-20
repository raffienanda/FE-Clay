'use client'

import { motion } from 'framer-motion'
import {
  ChevronLeft,
  Target,
  Clock,
  Zap,
  ChevronRight,
  CheckCircle,
  Gift,
  TrendingUp,
} from 'lucide-react'
import type { DriverScreen } from '@/app/driver/page'

interface DriverIncentivesProps {
  onNavigate: (screen: DriverScreen) => void
}

const incentives = [
  {
    id: 1,
    title: 'Bonus 15 Trip',
    description: 'Selesaikan 15 trip untuk mendapat bonus',
    progress: 12,
    target: 15,
    reward: 50000,
    deadline: '23:59 WIB',
    gradient: 'from-primary to-[#5A9FFF]',
    active: true,
  },
  {
    id: 2,
    title: 'Jam Sibuk Pagi',
    description: 'Selesaikan 5 trip di jam 07:00-09:00',
    progress: 4,
    target: 5,
    reward: 25000,
    deadline: '09:00 WIB',
    gradient: 'from-[#52D49F] to-[#3BBF88]',
    active: true,
  },
  {
    id: 3,
    title: 'Jam Sibuk Sore',
    description: 'Selesaikan 5 trip di jam 17:00-19:00',
    progress: 0,
    target: 5,
    reward: 25000,
    deadline: '19:00 WIB',
    gradient: 'from-[#FFB84D] to-[#FF9500]',
    active: true,
  },
  {
    id: 4,
    title: 'Weekend Warrior',
    description: 'Selesaikan 20 trip di akhir pekan',
    progress: 8,
    target: 20,
    reward: 100000,
    deadline: 'Minggu, 23:59',
    gradient: 'from-[#9B7DFF] to-[#7B5FFF]',
    active: true,
  },
]

const completedIncentives = [
  { id: 5, title: 'Bonus 10 Trip', reward: 30000, date: 'Kemarin' },
  { id: 6, title: 'Rating Bintang 5', reward: 15000, date: '2 hari lalu' },
]

export function DriverIncentives({ onNavigate }: DriverIncentivesProps) {
  const totalPotentialReward = incentives.reduce((sum, i) => sum + i.reward, 0)

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('earnings')}
            className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <h1 className="text-lg font-bold text-foreground">Insentif</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Summary Card */}
        <div className="px-5 py-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#FFB84D] to-[#FF9500] rounded-2xl p-4 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-xs">Potensi Bonus Hari Ini</p>
                <p className="text-white text-2xl font-bold">
                  Rp {totalPotentialReward.toLocaleString('id-ID')}
                </p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Active Incentives */}
        <div className="px-5 py-3">
          <h3 className="text-sm font-semibold text-foreground mb-3">Insentif Aktif</h3>
          <div className="space-y-3">
            {incentives.map((incentive, index) => (
              <motion.div
                key={incentive.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-4 shadow-soft"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${incentive.gradient} flex items-center justify-center flex-shrink-0`}>
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{incentive.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{incentive.description}</p>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-muted-foreground">
                      {incentive.progress}/{incentive.target} selesai
                    </span>
                    <span className="text-xs font-semibold text-primary">
                      Rp {incentive.reward.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(incentive.progress / incentive.target) * 100}%` }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      className={`h-full rounded-full bg-gradient-to-r ${incentive.gradient}`}
                    />
                  </div>
                </div>

                {/* Deadline */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Berakhir: {incentive.deadline}</span>
                  </div>
                  {incentive.progress > 0 && (
                    <div className="flex items-center gap-1 text-xs text-[#52D49F]">
                      <TrendingUp className="w-3 h-3" />
                      <span>{Math.round((incentive.progress / incentive.target) * 100)}%</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Completed Incentives */}
        <div className="px-5 py-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Selesai</h3>
            <button className="text-xs text-primary font-medium flex items-center gap-1">
              Lihat Semua <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            {completedIncentives.map((incentive, index) => (
              <motion.div
                key={incentive.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-4 flex items-center gap-3 shadow-soft"
              >
                <div className="w-10 h-10 bg-[#52D49F]/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#52D49F]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{incentive.title}</p>
                  <p className="text-xs text-muted-foreground">{incentive.date}</p>
                </div>
                <p className="text-sm font-semibold text-[#52D49F]">
                  +Rp {incentive.reward.toLocaleString('id-ID')}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="px-5 py-3">
          <div className="bg-primary/10 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Tips Raih Bonus</p>
                <p className="text-xs text-muted-foreground">
                  Aktifkan status online di jam sibuk (07:00-09:00 dan 17:00-19:00) untuk mendapat lebih banyak order dan bonus insentif.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
