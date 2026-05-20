'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Search,
  MessageCircle,
  Phone,
  Mail,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  FileText,
  Shield,
  CreditCard,
  Car,
  UtensilsCrossed,
  Package,
} from 'lucide-react'
import type { Screen } from '@/app/page'

interface HelpScreenProps {
  onNavigate: (screen: Screen) => void
}

const faqs = [
  {
    category: 'ClayRide',
    icon: Car,
    questions: [
      {
        q: 'Bagaimana cara memesan ClayRide?',
        a: 'Buka aplikasi CLAY, pilih ClayRide, masukkan lokasi penjemputan dan tujuan, pilih jenis kendaraan, lalu konfirmasi pesanan Anda.',
      },
      {
        q: 'Bagaimana jika driver tidak datang?',
        a: 'Anda dapat menghubungi driver melalui fitur chat atau telepon di aplikasi. Jika tidak ada respons dalam 5 menit, Anda dapat membatalkan pesanan tanpa biaya.',
      },
      {
        q: 'Bagaimana cara memberikan rating?',
        a: 'Setelah perjalanan selesai, aplikasi akan menampilkan halaman rating. Anda dapat memberikan bintang 1-5 dan menambahkan komentar.',
      },
    ],
  },
  {
    category: 'ClayFood',
    icon: UtensilsCrossed,
    questions: [
      {
        q: 'Berapa lama estimasi pengiriman makanan?',
        a: 'Estimasi pengiriman tergantung jarak dan waktu persiapan restoran, biasanya antara 20-45 menit.',
      },
      {
        q: 'Bagaimana jika pesanan salah atau tidak lengkap?',
        a: 'Anda dapat melaporkan masalah melalui menu Bantuan di halaman riwayat pesanan. Tim kami akan memproses pengembalian dana atau pengiriman ulang.',
      },
    ],
  },
  {
    category: 'Pembayaran',
    icon: CreditCard,
    questions: [
      {
        q: 'Metode pembayaran apa saja yang tersedia?',
        a: 'ClayWallet, transfer bank (BCA, Mandiri, BNI), e-wallet (GoPay, OVO, DANA), dan pembayaran tunai untuk layanan tertentu.',
      },
      {
        q: 'Bagaimana cara top up ClayWallet?',
        a: 'Buka menu Dompet, pilih Top Up, masukkan nominal, pilih metode pembayaran, dan ikuti instruksi untuk menyelesaikan pembayaran.',
      },
    ],
  },
]

const contactOptions = [
  { icon: MessageCircle, label: 'Live Chat', description: 'Respon cepat 24/7', color: 'bg-primary' },
  { icon: Phone, label: 'Telepon', description: '021-5050-1234', color: 'bg-[#52D49F]' },
  { icon: Mail, label: 'Email', description: 'help@clay.id', color: 'bg-[#9B7DFF]' },
]

export function HelpScreen({ onNavigate }: HelpScreenProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategory, setExpandedCategory] = useState<string | null>('ClayRide')
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 py-3 flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('profile')}
          className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </motion.button>
        <h1 className="text-lg font-bold text-foreground">Pusat Bantuan</h1>
      </div>

      {/* Search */}
      <div className="px-5 py-2">
        <div className="flex items-center gap-3 bg-card rounded-2xl px-4 py-3 shadow-soft">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pertanyaan..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        {/* Contact Options */}
        <div className="px-5 py-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Hubungi Kami</h3>
          <div className="grid grid-cols-3 gap-3">
            {contactOptions.map((option) => (
              <motion.button
                key={option.label}
                whileTap={{ scale: 0.95 }}
                className="bg-card rounded-2xl p-4 shadow-soft flex flex-col items-center gap-2"
              >
                <div className={`w-12 h-12 ${option.color} rounded-xl flex items-center justify-center`}>
                  <option.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs font-semibold text-foreground">{option.label}</p>
                <p className="text-[10px] text-muted-foreground text-center">{option.description}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="px-5 py-2">
          <h3 className="text-sm font-semibold text-foreground mb-3">Tautan Cepat</h3>
          <div className="bg-card rounded-2xl shadow-soft overflow-hidden divide-y divide-border">
            {[
              { icon: FileText, label: 'Syarat & Ketentuan' },
              { icon: Shield, label: 'Kebijakan Privasi' },
              { icon: HelpCircle, label: 'Panduan Pengguna' },
            ].map((item) => (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.98 }}
                className="w-full p-4 flex items-center gap-4 text-left"
              >
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="px-5 py-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Pertanyaan Umum</h3>
          <div className="space-y-3">
            {faqs.map((category) => (
              <div key={category.category} className="bg-card rounded-2xl shadow-soft overflow-hidden">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setExpandedCategory(
                    expandedCategory === category.category ? null : category.category
                  )}
                  className="w-full p-4 flex items-center gap-4 text-left"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="flex-1 text-sm font-semibold text-foreground">{category.category}</span>
                  <motion.div
                    animate={{ rotate: expandedCategory === category.category ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </motion.button>

                {expandedCategory === category.category && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-border"
                  >
                    {category.questions.map((faq, index) => (
                      <div key={index} className="border-b border-border last:border-b-0">
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setExpandedQuestion(
                            expandedQuestion === faq.q ? null : faq.q
                          )}
                          className="w-full p-4 text-left"
                        >
                          <div className="flex items-start gap-3">
                            <HelpCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="flex-1 text-sm font-medium text-foreground">{faq.q}</span>
                            <motion.div
                              animate={{ rotate: expandedQuestion === faq.q ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            </motion.div>
                          </div>
                        </motion.button>
                        {expandedQuestion === faq.q && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="px-4 pb-4"
                          >
                            <p className="text-sm text-muted-foreground pl-7">{faq.a}</p>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
