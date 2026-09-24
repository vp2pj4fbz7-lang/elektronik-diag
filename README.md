# Elektronik Diag V8.4 – Schematy płyt PRO

## Nowy moduł V8.4

- interaktywne graficzne schematy sektorów i sekwencji zasilania dla 8 typów urządzeń,
- 64 klikalne sektory z wejściami, wyjściami, sygnałami sterującymi, pomiarami i decyzjami diagnostycznymi,
- widoki: mapa graficzna, tabela sekwencji oraz tory i szyny zasilania,
- symulacja etapów: źródło/OFF, STANDBY/ALW, START i RUN.

## Nowy moduł V8.2

Zakładka **Sektory płyt PRO** uczy funkcjonalnego dzielenia płyt i zawężania usterki metodą wejście → blok → wyjście. Obejmuje telewizory, telefony, laptopy, komputery stacjonarne i tablety. Każda mapa ma klikalne sektory z punktami rozpoznawczymi, elementami, pomiarami, objawami i kolejną decyzją diagnostyczną. Wszystkie grafiki są zapisane w aplikacji i działają offline.

## Nowość V8.1

- osobny moduł „Elementy elektroniczne”,
- grupy R, P/PR, C, L, Tr, D, T/Q i U/IC,
- zdjęcia poglądowe, symbole, zastosowania i odmiany,
- bezpieczne procedury pomiarowe krok po kroku,
- interpretacja wyniku prawidłowego i uszkodzenia,
- wyszukiwanie i filtrowanie elementów,
- praca offline dzięki pamięci PWA.

Kompletna aplikacja PWA do diagnostyki elektroniki. Wersja V8.1 dodaje moduł Elementy elektroniczne PRO, zachowując Akademię Diagnostyki i wszystkie wcześniejsze moduły.

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
