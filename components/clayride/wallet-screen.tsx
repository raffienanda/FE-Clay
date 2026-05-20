'use client'

import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Plus,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
  Wallet,
  QrCode,
  Send,
  Smartphone,
  Building2,
  MoreHorizontal,
} from 'lucide-react'
import type { Screen } from '@/app/page'

interface WalletScreenProps {
  onNavigate: (screen: Screen) => void
}

const quickActions = [
  { icon: Plus, label: 'Top Up', color: 'bg-primary', screen: 'topup' as Screen },
  { icon: Send, label: 'Transfer', color: 'bg-[#52D49F]', screen: 'home' as Screen },
  { icon: QrCode, label: 'QR Pay', color: 'bg-[#9B7DFF]', screen: 'home' as Screen },
  { icon: MoreHorizontal, label: 'Lainnya', color: 'bg-muted', screen: 'other-services' as Screen },
]

const paymentMethods = [
  { icon: CreditCard, label: 'ClayPay', balance: 'Rp 2.500.000', primary: true },
  { icon: CreditCard, label: 'BCA **** 1234', balance: 'Connected', primary: false },
  { icon: CreditCard, label: 'GoPay', balance: 'Connected', primary: false },
]

const transactions = [
  { id: '1', type: 'out', title: 'ClayRide ke Monas', amount: '-Rp 35.000', time: 'Hari ini, 14:30', icon: ArrowUpRight },
  { id: '2', type: 'in', title: 'Top Up ClayPay', amount: '+Rp 500.000', time: 'Hari ini, 10:00', icon: ArrowDownLeft },
  { id: '3', type: 'out', title: 'ClayFood - Nasi Goreng', amount: '-Rp 85.000', time: 'Kemarin, 19:00', icon: ArrowUpRight },
  { id: '4', type: 'out', title: 'ClaySend - Kirim Paket', amount: '-Rp 15.000', time: '18 Des, 10:00', icon: ArrowUpRight },
  { id: '5', type: 'in', title: 'Cashback ClayRide', amount: '+Rp 5.000', time: '17 Des, 16:00', icon: ArrowDownLeft },
  { id: '6', type: 'in', title: 'ClayWaste Reward', amount: '+Rp 25.000', time: '14 Des, 08:30', icon: ArrowDownLeft },
]

export function WalletScreen({ onNavigate }: WalletScreenProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 py-3 flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('home')}
          className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </motion.button>
        <h1 className="text-lg font-bold text-foreground">Dompet Saya</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        {/* Balance Card */}
        <div className="px-5 py-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary via-[#5A9FFF] to-primary rounded-3xl p-6 shadow-elevated"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-xs font-medium">Total Saldo</p>
                <p className="text-white text-3xl font-bold">Rp 2.500.000</p>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex gap-3 mt-6">
              {quickActions.map((action) => (
                <motion.button
                  key={action.label}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate(action.screen)}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white text-xs font-medium">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Payment Methods */}
        <div className="px-5 py-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Metode Pembayaran</h3>
            <button
              onClick={() => alert('Fitur tambah metode pembayaran akan segera hadir!')}
              className="text-xs text-primary font-medium"
            >
              + Tambah
            </button>
          </div>
          <div className="space-y-3">
            {paymentMethods.map((method, index) => (
              <motion.button
                key={method.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-card rounded-2xl p-4 shadow-soft flex items-center gap-4 text-left"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method.primary ? 'bg-primary' : 'bg-muted'}`}>
                  <method.icon className={`w-5 h-5 ${method.primary ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{method.label}</p>
                  <p className={`text-xs ${method.primary ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                    {method.balance}
                  </p>
                </div>
                {method.primary && (
                  <span className="px-2 py-1 bg-primary/10 rounded-full text-[10px] text-primary font-medium">
                    Utama
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="px-5 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Riwayat Transaksi</h3>
            <button 
              onClick={() => onNavigate('activity')}
              className="text-xs text-primary font-medium"
            >
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3">
            {transactions.map((tx, index) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-2xl p-4 shadow-soft flex items-center gap-4"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  tx.type === 'in' ? 'bg-green-100' : 'bg-primary/10'
                }`}>
                  <tx.icon className={`w-5 h-5 ${
                    tx.type === 'in' ? 'text-green-600' : 'text-primary'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{tx.title}</p>
                  <p className="text-xs text-muted-foreground">{tx.time}</p>
                </div>
                <span className={`text-sm font-semibold ${
                  tx.type === 'in' ? 'text-green-600' : 'text-foreground'
                }`}>
                  {tx.amount}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
