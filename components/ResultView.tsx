
import React, { useMemo } from 'react';

interface ResultViewProps {
  score: number;
  answers: boolean[];
  onRestart: () => void;
  onDownloadClick: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ score, answers, onRestart, onDownloadClick }) => {
  const recommendation = useMemo(() => {
    if (score === 6) {
      return "Hervorragende Arbeit! Ihre Prozesse setzen den Branchenstandard für rechtssichere Immobilienbewirtschaftung.";
    }

    const neinIndices = answers
      .map((ans, idx) => (ans === false ? idx : -1))
      .filter((idx) => idx !== -1);

    if (neinIndices.length === 0) {
      return "";
    }

    const recommendations = [
      "Erstellen Sie ein lückenloses Inspektionsprotokoll inklusive aktueller Fotodokumentation der letzten 12 Monate.",
      "Etablieren Sie einen festen Kontrollzyklus gemäss SIA-469-Logik für alle Liegenschaften.",
      "Optimieren Sie die Basis für Ihren Sorgfaltsnachweis durch eine lückenlose Vogelabwehr und verschliessen Sie alle Öffnungen über 4 cm.",
      "Führen Sie eine jährliche präventive Reinigung und Prüfung aller Dachrinnen ein.",
      "Fordern Sie von Ihren Dienstleistern konsequent Zertifizierungen nach EN 16636 oder Verbandsstandards ein.",
      "Definieren Sie klare Reaktions- und Eskalationswege für die Bearbeitung von Mieterreklamationen."
    ];

    // Pick one based on answers to be deterministic (pure)
    const hash = answers.reduce((acc, val, i) => acc + (val ? Math.pow(2, i) : 0), 0);
    const randomIndex = neinIndices[hash % neinIndices.length];
    return recommendations[randomIndex];
  }, [score, answers]);

  // 2. Visuelle & UI-Konfiguration
  let colorClass = "bg-[#d51030]"; // Rot
  let headline = "";
  let subline = "";
  let riskAssessment: React.ReactNode = null;

  if (score <= 2) {
    colorClass = "bg-[#d51030]"; // Rot
    headline = "HAFTUNGSSCHUTZ UNGENÜGEND";
    subline = "Die aktuelle Dokumentation weist Lücken im Bereich des notwendigen Sorgfaltsnachweises auf.";
    riskAssessment = (
      <>
        Ohne eine lückenlose Protokollierung und die regelmässige Kontrolle der Gebäudehülle ist die Erbringung des <span className="text-[#d51030] font-bold">Sorgfaltsnachweises</span> im Schadensfall erschwert. Bauliche Schwachstellen führen oft zeitverzögert zu einer Beeinträchtigung der Gebäudesubstanz.
      </>
    );
  } else if (score <= 4) {
    colorClass = "bg-[#f59e0b]"; // Orange
    headline = "OPTIMIERUNGSBEDARF IDENTIFIZIERT";
    subline = "Die bestehende Basis ist vorhanden, bedarf jedoch einer systematischeren Struktur gemäss SIA-Vorgaben.";
    riskAssessment = (
      <>
        Zwar sind Ansätze zur Prävention erkennbar, doch fehlen für eine vollständige Entlastung der Verwaltung standardisierte Kontrollzyklen. Punktuelle Versäumnisse bei der Wartung bleiben so ein vermeidbares Risiko für den <span className="text-[#d51030] font-bold">Sorgfaltsnachweis</span>.
      </>
    );
  } else {
    colorClass = "bg-[#10b981]"; // Grün
    headline = "VORBILDLICHER BAUTENSCHUTZ";
    subline = "Ihre Prozesse erfüllen die Anforderungen an den Sorgfaltsnachweis.";
    riskAssessment = (
      <>
        Sie haben die kritischen Punkte adressiert. Durch die Umsetzung der SIA-469-Vorgaben und eine lückenlose Dokumentation unterstützen Sie den <span className="text-[#d51030] font-bold">Sorgfaltsnachweis</span>. Ihre Liegenschaften sind präventiv gegen vogelbedingte Schäden und deren Folgen abgesichert.
      </>
    );
  }

  const connectionText = (
    <div className="mb-7">
      <p className="text-brand-dark text-[16px] leading-relaxed font-bold text-center">
        Weitere Praxistipps und Checklisten finden Sie im <span className="text-brand-red font-bold">Experten-Leitfaden.</span>
      </p>
    </div>
  );

  return (
    <div className="bg-white rounded-sm shadow-xl overflow-hidden border border-brand-lightBlue">
      {/* Status Header */}
      <div className={`${colorClass} py-5 px-8 text-white flex items-center justify-between transition-colors duration-500`}>
        <div className="max-w-[70%]">
          <p className="text-base font-bold uppercase tracking-[0.2em] opacity-80 mb-1 text-left">Ihr Ergebnis</p>
          <h2 className="font-h1 uppercase text-2xl md:text-3xl leading-none text-left">{headline}</h2>
          <p className="text-sm opacity-90 mt-2 text-left font-medium">{subline}</p>
        </div>
        <div className="font-h1 opacity-30 text-5xl md:text-6xl">{score}/6</div>
      </div>
      
      <div className="p-6 md:p-8 bg-brand-lightGray/20">
        {/* Risiko-Einschätzung Section - Left Aligned */}
        <div className="mb-7 text-left px-4 md:px-0">
          <h4 className="font-h3 text-brand-dark mb-4 uppercase text-base tracking-widest font-bold">Risiko-Einschätzung</h4>
          <p className="text-brand-dark/80 text-base leading-relaxed max-w-2xl">
            {riskAssessment}
          </p>
        </div>

        {/* Empfehlungs-Box - Left Aligned */}
        <div className="mb-10 p-8 bg-white border-l-4 border-[#d51030] shadow-sm max-w-2xl text-left">
          <h4 className="font-h3 text-brand-dark mb-4 uppercase text-base tracking-[0.2em] font-bold opacity-60">
            {score === 6 ? "Status" : "TIPPS ZUR SOFORTIGEN UMSETZUNG"}
          </h4>
          <p className="text-brand-dark text-base md:text-lg font-bold leading-relaxed">
            {recommendation}
          </p>
        </div>
        
        {/* Übergang & CTA - Enhanced Design */}
        <div className="max-w-3xl mx-auto">
          {score < 6 && connectionText}
          
          <div className="flex flex-col gap-6 items-center">
            <button 
              onClick={onDownloadClick}
              className="flex items-center justify-center w-full max-w-md py-3 bg-white text-[#003366] border-2 border-[#003366] font-bold rounded-sm hover:bg-[#003366] hover:text-white transition-all uppercase tracking-[0.1em] active:scale-95 text-base shadow-sm px-8"
            >
              LEITFADEN (SIA 469) JETZT HERUNTERLADEN
            </button>
            
            <a 
              href="https://meetings-eu1.hubspot.com/miriam-ganarin" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-dark font-bold hover:underline transition-all uppercase tracking-widest text-base decoration-brand-red underline-offset-4"
            >
              Gratis Objektinspektion durch tuttifix anfordern
            </a>
          </div>
        </div>

        {/* Restart Button */}
        <div className="mt-10 pt-6 border-t border-brand-lightBlue flex justify-center">
          <button 
            onClick={onRestart}
            className="text-[14px] font-bold text-brand-midBlue hover:text-brand-red transition-colors uppercase tracking-widest flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            Check neu starten
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
