# HTML-Code Erklärt – Anfänger-Guide mit Kommentaren

## Die kommentierte index.html

```html
<!-- ═══════════════════════════════════════════════════════════════════════════
     DOKUMENTTYP-DEKLARATION
     Sagt dem Browser: "Dies ist ein HTML5 Dokument (moderner Standard)"
     ═══════════════════════════════════════════════════════════════════════════ -->
<!doctype html>

<!-- ═══════════════════════════════════════════════════════════════════════════
     HTML-WURZELELEMENT & SPRACHATTRIBUT
     <html> = Das äußerste Container-Element, in dem ALLES andere sitzt
     lang="en" = Sagt dem Browser, dass die Seite auf Englisch ist
                 (wichtig für Screenreader & SEO)
     ═══════════════════════════════════════════════════════════════════════════ -->
<html lang="en">

  <!-- ═════════════════════════════════════════════════════════════════════════
       <head> SECTION
       Der Kopf der Seite – hier sitzt "Metadaten" (Infos über die Seite)
       Der Inhalt von <head> wird NICHT im Browser sichtbar angezeigt!
       Das ist nur für den Browser & Suchmaschinen.
       ═════════════════════════════════════════════════════════════════════════ -->
  <head>

    <!-- ───────────────────────────────────────────────────────────────────────
         CHARACTER ENCODING
         Sagt dem Browser: "Diese Seite benutzt UTF-8 Zeichen"
         UTF-8 = Ein Zeichensatz, der alle Sprachen der Welt unterstützt
                 (Deutsch: ä, ö, ü | Griechisch: Α, Β | Chinesisch: 中文 etc.)
         Wichtig: Ohne das funktionieren Sonderzeichen falsch
         ─────────────────────────────────────────────────────────────────────── -->
    <meta charset="UTF-8" />

    <!-- ───────────────────────────────────────────────────────────────────────
         FAVICON (Lieblingssymbol)
         Das kleine Bild oben links im Browser-Tab
         rel="icon" = "Das folgende ist ein Icon"
         type="image/svg+xml" = Der Dateityp: SVG (Vektor-Grafik, skalierbar)
         href="/favicon.svg" = Wo die Datei liegt (/ = im Projekt-Stammordner)
         ─────────────────────────────────────────────────────────────────────── -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- ───────────────────────────────────────────────────────────────────────
         VIEWPORT META-TAG (für Mobile)
         Sagt dem Browser: "Passe die Seite an die Bildschirmgröße an"
         width=device-width = Breite = Bildschirmbreite des Geräts
         initial-scale=1.0 = Startzoom = 100% (nicht rausgezoomt/reingezoomt)
         Wichtig: Ohne das sieht eine Seite auf dem Handy komisch aus
         ─────────────────────────────────────────────────────────────────────── -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- ───────────────────────────────────────────────────────────────────────
         ROBOTS META-TAG (für Suchmaschinen)
         Sagt Google & andere Suchmaschinen: "Indexiert diese Seite NICHT"
         content="noindex, nofollow" = Zwei Befehle:
           - noindex = "Zeige diese Seite NICHT in Google Suchergebnisse"
           - nofollow = "Folge Links auf dieser Seite nicht"
         Grund: Das ist ein Student-Projekt (kein öffentliches Portal)
         ─────────────────────────────────────────────────────────────────────── -->
    <meta name="robots" content="noindex, nofollow" />

    <!-- ───────────────────────────────────────────────────────────────────────
         SEITEN-TITEL
         Das ist der Text, der im Browser-Tab oben angezeigt wird
         Auch wichtig für: Lesezeichen, Google Suchergebnisse
         ─────────────────────────────────────────────────────────────────────── -->
    <title>select-viz</title>

  </head>
  <!-- </head> = Ende des Kopfes -->

  <!-- ═════════════════════════════════════════════════════════════════════════
       <body> SECTION
       Der Körper der Seite – HIER wird der sichtbare Inhalt angezeigt
       Alles was zwischen <body> und </body> sitzt, sieht der User
       ═════════════════════════════════════════════════════════════════════════ -->
  <body>

    <!-- ───────────────────────────────────────────────────────────────────────
         ROOT DIV (für React)
         <div id="root"></div> = Ein leerer Container mit der ID "root"
         Warum leer? Weil React später den Inhalt dynamisch einfügt!
         
         Ablauf:
         1. Browser lädt diese HTML Datei
         2. Der <div id="root"></div> ist leer
         3. JavaScript-Datei (main.jsx) wird geladen
         4. React füllt diesen <div> mit Komponenten
         5. Die ganze Webseite entsteht durch JavaScript!
         
         ID = eindeutiger Name für dieses Element
            → JavaScript kann später mit "getElementById('root')" darauf zugreifen
         ─────────────────────────────────────────────────────────────────────── -->
    <div id="root"></div>

    <!-- ───────────────────────────────────────────────────────────────────────
         JAVASCRIPT-EINSTIEGSPUNKT
         <script type="module" src="/src/main.jsx"></script>
         
         Das ist der "Startknopf" für die ganze Anwendung!
         
         type="module" = Das ist moderner JavaScript (ES6 Module)
                         → Erlaubt import/export Statements
                         
         src="/src/main.jsx" = Wo die JavaScript-Datei liegt
                               /src/ = Ordner namens "src"
                               main.jsx = Datei namens "main"
                               (JSX ist React-JavaScript)
         
         Was passiert wenn diese Zeile ausgeführt wird:
         1. Browser lädt die Datei /src/main.jsx
         2. React startet
         3. React findet den <div id="root">
         4. React rendert die App-Komponente in diesen <div>
         5. Die Seite wird lebendig und interaktiv!
         ─────────────────────────────────────────────────────────────────────── -->
    <script type="module" src="/src/main.jsx"></script>

  </body>
  <!-- </body> = Ende des sichtbaren Inhalts -->

</html>
<!-- </html> = Ende des gesamten Dokuments -->
```

