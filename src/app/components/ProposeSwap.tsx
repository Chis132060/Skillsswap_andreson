import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, CheckCircle2, Info } from 'lucide-react';

export default function ProposeSwap() {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState<string | null>('graphic_design');
  const [message, setMessage] = useState('');

  const mySkills = [
    { id: 'graphic_design', title: 'Graphic Design', desc: 'Branding, Logo Design, Adobe CC', icon: '🎨' },
    { id: 'video_editing', title: 'Video Editing', desc: 'Premiere Pro, DaVinci Resolve', icon: '🎬' },
    { id: 'spanish', title: 'Spanish', desc: 'Conversational, Professional', icon: '🌐' },
  ];

  const handleSendProposal = () => {
    navigate('/success');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 sticky top-0 z-10 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ArrowLeft className="w-6 h-6 text-[#1A2B4C]" />
            </button>
            <h1 className="text-[#1A2B4C] text-xl font-bold">Propose Swap</h1>
          </div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Step 1 of 3</span>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 pb-32">
        {/* Requesting From */}
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Requesting From</h2>
        <div className="bg-white rounded-[12px] p-4 mb-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                👨‍💻
              </div>
              <div>
                <h3 className="text-[#1A2B4C] font-semibold text-[15px]">Kyle M.</h3>
                <div className="flex items-center text-xs text-[#C5A021] font-medium mt-0.5">
                  ⭐ 4.9 <span className="text-gray-400 font-normal ml-1">• Computer Science Senior</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#1A2B4C] font-bold text-[15px]">$0.00</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Swap Value</div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center text-sm border border-gray-100">
             <div className="flex items-center gap-2 text-[#1A2B4C] font-medium">
               <span className="text-gray-400">{'</>'}</span> Python for Data Analysis
             </div>
             <div className="text-right text-xs">
               <div className="text-[#1A2B4C] font-semibold">Oct 14, 10:00 AM</div>
               <div className="text-gray-500">60 MIN SESSION</div>
             </div>
          </div>
        </div>

        {/* Your Offer */}
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Your Offer</h2>
        <div className="space-y-3 mb-4">
          {mySkills.map((skill) => (
            <div
              key={skill.id}
              onClick={() => setSelectedSkill(skill.id)}
              className={`p-4 rounded-[12px] flex items-center justify-between cursor-pointer transition-all ${
                selectedSkill === skill.id
                  ? 'bg-[#1A2B4C] text-white shadow-md'
                  : 'bg-white text-[#1A2B4C] border border-gray-200 hover:border-[#1A2B4C]/30'
              }`}
            >
              <div className="flex items-center gap-3">
                 <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                   selectedSkill === skill.id ? 'bg-white/10' : 'bg-gray-50'
                 }`}>
                   {skill.icon}
                 </div>
                 <div>
                   <h3 className="font-semibold text-[15px]">{skill.title}</h3>
                   <p className={`text-xs mt-0.5 ${selectedSkill === skill.id ? 'text-blue-100' : 'text-gray-500'}`}>
                     {skill.desc}
                   </p>
                 </div>
              </div>
              <div className="flex-shrink-0 ml-3">
                {selectedSkill === skill.id ? (
                  <CheckCircle2 className="w-6 h-6 text-[#C5A021]" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-gray-200" />
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="w-full py-3.5 rounded-[12px] border-2 border-dashed border-gray-300 text-gray-500 font-medium flex items-center justify-center gap-2 hover:bg-gray-50 hover:text-[#1A2B4C] hover:border-[#1A2B4C]/30 transition-colors mb-8">
          <Plus className="w-5 h-5" />
          ADD NEW SKILL
        </button>

        {/* Message */}
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Message</h2>
        <div className="mb-8 relative">
           <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pitch Your Swap</label>
           <textarea
             value={message}
             onChange={(e) => setMessage(e.target.value)}
             placeholder="I can help you design a logo for your project in exchange for this Python session."
             className="w-full bg-white border border-gray-200 rounded-[12px] p-4 pt-5 text-sm text-[#1A2B4C] placeholder-gray-400 focus:outline-none focus:border-[#1A2B4C] focus:ring-1 focus:ring-[#1A2B4C] transition-all min-h-[120px] resize-none"
           />
        </div>

        {/* Info Banner */}
        <div className="bg-[#EBF3FA] rounded-[12px] p-4 flex gap-3 mb-6">
          <div className="mt-0.5 flex-shrink-0">
             <Info className="w-5 h-5 text-[#1A2B4C]" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-[#1A2B4C] uppercase tracking-wider mb-1">How it Works</h4>
            <p className="text-xs text-[#1A2B4C]/80 leading-relaxed">
              The tutor must accept the swap for the session to be confirmed. You will be notified once Kyle reviews your proposal.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 pb-8">
        <button
          onClick={handleSendProposal}
          className="w-full h-[56px] rounded-[8px] bg-[#1A2B4C] text-white font-medium text-[15px] flex items-center justify-center gap-2 hover:bg-[#1A2B4C]/90 shadow-[0_4px_14px_rgba(26,43,76,0.25)] transition-all"
        >
          Send Proposal <span className="ml-1 text-lg leading-none">➤</span>
        </button>
      </div>
    </div>
  );
}
