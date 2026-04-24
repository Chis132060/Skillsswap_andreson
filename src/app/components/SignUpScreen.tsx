import { useNavigate } from 'react-router';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';

export default function SignUpScreen() {
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/profile-setup');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-[#0B1F3A]" />
        </button>
      </div>

      <div className="px-6 py-8">
        <h1 className="text-[#0B1F3A] text-3xl font-bold mb-2">Create Account</h1>
        <p className="text-gray-600 mb-8">Join SkillSwap Campus today</p>

        <form onSubmit={handleSignUp} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Create a password"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#0B1F3A] text-white rounded-xl hover:bg-[#0B1F3A]/90 transition-colors mt-6"
          >
            Sign Up
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <span className="font-medium">Google</span>
          </button>
          <button className="py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <span className="font-medium">Facebook</span>
          </button>
        </div>

        <p className="text-center text-gray-600 mt-8">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-[#D4AF37] font-medium hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
