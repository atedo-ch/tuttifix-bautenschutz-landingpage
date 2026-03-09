
import { Question } from './types';

export const QUESTIONS: Question[] = [
  { id: 1, text: 'Haben Sie ein Inspektionsprotokoll der letzten 12 Monate (inkl. Fotos)?' },
  { id: 2, text: 'Gibt es einen festen Kontrollzyklus (z.B. nach SIA-469-Logik)?' },
  { id: 3, text: 'Ist die Vogelabwehr nachweislich lückenfrei (keine Öffnungen über ca. 4 cm)?' },
  { id: 4, text: 'Werden Dachrinnen präventiv mindestens 1× jährlich geprüft und gereinigt?' },
  { id: 5, text: 'Fordern Sie Dienstleister-Nachweise ein (z.B. EN 16636 / Verbandsstandards)?' },
  { id: 6, text: 'Gibt es definierte Reaktions- und Eskalationswege für Mieterreklamationen?' },
];

export const TRUST_PARTNERS = [
  'SBB', 'ETH Zürich', 'Kanton Zürich', 'Livit', 'Hälg',
  'CEPA / EN 16636', 'Verband Schweizerischer Schädlingsbekämpfer'
];

export const PARTNER_LOGOS = [
  {
    name: 'CB Treuhand GmbH',
    url: 'https://raw.githubusercontent.com/atedo-ch/tuttifix-brandassets/main/CB%20Treuhand.svg'
  },
  {
    name: 'Kanton Zürich',
    url: 'https://raw.githubusercontent.com/atedo-ch/tuttifix-brandassets/main/Kanton%20Zu%CC%88rich.png'
  },
  {
    name: 'Lippuner Immobilien & Verwaltungen',
    url: 'https://raw.githubusercontent.com/atedo-ch/tuttifix-brandassets/main/Lippuner%20Immobilien.png'
  },
  {
    name: 'SBB CFF FFS',
    url: 'https://raw.githubusercontent.com/atedo-ch/tuttifix-brandassets/main/sbb.png'
  },
  {
    name: 'Sparhafen Immobilien AG',
    url: 'https://raw.githubusercontent.com/atedo-ch/tuttifix-brandassets/main/Sparhafen%20Immobilien%20AG.png'
  }
];

export const TESTIMONIALS = [
  {
    quote: "Was mir an tuttifix gefällt ist, dass sie genau hinschauen und auch bei komplizierten Fällen pragmatische Lösungen finden.",
    author: "Adrian Hurschler",
    role: "Senior Facility Manager",
    company: "SBB AG",
    logoUrl: "https://raw.githubusercontent.com/atedo-ch/tuttifix-brandassets/main/sbb.png"
  },
  {
    quote: "Die Zusammenarbeit mit tuttifix ist sehr persönlich. Man kennt die Personen dahinter und weiss, dass man sich auf sie verlassen kann.",
    author: "Nadine Pletscher",
    role: "Immobilienbewirtschafterin mit eidg. FA",
    company: "Sparhafen Immobilien AG",
    logoUrl: "https://raw.githubusercontent.com/atedo-ch/tuttifix-brandassets/main/Sparhafen%20Immobilien%20AG.png"
  },
  {
    quote: "Was mir bei tuttifix ein gutes Gefühl gibt, ist die familiäre Art. Man kennt die Leute und kann sich auf schnelle, kompetente Unterstützung verlassen.",
    author: "Marco Oehy",
    role: "Adjunkt Immobilien",
    company: "Kanton Zürich",
    logoUrl: "https://raw.githubusercontent.com/atedo-ch/tuttifix-brandassets/main/Kanton%20Zu%CC%88rich.png"
  },
  {
    quote: "tuttifix reagiert zuverlässig und behebt Probleme rasch. Diese Verbindlichkeit schätzen wir sehr.",
    author: "Patrik Marty",
    role: "Geschäftsführer",
    company: "CB Treuhand GmbH",
    logoUrl: "https://raw.githubusercontent.com/atedo-ch/tuttifix-brandassets/main/CB%20Treuhand.svg"
  },
  {
    quote: "Was wir an tuttifix besonders schätzen, ist die einfache Zusammenarbeit. Das heisst schnelle Rückmeldungen, kompetente Ansprechpartner und zuverlässiger Service.",
    author: "Simon Lippuner",
    role: "Geschäftsführer und Inhaber",
    company: "Lippuner Immobilien & Verwaltungen AG",
    logoUrl: "https://raw.githubusercontent.com/atedo-ch/tuttifix-brandassets/main/Lippuner%20Immobilien.png"
  }
];

export const REGIONS = ['Zürich', 'Aargau', 'Zentralschweiz', 'Ostschweiz'];

export const FAQS = [
  {
    q: 'Was genau sagt das Ampel-Resultat aus?',
    a: 'Es zeigt, wie belastbar Ihr Sorgfaltsnachweis ist: Protokolle, Zyklen, Standards und Reaktionswege.'
  },
  {
    q: 'Ist der Risiko-Check anonym?',
    a: 'Ja. Erst wenn Sie den Leitfaden (SIA 469) wollen oder ein Debrief sinnvoll ist, geben Sie optional Kontaktdaten an.'
  },
  {
    q: 'Für welche Objekte ist das geeignet?',
    a: 'Für Wohn- und Gewerbeobjekte, insbesondere bei wiederkehrenden Hotspots und erhöhtem Stakeholder-Druck.'
  },
  {
    q: 'Arbeiten Sie mit Standards?',
    a: 'Ja. Wir orientieren uns an praxistauglichen Standards (z.B. SIA-Logik, EN 16636) und setzen CH-konforme Verfahren um.'
  }
];
