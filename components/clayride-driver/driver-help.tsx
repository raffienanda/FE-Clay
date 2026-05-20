'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Search,
  MessageCircle,
  Phone,
  FileText,
  Shield,
  CreditCard,
  Car,
  HelpCircle,
  ChevronDown,
} from 'lucide-react'
import type { DriverScreen } from '@/app/driver/page'

interface DriverHelpProps {
  onNavigate: (screen: DriverScreen) => void
}

const helpCategories = [
  { icon: Car, label: 'Perjalanan', count: 12 },
  { icon: CreditCard, label: 'Pembayaran', count: 8 },
  { icon: Shield, label: 'Keamanan', count: 6 },
  { icon: FileText, label: 'Dokumen', count: 5 },
]

const faqs = [
  {
    id: 1,
    question: 'Bagaimana cara mencairkan pendapatan?',
    answer: 'Anda bisa mencairkan pendapatan melalui menu Pendapatan > Cairkan Dana. Minimal penarikan adalah Rp 50.000 dan akan diproses dalam 1x24 jam ke rekening yang terdaftar.',
  },
  {
    id: 2,
    question: 'Kenapa saya tidak mendapat order?',
    answer: 'Pastikan status Anda sudah Online, GPS aktif, dan berada di area yang memiliki permintaan. Coba pergi ke area yang ditandai "Permintaan Tinggi" di peta.',
  },
  {
    id: 3,
    question: 'Bagaimana jika penumpang tidak muncul?',
    answer: 'Tunggu minimal 5 menit di titik jemput, hubungi penumpang melalui chat atau telepon. Jika tidak ada respons, Anda bisa membatalkan perjalanan tanpa penalti.',
  },
  {
    id: 4,
    question: 'Bagaimana cara update dokumen?',
    answer: 'Buka Profil > Dokumen, pilih dokumen yang ingin diperbarui. Upload foto dokumen dengan jelas dan tunggu verifikasi dalam 1-3 hari kerja.',
  },
]

export function DriverHelp({ onNavigate }: DriverHelpProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 py-4 flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('profile')}
          className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </motion.button>
        <h1 className="text-lg font-bold text-foreground">Bantuan</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Search */}
        <div className="px-5 py-2">
          <div className="bg-card rounded-2xl shadow-soft flex items-center px-4 gap-3">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari pertanyaan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-12 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-5 py-3">
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="bg-card rounded-2xl p-4 shadow-soft flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">Live Chat</p>
                <p className="text-xs text-muted-foreground">24/7 Support</p>
              </div>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="bg-card rounded-2xl p-4 shadow-soft flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-[#52D49F]/10 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#52D49F]" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">Telepon</p>
                <p className="text-xs text-muted-foreground">021-123-456</p>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Categories */}
        <div className="px-5 py-3">
          <h3 className="text-sm font-semibold text-foreground mb-3">Kategori Bantuan</h3>
          <div className="grid grid-cols-2 gap-2">
            {helpCategories.map((category, index) => (
              <motion.button
                key={category.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-2xl p-4 shadow-soft flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">{category.label}</p>
                  <p className="text-xs text-muted-foreground">{category.count} artikel</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="px-5 py-3">
          <h3 className="text-sm font-semibold text-foreground mb-3">Pertanyaan Umum</h3>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-2xl shadow-soft overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-4 py-4 flex items-center gap-3 text-left"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="flex-1 text-sm font-medium text-foreground">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedFaq === faq.id ? 'auto' : 0,
                    opacity: expandedFaq === faq.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pl-15">
                    <p className="text-sm text-muted-foreground leading-relaxed pl-11">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="px-5 py-4">
          <div className="bg-primary/10 rounded-2xl p-4 text-center">
            <p className="text-sm font-semibold text-foreground mb-2">Masih butuh bantuan?</p>
            <p className="text-xs text-muted-foreground mb-3">
              Tim support kami siap membantu Anda 24/7
            </p>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full h-11 bg-primary rounded-xl flex items-center justify-center"
            >
              <span className="text-white font-medium text-sm">Hubungi Support</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
