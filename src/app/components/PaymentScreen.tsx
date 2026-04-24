import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, CreditCard, Wallet } from 'lucide-react';

export default function PaymentScreen() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const paymentMethods = [
    { id: 'gcash', name: 'GCash', icon: '💳', color: 'bg-blue-50' },
    { id: 'maya', name: 'Maya', icon: '🟢', color: 'bg-green-50' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦', color: 'bg-purple-50' }
  ];

  const handlePayment = () => {
    navigate('/session');
  };

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
              <span className="text-[#0B1F3A] font-medium">Kyle M.</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subject</span>
              <span className="text-[#0B1F3A] font-medium">Python Programming</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Date & Time</span>
              <span className="text-[#0B1F3A] font-medium">Apr 24, 2:00 PM</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Duration</span>
              <span className="text-[#0B1F3A] font-medium">1 hour</span>
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
            <span className="text-[#0B1F3A] font-medium">₱350.00</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Service Fee</span>
            <span className="text-[#0B1F3A] font-medium">₱35.00</span>
          </div>
          <div className="border-t border-gray-300 pt-3 flex justify-between">
            <span className="text-[#0B1F3A] font-bold">Total Amount</span>
            <span className="text-[#0B1F3A] text-2xl font-bold">₱385.00</span>
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
