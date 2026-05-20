'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Recycle,
  Leaf,
  CheckCircle2,
  AlertCircle,
  Truck,
} from 'lucide-react'
import type { Screen } from '@/app/page'

interface ClayWasteScreenProps {
  onNavigate: (screen: Screen) => void
}

const wasteTypes = [
  { id: 'organic', name: 'Organik', icon: '🥬', color: 'bg-[#52D49F]', desc: 'Sisa makanan, daun' },
  { id: 'plastic', name: 'Plastik', icon: '🧴', color: 'bg-primary', desc: 'Botol, kantong' },
  { id: 'paper', name: 'Kertas', icon: '📄', color: 'bg-[#FFB84D]', desc: 'Kardus, koran' },
  { id: 'electronic', name: 'Elektronik', icon: '🔌', color: 'bg-accent', desc: 'HP, baterai' },
  { id: 'metal', name: 'Logam', icon: '🥫', color: 'bg-[#9B7DFF]', desc: 'Kaleng, besi' },
  { id: 'glass', name: 'Kaca', icon: '🫙', color: 'bg-[#FF8FAB]', desc: 'Botol kaca' },
]

const pickupSchedules = [
  { id: 1, day: 'Senin', date: '22 Jan', time: '08:00 - 10:00', status: 'scheduled', types: ['organic', 'plastic'] },
  { id: 2, day: 'Kamis', date: '25 Jan', time: '08:00 - 10:00', status: 'upcoming', types: ['paper', 'metal'] },
]

const impactStats = [
  { label: 'Sampah Didaur Ulang', value: '45 kg', icon: Recycle },
  { label: 'CO₂ Dikurangi', value: '12 kg', icon: Leaf },
  { label: 'Poin Reward', value: '1,250', icon: CheckCircle2 },
]

export function ClayWasteScreen({ onNavigate }: ClayWasteScreenProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [isScheduling, setIsScheduling] = useState(false)
  const [isScheduled, setIsScheduled] = useState(false)

  const toggleWasteType = (id: string) => {
    setSelectedTypes(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id]
    )
  }

  const handleSchedulePickup = async () => {
    if (selectedTypes.length === 0) return
    setIsScheduling(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsScheduling(false)
    setIsScheduled(true)
  }

  if (isScheduled) {
    return (
      <div className="h-full flex flex-col bg-background items-center justify-center px-5">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-[#9B7DFF]/10 rounded-full flex items-center justify-center mb-6"
        >
          <Truck className="w-12 h-12 text-[#9B7DFF]" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-foreground mb-2"
        >
          Penjemputan Terjadwal!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted-foreground text-center mb-8"
        >
          Tim kami akan menjemput sampah {selectedTypes.length} jenis pada jadwal berikutnya
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full space-y-3"
        >
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('activity')}
            className="w-full h-14 bg-[#9B7DFF] rounded-2xl flex items-center justify-center"
          >
            <span className="text-white font-semibold">Lihat Jadwal</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setIsScheduled(false)
              setSelectedTypes([])
              onNavigate('home')
            }}
            className="w-full h-14 bg-card rounded-2xl flex items-center justify-center shadow-soft"
          >
            <span className="text-foreground font-semibold">Kembali ke Beranda</span>
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 py-3">
        <div className="flex items-center gap-3 mb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <div>
            <h1 className="text-lg font-bold text-foreground">ClayWaste</h1>
            <p className="text-xs text-muted-foreground">Kelola sampah dengan bijak</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32 px-5">
        {/* Impact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#9B7DFF] to-[#7B5DDF] rounded-2xl p-4 mb-4 shadow-soft"
        >
          <div className="flex items-center gap-2 mb-3">
            <Leaf className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Dampak Lingkungan Anda</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {impactStats.map((stat) => (
              <div key={stat.label} className="bg-white/20 rounded-xl p-3 text-center">
                <stat.icon className="w-5 h-5 text-white mx-auto mb-1" />
                <p className="text-white font-bold text-sm">{stat.value}</p>
                <p className="text-white/70 text-[10px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Waste Types */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Pilih Jenis Sampah</h3>
          <div className="grid grid-cols-3 gap-2">
            {wasteTypes.map((type) => (
              <motion.button
                key={type.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleWasteType(type.id)}
                className={`p-3 rounded-2xl text-center transition-all ${
                  selectedTypes.includes(type.id)
                    ? 'bg-[#9B7DFF]/10 border-2 border-[#9B7DFF]'
                    : 'bg-card shadow-soft border-2 border-transparent'
                }`}
              >
                <div className={`w-10 h-10 ${type.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                  <span className="text-lg">{type.icon}</span>
                </div>
                <p className="text-xs font-semibold text-foreground">{type.name}</p>
                <p className="text-[10px] text-muted-foreground">{type.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="bg-card rounded-2xl shadow-soft p-4 mb-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Alamat Penjemputan</h3>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#9B7DFF]/10 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#9B7DFF]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Rumah</p>
              <p className="text-xs text-muted-foreground">Jl. Sudirman No. 123, Jakarta Pusat</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('Fitur ubah alamat penjemputan akan segera hadir!')}
              className="text-xs text-primary font-medium"
            >
              Ubah
            </motion.button>
          </div>
        </div>

        {/* Schedule */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Jadwal Penjemputan</h3>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('activity')}
              className="text-xs text-primary font-medium"
            >
              + Tambah
            </motion.button>
          </div>
          <div className="space-y-2">
            {pickupSchedules.map((schedule, index) => (
              <motion.div
                key={schedule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-card rounded-2xl shadow-soft p-4 border-l-4 ${
                  schedule.status === 'scheduled' ? 'border-l-[#52D49F]' : 'border-l-[#FFB84D]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#9B7DFF]/10 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#9B7DFF]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{schedule.day}, {schedule.date}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{schedule.time}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                    schedule.status === 'scheduled' 
                      ? 'bg-[#52D49F]/10 text-[#52D49F]'
                      : 'bg-[#FFB84D]/10 text-[#FFB84D]'
                  }`}>
                    {schedule.status === 'scheduled' ? 'Terjadwal' : 'Mendatang'}
                  </span>
                </div>
                <div className="flex gap-1 mt-2">
                  {schedule.types.map((type) => {
                    const wasteType = wasteTypes.find(w => w.id === type)
                    return (
                      <span key={type} className="px-2 py-1 bg-secondary rounded-full text-[10px] text-muted-foreground flex items-center gap-1">
                        <span>{wasteType?.icon}</span>
                        {wasteType?.name}
                      </span>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-[#52D49F]/10 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#52D49F] mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Tips Daur Ulang</p>
              <p className="text-xs text-muted-foreground">
                Pastikan sampah plastik sudah dicuci dan dikeringkan sebelum dijemput untuk hasil daur ulang yang lebih baik.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="absolute bottom-6 left-5 right-5">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSchedulePickup}
          disabled={selectedTypes.length === 0 || isScheduling}
          className={`w-full h-14 rounded-2xl flex items-center justify-center shadow-soft transition-all ${
            selectedTypes.length > 0
              ? 'bg-[#9B7DFF]'
              : 'bg-muted'
          } disabled:opacity-70`}
        >
          {isScheduling ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Truck className="w-5 h-5 text-white mr-2" />
              <span className="text-white font-semibold">
                {selectedTypes.length > 0 
                  ? `Jadwalkan Penjemputan (${selectedTypes.length} jenis)`
                  : 'Pilih Jenis Sampah'
                }
              </span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}
