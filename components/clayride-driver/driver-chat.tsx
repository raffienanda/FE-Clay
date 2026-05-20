'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  Send,
  Phone,
  Image as ImageIcon,
  Mic,
  MoreVertical,
  Check,
  CheckCheck,
} from 'lucide-react'
import Image from 'next/image'
import type { DriverScreen } from '@/app/driver/page'

interface DriverChatProps {
  onNavigate: (screen: DriverScreen) => void
}

const initialMessages = [
  {
    id: 1,
    sender: 'customer',
    text: 'Halo Pak, saya sudah di depan lobby ya',
    time: '14:25',
  },
  {
    id: 2,
    sender: 'driver',
    text: 'Baik Bu, saya sedang dalam perjalanan. Sekitar 3 menit lagi sampai.',
    time: '14:26',
    status: 'read',
  },
  {
    id: 3,
    sender: 'customer',
    text: 'Oke, saya pakai baju merah ya',
    time: '14:26',
  },
  {
    id: 4,
    sender: 'driver',
    text: 'Siap Bu, motor saya Honda Vario putih dengan plat B 1234 XYZ',
    time: '14:27',
    status: 'read',
  },
]

const quickReplies = [
  'Saya sudah sampai',
  'Mohon tunggu sebentar',
  'Baik, terima kasih',
  'Di depan gedung mana?',
]

export function DriverChat({ onNavigate }: DriverChatProps) {
  const [messages, setMessages] = useState(initialMessages)
  const [inputText, setInputText] = useState('')

  const sendMessage = () => {
    if (!inputText.trim()) return
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'driver',
      text: inputText,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    }
    
    setMessages([...messages, newMessage])
    setInputText('')
  }

  const sendQuickReply = (text: string) => {
    const newMessage = {
      id: messages.length + 1,
      sender: 'driver',
      text,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    }
    
    setMessages([...messages, newMessage])
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between bg-card shadow-soft">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('active-trip')}
            className="w-10 h-10 rounded-full bg-background flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
              alt="Customer"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">Sarah Putri</p>
            <p className="text-xs text-[#52D49F]">Penumpang</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-background flex items-center justify-center"
          >
            <Phone className="w-5 h-5 text-primary" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-background flex items-center justify-center"
          >
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex ${message.sender === 'driver' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.sender === 'driver'
                  ? 'bg-primary text-white rounded-br-sm'
                  : 'bg-card text-foreground rounded-bl-sm shadow-soft'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <div className={`flex items-center gap-1 mt-1 ${
                message.sender === 'driver' ? 'justify-end' : 'justify-start'
              }`}>
                <span className={`text-[10px] ${
                  message.sender === 'driver' ? 'text-white/70' : 'text-muted-foreground'
                }`}>
                  {message.time}
                </span>
                {message.sender === 'driver' && (
                  message.status === 'read' ? (
                    <CheckCheck className="w-3 h-3 text-white/70" />
                  ) : (
                    <Check className="w-3 h-3 text-white/70" />
                  )
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Replies */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
        {quickReplies.map((reply) => (
          <motion.button
            key={reply}
            whileTap={{ scale: 0.95 }}
            onClick={() => sendQuickReply(reply)}
            className="px-3 py-2 bg-card rounded-full text-xs text-foreground font-medium whitespace-nowrap shadow-soft"
          >
            {reply}
          </motion.button>
        ))}
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 bg-card border-t border-border">
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-background flex items-center justify-center"
          >
            <ImageIcon className="w-5 h-5 text-muted-foreground" />
          </motion.button>
          <div className="flex-1 h-10 bg-background rounded-full px-4 flex items-center">
            <input
              type="text"
              placeholder="Ketik pesan..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
          {inputText ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"
            >
              <Send className="w-5 h-5 text-white" />
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-background flex items-center justify-center"
            >
              <Mic className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}