---

## Glossar: Wichtigste HTML-Begriffe für Anfänger

### A
**Attribut**
- Ein Zusatz-Information in einem HTML-Tag
- Format: `name="value"`
- Beispiele: `lang="en"`, `id="root"`, `href="/path"`
- Ändern das Verhalten des Tags

**Auszeichnung (Markup)**
- Ein englischer Begriff: "to mark" = kennzeichnen
- HTML verwendet `<Tags>` um Inhalte zu kennzeichnen
- Z.B.: `<title>` kennzeichnet den Seitentitel

---

### B
**Body**
- Der "Körper" der Webseite
- Alles zwischen `<body>` und `</body>` wird auf dem Bildschirm angezeigt
- Im Gegensatz zu `<head>` (nicht sichtbar)

**Browser**
- Das Programm, das HTML anzeigt (Chrome, Firefox, Safari, Edge)
- Der Browser interpretiert die HTML-Tags und zeichnet die Seite

---

### C
**Character Encoding** (Zeichensatz)
- Ein Standard für digitale Buchstaben/Zeichen
- UTF-8 = Der moderne Standard (unterstützt alle Sprachen)
- `<meta charset="UTF-8">` sagt dem Browser: "Diese Seite benutzt UTF-8"

**CSS**
- "Cascading Style Sheets" = Formatvorlagen für HTML
- Wenn HTML die Struktur ist, dann ist CSS das Design (Farben, Schriftarten, Abstände)
- In unserer App: 4 `.css` Dateien

---

### D
**Div**
- Kurz für "Division" (Bereich/Abschnitt)
- Ein neutraler Container zum Gruppieren von Inhalten
- `<div>` hat von Natur aus kein Design (nur ein leerer Block)
- Z.B.: `<div id="root">` ist ein Div mit der ID "root"

**DOCTYPE**
- Die erste Zeile einer HTML-Datei
- `<!doctype html>` sagt: "Dies ist HTML5 (moderner Standard)"
- Sonst könnte der Browser in einen komischen "Kompatibilitätsmodus" gehen

---

### E
**Element**
- Ein komplettes HTML-Stück: `<tag>Inhalt</tag>`
- Besteht aus: öffnendem Tag + Inhalt + schließendem Tag
- Z.B.: `<title>select-viz</title>` ist ein Element

**Event**
- Etwas, das der User macht (Klick, Scroll, Tippen)
- JavaScript kann auf Events reagieren
- Später im Code: "Wenn User auf Cluster klickt → öffne Spiderfy"

