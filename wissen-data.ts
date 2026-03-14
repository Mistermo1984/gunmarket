// ============================================================
// GunMarket.ch — src/lib/wissen-data.ts
// 100 Waffen + 30 Kaliber — Wikipedia-recherchiert
// Einfügen in: /Users/maurice/waffenmarkt/src/lib/wissen-data.ts
// ============================================================

export type Rechtsstatus = 'frei' | 'vertragswaffe' | 'wes' | 'abk-klein' | 'abk-gross' | 'ordonnanz'

export interface WissenWaffe {
  slug: string
  titel: string
  kategorie: string
  kurzbeschreibung: string
  inhalt: string
  rechtsstatus: Rechtsstatus
  typischeKaliber: string[]
  tags: string[]
  hersteller?: string
  baujahr?: string
}

export interface WissenMunition {
  slug: string
  bezeichnung: string
  aliase: string[]
  typ: string
  entwickelt: string
  entwickler: string
  kurzbeschreibung: string
  geschossdurchmesser: string
  huelsenlaenge: string
  standardenergie: string
  muzzleVelocity: string
  typischeWaffen: string[]
  beschreibung: string
}

// ============================================================
// WAFFEN (100 Einträge)
// ============================================================
export const wissenWaffen: WissenWaffe[] = [

  // ─── SCHWEIZER ORDONNANZWAFFEN ───────────────────────────

  {
    slug: 'stgw90',
    titel: 'Sturmgewehr 90 (SIG 550)',
    kategorie: 'Ordonnanzwaffe',
    hersteller: 'SIG / Swiss Arms',
    baujahr: '1983',
    kurzbeschreibung: 'Die Ordonnanzwaffe der Schweizer Armee seit 1983. Gilt weltweit als eines der präzisesten Sturmgewehre.',
    inhalt: `## Sturmgewehr 90 — Die Schweizer Ordonnanzwaffe
Das SIG 550 (militärisch: Sturmgewehr 90, Stgw 90) ist seit 1983 die Standardwaffe der Schweizer Armee. Bis heute wurden über 450'000 Exemplare an die Armee geliefert.

## Technische Daten
- Kaliber: 5,56×45mm NATO (Gw Pat 90)
- System: Gasdrucklader, Drehkopfverschluss
- Magazin: 5, 10, 20 oder 30 Schuss (transparenter Kunststoff)
- Länge: 998mm / eingeklappt 772mm
- Gewicht: 4,1 kg (leer)
- Feuerarten: Einzelschuss, 3-Schuss-Feuerstoss, Dauerfeuer

## Besonderheiten
Das Stgw 90 arbeitet mit einem indirekten Gasdrucksystem (wie AK-47, nicht wie M16). Jedes Gewehr wird ab Werk auf max. 11cm Streukreis auf 300m geprüft.

## Zivilversion (PE 90)
Die halbautomatische Zivilversion SG 550 PE wurde in der Schweiz über 33'000 Mal verkauft. Das persönliche Armeegewehr kann nach dem Dienst übernommen werden — umgebaut auf halbautomatisch.

## Varianten
- SG 551 (LB/SB): Kompaktere Ausführung
- SG 553 / Stgw 04/07: Sehr kompakt, für Spezialeinheiten

## Rechtsstatus Schweiz
Ordonnanzwaffe — Käufer muss Schweizer Bürger oder Niederlassungsbewilligung C besitzen.`,
    rechtsstatus: 'ordonnanz',
    typischeKaliber: ['5,56×45mm NATO'],
    tags: ['Ordonnanz', 'Sturmgewehr', 'Schweiz', 'SIG', 'Armee', 'Stgw90', 'PE90'],
  },

  {
    slug: 'k31',
    titel: 'Karabiner 31 (K31)',
    kategorie: 'Ordonnanzwaffe',
    hersteller: 'SIG / W+F Bern',
    baujahr: '1931',
    kurzbeschreibung: 'Der legendäre Schweizer Karabiner mit Geradezugverschluss. Einer der genauesten Serienkarabiner aller Zeiten.',
    inhalt: `## Karabiner 31 — Schweizer Präzisionslegende
Der K31 war von 1933 bis ca. 1974 die Ordonnanzwaffe der Schweizer Armee. Er gilt bis heute als einer der präzisesten je in Serie gefertigten Karabiner.

## Technische Daten
- Kaliber: 7,5×55mm Swiss (GP11)
- System: Geradezugverschluss (Schweizer Eigenentwicklung)
- Magazin: 6 Schuss (abnehmbar)
- Lauflänge: 652mm
- Gewicht: 4,0 kg
- Produziert: ca. 583'000 Stück (1933–1958)

## Der Geradezugverschluss
Nur gerade ziehen und stossen — keine Drehbewegung. Schnelleres Repetieren ohne Verschieben des Zielpunkts.

## Sammlerwert
Gut erhaltene K31 mit Diopter: CHF 300–800. Mit Zielfernrohr bis CHF 2000+.

## Rechtsstatus Schweiz
Ordonnanzwaffe — Käufer muss Schweizer Bürger oder C-Bewilligung sein.`,
    rechtsstatus: 'ordonnanz',
    typischeKaliber: ['7,5×55mm Swiss (GP11)'],
    tags: ['Ordonnanz', 'K31', 'Karabiner', 'Schweiz', 'Geradezug', 'Sammler', 'GP11'],
  },

  {
    slug: 'stgw57',
    titel: 'Sturmgewehr 57 (SIG 510)',
    kategorie: 'Ordonnanzwaffe',
    hersteller: 'SIG',
    baujahr: '1957',
    kurzbeschreibung: 'Vorgänger des Stgw 90. Robust, präzise — und mit 5,7 kg das schwerste Schweizer Ordonnanzgewehr.',
    inhalt: `## Sturmgewehr 57 — Schweres Schweizer Qualitätsgewehr
Das Stgw 57 (SIG SG 510) war von 1957 bis ca. 1990 die Ordonnanzwaffe der Schweizer Armee.

## Technische Daten
- Kaliber: 7,5×55mm Swiss (GP11)
- System: Rollenverzögerter Rückstoßlader
- Magazin: 24 Schuss
- Länge: 1016mm
- Gewicht: 5,7 kg (leer!)
- Feuerarten: Einzelschuss, Dauerfeuer
- Zweibein: integriert

## Sammlerwert
CHF 600–1500. Durch Kaliber GP11 ist Munition etwas teurer.

## Rechtsstatus Schweiz
Ordonnanzwaffe — Käufer muss Schweizer Bürger sein.`,
    rechtsstatus: 'ordonnanz',
    typischeKaliber: ['7,5×55mm Swiss (GP11)'],
    tags: ['Ordonnanz', 'Stgw57', 'SIG', 'Schweiz', 'Sammler', 'GP11'],
  },

  {
    slug: 'sig-p210',
    titel: 'SIG P210 (Pistole 49)',
    kategorie: 'Ordonnanzwaffe',
    hersteller: 'SIG',
    baujahr: '1949',
    kurzbeschreibung: 'Die Schweizer Präzisionspistole. Ordonnanz der Armee 1949–1975. Heute Sammlerstück und Sportikone.',
    inhalt: `## SIG P210 — Die Schweizer Präzisionspistole
Die SIG P210 (Ordonnanz: Pistole 49) gilt weltweit als eine der präzisesten je in Serie gefertigten Pistolen.

## Technische Daten
- Kaliber: 9×19mm (Armee), auch 7,65mm Parabellum
- Magazin: 8 Schuss
- Gewicht: 900g
- Besonderheit: Verschluss läuft INNEN im Rahmen → extreme Präzision

## Varianten
- P210-5: Sportmodell, verlängerter Lauf 150mm
- P210-6: Sportmodell, Lauf 120mm, am verbreitetsten
- P210-7: .22lr Ausführung

## Sammlerwert
CHF 800–2000. P210-5 (Sportlauf): CHF 1500–3000+.

## Rechtsstatus
Ordonnanzwaffe — Schweizer Bürger oder C-Ausweis.`,
    rechtsstatus: 'ordonnanz',
    typischeKaliber: ['9×19mm', '7,65mm Parabellum'],
    tags: ['Ordonnanz', 'SIG', 'P210', 'P49', 'Schweiz', 'Sammler', 'Präzision'],
  },

  {
    slug: 'p06',
    titel: 'Parabellum P06 (Luger)',
    kategorie: 'Ordonnanzwaffe',
    hersteller: 'DWM / W+F Bern',
    baujahr: '1906',
    kurzbeschreibung: 'Die ikonische Kniehebelpistole. Schweizer Ordonnanzpistole 1906–1949. Heiss begehrtes Sammlerstück.',
    inhalt: `## Parabellum P06 — Die ikonische Kniehebelpistole
Die Parabellum-Pistole (bekannt als "Luger") war von 1906 bis 1949 die Ordonnanzpistole der Schweizer Armee.

## Technische Daten
- Kaliber: 7,65×21mm Parabellum (P06), später 9×19mm (P06/29)
- System: Kniehebelverschluss (Toggleverschluss)
- Magazin: 8 Schuss
- Lauflänge: 120mm

## Sammlerwert
CHF 1500–5000+ je nach Zustand, Jahrgang und Vollständigkeit.

## Rechtsstatus
Ordonnanzwaffe.`,
    rechtsstatus: 'ordonnanz',
    typischeKaliber: ['7,65×21mm Parabellum', '9×19mm'],
    tags: ['Ordonnanz', 'P06', 'Luger', 'Parabellum', 'Schweiz', 'Sammler', 'Kniehebel'],
  },

  {
    slug: 'k11',
    titel: 'Karabiner 1911 (K11)',
    kategorie: 'Ordonnanzwaffe',
    hersteller: 'W+F Bern / SIG',
    baujahr: '1911',
    kurzbeschreibung: 'Vorgänger des K31. Schmidt-Rubin System mit Drehverschluss. Beliebtes Sammlerstück.',
    inhalt: `## Karabiner 1911 — Schmidt-Rubin Drehverschluss
Der K11 ist ein Repetierer nach dem Schmidt-Rubin-System und der Vorgänger des K31.

## Technische Daten
- Kaliber: 7,5×55mm Swiss (GP11)
- System: Drehverschluss (Schmidt-Rubin)
- Magazin: 6 Schuss
- Lauflänge: 590mm
- Produziert: ca. 185'000 Stück

## Sammlermarkt
K11 in gutem Zustand: CHF 200–500.`,
    rechtsstatus: 'ordonnanz',
    typischeKaliber: ['7,5×55mm Swiss'],
    tags: ['Ordonnanz', 'K11', 'Karabiner', 'Schmidt-Rubin', 'Schweiz', 'Sammler'],
  },

  {
    slug: 'vetterli',
    titel: 'Vetterli-Gewehr (1869)',
    kategorie: 'Historische Waffe',
    hersteller: 'Eidg. Waffenfabrik',
    baujahr: '1869',
    kurzbeschreibung: 'Das erste Repetiergewehr der Schweizer Armee (1869). Vor 1871 — frei erhältlich, kein Kaufvertrag.',
    inhalt: `## Vetterli — Das erste Schweizer Repetiergewehr
Das Vetterli-Gewehr (Modell 1869) war das erste Hinterladergewehr der Schweizer Armee und das erste Repetiergewehr einer europäischen Armee überhaupt.

## Technische Daten
- Kaliber: 10,4×38mm R (Randfeuerzündung)
- System: Unterhebelrepetierer mit Tubusmagazin (12 Schuss)
- Lauflänge: 840mm
- Produziert: ca. 175'000 Stück

## Rechtsstatus
Vor 1871 entwickelt → freie Waffe, kein Kaufvertrag. Munition kaum erhältlich (Wiederlader).`,
    rechtsstatus: 'frei',
    typischeKaliber: ['10,4×38mm R'],
    tags: ['Historisch', 'Vetterli', 'Schweiz', 'Sammler', 'Vor1871'],
  },

  // ─── PISTOLEN ────────────────────────────────────────────

  {
    slug: 'sig-p226',
    titel: 'SIG Sauer P226',
    kategorie: 'Pistole',
    hersteller: 'SIG Sauer',
    baujahr: '1984',
    kurzbeschreibung: 'Profi-Pistole der Polizei und Spezialeinheiten weltweit. Navy SEALs, GSG9 und mehr.',
    inhalt: `## SIG Sauer P226 — Die Weltpolizeipistole
Die P226 wird von Polizei, Militär und Spezialeinheiten in über 40 Ländern eingesetzt.

## Technische Daten
- Kaliber: 9×19mm (auch .40 S&W, .357 SIG)
- System: Rückstoßlader, DA/SA
- Magazin: 15+1 Schuss (9mm)

## Varianten
- P226 Navy: Für US Navy SEALs, rostfreier Lauf
- P226 Legion: Premium-Ausführung
- P226 X5: Wettbewerbsmodell

## Rechtsstatus Schweiz
Vertragswaffe. Sehr weit verbreitet.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm', '.40 S&W', '.357 SIG'],
    tags: ['Pistole', 'SIG', 'P226', 'Polizei', 'DA/SA', 'SEALs'],
  },

  {
    slug: 'sig-p320',
    titel: 'SIG Sauer P320',
    kategorie: 'Pistole',
    hersteller: 'SIG Sauer',
    baujahr: '2014',
    kurzbeschreibung: 'Modulare Pistole. Seit 2017 die neue US-Army Pistole (M17). Austauschbarer Griffrahmen.',
    inhalt: `## SIG Sauer P320 — Die modulare Servicepistole
Der "Feuerkern" (FCU) ist das eigentliche Waffenstück — Griffe, Schlitten, Läufe austauschbar.

## Technische Daten
- Kaliber: 9×19mm, .40 S&W, .357 SIG, .45 ACP
- System: Striker-fired
- Magazin: 17+1 (9mm Full Size)

## M17 — US Army Pistole
2017 gewann die P320 (als M17/M18) die US Army Ausschreibung — einer der grössten Rüstungsverträge.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm', '.40 S&W', '.45 ACP'],
    tags: ['Pistole', 'SIG', 'P320', 'M17', 'US-Army', 'Modular', 'Striker'],
  },

  {
    slug: 'glock-17',
    titel: 'Glock 17',
    kategorie: 'Pistole',
    hersteller: 'Glock',
    baujahr: '1982',
    kurzbeschreibung: 'Die revolutionäre Kunststoffpistole. Meistverkaufte Pistole weltweit. 34 Teile, extrem zuverlässig.',
    inhalt: `## Glock 17 — Die Pistole die alles veränderte
1982 revolutionierte Glock die Pistolenentwicklung: Kunststoffrahmen, "Safe Action" Abzug, nur 34 Teile.

## Technische Daten
- Kaliber: 9×19mm
- System: Safe Action (teilgespannter Schlagbolzen)
- Magazin: 17+1 Schuss
- Gewicht: 625g (leer)

## Generationen
Gen 1 (1982) → Gen 2 (1988) → Gen 3 (1998, Picatinny) → Gen 4 (2010) → Gen 5 (2017)

## Rechtsstatus Schweiz
Vertragswaffe. Weit verbreitet bei Polizei und Sportschützen.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm'],
    tags: ['Pistole', 'Glock', 'G17', 'Polymer', 'Polizei', 'Safe-Action'],
  },

  {
    slug: 'glock-19',
    titel: 'Glock 19',
    kategorie: 'Pistole',
    hersteller: 'Glock',
    baujahr: '1988',
    kurzbeschreibung: 'Der universelle Allrounder. Kompakter als G17, 15+1 Schuss — die meistverkaufte Pistole der Welt.',
    inhalt: `## Glock 19 — Der Universalallrounder
Kompakter als die G17, aber mit 15+1 Schuss. Kompatibel mit G17-Magazinen (17/33 Schuss).

## Technische Daten
- Kaliber: 9×19mm
- Magazin: 15+1 Schuss
- Lauflänge: 102mm (G17: 114mm)
- Gewicht: 595g

## Rechtsstatus Schweiz
Vertragswaffe.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm'],
    tags: ['Pistole', 'Glock', 'G19', 'Compact', 'Allrounder'],
  },

  {
    slug: 'glock-34',
    titel: 'Glock 34 / 35',
    kategorie: 'Pistole',
    hersteller: 'Glock',
    baujahr: '1998',
    kurzbeschreibung: 'Glock Wettbewerbspistole. Langer Lauf, langer Sichtradius, optimierter Abzug. IPSC Standard.',
    inhalt: `## Glock 34/35 — IPSC Standard
Die G34 (9mm) und G35 (.40 S&W) sind für den Wettbewerbseinsatz optimiert: Längerer Lauf, verbesserter Abzug.

## Rechtsstatus
Vertragswaffe.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm', '.40 S&W'],
    tags: ['Pistole', 'Glock', 'IPSC', 'Wettkampf'],
  },

  {
    slug: 'walther-ppk',
    titel: 'Walther PPK',
    kategorie: 'Pistole',
    hersteller: 'Walther',
    baujahr: '1931',
    kurzbeschreibung: 'James Bonds Pistole. Kompakt, elegant, DA/SA. Klassiker der Taschenpistolen seit 1931.',
    inhalt: `## Walther PPK — Ikone der Kompaktpistolen
Seit 1931 produziert — und durch James Bond (ab "Dr. No", 1962) weltberühmt.

## Technische Daten
- Kaliber: .380 ACP (9mm Kurz), auch .32 ACP
- System: DA/SA, fester Lauf
- Magazin: 7+1 Schuss (.380 ACP)

## Rechtsstatus Schweiz
Vertragswaffe.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['.380 ACP', '.32 ACP'],
    tags: ['Pistole', 'Walther', 'PPK', 'JamesBond', 'Kompakt'],
  },

  {
    slug: 'walther-p99',
    titel: 'Walther P99',
    kategorie: 'Pistole',
    hersteller: 'Walther',
    baujahr: '1997',
    kurzbeschreibung: 'James Bonds Dienstpistole seit 1997. Anti-Stress Abzugssystem — kombiniert SA und DA.',
    inhalt: `## Walther P99 — Bond übernimmt die neue Generation
Seit "Der Morgen stirbt nie" (1997) Bonds Pistole. Einzigartiges AS-Abzugssystem.

## AS-Abzugssystem
Einzigartiges System: Kann DA-Abzug ODER nach Betätigung des Entspannknopfs SA führen.

## Nachfolger
Walther PPQ und PPQ M2 sind die Weiterentwicklungen.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm', '.40 S&W'],
    tags: ['Pistole', 'Walther', 'P99', 'JamesBond', 'AS-System'],
  },

  {
    slug: 'walther-ppq',
    titel: 'Walther PPQ / PDP',
    kategorie: 'Pistole',
    hersteller: 'Walther',
    baujahr: '2011',
    kurzbeschreibung: 'Moderner Striker mit legendär gutem Abzug. Von vielen Testern als bester Serienmässig-Abzug bewertet.',
    inhalt: `## Walther PPQ / PDP
Die PPQ gilt bei vielen Testern als die Pistole mit dem besten Striker-Abzug der Industrie. PDP (2021) ist der Nachfolger mit Optics-Ready Schlitten.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm', '.40 S&W'],
    tags: ['Pistole', 'Walther', 'PPQ', 'PDP', 'Striker'],
  },

  {
    slug: 'cz75',
    titel: 'CZ 75',
    kategorie: 'Pistole',
    hersteller: 'CZ (Česká Zbrojovka)',
    baujahr: '1975',
    kurzbeschreibung: 'Die tschechische Präzisionspistole. Ergonomisch, präzise, günstig — einer der besten Werte.',
    inhalt: `## CZ 75 — Tschechische Qualität zum fairen Preis
Sehr ergonomisch — der Schlitten läuft INNEN im Rahmen (wie P210).

## Technische Daten
- Kaliber: 9×19mm (auch .40 S&W)
- System: DA/SA
- Magazin: 16+1 Schuss

## CZ 75 Familie
- CZ 75 B: Standard
- CZ 75 SP-01: Polizeiversion
- CZ Shadow 2: Wettkampf
- CZ P-10: Glock-Konkurrent`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm', '.40 S&W'],
    tags: ['Pistole', 'CZ', 'CZ75', 'Tschechien', 'IPSC', 'Präzision'],
  },

  {
    slug: 'cz-shadow2',
    titel: 'CZ Shadow 2',
    kategorie: 'Pistole',
    hersteller: 'CZ',
    baujahr: '2016',
    kurzbeschreibung: 'Die dominante IPSC Production-Pistole. Werksseitig mit bestem DA/SA-Abzug auf dem Markt.',
    inhalt: `## CZ Shadow 2
Die Shadow 2 ist die erfolgreichste Wettkampfpistole im IPSC Production-Bewerb. Werksseitig auf Wettkampfniveau.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm'],
    tags: ['Pistole', 'CZ', 'Shadow2', 'IPSC', 'Wettkampf'],
  },

  {
    slug: 'beretta-92',
    titel: 'Beretta 92 (M9)',
    kategorie: 'Pistole',
    hersteller: 'Beretta',
    baujahr: '1975',
    kurzbeschreibung: 'Die US-Army Pistole von 1985–2017. Berühmtester Auftritt: "Die Hard", "Lethal Weapon".',
    inhalt: `## Beretta 92 — Die US-Army Dienstpistole
Von 1985 bis 2017 Standardpistole der US-Armee (M9). Bekannt aus unzähligen Actionfilmen.

## Technische Daten
- Kaliber: 9×19mm
- System: DA/SA, offener Schlitten
- Magazin: 15+1 Schuss`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm'],
    tags: ['Pistole', 'Beretta', 'M9', 'US-Army', 'Film'],
  },

  {
    slug: 'hk-usp',
    titel: 'Heckler & Koch USP',
    kategorie: 'Pistole',
    hersteller: 'Heckler & Koch',
    baujahr: '1993',
    kurzbeschreibung: 'Deutsche Präzision von HK. Polymer-Rahmen mit O-Ring Rückstoßdämpfer. Bei Spezialeinheiten beliebt.',
    inhalt: `## HK USP — Universal Self-loading Pistol
HKs Polymer-Dienstpistole für den US-Markt. Bekanntes O-Ring-Rückstoßdämpfungssystem.

## Varianten
- USP Full Size / Compact / Tactical (Schalldämpfer-vorbereitet)
- HK45 / HK45C`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm', '.40 S&W', '.45 ACP'],
    tags: ['Pistole', 'HK', 'USP', 'Deutschland', 'Polymer'],
  },

  {
    slug: 'hk-vp9',
    titel: 'Heckler & Koch VP9',
    kategorie: 'Pistole',
    hersteller: 'HK',
    baujahr: '2014',
    kurzbeschreibung: 'HKs moderne Striker-Pistole. Exzellenter Abzug, BSF-System für individuelle Griffanpassung.',
    inhalt: `## HK VP9
HKs Antwort auf Glock und SIG — Striker-fired mit legendär gutem Abzug und austauschbaren Griffeinsätzen.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm'],
    tags: ['Pistole', 'HK', 'VP9', 'Striker'],
  },

  {
    slug: 'hk-p30',
    titel: 'HK P30 / P30L',
    kategorie: 'Pistole',
    hersteller: 'HK',
    baujahr: '2006',
    kurzbeschreibung: 'Leistungsstarke DA/SA-Dienstpistole. Modulares Griffsystem. Beliebt bei europäischen Polizeien.',
    inhalt: `## HK P30
Modulare Griffrückwände und -schalen erlauben Anpassung an jede Handgrösse. Beliebt bei Polizei in D, CH und anderen europäischen Ländern.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm', '.40 S&W'],
    tags: ['Pistole', 'HK', 'P30', 'Polizei', 'DA/SA'],
  },

  {
    slug: 'hk-mk23',
    titel: 'HK Mk23 SOCOM',
    kategorie: 'Pistole',
    hersteller: 'HK',
    baujahr: '1996',
    kurzbeschreibung: 'Für US SOCOM entwickelt. Schwerste Serienpistole — 1,2 kg — mit .45 ACP und 12+1 Schuss.',
    inhalt: `## HK Mk23 SOCOM
Auf US SOCOM-Anforderung: 30'000 Schuss Lebensdauer, Schalldämpfer-kompatibel, .45 ACP. Sehr gross und schwer.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['.45 ACP'],
    tags: ['Pistole', 'HK', 'Mk23', 'SOCOM', '.45ACP'],
  },

  {
    slug: 'colt-1911',
    titel: 'Colt M1911 / 1911A1',
    kategorie: 'Pistole',
    hersteller: 'Colt',
    baujahr: '1911',
    kurzbeschreibung: 'Die legendärste amerikanische Pistole. 74 Jahre US-Armeepistole. John Brownings Meisterwerk.',
    inhalt: `## Colt 1911 — Das amerikanische Pistolen-Urgestein
Von 1911 bis 1985 die Standardpistole der US-Armee — 74 Jahre.

## Technische Daten
- Kaliber: .45 ACP
- System: Rückstoßlader, SA, Browning-Verschluss
- Magazin: 7+1 Schuss
- Abzug: Single Action — kurz, klar, präzise

## Single Action: "Cocked and Locked"
Hahn gespannt, Sicherung gesichert — SA-Abzug ermöglicht ausgezeichnete Präzision.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['.45 ACP', '9×19mm', '.38 Super'],
    tags: ['Pistole', 'Colt', '1911', 'USA', 'SA', 'Browning', 'Klassiker'],
  },

  {
    slug: 'desert-eagle',
    titel: 'Desert Eagle',
    kategorie: 'Pistole',
    hersteller: 'Magnum Research / IMI',
    baujahr: '1983',
    kurzbeschreibung: 'Die grösste und kraftvollste Selbstladepistole. Gastreiber-System. Kult-Waffe aus unzähligen Filmen.',
    inhalt: `## Desert Eagle — Die Ikone der Grosskaliberpistolen
Gasdruckbetriebenes System — einmalig bei Pistolen. Verschiesst Revolverkaliber in einer Halbautomatik.

## Technische Daten
- Kaliber: .357 Magnum, .44 Magnum, .50 AE
- Magazin: 9 (.357), 8 (.44), 7 (.50)
- Gewicht: 1998g (.44 Mag)`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['.50 AE', '.44 Magnum', '.357 Magnum'],
    tags: ['Pistole', 'DesertEagle', 'Grosskaliber', 'Film', 'Kult', '.50AE'],
  },

  {
    slug: 'fn-high-power',
    titel: 'FN Browning High Power (HP)',
    kategorie: 'Pistole',
    hersteller: 'FN Herstal',
    baujahr: '1935',
    kurzbeschreibung: 'John Brownings letztes Meisterwerk. Die erste 13-Schuss-Pistole. Jahrzehnte bei brit. Armee.',
    inhalt: `## FN Browning High Power
Brownings letztes Design (von Saive fertiggestellt nach Brownings Tod 1926). Die erste Pistole mit 13-Schuss-Magazin.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm'],
    tags: ['Pistole', 'FN', 'BrowningHP', 'Historisch', 'Belgien'],
  },

  {
    slug: 'fn-fnx',
    titel: 'FN FNX / FNS',
    kategorie: 'Pistole',
    hersteller: 'FN Herstal',
    baujahr: '2010',
    kurzbeschreibung: 'Belgische Qualitätspistole. Vollständig ambidextrious bedienbar. FNX-45 Tactical beliebt.',
    inhalt: `## FN FNX
FN Herstal ist weltgrösster Militärwaffenlieferant. Die FNX bringt diese Qualität zivil. Alle Bedienelemente ambidextrous.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm', '.45 ACP'],
    tags: ['Pistole', 'FN', 'Belgien', 'Militär', 'Ambidextrous'],
  },

  {
    slug: 'sig-p220',
    titel: 'SIG Sauer P220',
    kategorie: 'Pistole',
    hersteller: 'SIG Sauer',
    baujahr: '1975',
    kurzbeschreibung: 'Die grosse SIG-Dienstpistole in .45 ACP. War als P75 bei der Schweizer Bundespolizei.',
    inhalt: `## SIG P220
8+1 Schuss .45 ACP mit exzellenter Verarbeitung. Als P75 Ordonnanzpistole der Schweizer Bundespolizei.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['.45 ACP', '9×19mm'],
    tags: ['Pistole', 'SIG', 'P220', 'Schweiz', 'Polizei'],
  },

  {
    slug: 'sig-p250',
    titel: 'SIG Sauer P250',
    kategorie: 'Pistole',
    hersteller: 'SIG Sauer',
    baujahr: '2005',
    kurzbeschreibung: 'Vollmodulare DAO-Pistole. Vorläufer der P320 — Fire Control Unit als eigentliches Waffenstück.',
    inhalt: `## SIG P250
Erster Versuch eines modularen Systems vor der P320. Die FCU ist die eigentliche Waffe.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm', '.40 S&W', '.45 ACP'],
    tags: ['Pistole', 'SIG', 'P250', 'Modular', 'DAO'],
  },

  {
    slug: 'sig-p365',
    titel: 'SIG Sauer P365',
    kategorie: 'Pistole',
    hersteller: 'SIG Sauer',
    baujahr: '2018',
    kurzbeschreibung: 'Mikro-Kompaktpistole mit 10+1 Schuss. Revolutionierte das Micro-9mm-Segment 2018.',
    inhalt: `## SIG P365 — Die revolutionäre Mikropistole
Trotz Glock-26-Abmessungen 10+1 Schuss — dank neuartigem Doppelreihen-Miniaturmagazin.

## Auch erhältlich: 12+1 und 15+1 Schuss-Magazine`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm'],
    tags: ['Pistole', 'SIG', 'P365', 'Mikro', 'EDC'],
  },

  {
    slug: 'springfield-hellcat',
    titel: 'Springfield Hellcat',
    kategorie: 'Pistole',
    hersteller: 'Springfield Armory',
    baujahr: '2019',
    kurzbeschreibung: 'Micro-9mm mit 11+1 Schuss. Optics-Ready ab Werk. Direktkonkurrent zur P365.',
    inhalt: `## Springfield Hellcat
Springfields Antwort auf die P365: 11+1 Schuss in kompakterer Form. OSP (Optics Sight Pistol) Schiene für Mini Red Dots.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm'],
    tags: ['Pistole', 'Springfield', 'Hellcat', 'Mikro', 'EDC'],
  },

  {
    slug: 'ruger-lcp',
    titel: 'Ruger LCP / LCP II',
    kategorie: 'Pistole',
    hersteller: 'Ruger',
    baujahr: '2008',
    kurzbeschreibung: 'Ultrakompakte .380 ACP Taschenpistole. 270g leer. Passt in jede Hosentasche.',
    inhalt: `## Ruger LCP — Ultraleichte Taschenpistole
Extrem leicht (270g) und flach. 6+1 Schuss .380 ACP. Eine der meistverkauften US-Kompaktpistolen.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['.380 ACP'],
    tags: ['Pistole', 'Ruger', 'LCP', 'Kompakt', 'Taschenpistole'],
  },

  {
    slug: 'taurus-g2c',
    titel: 'Taurus G2C / G3C',
    kategorie: 'Pistole',
    hersteller: 'Taurus',
    baujahr: '2016',
    kurzbeschreibung: 'Günstige brasilianische Pistole. CHF 300–400. Preis-Leistungs-Tipp für Einsteiger.',
    inhalt: `## Taurus G2C/G3C — Einsteigerfreundlich
Funktionelle Pistolen zum niedrigsten Preis am Markt. Für Einsteiger die ein Werkzeug und kein Prestige suchen.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm'],
    tags: ['Pistole', 'Taurus', 'Brasilien', 'Günstig', 'Einsteiger'],
  },

  {
    slug: 'springfield-xd',
    titel: 'Springfield Armory XD / XDm',
    kategorie: 'Pistole',
    hersteller: 'Springfield Armory / HS Produkt',
    baujahr: '2001',
    kurzbeschreibung: 'Kroatische Pistole unter amerikanischem Namen. Alleinstellungsmerkmal: Griffsicherung.',
    inhalt: `## Springfield XD — Die Griffsicherungs-Pistole
Ursprünglich HS2000 aus Kroatien. Kann nur abgefeuert werden wenn die Hand den Griff vollständig umfasst (Grip Safety).`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm', '.40 S&W', '.45 ACP'],
    tags: ['Pistole', 'Springfield', 'XD', 'Kroatien', 'Griffsicherung'],
  },

  {
    slug: 'tanfoglio-witness',
    titel: 'Tanfoglio Witness / Stock',
    kategorie: 'Pistole',
    hersteller: 'Tanfoglio',
    baujahr: '1980',
    kurzbeschreibung: 'Italienische Wettkampfpistole auf CZ75-Basis. Sehr beliebt im IPSC Production/Standard.',
    inhalt: `## Tanfoglio Witness
Hochwertige Wettkampfpistolen auf CZ75-Grundlage. "Stock" Varianten für IPSC Production und Standard optimiert.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm', '.40 S&W'],
    tags: ['Pistole', 'Tanfoglio', 'IPSC', 'Wettkampf', 'CZ75'],
  },

  // ─── HISTORISCHE PISTOLEN ────────────────────────────────

  {
    slug: 'luger-p08',
    titel: 'Luger P08 (Parabellum)',
    kategorie: 'Historische Waffe',
    hersteller: 'DWM / Mauser / Simson',
    baujahr: '1908',
    kurzbeschreibung: 'Ikone der Handfeuerwaffen. Deutsches WW1/WW2 Seitengewehr. Extrem beliebtes Sammlerstück.',
    inhalt: `## Luger P08 — Das Kniehebel-Meisterwerk
Eines der bekanntesten Pistolen der Geschichte. Das Kniehebel-Verschluss-System macht sie unverwechselbar.

## Sammler
Originale aus WW1/WW2: CHF 500–2000+. Sonderversionen deutlich mehr.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm', '7,65mm Parabellum'],
    tags: ['Historisch', 'Luger', 'P08', 'WW1', 'WW2', 'Sammler'],
  },

  {
    slug: 'walther-p38',
    titel: 'Walther P38',
    kategorie: 'Historische Waffe',
    hersteller: 'Walther',
    baujahr: '1938',
    kurzbeschreibung: 'Deutsches WW2-Seitengewehr. Erste Pistole mit DA/SA und externem Hahn. Standard bis heute.',
    inhalt: `## Walther P38 — Erster moderner DA/SA Mechanismus
Die P38 setzte 1938 den Standard für DA/SA-Pistolen — welcher bis heute verwendet wird.

## Sammler
WW2-Originale: CHF 500–2000+.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm'],
    tags: ['Historisch', 'Walther', 'P38', 'WW2', 'DA/SA', 'Sammler'],
  },

  // ─── REVOLVER ────────────────────────────────────────────

  {
    slug: 'sw-686',
    titel: 'Smith & Wesson 686 (+)',
    kategorie: 'Revolver',
    hersteller: 'Smith & Wesson',
    baujahr: '1980',
    kurzbeschreibung: 'Der klassische Sportrevolver in .357 Magnum. Edelstahl, 6 oder 7 Schuss. Standard im Revolversport.',
    inhalt: `## Smith & Wesson 686 — Der Revolversport-Standard
L-Frame, Edelstahl, .357 Magnum. Dominiert den Revolversport seit den 1980ern.

## Varianten
- 686: 6-Schuss
- 686+: 7-Schuss-Trommel
- 686 Performance Center: Wettkampfabzug
- 686 SSR Pro: Professional Service Revolver`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['.357 Magnum', '.38 Special'],
    tags: ['Revolver', 'SW', 'S&W686', 'Sport', 'Edelstahl', '.357Mag'],
  },

  {
    slug: 'colt-python',
    titel: 'Colt Python',
    kategorie: 'Revolver',
    hersteller: 'Colt',
    baujahr: '1955',
    kurzbeschreibung: '"Der Rolls-Royce der Revolver." Legendär für Abzug und Präzision. Sehr hoher Sammlerwert.',
    inhalt: `## Colt Python — Der beste Revolver der Welt?
1955–1999 produziert (2020 neu aufgelegt). Polierter Abzug, Ventrilated Rib, Handarbeit.

## Sammlerwert
Original Python (1955–1999): CHF 2000–5000+.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['.357 Magnum'],
    tags: ['Revolver', 'Colt', 'Python', 'Sammler', 'Klassiker'],
  },

  {
    slug: 'colt-saa',
    titel: 'Colt Single Action Army',
    kategorie: 'Revolver',
    hersteller: 'Colt',
    baujahr: '1873',
    kurzbeschreibung: '"The Peacemaker". Ikonischster Revolver des Wilden Westens. Single Action, 6 Schuss.',
    inhalt: `## Colt SAA — "The Peacemaker"
DER Western-Revolver schlechthin. Seit 1873 in Produktion. Hahn muss manuell gespannt werden (Single Action).`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['.45 Long Colt', '.357 Magnum'],
    tags: ['Revolver', 'Colt', 'SAA', 'Peacemaker', 'Western'],
  },

  {
    slug: 'sw-629',
    titel: 'Smith & Wesson 629',
    kategorie: 'Revolver',
    hersteller: 'Smith & Wesson',
    baujahr: '1979',
    kurzbeschreibung: '.44 Magnum Edelstahl-Revolver. Bekannt aus "Dirty Harry" — "The most powerful handgun in the world".',
    inhalt: `## S&W 629 — Dirty Harrys Kanone
N-Frame, Edelstahl, .44 Magnum. Durch Clint Eastwood als "Dirty Harry" weltberühmt.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['.44 Magnum', '.44 Special'],
    tags: ['Revolver', 'SW', '629', '.44Magnum', 'DirtyHarry'],
  },

  {
    slug: 'ruger-gp100',
    titel: 'Ruger GP100',
    kategorie: 'Revolver',
    hersteller: 'Ruger',
    baujahr: '1985',
    kurzbeschreibung: 'Robuster .357 Magnum-Arbeitsrevolver. Triple-Locking, nahezu unzerstörbar. Günstigere Alternative zur S&W 686.',
    inhalt: `## Ruger GP100 — Der unzerstörbare Arbeitsrevolver
Triple-Locking-System, Massivstes Rahmensystem. Kein Stift-Federsystem — einzelne Maschinenfedern.

## Günstigere Alternative
90% der Qualität einer S&W 686 zu 70% des Preises.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['.357 Magnum', '.38 Special'],
    tags: ['Revolver', 'Ruger', 'GP100', 'Robust'],
  },

  {
    slug: 'ruger-sp101',
    titel: 'Ruger SP101',
    kategorie: 'Revolver',
    hersteller: 'Ruger',
    baujahr: '1988',
    kurzbeschreibung: 'Kompakter Stahl-Revolver mit 5 Schuss .357 Magnum. Robuster als viele Leichtmetall-Konkurrenten.',
    inhalt: `## Ruger SP101
Kompakter J-Frame-Konkurrent in Stahl. 5 Schuss .357 Magnum — sehr robust für diese Grösse.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['.357 Magnum', '.38 Special'],
    tags: ['Revolver', 'Ruger', 'SP101', 'Kompakt'],
  },

  {
    slug: 'sw-model-60',
    titel: 'S&W Model 60',
    kategorie: 'Revolver',
    hersteller: 'Smith & Wesson',
    baujahr: '1965',
    kurzbeschreibung: 'Erster Edelstahl-Revolver der Welt (1965). J-Frame, 5 Schuss. Kompakt und robust.',
    inhalt: `## S&W Model 60 — Der erste Edelstahl-Revolver
1965 der erste je gefertigte Edelstahl-Revolver. J-Frame, 5 Schuss .38 Special / .357 Magnum.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['.38 Special', '.357 Magnum'],
    tags: ['Revolver', 'SW', 'Model60', 'Edelstahl', 'Kompakt'],
  },

  {
    slug: 'korth',
    titel: 'Korth Revolver',
    kategorie: 'Revolver',
    hersteller: 'Korth',
    baujahr: '1964',
    kurzbeschreibung: 'Der teuerste Produktionsrevolver der Welt. Vollständig in Deutschland handgefertigt. CHF 3000–8000.',
    inhalt: `## Korth — Das Nonplusultra
Vollständig in Deutschland handgefertigt mit Toleranzen die andere Hersteller nicht erreichen.

## Preis
CHF 3000–8000 je nach Modell.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['.357 Magnum', '.44 Magnum'],
    tags: ['Revolver', 'Korth', 'Premium', 'Handarbeit', 'Deutschland'],
  },

  // ─── BÜCHSEN: JAGD & SPORT ───────────────────────────────

  {
    slug: 'blaser-r8',
    titel: 'Blaser R8',
    kategorie: 'Büchse',
    hersteller: 'Blaser',
    baujahr: '2008',
    kurzbeschreibung: 'Deutsches Premiumgewehr mit Geradezugverschluss. Schnell, präzise, modular. Die Referenz.',
    inhalt: `## Blaser R8 — Die Referenz der Jagdbüchsen
Geradezugverschluss für schnelles Repetieren ohne Zielpunktverlust. 30+ Kaliber wechselbar.

## Modularität
Lauf und Magazin wechselbar — ein Grundgewehr für viele Kaliber.

## Rechtsstatus
Freie Waffe (Standardmagazin).`,
    rechtsstatus: 'frei',
    typischeKaliber: ['7×64mm', '.308 Win', '6,5 Creedmoor', '9,3×62mm'],
    tags: ['Büchse', 'Blaser', 'R8', 'Jagd', 'Premium', 'Geradezug', 'Modular'],
  },

  {
    slug: 'sako-85',
    titel: 'Sako 85',
    kategorie: 'Büchse',
    hersteller: 'Sako',
    baujahr: '2006',
    kurzbeschreibung: 'Finnische Präzision. Einer der besten Abzüge serienmässig. Sehr beliebt in der Schweiz.',
    inhalt: `## Sako 85 — Finnische Präzision
4 Rahmengrössen (S bis XL) für alle Kaliber. Verstellbarer Abzug, sehr präzise ab Werk. Typisch unter 1 MOA.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['7×64mm', '.308 Win', '.30-06', '6,5×55mm'],
    tags: ['Büchse', 'Sako', 'Finnland', 'Jagd', 'Präzision'],
  },

  {
    slug: 'tikka-t3x',
    titel: 'Tikka T3x',
    kategorie: 'Büchse',
    hersteller: 'Tikka',
    baujahr: '2016',
    kurzbeschreibung: 'Finnische Präzision zum fairen Preis. CHF 700–900 für sub-MOA Leistung. Preis-Leistungs-Sieger.',
    inhalt: `## Tikka T3x — Preis-Leistungs-Sieger
Tikka (Sako-Gruppe) bietet sub-MOA-Präzision für CHF 700–900. Kein anderer Hersteller in dieser Preisklasse.

## Varianten: Lite, Forest, Tactical, CTR, Varmint`,
    rechtsstatus: 'frei',
    typischeKaliber: ['7×64mm', '.308 Win', '6,5 Creedmoor', '.243 Win'],
    tags: ['Büchse', 'Tikka', 'T3x', 'Preis-Leistung', 'Jagd'],
  },

  {
    slug: 'mauser-m18',
    titel: 'Mauser M18',
    kategorie: 'Büchse',
    hersteller: 'Mauser',
    baujahr: '2018',
    kurzbeschreibung: 'Moderner Mauser zum erschwinglichen Preis. CHF 700–900. Europas günstigstes Premium-Jagdgewehr.',
    inhalt: `## Mauser M18 — Günstiger Einstieg in Mauser-Qualität
Mauser-typischer Controlled Round Feed Drehverschluss, Direct Trigger, Polymer-Schaft. M98 Qualität zu Tikka-Preisen.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['.308 Win', '7×64mm', '6,5 Creedmoor', '.30-06'],
    tags: ['Büchse', 'Mauser', 'M18', 'Jagd', 'Preis-Leistung'],
  },

  {
    slug: 'steyr-mannlicher',
    titel: 'Steyr Mannlicher CL II',
    kategorie: 'Büchse',
    hersteller: 'Steyr Arms',
    baujahr: '2004',
    kurzbeschreibung: 'Österreichische Jagdtradition seit 1864. Bekannt für den Set Trigger (Stecher) und Qualität.',
    inhalt: `## Steyr Mannlicher — Österreichische Jagdtradition
Set Trigger (Stecher): Abzug kann auf <100g "gesetzt" werden — perfekt für den ruhigen Jagdschuss.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['7×64mm', '.308 Win', '6,5×55mm', '9,3×62mm'],
    tags: ['Büchse', 'Steyr', 'Mannlicher', 'Österreich', 'Jagd', 'SetTrigger'],
  },

  {
    slug: 'remington-700',
    titel: 'Remington Model 700',
    kategorie: 'Büchse',
    hersteller: 'Remington',
    baujahr: '1962',
    kurzbeschreibung: 'Amerikas beliebtestes Präzisionsgewehr. Basis für M24 und M40 US-Scharfschützengewehre.',
    inhalt: `## Remington 700 — Das amerikanische Präzisions-Urgestein
Als M24 (US Army) und M40 (USMC) Basis der amerikanischen Militär-Scharfschützengewehre. Riesiger Aftermarket.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['.308 Win', '.30-06', '6,5 Creedmoor', '.300 Win Mag'],
    tags: ['Büchse', 'Remington', '700', 'USA', 'Scharfschütze', 'Militär'],
  },

  {
    slug: 'winchester-70',
    titel: 'Winchester Model 70',
    kategorie: 'Büchse',
    hersteller: 'Winchester',
    baujahr: '1936',
    kurzbeschreibung: '"The Rifleman\'s Rifle". Klassischer amerikanischer Repetierer — Controlled Round Feed.',
    inhalt: `## Winchester Model 70 — "The Rifleman's Rifle"
Controlled Round Feed (Claw-Extractor): Patrone wird sofort sicher gefasst — gilt als zuverlässigstes Verschlusssystem.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['.308 Win', '.30-06', '.270 Win', '.300 Win Mag'],
    tags: ['Büchse', 'Winchester', 'Model70', 'USA', 'Klassiker', 'CRF'],
  },

  {
    slug: 'sig-ssg3000',
    titel: 'SIG SSG 3000',
    kategorie: 'Büchse',
    hersteller: 'SIG',
    baujahr: '1991',
    kurzbeschreibung: 'Schweizer Polizei-Scharfschützengewehr. Standard bei Kantonspolizeien. <1 MOA auf 300m.',
    inhalt: `## SIG SSG 3000 — Das Schweizer Polizei-Präzisionsgewehr
Standard-Scharfschützengewehr der Schweizer Polizei. .308 Win, 5+1 Schuss, Mauser-basierter Verschluss.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['.308 Win'],
    tags: ['Büchse', 'SIG', 'SSG3000', 'Scharfschütze', 'Polizei', 'Schweiz'],
  },

  {
    slug: 'anschuetz-1913',
    titel: 'Anschütz 1913 / 1912',
    kategorie: 'Büchse',
    hersteller: 'Anschütz',
    baujahr: '1960er',
    kurzbeschreibung: 'Das olympische KK-Wettkampfgewehr. Weltklasse Präzision in .22 LR. Olympia-Standard.',
    inhalt: `## Anschütz 1913 — Olympische Perfektion
Standard für 3-Stellungs-KK (50m). Aluminium-Chassis, voll verstellbar, Abzug unter 100g möglich.

## Präzision
Mit Match-Munition unter 5mm Gruppe auf 50m.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['.22 LR'],
    tags: ['KK', 'Anschütz', 'Olympisch', 'Wettkampf', 'Präzision'],
  },

  // ─── HISTORISCHE BÜCHSEN ─────────────────────────────────

  {
    slug: 'mauser-k98',
    titel: 'Mauser K98k',
    kategorie: 'Historische Waffe',
    hersteller: 'Mauser / Diverse',
    baujahr: '1935',
    kurzbeschreibung: 'Das Standardgewehr der Wehrmacht. Über 14 Millionen produziert. Basis aller modernen Jagdgewehre.',
    inhalt: `## Mauser K98k — Wehrmacht-Standard
Das Karabiner 98k war das Standardgewehr der deutschen Wehrmacht im WW2. Das Mauser-98-Verschlusssystem ist die Basis fast aller modernen Jagdgewehre.

## Sammlerwert
CHF 400–2000+ je nach Zustand und Markierungen.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['7,92×57mm (8×57mm IS)'],
    tags: ['Historisch', 'Mauser', 'K98', 'WW2', 'Sammler'],
  },

  {
    slug: 'fg42',
    titel: 'FG 42 (historisch)',
    kategorie: 'Historische Waffe',
    hersteller: 'Krieghoff / Rheinmetall',
    baujahr: '1942',
    kurzbeschreibung: 'Deutsches Fallschirmjägergewehr WW2. Das fortschrittlichste Gewehr des 2. Weltkriegs. Sehr selten.',
    inhalt: `## FG 42 — Das fortschrittlichste Gewehr des WW2
Vereinte als erstes Gewehr alle Merkmale eines modernen Sturmgewehrs. Nur ca. 7000–12000 produziert.

## Sammlerwert
CHF 20000–50000+ für gut erhaltene originale Exemplare.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['7,92×57mm'],
    tags: ['Historisch', 'WW2', 'Sammler', 'FG42', 'Selten'],
  },

  // ─── LANGWAFFEN: KLEINKALIBER ────────────────────────────

  {
    slug: 'cz452',
    titel: 'CZ 452 / 457',
    kategorie: 'Büchse',
    hersteller: 'CZ',
    baujahr: '1954 (452) / 2019 (457)',
    kurzbeschreibung: 'Meistverkauftes KK-Gewehr Europas. Tschechische Qualität zu sehr fairem Preis.',
    inhalt: `## CZ 452/457
Meistverkauftes KK-Gewehr Europas. 5 oder 10 Schuss Magazin, verstellbarer Abzug.

## CZ 457 (Nachfolger): modulareres System, .22 LR / .22 WMR / .17 HMR`,
    rechtsstatus: 'frei',
    typischeKaliber: ['.22 LR', '.17 HMR'],
    tags: ['KK', 'CZ', 'Kleinkaliber', 'Training'],
  },

  {
    slug: 'tikka-t1x',
    titel: 'Tikka T1x',
    kategorie: 'Büchse',
    hersteller: 'Tikka',
    baujahr: '2017',
    kurzbeschreibung: 'Finnische .22 LR Büchse im T3x-Design. Gleiches Feeling wie das Hauptgewehr — günstiges Training.',
    inhalt: `## Tikka T1x
T3x-Ergonomie in .22 LR — gleiche Handhabung, viel günstigere Munition.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['.22 LR', '.17 HMR'],
    tags: ['KK', 'Tikka', 'T1x', 'Training'],
  },

  {
    slug: 'ruger-1022',
    titel: 'Ruger 10/22',
    kategorie: 'Büchse',
    hersteller: 'Ruger',
    baujahr: '1964',
    kurzbeschreibung: 'Das meistverkaufte .22 LR Halbautomatik-Gewehr. Riesiger Aftermarket. BX-25 Magazin.',
    inhalt: `## Ruger 10/22
Meistverkauftes halbautomatisches .22 LR Gewehr weltweit. Riesiger Aftermarket für beliebige Konfigurationen.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['.22 LR'],
    tags: ['KK', 'Ruger', '1022', 'Halbautomatisch'],
  },

  // ─── SCHARFSCHÜTZENGEWEHRE ───────────────────────────────

  {
    slug: 'ai-awm',
    titel: 'Accuracy International AXMC / AWM',
    kategorie: 'Büchse',
    hersteller: 'Accuracy International',
    baujahr: '1982',
    kurzbeschreibung: 'Das Referenz-Scharfschützengewehr britischer Spezialeinheiten. Weltrekord: 2475m (Craig Harrison, 2009).',
    inhalt: `## Accuracy International — Britische Präzision
AWM hält den verifizierten Weltrekord: Craig Harrison, Afghanistan 2009, 2475m.

## AXMC: Modular für .308 Win / .300 Win Mag / .338 Lapua Magnum.

## Einsatz
UK SAS/SBS, Bundeswehr (G22A2), NATO-Scharfschützen.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['.308 Win', '.338 Lapua Magnum', '.300 Win Mag'],
    tags: ['Scharfschütze', 'AI', 'AXMC', 'UK', 'Präzision', 'Weltrekord'],
  },

  {
    slug: 'barrett-m82',
    titel: 'Barrett M82 (.50 BMG)',
    kategorie: 'Büchse',
    hersteller: 'Barrett Firearms',
    baujahr: '1982',
    kurzbeschreibung: 'Das "Anti-Material Rifle" in .50 BMG. 14 kg, 10 Schuss, effektive Reichweite 1800m.',
    inhalt: `## Barrett M82 — Das Anti-Material Rifle
.50 BMG (12,7×99mm NATO). Für gepanzerte Fahrzeuge, Munitionsdepots, Langstrecke.

## Rechtsstatus Schweiz
Vertragswaffe. Durch Grösse und Preis praktisch nur für Sammler.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['.50 BMG (12,7×99mm)'],
    tags: ['Scharfschütze', 'Barrett', 'M82', '.50BMG', 'Anti-Material'],
  },

  // ─── STURMGEWEHRE ────────────────────────────────────────

  {
    slug: 'ak47-akm',
    titel: 'AK-47 / AKM (Kalaschnikow)',
    kategorie: 'Büchse',
    hersteller: 'IZHMASH',
    baujahr: '1947',
    kurzbeschreibung: 'Das meistproduzierte Sturmgewehr der Geschichte. Über 100 Millionen Exemplare. Symbol des 20. Jh.',
    inhalt: `## AK-47 / AKM — Das Gewehr des 20. Jahrhunderts
100+ Millionen Exemplare in über 100 Ländern. Michail Kalaschnikow entwarf das Original 1947.

## Rechtsstatus Schweiz
Semi-automatische AK-Varianten: Vertragswaffe. Vollautomatisch: verboten.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['7,62×39mm'],
    tags: ['Sturmgewehr', 'AK47', 'Kalaschnikow', 'Russland', 'Ikone'],
  },

  {
    slug: 'ar15-m16',
    titel: 'AR-15 / M16 Plattform',
    kategorie: 'Büchse',
    hersteller: 'ArmaLite / Colt / Viele',
    baujahr: '1959',
    kurzbeschreibung: 'Das modularste Gewehrsystem der Welt. Hunderte Hersteller. IPSC Rifle-Standard.',
    inhalt: `## AR-15 — Das amerikanische Modularsystem
Upper-Receiver (Lauf, Handschutz) und Lower-Receiver (Griffstück, Abzug) — getrennt, wechselbar.

## Rechtsstatus Schweiz
Semi-automatisch: Vertragswaffe.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['5,56×45mm', '.223 Remington', '.300 Blackout'],
    tags: ['Sturmgewehr', 'AR15', 'M16', 'USA', 'Modular', 'IPSC'],
  },

  {
    slug: 'hk416',
    titel: 'Heckler & Koch HK416',
    kategorie: 'Büchse',
    hersteller: 'HK',
    baujahr: '2004',
    kurzbeschreibung: 'Deutsche Weiterentwicklung des AR-15. Gaskolben statt Direktimpuls. US Navy SEALs, Bundeswehr.',
    inhalt: `## HK416 — Das verbesserte AR-15
Kurzer Gaskolben statt Direktimpuls → weniger Verschmutzung, zuverlässiger.

## Einsatz
US Navy SEALs, Delta Force, Bundeswehr, Frankreich.

## Zivil: HK416 PE / HK243 als Vertragswaffe.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['5,56×45mm NATO'],
    tags: ['Sturmgewehr', 'HK', 'HK416', 'Deutschland', 'NATO', 'SEALs'],
  },

  {
    slug: 'hk-g3',
    titel: 'Heckler & Koch G3',
    kategorie: 'Büchse',
    hersteller: 'HK',
    baujahr: '1959',
    kurzbeschreibung: 'Deutsches Bundeswehr-Kampfgewehr 1959–1997. Rollenverzögertes System. Zivil als HK91.',
    inhalt: `## HK G3 — Das deutsche Bundeswehrgewehr
38 Jahre Bundeswehr-Ordonnanz. Rollenverzögertes Rückstoßprinzip — extrem robust.

## Zivil als HK91: Vertragswaffe.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['7,62×51mm NATO'],
    tags: ['Sturmgewehr', 'HK', 'G3', 'Bundeswehr', 'Deutschland'],
  },

  {
    slug: 'steyr-aug',
    titel: 'Steyr AUG',
    kategorie: 'Büchse',
    hersteller: 'Steyr Arms',
    baujahr: '1977',
    kurzbeschreibung: 'Österreichisches Bullpup-Sturmgewehr. Das erste erfolgreiche Bullpup weltweit. Österreichische Ordonnanz.',
    inhalt: `## Steyr AUG — Das Bullpup-Pionier
1977 das erste erfolgreiche Bullpup: Magazin hinter dem Abzug → längerer Lauf bei gleicher Gesamtlänge.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['5,56×45mm NATO'],
    tags: ['Sturmgewehr', 'Steyr', 'AUG', 'Bullpup', 'Österreich'],
  },

  {
    slug: 'fn-fal',
    titel: 'FN FAL',
    kategorie: 'Büchse',
    hersteller: 'FN Herstal',
    baujahr: '1954',
    kurzbeschreibung: '"The Right Arm of the Free World". Von über 90 Ländern eingesetzt. Kaliber 7,62 NATO.',
    inhalt: `## FN FAL — "The Right Arm of the Free World"
Meistverbreitete Selbstladebüchse des Westens im Kalten Krieg. In über 90 Ländern eingesetzt.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['7,62×51mm NATO'],
    tags: ['Sturmgewehr', 'FN', 'FAL', 'Belgien', 'KalterKrieg'],
  },

  {
    slug: 'mp5-zivil',
    titel: 'HK MP5 (halbautomatisch, SP5)',
    kategorie: 'Büchse',
    hersteller: 'HK',
    baujahr: '1966',
    kurzbeschreibung: 'Ikone der Spezialeinheiten. Als halbautomatische SP5 in der Schweiz erhältlich.',
    inhalt: `## HK MP5 — Spezialeinheiten-Ikone
GSG9, SAS, SEK — das MP5 ist Symbol der Spezialeinheiten weltweit.

## SP5: Halbautomatische Zivilversion
Rechtsstatus Schweiz: Vertragswaffe.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['9×19mm'],
    tags: ['Maschinenpistole', 'HK', 'MP5', 'Spezialeinheiten', 'SP5'],
  },

  // ─── LEVER-ACTION / UNTERHEBELREPETIERER ─────────────────

  {
    slug: 'winchester-1894',
    titel: 'Winchester Model 1894',
    kategorie: 'Büchse',
    hersteller: 'Winchester',
    baujahr: '1894',
    kurzbeschreibung: 'Das meistverkaufte Repetiergewehr aller Zeiten. Über 7 Millionen produziert. .30-30 Winchester-Standard.',
    inhalt: `## Winchester 1894 — Das meistverkaufte Gewehr der Geschichte
Über 7 Millionen produziert. Design von John Moses Browning. .30-30 Winchester wurde speziell dafür entwickelt.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['.30-30 Winchester', '.357 Magnum', '.44 Magnum'],
    tags: ['LeverAction', 'Winchester', '1894', 'Klassiker', 'Western'],
  },

  {
    slug: 'winchester-1873',
    titel: 'Winchester Model 1873',
    kategorie: 'Büchse',
    hersteller: 'Winchester',
    baujahr: '1873',
    kurzbeschreibung: '"The Gun that Won the West". Klassiker des Wilden Westens. Standard für Cowboy-Action Schiessen.',
    inhalt: `## Winchester 1873 — Das Gewehr des Wilden Westens
Schoss Revolverkaliber (.44-40, .38-40) — Cowboy und Gewehr führten gleiche Munition.

## Heute: Cowboy-Action-Shooting (SASS) Standard.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['.357 Magnum', '.45 Colt', '.44-40 WCF'],
    tags: ['LeverAction', 'Winchester', '1873', 'CowboyAction', 'Western'],
  },

  {
    slug: 'henry-big-boy',
    titel: 'Henry Big Boy',
    kategorie: 'Büchse',
    hersteller: 'Henry Repeating Arms',
    baujahr: '1996',
    kurzbeschreibung: 'Moderner Unterhebelrepetierer in Messing. Schiesst Revolverkaliber — visuell beeindruckend.',
    inhalt: `## Henry Big Boy — Cowboy-Eleganz in Modern
Messingrahmen, Walnuss-Schaft, Revolverkaliber. Gleiche Munition wie der Revolver.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['.357 Magnum', '.44 Magnum', '.45 Colt'],
    tags: ['LeverAction', 'Henry', 'Messing', 'Western'],
  },

  {
    slug: 'marlin-336',
    titel: 'Marlin Model 336',
    kategorie: 'Büchse',
    hersteller: 'Marlin',
    baujahr: '1948',
    kurzbeschreibung: 'Amerikanischer Lever-Action Klassiker in .30-30. Side-Ejection ermöglicht Zielfernrohr-Montage.',
    inhalt: `## Marlin 336
Konkurrent zum Winchester 1894. Side-Ejection (Hülsenauswurf seitlich) erlaubt Zielfernrohre — Vorteil gegenüber Winchester.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['.30-30 Winchester', '.35 Remington'],
    tags: ['LeverAction', 'Marlin', '336', 'Jagd'],
  },

  // ─── FLINTEN ──────────────────────────────────────────────

  {
    slug: 'browning-citori',
    titel: 'Browning Citori',
    kategorie: 'Flinte',
    hersteller: 'Browning',
    baujahr: '1973',
    kurzbeschreibung: 'Die meistverkaufte Über-/Unterlaufflinten weltweit. Tontauben-Standard seit 1973.',
    inhalt: `## Browning Citori — Der Tontauben-Klassiker
De-facto-Standard im Tontaubensport weltweit seit 1973. Invector-DS Wechselchokes.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['12/70', '12/76 Magnum', '20/70'],
    tags: ['Flinte', 'Browning', 'Citori', 'Tontauben', 'O/U', 'Sport'],
  },

  {
    slug: 'krieghoff-k80',
    titel: 'Krieghoff K-80',
    kategorie: 'Flinte',
    hersteller: 'Krieghoff',
    baujahr: '1980',
    kurzbeschreibung: 'Das deutsche Premium-Trapgewehr. Standard bei olympischen Trap/Skeet-Meisterschaften. CHF 8000–25000+.',
    inhalt: `## Krieghoff K-80 — Premium Tontaubenflinte
Handgefertigt in Ulm. Jedes K-80 konfigurierbar: Abzugsgewicht, Schaftlänge, Wurfpunkt.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['12/70'],
    tags: ['Flinte', 'Krieghoff', 'K80', 'Trap', 'Skeet', 'Premium'],
  },

  {
    slug: 'perazzi',
    titel: 'Perazzi MX-Serie',
    kategorie: 'Flinte',
    hersteller: 'Perazzi',
    baujahr: '1964',
    kurzbeschreibung: 'Italienische Luxus-Tontaubenflinte. Standard bei Olympia. CHF 8000–50000+.',
    inhalt: `## Perazzi — Die Olympia-Flinte
Olympia-Medaillen werden seit Jahrzehnten hauptsächlich mit Perazzi gewonnen. Jede Waffe ist ein Einzelstück.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['12/70'],
    tags: ['Flinte', 'Perazzi', 'Olympisch', 'Luxus', 'Italien'],
  },

  {
    slug: 'beretta-a400',
    titel: 'Beretta A400 Xcel',
    kategorie: 'Flinte',
    hersteller: 'Beretta',
    baujahr: '2010',
    kurzbeschreibung: 'Italiens bestes halbautomatisches Jagdgewehr. Blink-System: schnellste Nachladefolge aller Halbautomaten.',
    inhalt: `## Beretta A400 — Der Halbautomaten-Massstab
Blink-System: schnellste Nachladefolge aller halbautomatischen Flinten.

## Rechtsstatus Schweiz
Mit 4+1 Magazin: Vertragswaffe.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['12/70', '12/76 Magnum'],
    tags: ['Flinte', 'Beretta', 'A400', 'Halbautomatisch', 'Jagd'],
  },

  {
    slug: 'benelli-m2',
    titel: 'Benelli M2',
    kategorie: 'Flinte',
    hersteller: 'Benelli',
    baujahr: '1993',
    kurzbeschreibung: 'Halbautomatische Jagdflinte mit einzigartigem Inertie-System. Einfach, zuverlässig.',
    inhalt: `## Benelli M2 — Das Inertie-System
Kein Gasdrucksystem — die Trägheit des Laufs beim Rückstoss lädt nach. Weniger Teile, weniger Reinigung.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['12/70', '20/70'],
    tags: ['Flinte', 'Benelli', 'M2', 'Inertie', 'Halbautomatisch'],
  },

  {
    slug: 'benelli-supernova',
    titel: 'Benelli SuperNova',
    kategorie: 'Flinte',
    hersteller: 'Benelli',
    baujahr: '2006',
    kurzbeschreibung: 'Pump-Action mit Polymer-Chassis und ComforTech Rückstoss-System. Sehr robust.',
    inhalt: `## Benelli SuperNova
Pump-Action mit "ComforTech" Rückstossdämpfung — deutlich angenehmer als andere Pump-Action.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['12/70', '12/76 Magnum'],
    tags: ['Flinte', 'Benelli', 'PumpAction', 'Jagd'],
  },

  {
    slug: 'mossberg-500',
    titel: 'Mossberg 500',
    kategorie: 'Flinte',
    hersteller: 'Mossberg',
    baujahr: '1961',
    kurzbeschreibung: 'Amerikanisches Pump-Action Arbeitstier. Günstig, zuverlässig. Auch taktische Versionen.',
    inhalt: `## Mossberg 500 — Der amerikanische Allrounder
Eine der meistverkauften US-Flinten. Ambidextrious Sicherung am Griffstück.

## Varianten: 500 Field, 500 Tactical, 590 (Militär)`,
    rechtsstatus: 'frei',
    typischeKaliber: ['12/70', '12/76 Magnum'],
    tags: ['Flinte', 'Mossberg', '500', 'PumpAction', 'USA'],
  },

  {
    slug: 'browning-a5',
    titel: 'Browning Auto-5 (A5)',
    kategorie: 'Flinte',
    hersteller: 'Browning / FN',
    baujahr: '1902',
    kurzbeschreibung: 'Die erste erfolgreiche halbautomatische Flinte. John Brownings Geniestreich. 1902–1998 produziert.',
    inhalt: `## Browning Auto-5 — Die Mutter aller Halbautomaten
1902 erste kommerziell erfolgreiche halbautomatische Flinte. Rückstoßlader (Lauf bewegt sich zurück).

## Sammler: CHF 500–1500.`,
    rechtsstatus: 'vertragswaffe',
    typischeKaliber: ['12/70'],
    tags: ['Flinte', 'Browning', 'A5', 'Historisch', 'Halbautomatisch', 'Sammler'],
  },

  // ─── JAGDWAFFEN SPEZIAL ───────────────────────────────────

  {
    slug: 'bockbuechsflinte',
    titel: 'Bockbüchsflinte / Drilling',
    kategorie: 'Jagdwaffe',
    hersteller: 'Merkel, Krieghoff, Blaser',
    baujahr: 'Traditionell',
    kurzbeschreibung: 'Typisch deutsche Jagdwaffe: Kombinierte Büchsen- und Flintenläufe. Ideal für die Drückjagd.',
    inhalt: `## Bockbüchsflinte — Die vielseitige Jagdwaffe
- BBF: Über-/Unterlauf, oben Flinte, unten Büchse
- Drilling: 3 Läufe — 2 Flinten + 1 Büchse
- Vierling: 4 Läufe (sehr selten)

## Typische Kaliber
Flinten: 12/70 oder 16/70. Büchse: 7×65R, 8×57IRS, 9,3×74R (Randkaliber)`,
    rechtsstatus: 'frei',
    typischeKaliber: ['12/70', '7×65R', '9,3×74R'],
    tags: ['Jagd', 'Kombination', 'Drilling', 'BBF', 'Deutschland', 'Merkel'],
  },

  // ─── LUFTDRUCKWAFFEN ──────────────────────────────────────

  {
    slug: 'walther-lg400',
    titel: 'Walther LG 400',
    kategorie: 'Luftgewehr',
    hersteller: 'Walther',
    baujahr: '2010',
    kurzbeschreibung: 'Das Weltklasse-Wettkampf-Luftgewehr. Olympische 10m-Disziplin. Zahlreiche Olympia-Medaillen.',
    inhalt: `## Walther LG 400 — Olympisches Wettkampf-Luftgewehr
PCP-Antrieb (200 bar), ca. 250 Schuss pro Füllung, optional elektronischer Abzug unter 100g.

## Rechtsstatus Schweiz
Freie Waffe ab 18 Jahren.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['4,5mm (.177)'],
    tags: ['Luftgewehr', 'Walther', 'LG400', 'Olympisch', 'Wettkampf', 'PCP'],
  },

  {
    slug: 'diana-luftgewehr',
    titel: 'Diana / Weihrauch Luftgewehr',
    kategorie: 'Luftgewehr',
    hersteller: 'Diana / Weihrauch',
    baujahr: 'Verschiedene',
    kurzbeschreibung: 'Deutsche Luftgewehre für Freizeit und Einsteiger. Federkolben — kein Lufttank nötig.',
    inhalt: `## Diana / Weihrauch — Einstieg in den Luftdrucksport
- Federkolben: Einfach, wartungsarm
- Gas-Ram: Gleichmässiger als Feder
- CO2: Für schnelles Schiessen, kälteempfindlich

## Rechtsstatus Schweiz
Freie Waffe ab 18 Jahren.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['4,5mm (.177)', '5,5mm (.22)'],
    tags: ['Luftgewehr', 'Diana', 'Weihrauch', 'Federkolben', 'Einsteiger'],
  },

  // ─── HISTORISCH / VORDERLADER ─────────────────────────────

  {
    slug: 'perkussionsrevolver',
    titel: 'Perkussionsrevolver (Colt Navy / Army)',
    kategorie: 'Historische Waffe',
    hersteller: 'Colt / Uberti / Pietta',
    baujahr: '1851 / 1860',
    kurzbeschreibung: 'Vorderlader-Revolver aus dem US-Bürgerkrieg. Keine Metallhülse. In der Schweiz frei.',
    inhalt: `## Perkussionsrevolver — Vorderlader-Ära
Colt Navy (1851) und Colt Army (1860): Pulver in Trommel, dann Kugel, dann Zündhütchen.

## Rechtsstatus Schweiz
Vorderlader vor 1871: Freie Waffe. Replicas ebenfalls frei.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['.36 cal (Navy)', '.44 cal (Army)'],
    tags: ['Historisch', 'Perkussion', 'Vorderlader', 'ColtNavy', 'Replika'],
  },

  // ─── SONSTIGE ─────────────────────────────────────────────

  {
    slug: 'schreckschusspistole',
    titel: 'Schreckschuss- / Gaspistole',
    kategorie: 'Freie Waffe',
    hersteller: 'Walther, Zoraki, Umarex',
    baujahr: 'Verschiedene',
    kurzbeschreibung: 'Keine echte Schusswaffe. In der Schweiz ab 18 Jahren frei. Kein WES, kein Kaufvertrag.',
    inhalt: `## Schreckschuss- und Gaspistolen
Keine scharfe Munition — Knall- oder Gaspatronen (9mm P.A.K.).

## Rechtliches in der Schweiz
Keine Schusswaffe im Sinne des WG. Kein Kaufvertrag, kein WES. Ab 18 Jahren frei.

## Achtung
Führen in der Öffentlichkeit kann trotzdem strafbar sein.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['9mm P.A.K.'],
    tags: ['Schreckschuss', 'Gas', 'Frei', 'Einsteiger', 'Kein-WES'],
  },
]

