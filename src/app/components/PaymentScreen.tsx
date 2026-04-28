import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, CreditCard, CheckCircle2, Info } from 'lucide-react';

export default function PaymentScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isPaid, setIsPaid] = useState(false);

  const paymentMethods = [
    { id: 'gcash', name: 'GCash', icon: '💳', color: 'bg-blue-50' },
    { id: 'maya', name: 'Maya', icon: '🟢', color: 'bg-green-50' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦', color: 'bg-purple-50' }
  ];

  const subtotal = booking?.price || 50;
  const serviceFee = 35;
  const total = subtotal + serviceFee;

  const handlePayment = () => {
    // Show success state instead of navigating immediately
    setIsPaid(true);
  };

  if (isPaid) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
          <button onClick={() => navigate('/home')} className="p-2 -ml-2 text-[#0B1F3A]">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="text-[#0B1F3A] font-semibold">Payment Complete</span>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
            ✓
          </div>
        </div>

        <div className="flex-1 px-6 flex flex-col items-center pt-10 pb-32">
          {/* Success Icon & Heading */}
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(34,197,94,0.3)] mb-6 animate-fade-in-up">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#0B1F3A] mb-2 text-center">Payment Successful!</h1>
          <p className="text-gray-500 text-sm text-center mb-10 max-w-[260px]">
            Your session with {booking?.tutor || 'Kyle M.'} has been confirmed.
          </p>

          {/* Recap Card */}
          <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-8">
            <div className="p-4 bg-gray-50/50 flex items-center gap-3 border-b border-gray-100">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                {booking?.avatar || '👨‍💻'}
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">Tutor</div>
                <div className="text-[#0B1F3A] font-bold text-[15px]">{booking?.tutor || 'Kyle M.'}</div>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-500">Subject</span>
                <span className="text-sm font-medium text-[#0B1F3A]">{booking?.subject || 'Python Programming'}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-500">Date & Time</span>
                <span className="text-sm font-medium text-[#0B1F3A]">{booking?.date || 'Apr 24'}, {booking?.time?.split(' - ')[0] || '2:00 PM'}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-500">Amount Paid</span>
                <span className="text-sm font-bold text-[#0B1F3A]">₱{total}.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Payment Method</span>
                <span className="text-sm font-medium text-[#0B1F3A] capitalize">{paymentMethods.find(m => m.id === selectedMethod)?.name || 'E-Wallet'}</span>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="w-full bg-[#D4AF37]/10 rounded-xl p-4 flex gap-3">
            <div className="mt-0.5 flex-shrink-0">
               <Info className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">Session Ready</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                You can join the session from your Bookings page when it's time. A reminder will be sent to you 15 minutes before the start.
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Actions */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 pb-8 flex flex-col gap-3">
          <button
            onClick={() => navigate('/bookings')}
            className="w-full h-[56px] rounded-[8px] bg-[#0B1F3A] text-white font-medium text-[15px] flex items-center justify-center hover:bg-[#0B1F3A]/90 shadow-[0_4px_14px_rgba(11,31,58,0.25)] transition-all"
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate('/home')}
            className="w-full h-[56px] rounded-[8px] bg-white border-2 border-[#0B1F3A] text-[#0B1F3A] font-medium text-[15px] flex items-center justify-center hover:bg-gray-50 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 py-4 sticky top-0 z-10 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-[#0B1F3A]" />
          </button>
          <h1 className="text-[#0B1F3A] text-xl font-bold">Payment</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="text-[#0B1F3A] font-medium mb-4">Session Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tutor</span>
              <span className="text-[#0B1F3A] font-medium">{booking?.tutor || 'Kyle M.'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subject</span>
              <span className="text-[#0B1F3A] font-medium">{booking?.subject || 'Python Programming'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Date & Time</span>
              <span className="text-[#0B1F3A] font-medium">{booking ? `${booking.date}` : 'Apr 24, 2:00 PM'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Time</span>
              <span className="text-[#0B1F3A] font-medium">{booking?.time || '2:00 PM - 3:00 PM'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Duration</span>
              <span className="text-[#0B1F3A] font-medium">{booking?.duration || 1} hour{(booking?.duration || 1) > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-[#0B1F3A] font-medium mb-4">Payment Method</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-4 rounded-xl border-2 transition-colors ${
                  selectedMethod === method.id
                    ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${method.color} rounded-full flex items-center justify-center text-xl`}>
                    {method.icon}
                  </div>
                  <span className="text-[#0B1F3A] font-medium">{method.name}</span>
                  <div className="ml-auto">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === method.id
                        ? 'border-[#D4AF37]'
                        : 'border-gray-300'
                    }`}>
                      {selectedMethod === method.id && (
                        <div className="w-3 h-3 bg-[#D4AF37] rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#D4AF37]/10 rounded-xl p-4 mb-24">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-[#0B1F3A] font-medium">₱{subtotal}.00</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Service Fee</span>
            <span className="text-[#0B1F3A] font-medium">₱{serviceFee}.00</span>
          </div>
          <div className="border-t border-gray-300 pt-3 flex justify-between">
            <span className="text-[#0B1F3A] font-bold">Total Amount</span>
            <span className="text-[#0B1F3A] text-2xl font-bold">₱{total}.00</span>
          </div>
        </div>

        <div className="fixed bottom-6 left-6 right-6">
          <button
            onClick={handlePayment}
            disabled={!selectedMethod}
            className={`w-full py-4 rounded-xl transition-colors flex items-center justify-center gap-2 ${
              selectedMethod
                ? 'bg-[#0B1F3A] text-white hover:bg-[#0B1F3A]/90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
