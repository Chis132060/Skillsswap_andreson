import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Send, Search, Loader2 } from 'lucide-react';
import BottomNav from './BottomNav';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'tutor';
  time: string;
}

interface ChatSession {
  [tutorId: number]: Message[];
}

const tutors = [
  { id: 1, name: 'Kyle M.', skill: 'Python Programming', avatar: '👨‍💻' },
  { id: 2, name: 'Sarah L.', skill: 'Calculus & Statistics', avatar: '👩‍🏫' },
  { id: 3, name: 'Alex R.', skill: 'UI/UX Design', avatar: '👨‍🎨' },
  { id: 4, name: 'Maria C.', skill: 'Web Development', avatar: '👩‍💻' },
  { id: 5, name: 'John D.', skill: 'Video Editing', avatar: '🎬' },
  { id: 6, name: 'Emma W.', skill: 'English Speaking', avatar: '👩‍🏫' }
];

export default function ChatScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatSession>({});
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load from localStorage and handle incoming route state
  useEffect(() => {
    const stored = localStorage.getItem('skillswap_chats');
    let initialHistory: ChatSession = stored ? JSON.parse(stored) : {};

    // Initialize missing tutors with a welcome message
    let updated = false;
    tutors.forEach(t => {
      if (!initialHistory[t.id]) {
        initialHistory[t.id] = [{ 
          id: `init-${t.id}`, 
          text: `Hi! I'm ${t.name}. Let me know if you want to discuss ${t.skill}!`, 
          sender: 'tutor', 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }];
        updated = true;
      }
    });

    if (updated || !stored) {
      localStorage.setItem('skillswap_chats', JSON.stringify(initialHistory));
    }
    
    setChatHistory(initialHistory);

    // Auto-open chat if navigated from tutor profile
    if (location.state?.selectedChat) {
      setSelectedChat(location.state.selectedChat);
      // Clear state so a refresh doesn't force open the chat again
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, selectedChat, isTyping]);

  const generateTutorResponse = async (tutorName: string, subject: string, history: Message[]) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();
    
    if (!apiKey) {
      return "⚠️ **API Key Missing** ⚠️\nTo make this chat dynamic, please get a free Gemini API key and add it to your .env file as VITE_GEMINI_API_KEY.";
    }

    const systemPrompt = `You are ${tutorName}, a human tutor on SkillSwap teaching ${subject}. You must strictly act as this human tutor. Be extremely concise. Keep your responses to 1-2 short sentences maximum to save tokens. Answer ONLY questions related to your subject. Do not hallucinate external details.`;
    
    // Format history for Gemini
    const contents = history.slice(-5).map(msg => ({
      role: msg.sender === 'me' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 60,
          }
        })
      });
      
      const data = await response.json();
      
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        return data.candidates[0].content.parts[0].text.trim();
      } else {
        return "Sorry, I couldn't understand that.";
      }
    } catch (error) {
      console.error(error);
      return "Sorry, my internet connection is acting up. Let's chat later!";
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentTutor = tutors.find(t => t.id === selectedChat);
    if (!currentTutor) return;

    const updatedHistory = {
      ...chatHistory,
      [selectedChat]: [...(chatHistory[selectedChat] || []), newMsg]
    };

    setChatHistory(updatedHistory);
    localStorage.setItem('skillswap_chats', JSON.stringify(updatedHistory));
    setMessage('');
    setIsTyping(true);

    // Call AI
    const replyText = await generateTutorResponse(currentTutor.name, currentTutor.skill, updatedHistory[selectedChat]);
    
    const replyMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: replyText,
      sender: 'tutor',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const finalHistory = {
      ...updatedHistory,
      [selectedChat]: [...updatedHistory[selectedChat], replyMsg]
    };

    setChatHistory(finalHistory);
    localStorage.setItem('skillswap_chats', JSON.stringify(finalHistory));
    setIsTyping(false);
  };

  if (selectedChat) {
    const activeTutor = tutors.find(t => t.id === selectedChat);
    const activeMessages = chatHistory[selectedChat] || [];

    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center gap-4 sticky top-0 z-10">
          <button onClick={() => setSelectedChat(null)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-[#0B1F3A]" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
              {activeTutor?.avatar}
            </div>
            <div>
              <h2 className="text-[#0B1F3A] font-medium">{activeTutor?.name}</h2>
              <p className="text-xs text-green-600">Online</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {activeMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] ${
                  msg.sender === 'me'
                    ? 'bg-[#0B1F3A] text-white rounded-l-2xl rounded-tr-2xl'
                    : 'bg-white text-[#0B1F3A] border border-gray-100 rounded-r-2xl rounded-tl-2xl'
                } px-4 py-3 shadow-sm`}
              >
                <p className="text-[15px] leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1.5 ${msg.sender === 'me' ? 'text-gray-300' : 'text-gray-400'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 rounded-r-2xl rounded-tl-2xl px-4 py-3 shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                <span className="text-sm text-gray-400">typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 bg-gray-50 rounded-full border border-gray-200 focus:border-[#0B1F3A] focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || isTyping}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                message.trim() && !isTyping
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
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#0B1F3A] focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
          />
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {tutors.map((tutor) => {
          const tutorMsgs = chatHistory[tutor.id] || [];
          const lastMsg = tutorMsgs.length > 0 ? tutorMsgs[tutorMsgs.length - 1] : null;

          return (
            <button
              key={tutor.id}
              onClick={() => setSelectedChat(tutor.id)}
              className="w-full px-6 py-4 bg-white hover:bg-gray-50 transition-colors flex items-center gap-4"
            >
              <div className="relative">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                  {tutor.avatar}
                </div>
              </div>
              <div className="flex-1 text-left overflow-hidden">
                <h3 className="text-[#0B1F3A] font-medium mb-1">{tutor.name}</h3>
                <p className="text-gray-600 text-sm truncate">
                  {lastMsg ? lastMsg.text : 'Start a conversation'}
                </p>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {lastMsg ? lastMsg.time : ''}
              </span>
            </button>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
