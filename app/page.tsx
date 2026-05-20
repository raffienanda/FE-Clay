'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HomeDashboard } from '@/components/clayride/home-dashboard'
import { SearchScreen } from '@/components/clayride/search-screen'
import { DestinationInput } from '@/components/clayride/destination-input'
import { PickupMap } from '@/components/clayride/pickup-map'
import { DestinationConfirmation } from '@/components/clayride/destination-confirmation'
import { OrderConfirmation } from '@/components/clayride/order-confirmation'
import { ClayFoodScreen } from '@/components/clayride/clayfood-screen'
import { ClaySendScreen } from '@/components/clayride/claysend-screen'
import { ClayPetScreen } from '@/components/clayride/claypet-screen'
import { ClayWasteScreen } from '@/components/clayride/claywaste-screen'
import { ClayCareScreen } from '@/components/clayride/claycare-screen'
import { OtherServicesScreen } from '@/components/clayride/other-services-screen'
import { ProfileScreen } from '@/components/clayride/profile-screen'
import { ActivityScreen } from '@/components/clayride/activity-screen'
import { ChatScreen } from '@/components/clayride/chat-screen'
import { WalletScreen } from '@/components/clayride/wallet-screen'
import { NotificationsScreen } from '@/components/clayride/notifications-screen'
import { FoodDetailScreen } from '@/components/clayride/food-detail-screen'
import { CartScreen } from '@/components/clayride/cart-screen'
import { CheckoutScreen } from '@/components/clayride/checkout-screen'
import { TopUpScreen } from '@/components/clayride/topup-screen'
import { VoucherScreen } from '@/components/clayride/voucher-screen'
import { SettingsScreen } from '@/components/clayride/settings-screen'
import { HelpScreen } from '@/components/clayride/help-screen'

export type Screen = 
  | 'home' 
  | 'search' 
  | 'destination' 
  | 'pickup' 
  | 'confirm-destination' 
  | 'order-confirmation'
  | 'clayfood'
  | 'claysend'
  | 'claypet'
  | 'claywaste'
  | 'claycare'
  | 'other-services'
  | 'profile'
  | 'activity'
  | 'chat'
  | 'wallet'
  | 'notifications'
  | 'food-detail'
  | 'cart'
  | 'checkout'
  | 'topup'
  | 'voucher'
  | 'settings'
  | 'help'

export default function ClayridePage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [selectedFood, setSelectedFood] = useState<any>(null)
  const [cartItems, setCartItems] = useState<any[]>([])

  const addToCart = (item: any) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(i => i.id !== id))
    } else {
      setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))
    }
  }

  const clearCart = () => setCartItems([])

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeDashboard onNavigate={setCurrentScreen} cartItemsCount={cartItems.length} />
      case 'search':
        return <SearchScreen onNavigate={setCurrentScreen} />
      case 'destination':
        return <DestinationInput onNavigate={setCurrentScreen} />
      case 'pickup':
        return <PickupMap onNavigate={setCurrentScreen} />
      case 'confirm-destination':
        return <DestinationConfirmation onNavigate={setCurrentScreen} />
      case 'order-confirmation':
        return <OrderConfirmation onNavigate={setCurrentScreen} />
      case 'clayfood':
        return <ClayFoodScreen onNavigate={setCurrentScreen} setSelectedFood={setSelectedFood} cartItemsCount={cartItems.length} />
      case 'claysend':
        return <ClaySendScreen onNavigate={setCurrentScreen} />
      case 'claypet':
        return <ClayPetScreen onNavigate={setCurrentScreen} />
      case 'claywaste':
        return <ClayWasteScreen onNavigate={setCurrentScreen} />
      case 'claycare':
        return <ClayCareScreen onNavigate={setCurrentScreen} />
      case 'other-services':
        return <OtherServicesScreen onNavigate={setCurrentScreen} />
      case 'profile':
        return <ProfileScreen onNavigate={setCurrentScreen} />
      case 'activity':
        return <ActivityScreen onNavigate={setCurrentScreen} />
      case 'chat':
        return <ChatScreen onNavigate={setCurrentScreen} />
      case 'wallet':
        return <WalletScreen onNavigate={setCurrentScreen} />
      case 'notifications':
        return <NotificationsScreen onNavigate={setCurrentScreen} />
      case 'food-detail':
        return <FoodDetailScreen onNavigate={setCurrentScreen} food={selectedFood} addToCart={addToCart} />
      case 'cart':
        return <CartScreen onNavigate={setCurrentScreen} items={cartItems} updateQuantity={updateCartQuantity} />
      case 'checkout':
        return <CheckoutScreen onNavigate={setCurrentScreen} items={cartItems} clearCart={clearCart} />
      case 'topup':
        return <TopUpScreen onNavigate={setCurrentScreen} />
      case 'voucher':
        return <VoucherScreen onNavigate={setCurrentScreen} />
      case 'settings':
        return <SettingsScreen onNavigate={setCurrentScreen} />
      case 'help':
        return <HelpScreen onNavigate={setCurrentScreen} />
      default:
        return <HomeDashboard onNavigate={setCurrentScreen} cartItemsCount={cartItems.length} />
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
