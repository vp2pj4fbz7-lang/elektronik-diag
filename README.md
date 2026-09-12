# Elektronik Diag V7.1 – FNIRSI DSO-152

Kompletna aplikacja PWA do diagnostyki elektroniki. Wersja V7.1 dodaje moduł obsługi oscyloskopu FNIRSI DSO-152, zachowując moduły AiXun P3208 i H314, bazę wiedzy, Akademię, Diagnostykę PRO i Graficzny Atlas.

## Nowe moduły
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
