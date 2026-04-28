import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Bell, Calendar, Clock, MapPin } from 'lucide-react';
import BottomNav from './BottomNav';

interface Booking {
  id: number;
  tutorId: number;
  tutor: string;
  avatar: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  price: number;
  paymentMethod: string;
  createdAt: string;
}

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('skillswap_bookings');
    if (stored) {
      const bookings: Booking[] = JSON.parse(stored);
      // Only show confirmed/upcoming bookings as notifications
      const upcoming = bookings.filter(b => b.status === 'confirmed');
      // Sort by creation date (newest first)
      upcoming.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      setNotifications(upcoming);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-6 py-4 sticky top-0 z-10 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-[#0B1F3A]" />
          </button>
          <h1 className="text-[#0B1F3A] text-xl font-bold flex-1">Notifications</h1>
        </div>
      </div>

      <div className="px-6 py-4 space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-[#0B1F3A] font-medium mb-1">No new notifications</h3>
            <p className="text-gray-500 text-sm">We'll notify you when you have upcoming sessions.</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-[#0B1F3A] cursor-pointer"
              onClick={() => navigate('/bookings')}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-[#0B1F3A] font-bold text-sm mb-1">Upcoming Session Reminder</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    You have a confirmed session with <span className="font-medium text-[#0B1F3A]">{notif.tutor}</span> for {notif.subject}.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{notif.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{notif.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{notif.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <BottomNav />
    </div>
  );
}
