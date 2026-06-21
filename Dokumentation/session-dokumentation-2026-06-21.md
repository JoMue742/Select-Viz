# Session-Dokumentation: Assignment 3 – 21. Juni 2026

## Überblick

In dieser Session wurde das Projekt **Select-Viz** (Epigraphic Atlas of Ancient Europe) für die Abgabe von Assignment 3 vorbereitet, deployed und verbessert.

**Repository:** https://github.com/JoMue742/Select-Viz  
**Live-URL:** https://jomue742.github.io/Select-Viz/  
**Abgabe:** 21.06.2026, 23:59 Uhr (Moodle)

---

## 1. Ausgangslage

Das Projekt bestand aus zwei Versionen:
- `select-viz/` – React-App (finale Abgabeversion)
- `select-viz-vanilla/` – Vanilla JS Version (Assignment 2)

Das Git-Repository befand sich nicht im Hauptordner, sondern in `select-viz/`. GitHub Pages deployed aus dem `docs/`-Ordner.

---

## 2. Assignment-3-Anforderungen: Umgesetzte Punkte

### 2.1 HTML & Semantik
- `<main>`, `<header>`, `<nav>`, `<footer>`, `<aside>`, `<section>`, `<article>` vorhanden
- Eine `<h1>` pro Seite
- Meta-Description in `index.html` ergänzt

### 2.2 Accessibility (WCAG 2.1 AA)
**Kontrast-Fixes in `App.css`:**
- Dark Mode: `--text-muted` von `#5a5450` auf `#8a8380` (besserer Kontrast)
- Dark Mode: `--text-secondary` von `#a89f94` auf `#b8afa4`
- Light Mode: `--text-secondary` von `#5a5450` auf `#3d3a38`
- Light Mode: `--text-muted` von `#a89f94` auf `#6b6460`

**Form-Label-Fixes in `FilterPanel.jsx`:**
- `<label htmlFor="dateFromInput">` ergänzt
- `<label htmlFor="dateToInput">` mit `.sr-only`-Klasse ergänzt
- Redundante `aria-label`-Attribute entfernt

**WAVE-Scan Ergebnisse:**
- Vor den Fixes: 4 Errors, 25 Contrast Errors
- Nach den Fixes: Kontrast-Fehler reduziert (gecachte Ergebnisse variierten)

**Neue CSS-Klasse `.sr-only`** für screenreader-only Labels.

### 2.3 Responsive Design
- Breakpoints bei 768px und 1024px in `App.css`
- `focus-visible`-Styles für Tastaturnavigation

### 2.4 Lizenz
- `LICENSE` (MIT) im Root-Verzeichnis erstellt
- `public/LICENSE.txt` für die deployete App erstellt

### 2.5 Dokumentation
- `docs/accessibility-wcag-wave-checklist.md` erstellt
- `README.md` wiederhergestellt (war versehentlich gelöscht worden)

### 2.6 Deployment
- GitHub Pages aus `docs/`-Ordner
- Workflow: `npm run build` → `Copy-Item dist/* docs/` → `git push`

---

## 3. Funktionale Verbesserungen

### 3.1 Timeline
- **Standard: deaktiviert** – `useState(false)` statt `useState(true)` in `App.jsx`
- **Debouncing** – Filter-Update mit 150ms Verzögerung via `useRef`
- **Animations-Interval** von 100ms auf 200ms erhöht, Schrittgröße von 5 auf 10 Jahre
- **Auto-Stop** bei Jahr 400 CE

### 3.2 Footer-Links
- Documentation-Link: zeigt jetzt auf `https://github.com/JoMue742/Select-Viz/blob/main/README.md`
- License-Link: zeigt auf `LICENSE.txt` in der deployeten App

### 3.3 About-Section Scroll
- Problem: `app-body` hatte `overflow: hidden`, About-Inhalt war abgeschnitten
- Fix: Dynamische CSS-Klasse `app-body--about` wenn About-Tab aktiv
- `App.jsx`: `className={`app-body${activeTab==="about"?" app-body--about":""}`}`
- `App.css`: `.app-body--about { overflow-y: auto; }`

