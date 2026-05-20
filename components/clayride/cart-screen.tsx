'use client'

import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Tag,
  ChevronRight,
} from 'lucide-react'
import Image from 'next/image'
import type { Screen } from '@/app/page'

interface CartScreenProps {
  onNavigate: (screen: Screen) => void
  items: any[]
  updateQuantity: (id: string, quantity: number) => void
}

export function CartScreen({ onNavigate, items, updateQuantity }: CartScreenProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = 10000
  const serviceFee = 2000
  const total = subtotal + deliveryFee + serviceFee

  if (items.length === 0) {
    return (
      <div className="h-full flex flex-col bg-background">
        {/* Header */}
        <div className="px-5 py-3 flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('clayfood')}
            className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <h1 className="text-lg font-bold text-foreground">Keranjang</h1>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center px-5">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Keranjang Kosong</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Yuk, mulai pesan makanan favoritmu!
          </p>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('clayfood')}
            className="px-6 py-3 bg-primary rounded-2xl"
          >
            <span className="text-white font-semibold">Pesan Sekarang</span>
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 py-3 flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('clayfood')}
          className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </motion.button>
        <h1 className="text-lg font-bold text-foreground">Keranjang</h1>
        <span className="text-sm text-muted-foreground">({items.length} item)</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-48">
        {/* Items */}
        <div className="px-5 py-2 space-y-3">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-2xl p-4 shadow-soft"
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image || 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop'}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground mb-1">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{item.restaurant || 'Restaurant'}</p>
                  <p className="text-sm font-bold text-primary">
                    Rp {item.price.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
              
              {/* Quantity Controls */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateQuantity(item.id, 0)}
                  className="flex items-center gap-2 text-accent"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Hapus</span>
                </motion.button>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4 text-foreground" />
                  </motion.button>
                  <span className="w-8 text-center font-semibold text-foreground">{item.quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Voucher */}
        <div className="px-5 py-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('voucher')}
            className="w-full bg-card rounded-2xl p-4 shadow-soft flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
              <Tag className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-foreground">Pakai Voucher</p>
              <p className="text-xs text-muted-foreground">Hemat lebih banyak dengan voucher</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </div>

        {/* Order Summary */}
        <div className="px-5 py-2">
          <h3 className="text-sm font-semibold text-foreground mb-3">Ringkasan Pesanan</h3>
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
            <div className="flex justify-between pt-3 border-t border-border">
              <span className="text-sm font-semibold text-foreground">Total</span>
              <span className="text-lg font-bold text-primary">Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-background border-t border-border">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('checkout')}
          className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center gap-2 shadow-soft"
        >
          <span className="text-white font-semibold">
            Checkout - Rp {total.toLocaleString('id-ID')}
          </span>
        </motion.button>
      </div>
    </div>
  )
}
