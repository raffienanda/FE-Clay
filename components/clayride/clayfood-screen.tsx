'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Search,
  Star,
  Clock,
  MapPin,
  Plus,
  ShoppingCart,
  ChevronRight,
} from 'lucide-react'
import Image from 'next/image'
import type { Screen } from '@/app/page'

interface ClayFoodScreenProps {
  onNavigate: (screen: Screen) => void
  setSelectedFood: (food: any) => void
  cartItemsCount?: number
}

const categories = [
  { id: 'all', label: 'Semua', icon: '🍽️' },
  { id: 'promo', label: 'Promo', icon: '🔥' },
  { id: 'rice', label: 'Nasi', icon: '🍚' },
  { id: 'noodle', label: 'Mie', icon: '🍜' },
  { id: 'chicken', label: 'Ayam', icon: '🍗' },
  { id: 'drink', label: 'Minuman', icon: '🧋' },
]

const restaurants = [
  {
    id: '1',
    name: 'Warung Padang Sederhana',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=200&h=200&fit=crop',
    rating: 4.8,
    reviews: 1234,
    distance: '1.2 km',
    time: '15-25 mnt',
    promo: 'Diskon 30%',
    tags: ['Padang', 'Nasi'],
  },
  {
    id: '2',
    name: 'Mie Ayam Bakso Pak Haji',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop',
    rating: 4.7,
    reviews: 856,
    distance: '0.8 km',
    time: '10-15 mnt',
    promo: null,
    tags: ['Mie', 'Bakso'],
  },
  {
    id: '3',
    name: 'Ayam Geprek Bensu',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&h=200&fit=crop',
    rating: 4.6,
    reviews: 2341,
    distance: '2.1 km',
    time: '20-30 mnt',
    promo: 'Gratis Ongkir',
    tags: ['Ayam', 'Pedas'],
  },
  {
    id: '4',
    name: 'Kopi Kenangan',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop',
    rating: 4.5,
    reviews: 5678,
    distance: '0.5 km',
    time: '5-10 mnt',
    promo: null,
    tags: ['Kopi', 'Minuman'],
  },
]

const featuredItems = [
  { 
    id: 'nasi-padang-1', 
    name: 'Nasi Padang Komplit', 
    price: 35000, 
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300&h=200&fit=crop', 
    restaurant: 'Warung Padang Sederhana',
    rating: 4.8,
    reviews: 256,
    time: '15-20',
    distance: '1.2 km',
    description: 'Nasi putih dengan lauk rendang, ayam pop, sayur nangka, dan sambal hijau khas Padang.',
  },
  { 
    id: 'mie-ayam-1', 
    name: 'Mie Ayam Bakso', 
    price: 25000, 
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop', 
    restaurant: 'Mie Ayam Pak Haji',
    rating: 4.7,
    reviews: 189,
    time: '10-15',
    distance: '0.8 km',
    description: 'Mie ayam dengan topping ayam cincang, bakso sapi, dan pangsit goreng.',
  },
  { 
    id: 'ayam-geprek-1', 
    name: 'Ayam Geprek Level 5', 
    price: 28000, 
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300&h=200&fit=crop', 
    restaurant: 'Ayam Geprek Bensu',
    rating: 4.6,
    reviews: 342,
    time: '20-30',
    distance: '2.1 km',
    description: 'Ayam geprek super pedas dengan sambal level 5 dan nasi putih.',
  },
  { 
    id: 'nasi-goreng-1', 
    name: 'Nasi Goreng Spesial', 
    price: 25000, 
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop', 
    restaurant: 'Warung Pak Joko',
    rating: 4.8,
    reviews: 256,
    time: '15-20',
    distance: '1.2 km',
    description: 'Nasi goreng dengan telur, ayam, dan sayuran segar. Dilengkapi dengan kerupuk dan acar.',
  },
]

export function ClayFoodScreen({ onNavigate, setSelectedFood, cartItemsCount = 0 }: ClayFoodScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleFoodSelect = (food: any) => {
    setSelectedFood(food)
    onNavigate('food-detail')
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
              <h1 className="text-lg font-bold text-foreground">ClayFood</h1>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>Jl. Sudirman, Jakarta</span>
              </div>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('cart')}
            className="w-10 h-10 rounded-full bg-accent shadow-soft flex items-center justify-center relative"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                {cartItemsCount}
              </span>
            )}
          </motion.button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari makanan atau restoran..."
            className="w-full h-12 bg-card rounded-2xl shadow-soft pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        {/* Categories */}
        <div className="px-5 py-3">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white'
                    : 'bg-card shadow-soft text-foreground'
                }`}
              >
                <span>{cat.icon}</span>
                <span className="text-sm font-medium">{cat.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Featured Items */}
        <div className="px-5 py-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">Menu Populer</h2>
            <button
              onClick={() => onNavigate('clayfood')}
              className="text-xs text-primary font-medium flex items-center"
            >
              Lihat Semua <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {featuredItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFoodSelect(item)}
                className="min-w-[160px] bg-card rounded-2xl shadow-soft overflow-hidden text-left"
              >
                <div className="h-24 relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                  <p className="text-xs text-muted-foreground mb-2">{item.restaurant}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-primary">Rp {item.price.toLocaleString('id-ID')}</p>
                    <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                      <Plus className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Restaurants */}
        <div className="px-5 py-3">
          <h2 className="text-sm font-semibold text-foreground mb-3">Restoran Terdekat</h2>
          <div className="space-y-3">
            {restaurants.map((restaurant, index) => (
              <motion.button
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-card rounded-2xl shadow-soft p-4 flex gap-4 text-left"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden relative flex-shrink-0">
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-sm font-semibold text-foreground truncate pr-2">{restaurant.name}</h3>
                    {restaurant.promo && (
                      <span className="px-2 py-0.5 bg-accent/10 rounded-full text-[10px] font-medium text-accent whitespace-nowrap">
                        {restaurant.promo}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#FFB84D] fill-[#FFB84D]" />
                      <span className="text-xs font-medium text-foreground">{restaurant.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({restaurant.reviews})</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{restaurant.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{restaurant.time}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {restaurant.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-secondary rounded-full text-[10px] text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Footer */}
      {cartItemsCount > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="absolute bottom-6 left-5 right-5"
        >
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('cart')}
            className="w-full bg-primary rounded-2xl p-4 shadow-elevated flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white/70 text-xs">{cartItemsCount} item di keranjang</p>
                <p className="text-white font-semibold">Lihat Keranjang</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