### 3.4 Performance / GeoJSON
- `inscriptions_slim.geojson` von 10.9MB auf 8.3MB reduziert
- Nicht verwendete Felder entfernt: `txt_writingDirection`, `arch_orObjectType`, `arch_typeOfInscription`, `chr_isoMinLang`, `chr_isoMaxLang`, `select_place`
- Verbleibende Felder: `id`, `lan_language`, `loc_spotAncient`, `loc_municipality`, `loc_state`, `loc_spotModern`, `loc_region`, `txt_writingSystem`, `chr_min`, `chr_max`, `arch_material`, `writing_direction`, `txt_typeOfText`, `char_count`, `txt_text`, `txt_Translation`, `ref_biblio`
- 16.266 Features – Datenmenge bleibt grundsätzliches Performance-Problem
- **gzip-Komprimierung** via `vite-plugin-compression` getestet, aber verworfen: GitHub Pages setzt keinen `Content-Encoding: gzip` Header, daher lädt der Browser die `.gz`-Dateien nicht automatisch. Das Plugin komprimierte außerdem nur JS/CSS-Assets, nicht die GeoJSON-Datei.

### 3.5 Assignment-2 Integration
- `public/assignment-2/` mit Vanilla-JS-Version in die App integriert

---

## 4. Bekannte Lücken (für Fazit-Folie)

| Problem | Status | Anmerkung |
|---|---|---|
| Performance GeoJSON (8.3MB) | Offen | Echte Lösung: API/Pagination |
| WAVE Contrast Errors | Teilweise | Farben verbessert, aber noch Restfehler |
| WAVE Form Labels | Teilweise | sr-only Labels ergänzt |
| Very small text (WAVE) | Offen | Design-Entscheidung, bewusst klein |
| Timeline hängt bei vielen Markern | Verbessert | Debouncing hilft, aber Grundproblem bleibt |

---

## 5. Commits dieser Session

| Commit | Inhalt |
|---|---|
| `Assignment 3: Semantik, Accessibility, Responsive, Lizenz` | Hauptänderungen |
| `README wiederherstellen` | README war versehentlich gelöscht |
| `Fix WAVE accessibility: contrast colors and form labels` | Kontrast + Labels |
| `Fix form labels: remove duplicate aria-label` | Aufräumen |
| `Timeline off by default, fix footer links` | UX-Verbesserungen |
| `Performance: slim GeoJSON, timeline off by default, fix footer links` | Datei-Optimierung |
| `Deploy: update docs with latest build` | Deployment-Fix |
| `Fix About scroll, slow down timeline animation` | About-Scroll |
| `Fix About scroll, fix app-body dynamic class` | CSS-Fix |
| `Fix timeline debounce, improve performance` | Timeline-Performance |

---

## 6. Technische Erkenntnisse

- **GitHub Pages + React:** Deploy erfordert `npm run build` + manuelles Kopieren in `docs/`-Ordner
- **WAVE + React:** WAVE scannt manchmal gecachten HTML vor React-Rendering – Inkognito-Fenster für genaue Ergebnisse
- **PowerShell vs CMD:** Mehrzeilige Befehle nur in PowerShell möglich; `.cjs`-Extension nötig wenn `"type": "module"` in `package.json`
- **GeoJSON-Performance:** 16.266 Features × 8.3MB = Grundproblem; echte Lösung wäre serverseitiges Filtern oder Tile-basiertes Laden

---

## 7. Verwendete Tools & Technologien

- React + Vite
- Leaflet / react-leaflet / react-leaflet-cluster
- GitHub Pages
- WAVE (wave.webaim.org) für Accessibility-Prüfung
- Node.js für Datei-Manipulation
- PowerShell / CMD für Build & Deploy

---

*Dokumentiert am 21.06.2026*