---

### F
**Favicon**
- Das kleine Icon im Browser-Tab (oben links)
- "Favorite Icon" = das Symbol der Website
- `<link rel="icon">` verlinkt darauf

---

### G
**Glossar**
- Eine Liste von Fachbegriffen mit Erklärungen
- Das hier!

---

### H
**Head**
- Der "Kopf" der Webseite
- Alles zwischen `<head>` und `</head>` ist **NICHT sichtbar**
- Enthält Metadaten: Titel, Zeichensatz, Icons, Suchmaschinen-Infos

**HTML**
- "HyperText Markup Language" = Auszeichnungssprache
- Verwendet `<Tags>` um Inhalte zu strukturieren
- HTML = Struktur
- CSS = Design
- JavaScript = Interaktivität

---

### I
**ID**
- Ein eindeutiger Name für ein Element (max. 1x pro Seite)
- Format: `id="name"`
- JavaScript kann damit das Element finden: `getElementById('root')`
- Im Gegensatz zu `class` (kann mehrfach vorkommen)

**Index**
- Im SEO-Kontext: "Google indexiert diese Seite" = zeigt sie in Suchergebnissen
- `<meta name="robots" content="noindex">` = nicht indexieren

---

### J
**JavaScript / JSX**
- JavaScript: Programmiersprache für Web
- JSX: JavaScript + XML (Mischung aus JavaScript & HTML-ähnlicher Syntax)
- Macht die Seite interaktiv (z.B. Karte, Filter)

---

### L
**Link-Tag**
- `<link>` verlinkt externe Ressourcen (CSS, Icons, Fonts)
- Format: `<link rel="type" href="path">`
- Unterschied zu `<a>` (für sichtbare Links)

---

### M
**Meta-Tag**
- "Meta" = Über etwas
- Meta-Tags geben Infos **über** die Seite (nicht den sichtbaren Inhalt)
- Beispiele:
  - `<meta charset>` = Zeichensatz
  - `<meta name="viewport">` = Mobile-Einstellungen
  - `<meta name="robots">` = Suchmaschinen-Anweisungen

**Module**
- Ein wiederverwendbarer Code-Block
- `type="module"` bei Script = moderner JavaScript-Standard
- Erlaubt `import` und `export`

---

### N
**Nested** (verschachtelt)
- Wenn HTML-Tags ineinander sitze
- Z.B.: `<html><head><title>text</title></head></html>`
- Jedes öffnende Tag braucht ein schließendes Tag in der richtigen Reihenfolge

---

### P
**Path** (Pfad)
- Die Adresse zu einer Datei
- `/src/main.jsx` = Ordner "src", Datei "main.jsx"
- `/` = von Stammordner (Projekt-Root)

---

### R
**React**
- Ein JavaScript-Framework (Werkzeug für Webseiten)
- Macht es einfach, interaktive Seiten zu bauen
- Funktioniert mit "Komponenten" (wieder verwendbare Bausteine)

**Responsive**
- Eine Seite, die auf allen Geräten gut aussieht
- Mobil: klein und vertikal
- Desktop: groß und horizontal
- Das `<meta viewport>` Tag macht das möglich

**Root**
- Der oberste Container (= Wurzel des Baumes)
- `<div id="root">` ist der Root für React
- React füllt diesen Root mit der ganzen App

---

### S
**Script**
- Ein Stück Code (meist JavaScript)
- `<script>` Tag lädt ein JavaScript-Programm
- Beispiel: `<script src="/src/main.jsx"></script>`

**SEO**
- "Search Engine Optimization" = Suchmaschinen-Optimierung
- Wie gut wird die Seite in Google angezeigt?
- `<meta name="robots">` kontrolliert das

---

### T
**Tag**
- Die Grundeinheit von HTML
- Format: `<tagname>` oder `<tagname attribute="value">`
- Z.B.: `<div>`, `<title>`, `<meta>`

**Title**
- Der Name der Seite
- Wird im Browser-Tab oben angezeigt
- Auch wichtig für Google-Suchergebnisse

---

### U
**UTF-8**
- Ein internationaler Zeichensatz-Standard
- Unterstützt: Deutsch (äöü), Griechisch (Ελληνικά), Chinesisch (中文), Emoji (😀) etc.
- Moderner Standard seit ~2010

