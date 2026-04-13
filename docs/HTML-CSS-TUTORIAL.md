# HTML/CSS Tutorial für Select-Viz

Dieses Tutorial erklärt euer **HTML- und CSS-Strukturen** in Select-Viz. Der Code ist in JSX geschrieben (React), aber wir konzentrieren uns hier auf die **HTML-Elemente und CSS-Styling**.

> **JavaScript wird später im Semester erklärt.** Hier geht es nur ums Verstehen von Struktur + Styling.

---

## Überblick: Wie ist das HTML aufgebaut?

### Hierarchie
```
<div class="app">
  ├── <header class="app-header">
  │   ├── Logo + Titel
  │   ├── Navigation (Buttons)
  │   └── Zähler
  │
  └── <div class="app-body">
      ├── <aside class="filter-panel">  ← Sidebar mit Filtern
      │
      └── <main class="map-container">  ← Karte in der Mitte
```

Das ist ein klassisches **Two-Column Layout**: Sidebar-Navigation links, Hauptinhalt rechts.

---

## Teil 1: HTML-Struktur

### 1.1 Der App-Container (`<div class="app">`)

```jsx
<div className="app">
  {/* Alles kommt hier rein */}
</div>
```

**Warum `className` statt `class`?**  
In React heißt es `className` (nicht `class`, das ist JavaScript reserved). Der Browser interpretet das als `class`.

**CSS dazu** (in `App.css`):
```css
.app {
  display: flex;              /* Flex-Layout */
  flex-direction: column;      /* Vertikal (Header oben, Body unten) */
  height: 100vh;              /* 100% der Viewport-Höhe */
  width: 100vw;               /* 100% der Viewport-Breite */
}
```

**Was das macht:**
- Macht die App **full-screen**
- Benutzt Flexbox, um Header + Body übereinander zu ordnen
- Responsive: Alles passt sich der Bildschirmgröße an

---

### 1.2 Der Header (`<header class="app-header">`)

```jsx
<header className="app-header">
  <div className="header-left">
    <span className="header-eyebrow">SELECT Database</span>
    <h1>Epigraphic Atlas of Ancient Europe</h1>
  </div>
  
  <nav className="header-nav">
    <button className={`nav-btn ${activeTab === "map" ? "nav-btn--active" : ""}`}>
      Karte
    </button>
    <button className={`nav-btn ${activeTab === "about" ? "nav-btn--active" : ""}`}>
      Über das Projekt
    </button>
  </nav>
  
  <div className="header-count">
    <span className="count-number">1.234</span>
    <span className="count-label"> / 14.000 Inschriften</span>
  </div>
</header>
```

**Was passiert hier?**

1. **Logo + Titel** (`.header-left`):
   - `<span class="header-eyebrow">` = Kleiner Text oben ("SELECT Database")
   - `<h1>` = Großer Titel

2. **Navigation** (`.header-nav`):
   - Zwei Buttons: "Karte" und "Über das Projekt"
   - Aktiver Button bekommt die Klasse `.nav-btn--active` (ändert Farbe)
   - Button-Text ist intern, CSS macht den Stil

