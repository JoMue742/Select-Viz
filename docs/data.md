# Data: Select-Viz

## Datenquelle
**SELECT Database Export** – EU-Projekt für Trümmersprachen Europas
- Export-Datum: 13.04.2026 / 13.04.2026 (2 Exporte getestet)
- Format: FileMaker .MER (Tab-separated CSV-ähnlich)
- Kodierung: Windows-1252 / Latin-1 (erkannt automatisch)

---

## Rohdaten (input)

### Dateien
| Datei | Größe | Zeilen | Format | Status |
|-------|-------|--------|---------|--------|
| 13-04-2026-Export.mer | ~5 MB | 16,765 | CSV/MER (.mer) | ✅ Aktuell |
| 13-01-2026-Export.mer | ~3 MB | 15,076 | CSV/MER (.mer) | (älter) |

### Feldstruktur (Original)
```
export, id, lan_language, txt_writingDirection, txt_writingSystem,
arch_material, arch_orObjectType, arch_typeOfInscription,
chr_min, chr_max, chr_isoMinLang, chr_isoMaxLang,
loc_municipality, loc_spotAncient, loc_spotModern, loc_state, loc_region,
txt_text, txt_Translation, txt_typeOfText, ref_biblio, select_place,
X_dec, Y_dec
```

### Datenprobleme & Lösungen
| Problem | Ursache | Lösung |
|---------|---------|--------|
| Sonderzeichen (é, à, ü) verzerrt | FileMaker Windows-Kodierung | Chardet: UTF-8 / Latin-1 Auto-Erkennung |
| Mehrfacheinträge am gleichen Ort | Archive haben Cluster von Funden | Jitter: Punkte in Kreis versetzt (~700m Radius) |
| Koordinaten sind Web-Mercator (EPSG:3857) | FileMaker export-Standard | Transformer: EPSG:3857 → EPSG:4326 (pyproj) |
| Schreibrichtung: 30+ Varianten (sx, dx, bustruof, etc.) | Inkonsistente Eingabe | Normalisierung: → ltr, rtl, boustrophedon, spiraling, cruciform, other, unknown |
| Export-Flag ≠ 1 | Einträge ohne explizites Export-Flag | Filter: nur `export == "1"` verwendet |
| Facies-Einträge | Nicht relevante Klassifizierung | Filter: `lan_language NOT LIKE "%facies%"` |

---

## Verarbeitungsschritte (convert_select_v3.py)

### 1. Encoding-Erkennung
```python
detect_encoding(path)
→ Versucht: UTF-8 → UTF-16 → Latin-1 → cp1252
→ Falls chardet: nutze Konfidenz > 70%
→ Fallback: Latin-1
```

### 2. CSV-Parsing
- Separator: `;` (Semikolon)
- Dtype: Alle Felder als String (vorerst)
- Bad-Lines: Warning (nicht Fehler)

### 3. Datenfilter
```
Zeile überspringen, wenn:
- export != "1"                      (Skip: 286–291)
- "facies" in lan_language           (Skip: 0–?)
- X_dec oder Y_dec leer/invalid      (Skip: 210–213)
```

### 4. Koordinaten-Transformation
```python
if abs(x) < 180 and abs(y) < 90:
    # Schon WGS84
    lon, lat = x, y
else:
    # Web Mercator → WGS84
    lon, lat = Transformer.transform(x, y)
# Sanity Check: -180 ≤ lon ≤ 180, -90 ≤ lat ≤ 90
```

### 5. Schreibrichtung-Normalisierung
```
Eingabe → Output:
"dx", "destrorso", "left to right"      → "ltr"
"sx", "sinistrorso", "right to left"    → "rtl"
"bustofedon" (alle Varianten)           → "boustrophedon"
"spirale", "spiral"                     → "spiraling"
"croce", "crucif"                       → "cruciform"
"dx/sx", "dx // sx"                     → "other"
"?", "n.d.", "incerto", etc.            → "unknown"
```

### 6. Jitter-Versatz
```
Gruppiere nach gerundete Koordinaten (4 Dezimalstellen ≈ 11m)
Für Gruppen mit >1 Punkt:
  - Ordne Punkte in Kreis um Original
  - Radius: 0.007° ≈ 700m
  - Abwechslung innen/außen für Verteilung
```

### 7. GeoJSON-Generierung
Zwei Output-Dateien:
1. **inscriptions.geojson** (Full) 
2. **inscriptions_slim.geojson** (Slim für Karte)

---

## Output-Datenformat

