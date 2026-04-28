import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Bell, Star, ChevronRight } from 'lucide-react';
import BottomNav from './BottomNav';

export default function HomeScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/browse', { state: { search: searchQuery } });
    } else {
      navigate('/browse');
    }
  };

  const categories = [
    { name: 'Academic', icon: '📚', color: 'bg-blue-100' },
    { name: 'Tech', icon: '💻', color: 'bg-purple-100' },
    { name: 'Creative', icon: '🎨', color: 'bg-pink-100' },
    { name: 'Language', icon: '🗣️', color: 'bg-green-100' }
  ];

  const tutors = [
    { id: 1, name: 'Kyle M.', skill: 'Python Programming', rating: 4.9, reviews: 128, price: 50, image: '👨‍💻' },
    { id: 2, name: 'Sarah L.', skill: 'Calculus & Statistics', rating: 5.0, reviews: 95, price: 50, image: '👩‍🏫' },
    { id: 3, name: 'Alex R.', skill: 'UI/UX Design', rating: 4.8, reviews: 67, price: 50, image: '👨‍🎨' }
  ];

  const filteredTutors = tutors.filter(tutor => 
    tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tutor.skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-[#0B1F3A] px-6 pt-12 pb-8 rounded-b-3xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-300 text-sm">Good morning</p>
            <h1 className="text-white text-2xl font-bold">Hello, Andreson! 👋</h1>
          </div>
          <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
          </button>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for skills, tutors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-xl focus:outline-none"
          />
        </form>
      </div>

      <div className="px-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#0B1F3A] text-lg font-bold">Category</h2>
          <button
            onClick={() => navigate('/browse')}
            className="text-[#D4AF37] text-sm font-medium"
          >
            See All
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate('/browse', { state: { category: cat.name } })}
              className={`${cat.color} rounded-xl p-4 flex flex-col items-center gap-2`}
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-xs text-gray-700 text-center">{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#0B1F3A] text-lg font-bold">Featured Tutors</h2>
          <button
            onClick={() => navigate('/browse')}
            className="text-[#D4AF37] text-sm font-medium"
          >
            See All
          </button>
        </div>

        <div className="space-y-3">
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor) => (
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
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-400 text-sm">No tutors found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
