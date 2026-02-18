import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Heart, 
  Sparkles, 
  PartyPopper,
  Gamepad2,
  Zap
} from 'lucide-react';

// --- Types ---
type AppStep = 'START' | 'QUIZ' | 'ASK' | 'SUCCESS';

// --- Constants ---
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

const QuizSection = ({ onComplete }: { onComplete: () => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = [
    {
      q: "What is Tanu's actual spirit animal?",
      options: [
        "A panda that only eats and naps 🐼",
        "A tiny kitten that bites when hungry 🐱",
        "A majestic, very sleepy potato 🥔"
      ]
    },
    {
      q: "What is Tanu's most dangerous state of being?",
      options: [
        "The 'I'm not hungry' (eats all your food) 🍟",
        "The '5 more minutes' morning nap 😴",
        "The 'I have nothing to wear' crisis 👗"
      ]
    },
    {
      q: "What happens if Tanu goes 2 hours without attention?",
      options: [
        "She starts speaking to the furniture 🪑",
        "She becomes a professional botherer 🎀",
        "She enters stealth mode to scare you 👻"
      ]
    }
  ];

  const handleOptionSelect = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete();
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="z-10 w-full max-w-lg p-8 bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-2xl border-4 border-white animate-in slide-in-from-right duration-500 mx-4">
      <div className="mb-6">
        <div className="h-2 w-full bg-rose-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-rose-500 transition-all duration-500" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-rose-400 text-xs font-bold mt-2 uppercase tracking-widest text-right">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <h2 className="text-2xl md:text-3xl font-cursive text-rose-600 mb-8 leading-snug">
        {questions[currentQuestion].q}
      </h2>

      <div className="grid gap-4">
        {questions[currentQuestion].options.map((opt, i) => (
          <button
            key={i}
            onClick={handleOptionSelect}
            className="p-4 text-left rounded-2xl bg-rose-50 border-2 border-transparent hover:border-rose-300 hover:bg-rose-100 transition-all group active:scale-[0.98]"
          >
            <span className="text-rose-700 font-medium">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const SuccessView = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center animate-in fade-in zoom-in duration-1000 bg-gradient-to-br from-rose-50 to-pink-100 w-full">
    <div className="space-y-6 relative z-10 max-w-2xl w-full">
      <div className="flex justify-center gap-4 text-rose-500">
        <PartyPopper className="w-10 h-10 md:w-16 md:h-16 animate-bounce" />
        <Heart className="w-16 h-16 md:w-24 md:h-24 fill-current animate-pulse" />
        <PartyPopper className="w-10 h-10 md:w-16 md:h-16 animate-bounce" style={{ animationDelay: '0.2s' }} />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-6xl md:text-9xl font-cursive text-rose-600 drop-shadow-sm">Hi Tanmay!</h1>
        <h2 className="text-3xl md:text-5xl font-cursive text-rose-500">Yay! I love you too!</h2>
        <p className="text-rose-400 text-lg md:text-xl font-medium italic mt-4">I knew you couldn't say no! ❤️</p>
      </div>

      <div className="relative group pt-4">
        <div className="absolute -inset-8 bg-white/40 rounded-full blur-3xl group-hover:bg-rose-200/50 transition duration-1000"></div>
        <img 
          src={SUCCESS_IMAGE} 
          className="relative w-64 h-64 md:w-96 md:h-96 object-cover rounded-3xl border-8 border-white shadow-2xl mx-auto transition-transform hover:scale-105 duration-500" 
          alt="Happy Valentine's Day"
          onError={(e) => {
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
  const [step, setStep] = useState<AppStep>('START');
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const [noTextIndex, setNoTextIndex] = useState(0);

  const noTexts = [
    "No",
    "Are you sure?",
    "Really sure??",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you rather say yes?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
  ];

  const handleNoClick = () => {
    setNoTextIndex((prev) => (prev + 1) % noTexts.length);
    setYesScale((prev) => prev + 0.3);
    setNoScale((prev) => Math.max(0.3, prev - 0.1));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rose-50 p-4 md:p-6 text-center relative overflow-hidden select-none">
      <FloatingHearts />
      
      {step === 'START' && (
        <div className="z-10 p-12 bg-white/95 backdrop-blur-sm rounded-[3rem] shadow-[0_20px_50px_rgba(255,182,193,0.3)] border-4 border-white max-w-sm w-full space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
          <div className="relative">
            <Heart className="w-24 h-24 text-rose-500 fill-current mx-auto animate-pulse" />
            <Sparkles className="absolute top-0 right-4 w-6 h-6 text-amber-400 animate-spin" />
          </div>
          <div className="space-y-3">
            <h1 className="text-5xl font-cursive text-rose-600">Hi Tanmay!</h1>
            <p className="text-slate-500 font-medium leading-relaxed">I have a special question for you... but first, prove you're real!</p>
          </div>
          <button 
            onClick={() => setStep('QUIZ')} 
            className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-rose-500 text-white font-bold text-lg rounded-full hover:bg-rose-600 shadow-xl transition-all active:scale-95 group"
          >
            <Gamepad2 className="w-6 h-6 group-hover:rotate-12 transition-transform" /> PROVE IT
          </button>
        </div>
      )}

      {step === 'QUIZ' && <QuizSection onComplete={() => setStep('ASK')} />}

      {step === 'ASK' && (
        <div className="z-10 w-full h-full flex flex-col items-center justify-center min-h-[600px]">
          <div className="space-y-6 mb-16 animate-in fade-in slide-in-from-top-10 duration-1000">
            <div className="relative inline-block">
              <Heart className="w-16 h-16 text-rose-500 fill-current mx-auto animate-bounce" />
            </div>
            <h1 className="text-5xl md:text-8xl font-cursive text-rose-600 leading-tight">So... do you love me?</h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 min-h-[200px] w-full">
            {/* YES BUTTON - Grows bigger */}
            <button
              onClick={() => setStep('SUCCESS')}
              style={{ transform: `scale(${yesScale})` }}
              className="px-12 py-5 bg-rose-500 text-white font-bold text-3xl rounded-full shadow-2xl hover:bg-rose-600 transition-all z-20 flex items-center gap-3 whitespace-nowrap"
            >
              Yes! <Heart className="fill-white" size={24} />
            </button>
            
            {/* NO BUTTON - Shrinks smaller */}
            <button
              onClick={handleNoClick}
              style={{ transform: `scale(${noScale})` }}
              className="px-10 py-4 bg-white text-slate-400 font-bold text-xl rounded-full border-2 border-slate-200 shadow-lg whitespace-nowrap hover:border-rose-300 hover:text-rose-400 transition-all z-10"
            >
              {noTexts[noTextIndex]}
            </button>
          </div>
        </div>
      )}

      {step === 'SUCCESS' && <SuccessView />}
      
      <footer className="fixed bottom-8 text-rose-300 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2 z-10">
        <Sparkles size={14} /> Hi Tanmay! Happy Valentine's Day <Sparkles size={14} />
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}