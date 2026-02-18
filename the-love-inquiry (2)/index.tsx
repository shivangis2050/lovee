import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Heart, 
  LockOpen, 
  Sparkles, 
  PartyPopper
} from 'lucide-react';

// --- Constants ---
// This points to the image you will put in your project folder
const SUCCESS_IMAGE = "./couple.png";

// --- Components ---

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 15,
      duration: Math.random() * 8 + 7,
      delay: Math.random() * 5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute bottom-[-50px] animate-float-up text-rose-300"
          style={{
            left: h.left,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          <Heart className="fill-current" />
        </div>
      ))}
    </div>
  );
};

const SuccessView = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center animate-in fade-in zoom-in duration-1000 bg-gradient-to-br from-rose-50 to-pink-100">
    <div className="space-y-6 relative z-10 max-w-2xl w-full">
      <div className="flex justify-center gap-4 text-rose-500">
        <PartyPopper className="w-10 h-10 md:w-16 md:h-16 animate-bounce" />
        <Heart className="w-16 h-16 md:w-24 md:h-24 fill-current animate-pulse" />
        <PartyPopper className="w-10 h-10 md:w-16 md:h-16 animate-bounce" style={{ animationDelay: '0.2s' }} />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-6xl md:text-9xl font-cursive text-rose-600 drop-shadow-sm">Yay!</h1>
        <h2 className="text-3xl md:text-5xl font-cursive text-rose-500">I love you too!</h2>
        <p className="text-rose-400 text-lg md:text-xl font-medium italic mt-4">Happy Valentine's Day, Tanmay! ❤️</p>
      </div>

      <div className="relative group pt-4">
        <div className="absolute -inset-8 bg-white/40 rounded-full blur-3xl group-hover:bg-rose-200/50 transition duration-1000"></div>
        <img 
          src={SUCCESS_IMAGE} 
          className="relative w-64 h-64 md:w-96 md:h-96 object-cover rounded-3xl border-8 border-white shadow-2xl mx-auto transition-transform hover:scale-105 duration-500" 
          alt="Happy Valentine's Day Tanmay"
          onError={(e) => {
            // Fallback in case they haven't added the local image yet
            e.currentTarget.src = "https://images.unsplash.com/photo-1516589174184-c68526677af0?q=80&w=1000&auto=format&fit=crop";
          }}
        />
        <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-xl animate-bounce">
          <Heart className="text-rose-500 fill-current w-8 h-8" />
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const moveNoButton = useCallback(() => {
    const padding = 100;
    const maxX = (window.innerWidth / 2) - padding;
    const maxY = (window.innerHeight / 2) - padding;
    
    const randomX = (Math.random() - 0.5) * maxX * 1.8;
    const randomY = (Math.random() - 0.5) * maxY * 1.8;
    
    setNoPos({ x: randomX, y: randomY });
    setNoCount(prev => prev + 1);
  }, []);

  const getNoButtonText = () => {
    const phrases = [
      "No", "Are you sure?", "Really sure?", "Think again!", "Last chance!", 
      "Surely not?", "Breaking my heart!", "Please?", "Don't...", "Yes?", "Wait!", "🥺"
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const yesScale = 1 + noCount * 0.25;
  const noScale = Math.max(0.2, 1 - noCount * 0.1);

  if (!isStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-rose-50 p-6 text-center">
        <FloatingHearts />
        <div className="z-10 p-12 bg-white/95 backdrop-blur-sm rounded-[3rem] shadow-[0_20px_50px_rgba(255,182,193,0.3)] border-4 border-white max-w-sm w-full space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
          <div className="relative">
            <Heart className="w-24 h-24 text-rose-500 fill-current mx-auto animate-pulse" />
            <Sparkles className="absolute top-0 right-4 w-6 h-6 text-amber-400 animate-spin" />
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-cursive text-rose-600">Special Message</h1>
            <p className="text-slate-500 font-medium leading-relaxed">I have a very important question for you...</p>
          </div>
          <button 
            onClick={() => setIsStarted(true)} 
            className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-rose-500 text-white font-bold text-lg rounded-full hover:bg-rose-600 shadow-xl transition-all active:scale-95 group"
          >
            <LockOpen className="w-6 h-6 group-hover:scale-110 transition-transform" /> OPEN HEART
          </button>
        </div>
      </div>
    );
  }

  if (hasAccepted) {
    return (
      <div className="w-full">
        <FloatingHearts />
        <SuccessView />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-rose-50 overflow-hidden relative">
      <FloatingHearts />
      
      <div className="z-10 space-y-16 max-w-2xl w-full">
        <div className="space-y-6 animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="relative inline-block">
            <Heart className="w-16 h-16 text-rose-500 fill-current mx-auto animate-bounce" />
          </div>
          <h1 className="text-6xl md:text-8xl font-cursive text-rose-600 leading-tight">Do you love me?</h1>
          <p className="text-slate-500 font-medium text-xl italic animate-pulse">Please say yes... 🥺</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 min-h-[300px] relative">
          <button
            onClick={() => setHasAccepted(true)}
            style={{ transform: `scale(${yesScale})` }}
            className="px-12 py-5 bg-rose-500 text-white font-bold text-2xl rounded-full shadow-2xl hover:bg-rose-600 transition-all active:scale-95 z-20 flex items-center gap-3 whitespace-nowrap"
          >
            Yes! <Heart className="fill-white" size={24} />
          </button>
          
          <button
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            style={{ 
              transform: `translate(${noPos.x}px, ${noPos.y}px) scale(${noScale})`,
              transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            className="px-8 py-4 bg-white text-slate-400 font-bold text-lg rounded-full border-2 border-slate-100 shadow-lg hover:bg-slate-50 whitespace-nowrap absolute sm:relative"
          >
            {getNoButtonText()}
          </button>
        </div>
      </div>
      
      <footer className="fixed bottom-8 text-rose-300 text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2">
        <Sparkles size={14} /> Made for Tanmay <Sparkles size={14} />
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}