import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Camera, ArrowLeft } from 'lucide-react';

export default function ProfileSetup() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-[#0B1F3A]" />
        </button>
      </div>

      <div className="px-6 py-8">
        <h1 className="text-[#0B1F3A] text-3xl font-bold mb-2">Tell us about yourself</h1>
        <p className="text-gray-600 mb-8">Complete your profile to get started</p>

        <form onSubmit={handleContinue} className="space-y-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-white"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Juan Dela Cruz"
              className="w-full px-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">School/University</label>
            <input
              type="text"
              placeholder="University of the Philippines"
              className="w-full px-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Course/Program</label>
            <input
              type="text"
              placeholder="BS Computer Science"
              className="w-full px-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-3">I want to...</label>
            <div className="space-y-3">
              {[
                { id: 'learner', label: 'Learn from others', desc: 'Book tutoring sessions' },
                { id: 'tutor', label: 'Teach & earn', desc: 'Share your skills and get paid' },
                { id: 'both', label: 'Both', desc: 'Learn and teach' }
              ].map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedRole === role.id
                      ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-[#0B1F3A]">{role.label}</div>
                  <div className="text-sm text-gray-600">{role.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#0B1F3A] text-white rounded-xl hover:bg-[#0B1F3A]/90 transition-colors mt-8"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
