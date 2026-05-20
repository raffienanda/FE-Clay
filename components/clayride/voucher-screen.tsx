'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Tag,
  Clock,
  CheckCircle,
  Copy,
  Car,
  UtensilsCrossed,
  Package,
  Percent,
} from 'lucide-react'
import type { Screen } from '@/app/page'

interface VoucherScreenProps {
  onNavigate: (screen: Screen) => void
}

const vouchers = [
  {
    id: '1',
    code: 'NEWUSER50',
    title: 'Diskon 50% Ride Pertama',
    description: 'Maksimal diskon Rp 25.000',
    discount: '50%',
    minOrder: 20000,
    maxDiscount: 25000,
    validUntil: '31 Des 2024',
    type: 'ride',
    icon: Car,
    color: 'bg-primary',
    claimed: false,
  },
  {
    id: '2',
    code: 'GRATISONGKIR',
    title: 'Gratis Ongkir ClayFood',
    description: 'Pesanan minimal Rp 50.000',
    discount: 'Gratis',
    minOrder: 50000,
    maxDiscount: 15000,
    validUntil: '25 Des 2024',
    type: 'food',
    icon: UtensilsCrossed,
    color: 'bg-accent',
    claimed: true,
  },
  {
    id: '3',
    code: 'CLAYSEND20',
    title: 'Diskon 20% ClaySend',
    description: 'Maksimal diskon Rp 10.000',
    discount: '20%',
    minOrder: 15000,
    maxDiscount: 10000,
    validUntil: '30 Des 2024',
    type: 'send',
    icon: Package,
    color: 'bg-[#52D49F]',
    claimed: false,
  },
  {
    id: '4',
    code: 'CASHBACK10',
    title: 'Cashback 10% ClayPay',
    description: 'Min. transaksi Rp 100.000',
    discount: '10%',
    minOrder: 100000,
    maxDiscount: 50000,
    validUntil: '28 Des 2024',
    type: 'all',
    icon: Percent,
    color: 'bg-[#9B7DFF]',
    claimed: true,
  },
  {
    id: '5',
    code: 'HEMAT30',
    title: 'Diskon 30% Semua Layanan',
    description: 'Maks. diskon Rp 30.000',
    discount: '30%',
    minOrder: 50000,
    maxDiscount: 30000,
    validUntil: '27 Des 2024',
    type: 'all',
    icon: Tag,
    color: 'bg-[#FFB84D]',
    claimed: false,
  },
]

export function VoucherScreen({ onNavigate }: VoucherScreenProps) {
  const [activeTab, setActiveTab] = useState<'available' | 'claimed'>('available')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [voucherList, setVoucherList] = useState(vouchers)
  const [promoCode, setPromoCode] = useState('')

  const filteredVouchers = voucherList.filter(v => 
    activeTab === 'claimed' ? v.claimed : !v.claimed
  )

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleClaim = (id: string) => {
    setVoucherList(prev =>
      prev.map(v => v.id === id ? { ...v, claimed: true } : v)
    )
  }

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return
    const found = voucherList.find(v => v.code.toLowerCase() === promoCode.toLowerCase().trim())
    if (found) {
      alert(`Kode promo "${promoCode}" berhasil diterapkan!`)
      setPromoCode('')
    } else {
      alert(`Kode promo "${promoCode}" tidak valid`)
    }
  }

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
        <h1 className="text-lg font-bold text-foreground">Voucher Saya</h1>
      </div>

      {/* Promo Code Input */}
      <div className="px-5 py-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
            placeholder="Masukkan kode promo"
            className="flex-1 h-12 bg-card rounded-xl px-4 text-sm text-foreground placeholder:text-muted-foreground shadow-soft outline-none focus:ring-2 focus:ring-primary/20"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleApplyPromo}
            className="h-12 px-6 bg-primary rounded-xl"
          >
            <span className="text-white font-semibold text-sm">Pakai</span>
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 py-4">
        <div className="flex gap-2 bg-muted p-1 rounded-xl">
          {[
            { id: 'available', label: 'Tersedia' },
            { id: 'claimed', label: 'Sudah Diklaim' },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id as 'available' | 'claimed')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-foreground shadow-soft'
                  : 'text-muted-foreground'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Voucher List */}
      <div className="flex-1 overflow-y-auto pb-8">
        <div className="px-5 space-y-3">
          {filteredVouchers.map((voucher, index) => (
            <motion.div
              key={voucher.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-2xl shadow-soft overflow-hidden"
            >
              {/* Voucher Header */}
              <div className={`${voucher.color} p-4 flex items-center gap-4`}>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <voucher.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-lg">{voucher.discount}</p>
                  <p className="text-white/80 text-xs">{voucher.title}</p>
                </div>
              </div>

              {/* Voucher Body */}
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-3">{voucher.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Berlaku hingga {voucher.validUntil}</span>
                  </div>
                </div>

                {/* Code & Action */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-10 bg-muted rounded-lg flex items-center justify-between px-3">
                    <span className="font-mono font-semibold text-sm text-foreground">{voucher.code}</span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCopy(voucher.code)}
                      className="p-1"
                    >
                      {copiedCode === voucher.code ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </motion.button>
                  </div>
                  {!voucher.claimed && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleClaim(voucher.id)}
                      className="h-10 px-4 bg-primary rounded-lg"
                    >
                      <span className="text-white font-semibold text-sm">Klaim</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {filteredVouchers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Tidak ada voucher</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
