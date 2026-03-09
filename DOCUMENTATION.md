
# tuttifix: Informationsarchitektur & Wireframe

## 1. Informationsarchitektur (IA)

| Nr. | Sektion | Ziel | Kerninhalt | Primär-CTA | Sekundär-CTA |
|:---:|:---|:---|:---|:---|:---|
| 1 | **Hero + Trust** | Relevanz & Vertrauen | "Wie sicher ist Ihre Décharge?" + Art. 58 OR Context + Trust Strip (SBB, ETH, etc.) | Mit Miriam sprechen | - |
| 2 | **Problem / Pain** | Problem-Bewusstsein | Dokumentationslücken vs. Verwaltungsalltag (Haftungsrisiken) | Mit Miriam sprechen | - |
| 3 | **Haftungs-Barometer** | Interaktion / Segmentierung | 6 Ja/Nein Fragen zur Nachweisbarkeit | Resultat anzeigen | - |
| 4 | **Ergebnis-Logik** | Conversion nach Score | Ampel-Auswertung + Spezifische Empfehlung | *Variabel (S, K oder A)* | Alternativ-Link |
| 5 | **3-Säulen-Lösung** | Kompetenzdarstellung | Bautenschutz, Optik, Nachweisbarkeit | Mit Miriam sprechen | - |
| 6 | **Prozess** | Klarheit / Einwandbehandlung | Assessment -> Umsetzung -> Monitoring (3 Schritte) | Mit Miriam sprechen | - |
| 7 | **Kostenstabilität** | Budget-Sicherheit | Planbarkeit ohne Vorher/Nachher-Effekthascherei | Ergebnis besprechen | - |
| 8 | **Social Proof** | Validierung | Referenzen (Text) & Testimonial Miriam Ganarin | Ergebnis besprechen | - |
| 9 | **FAQ** | Procurement-Ready | Detailfragen zu SIA, EN 16636, Objektarten | Mit Miriam sprechen | - |
| 10 | **Final CTA** | Abschluss | Zusammenfassung der Vorteile & Letzter Push | Mit Miriam sprechen | Kontakt/Regionen |

---

## 2. Wireframe Desktop (Outline)

```text
[ STICKY HEADER: LOGO | (Nav Links) | [CTA: Mit Miriam sprechen] ]
---------------------------------------------------------------------------------
[ HERO SECTION ]
[ Left: Headline & Subline (Art. 58 OR) ]    [ Right: Interactive Tool Box      ]
[ CTA: Mit Miriam sprechen              ]    [ Progress Bar: 1/6                ]
[ Trust Strip (SBB | ETH | Livit...)    ]    [ Question: Protokoll vorhanden?   ]
                                             [ [JA] [NEIN]                      ]
---------------------------------------------------------------------------------
[ PROBLEM SECTION: Darker Background ]
[ Headline: Dokumentation schlägt Aktion ]
[ Body Text: Lücken in der Beweiskette / Reklamationsspitzen ]
---------------------------------------------------------------------------------
[ SOLUTION: 3-Säulen-Modell (Cards) ]
[ 1. Bautenschutz ]  [ 2. Optik ]  [ 3. Nachweisbarkeit ]
---------------------------------------------------------------------------------
[ PROCESS: 1-2-3 Step-Logic ]
[ Step 1: Assessment ] -> [ Step 2: Umsetzung ] -> [ Step 3: Dokumentation ]
---------------------------------------------------------------------------------
[ SOCIAL PROOF / TESTIMONIALS ]
[ References Text List ]  [ Testimonial Slider / Miriam Ganarin ]
---------------------------------------------------------------------------------
[ FAQ: Accordion Style ]
---------------------------------------------------------------------------------
[ FINAL CTA & FOOTER ]
[ Final USP Summary ] [ CTA: Mit Miriam sprechen ]
[ Regionen | Kontakt: 043... ]
```

---

## 3. CTA-Routing-Regeln (If/Then)

- **IF Score 0–2 (ROT):**
  - Primär: **CTA S** ("Ergebnis besprechen") -> Fokus: Schnelle Risikoreduktion.
  - Sekundär: **CTA K** ("Playbook downloaden") als Fallback.
- **IF Score 3–4 (GELB):**
  - Primär: **CTA K** ("Playbook downloaden") -> Fokus: Lückenschluss & Vorlagen.
  - Sekundär: **CTA S** ("Ergebnis besprechen") als Textlink.
- **IF Score 5–6 (GRÜN):**
  - Primär: **CTA K** ("Playbook downloaden") -> Fokus: Effizienz-Optimierung.
  - Sekundär: **Link** ("Review anfragen") für Profis.
