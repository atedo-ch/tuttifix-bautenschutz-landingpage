
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { QUESTIONS } from '../constants';

interface BarometerProps {
  onFinish: (score: number, answers: boolean[]) => void;
  triggerShimmer?: boolean;
}

const Barometer: React.FC<BarometerProps> = ({ onFinish, triggerShimmer }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAnswer = (val: boolean) => {
    const newAnswers = [...answers, val];
    setAnswers(newAnswers);
    
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        const score = newAnswers.filter(a => a).length;
        onFinish(score, newAnswers);
        setLoading(false);
      }, 1200);
    }
  };

  if (loading) {
    return (
      <div className="bg-brand-lightGray p-8 rounded-sm shadow-xl border border-brand-lightBlue min-h-[420px] flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 border-4 border-brand-lightBlue border-t-brand-red rounded-full animate-spin mb-6"></div>
        <h3 className="font-h3 text-brand-dark mb-2 uppercase tracking-tight">Ergebnis wird eingeordnet...</h3>
        <p className="text-brand-dark/60 text-base">Prioritäten und nächster Schritt werden abgeleitet.</p>
      </div>
    );
  }

  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
      <div className="bg-brand-lightGray p-8 md:p-10 rounded-sm shadow-xl border border-brand-lightBlue min-h-[420px] flex flex-col relative overflow-hidden">
      {/* Step Indicator */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-h3 text-brand-dark uppercase tracking-widest text-base">Risiko-Barometer</h3>
        <span className="text-base font-bold text-brand-red uppercase tracking-widest">{step + 1} / {QUESTIONS.length}</span>
      </div>

      <div className="w-full bg-brand-lightBlue h-1 mb-10">
        <div 
          className="bg-brand-red h-full transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-grow flex flex-col justify-center">
        <p className="font-h2 text-brand-dark leading-snug mb-10 italic">
          {QUESTIONS[step].text}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-auto">
        <button 
          onClick={() => handleAnswer(true)}
          className="relative py-5 px-6 bg-brand-dark text-white font-bold rounded-sm hover:bg-brand-red transition-all uppercase tracking-widest shadow-md active:scale-95 overflow-hidden group"
        >
          {triggerShimmer && step === 0 && (
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            />
          )}
          Ja
        </button>
        <button 
          onClick={() => handleAnswer(false)}
          className="py-5 px-6 bg-white text-brand-dark border-2 border-brand-lightBlue font-bold rounded-sm hover:border-brand-dark transition-all uppercase tracking-widest shadow-md active:scale-95"
        >
          Nein
        </button>
      </div>

      <p className="mt-8 text-base text-brand-dark/50 leading-relaxed uppercase font-bold tracking-tight text-center">
        Der Check bewertet Nachweisbarkeit und Reifegrad. Er ersetzt keine Rechtsberatung.
      </p>
    </div>
  );
};

export default Barometer;