3. **Zähler** (`.header-count`):
   - Zeigt aktuelle Anzahl: "1.234 / 14.000"
   - `.count-number` hat die Cognac-Farbe (#c9973a)

**CSS Styling**:
```css
.app-header {
  background: var(--panel-bg);        /* Dunkler Hintergrund */
  border-bottom: 1px solid var(--border);
  height: 52px;                       /* Feste Höhe */
  display: flex;                      /* Horizontal nebeneinander */
  align-items: center;                /* Vertikal zentriert */
  gap: 1.25rem;                       /* Abstand zwischen Elementen */
}

.nav-btn {
  background: none;
  border: 1px solid transparent;
  color: var(--text-muted);
  padding: 0.28rem 0.8rem;
  border-radius: 20px;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;  /* Smooth Animation */
}

.nav-btn:hover {
  color: var(--text);                 /* Bei Hover: heller */
  border-color: var(--border);
}

.nav-btn--active {
  color: var(--accent);               /* Aktiv: Cognac-Farbe */
  border-color: var(--accent);
}
```

**Design-Entscheidungen:**
- ✅ Header ist **fixed-height** (52px) → bleibt oben sichtbar
- ✅ Flexbox-Layout → Elemente verteilen sich gleichmäßig
- ✅ Smooth Transitions (0.15s) → angenehm für Auge
- ✅ Button-Styling mit `--active` Klasse → einfach Zustand wechseln

---

### 1.3 Der Body (`<div class="app-body">`)

```jsx
<div className="app-body">
  {activeTab === "map" && (
    <>
      <aside className="filter-panel">
        {/* Filter-Sidebar */}
      </aside>
      <main className="map-container">
        {/* Leaflet-Karte */}
      </main>
    </>
  )}
  
  {activeTab === "about" && <AboutPanel />}
</div>
```

**Was passiert hier?**

- Wenn `activeTab === "map"` → zeige Sidebar + Karte
- Wenn `activeTab === "about"` → zeige About-Seite
- Das ist **Tab-Switching** mit CSS + JavaScript

**CSS**:
```css
.app-body {
  flex: 1;            /* Füllt restlichen Platz aus */
  display: flex;      /* Horizontal nebeneinander */
  overflow: hidden;   /* Kein Scrollbar (alles in Sidebar/Karte scrollbar) */
}

.filter-panel {
  width: 420px;       /* Feste Breite */
  background: var(--panel-bg);
  border-right: 1px solid var(--border);
  overflow-y: auto;   /* Scroll wenn nötig */
}

.map-container {
  flex: 1;            /* Füllt restlichen Platz */
  position: relative; /* Basis für absolute Children (Leaflet) */
  overflow: hidden;
}
```

---

### 1.4 Die FilterPanel-Sidebar

```jsx
<aside className="filter-panel">
  <div className="filter-panel-header">
    <h2>Filter</h2>
    <button className="reset-btn">Zurücksetzen</button>
  </div>
  
  <div className="filter-group">
    <label className="filter-label">Suche</label>
    <input
      type="text"
      className="filter-input"
      placeholder="Ort, antiker Name oder ID…"
    />
  </div>
  
  <div className="filter-group">
    <label className="filter-label">
      Zeitraum
      <span className="filter-label-range">1000 v. – 400 n.</span>
    </label>
    <input type="range" min={-1000} max={400} />
  </div>
  
  <div className="filter-group">
    <label className="filter-label">Schreibrichtung</label>
    <div className="chip-group">
      <button className="chip">→ Links→Rechts</button>
      <button className="chip chip--active">← Rechts→Links</button>
    </div>
  </div>
</aside>
```

**Element für Element erklärt:**

1. **Header** (`.filter-panel-header`):
   - `<h2>Filter</h2>` = Titel
   - Reset-Button zum Löschen aller Filter

2. **Suchfeld** (`.filter-group`):
   - `<label>` = Beschriftung
   - `<input type="text">` = Text-Input
   - **Semantic**: Der `<label>` verbindet sich automatisch mit dem Input

3. **Zeitraum-Slider**:
   - `<input type="range">` = HTML5 Range-Slider
   - Min: -1000, Max: 400
   - **CSS**: Range-Slider sieht anders aus je nach Browser

4. **Chips** (Radio-Button-ähnlich):
   - `<div class="chip-group">` = Container
   - Einzelne `<button class="chip">` Buttons
   - `.chip--active` = Aktiver Chip (Cognac-Farbe)

**CSS - Filter-Groups**:
```css
.filter-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--text-muted);
  font-weight: 700;
}

.filter-input {
  background: var(--input-bg);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
}

.chip {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.chip:hover {
  border-color: var(--accent);
}

.chip--active {
  background: var(--accent);
  color: #0f0f0f;
  border-color: var(--accent);
  font-weight: 700;
}
```

**Design-Entscheidungen:**
- ✅ Labels sind **Uppercase** → deutlich + wissenschaftlich
- ✅ Chips nicht als Dropdown → einfach scannen
- ✅ `.chip--active` mit Hintergrund → visuell deutlich

---

### 1.5 Die Karte (`<main class="map-container">`)

```jsx
<main className="map-container">
  {error && <div className="error-banner">⚠️ {error}</div>}
  
  {loading ? (
    <div className="loading-screen">
      <div className="loading-spinner" />
      <p>Lade <em>14.000+</em> Inschriften…</p>
    </div>
  ) : (
    <MapView features={filtered} />
  )}
</main>
```

**Conditional Rendering:**
1. Wenn `loading`: Zeige Spinner
2. Wenn `error`: Zeige Error-Banner
3. Sonst: Zeige Karte (`<MapView>`)

**CSS - Loading & Error**:
```css
.loading-screen {
  position: absolute;
  inset: 0;                           /* Füllt parent vollständig */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg);
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 2px solid var(--border);
  border-top-color: var(--accent);    /* Nur oben Cognac */
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-banner {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);        /* Horizontal zentriert */
  z-index: 1000;                      /* Über der Karte */
  background: #3d1a1a;
  border: 1px solid #7f2020;
  color: #ff9999;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
}
```

**Design-Entscheidungen:**
- ✅ Spinner hat nur einen Cognac-Border oben → Rotation sichtbar
- ✅ Error-Banner ist absolut positioniert → schwebt über Karte
- ✅ `inset: 0` ist Shorthand für `top:0; right:0; bottom:0; left:0;` → einfacher

---

### 1.6 Die MapView-Komponente

Die Map wird mit **Leaflet** gerendert (JavaScript), aber die HTML-Struktur darunter:

```jsx
<MapContainer center={[41.8719, 12.5674]} zoom={4}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
  />
  
  <MarkerClusterGroup>
    {features.map((f) => (
      <CircleMarker
        key={f.properties.id}
        center={[lat, lng]}
        radius={5}
        fillColor={getColor(lang)}
      >
        <Popup>
          {/* Detail-Info */}
        </Popup>
      </CircleMarker>
    ))}
  </MarkerClusterGroup>
</MapContainer>
```

**React-Leaflet Komponenten:**
- `<MapContainer>` = Leaflet-Map Wrapper
- `<TileLayer>` = Basemap (OpenStreetMap)
- `<MarkerClusterGroup>` = Clustering
- `<CircleMarker>` = Einzelne Inschrift
- `<Popup>` = Popup bei Click

**Das HTML am Ende:**
```html
<div id="root">
  <div class="leaflet-container">
    <!-- irgendwo in diese <div> rendert Leaflet die Karte -->
  </div>
</div>
```

---

## Teil 2: CSS-Styling Strategie

### 2.1 CSS Variables (Theme)

Am Anfang von `App.css`:
```css
:root {
  --bg:             #0f0f0f;
  --text:           #e8e0d4;
  --accent:         #c9973a;
  /* ... etc ... */
}
```

**Warum CSS Variables?**
- ✅ Zentrale Farbdefinition → einfach ändern (z.B. für Dark/Light Mode)
- ✅ Code ist lesbarer (`var(--accent)` vs `#c9973a`)
- ✅ DRY-Prinzip (Don't Repeat Yourself)

**Verwendung:**
```css
.my-button {
  color: var(--text);          /* Wert aus :root */
  background: var(--panel-bg);
}
```

---

### 2.2 Flexbox Layout

Überall in Select-Viz nutzen wir **Flexbox** (keine Grids nötig):

```css
/* Horizontal nebeneinander */
.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Vertikal untereinander */
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Füllt restlichen Platz */
.map-container {
  flex: 1;
}
```

**Häufige Muster:**

| CSS | Effekt |
|-----|--------|
| `display: flex;` | Flex-Container (Kinder nebeneinander) |
| `flex-direction: column;` | Kinder untereinander statt nebeneinander |
| `align-items: center;` | Vertikal zentriert |
| `justify-content: center;` | Horizontal zentriert |
| `gap: 1rem;` | Abstand zwischen Flex-Children |
| `flex: 1;` | Füllt restlichen Platz |

---

### 2.3 Responsive Elemente

```css
/* Slider-Input benutzerdefiniert */
input[type="range"] {
  width: 100%;
  height: 4px;
  background: var(--border);
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
}

/* Text-Input */
input[type="text"]::placeholder {
  color: var(--text-muted);
}

input[type="text"]:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(201, 151, 58, 0.1);
}
```

---

### 2.4 Overrides für Leaflet

Leaflet hat seine eigenen Standard-Styles. Wir überschreiben sie:

```css
/* Leaflet Container */
.leaflet-container {
  background: #1a1a1a !important;  /* !important weil Leaflet Inline-Styles nutzt */
}

/* Zoom-Buttons */
.leaflet-control-zoom a {
  background: var(--panel-bg) !important;
  color: var(--text) !important;
}

/* Attribution (Klein-Text unten rechts) */
.leaflet-control-attribution {
  background: rgba(0,0,0,0.6) !important;
  color: var(--text-muted) !important;
  font-size: 0.58rem !important;
}

/* Popup Theme */
.leaflet-popup-content-wrapper {
  background: var(--panel-bg) !important;
  border: 1px solid var(--border) !important;
  border-radius: 8px !important;
}
```

---

## Teil 3: Besondere CSS-Patterns

### 3.1 Buttons mit Active-State

```css
.nav-btn {
  /* Default state */
  color: var(--text-muted);
  border: 1px solid transparent;
}

.nav-btn:hover {
  /* Mouse over */
  color: var(--text);
  border-color: var(--border);
}

.nav-btn--active {
  /* Aktuell aktiv (via className in React) */
  color: var(--accent);
  border-color: var(--accent);
}
```

**Pattern erklärt:**
- `:hover` = CSS Pseudo-Class (nicht nötig im HTML)
- `.nav-btn--active` = JavaScript setzt diese Klasse

### 3.2 Position Absolute (Error-Banner, Spinner)

```css
.loading-screen {
  position: absolute;  /* Relativ zu parent (.map-container) */
  inset: 0;           /* top/right/bottom/left alle 0 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  position: relative;  /* Default, für @keyframes */
  animation: spin 0.8s linear infinite;
}
```

**Warum Position Absolute?**
- Überlagert die Karte (ohne Layouts zu brechen)
- Zentrieren ist einfach mit `inset: 0` + `flex`

### 3.3 Animations & Transitions

```css
/* Smooth Color-Übergang */
.nav-btn {
  transition: color 0.15s, border-color 0.15s;
}

/* Rotating Spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading-spinner {
  animation: spin 0.8s linear infinite;  /* 0.8s pro Rotation, nicht stoppen */
}

/* Loading-Pulse */
@keyframes pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.loading-pulse {
  animation: pulse 1.2s ease-in-out infinite;
}
```

---

## Zusammenfassung: Die 5 Key CSS-Konzepte

1. **CSS Variables** (`--bg`, `--accent`) → Zentrales Theme
2. **Flexbox** (layout all the things) → Responsive ohne Grids
3. **Pseudo-Classes** (`:hover`, `:focus`) → Interaktivität ohne JS
4. **className-Bindiung** (`.nav-btn--active` in React) → State-Styling
5. **Animations** (`@keyframes`, `transition`) → Polish & Feedback

---

## Häufig gestellte Fragen

**Q: Warum nicht Bootstrap nutzen?**  
A: Wir wollten das Design komplett selbst kontrollieren. Bootstrap hätte Bloat gebracht.

**Q: Warum keine CSS-Preprocessor (SCSS)?**  
A: Für ein Prototype reicht Plain CSS. SCSS könnte später kommen.

**Q: Wie funktionieren Transitions vs Animations?**  
A: **Transitions** brauchen einen State-Change (`:hover`). **Animations** laufen von selbst (`infinite`).

**Q: Ist Dark Mode schwer zu implementieren?**  
A: Mit CSS Variables **sehr einfach**: Nur `:root` auf andere Farben machen.

---

## Zum Selbermachen

1. **Header anpassen**: Ändert Farben in `:root` und seht live, wie alles sich ändert
2. **Button-Styling**: Addet neue `.nav-btn--hover:active` Klasse
3. **Slider-Design**: Style das `<input type="range">` mit neuem Daumen (Thumb)
4. **Animation**: Ändert `spin` Animation zu `bounce` oder `fade`

---

**Du verstehst jetzt das HTML-Gerüst und das CSS-Styling von Select-Viz.** ✅

Nächstes Semester: **JavaScript** (wie die Filter funktionieren, React-Hooks, Event-Listener).
