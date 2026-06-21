import { LANGUAGE_COLORS } from "./MapView";
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
  const languageEntries = Object.entries(LANGUAGE_COLORS);

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
        <label className="filter-label" htmlFor="searchInput">Search</label>
        <input
          id="searchInput"
          type="text"
          className="filter-input"
          placeholder="Place, ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Period with Number Inputs */}
      <div className="filter-group">
        <label className="filter-label" htmlFor="dateFromInput">
          Period
          <span className="filter-label-range">
            {formatYear(filters.dateFrom)} – {formatYear(filters.dateTo)}
          </span>
        </label>
        <div className="date-inputs">
          <label htmlFor="dateFromInput" className="sr-only">From year</label>
          <input 
            id="dateFromInput"
            type="number" 
            className="filter-input"
            value={filters.dateFrom}
            onChange={(e) => { const v = +e.target.value; if (v <= filters.dateTo) set("dateFrom", v); }}
            placeholder="From"
            aria-label="Start year"
          />
          <label htmlFor="dateToInput" className="sr-only">To year</label>
          <input 
            id="dateToInput"
            type="number" 
            className="filter-input"
            value={filters.dateTo}
            onChange={(e) => { const v = +e.target.value; if (v >= filters.dateFrom) set("dateTo", v); }}
            placeholder="To"
            aria-label="End year"
          />
        </div>
      </div>

      {/* Language legend with colored dots */}
      <div className="filter-group legend-group">
        <label className="filter-label">Language</label>
        <div className="legend">
          <button
            type="button"
            className={`legend-item ${filters.language === "all" ? "legend-item--active" : ""}`}
            onClick={() => set("language", "all")}
            aria-pressed={filters.language === "all"}
          >
            <span className="legend-dot" style={{ background: "var(--accent)" }} />
            <span className="legend-name">All</span>
          </button>

          {languageEntries.map(([lang, color]) => (
            <button
              type="button"
              key={lang}
              className={`legend-item ${filters.language === lang ? "legend-item--active" : ""}`}
              onClick={() => set("language", filters.language === lang ? "all" : lang)}
              aria-pressed={filters.language === lang}
            >
              <span className="legend-dot" style={{ background: color }} />
              <span className="legend-name">{lang}</span>
            </button>
          ))}

          <button
            type="button"
            className={`legend-item ${filters.language === "Unbekannt" ? "legend-item--active" : ""}`}
            onClick={() => set("language", filters.language === "Unbekannt" ? "all" : "Unbekannt")}
            title="Einträge ohne Sprachzuweisung, oft archäologische Facies"
            aria-pressed={filters.language === "Unbekannt"}
          >
            <span className="legend-dot" style={{ background: "#778da9" }} />
            <span className="legend-name" title="Einträge ohne Sprachzuweisung, oft archäologische Facies">
              Facies / Undetermined
            </span>
          </button>
        </div>
      </div>

      {/* Script as Scroll List */}
      <div className="filter-group">
        <label className="filter-label">Script</label>
        <div className="scroll-list">
          <button
            type="button"
            className={`scroll-item ${filters.alphabet === "all" ? "scroll-item--active" : ""}`}
            onClick={() => set("alphabet", "all")}
            aria-pressed={filters.alphabet === "all"}
          >
            All
          </button>
          {alphabetOptions.map((a) => (
            <button
              type="button"
              key={a}
              className={`scroll-item ${filters.alphabet === a ? "scroll-item--active" : ""}`}
              onClick={() => set("alphabet", filters.alphabet === a ? "all" : a)}
              aria-pressed={filters.alphabet === a}
            >
              {a}
            </button>
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
              type="button"
              className={`chip ${filters.writingDirection === d ? "chip--active" : ""}`}
              onClick={() => set("writingDirection", filters.writingDirection === d ? "all" : d)}
              aria-pressed={filters.writingDirection === d}
            >
              {DIR_LABELS[d]}
            </button>
          ))}
        </div>
      </div>

    </aside>
  );
}

