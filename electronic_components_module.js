(function(){
'use strict';
const $=id=>document.getElementById(id);
if(!$('ecList')) return;
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

const DB=[
 {id:'r',code:'R',name:'Rezystor (opornik)',group:'pasywne',mark:'R, RN, RP',unit:'Ω (om)',polarity:'Brak',
  intro:'Ogranicza prąd i wytwarza określony spadek napięcia. Jest jednym z najczęściej spotykanych elementów na każdej płycie.',
  uses:['ograniczanie prądu LED','dzielniki napięcia','polaryzacja tranzystorów','sprzężenie zwrotne zasilaczy','rezystory pomiarowe shunt'],
  types:['przewlekany z paskami','SMD z kodem','rezystor mocy','shunt niskoomowy','sieć rezystorowa'],
  meter:'Multimetr: zakres Ω',
  steps:['Odłącz zasilanie i rozładuj kondensatory.','Odczytaj paski lub kod SMD, np. 103 = 10 kΩ, 4R7 = 4,7 Ω.','Przyłóż sondy do obu końców; kierunek nie ma znaczenia.','Jeśli wynik w układzie jest zaniżony, unieś jedną końcówkę i zmierz ponownie.','Porównaj wynik z wartością nominalną i tolerancją.'],
  good:'Wynik mieści się w tolerancji, np. 1 kΩ ±5% oznacza 950–1050 Ω.',bad:'OL oznacza przerwę. Duża zmiana wartości, pęknięcie albo nadpalenie wskazują uszkodzenie. Wynik niższy w układzie nie musi oznaczać usterki.',
  note:'Nie mierz rezystancji na zasilonej płycie. Rezystor 0 Ω jest celową zworą i powinien mieć niemal zerową rezystancję.'},
 {id:'pr',code:'P / PR',name:'Potencjometr',group:'pasywne',mark:'P, PR, VR, RV',unit:'Ω (om)',polarity:'Brak',
  intro:'Rezystor regulowany z trzema wyprowadzeniami. Suwak dzieli ścieżkę oporową i pozwala płynnie ustawiać napięcie, poziom sygnału albo punkt pracy.',
  uses:['regulacja głośności','ustawianie napięcia','kalibracja zasilacza','regulacja jasności','czujniki położenia'],
  types:['obrotowy','suwakowy','montażowy trimmer','wieloobrotowy','podwójny stereo'],
  meter:'Multimetr: zakres Ω',
  steps:['Odłącz zasilanie.','Znajdź dwa skrajne piny i zmierz między nimi — wynik powinien być stałą wartością nominalną.','Zmierz między pinem środkowym (suwakiem) a jednym skrajnym.','Powoli obracaj oś; wartość powinna zmieniać się płynnie.','Powtórz pomiar dla suwaka i drugiego skrajnego pinu.'],
  good:'Między skrajnymi pinami stała wartość, a między suwakiem i skrajnym płynna zmiana od blisko 0 Ω do wartości nominalnej.',bad:'Skoki do OL, martwe miejsca, trzaski lub brak płynności wskazują zużytą ścieżkę albo suwak.',
  note:'W układzie równoległe połączenia mogą zmienić wynik. Przy podejrzeniu usterki odlutuj co najmniej dwa wyprowadzenia.'},
 {id:'c',code:'C',name:'Kondensator',group:'pasywne',mark:'C, EC, PC',unit:'F; µF, nF, pF',polarity:'Elektrolityczne: tak',
  intro:'Magazynuje ładunek elektryczny. Filtruje zasilanie, odsprzęga układy, przenosi sygnały zmienne i bierze udział w obwodach czasowych oraz rezonansowych.',
  uses:['wygładzanie napięcia','odsprzęganie zasilania IC','filtracja sygnału','układy czasowe','rozruch silników'],
  types:['ceramiczny MLCC','elektrolityczny','polimerowy','tantalowy','foliowy','wysokonapięciowy'],
  meter:'Pojemność / ESR / Ω',
  steps:['Odłącz zasilanie i bezpiecznie rozładuj kondensator przez rezystor. Potwierdź 0 V.','Sprawdź obudowę: wybrzuszenie, wyciek, pęknięcie lub przebarwienie.','Pojemność najlepiej mierz po odlutowaniu przynajmniej jednej końcówki.','Elektrolit sprawdź miernikiem ESR; porównaj z typową wartością dla pojemności i napięcia.','Test Ω/ciągłości służy głównie do wykrycia zwarcia, nie potwierdza pełnej sprawności.'],
  good:'Pojemność w tolerancji, brak stałego zwarcia i prawidłowe ESR. W trybie Ω wskazanie może chwilowo rosnąć podczas ładowania.',bad:'Stałe 0 Ω, znaczny spadek pojemności, wysokie ESR, wybrzuszenie lub wyciek.',
  note:'Zachowaj polaryzację elektrolitów i tantalowych. Kondensator sieciowy lub zasilacza może utrzymywać niebezpieczne napięcie po odłączeniu.'},
 {id:'l',code:'L',name:'Cewka / dławik',group:'magnetyczne',mark:'L, FB',unit:'H; µH, mH',polarity:'Zwykle brak',
  intro:'Magazynuje energię w polu magnetycznym i przeciwstawia się szybkim zmianom prądu. Dławiki filtrują zakłócenia, a cewki są kluczowe w przetwornicach.',
  uses:['przetwornice buck/boost','filtry EMI','filtry LC','magazynowanie energii','obwody rezonansowe'],
  types:['dławik SMD ekranowany','cewka powietrzna','dławik osiowy','ferryt / koralik FB','dławik wspólny CM'],
  meter:'Ciągłość / Ω / LCR',
  steps:['Odłącz zasilanie.','Sprawdź ciągłość uzwojenia — większość cewek mocy ma małą rezystancję DC.','Porównaj rezystancję z identyczną gałęzią lub dokumentacją; sama niska wartość jest normalna.','Indukcyjność i straty mierz miernikiem LCR, najlepiej poza układem.','Przy usterce pod obciążeniem obejrzyj luty, rdzeń i sprawdź temperaturę.'],
  good:'Ciągłość uzwojenia, stabilna indukcyjność i brak nadmiernego grzania. Rezystancja DC może być bliska 0 Ω.',bad:'OL oznacza przerwę. Pęknięty rdzeń, zwarcie międzyzwojowe lub grzanie pod obciążeniem wymagają dalszego testu.',
  note:'Sygnał brzęczyka na cewce nie oznacza zwarcia. Miernik widzi rezystancję drutu i często także niską rezystancję zasilanej szyny.'},
 {id:'tr',code:'Tr / T',name:'Transformator',group:'magnetyczne',mark:'TR, T',unit:'Przekładnia / H',polarity:'Początki uzwojeń mają znaczenie',
  intro:'Przenosi energię pomiędzy uzwojeniami przez pole magnetyczne. Może zmieniać napięcie, zapewniać separację galwaniczną albo sterować tranzystorami.',
  uses:['zasilacze sieciowe','SMPS flyback','separacja galwaniczna','audio','transformatory impulsowe i bramkowe'],
  types:['sieciowy 50 Hz','impulsowy SMPS','audio','separacyjny','prądowy CT'],
  meter:'Ω / tester zwojów / LCR',
  steps:['Odłącz urządzenie od sieci i rozładuj kondensator główny.','Ze schematu ustal, które piny należą do jednego uzwojenia.','Zmierz ciągłość każdego uzwojenia; różne uzwojenia powinny być odseparowane.','Sprawdź brak przejścia między uzwojeniem pierwotnym i wtórnym oraz rdzeniem.','Zwarcia międzyzwojowe sprawdzaj testerem ring/indukcyjności; zwykły omomierz może ich nie wykryć.'],
  good:'Każde uzwojenie ma ciągłość zgodną z konstrukcją, a uzwojenia izolowane nie mają między sobą przejścia.',bad:'Przerwa uzwojenia, przebicie izolacji, ślady przegrzania lub nieprawidłowy wynik testu zwojów.',
  note:'Nie podawaj przypadkowego napięcia sieciowego. Test przekładni wykonuj wyłącznie znanym, bezpiecznym napięciem AC i zgodnie z konstrukcją transformatora.'},
 {id:'d',code:'D',name:'Dioda',group:'półprzewodniki',mark:'D, LED, ZD',unit:'Spadek napięcia Vf',polarity:'Tak: A / K',
  intro:'Przewodzi głównie w jednym kierunku. Dioda prostuje napięcie, zabezpiecza obwód, stabilizuje je albo emituje światło.',
  uses:['prostowniki','zabezpieczenie odwrotnej polaryzacji','dioda gasząca przy cewce','stabilizacja Zenera','LED sygnalizacyjna','TVS przeciw przepięciom'],
  types:['prostownicza','Schottky','LED','Zenera','TVS','szybka impulsowa','fotodioda'],
  meter:'Tryb testu diody',
  steps:['Odłącz zasilanie.','Ustaw test diody. Czerwona sonda do anody, czarna do katody.','Odczytaj spadek w kierunku przewodzenia. Typowo krzem ok. 0,5–0,8 V; Schottky ok. 0,15–0,45 V.','Odwróć sondy — sprawna zwykła dioda powinna pokazać OL.','Przy niejasnym wyniku unieś jedną końcówkę. LED może wymagać większego napięcia niż daje miernik.'],
  good:'Przewodzenie w jednym kierunku i OL w drugim; wartość zależy od rodzaju diody.',bad:'Około 0 V w obu kierunkach oznacza zwarcie, a OL w obu może oznaczać przerwę — z wyjątkami zależnymi od typu i napięcia miernika.',
  note:'Zwykły test diody nie potwierdza napięcia Zenera ani progu TVS. Do tego potrzebne są zasilacz z ograniczeniem prądu i odpowiednia procedura.'},
 {id:'q',code:'T / Q',name:'Tranzystor',group:'półprzewodniki',mark:'Q, T, TR',unit:'Vf / hFE / RDS(on)',polarity:'Tak; pinout jest krytyczny',
  intro:'Steruje przepływem prądu. BJT jest sterowany prądem bazy, a MOSFET napięciem bramki. Tranzystor pracuje jako klucz, wzmacniacz lub element stabilizatora.',
  uses:['klucz zasilania','przetwornice','sterowanie silnikiem i przekaźnikiem','wzmacniacze','stabilizatory','zabezpieczenia baterii'],
  types:['BJT NPN','BJT PNP','MOSFET N-channel','MOSFET P-channel','IGBT','tranzystor Darlington'],
  meter:'Test diody / Ω',
  steps:['Odłącz zasilanie i ustal dokładny pinout z datasheet.','MOSFET: sprawdź G–S i G–D — nie powinno być zwarcia.','MOSFET: zmierz D–S w obu kierunkach; dioda body przewodzi tylko w jednym kierunku. Rozładuj bramkę zwierając G z S.','BJT: złącza B–E i B–C zachowują się jak dwie diody o wspólnej bazie; C–E bez sterowania zwykle nie przewodzi.','Wynik podejrzany potwierdź po wylutowaniu, ponieważ układ wokół silnie wpływa na pomiar.'],
  good:'Brak zwarcia bramki, prawidłowa dioda body w MOSFET lub dwa poprawne złącza w BJT, zgodnie z pinoutem.',bad:'Zwarcie D–S/C–E, przejście bramki do pozostałych pinów, przewodzenie wszystkich wyprowadzeń albo całkowita przerwa złączy.',
  note:'Nie zakładaj kolejności G-D-S lub B-C-E po wyglądzie obudowy. Ten sam typ obudowy może mieć inny układ pinów.'},
 {id:'ic',code:'U / IC',name:'Układ scalony',group:'scalone',mark:'U, IC',unit:'Zależnie od funkcji',polarity:'Tak: pin 1 / znacznik',
  intro:'W jednej obudowie zawiera wiele tranzystorów i innych struktur. Może być wzmacniaczem, sterownikiem, pamięcią, procesorem, regulatorem albo kompletnym układem zasilania.',
  uses:['PMIC i przetwornice','mikrokontrolery','pamięci BIOS/eMMC/UFS','wzmacniacze audio','logika cyfrowa','interfejsy USB/HDMI'],
  types:['DIP','SOIC / TSSOP','QFN','BGA','SOT regulator','moduł hybrydowy'],
  meter:'Zasilania / test diody / oscyloskop',
  steps:['Odczytaj pełne oznaczenie i pobierz datasheet lub schemat.','Ustal pin 1, piny zasilania, masy, EN, RESET, wejścia i wyjścia.','Bez zasilania sprawdź opór lub test diody linii zasilających do masy; porównuj z płytą sprawną albo dokumentacją.','Po bezpiecznym włączeniu zmierz każde wymagane zasilanie oraz sygnały EN/RESET/PGOOD.','Oscyloskopem sprawdź zegary i komunikację. Wymianę IC rozważ dopiero po potwierdzeniu warunków pracy i obciążenia wyjść.'],
  good:'Prawidłowe zasilania, sygnał włączenia, reset, zegar i oczekiwane wyjścia zgodne z datasheet.',bad:'Zwarcie zasilania, brak wyjścia mimo poprawnych warunków, nietypowe grzanie lub nieprawidłowa komunikacja. Przyczyną może być też element zewnętrzny.',
  note:'Układu scalonego nie da się zwykle ocenić jednym pomiarem. Niska rezystancja na szynie rdzenia CPU/GPU może być prawidłowa.'}
];

function photo(id){
 const common='<defs><linearGradient id="p" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#edf2f5"/><stop offset="1" stop-color="#657684"/></linearGradient><filter id="s"><feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity=".45"/></filter></defs><rect width="360" height="220" fill="url(#p)"/><ellipse cx="180" cy="184" rx="132" ry="18" fill="#344652" opacity=".35"/>';
 const x={
  r:'<g filter="url(#s)"><path d="M24 111h91M245 111h91" stroke="#abb9c2" stroke-width="7"/><rect x="108" y="82" width="144" height="58" rx="25" fill="#d8bf84"/><path d="M138 84v54M160 84v54M196 84v54M220 84v54" stroke-width="10" stroke="#7e4a26"/><path d="M160 84v54" stroke="#161b20" stroke-width="9"/><path d="M196 84v54" stroke="#db352d" stroke-width="9"/><path d="M220 84v54" stroke="#d7ab34" stroke-width="8"/></g>',
  pr:'<g filter="url(#s)"><path d="M116 156v34M180 156v34M244 156v34" stroke="#c5cdd1" stroke-width="8"/><rect x="88" y="80" width="184" height="82" rx="13" fill="#315d8a"/><circle cx="180" cy="82" r="39" fill="#c4cbd0" stroke="#5f6c74" stroke-width="8"/><path d="M180 53v29" stroke="#4e5960" stroke-width="8"/><rect x="168" y="26" width="24" height="40" rx="6" fill="#7e8990"/></g>',
  c:'<g filter="url(#s)"><path d="M145 164v35M215 164v35" stroke="#c7d0d5" stroke-width="7"/><ellipse cx="180" cy="66" rx="58" ry="18" fill="#a8b1b5"/><path d="M122 66v92c0 23 116 23 116 0V66" fill="#263b54"/><ellipse cx="180" cy="158" rx="58" ry="18" fill="#1b2b3e"/><path d="M209 55v111" stroke="#c9d5dd" stroke-width="14" opacity=".9"/><path d="M209 91l-7 12h14zM209 127l-7 12h14z" fill="#324759"/></g>',
  l:'<g filter="url(#s)"><path d="M47 111h66M247 111h66" stroke="#bfc8cd" stroke-width="8"/><rect x="105" y="65" width="150" height="92" rx="20" fill="#303a40"/><path d="M125 72v78M143 68v86M161 67v88M179 67v88M197 67v88M215 68v86M233 72v78" stroke="#a76828" stroke-width="11"/></g>',
  tr:'<g filter="url(#s)"><rect x="93" y="46" width="174" height="132" rx="9" fill="#343c42"/><rect x="126" y="65" width="108" height="96" fill="#d7c497"/><path d="M135 71v84M151 68v90M167 68v90M193 68v90M209 68v90M225 71v84" stroke="#a65e27" stroke-width="9"/><path d="M113 178v25M145 178v25M215 178v25M247 178v25" stroke="#cbd2d5" stroke-width="7"/></g>',
  d:'<g filter="url(#s)"><path d="M36 112h105M219 112h105" stroke="#c3ccd1" stroke-width="7"/><rect x="132" y="83" width="96" height="58" rx="26" fill="#202a30"/><path d="M201 84v56" stroke="#d9dfe2" stroke-width="10"/><path d="M160 95l34 17-34 17z" fill="#e3e8eb"/></g><g transform="translate(270 28)"><path d="M0 54v42M38 54v42" stroke="#c8d0d4" stroke-width="5"/><path d="M-8 55c0-30 54-30 54 0v14H-8z" fill="#e43e36" opacity=".9"/></g>',
  q:'<g filter="url(#s)"><path d="M132 157v42M180 157v42M228 157v42" stroke="#c8d0d5" stroke-width="8"/><path d="M103 71q77-38 154 0v83H103z" fill="#242c31"/><rect x="103" y="111" width="154" height="46" fill="#1a2024"/><circle cx="180" cy="82" r="8" fill="#65737c"/></g><g transform="translate(275 68)" filter="url(#s)"><rect width="55" height="72" rx="8" fill="#252d32"/><path d="M10 72v38M28 72v38M45 72v38" stroke="#c9d1d5" stroke-width="6"/></g>',
  ic:'<g filter="url(#s)"><rect x="100" y="55" width="160" height="112" rx="12" fill="#20272c"/><circle cx="123" cy="78" r="8" fill="#596870"/><path d="M82 72h18M82 96h18M82 120h18M82 144h18M260 72h18M260 96h18M260 120h18M260 144h18" stroke="#d0d6d9" stroke-width="10"/><text x="180" y="105" text-anchor="middle" fill="#aebbc2" font-size="16" font-family="sans-serif">IC</text><text x="180" y="128" text-anchor="middle" fill="#7f9099" font-size="10" font-family="sans-serif">A1X72</text></g>'
 }[id];
 return '<svg viewBox="0 0 360 220" role="img" aria-label="Zdjęcie poglądowe elementu">'+common+x+'</svg>';
}

function symbol(id){
 const begin='<svg viewBox="0 0 360 200" role="img" aria-label="Symbol schematowy"><rect width="360" height="200" rx="16" fill="#f7fafc"/><g stroke="#17212b" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round">';
 const end='</g></svg>';
 const x={
  r:'<path d="M35 100h55l15-28 25 56 25-56 25 56 25-56 25 56 15-28h70"/><text x="180" y="165" fill="#17212b" stroke="none" text-anchor="middle" font-size="18">R</text>',
  pr:'<path d="M35 110h55l15-24 25 48 25-48 25 48 25-48 25 48 15-24h70M180 35v52m0 0l-13-18m13 18l13-18"/><text x="180" y="174" fill="#17212b" stroke="none" text-anchor="middle" font-size="18">P / PR</text>',
  c:'<path d="M35 100h115m0-42v84m60-84v84m0-42h115"/><text x="180" y="174" fill="#17212b" stroke="none" text-anchor="middle" font-size="18">C</text>',
  l:'<path d="M30 105h65c0-44 38-44 38 0 0-44 38-44 38 0 0-44 38-44 38 0 0-44 38-44 38 0h83"/><text x="180" y="165" fill="#17212b" stroke="none" text-anchor="middle" font-size="18">L</text>',
  tr:'<path d="M85 48c-40 0-40 32 0 32-40 0-40 32 0 32-40 0-40 32 0 32M275 48c40 0 40 32 0 32 40 0 40 32 0 32 40 0 40 32 0 32M160 38v116M180 38v116"/><text x="170" y="185" fill="#17212b" stroke="none" text-anchor="middle" font-size="18">Tr</text>',
  d:'<path d="M35 100h105m0-48v96l82-48zm82-48v96m0-48h103"/><text x="180" y="178" fill="#17212b" stroke="none" text-anchor="middle" font-size="18">A → K</text>',
  q:'<path d="M160 42v116M45 100h115M160 72l85-48M160 130l85 48m-25-21l25 21-31-2"/><circle cx="180" cy="100" r="86"/><text x="48" y="88" fill="#17212b" stroke="none" font-size="16">B/G</text><text x="262" y="30" fill="#17212b" stroke="none" font-size="16">C/D</text><text x="262" y="184" fill="#17212b" stroke="none" font-size="16">E/S</text>',
  ic:'<rect x="98" y="35" width="164" height="130" rx="7"/><path d="M45 62h53M45 94h53M45 126h53M262 62h53M262 94h53M262 126h53"/><circle cx="122" cy="58" r="8" fill="#17212b"/><text x="180" y="107" fill="#17212b" stroke="none" text-anchor="middle" font-size="22">U / IC</text>'
 }[id];
 return begin+x+end;
}

function renderList(){
 const q=$('ecSearch').value.trim().toLowerCase(), f=$('ecFilter').value;
 const rows=DB.filter(x=>(f==='all'||x.group===f)&&(!q||[x.code,x.name,x.mark,x.intro,...x.types,...x.uses].join(' ').toLowerCase().includes(q)));
 $('ecList').style.display='grid'; $('ecDetail').innerHTML='';
 $('ecList').innerHTML=rows.length?rows.map(x=>'<article class="card ecCard" data-ec="'+x.id+'"><div class="ecPhoto">'+photo(x.id)+'</div><div><div class="ecCode">'+esc(x.code)+'</div><h2>'+esc(x.name)+'</h2><p class="muted small">'+esc(x.intro)+'</p><span class="badge">PCB: '+esc(x.mark)+'</span><span class="badge">'+esc(x.meter)+'</span></div></article>').join(''):'<div class="card"><h2>Brak wyników</h2><p>Zmień wyszukiwaną frazę lub filtr.</p></div>';
 document.querySelectorAll('[data-ec]').forEach(b=>b.addEventListener('click',()=>openDetail(b.dataset.ec)));
}

function openDetail(id){
 const x=DB.find(v=>v.id===id); if(!x)return;
 $('ecList').style.display='none';
 $('ecDetail').innerHTML='<div class="detailBox"><button class="secondary" id="ecBack">← Wróć do elementów</button><div style="margin-top:14px"><span class="badge">'+esc(x.group)+'</span><span class="badge">Oznaczenie: '+esc(x.mark)+'</span></div><h1 style="margin-top:9px">'+esc(x.code)+' — '+esc(x.name)+'</h1><div class="ecDetailTop"><div><div class="ecPhoto">'+photo(x.id)+'</div><div class="ecLegend">Zdjęcie poglądowe — obudowa i wygląd mogą różnić się zależnie od producenta.</div><div class="ecSymbol" style="margin-top:10px">'+symbol(x.id)+'</div><div class="ecLegend">Uproszczony symbol / sposób oznaczania. Sprawdź dokładny wariant w schemacie.</div></div><div><div class="card"><h2>Co to jest?</h2><p>'+esc(x.intro)+'</p></div><div class="ecFacts"><div class="ecFact"><b>Oznaczenie PCB</b>'+esc(x.mark)+'</div><div class="ecFact"><b>Wielkość</b>'+esc(x.unit)+'</div><div class="ecFact"><b>Polaryzacja</b>'+esc(x.polarity)+'</div></div><div class="card"><h2>Zastosowanie</h2>'+x.uses.map(v=>'<span class="ecSubtype">'+esc(v)+'</span>').join('')+'</div><div class="card"><h2>Najczęstsze odmiany</h2>'+x.types.map(v=>'<span class="ecSubtype">'+esc(v)+'</span>').join('')+'</div></div></div><div class="grid" style="margin-top:13px"><div class="card"><h2>📏 Pomiar krok po kroku</h2><div class="result"><b>Ustawienie miernika:</b> '+esc(x.meter)+'</div>'+x.steps.map((v,i)=>'<div class="lessonStep" style="margin-top:10px"><div class="num">'+(i+1)+'</div><div class="step" style="margin:0">'+esc(v)+'</div></div>').join('')+'</div><div><div class="card"><h2>Jak ocenić wynik?</h2><div class="okBox"><b>✓ Wynik prawidłowy</b><br>'+esc(x.good)+'</div><div class="badBox"><b>✕ Podejrzenie uszkodzenia</b><br>'+esc(x.bad)+'</div></div><div class="ecMeter ecWarn"><b>Ważna wskazówka</b><br>'+esc(x.note)+'</div><div class="note"><b>Zasada warsztatowa:</b> jeśli wynik w układzie jest niejednoznaczny, odlutuj jedną końcówkę lub cały element i ponów pomiar. Przed wymianą sprawdź oznaczenie, parametry, obudowę i pinout w datasheet.</div></div></div></div>';
 $('ecBack').onclick=()=>{ $('ecDetail').innerHTML=''; $('ecList').style.display='grid'; $('elements').scrollIntoView({behavior:'smooth',block:'start'}); };
 $('ecDetail').scrollIntoView({behavior:'smooth',block:'start'});
}

$('ecSearch').addEventListener('input',renderList);
$('ecFilter').addEventListener('change',renderList);
renderList();
})();
