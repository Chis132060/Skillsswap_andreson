import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Star } from 'lucide-react';

export default function RateReview() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
            👨‍💻
          </div>
          <h1 className="text-[#0B1F3A] text-2xl font-bold mb-2">Rate Your Experience</h1>
          <p className="text-gray-600">How was your session with Kyle M.?</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-12 h-12 ${
                      star <= rating
                        ? 'fill-[#D4AF37] text-[#D4AF37]'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with this tutor..."
              rows={5}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={rating === 0}
            className={`w-full py-4 rounded-xl transition-colors ${
              rating > 0
                ? 'bg-[#0B1F3A] text-white hover:bg-[#0B1F3A]/90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Review
          </button>

          <button
            type="button"
            onClick={() => navigate('/home')}
            className="w-full py-4 text-gray-600 hover:text-[#0B1F3A] transition-colors"
          >
            Skip
          </button>
        </form>
      </div>
    </div>
  );
}
