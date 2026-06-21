import "./AboutPanel.css";

export default function AboutPanel() {
  return (
    <div className="about-panel" role="region" aria-labelledby="about-title">
      <div className="about-content">
        <section className="about-section">
          <h2 id="about-title">About this Project</h2>
          <p>The <strong>Epigraphic Atlas of Ancient Europe</strong> is a scientific visualization platform for epigraphic data from the <strong>SELECT</strong> (Self-Learning Atlas of Ancient European CulTures) project. The platform provides interactive access to over 14,000 inscriptions in the so-called <em>fragmentary languages</em> of Europe.</p>
        </section>
        <section className="about-section">
          <h2>What are Fragmentary Languages?</h2>
          <p><em>Fragmentary languages</em> are ancient languages known only in fragments—primarily through inscriptions on ceramic, stone, bronze, or other materials.</p>
          <div className="about-lang-grid">
            {[["Etruscan","Northern Italy, ca. 700–100 BCE"],["Venetic","Northeastern Italy, ca. 600–100 BCE"],["Messapic","Southeastern Italy, ca. 600–100 BCE"],["Oscan","Southern Italy, ca. 400–100 BCE"],["Faliscan","Latium, ca. 700–200 BCE"],["Iberian","Iberian Peninsula, ca. 500–100 BCE"],["Celtiberian","Iberian Peninsula, ca. 200–100 BCE"],["Gaulish","Gaul & Northern Italy"],["Raetic","Alpine region, ca. 500–100 BCE"],["Lepontic","Northern Italy / Switzerland"],["Camunian","Northern Italy (Valcamonica)"]].map(([n,d]) => (
              <div key={n} className="about-lang-card"><strong>{n}</strong><span>{d}</span></div>
            ))}
          </div>
        </section>
        <section className="about-section">
          <h2>What is Epigraphy?</h2>
          <p><em>Epigraphy</em> is the study of inscriptions. It examines texts carved into hard materials that have survived millennia. Epigraphers decipher, transcribe, translate, and interpret these texts.</p>
        </section>
        <section className="about-section">
          <h2>The SELECT Database</h2>
          <p>The SELECT project created a comprehensive database of epigraphic sources from prehistoric and classical Europe. The existing <a href="https://www.selecteplus.eu/" target="_blank" rel="noreferrer">SELECT Atlas</a> was designed for educational use. This platform provides access to all research-relevant attributes.</p>
          <div className="about-stats">
            {[["14,500+","Inscriptions"],["35+","Languages"],["1,200+","Sites"],["1300 BCE–300 CE","Period"]].map(([n,l]) => (
              <div key={l} className="about-stat"><span className="about-stat-num">{n}</span><span className="about-stat-label">{l}</span></div>
            ))}
          </div>
        </section>
        <section className="about-section">
          <h2>Contributors & Sources</h2>
          <p>Data source: SELECT database export (January 2026). Developed as part of an academic seminar.</p>
          <p>Libraries: <a href="https://leafletjs.com" target="_blank" rel="noreferrer">Leaflet</a>, <a href="https://react-leaflet.js.org" target="_blank" rel="noreferrer">react-leaflet</a>, <a href="https://vitejs.dev" target="_blank" rel="noreferrer">Vite</a>, <a href="https://react.dev" target="_blank" rel="noreferrer">React</a>. Maps: <a href="https://carto.com" target="_blank" rel="noreferrer">CARTO</a> / OpenStreetMap.</p>
        </section>
      </div>
    </div>
  );
}
