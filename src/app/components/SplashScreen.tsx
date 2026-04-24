import { useEffect } from 'react';


export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="h-screen flex flex-col items-center justify-center px-6 bg-cover bg-center"
      style={{ backgroundImage: 'url(/leader.png)' }}
    >
      <img 
        src="/logo.png" 
        alt="SkillSwap Campus Logo" 
        className="w-72 h-auto mb-6 drop-shadow-2xl"
      />

      <p className="text-white text-xl font-medium tracking-wide mb-12 drop-shadow-md">
        Learn. Share. Grow.
      </p>

      <div className="w-56 h-1.5 bg-white/20 rounded-full overflow-hidden shadow-sm">
        <div className="h-full bg-[#D4AF37] rounded-full"
             style={{ animation: 'progress 2.5s ease-in-out forwards' }} />
      </div>

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