// ============================================================
// KALIBER (30 Einträge)
// ============================================================
export const wissenMunition: WissenMunition[] = [
  {
    slug: '9x19',
    bezeichnung: '9×19mm Parabellum',
    aliase: ['9mm Luger', '9mm NATO', '9mm Para'],
    typ: 'Pistole',
    entwickelt: '1902',
    entwickler: 'Georg Luger / DWM',
    kurzbeschreibung: 'Weltweites Standard-Pistolenkalber. Meistverkaufte Pistolenmunition der Welt.',
    geschossdurchmesser: '9,01 mm',
    huelsenlaenge: '19,15 mm',
    standardenergie: '500–600 J',
    muzzleVelocity: '370–400 m/s',
    typischeWaffen: ['SIG P226/P320', 'Glock 17/19', 'Walther P99', 'CZ 75', 'Beretta 92'],
    beschreibung: `## Geschichte
1902 von Georg Luger für die deutsche Marine entwickelt. "Parabellum" = Si vis pacem, para bellum.

## Weltweiter Standard
NATO-Standard und Munition von Polizei und Militär in fast allen Ländern. In der Schweiz mit Abstand die meistverkaufte Pistolenmunition.

## Geschosstypen
- FMJ: Vollmantel für Training
- HP: Hohlspitz — expandiert, für Selbstverteidigung
- +P/+P+: Erhöhter Druck — mehr Energie
- Subsonic: Unterschall für Schalldämpfer`,
  },
  {
    slug: '308-win',
    bezeichnung: '.308 Winchester',
    aliase: ['7,62×51mm NATO', '.308 Win'],
    typ: 'Büchse',
    entwickelt: '1952',
    entwickler: 'Winchester',
    kurzbeschreibung: 'Weltweites Standard-Präzisionskaliber. NATO-Militärkaliber. In Jagd, Sport und Polizei.',
    geschossdurchmesser: '7,82 mm',
    huelsenlaenge: '51,18 mm',
    standardenergie: '3.400–3.600 J',
    muzzleVelocity: '820–870 m/s',
    typischeWaffen: ['SIG SSG 3000', 'Remington 700', 'Winchester 70', 'AI AXMC', 'Tikka T3x'],
    beschreibung: `## Geschichte
1952 als zivile Version des militärischen 7,62×51mm NATO entwickelt. Weltweiter Standard für Scharfschützengewehre.

## WICHTIG: .308 Win vs. 7,62×51mm NATO
.308 Win darf in NATO-Läufen geschossen werden ✅ — aber nicht umgekehrt ❌ (höherer Druck)

## In der Schweiz
Scharfschützengewehre der Schweizer Polizei (SIG SSG 3000) in .308 Win.`,
  },
  {
    slug: '75x55',
    bezeichnung: '7,5×55mm Swiss',
    aliase: ['GP11', 'Schmidt-Rubin', '7,5mm Ordonnanz'],
    typ: 'Büchse',
    entwickelt: '1911',
    entwickler: 'Schweizer Armee / W+F Bern',
    kurzbeschreibung: 'Die Schweizer Ordonnanzpatrone für K31 und Stgw 57. Einzigartiges Schweizer Kaliber.',
    geschossdurchmesser: '7,53 mm',
    huelsenlaenge: '55,70 mm',
    standardenergie: '3.600 J',
    muzzleVelocity: '780 m/s',
    typischeWaffen: ['Karabiner 31 (K31)', 'Karabiner 1911', 'Sturmgewehr 57'],
    beschreibung: `## Die Schweizer Ordonnanzpatrone
GP11 (Gewehrpatrone 11) ist die Standardpatrone der Schweizer Armee für Langwaffen seit 1911.

## Besonderheiten
Boat-Tail Geschoss, GMCS-Mantel, sehr präzise durch ausgewogene Ballistik.

## Verfügbarkeit
RUAG ist Haupthersteller. Für Ordonnanzwaffenbesitzer erhältlich.`,
  },
  {
    slug: '556x45',
    bezeichnung: '5,56×45mm NATO',
    aliase: ['.223 Remington', 'Gw Pat 90'],
    typ: 'Büchse',
    entwickelt: '1957',
    entwickler: 'ArmaLite / Remington',
    kurzbeschreibung: 'NATO-Sturmgewehr-Standard seit 1980. Kaliber des Schweizer Stgw 90.',
    geschossdurchmesser: '5,70 mm',
    huelsenlaenge: '44,70 mm',
    standardenergie: '1.800 J',
    muzzleVelocity: '920–980 m/s',
    typischeWaffen: ['SIG 550 / Stgw 90', 'AR-15', 'HK416', 'Steyr AUG'],
    beschreibung: `## Das NATO-Sturmgewehr-Kaliber
Seit 1980 Standard-Infanteriekaliber der NATO.

## WICHTIG: .223 Rem vs. 5,56 NATO
- .223 Rem darf in 5,56 NATO-Läufen geschossen werden ✅
- 5,56 NATO NICHT in .223 Rem-Läufen ❌ (höherer Druck)
- ".223 Wylde" erlaubt beide ✅`,
  },
  {
    slug: '22lr',
    bezeichnung: '.22 Long Rifle',
    aliase: ['.22 LR', '.22 lfB', '5,6mm'],
    typ: 'Kleinkaliber',
    entwickelt: '1887',
    entwickler: 'Stevens Arms',
    kurzbeschreibung: 'Weltweites Einstiegs- und Sportkaliber. Günstigste Munition — ideal für Training.',
    geschossdurchmesser: '5,59 mm',
    huelsenlaenge: '15,11 mm',
    standardenergie: '130–160 J',
    muzzleVelocity: '330–380 m/s',
    typischeWaffen: ['Anschütz 1913', 'CZ 452/457', 'Ruger 10/22', 'Tikka T1x'],
    beschreibung: `## Das universelle Einstiegs- und Sportkaliber
Weltweites meistverkauftes Kaliber. Randfeuerzündung — kein Wiederladen möglich.

## Untertypen
- Subsonic (~310 m/s): Für Schalldämpfer
- Standard (~340 m/s): Training
- High Velocity (~380 m/s): Mehr Energie
- Match (Eley Tenex, SK): Für Wettkampf, enge Toleranzen`,
  },
  {
    slug: '357-magnum',
    bezeichnung: '.357 Magnum',
    aliase: ['9×33mmR', '.357 Mag'],
    typ: 'Revolver',
    entwickelt: '1935',
    entwickler: 'S&W / Winchester',
    kurzbeschreibung: 'Kraftvoller Revolverkaliber. Schiesst auch .38 Special — vielseitig und bewährt.',
    geschossdurchmesser: '9,07 mm',
    huelsenlaenge: '32,77 mm',
    standardenergie: '700–900 J',
    muzzleVelocity: '380–450 m/s',
    typischeWaffen: ['S&W 686', 'Colt Python', 'Ruger GP100', 'Henry Big Boy'],
    beschreibung: `## Die .357 Magnum
1935 durch Verlängerung der .38 Special entwickelt — mehr Raum für mehr Treibladung.

## Kompatibilität
.357 Magnum-Revolver können .38 Special verschiessen ✅ — aber NICHT umgekehrt ❌

## In Lever-Action
In Unterhebelrepetierer ergibt .357 Magnum durch den längeren Lauf fast Büchsenniveau.`,
  },
  {
    slug: '44-magnum',
    bezeichnung: '.44 Magnum',
    aliase: ['10,9×33mmR', '.44 Mag'],
    typ: 'Revolver',
    entwickelt: '1955',
    entwickler: 'S&W / Remington',
    kurzbeschreibung: '"The most powerful handgun in the world" (1955). Für Jagd und Bärenschutz.',
    geschossdurchmesser: '10,9 mm',
    huelsenlaenge: '32,74 mm',
    standardenergie: '1.200–1.500 J',
    muzzleVelocity: '400–500 m/s',
    typischeWaffen: ['S&W 629', 'Desert Eagle', 'Ruger Redhawk', 'Henry Big Boy .44'],
    beschreibung: `## Dirty Harrys Kaliber
1955 damals stärkstes Pistolenkalber. Durch "Dirty Harry" (1971) weltberühmt.

## Kompatibilität
.44 Magnum Revolver können .44 Special verschiessen ✅`,
  },
  {
    slug: '45-acp',
    bezeichnung: '.45 ACP',
    aliase: ['.45 Auto', '11,43×23mm'],
    typ: 'Pistole',
    entwickelt: '1904',
    entwickler: 'John Moses Browning',
    kurzbeschreibung: 'Grosses, schweres amerikanisches Kaliber. 74 Jahre US-Armee-Standard (1911–1985).',
    geschossdurchmesser: '11,43 mm',
    huelsenlaenge: '22,86 mm',
    standardenergie: '500–600 J',
    muzzleVelocity: '250–270 m/s',
    typischeWaffen: ['Colt 1911', 'Glock 21', 'SIG P220', 'HK45'],
    beschreibung: `## Grosse Kugel, moderate Geschwindigkeit
230 grain (14,9g) Geschoss bei moderater Geschwindigkeit — vs. kleines schnelles 9mm-Projektil.

## 74 Jahre US-Armee
Von 1911 bis 1985 die Standardmunition der US-Streitkräfte.`,
  },
  {
    slug: '380-acp',
    bezeichnung: '.380 ACP',
    aliase: ['9mm Kurz', '9×17mm', '9mm Browning Short'],
    typ: 'Pistole',
    entwickelt: '1908',
    entwickler: 'John Moses Browning',
    kurzbeschreibung: 'Kompaktes Kaliber für kleine Pistolen. Walther PPK — "James Bond Kaliber".',
    geschossdurchmesser: '9,01 mm',
    huelsenlaenge: '17,27 mm',
    standardenergie: '220–280 J',
    muzzleVelocity: '290–330 m/s',
    typischeWaffen: ['Walther PPK', 'Glock 42', 'SIG P238', 'Ruger LCP'],
    beschreibung: `## Kompaktkaliber
Kleiner und schwächer als 9×19mm — aber ermöglicht sehr kleine, flache Pistolen.

## James Bond
Walther PPK in .380 ACP = die James Bond Pistole.`,
  },
  {
    slug: '38-special',
    bezeichnung: '.38 Special',
    aliase: ['9×29mmR', '.38 Spl'],
    typ: 'Revolver',
    entwickelt: '1898',
    entwickler: 'Smith & Wesson',
    kurzbeschreibung: 'Klassisches Revolverkaliber. Kann in .357 Magnum-Revolvern geschossen werden.',
    geschossdurchmesser: '9,07 mm',
    huelsenlaenge: '29,34 mm',
    standardenergie: '250–350 J',
    muzzleVelocity: '280–320 m/s',
    typischeWaffen: ['S&W 686 (auch .38 Spl)', 'Ruger SP101', 'Colt Python'],
    beschreibung: `## Das klassische US-Polizeikaliber
Von 1898 bis ca. 1990 das Standardkaliber der US-Polizei. Heute beliebt für Training in .357 Mag Revolvern (schwächer, günstiger).

## Kompatibilität
In .357 Magnum Revolvern schiessbar ✅`,
  },
  {
    slug: '30-06',
    bezeichnung: '.30-06 Springfield',
    aliase: ['7,62×63mm'],
    typ: 'Büchse',
    entwickelt: '1906',
    entwickler: 'US Army',
    kurzbeschreibung: 'Über 100 Jahre altes Jagd-Universalkaliber. US-Militär WW1/WW2/Korea. Sehr verbreitet.',
    geschossdurchmesser: '7,82 mm',
    huelsenlaenge: '63,35 mm',
    standardenergie: '3.700–4.200 J',
    muzzleVelocity: '820–900 m/s',
    typischeWaffen: ['Remington 700', 'Winchester 70', 'Browning BAR'],
    beschreibung: `## Geschichte
1906 eingeführt ("06" = Jahr). US-Militärkaliber in WW1, WW2, Korea.

## Vielseitigkeit
Mit leichten Geschossen für Reh, mit schweren für Elch/Bär. Eines der flexibelsten Jagdkaliber überhaupt.`,
  },
  {
    slug: '7x64',
    bezeichnung: '7×64mm',
    aliase: ['7×64 Brenneke'],
    typ: 'Büchse',
    entwickelt: '1917',
    entwickler: 'Wilhelm Brenneke',
    kurzbeschreibung: 'Das beliebteste europäische Jagdkaliber. In der Schweiz das meistverkaufte Büchsenkaliber.',
    geschossdurchmesser: '7,24 mm',
    huelsenlaenge: '64 mm',
    standardenergie: '3.800–4.200 J',
    muzzleVelocity: '850–920 m/s',
    typischeWaffen: ['Blaser R8', 'Sako 85', 'Mauser M18', 'Steyr Mannlicher CL II'],
    beschreibung: `## Das Schweizer Jagdkaliber
In der Schweiz meistverkauftes Büchsenkaliber für die Jagd.

## Vorteile
Flache Flugbahn, hohe Präzision, moderater Rückstoss, riesige Munitionsauswahl.`,
  },
  {
    slug: '93x62',
    bezeichnung: '9,3×62mm',
    aliase: ['9.3x62'],
    typ: 'Büchse',
    entwickelt: '1905',
    entwickler: 'Otto Bock, Berlin',
    kurzbeschreibung: 'Europas starkes Jagdkaliber für grosse und gefährliche Wildtiere. Passt in Standard-Verschluss.',
    geschossdurchmesser: '9,30 mm',
    huelsenlaenge: '62 mm',
    standardenergie: '5.000–5.500 J',
    muzzleVelocity: '710–770 m/s',
    typischeWaffen: ['Mauser 98', 'Blaser R8', 'Sako 85', 'Tikka T3x'],
    beschreibung: `## Das europäische Stoppkaliber
1905 für Afrika entwickelt — passt in Standard-Mauserverschluss (kein Magnum nötig).

## In der Schweiz
Beliebt für Wildschwein-Drückjagd und grosse Wildtiere.`,
  },
  {
    slug: '65-creedmoor',
    bezeichnung: '6,5 Creedmoor',
    aliase: ['6.5 CM', '6,5×48mm'],
    typ: 'Büchse',
    entwickelt: '2007',
    entwickler: 'Hornady',
    kurzbeschreibung: 'Das Trendkaliber der Präzisionsschützen. Überragender BC, geringer Rückstoss, schlägt .308 auf Distanz.',
    geschossdurchmesser: '6,72 mm',
    huelsenlaenge: '48,77 mm',
    standardenergie: '3.300–3.600 J',
    muzzleVelocity: '830–880 m/s',
    typischeWaffen: ['Tikka T3x TAC A1', 'Ruger Precision Rifle', 'AI AXMC', 'Bergara B14'],
    beschreibung: `## Der neue Liebling der Präzisionsschützen
2007 entwickelt. In 15 Jahren zum meistgenutzten Präzisionskaliber geworden.

## Warum so erfolgreich?
Sehr hoher BC → flache Flugbahn. Schlägt .308 Win auf Distanzen über 600m. Weniger Rückstoss.`,
  },
  {
    slug: '300-win-mag',
    bezeichnung: '.300 Winchester Magnum',
    aliase: ['.300 Win Mag', '7,62×67mm'],
    typ: 'Büchse',
    entwickelt: '1963',
    entwickler: 'Winchester',
    kurzbeschreibung: 'Starkes Magnumkaliber. Militär-Scharfschützen-Standard (Bundeswehr, US-Army).',
    geschossdurchmesser: '7,82 mm',
    huelsenlaenge: '66,50 mm',
    standardenergie: '4.800–5.500 J',
    muzzleVelocity: '880–950 m/s',
    typischeWaffen: ['AI AWM', 'Sako 85 Magnum', 'Blaser R8', 'Remington 700'],
    beschreibung: `## Magnumkaliber für grosse Aufgaben
Deutlich mehr Energie als .308 Win — auf Kosten von mehr Rückstoss und schnellerem Laufverschleiss.

## Militärische Nutzung
Bundeswehr AI G22A2 in .300 Win Mag. Viele NATO-Armeen für Langstreckenscharfschützen.`,
  },
  {
    slug: '338-lapua',
    bezeichnung: '.338 Lapua Magnum',
    aliase: ['8,6×70mm', '.338 LM'],
    typ: 'Büchse',
    entwickelt: '1989',
    entwickler: 'Research Armament Industries / Lapua',
    kurzbeschreibung: 'Langreckenscharfschützen-Standard. Effektiv auf 1500m+. Weltrekord: 2475m (Craig Harrison, 2009).',
    geschossdurchmesser: '8,59 mm',
    huelsenlaenge: '69,20 mm',
    standardenergie: '6.500–7.000 J',
    muzzleVelocity: '900–930 m/s',
    typischeWaffen: ['AI AWM', 'AI AXMC', 'Sako TRG-42'],
    beschreibung: `## Langstrecken-Scharfschützenstandard
Weltrekord: Craig Harrison, Afghanistan 2009, 2475m mit AI AWM in .338 LM.

## Zivil in der Schweiz
Vertragswaffe. Munition CHF 5–10 pro Schuss. Für 1000m+-Wettkampf.`,
  },
  {
    slug: '50-bmg',
    bezeichnung: '.50 BMG',
    aliase: ['12,7×99mm NATO', '.50 Caliber'],
    typ: 'Büchse',
    entwickelt: '1918',
    entwickler: 'John Moses Browning',
    kurzbeschreibung: 'Das Maschinengewehr-Kaliber. Anti-Material. Barrett M82 schiesst dieses Kaliber.',
    geschossdurchmesser: '12,95 mm',
    huelsenlaenge: '99,20 mm',
    standardenergie: '18.000–20.000 J',
    muzzleVelocity: '890–930 m/s',
    typischeWaffen: ['Barrett M82', 'M2 Browning MG', 'Steyr HS .50'],
    beschreibung: `## Anti-Material Kaliber
1918 für das M2 Browning MG entwickelt. Als Gewehrkaliber (Barrett M82) für Anti-Material-Aufgaben.`,
  },
  {
    slug: '762x39',
    bezeichnung: '7,62×39mm',
    aliase: ['M43', 'AK-Kaliber'],
    typ: 'Büchse',
    entwickelt: '1943',
    entwickler: 'Sowjetische Armee',
    kurzbeschreibung: 'Das AK-47 Kaliber. Über 100 Millionen Waffen schiessen dieses Kaliber.',
    geschossdurchmesser: '7,92 mm',
    huelsenlaenge: '38,60 mm',
    standardenergie: '2.000–2.200 J',
    muzzleVelocity: '710–740 m/s',
    typischeWaffen: ['AK-47/AKM', 'SKS', 'CZ 527'],
    beschreibung: `## Das Kalaschnikow-Kaliber
1943 als Mittelpatrone entwickelt. Durch den AK-47 das meistgenutzte Sturmgewehrkaliber der Geschichte.`,
  },
  {
    slug: 'gp90',
    bezeichnung: '5,56mm Gw Pat 90',
    aliase: ['Gewehrpatrone 90', '5.56mm Swiss'],
    typ: 'Büchse',
    entwickelt: '1985',
    entwickler: 'RUAG / Schweizer Armee',
    kurzbeschreibung: 'Die Schweizer Version der 5,56×45mm NATO. Speziell auf das Stgw 90 abgestimmt.',
    geschossdurchmesser: '5,70 mm',
    huelsenlaenge: '44,70 mm',
    standardenergie: '1.750–1.850 J',
    muzzleVelocity: '905–930 m/s',
    typischeWaffen: ['SIG 550 / Stgw 90', 'SIG 551', 'SIG 553'],
    beschreibung: `## Schweizer NATO-Munition
Minimal angepasst (12,25g statt 11,5g) für optimale Leistung im Stgw 90. RUAG ist Hersteller.

## Kompatibilität
Vollständig kompatibel mit NATO 5,56×45mm Waffen.`,
  },
  {
    slug: '6555-swedish',
    bezeichnung: '6,5×55mm Swedish',
    aliase: ['6,5 Schwedisch', '6.5x55 SE'],
    typ: 'Büchse',
    entwickelt: '1894',
    entwickler: 'Schweden / Norwegen',
    kurzbeschreibung: 'Skandinavisches Militärkaliber. Hervorragende Ballistik — Vorgänger des 6,5 Creedmoor.',
    geschossdurchmesser: '6,71 mm',
    huelsenlaenge: '55,00 mm',
    standardenergie: '3.100–3.500 J',
    muzzleVelocity: '830–870 m/s',
    typischeWaffen: ['Sako 85', 'Tikka T3x', 'CZ 557', 'Mauser'],
    beschreibung: `## Skandinavisches Qualitätskaliber
1894 gemeinsam von Schweden und Norwegen entwickelt. Hervorragende ballistische Eigenschaften — und Vorläufer-Konzept des 6,5 Creedmoor.

## In der Schweiz
Erhältlich aber weniger verbreitet als 7×64mm. Beliebt bei Jägern die auf Distanz schiessen.`,
  },
  {
    slug: '243-win',
    bezeichnung: '.243 Winchester',
    aliase: ['6×52mm'],
    typ: 'Büchse',
    entwickelt: '1955',
    entwickler: 'Winchester',
    kurzbeschreibung: 'Vielseitiges Kaliber für Rehwild und Präzisionsschiessen. Geringer Rückstoss.',
    geschossdurchmesser: '6,17 mm',
    huelsenlaenge: '51,92 mm',
    standardenergie: '2.800–3.200 J',
    muzzleVelocity: '900–960 m/s',
    typischeWaffen: ['Tikka T3x', 'Winchester 70', 'Sako 85', 'Remington 700'],
    beschreibung: `## Vielseitiges Kleinkaliber
Ideal für Rehwild und Präzisionsschiessen. Sehr geringer Rückstoss — beliebt für Jugendliche und Einsteiger.

## In der Schweiz
Für Rehwild und als Trainings-/Sportgewehr.`,
  },
  {
    slug: '7x65r',
    bezeichnung: '7×65R',
    aliase: ['7×65 Randkaliber'],
    typ: 'Büchse',
    entwickelt: '1917',
    entwickler: 'Wilhelm Brenneke',
    kurzbeschreibung: 'Randkaliber-Version der 7×64mm. Für Kipplaufwaffen (Drilling, BBF). Sehr beliebt.',
    geschossdurchmesser: '7,24 mm',
    huelsenlaenge: '65,00 mm',
    standardenergie: '3.800–4.200 J',
    muzzleVelocity: '840–900 m/s',
    typischeWaffen: ['Drilling', 'Bockbüchsflinte', 'Einzel-Büchse', 'Sako 85'],
    beschreibung: `## Randkaliber für Kipplaufwaffen
Das "R" steht für Randkaliber — der Rand ermöglicht sicheres Einzel-Ausziehen in Kipplaufwaffen (Drilling, BBF).

## Identische Ballistik wie 7×64mm`,
  },
  {
    slug: '93x74r',
    bezeichnung: '9,3×74R',
    aliase: ['9,3×74 Randkaliber'],
    typ: 'Büchse',
    entwickelt: '1900',
    entwickler: 'Unbekannt',
    kurzbeschreibung: 'Starkes Randkaliber für Kipplaufwaffen. Drilling, BBF, Einzelbüchse. Für grosse Wildtiere.',
    geschossdurchmesser: '9,30 mm',
    huelsenlaenge: '74,00 mm',
    standardenergie: '5.200–5.800 J',
    muzzleVelocity: '700–750 m/s',
    typischeWaffen: ['Drilling', 'Bockbüchsflinte', 'Einzelbüchse'],
    beschreibung: `## Starkes Randkaliber
Randkaliber-Version eines starken Jagdkalbers — für Kipplaufwaffen wo 9,3×62mm nicht passt.

## Für grosse Wildtiere: Wildschwein, Hirsch, afrikanisches Schalenwild`,
  },
  {
    slug: '300-blackout',
    bezeichnung: '.300 Blackout',
    aliase: ['7,62×35mm', '.300 BLK'],
    typ: 'Büchse',
    entwickelt: '2010',
    entwickler: 'Advanced Armament Corp / Remington',
    kurzbeschreibung: 'Für die AR-15 entwickelt. Subsonic mit Schalldämpfer oder supersonic — sehr vielseitig.',
    geschossdurchmesser: '7,82 mm',
    huelsenlaenge: '34,70 mm',
    standardenergie: '1.400–2.000 J',
    muzzleVelocity: '300–680 m/s',
    typischeWaffen: ['AR-15 (nur Lauf tauschen)', 'SIG MCX', 'Honey Badger'],
    beschreibung: `## AR-15 optimiert
Passt in jedes AR-15 Lower Receiver — nur Lauf und Magazin wechseln.

## Zwei Modi
- Supersonic: Standard-Energie für normale Reichweite
- Subsonic + Schalldämpfer: Extrem leise, sehr kurze Reichweite`,
  },
  {
    slug: '458-socom',
    bezeichnung: '.458 SOCOM',
    aliase: ['11,63×40mm'],
    typ: 'Büchse',
    entwickelt: '2000',
    entwickler: 'Tony Rumore / Tromix',
    kurzbeschreibung: 'Grosskalibrige AR-15-Patrone. Für Spezialeinheiten entwickelt. Viel Energie auf kurze Distanz.',
    geschossdurchmesser: '11,63 mm',
    huelsenlaenge: '40,00 mm',
    standardenergie: '2.800–3.500 J',
    muzzleVelocity: '530–640 m/s',
    typischeWaffen: ['AR-15 (Lauf/Magazin tauschen)', 'Wilson Combat'],
    beschreibung: `## AR-15 mit mehr Punch
Nach Black Hawk Down (1993) entwickelt — Spezialeinheiten wollten mehr Stoppwirkung aus AR-15.`,
  },
  {
    slug: '40-sw',
    bezeichnung: '.40 S&W',
    aliase: ['10×22mm', '.40 Smith & Wesson'],
    typ: 'Pistole',
    entwickelt: '1990',
    entwickler: 'Smith & Wesson / Winchester',
    kurzbeschreibung: 'Kompromiss zwischen 9mm und .45 ACP. War lange US-Polizei-Standard. Abnehmende Beliebtheit.',
    geschossdurchmesser: '10,20 mm',
    huelsenlaenge: '21,59 mm',
    standardenergie: '550–650 J',
    muzzleVelocity: '310–370 m/s',
    typischeWaffen: ['Glock 22/23', 'SIG P226', 'CZ 75', 'HK USP'],
    beschreibung: `## Der FBI-Kompromiss
1990 nach FBI-Tests entwickelt: mehr Energie als 9mm, weniger Rückstoss als .45 ACP.

## Heute
Beliebtheit sinkt — moderne 9mm HP-Munition bietet ähnliche Leistung bei mehr Schuss im Magazin.`,
  },
  {
    slug: '10mm-auto',
    bezeichnung: '10mm Auto',
    aliase: ['10×25mm'],
    typ: 'Pistole',
    entwickelt: '1983',
    entwickler: 'Jeff Cooper / Norma',
    kurzbeschreibung: 'Das Kraftpaket unter den Pistolenkalibern. Stärker als .40 S&W und .45 ACP. Für Jagd und Bärenschutz.',
    geschossdurchmesser: '10,17 mm',
    huelsenlaenge: '25,20 mm',
    standardenergie: '750–1.000 J',
    muzzleVelocity: '350–430 m/s',
    typischeWaffen: ['Glock 20', 'Colt Delta Elite', 'Dan Wesson Bruin'],
    beschreibung: `## Das Kraftpaket
Jeff Cooper für Jagd- und Selbstverteidigung konzipiert. Deutlich mehr Energie als .40 S&W.

## Nischenprodukt
Grosse, schwere Waffen nötig. Aber für Jagd auf mittlere Wildtiere (bis Hirsch) aus der Pistole gut geeignet.`,
  },
  {
    slug: '17-hmr',
    bezeichnung: '.17 HMR',
    aliase: ['.17 Hornady Magnum Rimfire', '4,5×39mmR'],
    typ: 'Kleinkaliber',
    entwickelt: '2002',
    entwickler: 'Hornady',
    kurzbeschreibung: 'Hochgeschwindigkeits-Kleinkaliber. Sehr flache Flugbahn, extrem genau auf 100–150m.',
    geschossdurchmesser: '4,50 mm',
    huelsenlaenge: '26,97 mm',
    standardenergie: '240–260 J',
    muzzleVelocity: '775–800 m/s',
    typischeWaffen: ['CZ 457', 'Tikka T1x', 'Ruger Precision Rimfire'],
    beschreibung: `## Hochgeschwindigkeits-Kleinkaliber
2002 entwickelt: Fast doppelte Geschwindigkeit der .22 LR (780 vs. 360 m/s).

## Vorteile vs. .22 LR
Sehr flache Flugbahn, weniger windempfindlich, extrem präzise auf 100–200m.`,
  },
  {
    slug: '22-wmr',
    bezeichnung: '.22 WMR',
    aliase: ['.22 Magnum', '.22 Winchester Magnum Rimfire'],
    typ: 'Kleinkaliber',
    entwickelt: '1959',
    entwickler: 'Winchester',
    kurzbeschreibung: 'Stärkere .22-Variante. Mehr Energie als .22 LR — für Fuchs, Hase und kleine Wildtiere.',
    geschossdurchmesser: '5,59 mm',
    huelsenlaenge: '26,72 mm',
    standardenergie: '250–300 J',
    muzzleVelocity: '500–600 m/s',
    typischeWaffen: ['CZ 457', 'Tikka T1x', 'Ruger American'],
    beschreibung: `## .22 mit mehr Punch
1959 als stärkere .22-Variante entwickelt. Gut für kleine Jagd (Fuchs, Hase) auf 100m.

## Nicht kompatibel mit .22 LR Waffen!`,
  },
]
