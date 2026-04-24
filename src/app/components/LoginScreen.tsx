import { useNavigate } from 'react-router';
import { ArrowLeft, Mail, Lock } from 'lucide-react';

export default function LoginScreen() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
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
        <h1 className="text-[#0B1F3A] text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-gray-600 mb-8">Login to continue learning</p>

        <form onSubmit={handleLogin} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Email or Student ID</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
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
                placeholder="Enter your password"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
              />
            </div>
          </div>

          <div className="text-right">
            <button type="button" className="text-sm text-[#D4AF37] hover:underline">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#0B1F3A] text-white rounded-xl hover:bg-[#0B1F3A]/90 transition-colors mt-6"
          >
            Login
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
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} className="text-[#D4AF37] font-medium hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
