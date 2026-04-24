import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Star, MapPin, Calendar, MessageCircle } from 'lucide-react';

export default function TutorProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const skills = ['Python', 'JavaScript', 'React', 'Node.js'];
  const availability = ['Mon 2-5 PM', 'Wed 3-6 PM', 'Fri 1-4 PM'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0B1F3A] px-6 pt-12 pb-32 rounded-b-3xl relative">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 mb-4">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center text-5xl">
            👨‍💻
          </div>
        </div>
      </div>

      <div className="px-6 pt-20 pb-24">
        <div className="text-center mb-6">
          <h1 className="text-[#0B1F3A] text-2xl font-bold mb-1">Kyle M.</h1>
          <p className="text-gray-600 mb-2">Python Programming Expert</p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>UP Diliman</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
              <span className="font-medium">4.9</span>
              <span>(128 reviews)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="text-[#0B1F3A] font-medium mb-2">About</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            4th year Computer Science student with 3+ years of programming experience.
            Specialized in Python, web development, and data structures. I've helped over
            100 students ace their coding classes and projects.
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="text-[#0B1F3A] font-medium mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-[#0B1F3A]/5 text-[#0B1F3A] rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-[#0B1F3A] font-medium">Availability</h3>
          </div>
          <div className="space-y-2">
            {availability.map((slot, i) => (
              <div key={i} className="text-sm text-gray-600 pl-7">
                {slot}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#D4AF37]/10 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Hourly Rate</p>
              <p className="text-[#0B1F3A] text-2xl font-bold">50</p>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p>per hour</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 fixed bottom-6 left-6 right-6 bg-gray-50 pt-4">
          <button
            onClick={() => navigate('/chat')}
            className="py-4 border-2 border-[#0B1F3A] text-[#0B1F3A] rounded-xl hover:bg-[#0B1F3A]/5 transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Chat
          </button>
          <button
            onClick={() => navigate(`/book/${id}`)}
            className="py-4 bg-[#0B1F3A] text-white rounded-xl hover:bg-[#0B1F3A]/90 transition-colors"
          >
            Book a Session
          </button>
        </div>
      </div>
    </div>
  );
}
