import { useNavigate, useLocation } from 'react-router';
import { Home, Calendar, MessageCircle, Wallet, User } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Calendar, label: 'Bookings', path: '/bookings' },
    { icon: MessageCircle, label: 'Chat', path: '/chat' },
    { icon: Wallet, label: 'Earnings', path: '/earnings' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center flex-1 gap-1"
            >
              <Icon
                className={`w-6 h-6 ${isActive ? 'text-[#D4AF37]' : 'text-gray-400'}`}
              />
              <span
                className={`text-xs ${isActive ? 'text-[#D4AF37] font-medium' : 'text-gray-400'}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
