import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, Clock, MapPin, X } from 'lucide-react';
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

export default function BookingsScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rescheduleId, setRescheduleId] = useState<number | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  // Load bookings from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('skillswap_bookings');
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  // Save bookings to localStorage whenever they change
  const saveBookings = (updated: Booking[]) => {
    setBookings(updated);
    localStorage.setItem('skillswap_bookings', JSON.stringify(updated));
  };

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed');
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');
  const displayedBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  // Handle reschedule
  const handleReschedule = (bookingId: number) => {
    if (!newDate || !newTime) return;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateObj = new Date(newDate);
    const formattedDate = `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;

    // Parse the selected time and add 1 hour for end time
    const timeMatch = newTime.match(/(\d+):(\d+)/);
    if (!timeMatch) return;
    let hours = parseInt(timeMatch[1]);
    const mins = timeMatch[2];
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayH = hours % 12 === 0 ? 12 : hours % 12;
    const startTime = `${displayH}:${mins} ${period}`;
    
    const endHours = hours + 1;
    const endPeriod = endHours >= 12 && endHours < 24 ? 'PM' : 'AM';
    const endDisplayH = endHours % 12 === 0 ? 12 : endHours % 12;
    const endTime = `${endDisplayH}:${mins} ${endPeriod}`;

    const updated = bookings.map(b => 
      b.id === bookingId 
        ? { ...b, date: formattedDate, time: `${startTime} - ${endTime}` }
        : b
    );
    saveBookings(updated);
    setRescheduleId(null);
    setNewDate('');
    setNewTime('');
  };

  // Handle marking as completed (after joining session)
  const handleJoinSession = (booking: Booking) => {
    navigate('/session', { state: { booking } });
  };

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
        {displayedBookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No {activeTab} bookings</p>
            {activeTab === 'upcoming' && (
              <button
                onClick={() => navigate('/browse')}
                className="mt-4 px-6 py-2 bg-[#0B1F3A] text-white rounded-xl text-sm"
              >
                Browse Tutors
              </button>
            )}
          </div>
        ) : (
          displayedBookings.map((booking) => (
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
                {booking.status === 'cancelled' && (
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                    Cancelled
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

              {/* Reschedule Modal */}
              {rescheduleId === booking.id && (
                <div className="mb-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-[#0B1F3A] font-medium text-sm">Reschedule Session</h4>
                    <button onClick={() => setRescheduleId(null)} className="text-gray-400">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">New Date</label>
                      <input
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">New Time</label>
                      <input
                        type="time"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <button
                      onClick={() => handleReschedule(booking.id)}
                      disabled={!newDate || !newTime}
                      className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                        newDate && newTime
                          ? 'bg-[#D4AF37] text-white'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Confirm Reschedule
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'upcoming' && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setRescheduleId(rescheduleId === booking.id ? null : booking.id);
                      setNewDate('');
                      setNewTime('');
                    }}
                    className={`py-2 border rounded-lg text-sm transition-colors ${
                      rescheduleId === booking.id
                        ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => handleJoinSession(booking)}
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
