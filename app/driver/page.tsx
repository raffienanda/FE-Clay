'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DriverHome } from '@/components/clayride-driver/driver-home'
import { DriverNotifications } from '@/components/clayride-driver/driver-notifications'
import { OrderRequest } from '@/components/clayride-driver/order-request'
import { ActiveTrip } from '@/components/clayride-driver/active-trip'
import { TripComplete } from '@/components/clayride-driver/trip-complete'
import { DriverChat } from '@/components/clayride-driver/driver-chat'
import { DriverEarnings } from '@/components/clayride-driver/driver-earnings'
import { DriverHistory } from '@/components/clayride-driver/driver-history'
import { DriverIncentives } from '@/components/clayride-driver/driver-incentives'
import { DriverProfile } from '@/components/clayride-driver/driver-profile'
import { DriverSettings } from '@/components/clayride-driver/driver-settings'
import { DriverHelp } from '@/components/clayride-driver/driver-help'

export type DriverScreen = 
  | 'home'
  | 'notifications'
  | 'order-request'
  | 'active-trip'
  | 'trip-complete'
  | 'chat'
  | 'earnings'
  | 'history'
  | 'incentives'
  | 'profile'
  | 'settings'
  | 'help'

export default function DriverPage() {
  const [currentScreen, setCurrentScreen] = useState<DriverScreen>('home')
  const [isOnline, setIsOnline] = useState(false)
  const [tripStatus, setTripStatus] = useState<'pickup' | 'ongoing' | 'arrived'>('pickup')
  const [hasIncomingOrder, setHasIncomingOrder] = useState(false)

  // Simulate incoming order when going online
  const handleOnlineToggle = (online: boolean) => {
    setIsOnline(online)
    if (online) {
      // Simulate order after 3 seconds
      setTimeout(() => {
        setHasIncomingOrder(true)
        setCurrentScreen('order-request')
      }, 3000)
    }
  }

  const handleAcceptOrder = useCallback(() => {
    setHasIncomingOrder(false)
    setTripStatus('pickup')
    setCurrentScreen('active-trip')
  }, [])

  const handleDeclineOrder = useCallback(() => {
    setHasIncomingOrder(false)
    setCurrentScreen('home')
  }, [])

  const handleTripComplete = useCallback(() => {
    setCurrentScreen('trip-complete')
  }, [])

  const handleCloseComplete = useCallback(() => {
    setTripStatus('pickup')
    setCurrentScreen('home')
  }, [])

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <DriverHome 
            onNavigate={setCurrentScreen} 
            isOnline={isOnline}
            setIsOnline={handleOnlineToggle}
          />
        )
      case 'notifications':
        return <DriverNotifications onNavigate={setCurrentScreen} />
      case 'order-request':
        return (
          <OrderRequest 
            onNavigate={setCurrentScreen}
            onAccept={handleAcceptOrder}
            onDecline={handleDeclineOrder}
          />
        )
      case 'active-trip':
        return (
          <ActiveTrip 
            onNavigate={setCurrentScreen}
            tripStatus={tripStatus}
            setTripStatus={setTripStatus}
            onComplete={handleTripComplete}
          />
        )
      case 'trip-complete':
        return (
          <TripComplete 
            onNavigate={setCurrentScreen}
            onClose={handleCloseComplete}
          />
        )
      case 'chat':
        return <DriverChat onNavigate={setCurrentScreen} />
      case 'earnings':
        return <DriverEarnings onNavigate={setCurrentScreen} />
      case 'history':
        return <DriverHistory onNavigate={setCurrentScreen} />
      case 'incentives':
        return <DriverIncentives onNavigate={setCurrentScreen} />
      case 'profile':
        return <DriverProfile onNavigate={setCurrentScreen} />
      case 'settings':
        return <DriverSettings onNavigate={setCurrentScreen} />
      case 'help':
        return <DriverHelp onNavigate={setCurrentScreen} />
      default:
        return (
          <DriverHome 
            onNavigate={setCurrentScreen} 
            isOnline={isOnline}
            setIsOnline={handleOnlineToggle}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] h-[844px] bg-background rounded-[48px] shadow-elevated overflow-hidden relative border border-border/50">
        {/* Status Bar */}
        <div className="h-12 flex items-center justify-between px-8 pt-2">
          <span className="text-sm font-semibold text-foreground">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              <div className="w-4 h-2 rounded-sm bg-foreground/80" />
            </div>
            <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor" className="text-foreground/80">
              <path d="M1.5 4C0.67 4 0 4.67 0 5.5v5C0 11.33 0.67 12 1.5 12h10c0.83 0 1.5-0.67 1.5-1.5v-5C13 4.67 12.33 4 11.5 4h-10zM1.5 5h10c0.28 0 0.5 0.22 0.5 0.5v5c0 0.28-0.22 0.5-0.5 0.5h-10C1.22 11 1 10.78 1 10.5v-5C1 5.22 1.22 5 1.5 5z"/>
              <path d="M14 6v4c1.1 0 2-0.9 2-2s-0.9-2-2-2z"/>
            </svg>
          </div>
        </div>

        {/* Screen Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="h-[calc(100%-48px)]"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
