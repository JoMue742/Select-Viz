# Journal: Select-Viz

## Arbeitsprotokoll (Milestone 2)

---

## Sitzung 1: Forschung & Materialsammlung
**Datum**: ~März 2026
- Verstanden: SELECT ist ein EU-Forschungsprojekt zu antiken "Trümmersprachen" (fragmentary languages)
- Gesammelt: 14.000+ Inschriften aus FileMaker-Datenbank
- Herausforderung erkannt: Daten müssen aus FileMaker-Format (.MER) in GeoJSON für Webkarte umgewandelt werden

### Probleme aufgekommen
- FileMaker-Koordinaten sind in Web Mercator (EPSG:3857), nicht WGS84
- CSV-Kodierung enthält Windows-spezifische Sonderzeichen (ä, ö, ü, é)
- Viele Daten über 30 Varianten von "Schreibrichtung" (sx, dx, bustrofedico, etc.) – inkonsistent

### Entscheidungen
- ✅ Python-Skript (`convert_select.py`) → dann v2, dann v3 für verbesserte Fehlerbehandlung
- ✅ React + Leaflet Karte als Frontend
- ✅ Dark-Mode Ästhetik (akademisch, seriös)

---

## Sitzung 2: Data Pipeline aufgebaut
**Datum**: ~März 2026
- **Implementiert**: convert_select.py (v1)
  - CSV-Parsing mit Pandas
  - Koordinaten-Transformation EPSG:3857 → EPSG:4326
  - Basis-Validierung (fehlende Koordinaten filtern)
  - GeoJSON-Output

- **Probleme**:
  - Nur Basis-Normalisierung
  - Keine Handling von Daten-Anomalien

---

## Sitzung 3: Daten-Normalisierung verbessert
**Datum**: ~März 2026
- **Implementiert**: convert_select_v3.py
  - ✅ Fortgeschrittene Encoding-Erkennung (chardet)
  - ✅ 30+ Varianten der Schreibrichtung normalisiert
  - ✅ Jitter-Algorithmus: Punkte an gleichen Koordinaten werden leicht versetzt (für Cluster-Sichtbarkeit)
  - ✅ Zwei Output-Formate: "Full" (alle Felder) + "Slim" (für Karte)

- **Probleme gelöst**:
  - Sonderzeichen jetzt korrekt
  - Schreibrichtung konsistent (ltr, rtl, boustrophedon, etc.)
  - Cluster-Punkte einzeln anklickbar

---

## Sitzung 4: React App gebaut
**Datum**: ~April 2026
- **Gebaut**:
  - `App.jsx`: Zentrale Komponente, GeoJSON laden, Zustand-Management
  - `MapView.jsx`: Leaflet-Karte mit farblichen Markern/Cluster
  - `FilterPanel.jsx`: Suche, Zeitraum-Slider, Sprachen/Alphabete/Schreibrichtung-Filter
  - `AboutPanel.jsx`: Projekt-Informationen, historischer Kontext

