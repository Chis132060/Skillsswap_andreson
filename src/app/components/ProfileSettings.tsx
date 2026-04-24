import { useNavigate } from 'react-router';
import { ChevronRight, User, Star, Calendar, CreditCard, Bell, HelpCircle, LogOut, Camera } from 'lucide-react';
import BottomNav from './BottomNav';

export default function ProfileSettings() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: 'Edit Profile', action: () => {} },
    { icon: Star, label: 'My Skills', action: () => {} },
    { icon: Calendar, label: 'Booking History', action: () => navigate('/bookings') },
    { icon: CreditCard, label: 'Payment Methods', action: () => {} },
    { icon: Bell, label: 'Notifications', action: () => {} },
    { icon: HelpCircle, label: 'Help & Support', action: () => {} }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-[#0B1F3A] px-6 pt-12 pb-24 rounded-b-3xl relative">
        <h1 className="text-white text-xl font-bold mb-8">Profile & Settings</h1>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="relative">
            <div className="w-28 h-28 bg-gray-200 rounded-full border-4 border-white overflow-hidden">
              <img src="/andreson.jpg" alt="Andreson Cuenca" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-1 right-1 w-9 h-9 bg-[#D4AF37] rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 pt-20 pb-6">
        <div className="text-center mb-8">
          <h2 className="text-[#0B1F3A] text-xl font-bold mb-1">Andreson Cuenca</h2>
          <p className="text-gray-600 text-sm mb-2">Harvard University</p>
          <p className="text-gray-500 text-sm">BS Business Administration</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-[#0B1F3A] mb-1">12</p>
            <p className="text-xs text-gray-600">Sessions</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-[#0B1F3A] mb-1">4.9</p>
            <p className="text-xs text-gray-600">Rating</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100 mb-6">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                onClick={item.action}
                className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                <Icon className="w-5 h-5 text-[#D4AF37]" />
                <span className="flex-1 text-left text-[#0B1F3A]">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            );
          })}
        </div>

        <button
          onClick={() => navigate('/welcome')}
          className="w-full px-4 py-4 bg-white rounded-xl shadow-sm flex items-center justify-center gap-3 text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
