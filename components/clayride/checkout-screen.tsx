'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Clock,
  ChevronRight,
  CheckCircle,
  Wallet,
  Tag,
  MessageSquare,
  Shield,
} from 'lucide-react'
import Image from 'next/image'
import type { Screen } from '@/app/page'

interface CheckoutScreenProps {
  onNavigate: (screen: Screen) => void
  items: any[]
  clearCart: () => void
}

export function CheckoutScreen({ onNavigate, items, clearCart }: CheckoutScreenProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState('claywallet')

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = 10000
  const serviceFee = 2000
  const discount = 5000
  const total = subtotal + deliveryFee + serviceFee - discount

  const handleCheckout = async () => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsSuccess(true)
    clearCart()
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
          <CheckCircle className="w-12 h-12 text-green-500" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-foreground mb-2"
        >
          Pesanan Berhasil!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted-foreground text-center mb-8"
        >
          Pesananmu sedang diproses dan akan segera diantar
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
            className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center"
          >
            <span className="text-white font-semibold">Lacak Pesanan</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('home')}
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
      <div className="px-5 py-3 flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('cart')}
          className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </motion.button>
        <h1 className="text-lg font-bold text-foreground">Checkout</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-40">
        {/* Delivery Address */}
        <div className="px-5 py-2">
          <h3 className="text-sm font-semibold text-foreground mb-3">Alamat Pengiriman</h3>
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-card rounded-2xl p-4 shadow-soft flex items-start gap-4 text-left"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground mb-1">Rumah</p>
              <p className="text-xs text-muted-foreground">
                Jl. Sudirman No. 123, Kelurahan Gelora, Kecamatan Tanah Abang, Jakarta Pusat
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </motion.button>
        </div>

        {/* Delivery Time */}
        <div className="px-5 py-2">
          <h3 className="text-sm font-semibold text-foreground mb-3">Waktu Pengiriman</h3>
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-card rounded-2xl p-4 shadow-soft flex items-center gap-4 text-left"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Sekarang</p>
              <p className="text-xs text-muted-foreground">Estimasi 25-35 menit</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </div>

        {/* Order Items */}
        <div className="px-5 py-2">
          <h3 className="text-sm font-semibold text-foreground mb-3">Pesanan ({items.length} item)</h3>
          <div className="bg-card rounded-2xl p-4 shadow-soft space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden">
                  <Image
                    src={item.image || 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=100&h=100&fit=crop'}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.quantity}x</p>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="px-5 py-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-card rounded-2xl p-4 shadow-soft flex items-center gap-4 text-left"
          >
            <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Catatan untuk Driver</p>
              <p className="text-xs text-muted-foreground">Tambahkan instruksi pengiriman</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </div>

        {/* Payment Method */}
        <div className="px-5 py-2">
          <h3 className="text-sm font-semibold text-foreground mb-3">Metode Pembayaran</h3>
          <div className="space-y-2">
            {[
              { id: 'claywallet', label: 'ClayWallet', balance: 'Rp 2.500.000', icon: Wallet },
              { id: 'bca', label: 'BCA Virtual Account', balance: '', icon: CreditCard },
            ].map((method) => (
              <motion.button
                key={method.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPayment(method.id)}
                className={`w-full p-4 rounded-2xl flex items-center gap-4 text-left transition-colors ${
                  selectedPayment === method.id 
                    ? 'bg-primary/10 border-2 border-primary' 
                    : 'bg-card border-2 border-transparent shadow-soft'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  selectedPayment === method.id ? 'bg-primary' : 'bg-muted'
                }`}>
                  <method.icon className={`w-5 h-5 ${
                    selectedPayment === method.id ? 'text-white' : 'text-muted-foreground'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{method.label}</p>
                  {method.balance && (
                    <p className="text-xs text-muted-foreground">{method.balance}</p>
                  )}
                </div>
                {selectedPayment === method.id && (
                  <CheckCircle className="w-5 h-5 text-primary" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="px-5 py-4">
          <div className="bg-card rounded-2xl p-4 shadow-soft space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-sm font-medium text-foreground">Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Ongkos Kirim</span>
              <span className="text-sm font-medium text-foreground">Rp {deliveryFee.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Biaya Layanan</span>
              <span className="text-sm font-medium text-foreground">Rp {serviceFee.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span className="text-sm flex items-center gap-1">
                <Tag className="w-3 h-3" /> Diskon
              </span>
              <span className="text-sm font-medium">-Rp {discount.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-border">
              <span className="text-sm font-semibold text-foreground">Total Pembayaran</span>
              <span className="text-lg font-bold text-primary">Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {/* Insurance Info */}
        <div className="px-5 py-2">
          <div className="bg-green-50 rounded-2xl p-4 flex items-center gap-3">
            <Shield className="w-5 h-5 text-green-600" />
            <p className="text-xs text-green-700">
              Pesananmu dilindungi asuransi pengiriman
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-background border-t border-border">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center gap-2 shadow-soft disabled:opacity-70"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <span className="text-white font-semibold">
              Bayar Rp {total.toLocaleString('id-ID')}
            </span>
          )}
        </motion.button>
      </div>
    </div>
  )
}