### inscriptions_slim.geojson (~ 11 MB)
```json
{
  "type": "FeatureCollection",
  "metadata": {
    "source": "SELECT database",
    "total_features": 16266,
    "coordinate_system": "WGS84 (EPSG:4326)"
  },
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [13.2456, 42.8901]
      },
      "properties": {
        "id": "INS-0001",
        "lan_language": "Etruscan",
        "txt_writingSystem": "Etruscan",
        "arch_material": "stone",
        "arch_typeOfInscription": "funerary",
        "chr_min": -300,
        "chr_max": -200,
        "loc_municipality": "Volterra",
        "loc_spotAncient": "Volterra",
        "loc_spotModern": "Volterra, IT",
        "loc_region": "Tuscany",
        "txt_typeOfText": "funerary",
        "txt_text": "mi aviles tece vel ziles",
        "txt_Translation": "(funerary inscription)",
        "ref_biblio": "CIE I, 4.1",
        "writing_direction": "rtl",
        "char_count": 24
      }
    },
    ...
  ]
}
```

### Feld-Dokumentation

| Feld | Typ | Beispiel | Beschreibung |
|------|-----|---------|-------------|
| id | String | "INS-0001" | Eindeutige ID aus SELECT |
| lan_language | String \| null | "Etruscan", "Oscan" | Sprache der Inschrift |
| txt_writingSystem | String \| null | "Etruscan", "Latin" | Schriftsystem/Alphabet |
| arch_material | String \| null | "stone", "ceramic" | Trägermaterial |
| arch_typeOfInscription | String \| null | "funerary", "votive" | Inschrift-Typ |
| chr_min, chr_max | Integer \| null | -300, -200 | Datierung (Jahre; negativ = v. Chr.) |
| loc_municipality | String \| null | "Volterra" | Gemeinde/Stadt |
| loc_spotAncient | String \| null | "Volterra" | Antiker Ortsname |
| loc_spotModern | String \| null | "Volterra, IT" | Moderner Ortsname |
| loc_region | String \| null | "Tuscany" | Region/Bundesland |
| txt_typeOfText | String \| null | "funerary", "religious" | Texttyp |
| txt_text | String \| null | "mi aviles tece vel..." | Transkribierter Text |
| txt_Translation | String \| null | "(funerary inscription)" | Übersetzung / Interpretation |
| ref_biblio | String \| null | "CIE I, 4.1" | Bibliographische Referenz |
| writing_direction | String | "rtl", "ltr", "boustrophedon" | Normalisierte Schreibrichtung |
| char_count | Integer | 24 | Anzahl Zeichen (ohne Whitespace) |

---

## Statistiken (13.04.2026 Export)

### Gesamt
- **Total Input**: 16,765 Zeilen
- **Output**: 16,266 Features ✅
- **Übersprungen (export≠1)**: 286
- **Übersprungen (keine Koordinaten)**: 213
- **Übersprungen (Facies)**: 0

### Sprachen (Top 10)
| Sprache | Anzahl | Anteil |
|---------|---------|--------|
| Etruscan | 9,623 | 59% |
| Iberian | 1,559 | 10% |
| Oscan | 806 | 5% |
| Messapic | 661 | 4% |
| Faliscan | 425 | 3% |
| Venetic | 421 | 3% |
| Gaulish | 418 | 3% |
| Cisalpine Celtic | 385 | 2% |
| Raetic | 338 | 2% |
| Phoenician | 332 | 2% |
| ... + 37 weitere | 1,298 | 8% |

### Schreibrichtung
| Richtung | Anzahl |
|----------|--------|
| Unknown | 14,305 |
| → Links nach Rechts (ltr) | 608 |
| ← Rechts nach Links (rtl) | 1,279 |
| ↔ Bustrophedon | 32 |
| ↻ Spiraling | 5 |
| ✛ Cruciform | 1 |
| ~ Mixed/Other | 36 |

### Datierung
- Min: -1300 (v. Chr.)
- Max: +300 (n. Chr.)
- Median: -500 bis -100

---

## Dateistruktur im Repository

```
select-viz/
├── public/
│   └── data/
│       └── inscriptions_slim.geojson    ← Karte lädt von hier
├── docs/
│   └── data/
│       └── (optionale Schema-Dokumentation)
└── ../Data/                             (local, nicht im Repo)
    ├── 13-04-2026-Export.mer            ← Rohdaten
    ├── inscriptions.geojson             ← Full (nicht auf Karte)
    └── inscriptions_slim.geojson        ← Backup
```

---

## Qualitätssicherung

- ✅ Alle Features haben gültige Koordinaten (WGS84)
- ✅ NaN / Null-Werte korrekt behandelt
- ✅ Jitter garantiert Sichtbarkeit overlappender Punkte
- ✅ Sprachen-Normalisierung für Legenden-Rendering
- ✅ Zeitraum-Slider basiert auf min/max der chr_min/chr_max
- ⚠️ Facies-Sprachen ausgesschlossen (optional)
- ⚠️ Einige "Unbekannt"-Werte wegen fehlender Original-Daten
