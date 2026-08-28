Elektronik Diag V6.2 – poprawka Akademii Diagnostyki

Najważniejsza zmiana:
- Akademia Diagnostyki została odseparowana od głównego skryptu aplikacji.
- Nawigacja Akademii działa niezależnie od modułów Diagnostyka PRO i Atlas.
- Lekcje, quizy, postęp i Trener usterek są inicjalizowane w osobnym skrypcie.
- Service Worker używa cache: elektronik-diag-v6-2.
- start_url manifestu ma parametr ?v=6.2, aby ograniczyć problem starego cache PWA.

Wgranie na GitHub Pages:
1. Zastąp index.html, sw.js i manifest.webmanifest plikami z tej paczki.
2. Pozostaw dotychczasowe ikony icon-192.png i icon-512.png, jeśli są w repozytorium.
3. Po publikacji najpierw otwórz stronę w Safari i sprawdź napis V6.2.
4. Jeśli używasz ikony PWA na ekranie początkowym i nadal pokazuje starą wersję, usuń starą ikonę PWA i dodaj stronę ponownie po otwarciu aktualnej wersji w Safari.
