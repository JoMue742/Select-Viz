# App Concept

Die zusätzliche JavaScript-Anwendung ist ein kleiner Timeline-Explorer als eigenständige Seite innerhalb des bestehenden SELECT-Projekts. Sie zeigt eine kurze Liste historischer Sprachräume und ordnet diese entlang einer Zeitleiste ein. Mit einem Slider kann man ein Jahr wählen; die Seite hebt dann die passenden Einträge hervor und blendet die übrigen aus.

Die Bedienung ist bewusst einfach gehalten: Slider bewegen, `Play/Pause` für die automatische Zeitbewegung, `Reset` für den Startzustand. So lässt sich die Logik sehr gut erklären, weil die Anwendung nur wenige Zustände verwaltet und direkt auf Benutzereingaben reagiert.

Die Anwendung ist technisch unabhängig von React umgesetzt und wird als statische HTML-Seite mit einer eigenen `app.js` eingebunden. Dadurch entspricht sie genau der Aufgabe: kleine Vanilla-JavaScript-Anwendung, leicht bis mittelkomplex, vollständig nachvollziehbar und gut präsentierbar.