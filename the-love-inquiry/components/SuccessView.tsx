import React from 'react';
import { Heart, Sparkles, PartyPopper } from 'lucide-react';

const SuccessView: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-rose-400 to-pink-500 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <Sparkles className="w-[80vw] h-[80vw] text-white animate-spin-slow" />
      </div>

      <div className="relative z-10 text-center space-y-6 animate-in fade-in zoom-in duration-700 px-4">
        <div className="flex justify-center gap-4 text-white">
          <PartyPopper className="w-12 h-12 animate-bounce" />
          <Heart className="w-20 h-20 fill-white animate-pulse" />
          <PartyPopper className="w-12 h-12 animate-bounce delay-150" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl md:text-9xl font-cursive text-white drop-shadow-lg">
            I love you too!
          </h1>
          <h2 className="text-3xl md:text-5xl font-cursive text-pink-100 drop-shadow-md animate-pulse">
            Happy Valentine's Day, Tanmay!
          </h2>
          <p className="text-pink-50 text-xl md:text-2xl font-semibold max-w-md mx-auto drop-shadow-sm pt-2">
            You are my favorite person forever! 💖
          </p>
        </div>

        <div className="flex justify-center pt-4">
           <div className="relative group">
              <div className="absolute -inset-8 bg-white/20 rounded-full blur-3xl group-hover:bg-white/40 transition duration-1000"></div>
              <img 
                src="./couple.png" 
                alt="Tanmay's Date Night" 
                className="relative rounded-3xl border-8 border-white shadow-2xl w-64 h-64 md:w-96 md:h-96 object-cover transition-transform hover:scale-105 duration-500"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1516589174184-c68526677af0?q=80&w=1000&auto=format&fit=crop";
                }}
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-2xl animate-bounce">
                <Heart className="text-red-500 fill-current w-8 h-8" />
              </div>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SuccessView;