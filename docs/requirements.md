# Requirements: Select-Viz

## Projektbeschreibung
**Select-Viz** ist eine interaktive Web-Visualisierungsplattform für epigraphische (Inschriften-)Daten aus dem EU-Projekt SELECT. Die Plattform macht über 14.000 antike Inschriften in "Trümmersprachen" Europas durch Karten und interaktive Filter zugänglich und richtet sich an Lehrende, Studierende und Forscher:innen.

---

## Must-Have Features (MVP)

### 1. Interaktive Karte
- [ ] Leaflet-basierte Karte zeigt alle Inschriften als Punkte
- [ ] Punkte sind farblich nach Sprache unterschieden
- [ ] Automatisches Clustering bei Zoom-out (mehrere Inschriften am gleichen Ort)
- [ ] Click auf einen Punkt zeigt Popup mit Inschrift, Übersetzung, Metadaten
- [ ] Karte ist zoombar und panbar
- [ ] Basemap: OpenStreetMap / CARTO

### 2. Filterbereich (linke Sidebar)
- [ ] **Suche**: Findet Inschriften nach Ortsname, antiker Name, ID
- [ ] **Sprachen-Filter**: Dropdown / Legende mit allen Sprachen im Dataset
- [ ] **Schreibrichtung**: Chips für ltr, rtl, Bustrophedon, Spiraling, Cruciform, Mixed, Unknown
- [ ] **Alphabet-System**: Dropdown für Etruscan, Venetian, Latin, etc.
- [ ] **Zeitraum**: Dual-Range-Slider von -1000 bis +400 n.Chr.
- [ ] **Reset-Button**: Alle Filter auf Default zurücksetzen
- [ ] Live-Zähler: "X von Y Inschriften" (filtered / gesamt)

### 3. Datenmodell
- [ ] GeoJSON-Format (inscriptions_slim.geojson)
- [ ] Mindestfelder: ID, Sprache, Alphabet, Schreibrichtung, Material, Ortsname, Datierung, Text, Übersetzung
- [ ] Koordinaten in WGS84 (Decimal Degrees)
- [ ] Jitter-Versatz für überlappende Punkte (damit Cluster-Punkte einzeln anklickbar bleiben)

### 4. UI-Struktur
- [ ] Header oben: Projekttitel, Navigations-Buttons (Karte / Über)
- [ ] Left Panel: Filter + Kontrollen
- [ ] Center: Karte mit Leaflet
- [ ] Responsive auf Desktop (Tablet/Mobil: nicht primär erfordert)

### 5. About-Seite
- [ ] Erklärung "Was sind Trümmersprachen?"
- [ ] Kulturhistorischer Kontext
- [ ] Credits zu Datenquelle (SELECT-Projekt)
- [ ] Technologie-Stack (Leaflet, React, etc.)
- [ ] Link zur Original-SELECT-Plattform

---

## Nice-to-Have Features (Erweiterungen)

- [ ] Mehrsprachigkeit (EN/DE)
- [ ] Export gefilterte Inschriften als CSV/JSON
- [ ] Zeitstrahl (Chart.js) parallel zur Karte
- [ ] Material-Filter (Stein, Keramik, Bronze, etc.)
- [ ] Heatmap-Modus neben Cluster-Modus
- [ ] Fulltext-Suche in Inschriftentexten
- [ ] Dark-Mode / Light-Mode Toggle
- [ ] Statistik-Panel (Sprachen-Verteilung, Zeitraum-Verteilung)

---

## Offene Fragen / Constraints

1. **Performance**: Bei 14.000+ Punkten: Clustering ist essentiell
2. **Daten**: Koordinaten sind Web-Mercator → müssen zu WGS84 konvertiert werden
3. **Datenvorbereitung**: Python-Skript (convert_select_v3.py) normalisiert Schreibrichtungen, macht Jitter
4. **Deployment**: GitHub Pages (Base-URL `/Select-Viz/`)
5. **Browser-Support**: Moderne Browser (Chrome, Firefox, Safari)

---

## Success Criteria (Milestone 2 - 14.04.2026)

- ✅ Karte rendert mit filterbaren Inschriften
- ✅ Mindestens einen Filter funktionsfähig (z.B. Sprache)
- ✅ Popup zeigt aussagekräftige Metadaten
- ✅ Code ist HTML/CSS erklärbar
- ✅ GitHub-Repository mit Struktur und Doku
- ✅ Persönliches HTML/CSS-Tutorial vorhanden
