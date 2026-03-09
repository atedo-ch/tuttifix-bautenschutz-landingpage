
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { AlertCircle, Layers, FileText } from 'lucide-react';
import Barometer from './components/Barometer';
import ResultView from './components/ResultView';
import HubSpotModal from './components/HubSpotModal';
import { TESTIMONIALS, PARTNER_LOGOS } from './constants';

const TEAM_QUOTES = [
  {
    quote: '«Wir bieten fachlich perfekte Arbeit dank erfahrener Fachleute.»',
    author: 'Nathalie Aufranc',
    role: 'Geschäftsleitung tuttifix',
    image: 'https://www.tuttifix.ch/wp-content/storage5k/picture/2018/10/aufranc-wimmer_dsc3737-851x569.webp?oext=jpg&media_id=1715&source_id=59'
  },
  {
    quote: '«Wir sorgen dafür, dass Sie sich wieder wohlfühlen und der Mief und die Wanzen sich verziehen.»',
    author: 'Thomas Wimmer',
    role: '',
    image: 'https://www.tuttifix.ch/wp-content/storage5k/picture/2018/10/wimmer_dsc3918-zuschnitt-851x568.webp?oext=jpg&media_id=1718&source_id=83'
  },
  {
    quote: '«Unsere Kunden erhalten kompetenten Service und einwandfreie Arbeit.»',
    author: 'Alain Aufranc',
    role: 'Geschäftsführer tuttifix',
    image: 'https://www.tuttifix.ch/wp-content/storage5k/picture/2018/10/alain_aufranc_dsc8256-2-1-851x568.webp?oext=jpg&media_id=1716&source_id=133'
  },
  {
    quote: '«Wir vertreiben unliebsame Gäste, und zwar gekonnt und möglichst schonend.»',
    author: 'Raphael Müller',
    role: '',
    image: 'https://www.tuttifix.ch/wp-content/storage5k/picture/2018/10/mueller_dsc3889-zuschnitt-851x569.webp?oext=jpg&media_id=1717&source_id=79'
  }
];

const SYSTEM_CARDS = [
  {
    title: 'Spanndraht Systeme',
    subtitle: 'Diskrete Abwehr für Fassaden.',
    image: 'https://www.tuttifix.ch/wp-content/storage5k/picture/2025/12/kabel_draht-11-851x638.webp?oext=jpg&media_id=2184&source_id=167',
    benefit: 'Unterstützt die Rechtssicherheit: Feine Edelstahldrähte verhindern das Landen durch Instabilität oder Impulse. Ideal für denkmalgeschützte Objekte und moderne Glasfassaden.'
  },
  {
    title: 'Vogelabwehrnetze',
    subtitle: 'Grossflächige Barrieren.',
    image: 'https://www.tuttifix.ch/wp-content/storage5k/picture/2025/12/netz_img_5656-851x639.webp?oext=jpg&media_id=2209&source_id=175',
    benefit: 'Fördert eine lückenlose Dokumentation: Schützt Balkone, Innenhöfe und industrielle Anlagen. Robuste, UV-beständige Materialien schaffen eine physische Sperre gegen Einflug und Nisten.'
  },
  {
    title: 'Vogelabwehrgitter',
    subtitle: 'Sicherung von Öffnungen.',
    image: 'https://www.tuttifix.ch/wp-content/storage5k/picture/2025/12/netz_sonnenstorengitter_004-851x639.webp?oext=jpg&media_id=2201&source_id=171',
    benefit: 'Optimiert die Basis für Ihren Sorgfaltsnachweis: Verschliesst Storenkästen, Nischen und PV-Anlagen massgefertigt. Schützt zusätzlich vor Nagern und verhindert Schäden an Dämmung und Technik.'
  },
  {
    title: 'Vogelschutzspitzen',
    subtitle: 'Klassische Punkt-Abwehr.',
    image: 'https://www.tuttifix.ch/wp-content/storage5k/picture/2016/03/teaser-taubenabwehr-851x576.webp?oext=jpg&media_id=1296&source_id=137',
    benefit: 'Konform zu aktuellen Verbandsstandards: Edelstahlspitzen auf UV-stabilen Trägern verhindern das Aufsitzen auf Simsen und Dachrinnen. Wartungsfrei und langlebig.'
  }
];

