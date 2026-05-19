import { LANGUAGE_COLORS, getColor } from "./MapView";
import "./FilterPanel.css";

const DIR_LABELS = {
  all:           "All",
  ltr:           "→ Left to Right",
  rtl:           "← Right to Left",
  boustrophedon: "↔ Boustrophedon",
  spiraling:     "↻ Spiraling",
  cruciform:     "✛ Cruciform",
  other:         "~ Mixed",
  unknown:       "? Unknown",
};

const DIRECTIONS = ["all","ltr","rtl","boustrophedon","spiraling","cruciform","other","unknown"];

function formatYear(y) {
  if (y === null || y === undefined) return "?";
  return y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`;
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
    <aside className="sidebar">

      <div className="sidebar-header">
        <h2>Filters</h2>
        {isActive && <button className="reset-btn" onClick={onReset}>Reset</button>}
      </div>

      {/* Search */}
      <div className="filter-group">
        <label className="filter-label">Search</label>
        <input
          type="text"
          className="filter-input"
          placeholder="Place, ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Period with Number Inputs */}
      <div className="filter-group">
        <label className="filter-label">
          Period
          <span className="filter-label-range">
            {formatYear(filters.dateFrom)} – {formatYear(filters.dateTo)}
          </span>
        </label>
        <div className="date-inputs">
          <input 
            type="number" 
            className="filter-input"
            value={filters.dateFrom}
            onChange={(e) => { const v = +e.target.value; if (v <= filters.dateTo) set("dateFrom", v); }}
            placeholder="From"
          />
          <input 
            type="number" 
            className="filter-input"
            value={filters.dateTo}
            onChange={(e) => { const v = +e.target.value; if (v >= filters.dateFrom) set("dateTo", v); }}
            placeholder="To"
          />
        </div>
      </div>

      {/* Language as Scroll List */}
      <div className="filter-group">
        <label className="filter-label">Language</label>
        <div className="scroll-list">
          <div
            className={`scroll-item ${filters.language === "all" ? "scroll-item--active" : ""}`}
            onClick={() => set("language", "all")}
          >
            All
          </div>
          {Object.keys(LANGUAGE_COLORS).map((lang) => (
            <div
              key={lang}
              className={`scroll-item ${filters.language === lang ? "scroll-item--active" : ""}`}
              onClick={() => set("language", filters.language === lang ? "all" : lang)}
            >
              {lang}
            </div>
          ))}
          <div
            className={`scroll-item ${filters.language === "Unbekannt" ? "scroll-item--active" : ""}`}
            onClick={() => set("language", filters.language === "Unbekannt" ? "all" : "Unbekannt")}
          >
            Facies / Undetermined
          </div>
        </div>
      </div>

      {/* Script as Scroll List */}
      <div className="filter-group">
        <label className="filter-label">Script</label>
        <div className="scroll-list">
          <div
            className={`scroll-item ${filters.alphabet === "all" ? "scroll-item--active" : ""}`}
            onClick={() => set("alphabet", "all")}
          >
            All
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

      {/* Writing Direction as Chips */}
      <div className="filter-group">
        <label className="filter-label">Writing Direction</label>
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

    </aside>
  );
}
