# Elektronik Diag V8.0 – Akademia Diagnostyki PRO

Kompletna aplikacja PWA do diagnostyki elektroniki. Wersja V8.0 rozbudowuje Akademię Diagnostyki i zachowuje wszystkie wcześniejsze moduły V7.3.

## Nowe moduły
- Akademia Diagnostyki PRO – 33 lekcje z quizami i zapisem postępu.
- 12 praktycznych przypadków w interaktywnym Trenerze usterek.
- Nowe działy: bezpieczeństwo ESD, PCB, kamera termiczna, hot-air, laptopy, telefony, T-CON, audio, AGD, SMPS i kontrola jakości.
- Programy diagnostyczne PC – 22 narzędzia: BoardView, BIOS/firmware, programatory pamięci, UART, analizatory logiczne, USB, telefony, dyski, komputery i audio.
- Dobór programu według urządzenia i objawu, obsługa krok po kroku, interpretacja wyniku, ograniczenia i bezpieczeństwo.
- Procedury DSO-152 PRO – 15 testów dla zasilania, PWM, audio, magistral, telefonów, czujników, samochodu, BMS i AGD.
- FNIRSI DSO-152 – obsługa, ustawienia, wyzwalanie, sonda, pomiary, asystent i przykłady warsztatowe.
- AiXun P3208 – zasilacz DC, BOOT telefonu, analiza poboru, SC Repair, USB/QC, baterie i ustawienia.
- AiXun H314 – obsługa hot-air, tryby, krzywe/segmenty, presety, dysze, Wi-Fi i konserwacja.

## Pliki
- elektronik_diag_db_v1.json – kompletna baza
- device_categories.json – urządzenia i sektory płyt
- repair_rules.json – zasady napraw
- components.json – elementy elektroniczne
- laws_definitions.json – definicje i prawa
- schematic_index.json – indeks schematów/modeli do uzupełniania

## Ważne
Zakresy napięć są orientacyjne. Konkretna płyta może używać innych wartości.
Dla napraw z 230 V AC i szynami PFC wymagane są odpowiednie procedury bezpieczeństwa.

## Integracja z HTML/JS
Przykład:
fetch('./elektronik_diag_db_v1.json')
  .then(r => r.json())
  .then(db => {
    console.log(db.components);
  });

Można też wkleić bazę bezpośrednio do pliku JS jako stałą:
const ELEKTRONIK_DB = {...};
