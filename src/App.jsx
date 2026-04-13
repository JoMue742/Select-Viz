import { useState, useEffect, useMemo } from "react";
import MapView from "./components/MapView";
import FilterPanel from "./components/FilterPanel";
import AboutPanel from "./components/AboutPanel";
import "./App.css";

export default function App() {
  const [allFeatures, setAllFeatures] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [activeTab, setActiveTab]     = useState("map");

  // Filter-Zustand: Sprache wird über die Legende gesetzt (kein Dropdown)
  const [filters, setFilters] = useState({
    language:         "all",   // aus der Legende
    writingDirection: "all",
    alphabet:         "all",
    dateFrom:         -1000,
    dateTo:            400,
  });

  // Suchfeld für Ort oder ID
  const [searchQuery, setSearchQuery] = useState("");

  // GeoJSON laden
  useEffect(() => {
    fetch("/data/inscriptions_slim.geojson")
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

      // Zeitraum
      if (p.chr_min !== null || p.chr_max !== null) {
        const von = p.chr_min ?? p.chr_max;
        const bis = p.chr_max ?? p.chr_min;
        if (bis < filters.dateFrom || von > filters.dateTo) return false;
      }

      // Suche: Ort, ID, antiker Ortsname
      if (q) {
        const hay = [p.id, p.loc_municipality, p.loc_spotAncient, p.loc_spotModern, p.loc_region]
          .filter(Boolean).join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    });
  }, [allFeatures, filters, searchQuery]);

  const set = (key, val) => setFilters((f) => ({ ...f, [key]: val }));

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <span className="header-eyebrow">SELECT Database</span>
          <h1>Epigraphic Atlas of Ancient Europe</h1>
        </div>
        <nav className="header-nav">
          <button className={`nav-btn ${activeTab === "map"   ? "nav-btn--active" : ""}`} onClick={() => setActiveTab("map")}>Karte</button>
          <button className={`nav-btn ${activeTab === "about" ? "nav-btn--active" : ""}`} onClick={() => setActiveTab("about")}>Über das Projekt</button>
        </nav>
        <div className="header-count">
          {loading ? <span className="loading-pulse">Lade…</span> : (
            <span>
              <span className="count-number">{filtered.length.toLocaleString("de")}</span>
              <span className="count-label"> / {allFeatures.length.toLocaleString("de")} Inschriften</span>
            </span>
          )}
        </div>
      </header>

      <div className="app-body">
        {activeTab === "map" && (
          <>
            <FilterPanel
              filters={filters} set={set}
              alphabetOptions={alphabetOptions}
              searchQuery={searchQuery} setSearchQuery={setSearchQuery}
              onReset={() => {
                setFilters({ language: "all", writingDirection: "all", alphabet: "all", dateFrom: -1000, dateTo: 400 });
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
    </div>
  );
}
