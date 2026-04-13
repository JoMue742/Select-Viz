# Visual Design: Select-Viz

## Design-Philosophie
**Dark Academic**: Gehobene, monochrome Palette mit Akzentfarbe (Cognac/Gold). Inspiriert von historisch-wissenschaftlichen Publikationen. Ziel ist ernsthafte Lesbarkeit ohne Ablenkung.

---

## Farbschema

### Palette (CSS Variables: App.css `:root`)
```css
--bg:             #0f0f0f         /* Sehr dunkel (Hintergrund) */
--panel-bg:       #161616         /* Panel-Hintergrund */
--input-bg:       #1e1e1e         /* Input-Felder */
--border:         #2a2a2a         /* Borders, Divider */
--hover-bg:       #222222         /* Hover-State */
--text:           #e8e0d4         /* Haupttext (Cream-Weiß) */
--text-secondary: #a89f94         /* Sekundär-Text */
--text-muted:     #5a5450         /* Gedimmt (Labels, etc) */
--accent:         #c9973a         /* Cognac/Gold (Highlights) */
```

### Anwendung
- **Hintergrund**: Dunkelgrau (#0f0f0f) → reduziert Augenbelastung
- **Text**: Cream-Weiß (#e8e0d4) → hoher Kontrast bei entspannter Optik
- **Akzente**: Cognac (#c9973a) → aktive Elemente, Nummern, Links
- **Borders**: Sehr dunkel (#2a2a2a) → subtile Strukturen

### Sprachen-Farbcodierung (Legende)
Jede Sprache hat eine eigene Farbe (definiert in `MapView.jsx` → `LANGUAGE_COLORS`):

```javascript
"Etruscan":                    "#e07b39"  // Orange
"Iberian":                     "#e63946"  // Rot
"Oscan":                       "#f4a261"  // Helles Orange
"Messapic":                    "#9b5de5"  // Violett
"Faliscan":                    "#f7c59f"  // Peach
"Gaulish":                     "#2a9d8f"  // Teal
"Venetic":                     "#4cc9f0"  // Hellblau
"Cisalpine Celtic":            "#80b918"  // Grün
Etc. (siehe MapView.jsx für vollständige Liste)
```

**Grund**: Schnelle visuelle Unterscheidung auf der Karte + Legenden.

---

## Typographie

### Font-Families
```css
--font-display:   'Cormorant Garamond', Georgia, serif
--font-mono:      'DM Mono', monospace
--font-ui:        system-ui, -apple-system, sans-serif
```

### Verwendung
1. **Display (Header, Titel)**: Cormorant Garamond
   - Elegante, klassische Serif-Font
   - Projekttitel: "Epigraphic Atlas of Ancient Europe"
   - Ortnamen in Popups
   - Größe: 1.15rem (Header H1)

2. **Mono (Daten, Code)**: DM Mono
   - IDs, Inschriften-Text, Zähler
   - Großes Tracking: `letter-spacing: 0.1em`
   - Größe: 0.75rem (klein, kompakt)

3. **UI (Buttons, Labels)**: System Font Stack
   - Schnelle, lesbare Kontrollen
   - Größe: 0.75rem (kleine Buttons/Labels)

---

## Layout-Architektur

```
┌─────────────────────────────────────────────┐
│  [SELECT] Epigraphic Atlas | Karte | Über  │  Header (52px)
│                      [1.234/14.000 Insch.]  │
├──────────────────┬───────────────────────────┤
│                  │                           │
│   Filter Panel   │     LEAFLET KARTE        │
│   (Sidebar)      │     (Punkte, Cluster,   │
│                  │      Zoom, Pan)          │
│   Suche          │                           │
│   Zeitraum       │    Basemap: OSM/CARTO   │
│   Sprache        │    Attribution            │
│   Schreibr.      │                           │
│   Alphabet       │                           │
│                  │                           │
├──────────────────────────────────────────────┤
└─────────────────────────────────────────────┘
```

### Header (52px, fixed)
- **Links**: "SELECT Logo" + "Epigraphic Atlas of Ancient Europe"
- **Mitte**: Navigation Buttons (Karte / Über)
- **Rechts**: Live-Zähler "X / Y Inschriften"
- **Border unten**: Subtle (#2a2a2a)

### Sidebar (FilterPanel) - 300–420px wide
- **Fix positioned** (scrollbar nur im Inhalt)
- **Hintergrund**: Leicht dunkler als Main (#161616)
- **Padding**: 1.25rem
- **Elemente**:
  - Suche-Input (text)
  - Zeitraum Dual-Slider
  - Schreibrichtung: Chip-Buttons (nicht Dropdown)
  - Sprachen: Dropdown (später: Legende/Button-Grid)
  - Alphabet: Dropdown
  - Reset-Button (wenn Filter aktiv)

### Main (Kartenbreich)
- **Flex: 1** (füllt restlichen Platz)
- **Eingabe**: (r) in Cluster bei Zoom-out
- **Popup**: Bei Click → zeigt Metadaten in Leaflet Popup
- **Loading-Screen**: Während GeoJSON geladen wird

---

## Responsive & Breakpoints

| Breakpoint | Verhalten |
|------------|-----------|
| **Desktop** (>1024px) | Sidebar links, Karte rechts (Layout wie oben) |
| **Tablet** (768–1023px) | Sidebar über Toggle-Button, Karte darunter (optional) |
| **Mobile** (<768px) | **Nicht implementiert** – Prototype ist Desktop-focused |

---

## UI-Komponenten

### Button Styles
#### Standard Button
```css
background: none;
border: 1px solid transparent;
color: --text-muted;
padding: 0.28rem 0.8rem;
border-radius: 20px;
transition: color 0.15s, border-color 0.15s;
```

#### Active Button (`.nav-btn--active`)
```css
color: --accent;           /* Cognac */
border-color: --accent;    /* Border wird sichtbar */
```

### Chip Buttons (Schreibrichtung)
- Inline, horizontal arrangiert
- Background: `transparent` bei inactive
- Active: `background: --accent`, `color: black`
- Abstand: `gap: 0.5rem`

### Input Fields
```css
background: --input-bg (#1e1e1e);
border: 1px solid --border (#2a2a2a);
color: --text;
padding: 0.4rem 0.6rem;
border-radius: 4px;
```

### Slider (Range Input)
- Double-Range für Zeitraum
- Thumb-Farbe: --accent (Cognac)
- Track-Farbe: --border (dunkel)
- Labels oben/unten: "1000 v." – "400 n."

### Popup (Leaflet)
- **Background**: --panel-bg
- **Border**: 1px --border
- **Border-radius**: 8px
- **Box-shadow**: `0 8px 32px rgba(0,0,0,0.7)` (Tiefe)
- **Padding**: 0.8rem innen
- **Max-width**: 300px

#### Popup-Inhalt
- **Header**: ID + Sprache Badge (farblich)
- **Place**: Antiker Name (Cormorant, groß) + Moderner Name (klein, grau)
- **Meta-Grid**: 2 Spalten (Material, Typ, Datierung, etc.)
- **Inschriftentext**: Mono, Cognac, `background: rgba(201,151,58,0.08)` (very subtle)
- **Übersetzung**: Kursiv, sekundär
- **Biblio**: Sehr klein, grau

### Loading Screen
- **Spinner**: Border + Top-Border (--accent) rotating
- **Text**: "Lade 14.000+ Inschriften…"
- **Font**: Cormorant Display
- Centered, über der Karte

### Error Banner
- **Background**: Dunkles Rot (#3d1a1a)
- **Border**: 1px rot (#7f2020)
- **Text**: Hell-Rot (#ff9999)
- **Position**: Oben-Mitte, über der Karte
- **Max-width**: 420px

---

## Interaction Patterns

### Karte Interaktion
1. **Scroll/Zwei-Finger**: Zoom in/out
2. **Drag**: Pan die Karte
3. **Click auf Marker**: Popup mit Details
4. **Click auf Cluster**: Zoom + Expand

### Filter Interaktion
1. **Suche eingeben**: Live-Filter (keine Enter-Taste nötig)
2. **Slider**: Zeitraum ändern (live update)
3. **Dropdown/Chip**: Sprache, Schreibrichtung, Alphabet wählen
4. **Reset**: Alle Filter auf Default

### Dekoration & Animation
- **Hover über Button**: Border wird sichtbar, Farbe heller
- **Pulse-Animation**: Loading-Text während Daten laden
- **Spin-Animation**: Loading-Spinner (0.8s loop)
- **Smooth Transitions**: Farben, Border (0.15s)

---

## Accessibility & Semantik

- ✅ Semantic HTML (header, nav, main, aside, section)
- ✅ Farbkontrast: Text/Background mind. WCAG AA
- ✅ Labels für Input-Felder (nicht nur Placeholder)
- ✅ Buttons mit aussagekräftigen Texten
- ✅ Alt-text für SVG/Icons
- ⚠️ Keine WAI-ARIA Labels (optional für Prototype)

---

## Visual Hierarchy

1. **Höchste Priorität**: Projekttitel (Cormorant Garamond, weiß)
2. **Wichtig**: Zähler (Cognac-Farbe, Bold)
3. **Navigation**: Nav-Buttons (grau, subtle)
4. **Filter-Labels**: Small, Uppercase, muted
5. **Karte**: Große, zentrale Canvas
6. **Popup-Details**: Graduierter Grauton (wichtig → unwichtig)

---

## Design-Entscheidungen & Begründung

| Entscheidung | Grund |
|--------------|-------|
| Dark Mode | Fokus auf Karte + akademische Ästhetik |
| Cognac-Akzent | Warm + Elegant (nicht schrill wie Neon) |
| Serif für Titel | Wissenschaftlich, klassisch, seriös |
| Mono für IDs/Text | Technisch, eindeutig (keine Ambiguität) |
| Clustering bei Zoom | 14.000+ Punkte ≠ zoomable ohne Clustering |
| Fixed Sidebar | Schneller Zugriff auf Filter (nicht scrollen) |
| Keine Tabs im Popup | Kompakt, schnell lesbar |
| OpenStreetMap Base | Open Source, zuverlässig |