const SystemCard = ({ card }: { card: typeof SYSTEM_CARDS[0] }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-[480px] w-full perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative h-full w-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-brand-dark border border-white/10 rounded-sm overflow-hidden flex flex-col group shadow-xl">
          <div className="relative h-3/5 overflow-hidden">
             <img 
               src={card.image} 
               alt={card.title} 
               className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
               referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-60"></div>
          </div>
          <div className="p-8 flex flex-col justify-start flex-grow">
            <h3 className="text-white font-h3 text-2xl mb-3 uppercase tracking-wider min-h-[4rem] flex items-start">{card.title}</h3>
            <p className="text-white font-bold text-base uppercase tracking-[0.2em]">{card.subtitle}</p>
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden bg-brand-red p-8 rounded-sm flex flex-col shadow-xl"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <h3 className="text-white font-h3 text-2xl mb-8 uppercase tracking-wider border-b border-white/20 pb-4">{card.title}</h3>
          <p className="text-white text-lg leading-relaxed font-medium">
            {card.benefit}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const ROTATING_TITLES = [
  'zufriedene Eigentümerschaft',
  'Haftungsrisiken eliminieren',
  'Immobilienwert erhalten'
];

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [activeTeamQuote, setActiveTeamQuote] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);
  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.8 });

  // Auto-rotate title phrases
  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % ROTATING_TITLES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleFinish = (s: number, a: boolean[]) => {
    setScore(s);
    setAnswers(a);
  };

  // Scroll to result screen when evaluation is finished
  useEffect(() => {
    if (score !== null) {
      // Small delay to ensure the ResultView is rendered and the sticky offset is calculated correctly
      const timer = setTimeout(() => {
        const el = document.getElementById('barometer-anchor');
        if (el) {
          const offset = 100; // Offset for sticky header + some breathing room
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [score]);

  const nextTeamQuote = () => {
    setActiveTeamQuote((prev) => (prev + 1) % TEAM_QUOTES.length);
  };

  const prevTeamQuote = () => {
    setActiveTeamQuote((prev) => (prev - 1 + TEAM_QUOTES.length) % TEAM_QUOTES.length);
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Auto-slide effect for Team
  useEffect(() => {
    const timer = setInterval(() => {
      nextTeamQuote();
    }, 7000);
    return () => clearInterval(timer);
  }, [activeTeamQuote]);

  // Auto-slide effect for Testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 9500);
    return () => clearInterval(timer);
  }, [activeTestimonial]);

  return (
    <div className="min-h-screen selection:bg-brand-red selection:text-white flex flex-col overflow-x-hidden">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-brand-red shadow-md h-16 md:h-20">
        <div className="container mx-auto px-4 h-full relative flex justify-between items-center">
          <div className="absolute top-1 md:top-2 left-4 z-[60]">
            <div className="transform -rotate-1 transition-transform hover:rotate-0">
              <img 
                src="https://www.tuttifix.ch/wp-content/themes/tuttifix/images/logo.png" 
                alt="tuttifix logo" 
                className="h-14 md:h-28 w-auto block filter drop-shadow-md" 
              />
            </div>
          </div>
          <div className="flex-grow"></div>
          <div className="flex items-center gap-2 md:gap-3">
            <a 
              href="https://meetings-eu1.hubspot.com/miriam-ganarin"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 md:px-6 md:py-2.5 bg-brand-red text-white text-base font-bold rounded-sm border border-white hover:bg-white hover:text-brand-red transition-all shadow-md uppercase tracking-wider whitespace-nowrap"
            >
              Termin: Gratis Objektinspektion
            </a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 md:px-6 md:py-2.5 bg-white text-brand-dark border border-brand-dark text-base font-bold rounded-sm hover:bg-brand-dark hover:text-white transition-all shadow-md uppercase tracking-wider whitespace-nowrap"
            >
              Leitfaden (SIA 469) herunterladen
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-32 md:pb-28 bg-brand-lightGray/30">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-lightBlue opacity-10 -skew-x-12 transform translate-x-1/2 -z-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-[55%_1fr] gap-10 lg:gap-12 items-start">
            <div className="w-full">
              <h1 className="font-h1 text-brand-dark mb-10 md:mb-16 leading-tight flex flex-col">
                <span className="block">Fassaden-Management nach SIA 469:</span>
                <span className="block text-brand-red h-[1.2em] relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={titleIndex}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute left-0 w-full whitespace-nowrap"
                    >
                      {ROTATING_TITLES[titleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="block">durch systematischen Bautenschutz</span>
              </h1>

              <div className="mb-8 md:mb-10 max-w-2xl">
                <p className="text-lg md:text-2xl text-brand-dark leading-relaxed mb-6">
                  Viele <span className="text-brand-red font-bold">Immobilienverwaltungen</span> kennen diese Herausforderungen im Bautenschutz und der Vogelabwehr:
                </p>
                <ul className="space-y-6 text-brand-dark leading-relaxed text-base md:text-xl">
                  <li className="flex items-start gap-5">
                    <div className="mt-1.5">
                      <AlertCircle className="text-brand-red w-6 h-6" />
                    </div>
                    <span><span className="font-condensed font-bold uppercase tracking-wider">Unvorhersehbare Kosten:</span> Kleine Versäumnisse bei Dachrinnen oder der Vogelabwehr führen zu teuren Folgeschäden an der Bausubstanz.</span>
                  </li>
                  <li className="flex items-start gap-5">
                    <div className="mt-1.5">
                      <Layers className="text-brand-red w-6 h-6" />
                    </div>
                    <span><span className="font-condensed font-bold uppercase tracking-wider">Fehlende Systematik:</span> Der Bewirtschaftungsalltag findet oft im reaktiven Modus statt, statt einer geplanten Unterhaltslogik zu folgen.</span>
                  </li>
                  <li className="flex items-start gap-5">
                    <div className="mt-1.5">
                      <FileText className="text-brand-red w-6 h-6" />
                    </div>
                    <span><span className="font-condensed font-bold uppercase tracking-wider">Dokumentationslücken:</span> Fehlende Protokolle oder Foto-Nachweise führen bei Eigentümerfragen oder Revisionen zu Schwierigkeiten.</span>
                  </li>
                </ul>
              </div>

              <div ref={ctaRef} className="mb-10 max-w-2xl">
                <p className="text-lg md:text-2xl text-brand-dark leading-relaxed mb-6">
                  Wie lückenlos ist Ihre Dokumentation? Nutzen Sie unser Risikobarometer und finden Sie in <span className="text-brand-red font-bold">60 Sekunden</span> heraus, wo Ihre Risiken liegen.
                </p>
              </div>

            </div>
            <div className="w-full relative">
              <div 
                id="barometer-anchor" 
                className={`lg:sticky transition-all duration-700 ease-in-out ${
                  score !== null ? 'lg:top-20 lg:mt-0' : 'lg:top-32 lg:mt-64'
                }`}
              >
                {score === null ? (
                  <Barometer 
                    onFinish={handleFinish} 
                    triggerShimmer={isCtaInView}
                  />
                ) : (
                  <ResultView 
                    score={score} 
                    answers={answers} 
                    onRestart={() => setScore(null)} 
                    onDownloadClick={() => setIsModalOpen(true)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Full-Width Contact Card with Quote & Buttons */}
          <div className="mt-16 p-8 md:p-12 bg-white/60 border-l-8 border-brand-red rounded-r-sm backdrop-blur-md shadow-xl relative overflow-hidden">
            {/* Subtle Quote Mark Background */}
            <div className="absolute top-4 right-12 text-brand-red/5 font-serif text-[12rem] pointer-events-none select-none">“</div>
            
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start relative z-10">
              {/* Left: Profile Image & Info */}
              <div className="flex flex-col items-center lg:items-start flex-shrink-0">
                <div className="w-40 h-40 lg:w-56 lg:h-56 rounded-sm overflow-hidden shadow-xl border-4 border-white mb-8 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://www.tuttifix.ch/wp-content/storage5k/picture/2025/08/miriam-ganarin-851x568.webp?oext=jpg&media_id=2142&source_id=111" 
                    alt="Miriam Ganarin" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="text-center lg:text-left">
                  <h4 className="font-h3 text-brand-dark text-2xl lg:text-3xl mb-1">Miriam Ganarin</h4>
                  <p className="text-base font-bold text-brand-red uppercase tracking-[0.2em] mb-6">Bautenschutz-Koordinatorin</p>
                  <div className="flex flex-col gap-3">
                    <a href="tel:0439317850" className="text-base lg:text-lg font-bold text-brand-dark hover:text-brand-red transition-colors flex items-center justify-center lg:justify-start gap-2">
                      <span className="text-brand-red">T</span> 043 931 78 50
                    </a>
                    <a 
                      href="https://meetings-eu1.hubspot.com/miriam-ganarin" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base lg:text-lg font-bold text-brand-dark hover:text-brand-red transition-colors border-b border-brand-red/20 hover:border-brand-red pb-1 inline-block"
                    >
                      Termin vereinbaren
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: The Quote & Buttons */}
              <div className="flex-grow flex flex-col self-stretch lg:pt-4">
                <div className="relative mb-12 lg:mb-20">
                  <p className="text-brand-dark text-xl lg:text-4xl leading-tight italic font-medium relative z-10">
                    <span className="text-brand-red text-6xl font-serif absolute -left-10 -top-4 opacity-40">“</span>
                    Machen wir Ihre Risiken sichtbar: Wir decken für Sie bestehende Lücken im Bautenschutz auf. Buchen Sie jetzt Ihre <span className="text-brand-red font-bold">kostenlose Inspektion</span> und bringen Sie mehr Sicherheit und Planbarkeit in Ihren Bewirtschaftungsalltag.
                    <span className="text-brand-red text-6xl font-serif absolute -bottom-8 ml-2 opacity-40">”</span>
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center lg:justify-start gap-6 mt-auto">
                  <a 
                    href="https://meetings-eu1.hubspot.com/miriam-ganarin" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-[360px] py-5 bg-brand-red text-white text-center text-base font-bold rounded-sm hover:bg-opacity-90 transition-all uppercase tracking-widest shadow-md active:scale-95 whitespace-nowrap"
                  >
                    Termin: Gratis Objektinspektion
                  </a>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-[360px] py-5 border-2 border-brand-dark text-brand-dark text-base font-bold rounded-sm hover:bg-brand-dark hover:text-white transition-all uppercase tracking-widest active:scale-95 whitespace-nowrap"
                  >
                    Leitfaden (SIA 469) herunterladen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Combined References & Testimonials Section */}
      <section className="py-24 md:py-32 bg-brand-lightGray/10 border-b border-brand-lightBlue/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="font-h2 text-brand-dark mb-8">Vertrauen in tuttifix: Diese Kunden setzen auf unsere Services</h2>
            <p className="text-brand-dark/70 text-lg md:text-xl leading-relaxed">
              Immobilien-Verantwortliche aus verschiedenen Branchen verlassen sich bei Projekten im Bautenschutz, der Vogelabwehr und der Schädlingsbekämpfung auf unsere Expertise.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 items-center justify-items-center gap-8 md:gap-12 lg:gap-16 mb-24">
            {PARTNER_LOGOS.map((logo, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center transition-transform hover:scale-105 duration-300"
              >
                <img 
                  src={logo.url} 
                  alt={logo.name} 
                  className={`${
                    logo.name.includes('Kanton') ? 'h-10 md:h-16' : 
                    logo.name.includes('SBB') ? 'h-[26px] md:h-[52px]' : 
                    logo.name.includes('Sparhafen') ? 'h-[21px] md:h-[42px]' : 'h-6 md:h-12'
                  } w-auto object-contain`}
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>

          {/* Kundenreferenzen Slider (Width matches contact card) */}
          <div className="relative">
            {/* Main Carousel Area */}
            <div className="relative min-h-[520px] sm:min-h-[420px] md:min-h-[380px]">
              {TESTIMONIALS.map((t, idx) => (
                <div 
                  key={idx} 
                  className={`absolute inset-0 transition-all duration-[800ms] cubic-bezier(0.4, 0, 0.2, 1) transform ${
                    idx === activeTestimonial 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-12 scale-95 pointer-events-none'
                  }`}
                >
                  <div className="bg-white/60 p-8 md:p-12 lg:p-16 rounded-sm border-l-[8px] border-brand-red shadow-xl backdrop-blur-md flex flex-col h-full justify-center group">
                    <div className="mb-6 text-brand-red/10 group-hover:text-brand-red/20 transition-colors">
                      <svg width="50" height="38" viewBox="0 0 32 24" fill="currentColor">
                        <path d="M0 24V11.2C0 7.46667 0.933333 4.4 2.8 2C4.66667 -0.4 7.6 0 7.6 0L8.8 3.2C8.8 3.2 6.4 3.2 5.2 4.8C4 6.4 3.6 8.4 3.6 10.4H8.4V24H0ZM17.2 24V11.2C17.2 7.46667 18.1333 4.4 20 2C21.8667 -0.4 24.8 0 24.8 0L26 3.2C26 3.2 23.6 3.2 22.4 4.8C21.2 6.4 20.8 8.4 20.8 10.4H25.6V24H17.2Z"/>
                      </svg>
                    </div>
                    <blockquote className="text-brand-dark text-xl md:text-2xl lg:text-3xl leading-snug font-medium mb-10 italic tracking-tight">
                      "{t.quote}"
                    </blockquote>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-brand-lightBlue/50 pt-8">
                      <div>
                        <h5 className="font-h3 text-brand-dark text-lg md:text-xl mb-1">{t.author}</h5>
                        <p className="text-base text-brand-midBlue font-bold uppercase tracking-[0.2em] leading-relaxed">
                          {t.role} <span className="mx-2 text-brand-red/40">|</span> <span className="text-brand-red">{t.company}</span>
                        </p>
                      </div>
                      {/* Client Logo */}
                      <div className="flex items-center gap-3 opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500">
                        <img 
                          src={t.logoUrl} 
                          alt={t.company} 
                          className={`${
                            t.company.includes('SBB') ? 'h-[42px] md:h-[52px]' : 
                            t.company.includes('Sparhafen') ? 'h-[42px] md:h-[52px]' : 'h-8 md:h-10'
                          } w-auto object-contain`}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots & Controls */}
            <div className="flex items-center justify-between mt-12 px-2">
              <button 
                onClick={prevTestimonial}
                className="w-14 h-14 flex items-center justify-center rounded-sm border border-brand-lightBlue/60 text-brand-dark hover:bg-brand-red hover:border-brand-red hover:text-white transition-all shadow-md active:scale-90 group"
                aria-label="Vorherige Referenz"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M15 18L9 12L15 6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <div className="flex gap-2.5">
                {TESTIMONIALS.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-1.5 transition-all duration-500 rounded-full ${idx === activeTestimonial ? 'bg-brand-red w-10' : 'bg-brand-lightBlue w-3 hover:bg-brand-midBlue'}`}
                    aria-label={`Gehe zu Referenz ${idx + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={nextTestimonial}
                className="w-14 h-14 flex items-center justify-center rounded-sm border border-brand-lightBlue/60 text-brand-dark hover:bg-brand-red hover:border-brand-red hover:text-white transition-all shadow-md active:scale-90 group"
                aria-label="Nächste Referenz"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M9 18L15 12L9 6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-h2 text-center mb-12 md:mb-24 text-brand-dark">Der tuttifix-Plan: In 3 Schritten zum sicheren Bautenschutz</h2>
            <div className="grid md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
              {[
                { 
                  step: '1', 
                  title: 'INSPEKTION & ANALYSE', 
                  text: <>Wir prüfen die Situation vor Ort (Fläche, Nutzung, Zustand) und geben eine fundierte <strong>Empfehlung</strong> für Ihren Bautenschutz ab.</>,
                  icon: (
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-red mb-10">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  )
                },
                { 
                  step: '2', 
                  title: 'FACHGERECHTE UMSETZUNG', 
                  text: <>Installation massgeschneiderter Bautenschutz-Systeme inklusive lückenloser <strong>Foto-Dokumentation</strong> zur Absicherung Ihrer Arbeit.</>,
                  icon: (
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-red mb-10">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                    </svg>
                  )
                },
                { 
                  step: '3', 
                  title: 'SERVICE & PROTOKOLL', 
                  text: <>Regelmässige Kontrolle für dauerhaften Schutz und Werterhalt. Sie erhalten digitale <strong>Wartungsprotokolle</strong> als rechtssicheren Sorgfaltsnachweis.</>,
                  icon: (
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-red mb-10">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  )
                }
              ].map((item, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center md:items-start md:text-left group bg-brand-lightGray/30 p-10 md:p-12 lg:p-14 rounded-sm transition-all duration-500 hover:bg-brand-lightGray/50 hover:shadow-xl hover:-translate-y-3 border border-transparent hover:border-brand-lightBlue/20">
                  <div className="font-h1 text-brand-red opacity-10 text-8xl md:text-[10rem] absolute -top-12 md:-top-20 md:-left-8 group-hover:opacity-20 transition-opacity pointer-events-none leading-none">{item.step}</div>
                  <div className="relative z-10">
                    {item.icon}
                    <h4 className="font-h3 mb-6 text-brand-dark uppercase tracking-wider text-xl md:text-2xl lg:text-3xl">{item.title}</h4>
                    <p className="text-brand-dark/80 text-lg md:text-xl leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-16 md:mt-24 flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="https://meetings-eu1.hubspot.com/miriam-ganarin" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-[360px] py-5 bg-brand-red text-white text-center text-base font-bold rounded-sm hover:bg-opacity-90 transition-all uppercase tracking-widest shadow-md active:scale-95 whitespace-nowrap"
              >
                Termin: Gratis Objektinspektion
              </a>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-[360px] py-5 border-2 border-brand-dark text-brand-dark text-base font-bold rounded-sm hover:bg-brand-dark hover:text-white transition-all uppercase tracking-widest active:scale-95 whitespace-nowrap"
              >
                Leitfaden (SIA 469) herunterladen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Context / Technical Visual Section */}
      <section className="py-20 md:py-32 bg-brand-dark overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Left Column: 45% */}
            <div className="w-full lg:w-[45%]">
              <div className="inline-block px-4 py-2 bg-brand-red/10 border border-brand-red/20 rounded-sm mb-8">
                <span className="text-brand-red font-bold uppercase tracking-widest text-base">Ganzheitlicher Bautenschutz</span>
              </div>
              <h2 className="font-h1 text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
                Der richtige Schutz <br />
                <span className="text-brand-red">am richtigen Ort.</span>
              </h2>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10">
                Wir analysieren die Gebäudehülle ganzheitlich und wählen je nach Stelle die passende Massnahme, bevor wir Schutzsysteme installieren. tuttifix identifiziert die tatsächlichen Schwachstellen Ihrer Liegenschaft und schützt die Bausubstanz gezielt dort, wo Schäden entstehen.
              </p>
              <div className="flex flex-col gap-10">
                {[
                  { 
                    title: "Gezielte Systemwahl", 
                    desc: "Einsatz von Spanndrähten, Gittern oder Netzen – exakt abgestimmt auf Bauteile wie Simse, PV-Anlagen oder Storenkästen." 
                  },
                  { 
                    title: "Dokumentierte Sicherheit", 
                    desc: "SIA-konforme Protokolle sichern Ihren proaktiven Sorgfaltsnachweis gegenüber Eigentümern und Revisionen." 
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-5">
                    <div className="mt-1.5 w-6 h-6 rounded-full border border-brand-red flex items-center justify-center flex-shrink-0">
                      <div className="w-2.5 h-2.5 bg-brand-red rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="text-white font-condensed font-bold uppercase tracking-wider text-xl mb-2">{item.title}</h4>
                      <p className="text-white/60 text-lg leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: 55% */}
            <div className="w-full lg:w-[55%] relative">
              <div className="relative group">
                {/* Technical Visual Container */}
                <div className="relative aspect-[4/3] bg-[#0a0f1a] rounded-sm overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  {/* Glowing Grid Background */}
                  <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id="techGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#4f46e5" strokeWidth="0.5" />
                        </pattern>
                        <pattern id="masonry" width="40" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 0 20 L 40 20 M 20 0 L 20 20" fill="none" stroke="#334155" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#techGrid)" />
                    </svg>
                  </div>

                  {/* Building Cross-Section SVG */}
                  <svg viewBox="0 0 800 600" className="absolute inset-0 w-full h-full p-8">
                    {/* Isometric Building Structure */}
                    {/* Side Wall (Depth) */}
                    <path d="M550 480 L650 430 L650 230 L550 280 Z" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                    
                    {/* Front Wall */}
                    <path d="M250 480 L550 480 L550 280 L250 280 Z" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                    
                    {/* Masonry Texture on Front Wall */}
                    <rect x="250" y="280" width="300" height="200" fill="url(#masonry)" className="opacity-20" />

                    {/* Windows & Doors */}
                    {/* Window Left */}
                    <rect x="290" y="320" width="60" height="80" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                    <rect x="290" y="310" width="60" height="10" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1" /> {/* Shutter Box */}
                    
                    {/* Window Right */}
                    <rect x="450" y="320" width="60" height="80" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                    <rect x="450" y="310" width="60" height="10" fill="#334155" stroke="#475569" strokeWidth="1" />
                    
                    {/* Door */}
                    <rect x="375" y="400" width="50" height="80" fill="#0f172a" stroke="#475569" strokeWidth="1" />

                    {/* Roof Structure */}
                    {/* Roof Front */}
                    <path d="M230 280 L400 160 L570 280 Z" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                    {/* Roof Side */}
                    <path d="M570 280 L400 160 L500 110 L670 230 Z" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                    
                    {/* Gutter (Regenrinne) */}
                    <path d="M230 285 L570 285" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                    <path d="M570 285 L670 235" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />

                    {/* PV Zone connection point remains, but area marking is removed per request */}

                    {/* Hotspot 1: PV-Anlage */}
                    <g className="cursor-pointer group/hotspot">
                      <circle cx="520" cy="180" r="6" fill="#ef4444" className="animate-ping" />
                      <circle cx="520" cy="180" r="4" fill="#ef4444" />
                      
                      {/* Label */}
                      <line x1="520" y1="180" x2="540" y2="100" stroke="#ef4444" strokeWidth="1" />
                      <rect x="490" y="20" width="300" height="100" fill="rgba(15,23,42,0.95)" stroke="#ef4444" strokeWidth="1" rx="2" ry="2" />
                      <text x="505" y="50" textAnchor="start" className="uppercase tracking-widest">
                        <tspan x="505" fill="#ffffff" fontSize="16" fontWeight="bold">PV-ANLAGE</tspan>
                        <tspan x="505" dy="28" fill="#ef4444" fontSize="16" fontWeight="700">Brandrisiko und Leistungsabfall</tspan>
                        <tspan x="505" dy="20" fill="#ef4444" fontSize="16" fontWeight="700">durch nistende Vögel.</tspan>
                      </text>
                    </g>

                    {/* Hotspot 2: Dachrinne */}
                    <g className="cursor-pointer group/hotspot">
                      <circle cx="570" cy="285" r="6" fill="#ef4444" className="animate-ping" />
                      <circle cx="570" cy="285" r="4" fill="#ef4444" />
                      
                      {/* Label */}
                      <line x1="570" y1="285" x2="640" y2="340" stroke="#ef4444" strokeWidth="1" />
                      <rect x="490" y="340" width="300" height="100" fill="rgba(15,23,42,0.95)" stroke="#ef4444" strokeWidth="1" rx="2" ry="2" />
                      <text x="505" y="370" textAnchor="start" className="uppercase tracking-widest">
                        <tspan x="505" fill="#ffffff" fontSize="16" fontWeight="bold">DACHRINNE</tspan>
                        <tspan x="505" dy="28" fill="#ef4444" fontSize="16" fontWeight="700">Überlauf-Risiko und</tspan>
                        <tspan x="505" dy="20" fill="#ef4444" fontSize="16" fontWeight="700">Fassadenschäden durch Vogelnester.</tspan>
                      </text>
                    </g>

                    {/* Hotspot 3: Storenkasten */}
                    <g className="cursor-pointer group/hotspot">
                      <circle cx="320" cy="315" r="6" fill="#ef4444" className="animate-ping" />
                      <circle cx="320" cy="315" r="4" fill="#ef4444" />
                      
                      {/* Label */}
                      <line x1="320" y1="315" x2="150" y2="440" stroke="#ef4444" strokeWidth="1" />
                      <rect x="10" y="440" width="300" height="100" fill="rgba(15,23,42,0.95)" stroke="#ef4444" strokeWidth="1" rx="2" ry="2" />
                      <text x="25" y="470" textAnchor="start" className="uppercase tracking-widest">
                        <tspan x="25" fill="#ffffff" fontSize="16" fontWeight="bold">STORENKASTEN</tspan>
                        <tspan x="25" dy="28" fill="#ef4444" fontSize="16" fontWeight="700">Mechanik-Risiko durch Nager</tspan>
                        <tspan x="25" dy="20" fill="#ef4444" fontSize="16" fontWeight="700">oder nistende Vögel.</tspan>
                      </text>
                    </g>

                    {/* Scan Line */}
                    <line x1="0" y1="0" x2="800" y2="0" stroke="#ef4444" strokeWidth="2" className="animate-scan-y opacity-30" />
                  </svg>

                  {/* Corner Accents */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-brand-red/50"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-brand-red/50"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-brand-red/50"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-brand-red/50"></div>
                </div>

                {/* Legend / Info Box */}
                <div className="absolute -bottom-6 -right-6 bg-brand-red p-6 rounded-sm shadow-xl hidden md:block max-w-[240px]">
                  <p className="text-white text-base font-bold uppercase tracking-widest mb-2">Status: Analyse aktiv</p>
                  <div className="h-1 w-full bg-white/20 mb-4">
                    <div className="h-full bg-white w-2/3 animate-pulse"></div>
                  </div>
                  <p className="text-white/90 text-base leading-tight uppercase tracking-tighter font-medium">
                    Ganzheitliche Erfassung der Gebäudehülle gemäss SIA-Normen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modul 2: Passender Schutz für jeden Bereich */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
            <h2 className="font-h2 text-brand-dark mb-6 text-3xl md:text-5xl">Passender Schutz für jeden Bereich</h2>
            <p className="text-brand-dark/70 text-lg md:text-xl leading-relaxed">
              Nicht jede Massnahme passt zu jeder Stelle. Wir stellen Ihnen die vier bewährten Systeme vor, mit denen tuttifix Ihre Liegenschaft gezielt und dauerhaft schützt.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {SYSTEM_CARDS.map((card, idx) => (
              <SystemCard key={idx} card={card} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <a 
              href="https://meetings-eu1.hubspot.com/miriam-ganarin"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-brand-red text-white text-base font-bold rounded-sm hover:bg-opacity-90 transition-all shadow-xl uppercase tracking-widest whitespace-nowrap active:scale-95"
            >
              Termin: Gratis Objektinspektion
            </a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-brand-dark text-white text-base font-bold rounded-sm hover:bg-opacity-90 transition-all shadow-xl uppercase tracking-widest whitespace-nowrap active:scale-95"
            >
              Leitfaden (SIA 469) herunterladen
            </button>
          </div>
        </div>
      </section>

      {/* Team Slider Section */}
      <section className="py-16 md:py-24 bg-brand-lightGray/10 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="font-h2 text-brand-dark mb-10 md:mb-16">Ein Team für alle Fälle</h2>
          <div className="grid lg:grid-cols-12 gap-10 md:gap-12 items-stretch">
            <div className="lg:col-span-5">
              <div className="bg-brand-lightGray/30 rounded-sm overflow-hidden shadow-md h-full flex flex-col">
                <img 
                  src="https://raw.githubusercontent.com/atedo-ch/tuttifix-brandassets/main/251017_montage_team2-1176x792.webp" 
                  alt="Das tuttifix Team" 
                  className="w-full h-64 md:h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
                />
                <div className="p-4 bg-white">
                  <p className="text-base text-brand-midBlue tracking-wider font-bold">Das tuttifix Einsatz-Team für Bautenschutz und Schädlingsbekämpfung</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="relative overflow-hidden flex-grow min-h-[360px] sm:min-h-[400px] lg:min-h-0">
                {TEAM_QUOTES.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-brand-lightGray p-6 sm:p-10 md:p-12 rounded-sm absolute inset-0 transition-all duration-700 ease-in-out flex flex-col justify-center ${idx === activeTeamQuote ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'}`}
                  >
                    <div className="absolute top-8 left-0 w-1.5 h-12 md:h-16 bg-brand-red rounded-sm"></div>
                    <div className="pl-4 md:pl-6 flex flex-col sm:flex-row gap-6 md:gap-8 items-center sm:items-center">
                      <div className="flex-grow text-center sm:text-left">
                        <p className="text-brand-dark text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight font-medium mb-6 md:mb-8 italic">
                          {item.quote}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          <div className="w-16 h-16 sm:hidden rounded-sm overflow-hidden border-2 border-white shadow-md">
                             <img src={item.image} alt={item.author} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-brand-dark font-condensed font-bold text-base md:text-lg uppercase tracking-widest">
                              – {item.author}
                            </p>
                            {item.role && <p className="text-brand-red font-condensed font-bold text-base uppercase tracking-[0.2em] mt-1">{item.role}</p>}
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:block w-36 md:w-44 lg:w-52 h-36 md:h-44 lg:h-52 flex-shrink-0 rounded-sm overflow-hidden shadow-xl border-4 border-white transition-transform hover:scale-105 duration-500">
                        <img src={item.image} alt={item.author} className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
                <button onClick={prevTeamQuote} className="w-12 h-12 flex items-center justify-center rounded-sm border border-brand-lightBlue text-brand-dark hover:bg-brand-red hover:border-brand-red hover:text-white transition-all shadow-md active:scale-90" aria-label="Vorheriges Zitat">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="flex gap-3">
                  {TEAM_QUOTES.map((_, idx) => (
                    <button key={idx} onClick={() => setActiveTeamQuote(idx)} className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === activeTeamQuote ? 'bg-brand-red w-8' : 'bg-brand-lightBlue hover:bg-brand-midBlue'}`} aria-label={`Gehe zu Zitat ${idx + 1}`} />
                  ))}
                </div>
                <button onClick={nextTeamQuote} className="w-12 h-12 flex items-center justify-center rounded-sm border border-brand-lightBlue text-brand-dark hover:bg-brand-red hover:border-brand-red hover:text-white transition-all shadow-md active:scale-90" aria-label="Nächstes Zitat">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://meetings-eu1.hubspot.com/miriam-ganarin" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-[360px] py-4 bg-brand-red text-white text-center text-base font-bold rounded-sm hover:bg-opacity-90 transition-all uppercase tracking-widest shadow-md active:scale-95 whitespace-nowrap"
            >
              Termin: Gratis Objektinspektion
            </a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-[360px] py-4 border-2 border-brand-dark text-brand-dark text-base font-bold rounded-sm hover:bg-brand-dark hover:text-white transition-all uppercase tracking-widest active:scale-95 whitespace-nowrap"
            >
              Leitfaden (SIA 469) herunterladen
            </button>
          </div>
        </div>
      </section>

      {/* Abschluss-Sektion */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mb-16 text-center mx-auto">
            <h2 className="font-h2 text-brand-dark mb-6">Vom Risiko zur Systematik: Ihr nächster Schritt.</h2>
            <p className="text-lg md:text-xl text-brand-dark/70 leading-relaxed">
              Wählen Sie den Weg, der Ihre Bewirtschaftung heute am besten unterstützt. Wir liefern die Basis für eine professionelle Dokumentation und Ihren Sorgfaltsnachweis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Box A (Primär – Termin) */}
            <div className="bg-brand-dark p-10 md:p-12 rounded-sm flex flex-col items-center text-center h-full">
              <p className="text-white text-lg md:text-xl leading-relaxed mb-10">
                Lassen Sie Ihre Fassaden und Dächer von Experten auf potenzielle Schwachstellen prüfen – fundiert und unkompliziert.
              </p>
              <div className="mt-auto">
                <a 
                  href="https://meetings-eu1.hubspot.com/miriam-ganarin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-5 bg-brand-red text-white text-base font-bold rounded-sm hover:bg-opacity-90 transition-all uppercase tracking-widest shadow-md active:scale-95 whitespace-nowrap"
                >
                  KOSTENLOSE OBJEKTINSPEKTION ANFORDERN
                </a>
              </div>
            </div>

            {/* Box B (Sekundär – Wissen) */}
            <div className="bg-white border-2 border-brand-dark p-10 md:p-12 rounded-sm flex flex-col items-center text-center h-full">
              <p className="text-brand-dark text-lg md:text-xl leading-relaxed mb-10">
                Sichern Sie sich den SIA-469-Leitfaden inklusive Checklisten für Ihre interne Beweisführung und Dokumentation.
              </p>
              <div className="mt-auto">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-5 border-2 border-brand-dark text-brand-dark text-base font-bold rounded-sm hover:bg-brand-dark hover:text-white transition-all uppercase tracking-widest active:scale-95 whitespace-nowrap"
                >
                  LEITFADEN (SIA 469) HERUNTERLADEN
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white pt-12 pb-8 px-4 sm:px-8 lg:px-12 border-t border-white/5">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-y-10 gap-x-12 pb-12">
            <div className="flex items-center gap-4 group cursor-default self-start">
               <div className="w-1.5 h-8 bg-brand-red rounded-sm transition-all group-hover:bg-white"></div>
               <span className="font-bold text-xl lg:text-2xl tracking-widest whitespace-nowrap">tuttifix gmbh</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-10 lg:gap-x-16 gap-y-4 justify-start sm:justify-center">
              {['Zürich', 'Baden', 'Rümlang', 'Basel'].map(loc => (
                <span key={loc} className="font-bold text-base uppercase tracking-[0.2em] opacity-60 hover:opacity-100 hover:text-brand-red transition-all cursor-default">{loc}</span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-10 lg:gap-x-12 gap-y-6">
              <a href="tel:0439317850" className="flex items-center gap-3 font-bold text-base lg:text-xl uppercase tracking-widest hover:text-brand-red transition-all group">
                <span className="text-brand-red font-h1 text-2xl opacity-80 group-hover:opacity-100">T</span>
                <span className="whitespace-nowrap">043 931 78 50</span>
              </a>
              <a href="mailto:info@tuttifix.ch" className="flex items-center gap-3 font-bold text-base lg:text-xl uppercase tracking-widest hover:text-brand-red transition-all group border-b-2 border-transparent hover:border-brand-red pb-0.5">
                <span className="whitespace-nowrap">info@tuttifix.ch</span>
              </a>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-base uppercase tracking-[0.3em] font-bold text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 opacity-40">
              <p>&copy; {new Date().getFullYear()} tuttifix Bautenschutz</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-12 opacity-50">
              <a href="https://www.tuttifix.ch/service/impressum/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red hover:opacity-100 transition-all border-b border-transparent hover:border-brand-red">Impressum</a>
              <a href="https://www.tuttifix.ch/service/datenschutz/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red hover:opacity-100 transition-all border-b border-transparent hover:border-brand-red">Datenschutz</a>
              <a href="https://www.tuttifix.ch/wiki/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red hover:opacity-100 transition-all border-b border-transparent hover:border-brand-red">Wiki</a>
            </div>
          </div>
        </div>
      </footer>

      <HubSpotModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
