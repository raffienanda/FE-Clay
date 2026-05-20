'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Home,
  Clock,
  MessageCircle,
  Send,
  Phone,
  MoreVertical,
  Search,
  Image as ImageIcon,
  Smile,
  Mic,
  Check,
  CheckCheck,
  ArrowLeft,
} from 'lucide-react'
import Image from 'next/image'
import type { Screen } from '@/app/page'

interface ChatScreenProps {
  onNavigate: (screen: Screen) => void
  currentScreen?: string
}

const conversations = [
  {
    id: '1',
    name: 'Budi Santoso',
    role: 'ClayRide Driver',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    lastMessage: 'Baik pak, sudah sampai di lokasi',
    time: '14:32',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'ClayFood Support',
    role: 'Customer Service',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    lastMessage: 'Pesanan Anda sedang diproses',
    time: '12:15',
    unread: 0,
    online: true,
  },
  {
    id: '3',
    name: 'Kurniawan',
    role: 'ClaySend Kurir',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    lastMessage: 'Paket sudah diantar ke tujuan',
    time: 'Kemarin',
    unread: 0,
    online: false,
  },
  {
    id: '4',
    name: 'Happy Pet Salon',
    role: 'ClayPet Partner',
    avatar: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=80&h=80&fit=crop&crop=face',
    lastMessage: 'Kucing Anda sudah selesai grooming',
    time: 'Kemarin',
    unread: 0,
    online: false,
  },
  {
    id: '5',
    name: 'Dr. Sarah',
    role: 'ClayCare Doctor',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face',
    lastMessage: 'Jangan lupa minum obatnya ya',
    time: '2 hari lalu',
    unread: 0,
    online: false,
  },
]

const chatMessages = [
  { id: '1', sender: 'driver', text: 'Selamat siang pak, saya driver ClayRide Anda', time: '14:25', status: 'read' },
  { id: '2', sender: 'user', text: 'Siang pak, saya tunggu di depan lobby ya', time: '14:26', status: 'read' },
  { id: '3', sender: 'driver', text: 'Siap pak, 5 menit lagi sampai', time: '14:27', status: 'read' },
  { id: '4', sender: 'driver', text: 'Saya pakai motor Honda Vario merah, plat B 1234 ABC', time: '14:28', status: 'read' },
  { id: '5', sender: 'user', text: 'Oke pak, terima kasih infonya', time: '14:30', status: 'read' },
  { id: '6', sender: 'driver', text: 'Baik pak, sudah sampai di lokasi', time: '14:32', status: 'delivered' },
]

export function ChatScreen({ onNavigate, currentScreen = 'chat' }: ChatScreenProps) {
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(chatMessages)
  const [isTyping, setIsTyping] = useState(false)

  const selectedConversation = conversations.find(c => c.id === activeChat)

  const handleSendMessage = () => {
    if (!message.trim()) return
    const newMsg = {
      id: String(messages.length + 1),
      sender: 'user',
      text: message.trim(),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
    }
    setMessages(prev => [...prev, newMsg])
    setMessage('')
    // Simulasi balasan driver
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        id: String(prev.length + 1),
        sender: 'driver',
        text: 'Oke pak, siap!',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered',
      }])
    }, 1500)
  }

  if (activeChat && selectedConversation) {
    return (
      <div className="h-full flex flex-col bg-background">
        {/* Chat Header */}
        <div className="px-4 py-3 flex items-center gap-3 bg-card shadow-soft">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveChat(null)}
            className="w-10 h-10 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <div className="w-10 h-10 rounded-full overflow-hidden relative">
            <Image
              src={selectedConversation.avatar}
              alt={selectedConversation.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
            {selectedConversation.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">{selectedConversation.name}</p>
            <p className="text-xs text-muted-foreground">
              {selectedConversation.online ? 'Online' : 'Offline'}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => alert('Menghubungi ' + selectedConversation.name + '...')}
            className="w-10 h-10 rounded-full flex items-center justify-center"
          >
            <Phone className="w-5 h-5 text-primary" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full flex items-center justify-center"
          >
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index < chatMessages.length ? index * 0.05 : 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white rounded-br-sm'
                    : 'bg-card text-foreground shadow-soft rounded-bl-sm'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <div className={`flex items-center justify-end gap-1 mt-1 ${
                  msg.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                }`}>
                  <span className="text-[10px]">{msg.time}</span>
                  {msg.sender === 'user' && (
                    msg.status === 'read' ? (
                      <CheckCheck className="w-3 h-3" />
                    ) : (
                      <Check className="w-3 h-3" />
                    )
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-card px-4 py-3 rounded-2xl rounded-bl-sm shadow-soft">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-muted-foreground/50 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-background">
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
            >
              <ImageIcon className="w-5 h-5 text-muted-foreground" />
            </motion.button>
            <div className="flex-1 flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-soft">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ketik pesan..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <motion.button whileTap={{ scale: 0.95 }}>
                <Smile className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              className="w-10 h-10 rounded-full bg-primary shadow-soft flex items-center justify-center"
            >
              {message ? (
                <Send className="w-5 h-5 text-white" />
              ) : (
                <Mic className="w-5 h-5 text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 py-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-foreground">Pesan</h1>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 bg-card rounded-2xl px-4 py-3 shadow-soft">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari percakapan..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto pb-28">
        <div className="px-5 py-2 space-y-2">
          {conversations.map((conv, index) => (
            <motion.button
              key={conv.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveChat(conv.id)}
              className="w-full bg-card rounded-2xl p-4 shadow-soft flex items-center gap-4 text-left"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    src={conv.avatar}
                    alt={conv.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                {conv.online && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-foreground truncate">{conv.name}</p>
                  <span className="text-xs text-muted-foreground">{conv.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{conv.role}</p>
                <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">{conv.unread}</span>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 left-5 right-5">
        <div className="bg-white/80 backdrop-blur-xl rounded-full px-8 py-4 flex items-center justify-between shadow-elevated border border-white/50">
          {[
            { icon: Home, label: 'Beranda', screen: 'home' as Screen },
            { icon: Clock, label: 'Aktivitas', screen: 'activity' as Screen },
            { icon: MessageCircle, label: 'Pesan', screen: 'chat' as Screen, badge: 2 },
          ].map((item) => {
            const isActive = currentScreen === item.screen
            return (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.9 }}
                onClick={() => onNavigate(item.screen)}
                className="flex flex-col items-center gap-1 relative"
              >
                <div className={`relative ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  <item.icon className="w-6 h-6" />
                  {item.badge && !isActive && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full text-[10px] text-white flex items-center justify-center font-medium">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
