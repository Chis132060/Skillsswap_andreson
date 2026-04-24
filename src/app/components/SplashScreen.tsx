import { useEffect } from 'react';
import { GraduationCap } from 'lucide-react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-screen bg-[#0B1F3A] flex flex-col items-center justify-center px-6">
      <div className="relative">
        <div className="w-32 h-32 rounded-full border-4 border-[#D4AF37] flex items-center justify-center mb-8">
          <GraduationCap className="w-16 h-16 text-[#D4AF37]" />
        </div>
        <div className="absolute -inset-4 border-2 border-[#D4AF37]/30 rounded-full animate-ping" />
      </div>

      <h1 className="text-white text-3xl font-bold mb-3">SKILLSWAP CAMPUS</h1>
      <p className="text-[#D4AF37] text-lg mb-12">Learn. Share. Grow.</p>

      <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-[#D4AF37] rounded-full animate-[progress_2s_ease-in-out]"
             style={{ animation: 'progress 2s ease-in-out forwards' }} />
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
