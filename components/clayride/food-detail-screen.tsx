'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  Clock,
  MapPin,
  Plus,
  Minus,
  ShoppingCart,
} from 'lucide-react'
import Image from 'next/image'
import type { Screen } from '@/app/page'

interface FoodDetailScreenProps {
  onNavigate: (screen: Screen) => void
  food: any
  addToCart: (item: any) => void
}

const addOns = [
  { id: '1', name: 'Telur Ceplok', price: 5000 },
  { id: '2', name: 'Kerupuk', price: 3000 },
  { id: '3', name: 'Sambal Extra', price: 2000 },
  { id: '4', name: 'Ayam Goreng', price: 15000 },
]

export function FoodDetailScreen({ onNavigate, food, addToCart }: FoodDetailScreenProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [isFavorite, setIsFavorite] = useState(false)
  const [notes, setNotes] = useState('')

  const defaultFood = {
    id: 'nasi-goreng-1',
    name: 'Nasi Goreng Spesial',
    restaurant: 'Warung Pak Joko',
    price: 25000,
    rating: 4.8,
    reviews: 256,
    time: '15-20',
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    description: 'Nasi goreng dengan telur, ayam, dan sayuran segar. Dilengkapi dengan kerupuk dan acar.',
  }

  const item = food || defaultFood

  const addOnsTotal = selectedAddOns.reduce((sum, id) => {
    const addon = addOns.find(a => a.id === id)
    return sum + (addon?.price || 0)
  }, 0)

  const totalPrice = (item.price + addOnsTotal) * quantity

  const handleAddToCart = () => {
    addToCart({
      ...item,
      quantity,
      addOns: selectedAddOns.map(id => addOns.find(a => a.id === id)),
      notes,
      totalPrice,
    })
    onNavigate('cart')
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Image Header */}
      <div className="relative h-64">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Top Actions */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('clayfood')}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-soft flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-soft flex items-center justify-center"
            >
              <Share2 className="w-5 h-5 text-foreground" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-soft flex items-center justify-center"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'text-accent fill-accent' : 'text-foreground'}`} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto -mt-6 bg-background rounded-t-3xl relative pb-32">
        <div className="px-5 py-6">
          {/* Title & Price */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground mb-1">{item.name}</h1>
              <p className="text-sm text-muted-foreground">{item.restaurant}</p>
            </div>
            <p className="text-xl font-bold text-primary">
              Rp {item.price.toLocaleString('id-ID')}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 py-4 border-b border-border">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium text-foreground">{item.rating}</span>
              <span className="text-xs text-muted-foreground">({item.reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{item.time} min</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{item.distance}</span>
            </div>
          </div>

          {/* Description */}
          <div className="py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground mb-2">Deskripsi</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>

          {/* Add-ons */}
          <div className="py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">Tambahan (Opsional)</h3>
            <div className="space-y-2">
              {addOns.map((addon) => (
                <motion.button
                  key={addon.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedAddOns(prev => 
                      prev.includes(addon.id) 
                        ? prev.filter(id => id !== addon.id)
                        : [...prev, addon.id]
                    )
                  }}
                  className={`w-full p-3 rounded-xl flex items-center justify-between transition-colors ${
                    selectedAddOns.includes(addon.id) 
                      ? 'bg-primary/10 border-2 border-primary' 
                      : 'bg-card border-2 border-transparent shadow-soft'
                  }`}
                >
                  <span className="text-sm font-medium text-foreground">{addon.name}</span>
                  <span className="text-sm text-muted-foreground">+Rp {addon.price.toLocaleString('id-ID')}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="py-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Catatan untuk Penjual</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Tidak pakai bawang, pedas sedang"
              className="w-full p-4 rounded-xl bg-card shadow-soft text-sm text-foreground placeholder:text-muted-foreground resize-none h-20 outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-background border-t border-border">
        <div className="flex items-center gap-4">
          {/* Quantity */}
          <div className="flex items-center gap-3 bg-card rounded-xl p-2 shadow-soft">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"
            >
              <Minus className="w-4 h-4 text-foreground" />
            </motion.button>
            <span className="w-8 text-center font-semibold text-foreground">{quantity}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"
            >
              <Plus className="w-4 h-4 text-white" />
            </motion.button>
          </div>

          {/* Add to Cart */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="flex-1 h-14 bg-primary rounded-2xl flex items-center justify-center gap-2 shadow-soft"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">
              Tambah - Rp {totalPrice.toLocaleString('id-ID')}
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
