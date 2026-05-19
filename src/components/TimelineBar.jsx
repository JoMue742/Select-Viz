import { useState, useEffect } from "react";

export default function TimelineBar({ filters, setFilters }) {
  const [currentYear, setCurrentYear] = useState(-1000);
  const [isAnimating, setIsAnimating] = useState(false);

  // Wenn Jahr sich ändert, Filter aktualisieren
  useEffect(() => {
    setFilters((f) => ({ ...f, timelineYear: currentYear }));
  }, [currentYear, setFilters]);

  // Animation Loop
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentYear((y) => (y >= 400 ? -1000 : y + 5));
    }, 100);

    return () => clearInterval(interval);
  }, [isAnimating]);

  // Wenn Slider bewegt wird, aktualisiere Timeline
  const handleSliderChange = (e) => {
    const year = parseInt(e.target.value);
    setCurrentYear(year);
    setIsAnimating(false); // Stoppe Animation wenn manuell adjustiert
  };

  const handlePlay = () => {
    setIsAnimating(!isAnimating);
  };

  const handleReset = () => {
    setIsAnimating(false);
    setCurrentYear(-1000);
  };

  const formatYear = (year) => {
    return year >= 0 ? `${year} CE` : `${Math.abs(year)} BCE`;
  };

  return (
    <div className="timeline-bar">
      <label className="timeline-label">Timeline:</label>
      <input
        type="range"
        className="timeline-slider"
        min="-1000"
        max="400"
        value={currentYear}
        onChange={handleSliderChange}
      />
      <div className="timeline-year">{formatYear(currentYear)}</div>
      <button 
        className="timeline-button" 
        onClick={handlePlay}
      >
        {isAnimating ? "⏸ Pause" : "▶ Play"}
      </button>
      <button className="timeline-button" onClick={handleReset}>
        ↻ Reset
      </button>
    </div>
  );
}
