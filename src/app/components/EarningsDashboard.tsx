import { useNavigate } from 'react-router';
import { ArrowLeft, TrendingUp, Calendar } from 'lucide-react';
import BottomNav from './BottomNav';

export default function EarningsDashboard() {
  const navigate = useNavigate();

  const transactions = [
    { id: 1, student: 'Maria Santos', subject: 'Python Basics', amount: 350, date: 'Apr 22, 2026' },
    { id: 2, student: 'John Reyes', subject: 'Web Development', amount: 700, date: 'Apr 20, 2026' },
    { id: 3, student: 'Sarah Cruz', subject: 'Data Structures', amount: 350, date: 'Apr 18, 2026' },
    { id: 4, student: 'Mike Torres', subject: 'React Tutorial', amount: 525, date: 'Apr 15, 2026' }
  ];
  const totalEarnings = 1925;
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-6 py-4 sticky top-0 z-10 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <h1 className="text-[#0B1F3A] text-xl font-bold">My Earnings</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5f] rounded-2xl p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm text-gray-300">Total Earnings</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">₱{totalEarnings.toLocaleString()}</h2>
          <button
            onClick={() => navigate('/withdraw')}
            className="w-full py-3 bg-[#D4AF37] text-[#0B1F3A] rounded-xl font-medium hover:bg-[#D4AF37]/90 transition-colors"
          >
            Withdraw Earnings
          </button>
        </div>

        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="text-[#0B1F3A] font-medium mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-start justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex-1">
                  <h4 className="text-[#0B1F3A] font-medium text-sm">{tx.student}</h4>
                  <p className="text-gray-600 text-xs mb-1">{tx.subject}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {tx.date}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[#0B1F3A] font-bold">+₱{tx.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-[#0B1F3A] mb-1">12</p>
            <p className="text-xs text-gray-600">Sessions</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-[#0B1F3A] mb-1">4.9</p>
            <p className="text-xs text-gray-600">Rating</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-[#0B1F3A] mb-1">8</p>
            <p className="text-xs text-gray-600">Students</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
