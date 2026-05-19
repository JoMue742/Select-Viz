# App Concept

Die zusätzliche JavaScript-Anwendung ist ein kleiner Timeline-Explorer für antike Inschriften. Sie zeigt GeoJSON-Features (Inschriften mit Zeitstempeln) auf einer Karte und ordnet diese zeitlich ein. Mit einem Slider kann man ein bestimmtes Jahr wählen; die Anwendung hebt dann die Inschriften hervor, deren zeitlicher Geltungsbereich (`chr_min` bis `chr_max`) dieses Jahr umfasst, und blendet die übrigen aus.

Die Bedienung ist bewusst einfach gehalten: Slider bewegen, `Play/Pause` für die automatische Zeitfortschreitung, `Reset` für den Startzustand. So lässt sich die Logik sehr gut erklären, weil die Anwendung nur wenige Zustände verwaltet und direkt auf Benutzereingaben reagiert.

Die Anwendung ist technisch unabhängig von React umgesetzt und wird als statische HTML-Seite mit dem Vanilla-JS-Skript `timeline-animation.js` eingebunden. Dadurch entspricht sie genau der Aufgabe: kleine, eigenständige Vanilla-JavaScript-Anwendung, leicht bis mittelkomplex, vollständig nachvollziehbar und gut präsentierbar.