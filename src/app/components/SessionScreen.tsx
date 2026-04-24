import { useNavigate } from 'react-router';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';
import { useState } from 'react';

export default function SessionScreen() {
  const navigate = useNavigate();
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  const handleEndCall = () => {
    navigate('/rate');
  };

  return (
    <div className="h-screen bg-[#0B1F3A] relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-b from-[#0B1F3A] to-[#1a3a5f]">
          <div className="absolute top-8 left-6 right-6 flex justify-between items-start">
            <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white text-sm">45:32</span>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center text-5xl mb-4 mx-auto">
              👨‍💻
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">Kyle M.</h2>
            <p className="text-gray-300">Python Programming Session</p>
          </div>

          <div className="absolute bottom-8 right-6 w-32 h-44 bg-gray-800 rounded-xl flex items-center justify-center text-4xl">
            👤
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-0 right-0">
        <div className="flex justify-center items-center gap-6 px-6">
          <button
            onClick={() => setMuted(!muted)}
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              muted ? 'bg-red-500' : 'bg-white/20 backdrop-blur-sm'
            }`}
          >
            {muted ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </button>

          <button
            onClick={handleEndCall}
            className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center"
          >
            <PhoneOff className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={() => setVideoOff(!videoOff)}
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              videoOff ? 'bg-red-500' : 'bg-white/20 backdrop-blur-sm'
            }`}
          >
            {videoOff ? (
              <VideoOff className="w-6 h-6 text-white" />
            ) : (
              <Video className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
