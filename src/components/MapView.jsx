import { useMemo, useRef } from "react";
import { MapContainer, TileLayer, useMap, Popup, CircleMarker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ── Farben pro Sprache ────────────────────────────────────────────────────────
export const LANGUAGE_COLORS = {
  "Etruscan":                    "#e07b39",
  "Iberian":                     "#e63946",
  "Oscan":                       "#f4a261",
  "Messapic":                    "#9b5de5",
  "Faliscan":                    "#f7c59f",
  "Gaulish":                     "#2a9d8f",
  "Venetic":                     "#4cc9f0",
  "Cisalpine Celtic":            "#80b918",
  "Raetic":                      "#ff6b6b",
  "Camunic":                     "#c77dff",
  "Latin":                       "#adb5bd",
  "Celtiberian":                 "#e9c46a",
  "Southwestern Palaeohispanic": "#e76f51",
  "Palaeo-Sabellic":             "#b7b7a4",
  "Umbrian":                     "#dda15e",
  "Phoenician":                  "#606c38",
  "Greek":                       "#48cae4",
  "Lusitanian":                  "#52b788",
  "Thracian":                    "#e9d8a6",
  "Ancient Macedonian":          "#94d2bd",
  "Illyrian":                    "#7b9e87",
  "Vasconic":                    "#ff99c8",
};

export function getColor(lang) {
  if (!lang) return "#778da9";
  for (const [key, color] of Object.entries(LANGUAGE_COLORS)) {
    if (lang.startsWith(key)) return color;
  }
  return "#778da9";
}

const DIR_LABELS = {
  ltr:           "→ Links nach Rechts",
  rtl:           "← Rechts nach Links",
  boustrophedon: "↔ Bustrophedon",
  spiraling:     "↻ Spiralförmig",
  cruciform:     "✛ Kreuzförmig",
  other:         "~ Gemischt",
};

function formatYear(y) {
  if (y === null || y === undefined) return "?";
  return y < 0 ? `${Math.abs(y)} v. Chr.` : `${y} n. Chr.`;
}

// ── Dominante Farbe eines Clusters berechnen ──────────────────────────────────
// Zählt alle Sprachen der Marker im Cluster und gibt die häufigste Farbe zurück
function getDominantColor(cluster) {
  const counts = {};
  cluster.getAllChildMarkers().forEach((marker) => {
    const lang = marker.options?.lang || "";
    counts[lang] = (counts[lang] || 0) + 1;
  });
  const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
  return getColor(dominant);
}

// ── Cluster-Icon: farbiger Kreis mit Zahl ─────────────────────────────────────
function createClusterIcon(cluster) {
  const color = getDominantColor(cluster);
  const count = cluster.getChildCount();

  // Größe des Kreises skaliert leicht mit der Anzahl
  const size = count < 10 ? 32 : count < 100 ? 38 : 44;

  return L.divIcon({
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        opacity: 0.85;
        border: 2px solid rgba(255,255,255,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'DM Mono', monospace;
        font-size: ${count < 100 ? 11 : 10}px;
        font-weight: 700;
        color: rgba(0,0,0,0.75);
        box-shadow: 0 2px 8px rgba(0,0,0,0.5);
      ">${count}</div>
    `,
    className: "",          // kein Standard-Leaflet-Styling
    iconSize:  [size, size],
    iconAnchor:[size / 2, size / 2],
  });
}

// ── Automatisch auf sichtbare Punkte zoomen ───────────────────────────────────
function FitBounds({ features }) {
  const map     = useMap();
  const prevLen = useRef(0);

  useMemo(() => {
    if (!features.length || features.length === prevLen.current) return;
    prevLen.current = features.length;
    const lats = features.map((f) => f.geometry.coordinates[1]);
    const lons = features.map((f) => f.geometry.coordinates[0]);
    map.fitBounds(
      [[Math.min(...lats), Math.min(...lons)], [Math.max(...lats), Math.max(...lons)]],
      { padding: [40, 40], maxZoom: 9 }   // maxZoom 9 = Regionalebene
    );
  }, [features, map]);

  return null;
}

// ── Hauptkomponente ───────────────────────────────────────────────────────────
export default function MapView({ features }) {
  return (
    <MapContainer
      center={[43, 10]}
      zoom={5}
      maxZoom={12}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OSM</a> &copy; <a href="https://carto.com">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <FitBounds features={features} />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterIcon}

        // Cluster auflösen ab Zoom 10 (Gemeindeebene) – darunter einzelne Punkte
        disableClusteringAtZoom={10}

        // Beim Klick auf einen Cluster: nicht tief zoomen, sondern aufspinnen
        zoomToBoundsOnClick={false}
        spiderfyOnMaxZoom={true}
        spiderfyDistanceMultiplier={1.5}

        // Radius in dem Punkte zusammengefasst werden (in Pixeln)
        maxClusterRadius={50}
        showCoverageOnHover={false}
      >
        {features.map((f) => {
          const [lon, lat] = f.geometry.coordinates;
          const p          = f.properties;
          const color      = getColor(p.lan_language);

          return (
            <CircleMarker
              key={p.id}
              center={[lat, lon]}
              radius={6}
              // lang wird für getDominantColor im Cluster benötigt
              lang={p.lan_language || ""}
              pathOptions={{
                fillColor:   color,
                fillOpacity: 0.9,
                color:       "rgba(0,0,0,0.3)",
                weight:      0.8,
              }}
            >
              <Popup maxWidth={320}>
                <div className="popup-inner">

                  {/* Kopfzeile: Sprache + ID */}
                  <div className="popup-header">
                    <span className="popup-lang-badge" style={{ background: color }}>
                      {p.lan_language || "Facies / Nicht bestimmt"}
                    </span>
                    <span className="popup-id">#{p.id}</span>
                  </div>

                  {/* Ort */}
                  {(p.loc_spotAncient || p.loc_municipality) && (
                    <div className="popup-place">
                      {p.loc_spotAncient && (
                        <span className="popup-place-ancient">{p.loc_spotAncient}</span>
                      )}
                      <span className="popup-place-modern">
                        {p.loc_municipality}{p.loc_state ? `, ${p.loc_state}` : ""}
                      </span>
                    </div>
                  )}

                  {/* Metadaten-Raster */}
                  <div className="popup-meta-grid">
                    {p.txt_writingSystem && (
                      <div className="popup-meta-item">
                        <span className="popup-label">Alphabet</span>
                        <span>{p.txt_writingSystem}</span>
                      </div>
                    )}
                    {(p.chr_min !== null || p.chr_max !== null) && (
                      <div className="popup-meta-item">
                        <span className="popup-label">Datierung</span>
                        <span>{formatYear(p.chr_min)} – {formatYear(p.chr_max)}</span>
                      </div>
                    )}
                    {p.arch_material && (
                      <div className="popup-meta-item">
                        <span className="popup-label">Material</span>
                        <span>{p.arch_material}</span>
                      </div>
                    )}
                    {p.writing_direction && p.writing_direction !== "unknown" && (
                      <div className="popup-meta-item">
                        <span className="popup-label">Schreibrichtung</span>
                        <span>{DIR_LABELS[p.writing_direction] || p.writing_direction}</span>
                      </div>
                    )}
                    {p.txt_typeOfText && (
                      <div className="popup-meta-item">
                        <span className="popup-label">Texttyp</span>
                        <span>{p.txt_typeOfText}</span>
                      </div>
                    )}
                    {p.char_count > 0 && (
                      <div className="popup-meta-item">
                        <span className="popup-label">Zeichen</span>
                        <span>{p.char_count}</span>
                      </div>
                    )}
                  </div>

                  {/* Inschrift */}
                  {p.txt_text && (
                    <div className="popup-section">
                      <span className="popup-label">Inschrift</span>
                      <blockquote className="popup-text">{p.txt_text}</blockquote>
                    </div>
                  )}

                  {/* Übersetzung */}
                  {p.txt_Translation && (
                    <div className="popup-section">
                      <span className="popup-label">Übersetzung</span>
                      <p className="popup-translation">{p.txt_Translation}</p>
                    </div>
                  )}

                  {/* Quelle */}
                  {p.ref_biblio && (
                    <div className="popup-section">
                      <span className="popup-label">Quelle</span>
                      <span className="popup-biblio">{p.ref_biblio}</span>
                    </div>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
