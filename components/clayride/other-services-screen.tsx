'use client'

import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Search,
  Ticket,
  Plane,
  Train,
  Bus,
  CreditCard,
  Smartphone,
  Zap,
  Droplets,
  Wifi,
  Gamepad2,
  ShoppingBag,
  Gift,
  ChevronRight,
} from 'lucide-react'
import type { Screen } from '@/app/page'

interface OtherServicesScreenProps {
  onNavigate: (screen: Screen) => void
}

const travelServices = [
  { id: 'flight', name: 'Pesawat', icon: Plane, color: 'bg-primary' },
  { id: 'train', name: 'Kereta', icon: Train, color: 'bg-[#52D49F]' },
  { id: 'bus', name: 'Bus', icon: Bus, color: 'bg-[#FFB84D]' },
  { id: 'event', name: 'Event', icon: Ticket, color: 'bg-accent' },
]

const billServices = [
  { id: 'electricity', name: 'Listrik', icon: Zap, color: 'bg-[#FFB84D]' },
  { id: 'water', name: 'PDAM', icon: Droplets, color: 'bg-primary' },
  { id: 'internet', name: 'Internet', icon: Wifi, color: 'bg-[#52D49F]' },
  { id: 'phone', name: 'Pulsa', icon: Smartphone, color: 'bg-accent' },
]

const entertainmentServices = [
  { id: 'games', name: 'Top Up Game', icon: Gamepad2, color: 'bg-[#9B7DFF]' },
  { id: 'shopping', name: 'E-Commerce', icon: ShoppingBag, color: 'bg-accent' },
  { id: 'voucher', name: 'Voucher', icon: Gift, color: 'bg-[#52D49F]' },
  { id: 'ewallet', name: 'E-Wallet', icon: CreditCard, color: 'bg-primary' },
]

const promos = [
  {
    id: 1,
    title: 'Diskon Tiket Pesawat',
    desc: 'Potongan hingga Rp 500.000',
    gradient: 'from-primary to-[#5A9FFF]',
    icon: '✈️',
  },
  {
    id: 2,
    title: 'Cashback Bayar Listrik',
    desc: 'Cashback 10% max Rp 50.000',
    gradient: 'from-[#FFB84D] to-[#FFCC80]',
    icon: '⚡',
  },
]

export function OtherServicesScreen({ onNavigate }: OtherServicesScreenProps) {
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
            <h1 className="text-lg font-bold text-foreground">Layanan Lainnya</h1>
            <p className="text-xs text-muted-foreground">Semua kebutuhan dalam satu aplikasi</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari layanan..."
            className="w-full h-12 bg-card rounded-2xl shadow-soft pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-6 px-5">
        {/* Promos */}
        <div className="py-3">
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {promos.map((promo, index) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`min-w-[240px] h-28 bg-gradient-to-br ${promo.gradient} rounded-2xl p-4 flex items-center gap-3 shadow-soft`}
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  {promo.icon}
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">{promo.title}</p>
                  <p className="text-white/80 text-xs">{promo.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Travel & Tickets */}
        <div className="py-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Travel & Tiket</h3>
            <button className="text-xs text-primary font-medium flex items-center">
              Lihat Semua <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {travelServices.map((service, index) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-card rounded-2xl shadow-soft p-3 text-center"
              >
                <div className={`w-10 h-10 ${service.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                  <service.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-[10px] font-medium text-foreground">{service.name}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bill Payments */}
        <div className="py-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Bayar Tagihan</h3>
            <button className="text-xs text-primary font-medium flex items-center">
              Lihat Semua <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {billServices.map((service, index) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-card rounded-2xl shadow-soft p-3 text-center"
              >
                <div className={`w-10 h-10 ${service.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                  <service.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-[10px] font-medium text-foreground">{service.name}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Entertainment */}
        <div className="py-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Hiburan & Belanja</h3>
            <button className="text-xs text-primary font-medium flex items-center">
              Lihat Semua <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {entertainmentServices.map((service, index) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-card rounded-2xl shadow-soft p-3 text-center"
              >
                <div className={`w-10 h-10 ${service.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                  <service.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-[10px] font-medium text-foreground">{service.name}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Quick Bills */}
        <div className="py-3">
          <h3 className="text-sm font-semibold text-foreground mb-3">Tagihan Tersimpan</h3>
          <div className="space-y-2">
            {[
              { name: 'PLN - 123456789', type: 'Listrik', amount: 350000, icon: Zap, color: 'text-[#FFB84D]' },
              { name: 'Telkomsel - 0812xxx', type: 'Pulsa', amount: 50000, icon: Smartphone, color: 'text-accent' },
            ].map((bill, index) => (
              <motion.button
                key={bill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('topup')}
                className="w-full bg-card rounded-2xl shadow-soft p-4 flex items-center gap-4 text-left"
              >
                <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                  <bill.icon className={`w-5 h-5 ${bill.color}`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">{bill.name}</p>
                  <p className="text-xs text-muted-foreground">{bill.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">Rp {bill.amount.toLocaleString('id-ID')}</p>
                  <span className="text-xs text-primary font-medium">Bayar</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Insurance Banner */}
        <div className="py-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#9B7DFF] to-[#7B5DDF] rounded-2xl p-4 shadow-soft"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                🛡️
              </div>
              <div className="flex-1">
                <p className="text-white font-bold">Asuransi CLAY</p>
                <p className="text-white/80 text-xs">Lindungi diri dan keluarga mulai Rp 10.000/bulan</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white/20 rounded-xl"
              >
                <span className="text-white text-xs font-medium">Lihat</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
