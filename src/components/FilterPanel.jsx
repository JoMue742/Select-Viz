import { LANGUAGE_COLORS, getColor } from "./MapView";
import "./FilterPanel.css";

const DIR_LABELS = {
  all:           "Alle",
  ltr:           "→ Links nach Rechts",
  rtl:           "← Rechts nach Links",
  boustrophedon: "↔ Bustrophedon",
  spiraling:     "↻ Spiralförmig",
  cruciform:     "✛ Kreuzförmig",
  other:         "~ Gemischt",
  unknown:       "? Unbekannt",
};

const DIRECTIONS = ["all","ltr","rtl","boustrophedon","spiraling","cruciform","other","unknown"];

function formatYear(y) {
  if (y === null || y === undefined) return "?";
  return y < 0 ? `${Math.abs(y)} v. Chr.` : `${y} n. Chr.`;
}

export default function FilterPanel({
  filters, set, alphabetOptions,
  searchQuery, setSearchQuery, onReset,
}) {
  const isActive =
    filters.language !== "all" || filters.writingDirection !== "all" ||
    filters.alphabet !== "all" || filters.dateFrom !== -1000 ||
    filters.dateTo !== 400 || searchQuery !== "";

  return (
    <aside className="filter-panel">

      <div className="filter-panel-header">
        <h2>Filter</h2>
        {isActive && <button className="reset-btn" onClick={onReset}>Zurücksetzen</button>}
      </div>

      {/* Suche */}
      <div className="filter-group">
        <label className="filter-label">Suche</label>
        <input
          type="text"
          className="filter-input"
          placeholder="Ort, antiker Name oder ID…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="clear-search" onClick={() => setSearchQuery("")}>✕ löschen</button>
        )}
      </div>

      {/* Zeitraum */}
      <div className="filter-group">
        <label className="filter-label">
          Zeitraum
          <span className="filter-label-range">
            {formatYear(filters.dateFrom)} – {formatYear(filters.dateTo)}
          </span>
        </label>
        <div className="range-group">
          <span className="range-edge">1000 v.</span>
          <div className="range-sliders">
            <input type="range" min={-1000} max={400} step={50}
              value={filters.dateFrom} className="range-input"
              onChange={(e) => { const v = +e.target.value; if (v <= filters.dateTo) set("dateFrom", v); }} />
            <input type="range" min={-1000} max={400} step={50}
              value={filters.dateTo} className="range-input"
              onChange={(e) => { const v = +e.target.value; if (v >= filters.dateFrom) set("dateTo", v); }} />
          </div>
          <span className="range-edge">400 n.</span>
        </div>
      </div>

      {/* Schreibrichtung als Chips */}
      <div className="filter-group">
        <label className="filter-label">Schreibrichtung</label>
        <div className="chip-group">
          {DIRECTIONS.map((d) => (
            <button
              key={d}
              className={`chip ${filters.writingDirection === d ? "chip--active" : ""}`}
              onClick={() => set("writingDirection", filters.writingDirection === d ? "all" : d)}
            >
              {DIR_LABELS[d]}
            </button>
          ))}
        </div>
      </div>

      {/* Alphabet als Scroll-Liste */}
      <div className="filter-group">
        <label className="filter-label">Schriftsystem / Alphabet</label>
        <div className="scroll-list">
          <div
            className={`scroll-item ${filters.alphabet === "all" ? "scroll-item--active" : ""}`}
            onClick={() => set("alphabet", "all")}
          >
            Alle
          </div>
          {alphabetOptions.map((a) => (
            <div
              key={a}
              className={`scroll-item ${filters.alphabet === a ? "scroll-item--active" : ""}`}
              onClick={() => set("alphabet", filters.alphabet === a ? "all" : a)}
            >
              {a}
            </div>
          ))}
        </div>
      </div>

      {/* Sprachen-Legende */}
      <div className="filter-group legend-group">
        <label className="filter-label">Sprache</label>
        <div className="legend">
          {Object.entries(LANGUAGE_COLORS).map(([lang, color]) => (
            <div
              key={lang}
              className={`legend-item ${filters.language === lang ? "legend-item--active" : ""}`}
              onClick={() => set("language", filters.language === lang ? "all" : lang)}
            >
              <span className="legend-dot" style={{ background: color }} />
              <span className="legend-name">{lang}</span>
            </div>
          ))}
          {/* Facies / Nicht bestimmt */}
          <div
            className={`legend-item ${filters.language === "Unbekannt" ? "legend-item--active" : ""}`}
            onClick={() => set("language", filters.language === "Unbekannt" ? "all" : "Unbekannt")}
          >
            <span className="legend-dot" style={{ background: "#778da9" }} />
            <span className="legend-name" title="Einträge ohne Sprachzuweisung, oft archäologische Facies">
              Facies / Nicht bestimmt
            </span>
          </div>
        </div>
      </div>

    </aside>
  );
}
