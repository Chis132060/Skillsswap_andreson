import { useNavigate } from 'react-router';


export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-white flex flex-col px-6 py-8">
      <div className="flex-1 flex flex-col items-center justify-center">
        <img src="/logo.png" alt="SkillSwap Logo" className="w-40 h-40 object-contain mb-8 drop-shadow-lg" />

        <h1 className="text-[#0B1F3A] text-2xl font-bold mb-2">Welcome to</h1>
        <h2 className="text-[#0B1F3A] text-3xl font-bold mb-6">SkillSwap Campus</h2>

        <p className="text-gray-600 text-center mb-12 max-w-sm">
          Connect with fellow students. Learn new skills. Share knowledge. Earn while you help others grow.
        </p>
      </div>

      <div className="space-y-3 pb-8">
        <button
          onClick={() => navigate('/login')}
          className="w-full py-4 bg-[#0B1F3A] text-white rounded-xl hover:bg-[#0B1F3A]/90 transition-colors"
        >
          Login
        </button>

        <button
          onClick={() => navigate('/signup')}
          className="w-full py-4 border-2 border-[#0B1F3A] text-[#0B1F3A] rounded-xl hover:bg-[#0B1F3A]/5 transition-colors"
        >
          Sign Up
        </button>

        <button
          onClick={() => navigate('/home')}
          className="w-full py-4 text-gray-600 hover:text-[#0B1F3A] transition-colors"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}