**URL**
- "Uniform Resource Locator" = Internetadresse
- Beispiel: `https://jomue742.github.io/Select-Viz/`

---

### V
**Viewport**
- Der sichtbare Bereich des Bildschirms
- `<meta name="viewport">` passt die Seite an verschiedene Viewport-Größen an
- Wichtig für Mobile Devices

---

### X
**XML**
- "eXtensible Markup Language"
- Ähnlich wie HTML, aber noch flexibler
- JSX = HTML-ähnliche Syntax im JavaScript (= HTML + XML-Konzept)

---

### Z
**Zustand (State)**
- In JavaScript/React: der aktuelle Zustand einer Komponente
- Z.B.: "Filter ist auf Sprache=Etruscan" = ein Zustand
- Ändert sich mit User-Aktionen

---

## Die Struktur visualisiert

```
index.html (diese Datei)
    ↓
<!doctype html>      ← "Das ist HTML5"
    ↓
<html lang="en">     ← Äußerstes Container-Element
    ├─ <head>        ← (nicht sichtbar) Metadaten
    │   ├─ <meta charset>      ← Zeichensatz
    │   ├─ <meta name="viewport"> ← Mobile-Anpassung
    │   ├─ <meta name="robots"> ← SEO-Anweisung
    │   ├─ <title>              ← Browser-Tab Name
    │   └─ <link rel="icon">    ← Favicon
    │
    └─ <body>        ← (sichtbar) Inhalt
        ├─ <div id="root">      ← Hier wird React die App einfügen
        │
        └─ <script type="module"> ← "Starte React!"
                                  ↓
                        /src/main.jsx
                                  ↓
                        React rendert App
                                  ↓
                        Webseite wird lebendig!
```

---

## Checkliste: Was macht jede Zeile?

| Zeile | HTML-Tag | Funktion |
|-------|----------|----------|
| 1 | `<!doctype html>` | Browser mitteilen: "Nutze HTML5 Standard" |
| 2 | `<html lang="en">` | Webseite beginnt, Sprache = Englisch |
| 4 | `<meta charset="UTF-8">` | Alle Sprachen der Welt unterstützen (ä, ö, ü, Griechisch, Chinesisch...) |
| 5 | `<link rel="icon">` | Das Tiny-Icon im Browser-Tab |
| 6 | `<meta name="viewport">` | Handy-freundlich machen (responsive) |
| 7 | `<meta name="robots">` | Google: "Indexiert diese Seite NICHT" (Student-Projekt) |
| 8 | `<title>` | Text im Browser-Tab oben |
| 10 | `<div id="root">` | Platzhalter für React - hier wird die App eingefügt |
| 11 | `<script type="module">` | **Startknopf!** Hier beginnt die ganze Anwendung |

---

## Häufig gestellte Fragen

**F: Warum ist der `<div id="root">` leer?**
A: Weil React JavaScript ist - es baut die Seite zur Laufzeit (nicht vorher in HTML). Zuerst ist der Div leer, dann füllt React ihn mit Komponenten.

**F: Was bedeutet `type="module"`?**
A: Das ist modernes JavaScript (ES6 Standard). Es erlaubt `import` und `export` Statements, damit man Code in mehrere Dateien aufteilt.

**F: Warum `<meta name="robots" content="noindex">`?**
A: Damit Google diese Seite NICHT in Suchergebnisse aufnimmt. Das ist ein Student-Projekt (kein öffentliches Portal).

**F: Was passiert wenn ich das `<meta charset>` lösche?**
A: Sonderzeichen wie "Hyères" werden falsch angezeigt ("Hyâ¨res" oder ähnlich). Alle Sprachen außer Englisch gehen kaputt.

**F: Kann ich den Titel "select-viz" ändern?**
A: Ja! Ersetze die Zeile `<title>select-viz</title>` mit z.B. `<title>SELECT Visualization</title>` - der Browser-Tab zeigt dann den neuen Namen.

---

**Stand:** 20. April 2026  
**Zielgruppe:** Anfänger mit minimalen HTML-Kenntnissen  
**Schwerpunkt:** Erklären WAS der Code macht (nicht nur technisch, sondern auch WARUM)
