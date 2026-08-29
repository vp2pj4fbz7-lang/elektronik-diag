# Elektronik Diag – Baza Wiedzy V1

Pakiet startowy do aplikacji PWA.

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
