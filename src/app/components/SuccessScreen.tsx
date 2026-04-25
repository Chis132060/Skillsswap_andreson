import { useNavigate } from 'react-router';
import { ArrowLeft, Handshake, ArrowDownUp, Info } from 'lucide-react';

export default function SuccessScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between">
        <button onClick={() => navigate('/home')} className="p-2 -ml-2 text-[#1A2B4C]">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-[#1A2B4C] font-semibold">Proposal Sent</span>
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
          1
        </div>
      </div>

      <div className="flex-1 px-6 flex flex-col items-center pt-8 pb-32">
        {/* Success Icon & Heading */}
        <div className="w-20 h-20 bg-[#1A2B4C] rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(26,43,76,0.3)] mb-6 animate-fade-in-up">
           <Handshake className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-[#1A2B4C] mb-2 text-center">Proposal Sent!</h1>
        <p className="text-gray-500 text-sm text-center mb-10 max-w-[240px]">
          Your request is on its way to Kyle.
        </p>

        {/* Recap Card */}
        <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-8">
           <div className="p-4 bg-gray-50/50 flex items-center gap-3 border-b border-gray-100">
             <img src="https://ui-avatars.com/api/?name=Kyle+M&background=1A2B4C&color=fff" alt="Kyle" className="w-10 h-10 rounded-full" />
             <div>
               <div className="text-[10px] font-bold text-[#C5A021] uppercase tracking-wider">Skill Exchange Partner</div>
               <div className="text-[#1A2B4C] font-bold text-[15px]">Kyle M.</div>
             </div>
           </div>
           
           <div className="p-5">
             <div className="mb-4">
               <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">You've Offered</div>
               <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3 text-sm font-medium text-[#1A2B4C]">
                  <span className="text-xl">🎨</span> Graphic Design
               </div>
             </div>

             <div className="relative flex justify-center py-2">
                <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-gray-200"></div>
                <div className="relative z-10 w-8 h-8 bg-[#1A2B4C] rounded-full flex items-center justify-center">
                  <ArrowDownUp className="w-4 h-4 text-white" />
                </div>
             </div>

             <div className="mt-4">
               <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Requested</div>
               <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 flex items-center gap-3 text-sm font-medium text-[#1A2B4C]">
                  <span className="text-blue-500 font-bold">{'</>'}</span> Python for Data Analysis
               </div>
             </div>
           </div>
        </div>

        {/* Info Banner */}
        <div className="w-full bg-[#FCF8E8] rounded-xl p-4 flex gap-3">
          <div className="mt-0.5 flex-shrink-0">
             <Info className="w-5 h-5 text-[#C5A021]" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-[#1A2B4C] uppercase tracking-wider mb-1">What's Next?</h4>
            <p className="text-xs text-[#1A2B4C]/70 leading-relaxed">
              Kyle will review your proposal. You'll be notified once he accepts or suggests changes. Check your inbox for updates.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 pb-8 flex flex-col gap-3">
        <button
          onClick={() => navigate('/home')}
          className="w-full h-[56px] rounded-[8px] bg-[#1A2B4C] text-white font-medium text-[15px] flex items-center justify-center hover:bg-[#1A2B4C]/90 shadow-[0_4px_14px_rgba(26,43,76,0.25)] transition-all"
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate('/bookings')}
          className="w-full h-[56px] rounded-[8px] bg-white border-2 border-[#1A2B4C] text-[#1A2B4C] font-medium text-[15px] flex items-center justify-center hover:bg-gray-50 transition-all"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
}
