import { useState, useEffect, useMemo } from "react";
import MapView from "./components/MapView";
import FilterPanel from "./components/FilterPanel";
import AboutPanel from "./components/AboutPanel";
import TimelineBar from "./components/TimelineBar";
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  const [allFeatures, setAllFeatures] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError]             = useState(null);
  const [activeTab, setActiveTab]     = useState("map");
  const [showTimeline, setShowTimeline] = useState(true);

  // Filter-Zustand: Sprache wird über die Legende gesetzt (kein Dropdown)
  const [filters, setFilters] = useState({
    language:         "all",   // aus der Legende
    writingDirection: "all",
    alphabet:         "all",
    dateFrom:         -1000,
    dateTo:            400,
    timelineYear:      -1000,  // Aktuelles Jahr der Timeline
  });

  // Suchfeld für Ort oder ID
  const [searchQuery, setSearchQuery] = useState("");

  // GeoJSON laden
  useEffect(() => {
    const dataUrl = `${import.meta.env.BASE_URL}data/inscriptions_slim.geojson`;
    fetch(dataUrl)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((g) => { setAllFeatures(g.features || []); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  // Alphabete aus Daten ableiten
  const alphabetOptions = useMemo(() => {
    const s = new Set();
    allFeatures.forEach((f) => {
      if (f.properties.txt_writingSystem) s.add(f.properties.txt_writingSystem);
    });
    return Array.from(s).sort();
  }, [allFeatures]);

  // Filter anwenden
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allFeatures.filter((f) => {
      const p = f.properties;
      const lang = p.lan_language || "Unbekannt";

      if (filters.language !== "all" && lang !== filters.language) return false;
      if (filters.writingDirection !== "all" && p.writing_direction !== filters.writingDirection) return false;
      if (filters.alphabet !== "all" && p.txt_writingSystem !== filters.alphabet) return false;

      // Zeitraum (Benutzer-Filter)
      if (p.chr_min !== null || p.chr_max !== null) {
        const von = p.chr_min ?? p.chr_max;
        const bis = p.chr_max ?? p.chr_min;
        if (bis < filters.dateFrom || von > filters.dateTo) return false;
      }

      // Timeline-Filter: NUR anwenden wenn Timeline sichtbar ist
      if (showTimeline && p.chr_min !== null && p.chr_max !== null) {
        const chrMin = p.chr_min;
        const chrMax = p.chr_max;
        // Jahr muss zwischen chr_min und chr_max liegen
        if (filters.timelineYear < chrMin || filters.timelineYear > chrMax) return false;
      }

      // Suche: Ort, ID, antiker Ortsname
      if (q) {
        const hay = [p.id, p.loc_municipality, p.loc_spotAncient, p.loc_spotModern, p.loc_region]
          .filter(Boolean).join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    });
  }, [allFeatures, filters, searchQuery, showTimeline]);

  const set = (key, val) => setFilters((f) => ({ ...f, [key]: val }));

  const setWithProcessing = (key, val) => {
    setIsProcessing(true);
    setFilters((f) => ({ ...f, [key]: val }));
  };

  const setSearchQueryWithProcessing = (value) => {
    setIsProcessing(true);
    setSearchQuery(value);
  };

  const setFiltersWithProcessing = (updater) => {
    setIsProcessing(true);
    setFilters(updater);
  };

  // Nach Nutzer-Aktionen kurz sichtbar lassen, dann ausblenden.
  useEffect(() => {
    if (!isProcessing || loading) return;

    let raf1 = 0;
    let raf2 = 0;
    let timeoutId = 0;
    const start = performance.now();

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const elapsed = performance.now() - start;
        const remaining = Math.max(0, 320 - elapsed);
        timeoutId = window.setTimeout(() => setIsProcessing(false), remaining);
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(timeoutId);
    };
  }, [filters, searchQuery, showTimeline, activeTab, isProcessing, loading]);

  // Timeline Toggle: Filter zurücksetzen wenn Timeline ausgeschaltet wird
  const handleTimelineToggle = () => {
    setIsProcessing(true);
    if (showTimeline) {
      // Timeline wird ausgeschaltet -> Filter & Suche zurücksetzen
      setFilters({ language: "all", writingDirection: "all", alphabet: "all", dateFrom: -1000, dateTo: 400, timelineYear: -1000 });
      setSearchQuery("");
    }
    setShowTimeline(!showTimeline);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <span className="header-eyebrow">SELECT Database</span>
          <h1>Epigraphic Atlas of Ancient Europe</h1>
        </div>
        <nav className="header-nav">
          <button className={`nav-btn ${activeTab === "map"   ? "nav-btn--active" : ""}`} onClick={() => setActiveTab("map")}>Map</button>
          <button className={`nav-btn ${activeTab === "about" ? "nav-btn--active" : ""}`} onClick={() => setActiveTab("about")}>About</button>
          <button 
            className={`nav-btn ${showTimeline ? "nav-btn--active" : ""}`} 
            onClick={handleTimelineToggle}
            title={showTimeline ? "Hide Timeline" : "Show Timeline"}
          >
            Timeline
          </button>
          <ThemeToggle />
        </nav>
        <div className="header-count">
          {loading ? (
            <span className="loading-inline">
              <span className="loading-spinner loading-spinner--small" aria-hidden="true" />
              <span className="loading-pulse">Loading…</span>
            </span>
          ) : (
            <span>
              {isProcessing && (
                <span className="loading-inline loading-inline--update" aria-live="polite">
                  <span className="loading-spinner loading-spinner--small" aria-hidden="true" />
                  <span>Updating…</span>
                </span>
              )}
              <span className="count-number">{filtered.length.toLocaleString("en")}</span>
              <span className="count-label"> / {allFeatures.length.toLocaleString("en")} Inscriptions</span>
            </span>
          )}
        </div>
      </header>

      {showTimeline && <TimelineBar filters={filters} setFilters={setFiltersWithProcessing} />}

      <div className="app-body">
        {activeTab === "map" && (
          <>
            <FilterPanel
              filters={filters} set={setWithProcessing}
              alphabetOptions={alphabetOptions}
              searchQuery={searchQuery} setSearchQuery={setSearchQueryWithProcessing}
              onReset={() => {
                setIsProcessing(true);
                setFilters({ language: "all", writingDirection: "all", alphabet: "all", dateFrom: -1000, dateTo: 400, timelineYear: -1000 });
                setSearchQuery("");
              }}
            />
            <main className="map-container">
              {error && <div className="error-banner">⚠️ {error} – liegt inscriptions_slim.geojson in public/data/?</div>}
              {loading
                ? <div className="loading-screen"><div className="loading-spinner"/><p>Lade <em>14.000+</em> Inschriften…</p></div>
                : <MapView features={filtered} />
              }
            </main>
          </>
        )}
        {activeTab === "about" && <AboutPanel />}
      </div>

      <Footer />
    </div>
  );
}