- **Design**:
  - Dark-Mode (--bg: #0f0f0f, --accent: #c9973a Cognac)
  - Responsive: Sidebar links, Karte rechts
  - Sprachen-Farbcodierung (Etruscan→Orange, Iberian→Rot, etc.)

- **Probleme unterwegs**:
  - GeoJSON-Datei sehr groß (~11 MB) → Browser-Performance
  - Filter-State Management komplex → Usememo für Optimierung
  - Koordinaten-Jitter anfangs zu aggressive → Radius kalibriert (0.007°)

---

## Sitzung 5: Erste Daten-Tests
**Datum**: 13.04.2026 (heute früh)
- Export aus FileMaker durchgeführt: 13-04-2026-Export.mer
- Convert-Skript lief: 16.266 Inschriften erfolgreich
- Größe: ~11 MB GeoJSON
- Spraches: 40+ erkannt
- Lokales Testen: Karte lädt, Filter funktionieren ✅

---

## Sitzung 6: GitHub Pages Deployment versuchst
**Datum**: 13.04.2026 (heute mittag)
- ✅ Vite Config angepasst: `base: '/Select-Viz/'`
- ✅ Build erstellt: `npm run build`
- ⚠️ GitHub Pages: Pfad-Problem entdeckt
  - Datei-Pfad war hart codiert: `/data/inscriptions_slim.geojson`
  - Mit Base-URL: Sollte `${import.meta.env.BASE_URL}data/inscriptions_slim.geojson` sein
- ✅ Fix: Angepasst in App.jsx
- ✅ Neu gebaut + pushed
- 🔄 Warten auf Pages-Deployment (GitHub braucht 1-2 Min)

### Commits
1. `Initial commit: Select-Viz with new data`
2. `Add dist folder for GitHub Pages deployment`
3. `Add docs folder for GitHub Pages`
4. `Fix geojson path for GitHub Pages`

---

## Sitzung 7: Dokumentation (jetzt)
**Datum**: 14.04.2026
- Generieren: requirements.md, data.md, visual-design.md, journal.md
- Basis-README bereits vorhanden
- Tutorial: Folgt (HTML/CSS erklären)

---

## Offene Probleme / To-Do

- ⚠️ GitHub Pages noch nicht live (404) – wahrscheinlich Cache, in 2-3 Min sollte es funktionieren
- 📝 HTML/CSS-Tutorial generieren
- 📝 README.md überarbeiten (prägnanter)
- 🔧 Mobil-Responsive (optional für Milestone 2)
- 🔧 Material-Filter (könnte noch dazu, aber optional)

---

## Lernergebnisse / Reflexion

### Was funktioniert gut
- ✅ Daten-Pipeline (FileMaker → Python → GeoJSON) ist robust
- ✅ React/Leaflet Integration funktioniert sauber
- ✅ Dark-Mode ästhetisch ansprechend
- ✅ Filter (Sprache, Zeitraum, Schreibrichtung) sind präzise
- ✅ Popup-Details aussagekräftig

### Was schwierig war
- ❌ Encoding-Probleme (Windows-1252 vs Latin-1) – gelöst mit chardet
- ❌ Koordinaten-Transformation (Web Mercator → WGS84) – gelöst mit pyproj
- ❌ GitHub Pages Base-URL Pitfall – Anfänger-Fehler, aber schnell gefunden

### Technische Schulden / Optional später
- [ ] TypeScript (aktuell nur JavaScript/JSX)
- [ ] Tests (Unit/Integration)
- [ ] Performance-Optimierung (lazy-loading für GeoJSON?)
- [ ] I18n (Mehrsprachigkeit: EN/DE)
- [ ] Statistik-Panel neben Karte

---

## Erfolgs-Metriken (für Milestone 2)

| Kriterium | Status |
|-----------|--------|
| Karte rendet | ✅ |
| Filter funktionieren | ✅ |
| Popup zeigt Details | ✅ |
| HTML/CSS dokumentiert | 🔄 (Tutorial folgt) |
| GitHub Repository | ✅ |
| Docs-Struktur | ✅ |
| Mindestens 4 Commits | ✅ (4 commits so weit) |
| Persönliches Tutorial | 🔄 (folgt) |
| Erklärbar für Präsentation | ✅ |

---

## Nächste Schritte (nach Milestone 2)

1. **Kurz-fristig**:
   - GitHub Pages liveschalten (Test)
   - Tutorial fertigstellen
   - Präsentation vorbereiten

2. **Mittel-fristig** (Semester):
   - JavaScript-Features hinzufügen (z.B. Export)
   - Weitere Visualisierungen (Zeitstrahl, statistics)
   - TypeScript-Migration

3. **Langfristig**:
   - Mit SELECT-Projekt koordinieren (Upstream)
   - Community-Beiträge berücksichtigen
   - Publikation für weiteren Unterricht

