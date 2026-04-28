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
  { id: 6, name: 'Emma W.', skill: 'English Speaking', avatar: '👩‍🏫' },
  { id: 7, name: 'Carlos T.', skill: 'Python Programming', avatar: '👨‍🔬' },
  { id: 8, name: 'Rina P.', skill: 'Calculus & Statistics', avatar: '👩‍🔬' },
  { id: 9, name: 'Jake F.', skill: 'Web Development', avatar: '🧑‍💻' },
  { id: 10, name: 'Mei A.', skill: 'UI/UX Design', avatar: '🎨' }
];

// Pre-populated mock conversations for prototyping
const mockConversations: ChatSession = {
  // Chat 1: Booking a Session (Kyle M. — Python Programming)
  1: [
    { id: 'mock-1-1', text: 'Hey Kyle! I saw your profile — are you available for a Python session this week?', sender: 'me', time: '9:15 AM' },
    { id: 'mock-1-2', text: 'Hey! Yeah I\'m free Thursday and Friday afternoon 😊 What topic do you need help with?', sender: 'tutor', time: '9:17 AM' },
    { id: 'mock-1-3', text: 'I need help with loops and functions. Is it ₱50/hour?', sender: 'me', time: '9:18 AM' },
    { id: 'mock-1-4', text: 'Yep, ₱50/hour! Let\'s do Thursday 3pm? I\'ll prepare some exercises for you 👍', sender: 'tutor', time: '9:20 AM' },
    { id: 'mock-1-5', text: 'Perfect, Thursday 3pm works! See you then 🙌', sender: 'me', time: '9:21 AM' },
  ],
  // Chat 2: Beginner Asking Questions (Sarah L. — Calculus & Statistics)
  2: [
    { id: 'mock-2-1', text: 'Hi Sarah, I\'m really struggling with derivatives 😅 Is it okay if I ask some basic questions?', sender: 'me', time: '10:30 AM' },
    { id: 'mock-2-2', text: 'Of course! No question is too basic. What\'s confusing you?', sender: 'tutor', time: '10:32 AM' },
    { id: 'mock-2-3', text: 'Like... what even IS a derivative? My prof explains it so fast', sender: 'me', time: '10:33 AM' },
    { id: 'mock-2-4', text: 'Think of it as the rate of change — like how fast something is moving at one exact moment. Want me to walk you through it with a simple example?', sender: 'tutor', time: '10:35 AM' },
    { id: 'mock-2-5', text: 'Yes please!! That already makes more sense than my lecture 😂', sender: 'me', time: '10:36 AM' },
    { id: 'mock-2-6', text: 'Haha glad to help! Let\'s book a session and I\'ll make it click for you 💡', sender: 'tutor', time: '10:37 AM' },
  ],
  // Chat 3: Skill Swapping Negotiation (Alex R. — UI/UX Design)
  3: [
    { id: 'mock-3-1', text: 'Hey Alex! I noticed you teach UI/UX. Would you be open to a skill swap instead of paid sessions?', sender: 'me', time: '2:00 PM' },
    { id: 'mock-3-2', text: 'Depends! What skill are you offering? 🤔', sender: 'tutor', time: '2:03 PM' },
    { id: 'mock-3-3', text: 'I can teach you video editing — I\'m pretty good with Premiere Pro and After Effects', sender: 'me', time: '2:04 PM' },
    { id: 'mock-3-4', text: 'Oh nice, I\'ve actually been wanting to learn motion graphics! Deal — 1 hour of UI/UX for 1 hour of video editing? 🤝', sender: 'tutor', time: '2:06 PM' },
    { id: 'mock-3-5', text: 'Sounds fair! When do we start? 😊', sender: 'me', time: '2:07 PM' },
  ],
  // Chat 4: Rush Request (Maria C. — Web Development)
  4: [
    { id: 'mock-4-1', text: 'Maria!! SOS 😭 I have a web dev project due tomorrow and my CSS layout is completely broken', sender: 'me', time: '8:45 PM' },
    { id: 'mock-4-2', text: 'Oh no 😅 What framework are you using? Send me a screenshot', sender: 'tutor', time: '8:47 PM' },
    { id: 'mock-4-3', text: 'Just plain HTML/CSS. The flexbox isn\'t centering anything and my grid is overlapping', sender: 'me', time: '8:48 PM' },
    { id: 'mock-4-4', text: 'Classic flexbox issues haha. I can hop on a call right now if you want? We can fix it together — shouldn\'t take long', sender: 'tutor', time: '8:50 PM' },
    { id: 'mock-4-5', text: 'You\'re a lifesaver!! Yes please, I\'ll send you the code 🙏', sender: 'me', time: '8:51 PM' },
    { id: 'mock-4-6', text: 'No worries, we got this 💪 Send it over!', sender: 'tutor', time: '8:52 PM' },
  ],
  // Chat 5: Price Negotiation (John D. — Video Editing)
  5: [
    { id: 'mock-5-1', text: 'Hi John! How much for video editing sessions? I need to learn the basics for a school project', sender: 'me', time: '11:00 AM' },
    { id: 'mock-5-2', text: 'Hey! It\'s ₱50/hour. What software do you want to learn?', sender: 'tutor', time: '11:05 AM' },
    { id: 'mock-5-3', text: 'CapCut or Premiere. Tbh ₱50 is a bit tight for me rn 😅 Any chance for a discount if I book 3 sessions?', sender: 'me', time: '11:07 AM' },
    { id: 'mock-5-4', text: 'Hmm, how about ₱120 for 3 hours? That\'s like ₱40/hour 👀 since you\'re booking bulk', sender: 'tutor', time: '11:10 AM' },
    { id: 'mock-5-5', text: 'Deal!! You\'re the best 🔥 Let\'s start with CapCut this weekend?', sender: 'me', time: '11:11 AM' },
  ],
  // Chat 6: Feedback After Session (Emma W. — English Speaking)
  6: [
    { id: 'mock-6-1', text: 'Hey Emma! Just wanted to say thanks for the session earlier. My pronunciation really improved! 😊', sender: 'me', time: '5:30 PM' },
    { id: 'mock-6-2', text: 'Aww thank you!! You did amazing honestly. Your intonation is getting so much better 🎉', sender: 'tutor', time: '5:33 PM' },
    { id: 'mock-6-3', text: 'Haha I was so nervous at first but you made it comfortable. Definitely booking again next week!', sender: 'me', time: '5:35 PM' },
    { id: 'mock-6-4', text: 'I\'d love that! We can work on conversational phrases next time. Keep practicing in front of the mirror! 💪😄', sender: 'tutor', time: '5:37 PM' },
  ],
  // Chat 7: Casual Learning Conversation (Carlos T. — Python Programming)
  7: [
    { id: 'mock-7-1', text: 'Carlos, random question — is Python actually useful outside of school?', sender: 'me', time: '3:00 PM' },
    { id: 'mock-7-2', text: 'Bro, YES. I use it for automating stuff, data analysis, even making bots 😂', sender: 'tutor', time: '3:02 PM' },
    { id: 'mock-7-3', text: 'Wait you made a bot?? That\'s sick. Can you teach me how?', sender: 'me', time: '3:03 PM' },
    { id: 'mock-7-4', text: 'For sure! It\'s actually not that hard. We can start with a simple Discord bot — just need like 2 sessions', sender: 'tutor', time: '3:05 PM' },
    { id: 'mock-7-5', text: 'Let\'s gooo 🔥 When are you free?', sender: 'me', time: '3:06 PM' },
    { id: 'mock-7-6', text: 'Tomorrow after lunch? I\'ll set up the project for us 👍', sender: 'tutor', time: '3:07 PM' },
  ],
  // Chat 8: Scheduling (Rina P. — Calculus & Statistics)
  8: [
    { id: 'mock-8-1', text: 'Hi Rina! Can we reschedule our stats session? Something came up on Wednesday 😅', sender: 'me', time: '7:00 PM' },
    { id: 'mock-8-2', text: 'No prob! How about Saturday morning instead? Like 10am?', sender: 'tutor', time: '7:05 PM' },
    { id: 'mock-8-3', text: 'Saturday works but can we do 11am? I\'m not a morning person haha', sender: 'me', time: '7:06 PM' },
    { id: 'mock-8-4', text: 'Haha same honestly 😂 11am it is! We\'ll cover probability distributions', sender: 'tutor', time: '7:08 PM' },
    { id: 'mock-8-5', text: 'Awesome, thanks for being flexible! See you Sat 🙏', sender: 'me', time: '7:09 PM' },
  ],
  // Chat 9: Asking for Help (Jake F. — Web Development)
  9: [
    { id: 'mock-9-1', text: 'Jake, quick question — do you know how to connect a React frontend to a database?', sender: 'me', time: '1:20 PM' },
    { id: 'mock-9-2', text: 'Yeah! You\'ll need a backend API in between. Are you using Node or something else?', sender: 'tutor', time: '1:23 PM' },
    { id: 'mock-9-3', text: 'I don\'t have a backend yet 😅 I thought React can just talk to the database directly?', sender: 'me', time: '1:25 PM' },
    { id: 'mock-9-4', text: 'Nah that would be a security nightmare haha. I can teach you how to set up a simple Express API — it\'s not that scary I promise 😊', sender: 'tutor', time: '1:28 PM' },
    { id: 'mock-9-5', text: 'Okay let\'s do it! Book me for a session this week?', sender: 'me', time: '1:29 PM' },
  ],
  // Chat 10: Project Request (Mei A. — UI/UX Design)
  10: [
    { id: 'mock-10-1', text: 'Hey Mei! I have a class project where I need to design a mobile app mockup. Can you help me?', sender: 'me', time: '4:00 PM' },
    { id: 'mock-10-2', text: 'Sure! What kind of app is it for? 🤔', sender: 'tutor', time: '4:03 PM' },
    { id: 'mock-10-3', text: 'It\'s a fitness tracker app. I need wireframes and a high-fidelity prototype in Figma', sender: 'me', time: '4:05 PM' },
    { id: 'mock-10-4', text: 'Nice! I can teach you how to build it yourself — wireframe first, then components, then prototype. Probably 3 sessions worth', sender: 'tutor', time: '4:08 PM' },
    { id: 'mock-10-5', text: 'That sounds great! ₱50/hour right? So ₱150 total?', sender: 'me', time: '4:09 PM' },
    { id: 'mock-10-6', text: 'Yep! Or if you know any coding, we could skill swap too 😉 Up to you!', sender: 'tutor', time: '4:10 PM' },
  ],
};

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
    const MOCK_VERSION = 'v2_mock_conversations';
    const currentVersion = localStorage.getItem('skillswap_chats_version');
    
    // Force reset if mock data version changed
    if (currentVersion !== MOCK_VERSION) {
      localStorage.removeItem('skillswap_chats');
      localStorage.setItem('skillswap_chats_version', MOCK_VERSION);
    }

    const stored = localStorage.getItem('skillswap_chats');
    let initialHistory: ChatSession = stored ? JSON.parse(stored) : {};

    // Initialize missing tutors with mock conversation data
    let updated = false;
    tutors.forEach(t => {
      if (!initialHistory[t.id]) {
        initialHistory[t.id] = mockConversations[t.id] || [{ 
          id: `init-${t.id}`, 
          text: `Hi! I'm ${t.name}. Let me know if you want to discuss ${t.skill}!`, 
          sender: 'tutor' as const, 
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
    // Array of general static responses for prototyping
    const staticResponses = [
      `That's a great question about ${subject}!`,
      "I'd be happy to explain that in more detail.",
      "Could you give me a specific example of what you're trying to achieve?",
      "That's definitely a core concept we can cover in our sessions.",
      "Yes, exactly! You're on the right track.",
      "Let's schedule a session to dive deeper into this.",
      "Here is a simple way to think about it: practice makes perfect.",
      "I have some great resources on that if you're interested.",
      "That's one of the most common challenges students face."
    ];
    
    // Pick a response based on the message history length so it follows a sequence
    const responseIndex = Math.max(0, history.length - 2) % staticResponses.length;
    
    // Simulate a realistic typing delay (1.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return staticResponses[responseIndex];
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
