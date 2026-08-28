Elektronik Diag V6.1 – poprawka Akademii Diagnostyki

Poprawki:
- bezpieczniejsza inicjalizacja Akademii Diagnostyki,
- zapis postępu działa także gdy localStorage jest ograniczony,
- usunięto składnię opcjonalnego łańcuchowania z krytycznej części Akademii,
- Service Worker ma nowy cache: elektronik-diag-v6-1,
- nawigacja pobiera świeży index.html zamiast trzymać starą wersję z cache,
- rejestracja Service Workera wymusza sprawdzenie aktualizacji.

Wgraj na GitHub Pages:
- index.html
- sw.js
- manifest.webmanifest
- pozostaw dotychczasowe icon-192.png i icon-512.png, jeśli są używane.

Po wgraniu warto zamknąć starą kartę/PWA i otworzyć stronę ponownie. Nowy Service Worker usuwa poprzednie cache aplikacji.
