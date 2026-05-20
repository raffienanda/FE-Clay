'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Search,
  Star,
  Clock,
  MapPin,
  Heart,
  Calendar,
  User,
  Stethoscope,
  Pill,
  Activity,
  Baby,
  Brain,
  Bone,
} from 'lucide-react'
import type { Screen } from '@/app/page'

interface ClayCareScreenProps {
  onNavigate: (screen: Screen) => void
}

const healthServices = [
  { id: 'doctor', name: 'Dokter Umum', icon: Stethoscope, color: 'bg-[#FF8FAB]' },
  { id: 'pharmacy', name: 'Apotek', icon: Pill, color: 'bg-[#52D49F]' },
  { id: 'lab', name: 'Laboratorium', icon: Activity, color: 'bg-primary' },
  { id: 'mother', name: 'Ibu & Anak', icon: Baby, color: 'bg-[#FFB84D]' },
  { id: 'mental', name: 'Kesehatan Mental', icon: Brain, color: 'bg-[#9B7DFF]' },
  { id: 'physio', name: 'Fisioterapi', icon: Bone, color: 'bg-accent' },
]

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Wijaya, Sp.PD',
    specialty: 'Spesialis Penyakit Dalam',
    image: '👩‍⚕️',
    rating: 4.9,
    reviews: 1234,
    experience: '15 tahun',
    price: 150000,
    available: true,
    nextSlot: 'Hari ini, 14:00',
  },
  {
    id: 2,
    name: 'Dr. Ahmad Hidayat, Sp.A',
    specialty: 'Spesialis Anak',
    image: '👨‍⚕️',
    rating: 4.8,
    reviews: 892,
    experience: '12 tahun',
    price: 175000,
    available: true,
    nextSlot: 'Besok, 09:00',
  },
  {
    id: 3,
    name: 'Dr. Lisa Permata, M.Psi',
    specialty: 'Psikolog Klinis',
    image: '👩‍⚕️',
    rating: 4.9,
    reviews: 567,
    experience: '8 tahun',
    price: 200000,
    available: false,
    nextSlot: 'Rabu, 10:00',
  },
]

const upcomingAppointments = [
  {
    id: 1,
    doctor: 'Dr. Sarah Wijaya',
    specialty: 'Penyakit Dalam',
    date: 'Hari ini, 14:00',
    type: 'Video Call',
    image: '👩‍⚕️',
  },
]

export function ClayCareScreen({ onNavigate }: ClayCareScreenProps) {
  const [selectedService, setSelectedService] = useState('doctor')
  const [bookingDoctor, setBookingDoctor] = useState<number | null>(null)
  const [isBooking, setIsBooking] = useState(false)

  const handleBookDoctor = async (id: number) => {
    setBookingDoctor(id)
    setIsBooking(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsBooking(false)
    setBookingDoctor(null)
    alert('Janji berhasil dibuat! Cek jadwal di halaman Aktivitas.')
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 py-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('home')}
              className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            <div>
              <h1 className="text-lg font-bold text-foreground">ClayCare</h1>
              <p className="text-xs text-muted-foreground">Kesehatan dalam genggaman</p>
            </div>
          </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('Fitur beli obat akan segera hadir!')}
              className="bg-card rounded-2xl shadow-soft p-4 flex items-center gap-3"
            >
            <Heart className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari dokter, spesialis, atau gejala..."
            className="w-full h-12 bg-card rounded-2xl shadow-soft pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-6 px-5">
        {/* Services */}
        <div className="py-3">
          <h3 className="text-sm font-semibold text-foreground mb-3">Layanan Kesehatan</h3>
          <div className="grid grid-cols-3 gap-2">
            {healthServices.map((service) => (
              <motion.button
                key={service.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedService(service.id)}
                className={`p-3 rounded-2xl text-center transition-all ${
                  selectedService === service.id
                    ? 'bg-[#FF8FAB]/10 border-2 border-[#FF8FAB]'
                    : 'bg-card shadow-soft border-2 border-transparent'
                }`}
              >
                <div className={`w-10 h-10 ${service.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                  <service.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-[10px] font-medium text-foreground leading-tight">{service.name}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Upcoming Appointment */}
        {upcomingAppointments.length > 0 && (
          <div className="py-3">
            <h3 className="text-sm font-semibold text-foreground mb-3">Jadwal Konsultasi</h3>
            {upcomingAppointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-[#FF8FAB] to-[#FFB8C9] rounded-2xl p-4 shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center text-2xl">
                    {appointment.image}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">{appointment.doctor}</p>
                    <p className="text-white/80 text-sm">{appointment.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-white/80 text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{appointment.date}</span>
                    </div>
                    <span className="text-white text-xs font-medium">{appointment.type}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('Fitur tes lab home service akan segera hadir!')}
              className="bg-card rounded-2xl shadow-soft p-4 flex items-center gap-3"
            >
                    <span className="text-white text-sm font-medium">Batalkan</span>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (confirm('Batalkan jadwal konsultasi ini?')) {
                        alert('Jadwal berhasil dibatalkan')
                      }
                    }}
                    className="flex-1 h-10 bg-white/20 rounded-xl flex items-center justify-center"
                  >
                    <span className="text-white text-sm font-medium">Batalkan</span>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert('Memulai konsultasi video call...')}
                    className="flex-1 h-10 bg-white rounded-xl flex items-center justify-center"
                  >
                    <span className="text-[#FF8FAB] text-sm font-medium">Mulai Konsultasi</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="py-3">
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-card rounded-2xl shadow-soft p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-[#52D49F]/10 rounded-xl flex items-center justify-center">
                <Pill className="w-5 h-5 text-[#52D49F]" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">Beli Obat</p>
                <p className="text-xs text-muted-foreground">Antar ke rumah</p>
              </div>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-card rounded-2xl shadow-soft p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">Tes Lab</p>
                <p className="text-xs text-muted-foreground">Home service</p>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Doctors */}
        <div className="py-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Dokter Tersedia</h3>
            <button
              onClick={() => alert('Lihat semua dokter tersedia')}
              className="text-xs text-primary font-medium"
            >
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                className="bg-card rounded-2xl shadow-soft p-4"
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-[#FF8FAB]/10 rounded-xl flex items-center justify-center text-3xl">
                    {doctor.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground">{doctor.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{doctor.specialty}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#FFB84D] fill-[#FFB84D]" />
                        <span className="text-xs font-medium text-foreground">{doctor.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{doctor.experience}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className={doctor.available ? 'text-[#52D49F]' : 'text-muted-foreground'}>
                          {doctor.nextSlot}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-primary">Rp {doctor.price.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBookDoctor(doctor.id)}
                  disabled={isBooking || !doctor.available}
                  className={`w-full h-10 mt-3 rounded-xl flex items-center justify-center ${
                    doctor.available
                      ? 'bg-[#FF8FAB]'
                      : 'bg-secondary'
                  } disabled:opacity-50`}
                >
                  {isBooking && bookingDoctor === doctor.id ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span className={`text-sm font-medium ${doctor.available ? 'text-white' : 'text-muted-foreground'}`}>
                      {doctor.available ? 'Buat Janji' : 'Jadwal Penuh'}
                    </span>
                  )}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
