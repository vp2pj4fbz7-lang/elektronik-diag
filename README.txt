ELEKTRONIK DIAG V6.7.3 – FIX INTERNAL

ZNALEZIONY BŁĄD:
Kod modułu „Budowa pakietu 18650” znajdował się poza głównym zakresem JavaScript,
więc menu otwierało moduł, ale jego funkcje wewnętrzne nie miały dostępu do funkcji
pomocniczych aplikacji. To zostało poprawione.

Dodatkowo poprawiono kompatybilność z Safari/iPad:
- brak polegania na automatycznych globalnych zmiennych tworzonych z id elementów,
- kalkulator pobiera pola przez getElementById,
- analizator sekcji działa w tym samym zakresie kodu.

Wgraj razem:
index.html
RESET.html
sw.js
manifest.webmanifest

Potem otwórz w Safari:
.../RESET.html
i wybierz „Wyczyść i uruchom V6.7.3”.

W module powinno być:
MODUŁ ZAŁADOWANY • V6.7.3
Kod wewnętrzny: ED-673-INTERNAL-FIX
