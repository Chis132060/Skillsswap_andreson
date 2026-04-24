import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, Clock, MapPin } from 'lucide-react';
import BottomNav from './BottomNav';

export default function BookingsScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingBookings = [
    {
      id: 1,
      tutor: 'Kyle M.',
      avatar: '👨‍💻',
      subject: 'Python Programming',
      date: 'Apr 24, 2026',
      time: '2:00 PM - 3:00 PM',
      location: 'Online',
      status: 'confirmed'
    },
    {
      id: 2,
      tutor: 'Sarah L.',
      avatar: '👩‍🏫',
      subject: 'Calculus',
      date: 'Apr 26, 2026',
      time: '10:00 AM - 11:30 AM',
      location: 'Online',
      status: 'confirmed'
    }
  ];

  const pastBookings = [
    {
      id: 3,
      tutor: 'Alex R.',
      avatar: '👨‍🎨',
      subject: 'UI/UX Design',
      date: 'Apr 20, 2026',
      time: '3:00 PM - 4:00 PM',
      location: 'Online',
      status: 'completed'
    },
    {
      id: 4,
      tutor: 'Maria C.',
      avatar: '👩‍💻',
      subject: 'Web Development',
      date: 'Apr 18, 2026',
      time: '1:00 PM - 3:00 PM',
      location: 'Online',
      status: 'completed'
    }
  ];

  const bookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-6 py-4 sticky top-0 z-10 border-b border-gray-200">
        <h1 className="text-[#0B1F3A] text-xl font-bold mb-4">My Bookings</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 rounded-xl transition-colors ${
              activeTab === 'upcoming'
                ? 'bg-[#0B1F3A] text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-2 rounded-xl transition-colors ${
              activeTab === 'past'
                ? 'bg-[#0B1F3A] text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Past
          </button>
        </div>
      </div>

      <div className="px-6 py-4 space-y-4">
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No {activeTab} bookings</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                  {booking.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-[#0B1F3A] font-medium mb-1">{booking.tutor}</h3>
                  <p className="text-gray-600 text-sm">{booking.subject}</p>
                </div>
                {booking.status === 'confirmed' && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Confirmed
                  </span>
                )}
                {booking.status === 'completed' && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    Completed
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>{booking.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>{booking.location}</span>
                </div>
              </div>

              {activeTab === 'upcoming' && (
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2 border border-gray-200 rounded-lg text-gray-700 text-sm hover:bg-gray-50">
                    Reschedule
                  </button>
                  <button
                    onClick={() => navigate('/session')}
                    className="py-2 bg-[#0B1F3A] text-white rounded-lg text-sm hover:bg-[#0B1F3A]/90"
                  >
                    Join Session
                  </button>
                </div>
              )}

              {activeTab === 'past' && (
                <button
                  onClick={() => navigate('/rate')}
                  className="w-full py-2 border border-[#D4AF37] text-[#D4AF37] rounded-lg text-sm hover:bg-[#D4AF37]/5"
                >
                  Rate Session
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
}
