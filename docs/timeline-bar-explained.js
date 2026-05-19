// TimelineBar - Zeile-für-Zeile erklärt (für Einsteiger)
// Diese Datei erklärt die ursprüngliche React-Komponente `TimelineBar.jsx`.
// Jede Codezeile oder -gruppe wird direkt über oder neben der Zeile auf Deutsch erklärt.

// Wir importieren zwei React "Hooks": useState und useEffect.
// - useState erlaubt uns, lokale Variablen zu speichern, die die Komponente bei Änderungen neu rendern.
// - useEffect erlaubt uns, Nebenwirkungen auszuführen (z. B. Timer oder API-Aufrufe) wenn sich etwas ändert.
import { useState, useEffect } from "react";

// Die Komponente wird als Funktion exportiert. Sie erhält zwei props:
// - filters: das aktuelle Filter-Objekt aus der Elternkomponente
// - setFilters: Funktion, um die Filter in der Elternkomponente zu aktualisieren
export default function TimelineBar({ filters, setFilters }) {
  // useState: speichert das aktuell angezeigte Jahr der Timeline.
  // Anfangswert ist -1000 (also 1000 BCE).
  const [currentYear, setCurrentYear] = useState(-1000);

  // useState: steuert, ob die Timeline gerade automatisch abspielt (animiert) oder nicht.
  const [isAnimating, setIsAnimating] = useState(false);

  // useEffect: läuft immer dann, wenn sich `currentYear` ändert.
  // Aufgabe hier: die Elternkomponente über die neue Jahreszahl informieren,
  // damit andere Teile (z. B. die Karte) darauf reagieren können.
  useEffect(() => {
    // Wir rufen setFilters mit einer Funktion auf, die das bestehende Filterobjekt kopiert
    // und anschließend das Feld `timelineYear` mit `currentYear` überschreibt.
    // So aktualisieren wir den globalen Filter in der Elternkomponente.
    setFilters((f) => ({ ...f, timelineYear: currentYear }));
  }, [currentYear, setFilters]);

  // useEffect: wenn `isAnimating` true ist, startet ein Intervall,
  // das das Jahr automatisch hochzählt (Animation der Timeline).
  useEffect(() => {
    // Wenn nicht animiert werden soll, nichts tun.
    if (!isAnimating) return;

    // setInterval erstellt einen Timer, der alle 100 ms den aktuellen
    // Wert von currentYear um 5 Jahre erhöht (oder zurücksetzt, falls Ende erreicht).
    const interval = setInterval(() => {
      setCurrentYear((y) => (y >= 400 ? -1000 : y + 5));
    }, 100);

    // Rückgabefunktion von useEffect: wird ausgeführt, wenn die Komponente
    // entfernt wird oder isAnimating sich ändert — hier stoppen wir den Timer.
    return () => clearInterval(interval);
  }, [isAnimating]);

  // Handler: wird aufgerufen, wenn der Benutzer den Slider bewegt.
  // Er liest den neuen Wert aus dem Event, speichert ihn lokal und stoppt die Animation.
  const handleSliderChange = (e) => {
    const year = parseInt(e.target.value);
    setCurrentYear(year);
    setIsAnimating(false); // Manuelle Änderung stoppt die automatische Wiedergabe
  };

  // Handler für den Play/Pause Button: togglet den Animationszustand.
  const handlePlay = () => {
    setIsAnimating(!isAnimating);
  };

  // Handler für Reset: setzt Animation aus und Jahr zurück auf Start (-1000).
  const handleReset = () => {
    setIsAnimating(false);
    setCurrentYear(-1000);
  };

  // Kleine Hilfsfunktion, um Jahreszahlen für Nutzer lesbar zu machen:
  // negative Zahlen werden als "BCE" (v. Chr.), nicht-negative als "CE" (n. Chr.) angezeigt.
  const formatYear = (year) => {
    return year >= 0 ? `${year} CE` : `${Math.abs(year)} BCE`;
  };

  // JSX: die sichtbare Benutzeroberfläche der Timeline.
  // Für Anfänger: das sieht aus wie HTML, ist aber JavaScript-spezifisch (JSX).
  return (
    <div className="timeline-bar">
      {/* Beschriftung */}
      <label className="timeline-label">Timeline:</label>

      {/* Range-Slider: Typ input range ist ein horizontaler Regler */}
      <input
        type="range"
        className="timeline-slider"
        min="-1000" // minimaler Wert (1000 BCE)
        max="400"   // maximaler Wert (400 CE)
        value={currentYear} // bindet den Regler an unseren state
        onChange={handleSliderChange} // Ereignis-Handler bei Änderung
      />

      {/* Anzeige des aktuellen Jahres in lesbarem Format */}
      <div className="timeline-year">{formatYear(currentYear)}</div>

      {/* Play/Pause Button: zeigt je nach Zustand das passende Label */}
      <button
        className="timeline-button"
        onClick={handlePlay}
      >
        {isAnimating ? "⏸ Pause" : "▶ Play"}
      </button>

      {/* Reset-Button: setzt die Timeline zurück */}
      <button
        className="timeline-button"
        onClick={handleReset}
      >
        ↻ Reset
      </button>
    </div>
  );
}

// Ende der Datei: Diese kommentierte Version dient zum Lernen.
// Wenn du jede Zeile durchgehst, kannst du später die echte Komponente `TimelineBar.jsx`
// erklären und in der Präsentation beschreiben, wie State, Effects und Events zusammenwirken.
