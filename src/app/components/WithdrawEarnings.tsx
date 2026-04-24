import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Wallet } from 'lucide-react';

export default function WithdrawEarnings() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  const availableBalance = 2450;

  const paymentMethods = [
    { id: 'gcash', name: 'GCash', number: '0917 123 4567', icon: '💳' },
    { id: 'maya', name: 'Maya', number: '0928 765 4321', icon: '🟢' },
    { id: 'bank', name: 'BDO', number: '1234 5678 9012', icon: '🏦' }
  ];

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/earnings');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 py-4 sticky top-0 z-10 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-[#0B1F3A]" />
          </button>
          <h1 className="text-[#0B1F3A] text-xl font-bold">Withdraw Earnings</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="bg-[#0B1F3A] rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm text-gray-300">Available Balance</span>
          </div>
          <h2 className="text-4xl font-bold">₱{availableBalance.toLocaleString()}</h2>
        </div>

        <form onSubmit={handleWithdraw}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount to Withdraw
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B1F3A] font-medium">
                ₱
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-4 bg-white rounded-xl border-2 border-gray-200 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 text-lg"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Maximum: ₱{availableBalance.toLocaleString()}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Withdrawal Method</h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-colors ${
                    selectedMethod === method.id
                      ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{method.icon}</span>
                    <div className="flex-1 text-left">
                      <p className="text-[#0B1F3A] font-medium">{method.name}</p>
                      <p className="text-gray-600 text-sm">{method.number}</p>
                    </div>
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
                </button>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-yellow-800">
              Processing time: 1-3 business days. A 2% transaction fee will be applied.
            </p>
          </div>

          <button
            type="submit"
            disabled={!amount || !selectedMethod || parseFloat(amount) > availableBalance}
            className={`w-full py-4 rounded-xl transition-colors ${
              amount && selectedMethod && parseFloat(amount) <= availableBalance
                ? 'bg-[#0B1F3A] text-white hover:bg-[#0B1F3A]/90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Withdraw Now
          </button>
        </form>
      </div>
    </div>
  );
}
