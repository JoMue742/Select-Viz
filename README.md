# Select-Viz: Epigraphic Atlas of Ancient Europe

**Eine interaktive Webplattform für epigraphische Daten – über 14.000 antike Inschriften in Trümmersprachen Europas, visualisiert auf einer Karte.**

[![GitHub](https://img.shields.io/badge/GitHub-Select--Viz-blue)](https://github.com/JoMue742/Select-Viz)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green)](https://leafletjs.com)
[![Vite](https://img.shields.io/badge/Vite-8.0-purple)](https://vitejs.dev)

---

## 🗺️ Features

- **Interaktive Karte**: Leaflet-basiert, mit Cluster-View bei Zoom-out
- **Farbliche Sprachen-Codierung**: Jede Sprache hat eine Farbe (Etruscan→Orange, Oscan→Peach, etc.)
- **Intelligente Filter**:
  - Suche nach Ort, antiker Name, oder ID
  - Zeitraum-Slider (1000 v. Chr. – 400 n. Chr.)
  - Sprachen-, Alphabet-, Schreibrichtungs-Filter
- **Detail-Popups**: Bei Klick auf Marker zeigen sich Metadaten
- **Dual-Format GeoJSON**: Slim (11 MB) für Karte, Full (10 MB) für Forschung

---

## 📊 Daten

- **Umfang**: 16.266 Inschriften aus 40+ antiken Sprachen
- **Sprachen (Top-10)**: Etruskisch (59%), Iberisch (10%), Oskisch (5%)...
- **Zeitraum**: 1300 v. Chr. – 300 n. Chr.
- **Orte**: 1.200+ Fundorte
- **Format**: GeoJSON (WGS84)

---

## 🚀 Schnellstart

```bash
git clone https://github.com/JoMue742/Select-Viz.git
cd Select-Viz/select-viz
npm install
npm run dev
```

Browser öffnen: `http://localhost:5173/`

---

## 🔧 Tech Stack

React 19 • Vite 8 • Leaflet 1.9 • Node.js 16+

---

## 📚 Dokumentation

Siehe `/docs/`:
- [requirements.md](./docs/requirements.md) – Features & Anforderungen
- [data.md](./docs/data.md) – Datenstruktur & Statistiken
- [visual-design.md](./docs/visual-design.md) – Design-Entscheidungen
- [journal.md](./docs/journal.md) – Arbeitsprotokoll

---

## 🚢 Live: GitHub Pages

```
https://jomue742.github.io/Select-Viz/
```

---

## 📧 Credits

- **Johannes Mücke** (@JoMue742) – Entwicklung
- **SELECT-Team** – Datenquelle (EU-Projekt 2018–2023)
- **Libraries**: Leaflet, React, Vite

