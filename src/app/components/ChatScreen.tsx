import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Send, Search } from 'lucide-react';
import BottomNav from './BottomNav';

export default function ChatScreen() {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const chats = [
    {
      id: 1,
      name: 'Kyle M.',
      avatar: '👨‍💻',
      lastMessage: 'See you tomorrow at 2 PM!',
      time: '10:30 AM',
      unread: 0
    },
    {
      id: 2,
      name: 'Sarah L.',
      avatar: '👩‍🏫',
      lastMessage: 'Thanks for the session!',
      time: 'Yesterday',
      unread: 2
    },
    {
      id: 3,
      name: 'Alex R.',
      avatar: '👨‍🎨',
      lastMessage: 'Can we reschedule?',
      time: 'Apr 20',
      unread: 1
    }
  ];

  const messages = [
    { id: 1, text: 'Hi! Looking forward to our session tomorrow', sender: 'tutor', time: '10:15 AM' },
    { id: 2, text: 'Hi Kyle! Yes, me too. What should I prepare?', sender: 'me', time: '10:20 AM' },
    { id: 3, text: 'Just bring your laptop and any questions you have about Python!', sender: 'tutor', time: '10:25 AM' },
    { id: 4, text: 'See you tomorrow at 2 PM!', sender: 'tutor', time: '10:30 AM' }
  ];

  if (selectedChat) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center gap-4">
          <button onClick={() => setSelectedChat(null)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-[#0B1F3A]" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              {chats[0].avatar}
            </div>
            <div>
              <h2 className="text-[#0B1F3A] font-medium">{chats[0].name}</h2>
              <p className="text-xs text-green-600">Online</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] ${
                  msg.sender === 'me'
                    ? 'bg-[#0B1F3A] text-white'
                    : 'bg-white text-[#0B1F3A]'
                } rounded-2xl px-4 py-3 shadow-sm`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-gray-300' : 'text-gray-500'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 bg-gray-50 rounded-full border border-gray-200 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
            />
            <button
              disabled={!message}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                message
                  ? 'bg-[#0B1F3A] hover:bg-[#0B1F3A]/90'
                  : 'bg-gray-300'
              }`}
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-6 py-4 sticky top-0 z-10 border-b border-gray-200">
        <h1 className="text-[#0B1F3A] text-xl font-bold mb-4">Messages</h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
          />
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setSelectedChat(chat.id)}
            className="w-full px-6 py-4 bg-white hover:bg-gray-50 transition-colors flex items-center gap-4"
          >
            <div className="relative">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                {chat.avatar}
              </div>
              {chat.unread > 0 && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                  {chat.unread}
                </div>
              )}
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-[#0B1F3A] font-medium mb-1">{chat.name}</h3>
              <p className="text-gray-600 text-sm truncate">{chat.lastMessage}</p>
            </div>
            <span className="text-xs text-gray-500">{chat.time}</span>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
