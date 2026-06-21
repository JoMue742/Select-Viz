import { useState, useEffect, useRef } from "react";
export default function TimelineBar({ filters, setFilters }) {
  const [currentYear, setCurrentYear] = useState(-1000);
  const [isAnimating, setIsAnimating] = useState(false);
  const debounceRef = useRef(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFilters((f) => ({ ...f, timelineYear: currentYear }));
    }, 150);
  }, [currentYear]);
  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setCurrentYear((y) => {
        if (y >= 400) { setIsAnimating(false); return -1000; }
        return y + 10;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isAnimating]);
  const handleSliderChange = (e) => { setCurrentYear(parseInt(e.target.value)); setIsAnimating(false); };
  const handlePlay = () => setIsAnimating((a) => !a);
  const handleReset = () => { setIsAnimating(false); setCurrentYear(-1000); };
  const formatYear = (y) => y >= 0 ? y + " CE" : Math.abs(y) + " BCE";
  return (
    <section className="timeline-bar" aria-label="Timeline controls">
      <label className="timeline-label" htmlFor="timelineSlider">Timeline:</label>
      <input id="timelineSlider" type="range" className="timeline-slider" min="-1000" max="400" value={currentYear} onChange={handleSliderChange} aria-valuemin={-1000} aria-valuemax={400} aria-valuenow={currentYear} aria-valuetext={formatYear(currentYear)} />
      <div className="timeline-year" aria-live="polite">{formatYear(currentYear)}</div>
      <button type="button" className="timeline-button" onClick={handlePlay} aria-pressed={isAnimating}>{isAnimating ? "Pause" : "Play"}</button>
      <button type="button" className="timeline-button" onClick={handleReset}>Reset</button>
    </section>
  );
}