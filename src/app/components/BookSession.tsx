import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export default function BookSession() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<'flat_fee' | 'swap'>('flat_fee');
  const [offerMessage, setOfferMessage] = useState('');

  const dates = [
    { day: 'Mon', date: 24 },
    { day: 'Tue', date: 25 },
    { day: 'Wed', date: 26 },
    { day: 'Thu', date: 27 },
    { day: 'Fri', date: 28 }
  ];

  const timeSlots = ['9:00 AM', '10:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

  const handleConfirm = () => {
    if (paymentMethod === 'swap') {
      navigate('/propose-swap/kyle-m');
    } else {
      navigate('/payment');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 py-4 sticky top-0 z-10 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-[#0B1F3A]" />
          </button>
          <h1 className="text-[#0B1F3A] text-xl font-bold">Book a Session</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
            👨‍💻
          </div>
          <div>
            <h3 className="text-[#0B1F3A] font-medium">Kyle M.</h3>
            <p className="text-gray-600 text-sm">Python Programming</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-[#0B1F3A] font-medium">Select Date</h3>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {dates.map((d) => (
              <button
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
                className={`flex-shrink-0 w-16 py-3 rounded-xl border-2 transition-colors ${
                  selectedDate === d.date
                    ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-xs text-gray-600 mb-1">{d.day}</div>
                <div className="text-lg font-medium text-[#0B1F3A]">{d.date}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-[#0B1F3A] font-medium">Select Time</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-3 rounded-xl border-2 transition-colors text-sm ${
                  selectedTime === time
                    ? 'border-[#D4AF37] bg-[#D4AF37]/5 text-[#0B1F3A] font-medium'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-[#0B1F3A] font-medium mb-3">Duration</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDuration(Math.max(1, duration - 1))}
              className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-[#0B1F3A] font-bold"
            >
              −
            </button>
            <div className="flex-1 text-center">
              <span className="text-2xl font-bold text-[#0B1F3A]">{duration}</span>
              <span className="text-gray-600 ml-2">hour{duration > 1 ? 's' : ''}</span>
            </div>
            <button
              onClick={() => setDuration(duration + 1)}
              className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-[#0B1F3A] font-bold"
            >
              +
            </button>
          </div>
        </div>

        <div className="mb-6 pb-24">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Payment Method</h3>
          <div className="space-y-3">
            <div
              onClick={() => setPaymentMethod('flat_fee')}
              className={`p-4 rounded-[12px] border-2 cursor-pointer transition-colors ${
                paymentMethod === 'flat_fee'
                  ? 'border-[#1A2B4C] bg-gray-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'flat_fee' ? 'border-[#1A2B4C]' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'flat_fee' && <div className="w-2.5 h-2.5 rounded-full bg-[#1A2B4C]" />}
                  </div>
                  <span className="font-semibold text-[#1A2B4C]">Pay Flat Fee</span>
                </div>
                <span className="font-bold text-[#1A2B4C]">₱{50 * duration}</span>
              </div>
            </div>

            <div
              onClick={() => setPaymentMethod('swap')}
              className={`p-4 rounded-[12px] border-2 cursor-pointer transition-colors ${
                paymentMethod === 'swap'
                  ? 'border-[#1A2B4C] bg-gray-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'swap' ? 'border-[#1A2B4C]' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'swap' && <div className="w-2.5 h-2.5 rounded-full bg-[#1A2B4C]" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#1A2B4C]">Request Skill Swap</span>
                    <span className="text-lg">🤝</span>
                  </div>
                </div>
              </div>
              {paymentMethod === 'swap' && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Offer Message (Optional)</label>
                  <textarea
                    value={offerMessage}
                    onChange={(e) => setOfferMessage(e.target.value)}
                    placeholder="Briefly describe what you'd like to swap..."
                    className="w-full bg-white border border-gray-200 rounded-[8px] p-3 text-sm text-[#1A2B4C] placeholder-gray-400 focus:outline-none focus:border-[#1A2B4C]"
                    rows={2}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="fixed bottom-6 left-6 right-6">
          <button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className={`w-full py-4 rounded-xl transition-colors font-medium ${
              selectedDate && selectedTime
                ? 'bg-[#1A2B4C] text-white hover:bg-[#1A2B4C]/90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
