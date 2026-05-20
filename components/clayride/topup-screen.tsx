'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  CreditCard,
  Building2,
  Smartphone,
  Store,
  CheckCircle,
  ChevronRight,
} from 'lucide-react'
import type { Screen } from '@/app/page'

interface TopUpScreenProps {
  onNavigate: (screen: Screen) => void
}

const amounts = [
  { value: 50000, label: 'Rp 50.000' },
  { value: 100000, label: 'Rp 100.000' },
  { value: 200000, label: 'Rp 200.000' },
  { value: 500000, label: 'Rp 500.000' },
  { value: 1000000, label: 'Rp 1.000.000' },
  { value: 2000000, label: 'Rp 2.000.000' },
]

const paymentMethods = [
  { id: 'bca', label: 'BCA Virtual Account', icon: Building2, fee: 0 },
  { id: 'mandiri', label: 'Mandiri Virtual Account', icon: Building2, fee: 0 },
  { id: 'bni', label: 'BNI Virtual Account', icon: Building2, fee: 0 },
  { id: 'gopay', label: 'GoPay', icon: Smartphone, fee: 0 },
  { id: 'ovo', label: 'OVO', icon: Smartphone, fee: 0 },
  { id: 'dana', label: 'DANA', icon: Smartphone, fee: 0 },
  { id: 'indomaret', label: 'Indomaret', icon: Store, fee: 2500 },
  { id: 'alfamart', label: 'Alfamart', icon: Store, fee: 2500 },
]

export function TopUpScreen({ onNavigate }: TopUpScreenProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const finalAmount = selectedAmount || parseInt(customAmount) || 0
  const selectedPayment = paymentMethods.find(m => m.id === selectedMethod)
  const totalAmount = finalAmount + (selectedPayment?.fee || 0)

  const handleTopUp = async () => {
    if (!finalAmount || !selectedMethod) return
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
          <CheckCircle className="w-12 h-12 text-green-500" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-foreground mb-2"
        >
          Top Up Berhasil!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted-foreground text-center mb-2"
        >
          Saldo ClayWallet Anda telah bertambah
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-primary mb-8"
        >
          +Rp {finalAmount.toLocaleString('id-ID')}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('home')}
          className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center"
        >
          <span className="text-white font-semibold">Kembali ke Beranda</span>
        </motion.button>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 py-3 flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('wallet')}
          className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </motion.button>
        <h1 className="text-lg font-bold text-foreground">Top Up ClayWallet</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Current Balance */}
        <div className="px-5 py-4">
          <div className="bg-gradient-to-br from-primary to-[#5A9FFF] rounded-2xl p-4 shadow-soft">
            <p className="text-white/70 text-xs mb-1">Saldo Saat Ini</p>
            <p className="text-white text-2xl font-bold">Rp 2.500.000</p>
          </div>
        </div>

        {/* Amount Selection */}
        <div className="px-5 py-2">
          <h3 className="text-sm font-semibold text-foreground mb-3">Pilih Nominal</h3>
          <div className="grid grid-cols-3 gap-3">
            {amounts.map((amount) => (
              <motion.button
                key={amount.value}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedAmount(amount.value)
                  setCustomAmount('')
                }}
                className={`p-4 rounded-2xl text-center transition-colors ${
                  selectedAmount === amount.value
                    ? 'bg-primary text-white'
                    : 'bg-card text-foreground shadow-soft'
                }`}
              >
                <span className="text-sm font-semibold">{amount.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div className="px-5 py-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Atau Masukkan Nominal</h3>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">Rp</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value)
                setSelectedAmount(null)
              }}
              placeholder="Minimal 10.000"
              className="w-full h-14 bg-card rounded-2xl pl-12 pr-4 text-foreground font-semibold shadow-soft outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="px-5 py-2">
          <h3 className="text-sm font-semibold text-foreground mb-3">Metode Pembayaran</h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <motion.button
                key={method.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-4 rounded-2xl flex items-center gap-4 text-left transition-colors ${
                  selectedMethod === method.id
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-card border-2 border-transparent shadow-soft'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  selectedMethod === method.id ? 'bg-primary' : 'bg-muted'
                }`}>
                  <method.icon className={`w-5 h-5 ${
                    selectedMethod === method.id ? 'text-white' : 'text-muted-foreground'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{method.label}</p>
                  {method.fee > 0 && (
                    <p className="text-xs text-muted-foreground">Biaya admin Rp {method.fee.toLocaleString('id-ID')}</p>
                  )}
                </div>
                {selectedMethod === method.id && (
                  <CheckCircle className="w-5 h-5 text-primary" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-background border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">Total Bayar</span>
          <span className="text-lg font-bold text-primary">
            Rp {totalAmount.toLocaleString('id-ID')}
          </span>
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleTopUp}
          disabled={!finalAmount || !selectedMethod || isProcessing}
          className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center shadow-soft disabled:opacity-50"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <span className="text-white font-semibold">Top Up Sekarang</span>
          )}
        </motion.button>
      </div>
    </div>
  )
}
