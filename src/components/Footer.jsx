export default function Footer() {
  const base = import.meta.env.BASE_URL;

  return (
    <footer className="app-footer">
      <div className="footer-left">
        <span>© 2026 SELECT Project</span>
        <a href="https://github.com/JoMue742/Select-Viz/blob/main/README.md" className="footer-link" target="_blank" rel="noreferrer">
          Documentation
        </a>
        <a href={`${base}LICENSE.txt`} className="footer-link" target="_blank" rel="noreferrer">
          License
        </a>
      </div>
      <div className="footer-credit">
        Map data © OpenStreetMap contributors
      </div>
    </footer>
  );
}
