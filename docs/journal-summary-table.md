# Arbeitsprotokoll – Übersichtstabelle
## Hauptmeilensteine & technische Entscheidungen

| # | Datum | Phase | Kernproblem | Lösung | Technologie | Output | Status |
|----|-------|-------|------------|--------|-------------|--------|--------|
| 1 | 24.3. | **Konzepting** | Welcher Tech-Stack für 4 komplexe Ansichten? | React + Vite für State-Management | React 19 + Vite 8 | Roadmap | ✅ |
| 2 | 24.3. | **Datenanalyse** | CSV-Struktur unklar, 50+ Spalten | Manuell 15.076 Zeilen analysiert | Pandas + head -n | Schemaübersicht | ✅ |
| 3 | 24.3. | **Koordinaten-Fix** | 🔴 Koordinaten in falsches CRS (EPSG:3857) | Automatische Transformation EPSG:3857→WGS84 | pyproj Transformer | GeoJSON 14.891 Punkte | ✅ |
| 4 | 24.3. | **Encoding-Problem** | Sonderzeichen-Chaos (Hyères → HyÃ¨res) | Encoding-Erkennung: UTF-8→UTF-16→Latin-1→chardet | chardet Library | Alle Names correct | ✅ |
| 5 | 24.3. | **Normalisierung** | 30+ Varianten von "Schreibrichtung" | 7 Standardkategorien definieren | Regex + Mapping-Dict | Writing direction unified | ✅ |
| 6 | 24.3. | **Jitter-Algorithmus** | 14k Punkte auf 1.200 Orte → Überlagernde versteckt | Kreisförmige Verteilung um Originalposition | Math.sin/cos | 14.289 Punkte sichtbar | ✅ |
| 7 | 24.3. | **Dev-Setup** | PowerShell Execution Policy Fehler | VS Code Terminal auf CMD umstellen | Windows CMD | npm works | ✅ |
| 8 | 24.3. | **Projektstruktur** | npm-Befehle im falschen Ordner ausgeführt | Folder-Hierarchie verstehen: cd select-viz | Vite Project | Struktur OK | ✅ |
| 9 | 24.3. | **MVP1 Release** | Karte + Basisfilter funktionsfähig | App.jsx (zentral) + FilterPanel + MapView | React Components | localhost:5173 running | ✅ |
| 10 | 13.4. | **Popup-Fields** | Popups zeigen nur ID (minimal) | Neue Felder: Inschrift, Übersetzung, Quelle | convert_select_v3.py | Rich metadata | ✅ |
| 11 | 13.4. | **Überlagernde-Punkte** | Viele Orte mit 50+ Inschriften: nur 1 Punkt sichtbar | Cluster-Bibliothek: `react-leaflet-cluster` | npm package | Spiderfy on click | ✅ |
| 12 | 13.4. | **Zoom-Missbrauch** | User zoomen zu Zoom 18 → false precision (Fundorte auf Gemeinde zentralisiert) | maxZoom = 10 (Gemeindeebene ~50x50m) | Leaflet API | Scientific integrity | ✅ |
| 13 | 13.4. | **Cluster-Farben** | Cluster-Marker sind grau & undifferenziert | Farbe = dominante Sprache im Cluster | LANGUAGE_COLORS | Visually coded | ✅ |
| 14 | 13.4. | **Facies-Problem** | 2.331 "Unbekannt"-Einträge – was sind das? | Datenexploration: Typ-A = echte Inschriften ohne Sprache, Typ-B = leere Platzhalter | Python exploratory | Filter rule | ✅ |
| 15 | 13.4. | **Datenbereinigung** | 2.640 leere Fundort-Platzhalter (Rauschen) | Filter: `lang_raw=="" AND text_raw==""` | convert_select_v3.py | 11.975 clean records | ✅ |
| 16 | 13.4. | **GitHub-Fehler** | GeoJSON lädt nicht auf GitHub Pages (404) | Relative Pfade via `import.meta.env.BASE_URL` | Vite BASE_URL | Website online | ✅ |
| 17 | 13.4. | **Deployment** | Website muss live sein, Deadline 23:59 | GitHub Repository + Pages (base: '/Select-Viz/') | Git + GitHub | 7 commits pushed | ✅ |

---

## Kritische Erkenntnisse & Lessons Learned

### 🔴 Blocker, die hätten Problem sein können
1. **Koordinatensystem-Fehler** (Funde: würde alle Punkte falsch positionieren)
   - Erkannt durch: Zahlen-Größe überprüfen (X_dec=1.384.501 viel zu groß für Dezimalgrad)
   - Gelöst mit: pyproj EPSG-Transformation

2. **Encoding-Sonderzeichen** (hätte Datennamen unmöglich gemacht)
   - Erkannt durch: manuelle CSV-Inspektion
   - Gelöst mit: chardet + UTF-8-Hierarchy

3. **GitHub-Pfad broken** (Website funktioniert lokal, nicht online)
   - Erkannt durch: DevTools Network Tab (404 für.geojson)
   - Gelöst mit: Relative Base-URL statt hardcoded absolute Pfade

### 💡 Best Practices, die sich bewährt haben
| Praktik | Warum wichtig | Beispiel |
|---------|--------------|---------|
| **Separate Data + App Pipelines** | Daten ändern sich, Code auch – trennen decouples Komplexität | convert_select_v3.py läuft unabhängig |
| **State Management zentralisieren** | Später 4 View-Komponenten nötig – geteilter Filter-State | App.jsx als Single Source of Truth |
| **Normalisierung early** | Schreibrichtungs-Chaos hätte jeden Filter kompliziert gemacht | 7 Standard-Kategorien im Python-Skript |
| **Zoom-Limits respektieren** | Datengenauigkeit dokumentieren ← wissenschaftliche Integrität | maxZoom=10 weil Fundorte auf Gemeinde zentralisiert |
| **Cluster-Farben semantisch** | User versteht auf einem Blick: welche Sprache dominiert | LANGUAGE_COLORS im Cluster-Icon |

### ⚠️ Erkannte aber nicht gelöste Probleme
- 12.621 Schreibrichtung=Unknown (12.621 Zeilen) – unterrepräsentiert, aber legitim?
- Alphabet-Filter könnte detaillierter sein
- GeoJSON 8.4 MB könnte mit Tile-Vector-Server optimiert werden

---

## Zeitleiste
```
24. März 2026
├─ 09:00–11:00 Konzepting + Datenanalyse
├─ 11:00–12:30 Python-Skript (Koordinaten, Encoding, Normalisierung)
├─ 12:30–14:00 Dev-Setup (Node, VS Code, Vite)
└─ 14:00–16:00 MVP1 Release (React Komponenten)

13. April 2026
├─ 20:00–21:00 Clustering-Integration + Zoom-Limit
├─ 21:00–22:00 Facies-Analyse + Datenbereinigung
└─ 22:00–23:30 GitHub Deployment + Abgabe
```

**Total Entwicklungszeit: ~13 Stunden**
**Status: Production Ready (Prototyp)**

