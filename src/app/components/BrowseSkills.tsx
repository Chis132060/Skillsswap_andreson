import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Search, SlidersHorizontal, Star } from 'lucide-react';
import BottomNav from './BottomNav';

export default function BrowseSkills() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('Academic');

  const tabs = ['Academic', 'Tech', 'Creative', 'Language'];

  const tutors = [
    { id: 1, name: 'Kyle M.', skill: 'Python Programming', rating: 4.9, reviews: 128, price: 50, image: '👨‍💻' },
    { id: 2, name: 'Sarah L.', skill: 'Calculus & Statistics', rating: 5.0, reviews: 95, price: 50, image: '👩‍🏫' },
    { id: 3, name: 'Maria C.', skill: 'Web Development', rating: 4.8, reviews: 82, price: 50, image: '👩‍💻' },
    { id: 4, name: 'Alex R.', skill: 'UI/UX Design', rating: 4.8, reviews: 67, price: 50, image: '👨‍🎨' },
    { id: 5, name: 'John D.', skill: 'Video Editing', rating: 4.7, reviews: 54, price: 50, image: '🎬' },
    { id: 6, name: 'Emma W.', skill: 'English Speaking', rating: 4.9, reviews: 103, price: 50, image: '👩‍🏫' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-6 py-4 sticky top-0 z-10 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-[#0B1F3A]" />
          </button>
          <h1 className="text-[#0B1F3A] text-xl font-bold flex-1">Browse Skills</h1>
          <button className="p-2">
            <SlidersHorizontal className="w-6 h-6 text-[#0B1F3A]" />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search skills..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
          />
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 sticky top-[136px] z-10">
        <div className="flex gap-2 px-6 py-3 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedTab === tab
                  ? 'bg-[#0B1F3A] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-4 space-y-3">
        {tutors.map((tutor) => (
          <button
            key={tutor.id}
            onClick={() => navigate(`/tutor/${tutor.id}`)}
            className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                {tutor.image}
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-[#0B1F3A] font-medium">{tutor.name}</h3>
                <p className="text-gray-600 text-sm">{tutor.skill}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  <span className="text-sm font-medium">{tutor.rating}</span>
                  <span className="text-sm text-gray-500">({tutor.reviews})</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#0B1F3A] font-bold">₱{tutor.price}</p>
                <p className="text-gray-500 text-xs">/hour</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
