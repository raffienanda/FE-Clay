'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Package,
  MapPin,
  Clock,
  ChevronRight,
  Box,
  FileText,
  ShieldCheck,
  Truck,
  Scale,
  Camera,
} from 'lucide-react'
import type { Screen } from '@/app/page'

interface ClaySendScreenProps {
  onNavigate: (screen: Screen) => void
}

const deliveryTypes = [
  { 
    id: 'instant', 
    name: 'Instan', 
    desc: 'Sampai dalam 1-2 jam',
    price: 15000,
    icon: '⚡',
    color: 'bg-accent'
  },
  { 
    id: 'sameday', 
    name: 'Same Day', 
    desc: 'Sampai hari ini',
    price: 12000,
    icon: '📦',
    color: 'bg-primary'
  },
  { 
    id: 'regular', 
    name: 'Reguler', 
    desc: 'Sampai 1-2 hari',
    price: 8000,
    icon: '🚚',
    color: 'bg-[#52D49F]'
  },
]

const packageSizes = [
  { id: 'small', name: 'Kecil', desc: 'Max 1 kg', icon: '📄', maxWeight: '1 kg' },
  { id: 'medium', name: 'Sedang', desc: 'Max 5 kg', icon: '📦', maxWeight: '5 kg' },
  { id: 'large', name: 'Besar', desc: 'Max 10 kg', icon: '🗃️', maxWeight: '10 kg' },
]

const recentSends = [
  { 
    id: 1, 
    recipient: 'Andi Pratama',
    address: 'Jl. Gatot Subroto No. 45, Jakarta Selatan',
    date: 'Kemarin',
    status: 'delivered'
  },
  { 
    id: 2, 
    recipient: 'Siti Aminah',
    address: 'Jl. Thamrin No. 12, Jakarta Pusat',
    date: '2 hari lalu',
    status: 'delivered'
  },
]

export function ClaySendScreen({ onNavigate }: ClaySendScreenProps) {
  const [selectedDelivery, setSelectedDelivery] = useState('instant')
  const [selectedSize, setSelectedSize] = useState('small')
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [packageContent, setPackageContent] = useState('')

  const selectedDeliveryOption = deliveryTypes.find(d => d.id === selectedDelivery)

  const handleSendPackage = async () => {
    if (!pickup || !destination || !packageContent) {
      alert('Mohon lengkapi semua informasi pengiriman')
      return
    }
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="h-full flex flex-col bg-background items-center justify-center px-5">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
        >
          <ShieldCheck className="w-12 h-12 text-green-500" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-foreground mb-2"
        >
          Paket Siap Dijemput!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted-foreground text-center mb-2"
        >
          Kurir akan menjemput paket dalam 10 menit
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg font-bold text-primary mb-8"
        >
          Rp {selectedDeliveryOption?.price.toLocaleString('id-ID')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full space-y-3"
        >
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('activity')}
            className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center"
          >
            <span className="text-white font-semibold">Lacak Paket</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setIsSuccess(false)
              setPickup('')
              setDestination('')
              setPackageContent('')
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
            <h1 className="text-lg font-bold text-foreground">ClaySend</h1>
            <p className="text-xs text-muted-foreground">Kirim paket dengan mudah</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32 px-5">
        {/* Pickup & Destination */}
        <div className="bg-card rounded-2xl shadow-soft p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center pt-1">
              <div className="w-3 h-3 bg-[#52D49F] rounded-full" />
              <div className="w-0.5 h-12 bg-muted" />
              <div className="w-3 h-3 bg-accent rounded-full" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Lokasi Jemput</p>
                <input
                  type="text"
                  placeholder="Masukkan alamat jemput..."
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full h-10 bg-secondary rounded-xl px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Lokasi Tujuan</p>
                <input
                  type="text"
                  placeholder="Masukkan alamat tujuan..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full h-10 bg-secondary rounded-xl px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Type */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Jenis Pengiriman</h3>
          <div className="grid grid-cols-3 gap-2">
            {deliveryTypes.map((type) => (
              <motion.button
                key={type.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDelivery(type.id)}
                className={`p-3 rounded-2xl text-center transition-all ${
                  selectedDelivery === type.id
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-card shadow-soft border-2 border-transparent'
                }`}
              >
                <div className={`w-10 h-10 ${type.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                  <span className="text-lg">{type.icon}</span>
                </div>
                <p className="text-xs font-semibold text-foreground">{type.name}</p>
                <p className="text-[10px] text-muted-foreground">{type.desc}</p>
                <p className="text-xs font-bold text-primary mt-1">Rp {type.price.toLocaleString('id-ID')}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Package Size */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Ukuran Paket</h3>
          <div className="grid grid-cols-3 gap-2">
            {packageSizes.map((size) => (
              <motion.button
                key={size.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSize(size.id)}
                className={`p-3 rounded-2xl text-center transition-all ${
                  selectedSize === size.id
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-card shadow-soft border-2 border-transparent'
                }`}
              >
                <span className="text-2xl block mb-1">{size.icon}</span>
                <p className="text-xs font-semibold text-foreground">{size.name}</p>
                <p className="text-[10px] text-muted-foreground">{size.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Package Details */}
        <div className="bg-card rounded-2xl shadow-soft p-4 mb-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Detail Paket</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Isi Paket</p>
              <input
                type="text"
                placeholder="Contoh: Dokumen, Makanan, Elektronik..."
                value={packageContent}
                onChange={(e) => setPackageContent(e.target.value)}
                className="w-full h-10 bg-secondary rounded-xl px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary rounded-xl">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Foto Paket</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => alert('Fitur foto paket akan segera hadir!')}
                className="text-xs text-primary font-medium"
              >
                Tambah
              </motion.button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { icon: ShieldCheck, label: 'Asuransi' },
            { icon: Truck, label: 'Tracking' },
            { icon: Scale, label: 'Berat Max' },
          ].map((feature) => (
            <div key={feature.label} className="bg-card rounded-2xl shadow-soft p-3 text-center">
              <feature.icon className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-[10px] text-muted-foreground">{feature.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Sends */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Riwayat Pengiriman</h3>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('activity')}
              className="text-xs text-primary font-medium"
            >
              Lihat Semua
            </motion.button>
          </div>
          <div className="space-y-2">
            {recentSends.map((send) => (
              <motion.button
                key={send.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('activity')}
                className="w-full bg-card rounded-2xl shadow-soft p-4 flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 bg-[#52D49F]/10 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#52D49F]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{send.recipient}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{send.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground">{send.date}</p>
                  <span className="text-[10px] font-medium text-[#52D49F]">Terkirim</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="absolute bottom-6 left-5 right-5">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSendPackage}
          disabled={isProcessing}
          className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center shadow-soft disabled:opacity-70"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Truck className="w-5 h-5 text-white mr-2" />
              <span className="text-white font-semibold">
                Kirim Paket - Rp {(selectedDeliveryOption?.price || 0).toLocaleString('id-ID')}
              </span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}
