import "./AboutPanel.css";

export default function AboutPanel() {
  return (
    <div className="about-panel">
      <div className="about-content">
        <section className="about-section">
          <h2>Über dieses Projekt</h2>
          <p>Der <strong>Epigraphic Atlas of Ancient Europe</strong> ist eine wissenschaftliche Visualisierungsplattform für epigraphische Daten aus dem EU-Projekt <strong>SELECT</strong> (Sociolinguistics of European Languages through Contacts and Texts). Die Plattform macht über 14.000 Inschriften in den sogenannten <em>Trümmersprachen</em> Europas durch interaktive Karten und Filter zugänglich.</p>
        </section>
        <section className="about-section">
          <h2>Was sind Trümmersprachen?</h2>
          <p>Als <em>Trümmersprachen</em> (engl. <em>fragmentary languages</em>) bezeichnet die Sprachwissenschaft antike Sprachen, die nur in Bruchstücken überliefert sind – hauptsächlich durch Inschriften auf Keramik, Stein, Bronze oder anderen Materialien.</p>
          <div className="about-lang-grid">
            {[["Etruskisch","Norditalien, ca. 700–100 v. Chr."],["Venetisch","Nordostitalien, ca. 600–100 v. Chr."],["Messapisch","Südostitalien, ca. 600–100 v. Chr."],["Oskisch","Süditalien, ca. 400–100 v. Chr."],["Faliskisch","Latium, ca. 700–200 v. Chr."],["Iberisch","Iberische Halbinsel, ca. 500–100 v. Chr."],["Keltiberisch","Iberische Halbinsel, ca. 200–100 v. Chr."],["Gallisch","Gallien & Norditalien"],["Rätisch","Alpenraum, ca. 500–100 v. Chr."],["Lepontisch","Norditalien / Schweiz"],["Kamunisch","Norditalien (Valcamonica)"]].map(([n,d]) => (
              <div key={n} className="about-lang-card"><strong>{n}</strong><span>{d}</span></div>
            ))}
          </div>
        </section>
        <section className="about-section">
          <h2>Was ist Epigraphik?</h2>
          <p>Die <em>Epigraphik</em> ist die Wissenschaft von Inschriften. Sie untersucht Texte, die in harte Materialien eingeritzt wurden und damit die Zeiten überdauert haben. Epigraphiker:innen entziffern, transkribieren, übersetzen und interpretieren diese Texte.</p>
        </section>
        <section className="about-section">
          <h2>Die SELECT-Datenbank</h2>
          <p>Das EU-Projekt SELECT (2018–2023) hat eine umfangreiche Datenbank epigraphischer Quellen aus dem vorklassischen und klassischen Europa erstellt. Der bestehende <a href="https://maps.selecteplus.eu" target="_blank" rel="noreferrer">SELECT-Atlas</a> wurde für den Schulunterricht konzipiert. Diese Plattform erschließt alle forschungsrelevanten Attribute.</p>
          <div className="about-stats">
            {[["14.500+","Inschriften"],["35+","Sprachen"],["1.200+","Fundorte"],["1300 v.–300 n.","Zeitraum"]].map(([n,l]) => (
              <div key={l} className="about-stat"><span className="about-stat-num">{n}</span><span className="about-stat-label">{l}</span></div>
            ))}
          </div>
        </section>
        <section className="about-section">
          <h2>Beitragende & Quellen</h2>
          <p>Datenbasis: SELECT-Datenbankexport (Januar 2026). Entwickelt im Rahmen eines wissenschaftlichen Seminars.</p>
          <p>Bibliotheken: <a href="https://leafletjs.com" target="_blank" rel="noreferrer">Leaflet</a>, <a href="https://react-leaflet.js.org" target="_blank" rel="noreferrer">react-leaflet</a>, <a href="https://vitejs.dev" target="_blank" rel="noreferrer">Vite</a>, <a href="https://react.dev" target="_blank" rel="noreferrer">React</a>. Karten: <a href="https://carto.com" target="_blank" rel="noreferrer">CARTO</a> / OpenStreetMap.</p>
        </section>
      </div>
    </div>
  );
}
