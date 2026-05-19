# Timeline — Kurzpräsentation (1 Seite)

Ziel: kurze, klar strukturierte Sprechnotiz, mit der du die `TimelineBar`-Komponente in der Lehrveranstaltung erklärst.

1) Einstieg (10–20s)
- Kurz: „Die Timeline ist ein UI-Widget, das zentrale historische Jahrgänge auf der Karte sichtbar macht.“
- Nenne Zweck: Filtert Inschriften nach Aktivitätsjahr und erlaubt Animation über Zeit.

2) Architektur-Überblick (20–30s)
- Datei: `select-viz/src/components/TimelineBar.jsx` — React-Komponente (funktional).
- Props: `filters`, `setFilters` — so kommuniziert die Timeline mit der übergeordneten App.

3) Kernelemente erklären (30–60s)
- State: `currentYear` (aktuelles Jahr, z. B. -1000) und `isAnimating` (Play/Pause).
- `useEffect(currentYear)`: schreibt `timelineYear` in die globalen Filter via `setFilters`.
- `useEffect(isAnimating)`: startet/stoppt einen Timer (setInterval), der das Jahr inkrementiert.
- UI: Slider (`<input type="range">`), Jahr-Anzeige, Play/Pause, Reset.

4) Live-Demo (60–90s)
- Zeige die Seite lokal: `http://localhost:5174/Select-Viz/`.
- Schritte: Slider bewegen → Karte aktualisiert sich; Play drücken → automatische Animation; Reset → zurück auf -1000.
- Wenn du die Timeline ausschaltest (Knopf im Header), werden Timeline-Filter und Suche zurückgesetzt.

5) Wichtige Code-Zeilen, kurz (15–30s)
- `const [currentYear, setCurrentYear] = useState(-1000);` → initialisiert das Jahr.
- `useEffect(() => setFilters(f => ({...f, timelineYear: currentYear})), [currentYear]);` → teilt der App das Jahr mit.
- `setInterval(() => setCurrentYear(y => (y >= 400 ? -1000 : y + 5)), 100);` → Animation: springt am Ende zurück.

6) Häufige Prüfungsfragen — kurze Antworten
- Warum `useEffect` für `currentYear`? → Um Seiteneffekte (Update globaler Filter) sicher zu handhaben.
- Warum `setCurrentYear(y => ...)` statt `setCurrentYear(currentYear + 5)`? → Funktionsform vermeidet veraltete Werte in Closures.
- Was passiert bei `clearInterval`? → Verhindert Memory Leaks und doppelte Timer.

7) Vorbereitungstipps für die Präsentation
- Zeige die Live-Demo zuerst, dann öffne `select-viz/src/components/TimelineBar.jsx` und gehe Zeile für Zeile durch (nutze die bereits erstellte `docs/timeline-bar-explained.js`).
- Erkläre kurz React-Hooks (`useState`, `useEffect`) in eigenen Worten.
- Antizipiere Nachfragen zu Race-Conditions und erkläre, warum die aktuelle Implementierung robust ist.

8) 30‑Sekunden-Fallback (wenn Zeit knapp)
- „Die Timeline steuert `timelineYear` im globalen Filter. Slider = manuell, Play = automatisch, Reset = Start. `useEffect` sorgt für sichere Kommunikation zwischen Komponenten."

---
Wenn du möchtest, schreibe ich daraus auch ein kurzes Notizenblatt mit Stichpunkten pro Folie (3 Folien: Konzept, Code, Demo). Soll ich das tun?
