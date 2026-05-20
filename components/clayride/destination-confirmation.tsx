'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  MapPin,
  Clock,
  CreditCard,
  ChevronRight,
  Check,
} from 'lucide-react'
import type { Screen } from '@/app/page'

interface DestinationConfirmationProps {
  onNavigate: (screen: Screen) => void
}

const vehicles = [
  { 
    id: 'economy',
    name: 'ClayRide', 
    type: 'Ekonomi', 
    price: 'Rp 25.000', 
    eta: '3 mnt',
    capacity: '4',
    icon: '🚗'
  },
  { 
    id: 'comfort',
    name: 'ClayRide+', 
    type: 'Comfort', 
    price: 'Rp 45.000', 
    eta: '5 mnt',
    capacity: '4',
    icon: '🚙'
  },
  { 
    id: 'premium',
    name: 'ClayLux', 
    type: 'Premium', 
    price: 'Rp 95.000', 
    eta: '8 mnt',
    capacity: '4',
    icon: '🏎️'
  },
]

export function DestinationConfirmation({ onNavigate }: DestinationConfirmationProps) {
  const [selectedVehicle, setSelectedVehicle] = useState('economy')

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Map Preview with Route */}
      <div className="h-[35%] bg-gradient-to-b from-[#E8F4FF] to-[#D4E9FF] relative">
        {/* Map Grid */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="routeGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8BBEFF" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#routeGrid)" />
          </svg>
        </div>

        {/* Route Line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            d="M 25 70 Q 35 50 45 45 Q 55 40 75 30"
            fill="none"
            stroke="#8BBEFF"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
        </svg>

        {/* Pickup Point */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute bottom-[30%] left-[25%]"
        >
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </motion.div>

        {/* Destination Point */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-[30%] right-[25%]"
        >
          <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <MapPin className="w-3 h-3 text-white" />
          </div>
        </motion.div>

        {/* Back Button */}
        <div className="absolute top-4 left-5">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('pickup')}
            className="w-10 h-10 rounded-full glass shadow-soft flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
        </div>
      </div>

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="flex-1 bg-card rounded-t-[32px] -mt-6 shadow-elevated relative z-10 flex flex-col"
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-muted rounded-full" />
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {/* Route Summary */}
          <div className="flex items-center gap-3 mb-4 py-2">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <div className="w-0.5 h-6 bg-muted" />
              <div className="w-3 h-3 bg-accent rounded-full" />
            </div>
            <div className="flex-1">
              <div className="mb-3">
                <p className="text-xs text-muted-foreground">Jemput</p>
                <p className="text-sm font-medium text-foreground">Jl. Sudirman, Jakarta</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tujuan</p>
                <p className="text-sm font-medium text-foreground">Grand Indonesia, Thamrin</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Jarak</p>
              <p className="text-sm font-semibold text-foreground">3,2 km</p>
            </div>
          </div>

          {/* Vehicle Selection */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Pilih kendaraan</h3>
            <div className="space-y-2">
              {vehicles.map((vehicle, index) => (
                <motion.button
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                  className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all ${
                    selectedVehicle === vehicle.id
                      ? 'bg-primary/10 border-2 border-primary'
                      : 'bg-secondary border-2 border-transparent'
                  }`}
                >
                  <div className="text-3xl">{vehicle.icon}</div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{vehicle.name}</p>
                      <span className="text-xs text-muted-foreground">{vehicle.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{vehicle.eta}</span>
                      <span>•</span>
                      <span>{vehicle.capacity} kursi</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{vehicle.price}</p>
                    {selectedVehicle === vehicle.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mt-1 ml-auto"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Pembayaran</h3>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 bg-secondary rounded-2xl flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground">Clay Wallet</p>
                <p className="text-xs text-muted-foreground">Saldo: Rp 2.500.000</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          </div>
        </div>

        {/* Book Button */}
        <div className="px-5 pb-6 pt-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('order-confirmation')}
            className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center shadow-soft"
          >
            <span className="text-white font-semibold">
              Pesan {vehicles.find(v => v.id === selectedVehicle)?.name} - {vehicles.find(v => v.id === selectedVehicle)?.price}
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
