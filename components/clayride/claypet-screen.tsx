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
  PawPrint,
  Scissors,
  Stethoscope,
  Home,
  ShoppingBag,
} from 'lucide-react'
import type { Screen } from '@/app/page'

interface ClayPetScreenProps {
  onNavigate: (screen: Screen) => void
}

const petServices = [
  { id: 'grooming', name: 'Grooming', icon: Scissors, color: 'bg-[#FFB84D]' },
  { id: 'vet', name: 'Dokter Hewan', icon: Stethoscope, color: 'bg-accent' },
  { id: 'hotel', name: 'Pet Hotel', icon: Home, color: 'bg-primary' },
  { id: 'shop', name: 'Pet Shop', icon: ShoppingBag, color: 'bg-[#52D49F]' },
]

const popularPetShops = [
  {
    id: 1,
    name: 'Happy Paws Grooming',
    image: '🐕',
    rating: 4.9,
    reviews: 567,
    distance: '1.5 km',
    services: ['Grooming', 'Spa'],
    price: 150000,
    promo: '20% OFF',
  },
  {
    id: 2,
    name: 'Dr. Vet Clinic',
    image: '🏥',
    rating: 4.8,
    reviews: 892,
    distance: '2.1 km',
    services: ['Vaksinasi', 'Checkup'],
    price: 100000,
    promo: null,
  },
  {
    id: 3,
    name: 'Cozy Pet Hotel',
    image: '🏨',
    rating: 4.7,
    reviews: 234,
    distance: '3.2 km',
    services: ['Pet Hotel', 'Daycare'],
    price: 200000,
    promo: 'Gratis Makan',
  },
]

const upcomingBookings = [
  {
    id: 1,
    petName: 'Max',
    petType: '🐕',
    service: 'Grooming Lengkap',
    date: 'Besok, 10:00',
    shop: 'Happy Paws',
  },
]

export function ClayPetScreen({ onNavigate }: ClayPetScreenProps) {
  const [selectedService, setSelectedService] = useState('grooming')

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
              <h1 className="text-lg font-bold text-foreground">ClayPet</h1>
              <p className="text-xs text-muted-foreground">Perawatan hewan kesayangan</p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
          >
            <Heart className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari layanan pet..."
            className="w-full h-12 bg-card rounded-2xl shadow-soft pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-6 px-5">
        {/* Services */}
        <div className="py-3">
          <h3 className="text-sm font-semibold text-foreground mb-3">Layanan</h3>
          <div className="grid grid-cols-4 gap-2">
            {petServices.map((service) => (
              <motion.button
                key={service.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedService(service.id)}
                className={`p-3 rounded-2xl text-center transition-all ${
                  selectedService === service.id
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-card shadow-soft border-2 border-transparent'
                }`}
              >
                <div className={`w-10 h-10 ${service.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                  <service.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-[10px] font-medium text-foreground">{service.name}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Upcoming Booking */}
        {upcomingBookings.length > 0 && (
          <div className="py-3">
            <h3 className="text-sm font-semibold text-foreground mb-3">Jadwal Mendatang</h3>
            {upcomingBookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-[#FFB84D] to-[#FFCC80] rounded-2xl p-4 shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center text-2xl">
                    {booking.petType}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">{booking.petName}</p>
                    <p className="text-white/80 text-sm">{booking.service}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-white/80 text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{booking.date}</span>
                    </div>
                    <p className="text-white text-xs mt-1">{booking.shop}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* My Pets */}
        <div className="py-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Hewan Saya</h3>
            <button
              onClick={() => alert('Fitur tambah hewan peliharaan akan segera hadir!')}
              className="text-xs text-primary font-medium"
            >
              + Tambah
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {[
              { name: 'Max', type: 'Anjing Golden', emoji: '🐕', age: '3 tahun' },
              { name: 'Milo', type: 'Kucing Persia', emoji: '🐈', age: '2 tahun' },
            ].map((pet, index) => (
              <motion.div
                key={pet.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="min-w-[140px] bg-card rounded-2xl shadow-soft p-4 text-center"
              >
                <div className="w-16 h-16 bg-[#FFB84D]/10 rounded-full flex items-center justify-center mx-auto mb-2 text-3xl">
                  {pet.emoji}
                </div>
                <p className="text-sm font-semibold text-foreground">{pet.name}</p>
                <p className="text-xs text-muted-foreground">{pet.type}</p>
                <p className="text-[10px] text-muted-foreground">{pet.age}</p>
              </motion.div>
            ))}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('Fitur tambah hewan peliharaan akan segera hadir!')}
              className="min-w-[140px] bg-card rounded-2xl shadow-soft p-4 text-center border-2 border-dashed border-muted flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <PawPrint className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-xs font-medium text-muted-foreground">Tambah Hewan</p>
            </motion.button>
          </div>
        </div>

        {/* Popular Shops */}
        <div className="py-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Rekomendasi</h3>
            <button
              onClick={() => alert('Lihat semua rekomendasi')}
              className="text-xs text-primary font-medium"
            >
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3">
            {popularPetShops.map((shop, index) => (
              <motion.div
                key={shop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                className="bg-card rounded-2xl shadow-soft p-4 flex gap-4"
              >
                <div className="w-16 h-16 bg-[#FFB84D]/10 rounded-xl flex items-center justify-center text-3xl">
                  {shop.image}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-sm font-semibold text-foreground">{shop.name}</h3>
                    {shop.promo && (
                      <span className="px-2 py-0.5 bg-accent/10 rounded-full text-[10px] font-medium text-accent">
                        {shop.promo}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#FFB84D] fill-[#FFB84D]" />
                      <span className="text-xs font-medium text-foreground">{shop.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({shop.reviews})</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{shop.distance}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {shop.services.map((service) => (
                        <span key={service} className="px-2 py-0.5 bg-secondary rounded-full text-[10px] text-muted-foreground">
                          {service}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs font-bold text-primary">Rp {shop.price.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
