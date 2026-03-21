// ============================================================
// GunMarket.ch — src/lib/wissen-data.ts
// 100 Waffen + 30 Kaliber — Wikipedia-recherchiert
// Einfügen in: /Users/maurice/waffenmarkt/src/lib/wissen-data.ts
// ============================================================

export type Rechtsstatus = 'frei' | 'wes' | 'abk-klein' | 'ordonnanz'

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
  youtubeVideoId?: string
  youtubeQuelle?: string
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
    baujahr: '1990',
    kurzbeschreibung: 'Die Ordonnanzwaffe der Schweizer Armee seit 1990. Gilt weltweit als eines der präzisesten Sturmgewehre.',
    inhalt: `## Sturmgewehr 90 — Die Schweizer Ordonnanzwaffe
Das SIG 550 (militärisch: Sturmgewehr 90, Stgw 90) ist seit 1990 die Standardwaffe der Schweizer Armee. Bis heute wurden über 450'000 Exemplare an die Armee geliefert.

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
    youtubeVideoId: 'IdCJNilFjVM',
    youtubeQuelle: 'Forgotten Weapons / Ian McCollum',
  },

  {
    slug: 'k31',
    titel: 'Karabiner 31 (K31)',
    kategorie: 'Ordonnanzwaffe',
    hersteller: 'SIG / W+F Bern',
    baujahr: '1931',
    kurzbeschreibung: 'Der legendäre Schweizer Karabiner mit Geradezugverschluss. Einer der genauesten Serienkarabiner aller Zeiten.',
    inhalt: `## Karabiner 31 — Schweizer Präzisionslegende
Der K31 war von 1933 bis ca. 1974 die Ordonnanzwaffe der Schweizer Armee und wurde in der Eidgenössischen Waffenfabrik Bern gefertigt. Er gilt bis heute als einer der präzisesten je in Serie gefertigten Karabiner und wird von Sammlern und Sportschützen gleichermassen geschätzt.

## Technische Daten
- Kaliber: 7,5×55mm Swiss (GP11)
- System: Geradezugverschluss (Schweizer Eigenentwicklung)
- Magazin: 6 Schuss (abnehmbares Kastenmagazin)
- Lauflänge: 652mm
- Gesamtlänge: 1100mm
- Gewicht: 4,0 kg (leer)
- Visierlinie: Dioptervisier oder Kimmvisier
- Produziert: ca. 583'000 Stück (1933–1958)

## Besonderheiten
Der Geradezugverschluss ist die zentrale Innovation: Nur gerade ziehen und stossen — keine Drehbewegung nötig. Das ermöglicht deutlich schnelleres Repetieren ohne Verschieben des Zielpunkts. Unter dem Schaftblech findet sich oft ein Truppzettel mit dem Namen des letzten Soldaten.

## Varianten
- K31 Standard: Infanteriekarabiner mit Dioptervisier
- K31/42 (ZfK 31/42): Scharfschützenversion mit Zielfernrohr, sehr selten
- K31/43 (ZfK 31/43): Verbesserte Scharfschützenversion

## Rechtsstatus Schweiz
Ordonnanzwaffe — Käufer muss Schweizer Bürger oder Niederlassungsbewilligung C besitzen. Gut erhaltene K31: CHF 300–800, Scharfschützenmodelle bis CHF 5000+.`,
    rechtsstatus: 'ordonnanz',
    typischeKaliber: ['7,5×55mm Swiss (GP11)'],
    tags: ['Ordonnanz', 'K31', 'Karabiner', 'Schweiz', 'Geradezug', 'Sammler', 'GP11'],
    youtubeVideoId: 'dkpmbbY0fFg',
    youtubeQuelle: 'Forgotten Weapons / Ian McCollum',
  },

  {
    slug: 'stgw57',
    titel: 'Sturmgewehr 57 (SIG 510)',
    kategorie: 'Ordonnanzwaffe',
    hersteller: 'SIG',
    baujahr: '1957',
    kurzbeschreibung: 'Vorgänger des Stgw 90. Robust, präzise — und mit 5,7 kg das schwerste Schweizer Ordonnanzgewehr.',
    inhalt: `## Sturmgewehr 57 — Schweres Schweizer Qualitätsgewehr
Das Stgw 57 (SIG SG 510) war von 1957 bis zur Einführung des Stgw 90 die Ordonnanzwaffe der Schweizer Armee. Es basiert auf dem rollenverzögerten Verschlusssystem, das bei der deutschen StG 45 entwickelt wurde. Trotz seines hohen Gewichts war es für seine hervorragende Präzision und Robustheit bekannt.

## Technische Daten
- Kaliber: 7,5×55mm Swiss (GP11)
- System: Rollenverzögerter Rückstoßlader
- Magazin: 24 Schuss (Stahlmagazin)
- Gesamtlänge: 1016mm
- Lauflänge: 583mm
- Gewicht: 5,7 kg (leer, ohne Magazin)
- Feuerarten: Einzelschuss, Dauerfeuer
- Kadenz: ca. 450–600 Schuss/min
- Zweibein: integriert, klappbar

## Besonderheiten
Das Stgw 57 verfügt über ein integriertes Zweibein und ein Winterabzug, der mit Handschuhen bedient werden kann. Der rollenverzögerte Verschluss sorgt für einen sehr weichen Rückstoss trotz des leistungsstarken GP11-Kalibers. Das Gewehr dient auch als leichtes MG auf Zweibein.

## Varianten
- SG 510-1: Schweizer Armeeversion (7,5×55mm)
- SG 510-4: Exportversion in 7,62×51mm NATO
- PE 57: Halbautomatische Zivilversion

## Rechtsstatus Schweiz
Ordonnanzwaffe — Käufer muss Schweizer Bürger oder Niederlassungsbewilligung C besitzen. Sammlerwert CHF 600–1500.`,
    rechtsstatus: 'ordonnanz',
    typischeKaliber: ['7,5×55mm Swiss (GP11)'],
    tags: ['Ordonnanz', 'Stgw57', 'SIG', 'Schweiz', 'Sammler', 'GP11'],
    youtubeVideoId: 'HAUvN55qmOU',
    youtubeQuelle: "Ben's Channel",
  },

  {
    slug: 'sig-p210',
    titel: 'SIG P210 (Pistole 49)',
    kategorie: 'Ordonnanzwaffe',
    hersteller: 'SIG',
    baujahr: '1949',
    kurzbeschreibung: 'Die Schweizer Präzisionspistole. Ordonnanz der Armee 1949–1975. Heute Sammlerstück und Sportikone.',
    inhalt: `## SIG P210 — Die Schweizer Präzisionspistole
Die SIG P210 (Ordonnanz: Pistole 49) wurde 1947 von SIG Neuhausen entwickelt und gilt weltweit als eine der präzisesten je in Serie gefertigten Pistolen. Von 1949 bis 1975 war sie die Ordonnanzpistole der Schweizer Armee und wurde auch von zahlreichen Polizeikorps eingesetzt.

## Technische Daten
- Kaliber: 9×19mm (Armee), auch 7,65×21mm Parabellum
- System: Rückstoßlader, verriegelter Browning-Verschluss, SA
- Magazin: 8 Schuss
- Lauflänge: 120mm (Standard)
- Gesamtlänge: 215mm
- Gewicht: ca. 900g (leer)
- Abzugsgewicht: ca. 1,5–2 kg (SA)

## Besonderheiten
Das einzigartige Konstruktionsmerkmal der P210: Der Verschluss (Schlitten) läuft INNEN im Rahmen — nicht aussen wie bei fast allen anderen Pistolen. Dies ergibt minimales Spiel und damit aussergewöhnliche Präzision. Jede P210 wurde aufwändig von Hand eingepasst.

## Varianten
- P210-1: Polierter Rahmen, Holzgriffschalen
- P210-2: Sandgestrahlter Rahmen (Armee-Standard)
- P210-5: Sportmodell, verlängerter Lauf 150mm
- P210-6: Sportmodell, Lauf 120mm, am verbreitetsten
- P210-7: .22 LR Ausführung für Training
- P210 Target (ab 2018): Modernisierte Neuauflage von SIG Sauer

## Rechtsstatus Schweiz
Ordonnanzwaffe — Käufer muss Schweizer Bürger oder Niederlassungsbewilligung C besitzen. Sammlerwert: CHF 800–3000+, seltene Varianten deutlich mehr.`,
    rechtsstatus: 'ordonnanz',
    typischeKaliber: ['9×19mm', '7,65mm Parabellum'],
    tags: ['Ordonnanz', 'SIG', 'P210', 'P49', 'Schweiz', 'Sammler', 'Präzision'],
    youtubeVideoId: 'MFySDAvQG8M',
    youtubeQuelle: 'hickok45',
  },

  {
    slug: 'p06',
    titel: 'Parabellum P06 (Luger)',
    kategorie: 'Ordonnanzwaffe',
    hersteller: 'DWM / W+F Bern',
    baujahr: '1906',
    kurzbeschreibung: 'Die ikonische Kniehebelpistole. Schweizer Ordonnanzpistole 1906–1949. Heiss begehrtes Sammlerstück.',
    inhalt: `## Parabellum P06 — Die ikonische Kniehebelpistole
Die Parabellum-Pistole (bekannt als "Luger") war von 1906 bis 1949 die Ordonnanzpistole der Schweizer Armee. Sie wurde von Georg Luger auf Basis der Borchardt C-93 entwickelt und ist eine der bekanntesten Handfeuerwaffen der Geschichte. Die Schweizer Armee war 1900 der erste militärische Abnehmer weltweit.

## Technische Daten
- Kaliber: 7,65×21mm Parabellum (P06), 9×19mm (P06/29)
- System: Kniehebelverschluss (Toggle-Lock)
- Magazin: 8 Schuss (Kastenmagazin im Griff)
- Lauflänge: 120mm (Standard), 150mm (Artillerie-Modell)
- Gewicht: 870g (leer)
- Gesamtlänge: 222mm

## Besonderheiten
Der Kniehebelverschluss ist einzigartig in der Waffengeschichte — zwei Gelenkhebel knicken beim Rückstoss nach oben ab. Dieses System ermöglicht einen extrem flachen Griffwinkel von 55°, der ein natürliches Zielen erlaubt. Die Fertigungsqualität war aussergewöhnlich hoch, was die Waffe teuer aber zuverlässig machte. Schweizer P06 von W+F Bern gelten als die bestverarbeiteten aller Parabellum-Pistolen.

## Varianten
- P06 (1906): Kaliber 7,65mm, Schweizer Erstausführung
- P06/29 (1929): Umstellung auf 9×19mm
- Artillerie-Modell: Langer Lauf (200mm), Trommelmagazin optional

## Sammlerwert
Schweizer P06 von W+F Bern: CHF 1'500–5'000+ je nach Zustand und Jahrgang. Seltene frühe Modelle deutlich mehr.

## Rechtsstatus Schweiz
Ordonnanzwaffe — Erwerb nur für Schweizer Bürger oder Personen mit Niederlassungsbewilligung C.`,
    rechtsstatus: 'ordonnanz',
    typischeKaliber: ['7,65×21mm Parabellum', '9×19mm'],
    tags: ['Ordonnanz', 'P06', 'Luger', 'Parabellum', 'Schweiz', 'Sammler', 'Kniehebel'],
    youtubeVideoId: 'FDtcMtXiEb0',
    youtubeQuelle: 'Elmsfeuer',
  },

  {
    slug: 'k11',
    titel: 'Karabiner 1911 (K11)',
    kategorie: 'Ordonnanzwaffe',
    hersteller: 'W+F Bern / SIG',
    baujahr: '1911',
    kurzbeschreibung: 'Vorgänger des K31. Schmidt-Rubin System mit Geradezugverschluss. Beliebtes Sammlerstück.',
    inhalt: `## Karabiner 11 — Schweizer Langwaffe der Belle Époque
Der Karabiner Modell 1911 (K11) war von 1913 bis 1933 die Standard-Kurzwaffe der Schweizer Armee. Er löste das Infanteriegewehr 1911 in der Kavallerietruppe ab und war der direkte Vorgänger des legendären K31.

## Technische Daten
- Kaliber: 7,5×55mm Swiss (GP11)
- System: Geradezugverschluss (Schmidt-Rubin System)
- Magazin: 6 Schuss (abnehmbares Kastenmagazin)
- Lauflänge: 590mm
- Gesamtlänge: 1100mm
- Gewicht: 3,9 kg
- Produziert: ca. 135'000 Stück (1913–1933)

## Besonderheiten
Der K11 verwendet den Schmidt-Rubin-Geradezugverschluss mit 12 Zügen im Lauf — ungewöhnlich viele für diese Epoche. Der Verschluss wird nur gerade zurückgezogen und vorgeschoben, ohne Drehbewegung. Dies ermöglicht schnelleres Repetieren als bei Mauser-Systemen, erfordert aber einen längeren Verschlussweg.

## Varianten
- Infanteriegewehr 1911 (IG11): Längere Version mit 780mm Lauf
- K11 Kavallerie: Standardausführung mit kürzerem Lauf

## Sammlerwert
CHF 250–600 je nach Zustand. Exemplare mit Truppenstempel und komplettem Originalzustand erzielen Höchstpreise.

## Rechtsstatus Schweiz
Ordonnanzwaffe — Erwerb nur für Schweizer Bürger oder C-Bewilligung.`,
    rechtsstatus: 'ordonnanz',
    typischeKaliber: ['7,5×55mm Swiss'],
    tags: ['Ordonnanz', 'K11', 'Karabiner', 'Schmidt-Rubin', 'Schweiz', 'Sammler'],
    youtubeVideoId: 'ZTxi3Kz1yN0',
    youtubeQuelle: 'Forgotten Weapons / Ian McCollum',
  },

  {
    slug: 'vetterli',
    titel: 'Vetterli-Gewehr (1869)',
    kategorie: 'Historische Waffe',
    hersteller: 'Eidg. Waffenfabrik',
    baujahr: '1869',
    kurzbeschreibung: 'Das erste Repetiergewehr der Schweizer Armee (1869). Vor 1871 — frei erhältlich, kein Kaufvertrag.',
    inhalt: `## Vetterli — Die erste Schweizer Repetierwaffe
Das Vetterli-Gewehr Modell 1869 war das weltweit erste Repetiergewehr einer Armee und wurde von Friedrich Vetterli in Neuhausen entwickelt. Die Schweiz war damit allen anderen Nationen voraus — die meisten Armeen verwendeten noch Einzellader.

## Technische Daten
- Kaliber: 10,4×38mm Randfeuer (später 7,5×53,5mm Umbau GP90)
- System: Zylinderverschluss mit Röhrenmagazin
- Magazin: 11 Schuss (Röhrenmagazin unter dem Lauf) + 1 im Lauf
- Lauflänge: 840mm (Gewehr), 540mm (Karabiner)
- Gewicht: 4,5 kg (Gewehr)
- Gesamtlänge: 1310mm

## Besonderheiten
Das Vetterli kombinierte erstmals einen Zylinderverschluss nach Dreyse-Prinzip mit dem Röhrenmagazin des Henry-Systems. Die Schweizer Version verwendete Randfeuer-Munition — ein Novum für Militärgewehre. Über 150'000 Stück wurden bei SIG in Neuhausen und W+F Bern gefertigt.

## Varianten
- Modell 1869: Originalausführung, Randfeuer
- Modell 1869/71: Verbessertes Modell
- Modell 1878: Umbau auf 10,4mm Zentralfeuer
- Modell 1881: Umbau Rubin-Munition (Versuch)

## Sammlerwert
CHF 200–800. Gut erhaltene Originalmodelle 1869 mit Randfeuer-Mechanik sind besonders gesucht.

## Rechtsstatus Schweiz
Ordonnanzwaffe — Erwerb nur mit Schweizer Bürgerrecht oder C-Bewilligung.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['10,4×38mm R'],
    tags: ['Historisch', 'Vetterli', 'Schweiz', 'Sammler', 'Vor1871'],
    youtubeVideoId: '0Yvbi69LaQE',
    youtubeQuelle: 'Forgotten Weapons / Ian McCollum',
  },

  // ─── PISTOLEN ────────────────────────────────────────────

  {
    slug: 'sig-p226',
    titel: 'SIG Sauer P226',
    kategorie: 'Pistole',
    hersteller: 'SIG Sauer',
    baujahr: '1984',
    kurzbeschreibung: 'Profi-Pistole der Polizei und Spezialeinheiten weltweit. Navy SEALs, GSG9 und mehr.',
    inhalt: `## SIG P226 — Kampfpistole der Eliteeinheiten
Die SIG Sauer P226 wurde 1984 als Weiterentwicklung der P220 vorgestellt und gewann die US-Army-Ausschreibung XM9 technisch — verlor aber den Auftrag an Beretta aus Kostengründen. Seitdem ist sie die bevorzugte Pistole von Navy SEALs, SAS und zahlreichen Spezialeinheiten weltweit.

## Technische Daten
- Kaliber: 9×19mm (auch .40 S&W, .357 SIG)
- System: Kurzhub-Rückstosslader, verriegelter Verschluss
- Magazin: 15 Schuss (9mm), 12 (.40), 12 (.357 SIG)
- Lauflänge: 112mm
- Gesamtlänge: 196mm
- Gewicht: 844g (leer)
- Abzug: DA/SA mit Spannabzug

## Besonderheiten
Die P226 hat keinen manuellen Sicherungshebel — stattdessen bietet der lange DA-Erstschuss und der Entkupplungshebel (Decocking Lever) die Sicherheit. Der Stahlschlitten auf Leichtmetallrahmen sorgt für ein ausgezeichnetes Rückstossverhalten. Die Verarbeitung aus deutscher/Schweizer Fertigung gilt als Benchmark der Branche.

## Varianten
- P226 MK25: Navy SEAL Version mit Phosphat-Beschichtung und Ankermarkierung
- P226 Legion: Premium-Ausführung mit G10-Griffschalen und SRT-Abzug
- P226 X-Five: Sportversion, SA-only, verlängerter Lauf
- P226 Nitron: Standard-Ausführung mit Nitron-Beschichtung

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich — Standardprozedur für Faustfeuerwaffen.`,
    rechtsstatus: 'wes',
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
    inhalt: `## SIG P320 — Modulare Militärpistole der neuen Generation
Die SIG Sauer P320 wurde 2014 vorgestellt und gewann 2017 die Ausschreibung der US-Armee als M17/M18 — die erste neue Armeepistole seit 30 Jahren. Das modulare Fire-Control-Unit-Konzept (FCU) revolutionierte den Pistolenmarkt.

## Technische Daten
- Kaliber: 9×19mm (auch .40 S&W, .357 SIG, .45 ACP)
- System: Kurzhub-Rückstosslader, modifizierter Browning-Verschluss
- Magazin: 17 Schuss (Full-Size 9mm), 15 (Compact), 12 (Subcompact)
- Lauflänge: 119mm (Full), 99mm (Compact), 91mm (Sub)
- Gewicht: 833g (Full-Size, leer)
- Abzug: Striker-fired (Schlagbolzenschloss)

## Besonderheiten
Die FCU (Fire Control Unit) — ein serialisiertes Stahlchassis mit Abzugsgruppe — ist das eigentliche Waffenstück. Der Polymerrahmen, Schlitten und Lauf sind waffenrechtlich Zubehör. Dadurch kann eine P320 mit wenigen Handgriffen von Full-Size 9mm auf Compact .45 ACP umgebaut werden — ohne Waffenkauf.

## Varianten
- M17 (Full-Size): US-Armee Standardpistole, Coyote Tan
- M18 (Compact): US Marines, kompaktere Version
- P320 X-Five Legion: Wettkampfpistole mit Tungsten-Griffmodul
- P320 AXG: Griffmodul aus Aluminium statt Polymer
- P320 Spectre: Premium-Serie mit Kompensator

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Glock 17 — Die Pistole, die alles veränderte
Die Glock 17 wurde 1982 von Gaston Glock in Österreich entwickelt und gewann sofort die Ausschreibung des österreichischen Bundesheeres. Heute ist sie die meistverbreitete Dienstpistole der Welt — über 65% aller US-Polizeibehörden verwenden Glock-Pistolen.

## Technische Daten
- Kaliber: 9×19mm
- System: Modifizierter Browning-Verschluss, Schlagbolzenschloss (Striker)
- Magazin: 17 Schuss (Standard), 19, 24, 33 Schuss optional
- Lauflänge: 114mm
- Gesamtlänge: 186mm (Gen5)
- Gewicht: 625g (leer, Gen5)
- Abzug: Safe-Action (teilgespannt, 3 passive Sicherungen)

## Besonderheiten
Die Glock 17 war die erste erfolgreiche Polymerrahmen-Pistole. Das „Safe Action"-System verwendet drei passive Sicherungen (Schlagbolzen-, Abzugsstangen- und Fallsicherung) — kein manueller Sicherungshebel. Nur 34 Teile insgesamt — die einfachste Konstruktion aller modernen Dienstpistolen. Extrem zuverlässig: über 300'000 Schuss ohne Funktionsstörung im Dauertest.

## Varianten
- Gen1–Gen5: Fünf Generationen mit stetigen Verbesserungen
- Glock 17L: Langversion für Sportschützen (153mm Lauf)
- Glock 17 MOS: Modular Optic System für Rotpunktvisiere
- Glock 17C: Kompensatorschlitze im Lauf

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Glock 19 — Der Kompakt-Bestseller
Die Glock 19 ist die kompakte Version der Glock 17 und seit ihrer Einführung 1988 die weltweit meistverkaufte Pistole. Sie kombiniert die Grösse einer Kompaktpistole mit einer Kapazität von 15 Schuss und akzeptiert auch die grösseren Glock-17-Magazine.

## Technische Daten
- Kaliber: 9×19mm
- System: Modifizierter Browning-Verschluss, Safe-Action-Striker
- Magazin: 15 Schuss (Standard), kompatibel mit 17/19/24/33-Schuss-Magazinen
- Lauflänge: 102mm
- Gesamtlänge: 174mm (Gen5)
- Gewicht: 602g (leer, Gen5)

## Besonderheiten
Die Glock 19 gilt als der beste Kompromiss zwischen Grösse, Kapazität und Schiesskomfort. Der nur 12mm kürzere Lauf gegenüber der G17 hat kaum Einfluss auf die Präzision. US-Spezialeinheiten (Delta Force, Navy SEALs) bevorzugen die G19 wegen der kompakteren Abmessungen. Sie ist auch die beliebteste Zivilpistole in der Schweiz.

## Varianten
- Gen5: Aktuelle Generation mit Marksman-Lauf und ambidextrem Verschlussfanghebel
- Glock 19X: Hybrid mit G17-Griffstück und G19-Schlitten (Coyote Tan)
- Glock 19 MOS: Mit Rotpunktvisier-Schnittstelle
- Glock 45: Wie 19X, aber in Schwarz und mit Gen5-Front-Serrations

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Glock 34 — Die Wettkampf-Glock
Die Glock 34 wurde 1998 als Sportpistole für IPSC Production und IDPA eingeführt. Sie basiert auf dem Glock-17-Rahmen mit verlängertem Lauf und Schlitten für bessere Visierung und ruhigeres Schwingungsverhalten.

## Geschichte
Glock erkannte Ende der 1990er-Jahre, dass die G17 im Wettkampfbereich gegen spezialisierte Sportpistolen (CZ Shadow, Beretta 92 Stock) kaum konkurrenzfähig war. Die Lösung: ein verlängerter Schlitten auf dem bewährten G17-Rahmen. 1998 wurde die G34 (9mm) zusammen mit der G35 (.40 S&W) vorgestellt. Innerhalb weniger Jahre dominierte die G34 die IPSC Production Division — heute ist sie die meistverwendete Pistole in dieser Klasse weltweit.

## Technische Daten
- Kaliber: 9×19mm
- System: Modifizierter Browning-Verschluss, Safe-Action
- Magazin: 17 Schuss (Standard)
- Lauflänge: 135mm
- Gesamtlänge: 207mm
- Gewicht: 650g (leer)
- Visierlänge: 172mm (vs. 153mm bei G17)

## Besonderheiten
Der verlängerte Lauf und die grössere Visierlinie machen die G34 zur präzisesten Serien-Glock. Der leichtere Schlitten reduziert den Rückstoss und ermöglicht schnellere Folgeschüsse. Standardmässig mit erleichtertem Abzug (ca. 2 kg) statt der üblichen 2,5 kg. Dominiert die IPSC Production Division weltweit.

## Varianten
- Glock 34 Gen5 MOS: Mit Optik-Schnittstelle für Rotpunktvisiere
- Glock 35: Gleiche Plattform in .40 S&W
- Glock 41: Gleiche Plattform in .45 ACP

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Walther PPK — James Bonds Dienstwaffe
Die Walther PPK (Polizeipistole Kriminal) wurde 1931 als kompaktere Version der PP vorgestellt. Sie wurde weltberühmt als die Waffe von James Bond — Ian Fleming wählte sie 1962 auf Empfehlung des Waffenexperten Geoffrey Boothroyd.

## Geschichte
Fritz Walther entwickelte 1929 die PP (Polizeipistole) als erste kommerziell erfolgreiche Selbstladepistole mit DA/SA-Abzug. 1931 folgte die PPK — 7mm kürzer und leichter, optimiert für Kriminalbeamte in Zivilkleidung. Im Zweiten Weltkrieg war sie die beliebteste Offizierspistole der Wehrmacht. Ab 1945 wurde sie weltweit von Geheimdiensten und Polizei eingesetzt. Die Produktion wechselte mehrfach: Zella-Mehlis (bis 1945), Manurhin in Frankreich (1952–1986), USA (Smith & Wesson/Interarms), und seit 2018 wieder bei Walther in Ulm.

## Technische Daten
- Kaliber: 7,65mm Browning (.32 ACP), auch .380 ACP (9mm kurz)
- System: Einfacher Rückstosslader (Blowback), unbeweglicher Lauf
- Magazin: 7 Schuss (7,65mm), 6 Schuss (.380)
- Lauflänge: 83mm
- Gesamtlänge: 155mm
- Gewicht: 568g (leer, Stahl)

## Besonderheiten
Die PPK war die erste kommerziell erfolgreiche DA/SA-Pistole mit Signalstift — einem Ladezustandsanzeiger, der anzeigt ob eine Patrone im Lauf ist. Das Ganzstahl-Design macht sie für ihre Grösse relativ schwer, was den Rückstoss dämpft. Der Griff ist mit dem Abzugsbügel verschweisst — ein Designmerkmal, das sofort erkennbar ist.

## Varianten
- PP (Polizeipistole): Grössere Urversion von 1929
- PPK: Verkürzte Version ab 1931
- PPK/S: Hybrid mit PP-Griffstück und PPK-Schlitten (für US-Import)
- PPK/E: Moderne Neuauflage

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Walther P99 — Deutscher Striker-Pionier
Die Walther P99 wurde 1997 als moderne Polymerrahmen-Pistole vorgestellt und war Walthers Antwort auf die Glock-Dominanz. Sie führte das innovative AS-Abzugssystem (Anti-Stress) ein und wurde bekannt als neue James-Bond-Pistole ab "Tomorrow Never Dies" (1997).

## Geschichte
Nach dem Ende des Kalten Krieges und dem Auslaufen der PP-Serie verlor Walther Marktanteile an Glock und SIG Sauer. 1994 begann die Entwicklung einer völlig neuen Pistole. 1997 wurde die P99 vorgestellt — Walthers erste Polymer-Pistole und zugleich die erste Striker-Fired-Pistole mit austauschbaren Griffrücken. Zahlreiche deutsche Polizeien übernahmen sie als Dienstwaffe (u. a. Nordrhein-Westfalen, Bayern). Die Produktion endete 2024 — als Nachfolger gilt die PDP.

## Technische Daten
- Kaliber: 9×19mm (auch .40 S&W)
- System: Kurzhub-Rückstosslader, Schlagbolzenschloss
- Magazin: 15 Schuss (9mm), 12 (.40 S&W)
- Lauflänge: 102mm
- Gesamtlänge: 180mm
- Gewicht: 630g (leer)

## Besonderheiten
Das AS-Abzugssystem kombiniert drei Abzugsmodi: langer DA-Erstschuss (ca. 4,5 kg), kurzer SA-Folgeschuss (ca. 2 kg) und Anti-Stress-Modus — durch Drücken des Entkupplungsknopfes kehrt der Abzug in den langen DA-Modus zurück. Drei austauschbare Griffrücken für unterschiedliche Handgrössen waren 1997 revolutionär — Glock übernahm dieses Konzept erst 2010.

## Varianten
- P99 AS: Anti-Stress Standard
- P99 DAO: Nur Double-Action
- P99 QA: Quick Action (teilgespannt, konstanter Abzugsweg)
- P99 RAD: Behördenversion der deutschen Polizei

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Walther PPQ — Bester Serienabzug seiner Klasse
Die Walther PPQ (Police Pistol Quick Defence) wurde 2011 als Nachfolger der P99 QA entwickelt. Sie ist bekannt für ihren aussergewöhnlich guten Striker-Abzug — vielfach als bester Serienabzug aller Polymerrahmen-Pistolen bezeichnet.

## Geschichte
Walther erkannte, dass der P99-QA-Abzug bei Sportschützen beliebt war, bei Behörden aber die fehlende zweite Abzugslänge (Anti-Stress) zum Problem wurde. 2011 destillierten sie das Beste aus der P99 QA in ein neues Modell: die PPQ. Der Name knüpft an die Polizeipistolen-Tradition (PP, PPK, PPQ) an. Ab 2013 folgte die M2 mit dem weltweit bevorzugten Druckknopf-Magazinlöser. 2021 wurde die PPQ durch die PDP (Performance Duty Pistol) abgelöst, die ab Werk Optics-Ready ist.

## Technische Daten
- Kaliber: 9×19mm (auch .40 S&W, .45 ACP)
- System: Kurzhub-Rückstosslader, Schlagbolzenschloss
- Magazin: 15 Schuss (9mm M1), 15+2 (M2)
- Lauflänge: 102mm
- Gesamtlänge: 180mm
- Gewicht: 615g (leer)
- Abzugsgewicht: ca. 2,5 kg (kurzer, knackiger Reset)

## Besonderheiten
Der Quick-Defence-Abzug hat nur 9mm Abzugsweg und einen extrem kurzen, taktil spürbaren Reset von ca. 2,5mm. Dies ermöglicht sehr schnelle, präzise Folgeschüsse. Die PPQ M2 wechselte vom Paddle-Magazinhalter (europäisch) zum Druckknopf (amerikanisch). Ergonomisch gilt sie als eine der bequemsten Pistolen am Markt.

## Varianten
- PPQ M1: Paddle-Magazinlöser (europäisch)
- PPQ M2: Druckknopf-Magazinlöser
- PPQ SC (Subcompact): Verkürzte Variante, 10+1
- PPQ Q5 Match: Wettkampfversion mit 5-Zoll-Lauf

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## CZ 75 — Die meistkopierte Pistole der Welt
Die CZ 75 wurde 1975 von den Brüdern František und Josef Koucký in der Tschechoslowakei entwickelt. Da der Ostblock keine Patente im Westen anmeldete, wurde sie von über 20 Herstellern kopiert — von Tanfoglio über IMI bis Springfield. Das Design gilt als eines der besten je gebauten.

## Technische Daten
- Kaliber: 9×19mm (auch .40 S&W)
- System: Kurzhub-Rückstosslader, Browning-Verschluss (Kammerverriegelung)
- Magazin: 16 Schuss (9mm)
- Lauflänge: 120mm
- Gesamtlänge: 206mm
- Gewicht: 1000g (Stahl, leer)
- Abzug: DA/SA mit manueller Sicherung

## Besonderheiten
Der Schlitten läuft INNEN in den Rahmenführungen — wie bei der SIG P210. Dies gibt der CZ 75 eine extrem geringe Schlittenspiel-Toleranz und hervorragende Präzision. Der Ganzstahlrahmen absorbiert den Rückstoss merklich besser als Polymer. Der tief liegende Lauf reduziert die Mündungsbewegung.

## Varianten
- CZ 75 B: Modernisierte Version mit Schlagbolzensicherung
- CZ 75 SP-01: Zubehörschiene, 18-Schuss-Magazin
- CZ 75 Shadow: Wettkampfversion ohne Sicherungshebel
- CZ 75 Compact: Verkürzte Version für verdecktes Tragen

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## CZ Shadow 2 — Dominanz in IPSC Production
Die CZ Shadow 2 wurde 2016 als dedizierte Wettkampfpistole vorgestellt und dominiert seither die IPSC Production Division weltweit. Sie ist eine kompromisslose Weiterentwicklung der CZ 75 SP-01 Shadow, optimiert für schnelle und präzise Schussabgabe.

## Geschichte
Die Shadow-Linie begann 2009 mit der CZ 75 SP-01 Shadow, die in Zusammenarbeit mit dem CZ-Werksteam entwickelt wurde. Obwohl erfolgreich, fehlte der SP-01 Shadow ein dediziertes Wettkampf-Design. 2016 stellte CZ die Shadow 2 vor — mit komplett überarbeitetem Griffstück, höherer Beavertail-Abdeckung und deutlich höherem Gewicht. Innerhalb eines Jahres nach Einführung gewann die Shadow 2 die IPSC-Weltmeisterschaft und hält seitdem den Markt in der Production Division fest im Griff.

## Technische Daten
- Kaliber: 9×19mm
- System: Kurzhub-Rückstosslader, modifizierter Browning-Verschluss
- Magazin: 17 Schuss
- Lauflänge: 120mm
- Gesamtlänge: 228mm
- Gewicht: 1280g (leer!) — absichtlich schwer
- Abzug: DA/SA, SA ca. 1,3 kg (Werkszustand)

## Besonderheiten
Das hohe Gewicht von 1'280g ist Absicht — es dämpft den Rückstoss und stabilisiert die Waffe beim schnellen Schiessen. Der überarbeitete Griff ist weiter nach oben verlegt, sodass die Hand näher am Lauf liegt (reduziert Muzzle Flip). Der SA-Abzug ab Werk ist so gut, dass viele Schützen keinen Tuning-Bedarf sehen.

## Varianten
- Shadow 2: Standardmodell in Schwarz oder Urban Grey
- Shadow 2 OR (Optics Ready): Gefräste Schlitten-Aufnahme für Rotpunktvisiere
- Shadow 2 Orange: Handgefittete Premium-Ausführung

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Beretta 92 / M9 — 35 Jahre US-Armeepistole
Die Beretta 92 wurde 1975 in Italien vorgestellt und gewann 1985 die Ausschreibung der US-Armee als M9 — wo sie bis 2017 über 600'000 Mal im Dienst stand. Sie ersetzte die legendäre Colt M1911 und war die erste 9mm-Dienstpistole des US-Militärs.

## Technische Daten
- Kaliber: 9×19mm
- System: Kurzhub-Rückstosslader, Schwenkriegel-Verriegelung (Walther-Prinzip)
- Magazin: 15 Schuss (M9), 17 Schuss (92FS Standardmagazin)
- Lauflänge: 125mm
- Gesamtlänge: 217mm
- Gewicht: 950g (leer)
- Abzug: DA/SA mit Sicherungs-/Entkupplungshebel auf dem Schlitten

## Besonderheiten
Die Beretta 92 verwendet eine offene Schlitten-Oberseite — ein Beretta-Markenzeichen, das Hülsenauswurf-Störungen fast unmöglich macht. Der Lauf ist fest mit dem Rahmen verbunden (Schwenkriegel), was theoretisch eine höhere Präzision als Browning-Tilting-Barrel ermöglicht. Der Aluminium-Rahmen ist eloxiert und widerstandsfähig.

## Varianten
- 92FS: Verbesserte Zivilversion mit Sicherungsnut am Schlitten
- M9A3: Modernisiert mit FDE-Finish, Gewindlauf und Zubehörschiene
- 92X Performance: Wettkampfversion, Brigadier-Schlitten
- Beretta M9A4: Aktuelle Generation mit Optics-Ready-Schlitten

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Heckler & Koch USP — Deutsche Universalpistole
Die USP (Universelle Selbstladepistole) wurde 1993 von Heckler & Koch als modulare Dienstpistole entwickelt. Sie war die erste Pistole mit integrierter Zubehörschiene (Picatinny) und wurde für das .40 S&W Kaliber optimiert — der damalige Standard bei US-Behörden.

## Technische Daten
- Kaliber: 9×19mm, .40 S&W, .45 ACP
- System: Modifizierter Browning-Verschluss mit HK-Puffer
- Magazin: 15 (9mm), 13 (.40), 12 (.45)
- Lauflänge: 108mm
- Gesamtlänge: 194mm
- Gewicht: 748g (9mm, leer)
- Abzug: DA/SA, 10 verschiedene Abzugsvarianten wählbar

## Besonderheiten
Die USP besitzt ein patentiertes Rückstoss-Puffersystem — eine Feder im Verschluss absorbiert den Aufprall des Schlittens und reduziert die Belastung um bis zu 30%. Zehn verschiedene Abzugskonfigurationen (V1–V10) erlauben individuelle Anpassung: mit/ohne Sicherung, mit/ohne Entkupplung, LEM-Abzug. Die Polymerrahmen-Konstruktion verwendet Stahleinlagen an allen Belastungspunkten.

## Varianten
- USP Compact: Verkürzte Version
- USP Expert: Verlängerter Lauf (124mm), einstellbares Visier
- USP Tactical: Gewindlauf für Schalldämpfer
- USP Match: Gewichtskompensator, Sportversion

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Heckler & Koch VP9 — HKs Striker-Revolution
Die VP9 (Volkspistole) wurde 2014 als HKs erste Striker-Fired-Pistole seit der VP70 (1970) vorgestellt. Sie kombiniert den überlegenen HK-Abzug mit modernem Striker-Design und gilt als eine der ergonomisch besten Pistolen am Markt.

## Technische Daten
- Kaliber: 9×19mm
- System: Kurzhub-Rückstosslader, Schlagbolzenschloss
- Magazin: 17 Schuss (Standard), 10 oder 15 optional
- Lauflänge: 104mm
- Gesamtlänge: 184mm
- Gewicht: 726g (leer)
- Abzugsgewicht: ca. 2,5 kg

## Besonderheiten
27 Griffrücken-/Seitenteile-Kombinationen ermöglichen eine individuelle Anpassung an jede Handgrösse. Die beidseitigen Ladehilfen ("Charging Supports") am hinteren Schlitten erleichtern das Durchladen erheblich. Der Abzug ist trotz Striker-System überraschend gut — knackiger Reset und sauberer Druckpunkt. HKs "cold hammer forged" Lauf ist auf 20'000+ Schuss ausgelegt.

## Varianten
- VP9: Standardmodell
- VP9 OR (Optics Ready): Gefräster Schlitten für Rotpunktvisiere
- VP9 Tactical: Gewindlauf, erhöhte Nachtvisierung
- VP9-B: Druckknopf-Magazinlöser statt Paddle
- VP9 Match: 5,51-Zoll-Lauf, Sporttrigger

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Heckler & Koch P30 — Dienstpistole der Bundespolizei
Die HK P30 wurde 2006 als Nachfolgerin der P2000 entwickelt und ist die aktuelle Dienstpistole der deutschen Bundespolizei, mehrerer Landespolizeien und zahlreicher europäischer Behörden. John Wick machte sie einer breiteren Öffentlichkeit bekannt.

## Technische Daten
- Kaliber: 9×19mm (auch .40 S&W)
- System: Kurzhub-Rückstosslader, modifizierter Browning-Verschluss
- Magazin: 15 Schuss (9mm)
- Lauflänge: 99mm
- Gesamtlänge: 178mm
- Gewicht: 740g (leer)
- Abzug: DA/SA oder LEM (Law Enforcement Modification)

## Besonderheiten
Die P30 bietet ein einzigartiges modulares Griffsystem: austauschbare Griffrücken und Seitenteile in je 3 Grössen ermöglichen 27 Kombinationen. Der ambidextre Magazinlöser und Schlittenfanghebel machen sie für Links- und Rechtshänder gleichermassen geeignet. Das LEM-Abzugssystem (ca. 3,5 kg, konstanter Abzugsweg ohne DA/SA-Unterschied) ist bei Behörden besonders beliebt.

## Varianten
- P30: Standardmodell
- P30L: Verlängerter Lauf und Schlitten (+13mm)
- P30S: Mit manueller Sicherung
- P30SK: Subkompakt-Version für verdecktes Tragen

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Heckler & Koch Mk 23 — SOCOM-Offensivpistole
Die Mk 23 Mod 0 wurde 1991–1996 für das US Special Operations Command (USSOCOM) als "Offensive Handgun Weapon System" entwickelt. Sie ist die grösste und teuerste je für eine Militäreinheit gebaute Pistole — ein kompromissloses Werkzeug für Spezialeinheiten.

## Technische Daten
- Kaliber: .45 ACP
- System: Kurzhub-Rückstosslader, modifizierter Browning-Verschluss
- Magazin: 12 Schuss
- Lauflänge: 149mm (mit Gewindlauf)
- Gesamtlänge: 245mm (ohne Schalldämpfer)
- Gewicht: 1210g (leer)
- Abzug: DA/SA mit ambidextrer Sicherung/Entkupplung

## Besonderheiten
Die Mk 23 wurde für +P .45 ACP ausgelegt und überstand im Test 30'000 Schuss ohne Funktionsstörung — keine andere Pistole hatte das je zuvor geschafft. Der Gewindlauf nimmt den KAC-Schalldämpfer auf, das LAM (Laser Aiming Module) von Insight sitzt an der Zubehörschiene. Sie ist so massiv gebaut, dass sie im Notfall als Nahkampfwaffe dienen kann.

## Varianten
- Mk 23: Militärversion (Parkerized-Finish, Maritime-Behandlung)
- HK Mark 23: Zivilversion (identisch, aber ohne Mil-Spec-Finish)

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Colt M1911 — Über 100 Jahre Dienstpistole
Die M1911 wurde von John Moses Browning entworfen und war von 1911 bis 1985 die Dienstpistole der US-Streitkräfte — die längste Dienstzeit aller militärischen Handfeuerwaffen. Ihr Grunddesign ist nach über 110 Jahren praktisch unverändert und wird von Hunderten Herstellern produziert.

## Technische Daten
- Kaliber: .45 ACP (auch 9mm, 10mm, .38 Super bei Sportversionen)
- System: Kurzhub-Rückstosslader, Browning-Schwenkriegel
- Magazin: 7 Schuss (.45 ACP Standard), 8 Schuss (moderne Magazine)
- Lauflänge: 127mm (5 Zoll, Government)
- Gesamtlänge: 216mm
- Gewicht: 1105g (Stahl, leer)
- Abzug: SA (Single Action Only), Griffsicherung + Daumensicherung

## Besonderheiten
Die 1911 war die erste erfolgreiche Kurzrecoil-Pistole mit Kipplaufverriegelung — das "Browning-System", das bis heute in fast allen modernen Pistolen verwendet wird. Das schwere .45 ACP Geschoss (230 grain) bei moderater Geschwindigkeit sorgt für hohe Mannstoppwirkung. Die Griffsicherung verhindert versehentliche Schussabgabe.

## Varianten
- Government: Original-Grösse (5" Lauf)
- Commander: Verkürzt (4,25" Lauf)
- Officer: Kompakt (3,5" Lauf)
- 1911 Rail: Mit Picatinny-Schiene
- Wettkampf: Wilson Combat, Nighthawk, Les Baer — handgefertigte Präzisionsmodelle

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Desert Eagle — Die stärkste Selbstladepistole
Die Desert Eagle wurde ab 1979 in den USA und Israel (IMI/IWI) entwickelt und ist die bekannteste grosskalibrige Selbstladepistole der Welt. Sie verschiesst Magnumpatronen, die normalerweise Revolvern vorbehalten sind, aus einem gasdruckbetriebenen Verschlusssystem.

## Technische Daten
- Kaliber: .50 AE, .44 Magnum, .357 Magnum
- System: Gasdrucklader mit Drehkopfverschluss (wie ein Gewehr!)
- Magazin: 7 (.50 AE), 8 (.44 Mag), 9 (.357 Mag)
- Lauflänge: 152mm (6 Zoll) oder 254mm (10 Zoll)
- Gesamtlänge: 269mm (6")
- Gewicht: 1998g (.50 AE, leer) — fast 2 kg!

## Besonderheiten
Die Desert Eagle ist die einzige Selbstladepistole mit echtem Gasdrucklader-System und Drehkopfverschluss — wie bei einem Sturmgewehr. Dieses System ist nötig, um die enormen Drücke von Magnum-Patronen zu bewältigen. Der feststehende Lauf ermöglicht theoretisch hohe Präzision. Durch modularen Kaliberwechsel (Lauf, Magazin, Verschluss) kann zwischen den drei Kalibern gewechselt werden.

## Varianten
- Mark XIX: Aktuelle Produktion in allen drei Kalibern
- Desert Eagle L5: Leichtere Version mit Aluminium-Rahmen
- Verschiedene Finishes: Poliert, Titanium Gold, Kryptek-Camo

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## FN Browning Hi-Power — Brownings letztes Meisterwerk
Die Browning Hi-Power (Grande Puissance) war John Brownings letzte Konstruktion, vollendet 1935 von Dieudonné Saive bei FN in Herstal. Sie war die erste Hochleistungspistole mit Doppelreihemagazin (13 Schuss) und diente über 90 Armeen weltweit.

## Technische Daten
- Kaliber: 9×19mm
- System: Kurzhub-Rückstosslader, Browning-Kipplauf mit Steuerkurve
- Magazin: 13 Schuss (Doppelreihe)
- Lauflänge: 118mm
- Gesamtlänge: 200mm
- Gewicht: 882g (leer, Stahl)
- Abzug: SA (Single Action Only)

## Besonderheiten
Die Hi-Power perfektionierte das Browning-Kipplaufsystem mit einer Steuerkurve statt des Schwenkriegels der M1911 — ein einfacheres und billigeres System, das bis heute Standard ist. Das 13-Schuss-Doppelreihemagazin war 1935 revolutionär. Sowohl die Alliierten (Kanada, Grossbritannien) als auch die Wehrmacht (als Pistole 640(b)) nutzten sie im Zweiten Weltkrieg.

## Varianten
- HP Original (1935–2017): Klassische Produktion bei FN
- FN High Power (2022): Komplette Neukonstruktion mit modernen Features
- HP-DA: Double-Action-Version (1980er, wenig Erfolg)

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## FN FNX — Taktische Kampfpistole
Die FN FNX wurde 2009 als Nachfolgerin der FNP-Serie vorgestellt und ist besonders in der .45 ACP Tactical-Version beliebt. Die FNX-45 Tactical wurde als Kandidat für das US Joint Combat Pistol Programm entwickelt, das jedoch ohne Sieger eingestellt wurde und gilt als eine der besten schalldämpfertauglichen Pistolen.

## Technische Daten
- Kaliber: 9×19mm, .40 S&W, .45 ACP
- System: Kurzhub-Rückstosslader, modifizierter Browning-Verschluss
- Magazin: 17 (9mm), 14 (.40), 15 (.45 ACP!)
- Lauflänge: 112mm (Standard), 117mm (.45 Tac, Gewindlauf)
- Gesamtlänge: 190mm (FNX-9)
- Gewicht: 866g (.45 Tac, leer)
- Abzug: DA/SA mit ambidextrer Sicherung/Entkupplung

## Besonderheiten
Die FNX-45 Tactical bietet 15 Schuss .45 ACP — mehr als jede andere Pistole in diesem Kaliber. Der Gewindlauf, die erhöhte Nachtvisierung und die Optics-Ready-Fräsung machen sie zur perfekten Plattform für Schalldämpfer und Rotpunktvisier. Alle Bedienelemente sind vollständig ambidextr.

## Varianten
- FNX-9: Standardkaliber 9mm
- FNX-40: In .40 S&W
- FNX-45: In .45 ACP, 15 Schuss
- FNX-45 Tactical: Mit Gewindlauf, Optics-Ready, FDE-Finish

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## SIG P220 — Die Schweizer Uhr unter den Pistolen
Die SIG P220 wurde 1975 als Nachfolgerin der P210 entwickelt und war die erste SIG-Pistole mit Leichtmetallrahmen. Sie wurde als Ordonnanzpistole 75 der Schweizer Armee eingeführt und begründete die gesamte SIG-P-Serie (P225, P226, P228, P229).

## Technische Daten
- Kaliber: 9×19mm (CH-Armee), .45 ACP (USA), .38 Super
- System: Kurzhub-Rückstosslader, Browning-Kipplauf (patentiertes SIG-Verriegelungssystem)
- Magazin: 8 Schuss (9mm, Einreiher), 8 (.45 ACP)
- Lauflänge: 112mm
- Gesamtlänge: 198mm
- Gewicht: 750g (9mm, leer)
- Abzug: DA/SA mit Entkupplungshebel

## Besonderheiten
Die P220 führte das SIG-eigene Verriegelungssystem ein: ein grosser Verriegelungsblock am Lauf greift in die Auswurföffnung. Kein manueller Sicherungshebel — nur der Entkupplungshebel (Decocker). In der Schweiz als Pistole 75 bis heute im Armeeeinsatz. Die .45 ACP Version ist besonders in den USA beliebt als Konkurrenz zur 1911.

## Varianten
- P220 (Pistole 75): Schweizer Armee, 9mm
- P220 Elite: Holzgriffschalen, Beavertail
- P220 Combat: .45 ACP Tactical mit Zubehörschiene
- P220 Legion: Premium-Version mit granitiertem Griffmodul

## Rechtsstatus Schweiz
9mm Armeeversion: Ordonnanzwaffe. Zivile Modelle: WES erforderlich.`,
    rechtsstatus: 'wes',
    typischeKaliber: ['.45 ACP', '9×19mm'],
    tags: ['Pistole', 'SIG', 'P220', 'Schweiz', 'Polizei'],
  },

  {
    slug: 'sig-p250',
    titel: 'SIG Sauer P250',
    kategorie: 'Pistole',
    hersteller: 'SIG Sauer',
    baujahr: '2007',
    kurzbeschreibung: 'Vollmodulare DAO-Pistole. Vorläufer der P320 — Fire Control Unit als eigentliches Waffenstück.',
    inhalt: `## SIG P250 — Modularer Vorläufer der P320
Die SIG Sauer P250 wurde 2007 als weltweit erste vollmodulare Pistole vorgestellt. Sie führte das Fire-Control-Unit-Konzept (FCU) ein, das später in der P320 perfektioniert wurde. Die P250 war ihrer Zeit voraus — kommerziell nicht so erfolgreich wie die Nachfolgerin, aber konzeptionell bahnbrechend.

## Technische Daten
- Kaliber: 9×19mm, .40 S&W, .357 SIG, .45 ACP
- System: Kurzhub-Rückstosslader, modulare Fire Control Unit
- Magazin: 17 (Full 9mm), 15 (Compact 9mm), 12 (Subcompact)
- Lauflänge: 119mm (Full), 99mm (Compact), 91mm (Sub)
- Gewicht: 756g (Full 9mm, leer)
- Abzug: DAO (Double Action Only) — langer, gleichmässiger Abzug

## Besonderheiten
Die FCU — ein serialisiertes Stahlchassis mit Abzugsgruppe — ist das eigentliche Waffenstück. Rahmen, Schlitten und Lauf können in Minuten getauscht werden: von Full-Size 9mm auf Subcompact .45 ACP ohne Waffenkauf. Der DAO-Abzug war bewusst gewählt für Behördenmarkt (konsistenter Abzug ohne SA/DA-Wechsel), wurde aber von vielen als zu schwer empfunden.

## Varianten
- P250 Full-Size: Dienstgrösse
- P250 Compact: Verkürzt
- P250 Subcompact: Verdecktes Tragen

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## SIG P365 — Revolution im Micro-9mm-Segment
Die SIG P365 wurde 2018 vorgestellt und revolutionierte den Markt für Kompaktpistolen. Trotz Glock-43-Abmessungen fasst sie 10+1 Schuss — dank eines neuartigen, extrem flachen Doppelreihenmagazins. Sie wurde sofort zur meistverkauften Pistole in den USA.

## Technische Daten
- Kaliber: 9×19mm
- System: Kurzhub-Rückstosslader, Schlagbolzenschloss
- Magazin: 10 Schuss (Flush), 12 und 15 Schuss optional
- Lauflänge: 79mm
- Gesamtlänge: 146mm
- Gewicht: 518g (leer)
- Breite: 25,4mm

## Besonderheiten
Das patentierte "Micro-Compact" Magazin fasst 10 Patronen in Doppelreihe bei nur 25mm Griffbreite — bis 2018 galt das als unmöglich. Die XRAY3 Tag/Nacht-Visierung ist serienmässig. Trotz der winzigen Abmessungen schiesst die P365 überraschend angenehm dank des tief liegenden Laufs.

## Varianten
- P365: Basismodell, 10+1
- P365 XL: Verlängerter Griff und Schlitten, 12+1, Optics-Ready
- P365X: XL-Schlitten auf Standard-Griffmodul
- P365 SAS: Anti-Snag Version ohne sichtbare Visierung (integriert)
- P365-XMACRO: Vergrösserte Version mit Kompensator, 17+1

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Springfield Hellcat — Mikropistole mit Rekordkapazität
Die Springfield Hellcat wurde 2019 als direkte Konkurrenz zur SIG P365 vorgestellt und bot mit 11+1 Schuss noch einen Schuss mehr in noch kompakteren Abmessungen. Sie war die erste Mikropistole mit serienmässiger Optics-Ready-Option.

## Geschichte
SIG Sauer revolutionierte 2018 mit der P365 den Markt für Mikropistolen — 10+1 Schuss in einer Taschenpistolengrösse. Springfield Armory reagierte schnell und stellte im September 2019 die Hellcat vor, die mit 11+1 Schuss nochmals einen draufsetzte. Die OSP-Version (Optical Sight Pistol) war die erste Mikropistole mit ab Werk vorbereiteter Rotpunktvisier-Aufnahme. 2022 folgte die Hellcat Pro als grössere Variante mit 15+1 Schuss, die den Sprung in die Compact-Klasse schaffte.

## Technische Daten
- Kaliber: 9×19mm
- System: Kurzhub-Rückstosslader, Schlagbolzenschloss
- Magazin: 11 Schuss (Flush), 13 Schuss (verlängert)
- Lauflänge: 76mm
- Gesamtlänge: 152mm
- Gewicht: 530g (leer)
- Breite: 25,4mm

## Besonderheiten
Die Hellcat bot bei Erscheinen die höchste Kapazität aller Mikro-9mm-Pistolen. Das OSP-Modell (Optical Sight Pistol) war die erste Mikropistole mit ab Werk gefrästem Schlitten für Micro-Rotpunktvisiere. Die adaptive Grifftextur ist aggressiver als bei der Konkurrenz. U-Dot-Visierung für schnelle Zielerfassung.

## Varianten
- Hellcat: Standardmodell
- Hellcat OSP: Optics-Ready (gefräster Schlitten)
- Hellcat Pro: Verlängerter Griff (15+1), Compact-Grösse
- Hellcat RDP: Kompensator und Micro-Rotpunkt inklusive

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Ruger LCP — Die Westentaschenpistole
Die Ruger LCP (Lightweight Compact Pistol) wurde 2008 vorgestellt und definierte das Segment der ultraleichten Backup-Pistolen. Mit nur 272g ist sie eine der leichtesten Pistolen am Markt und wurde speziell für das unauffällige Tragen konzipiert.

## Geschichte
Ruger reagierte mit der LCP auf den Erfolg der Kel-Tec P-3AT, die als erste ultraleichte .380-Taschenpistole den US-Markt erobert hatte. Die 2008 vorgestellte LCP war grösser und schwerer als die P-3AT, bot aber bessere Ergonomie und Verarbeitungsqualität. Sie wurde sofort zum Bestseller und verkaufte sich über 3 Millionen Mal. 2016 folgte die LCP II mit verbessertem Abzug und Visierung, 2021 die LCP MAX mit revolutionärem 10+1-Doppelreihenmagazin in der gleichen Baugrösse.

## Technische Daten
- Kaliber: .380 ACP (9mm kurz)
- System: Kurzhub-Rückstosslader, verriegelter Verschluss (Browning-Kipplauf), innenliegender Hahn
- Magazin: 6 Schuss
- Lauflänge: 70mm
- Gesamtlänge: 131mm
- Gewicht: 272g (LCP II, leer)
- Breite: 20mm

## Besonderheiten
Die LCP ist so klein und leicht, dass sie in einer Hosentasche verschwindet. Der Polymerrahmen und der Legierungsschlitten minimieren das Gewicht. Der lange, schwere DAO-Abzug dient als Sicherheitsmerkmal — kein manueller Sicherungshebel. Über 3 Millionen Exemplare wurden seit 2008 verkauft.

## Varianten
- LCP (Gen 1): Originalmodell
- LCP II: Verbesserter Abzug, bessere Visierung, Schlittenfanghebel
- LCP MAX: 10+1 Schuss in .380 ACP — Doppelreihenmagazin
- Ruger LCP II in .22 LR: Trainingsversion

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Taurus G2C / G3C — Budget-Pistole mit solider Leistung
Die Taurus G2C (2016) und ihre Nachfolgerin G3C (2020) sind brasilianische Kompaktpistolen im untersten Preissegment. Für CHF 300–400 bieten sie eine überraschend zuverlässige 9mm-Plattform — der meistverkaufte Taurus und eine der meistverkauften Pistolen überhaupt.

## Technische Daten
- Kaliber: 9×19mm (auch .40 S&W)
- System: Kurzhub-Rückstosslader, Browning-Kipplauf
- Magazin: 12 Schuss (G2C/G3C)
- Lauflänge: 83mm
- Gesamtlänge: 163mm
- Gewicht: 623g (leer)
- Abzug: SA/DA (Restrike-Fähigkeit bei Zündversager)

## Besonderheiten
Die G3C bietet Features, die in dieser Preisklasse sonst nicht zu finden sind: drei Magazine im Lieferumfang, manuelle Sicherung, Zubehörschiene und Restrike-Capability. Die Restrike-Funktion erlaubt einen zweiten Abschlagsversuch bei Zündversager ohne manuelles Repetieren. Die Verarbeitung hat sich seit der PT111-Ära massiv verbessert.

## Varianten
- G2C: Ursprungsmodell 2016
- G3C: Überarbeitung 2020, verbesserter Abzug und Grifftextur
- G3: Full-Size Version, 17+1 Schuss
- G3X: Hybrid mit G3-Schlitten auf G3C-Griffstück

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
Die Springfield XD basiert auf der kroatischen HS2000 von HS Produkt und wird seit 2002 unter dem Springfield-Armory-Label in den USA verkauft. Ihr Alleinstellungsmerkmal ist die Griffsicherung — ähnlich der M1911 — die bei keiner anderen modernen Polymerrahmen-Pistole zu finden ist.

## Technische Daten
- Kaliber: 9×19mm, .40 S&W, .45 ACP
- System: Kurzhub-Rückstosslader, Browning-Kipplauf, Striker-fired
- Magazin: 16 (9mm), 12 (.40), 13 (.45)
- Lauflänge: 102mm (4"), 127mm (5" Tactical)
- Gesamtlänge: 184mm (4")
- Gewicht: 737g (9mm, leer)

## Besonderheiten
Die Griffsicherung am Rückstrang muss vollständig eingedrückt werden, damit die Waffe feuern kann. Zusätzlich gibt es einen Abzugssicherungshebel (wie bei Glock). Ein Ladezustandsanzeiger am Schlitten und ein Spannungsanzeiger zeigen den Zustand der Waffe. Diese dreifache Sicherung macht die XD zur sichersten Striker-Pistole.

## Varianten
- XD: Originalmodell
- XDm: Verbesserungen mit Match-Lauf und austauschbaren Griffrücken
- XD-S: Single-Stack Subcompact
- XD-M Elite: Neueste Generation mit META-Abzug
- Hellcat: Eigenständige Mikro-Linie (siehe Hellcat)

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Tanfoglio Witness — Italienischer CZ-75-Klon
Die Tanfoglio Witness (auch als EAA Witness vermarktet) ist ein italienischer Klon der CZ 75, gefertigt von Fratelli Tanfoglio in Gardone Val Trompia. Sie hat sich als eigenständige Plattform etabliert und dominiert den IPSC Standard- und Open-Division weltweit.

## Technische Daten
- Kaliber: 9×19mm, .40 S&W, 10mm Auto, .45 ACP, .38 Super
- System: Kurzhub-Rückstosslader, CZ-75-basierter Browning-Verschluss
- Magazin: 17 (9mm), 14 (.40), 14 (10mm), 10 (.45)
- Lauflänge: 120mm (Standard), 136mm (Gold/Stock)
- Gewicht: 1000g (Stahl), 820g (Polymer Wonder)
- Abzug: DA/SA oder SAO (Stock/Gold-Versionen)

## Besonderheiten
Der innenliegende Schlitten (CZ-75-Erbstück) gibt der Witness hervorragende Führungseigenschaften. Tanfoglio bietet die grösste Kalibervielfalt aller CZ-Klone — einschliesslich 10mm Auto und .38 Super für IPSC. Die Stock- und Gold-Modelle sind ab Werk wettkampftauglich mit verbessertem Abzug und einstellbarer Visierung.

## Varianten
- Witness Standard: DA/SA Basismodell
- Witness Stock II/III: Wettkampf, SAO, verbesserter Abzug
- Witness Gold: Top-Wettkampfmodell mit Kompensator
- Witness Polymer (Wonder): Leichteres Polymerrahmen-Modell
- Limited Custom: Handgefittete Einzelstücke

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
Die Pistole 08 (P08), im Ausland als "Luger" bekannt, war von 1908 bis 1945 die Standard-Dienstpistole der deutschen Armee. Georg Luger entwickelte sie aus der Borchardt C-93 — der Name "Parabellum" stammt vom lateinischen "Si vis pacem, para bellum" (Willst du Frieden, rüste zum Krieg).

## Technische Daten
- Kaliber: 9×19mm Parabellum (auch 7,65mm Parabellum)
- System: Kniehebelverschluss (Toggle-Lock)
- Magazin: 8 Schuss (Kastenmagazin), 32 Schuss (Trommelmagazin beim Artilleriemodell)
- Lauflänge: 100mm (P08), 150mm (Marine-Modell), 200mm (Lange Pistole 08 / Artillerie)
- Gesamtlänge: 222mm
- Gewicht: 871g (leer)

## Besonderheiten
Der Kniehebelverschluss ist weltweit einzigartig — zwei Gelenkhebel knicken beim Rückstoss nach oben ab und ziehen die leere Hülse aus dem Patronenlager. Dieses System ermöglicht einen extrem natürlichen Griffwinkel von 55°. Die Fertigungsqualität war legendär — jede Luger bestand aus über 90 Einzelteilen, handgefertigt und -eingepasst. Die P08 gilt als die ästhetisch schönste Pistole aller Zeiten.

## Varianten
- P08 (1908): Standard-Militärmodell, 100mm Lauf
- Lange Pistole 08 (LP08): Artilleriemodell mit 200mm Lauf und Trommelmagazin
- Marine-Modell: 150mm Lauf
- Schweizer Ordonnanz: Siehe Parabellum P06

## Sammlerwert
Standard P08: CHF 800–2'500. LP08 mit Trommelmagazin: CHF 3'000–8'000+. Seltene Varianten (DWM 1900, Krieghoff) deutlich mehr.

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich. Schweizer P06-Varianten: Ordonnanzwaffe.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Walther P38 — Erster moderner DA/SA-Mechanismus
Die Walther P38 wurde 1938 als Nachfolgerin der teuren Luger P08 eingeführt und setzte den Standard für alle modernen DA/SA-Pistolen. Sie war die erste Militärpistole mit Double-Action-Abzug und externem Hahn — ein Konzept, das bis heute in SIG, Beretta und CZ-Pistolen lebt.

## Technische Daten
- Kaliber: 9×19mm
- System: Kurzhub-Rückstosslader, Schwenkriegel-Verriegelung
- Magazin: 8 Schuss
- Lauflänge: 125mm
- Gesamtlänge: 216mm
- Gewicht: 800g (leer, Stahlausführung)
- Abzug: DA/SA mit Sicherungs-/Entkupplungshebel

## Besonderheiten
Die P38 führte drei Innovationen ein, die bis heute Standard sind: Double-Action-Erstschuss (gespannter Hahn nicht nötig), Ladezustandsanzeiger (fühlbarer Stift zeigt Patrone im Lauf an) und Sicherungshebel mit Entkupplungsfunktion. Das Schwenkriegel-System (zwei Riegel verriegeln den Lauf seitlich) wurde später von Beretta (92) übernommen.

## Varianten
- P38 (1938–1945): Kriegsproduktion bei Walther, Mauser und Spreewerk
- P1 (1957–2000): Nachkriegsversion der Bundeswehr mit Alu-Rahmen
- P4: Verkürzte Polizeiversion
- P38K: Kurze Variante mit 70mm Lauf

## Sammlerwert
WW2-Originale: CHF 500–2'500 je nach Hersteller und Zustand. Seltene ac-Codes oder Spreewerk-Modelle erzielen Höchstpreise.

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Smith & Wesson 686 — König der .357 Magnum Revolver
Der S&W 686 wurde 1981 als Edelstahl-Version des berühmten Model 586 eingeführt und ist der meistverkaufte .357 Magnum Revolver der Welt. Sein L-Rahmen wurde speziell für die Dauerbelastung mit Magnum-Patronen entwickelt.

## Technische Daten
- Kaliber: .357 Magnum (auch .38 Special)
- System: Doppelwirkender Revolver (DA/SA)
- Trommel: 6 Schuss (Standard), 7 Schuss (686 Plus)
- Lauflänge: 64mm (2,5"), 102mm (4"), 152mm (6")
- Gesamtlänge: 241mm (4" Lauf)
- Gewicht: 1070g (4" Lauf)

## Besonderheiten
Der L-Rahmen ist grösser als der K-Rahmen (Model 19/66), aber kleiner als der N-Rahmen (Model 29) — der perfekte Kompromiss zwischen Tragbarkeit und Magnum-Tauglichkeit. Die Edelstahl-Konstruktion ist korrosionsbeständig und extrem langlebig. Der DA-Abzug von S&W gilt als der beste aller Revolver. Mit .38 Special geladen ideal zum Training, mit .357 Magnum für Jagd und Selbstverteidigung.

## Varianten
- 686: Standard, 6 Schuss
- 686 Plus: 7 Schuss
- 686 SSR (Pro Series): Wettkampf mit Holzgriff
- 686 Competitor: Performance Center, 6" Lauf mit Kompensator

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Colt Python — Der Rolls-Royce der Revolver
Der Colt Python wurde 1955 als Premium-Revolver vorgestellt und gilt als der schönste und am besten verarbeitete Revolver aller Zeiten. Seine "Royal Blue" Hochglanzbrünierung und der butterweiche Abzug machten ihn zur Legende — und zum Sammlerstück mit Rekordpreisen.

## Technische Daten
- Kaliber: .357 Magnum (.38 Special kompatibel)
- System: Doppelwirkender Revolver (DA/SA)
- Trommel: 6 Schuss
- Lauflänge: 64mm (2,5"), 102mm (4"), 152mm (6"), 203mm (8")
- Gesamtlänge: 295mm (6" Lauf)
- Gewicht: 1178g (6" Lauf)

## Besonderheiten
Der Python hat einen belüfteten Laufmantel und eine durchgehende Laufschiene — sein ikonisches Erscheinungsbild. Der Abzug wurde von Hand eingepasst und poliert, der DA-Abzug gilt als der sanfteste je in einem Serienrevolver verbaute. Die "Royal Blue" Brünierung erforderte bis zu 12 Arbeitsgänge.  Die Originalproduktion (1955–2005) wurde 2020 mit einem komplett neuen Python wiederbelebt.

## Varianten
- Python (1955–2005): Originalproduktion, handgefertigt
- Python (2020–heute): Neukonstruktion mit verbesserter V-Feder
- Python Target: Einstellbare Visierung, 8" Lauf
- Python Hunter: Mit Leupold-Zielfernrohr

## Sammlerwert
Originale (1955–2005): CHF 2'000–8'000+. Nickel-Finish und kurze Läufe (2,5") besonders gesucht.

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Colt Single Action Army — Der Peacemaker
Der Colt Single Action Army (SAA), auch "Peacemaker" genannt, wurde 1873 eingeführt und ist die ikonischste Waffe des Wilden Westens. Er war die Ordonnanzwaffe der US-Kavallerie von 1873 bis 1892 und wird bis heute bei Colt in Hartford gefertigt.

## Technische Daten
- Kaliber: .45 Colt (Original), auch .44-40, .357 Magnum, .44 Special
- System: Single-Action-Revolver mit Einhandspannung
- Trommel: 6 Schuss
- Lauflänge: 121mm (4¾", "Gunfighter"), 140mm (5½", Artillery), 191mm (7½", "Cavalry")
- Gewicht: 1048g (5½")

## Besonderheiten
Der SAA kann nur nach manuellem Spannen des Hahns abgefeuert werden (Single Action). Laden und Entladen erfolgt einzeln über die seitliche Ladeklappe — kein Ausschwenken der Trommel. Diese Bauweise hat sich seit 1873 nicht verändert. Colt produzierte drei Generationen: 1st Gen (1873–1941), 2nd Gen (1956–1974), 3rd Gen (1976–heute).

## Varianten
- Artillery Model: 5,5" Lauf, Kavallerie-Rückkäufer
- Buntline Special: 12" Lauf (Wyatt Earp zugeschrieben)
- Sheriff's Model: 3" Lauf, ohne Auszieherstange
- Frontier Six-Shooter: In .44-40 WCF

## Sammlerwert
1st Generation (1873–1941): CHF 3'000–50'000+. Moderne Produktion: CHF 1'500–3'000.

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Smith & Wesson 629 — Dirty Harrys Erbe in Edelstahl
Der S&W 629 ist die Edelstahl-Version des berühmten Model 29, das durch Clint Eastwood als "Dirty Harry" weltberühmt wurde. Seit 1979 ist der 629 der Standard-Revolver für .44 Magnum — robuster und pflegeleichter als das brünierte Original.

## Technische Daten
- Kaliber: .44 Remington Magnum (.44 Special kompatibel)
- System: Doppelwirkender Revolver (DA/SA), N-Rahmen
- Trommel: 6 Schuss
- Lauflänge: 102mm (4"), 152mm (6"), 213mm (8⅜")
- Gesamtlänge: 295mm (6" Lauf)
- Gewicht: 1276g (6" Lauf)

## Besonderheiten
Der massive N-Rahmen aus Edelstahl ist für die enormen Drücke der .44 Magnum ausgelegt — 1'570 Joule Mündungsenergie. Der Rückstoss ist heftig, aber durch das hohe Gewicht beherrschbar. Mit .44 Special geladen ist der 629 ein angenehmer Übungsrevolver. Der 8⅜" Lauf bietet maximale Präzision für die Jagd.

## Varianten
- 629 Classic: Standardmodell mit Full-Lug-Lauf
- 629 Stealth Hunter: Performance Center, matt-schwarz
- 629 Competitor: Performance Center, 6" gewichteter Lauf
- 629 V-Comp: Mit Kompensator für reduzierten Rückstoss

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Ruger GP100 — Unzerstörbarer Gebrauchsrevolver
Der Ruger GP100 wurde 1985 als überdimensioniert robuster .357 Magnum Revolver eingeführt. Er wurde bewusst stärker gebaut als nötig — mit einem massiven Vollstahlrahmen, der unbegrenzt .357 Magnum Dauerfeuer aushält. Polizeibehörden und Sportschützen schätzen seine Unverwüstlichkeit.

## Technische Daten
- Kaliber: .357 Magnum (.38 Special kompatibel), auch .327 Fed. Mag., .44 Special
- System: Doppelwirkender Revolver (DA/SA)
- Trommel: 6 Schuss (.357), 7 Schuss (.327)
- Lauflänge: 64mm (2,5"), 106mm (4,2"), 152mm (6")
- Gewicht: 1134g (4,2" Lauf)

## Besonderheiten
Der GP100 verwendet ein dreifach verriegeltes Trommelsystem (vorne, hinten und am Auslöser) — stabiler als S&W-Revolver. Der Rahmen ist aus einem Stück Stahl geschmiedet — nicht wie bei S&W aus zwei verschraubten Hälften. Die Griffe sind modular mit einem Stahlkern-Adapter — verschiedene Griffschalen passen. Der Revolver wurde für 10'000+ Vollladungs-.357-Patronen ohne Verschleiss getestet.

## Varianten
- GP100: Standard, Edelstahl oder brüniert
- GP100 Match Champion: 4,2" Lauf, verbesserte Visierung, Hogue-Griff
- GP100 10mm: Halbmond-Clips, 6 Schuss
- SP101: Kleinere, kompaktere Version (5 Schuss)

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Ruger SP101 — Kompakter Stahlrevolver
Der Ruger SP101 wurde 1989 als kompakter, aber extrem robuster Revolver eingeführt. Er ist einer der wenigen Kompaktrevolver aus Vollstahl, der .357 Magnum dauerhaft verkraftet — die meisten Konkurrenten in dieser Grösse sind auf .38 Special beschränkt.

## Technische Daten
- Kaliber: .357 Magnum (.38 Special kompatibel), auch .327 Fed. Mag., .22 LR
- System: Doppelwirkender Revolver (DA/SA)
- Trommel: 5 Schuss (.357), 6 Schuss (.327 und .22 LR)
- Lauflänge: 57mm (2,25"), 79mm (3"), 106mm (4,2")
- Gewicht: 737g (2,25" Lauf)

## Besonderheiten
Trotz seiner kompakten Grösse verwendet der SP101 den gleichen dreifach verriegelten Trommelmechanismus wie der grosse GP100. Der massive Stahlrahmen absorbiert den .357-Rückstoss besser als leichte Scandium- oder Titanium-Revolver. Der Hammer kann für verdecktes Tragen stufenlos eingekürzt werden. Die monolithische Rahmenkonstruktion (ein Stück Stahl) ist praktisch unzerstörbar.

## Varianten
- SP101: Standard, Edelstahl
- SP101 Spurless: Ohne Hahnsporn für verdecktes Tragen
- SP101 in .22 LR: 6 Schuss, 4,2" Lauf für Training
- Wiley Clapp SP101: Spezialedition mit Novak-Visierung

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Smith & Wesson Model 60 — Erster Edelstahl-Revolver
Das S&W Model 60 wurde 1965 als weltweit erster komplett aus Edelstahl gefertigter Revolver vorgestellt. Es revolutionierte den Markt — Edelstahl war korrosionsbeständig und erforderte weniger Pflege als brünierte Waffen. Basierend auf dem legendären J-Rahmen.

## Technische Daten
- Kaliber: .357 Magnum (.38 Special kompatibel)
- System: Doppelwirkender Revolver (DA/SA), J-Rahmen
- Trommel: 5 Schuss
- Lauflänge: 51mm (2"), 76mm (3")
- Gesamtlänge: 171mm (2" Lauf)
- Gewicht: 680g (3" Lauf)

## Besonderheiten
Der J-Rahmen ist der kleinste S&W-Revolverrahmen und definiert seit 1950 die Kategorie der Taschenrevolver. Das Model 60 war ursprünglich nur in .38 Special erhältlich — ab 1996 auch in .357 Magnum. Der 3" Lauf bietet den besten Kompromiss zwischen Tragbarkeit und Schiesskomfort mit Magnum-Ladungen. S&W-Kenner schwören auf den handgefitteten DA-Abzug.

## Varianten
- Model 60: Standard, 2" oder 3" Lauf
- Model 60 Pro Series: Verbesserte Visierung, Wolff-Feder
- Model 642: Intern gespannter Hammer (DAO), Aluminium-Rahmen
- Model 340PD: Scandium/Titanium, nur 326g — ultraleicht

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Korth — Der teuerste Serienrevolver der Welt
Die Korth Revolver werden seit 1964 in Deutschland (Ratzeburg, seit 2009 Lollar) in Handarbeit gefertigt und gelten als die besten und teuersten Serienrevolver der Welt. Jeder Korth wird von einem einzigen Büchsenmacher von Anfang bis Ende gebaut — Preise beginnen bei CHF 4'000.

## Technische Daten
- Kaliber: .357 Magnum (.38 Special kompatibel), auch 9×19mm (mit Wechseltrommel)
- System: Doppelwirkender Revolver (DA/SA)
- Trommel: 6 Schuss
- Lauflänge: 76mm (3"), 102mm (4"), 152mm (6")
- Gewicht: ca. 1050g (4" Lauf, je nach Ausstattung)

## Besonderheiten
Jeder Korth wird aus einem massiven Block Stahl CNC-gefräst und anschliessend von Hand eingepasst — 60+ Arbeitsstunden pro Revolver. Die Trommel lässt sich nach vorne oder hinten ausschwenken und ist austauschbar — eine Wechseltrommel in 9×19mm ist einzigartig. Der Lauf kann vom Kunden selbst getauscht werden. Der DA-Abzug ist der leichtgängigste und präziseste aller Revolver — absolut seidenweich.

## Varianten
- Korth Combat: Standardmodell mit Laufmantel
- Korth Sport: Wettkampf mit verlängertem Lauf
- Korth Sky Marshal: Ultraleicht, DAO, für Flugsicherheit
- Korth Ranger: Einzelschuss-Kipplauf-Pistole
- Nighthawk/Korth: US-Kooperation mit Nighthawk Custom

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
    typischeKaliber: ['.357 Magnum', '9×19mm'],
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
    inhalt: `## Blaser R8 — Deutscher Präzisions-Repetierer
Die Blaser R8 wurde 2008 als Nachfolgerin der R93 vorgestellt und gilt als die vielseitigste Jagdbüchse der Welt. Das einzigartige Geradezug-Repetier­system und die sekundenschnelle Kaliberwechsel-Möglichkeit machen sie zur bevorzugten Waffe europäischer Berufsjäger.

## Technische Daten
- Kaliber: Über 30 Kaliber verfügbar (.222 Rem bis .500 Jeffery)
- System: Geradezug-Repetierer mit Radialverriegelung (14 Verriegelungsfinger)
- Magazin: 3–5 Schuss (abnehmbares Kastenmagazin)
- Lauflänge: 520mm, 580mm oder 650mm je nach Kaliber
- Gewicht: ab 3,1 kg (ohne Optik)
- Abzug: Direktabzug mit Handspannung (kein Sicherungshebel nötig)

## Besonderheiten
Das Handspannsystem ist einzigartig: Die Waffe wird durch Vorschieben des Handspannschiebers am Pistolengriff gespannt — ohne Sicherungshebel. Der Geradezugverschluss ermöglicht blitzschnelles Repetieren ohne den Blick vom Ziel zu nehmen. Kaliberwechsel in unter 2 Minuten: Lauf abschrauben, neuen Lauf mit Verschlusskopf einsetzen, fertig.

## Varianten
- R8 Standard: Holzschaft
- R8 Professional: Kunststoffschaft mit Gummieinlage
- R8 Professional Success: Ledereinsatz im Schaft
- R8 Silence: Integrierter Schalldämpfer
- R8 Ultimate: Premium mit Handgravur

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## Sako 85 — Finnische Präzision seit 1927
Die Sako 85 ist die aktuelle Repetierbüchse des finnischen Traditionsherstellers Sako (gegründet 1927). Sie wird oft als die am besten verarbeitete Serienrepetierbüchse der Welt bezeichnet — jeder Lauf wird einzeln auf Präzision getestet und mit Zielscheibe ausgeliefert.

## Technische Daten
- Kaliber: .222 Rem bis .375 H&H Magnum (über 30 Kaliber)
- System: Repetierbüchse mit 3-Warzen-Verschluss (70° Öffnungswinkel)
- Magazin: 4–6 Schuss (abnehmbar, Totalverriegelung)
- Lauflänge: 510mm bis 620mm
- Gewicht: ab 2,9 kg (Carbonite)
- Abzug: Einstellbar, 1–2 kg

## Besonderheiten
Fünf verschiedene Hülsengrössen mit je eigenem Verschluss garantieren optimale Proportionen für jedes Kaliber. Der 70° Öffnungswinkel des Kammerstängels ermöglicht schnelleres Repetieren als die üblichen 90°. Jede Sako 85 wird mit einer Werkszielscheibe ausgeliefert, die die Präzision dokumentiert. Der TRG-Abzug (aus dem Scharfschützengewehr) ist serienmässig.

## Varianten
- Sako 85 Finnlight: Ultraleicht mit Fluted Barrel
- Sako 85 Bavarian: Bayerischer Schaftstil mit Hirschfänger-Griff
- Sako 85 Carbonlight: Carbon-/Edelstahl-Kombination, ab 2,4 kg
- Sako 85 Long Range: Schwerer Lauf, Thumbhole-Schaft

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## Tikka T3x — Preis-Leistungs-König der Jagdbüchsen
Die Tikka T3x (seit 2016, Vorgänger T3 seit 2003) wird von Sako in Finnland gefertigt und bietet Sako-Qualität zu einem deutlich günstigeren Preis. Sie ist die meistverkaufte Jagdrepetierbüchse in der Schweiz und bekannt für ihre sofort ab Werk hervorragende Präzision.

## Technische Daten
- Kaliber: .204 Ruger bis .300 Win Mag (über 20 Kaliber)
- System: Repetierbüchse mit 2-Warzen-Verschluss
- Magazin: 3–6 Schuss (abnehmbar)
- Lauflänge: 510mm bis 620mm
- Gewicht: ab 2,9 kg (Lite)
- Abzug: Einstellbar, ab 1 kg

## Besonderheiten
Die T3x bietet ab Werk typischerweise Sub-MOA-Präzision (unter 3cm auf 100m) — in dieser Preisklasse einzigartig. Das modulare Schaftsystem mit austauschbaren Pistolengriff-Einsätzen und Schaftbacken kam erst mit dem "x"-Update. Der glatte Kammerstängellauf und die 72°-Öffnung machen schnelles Repetieren möglich. Hervorragendes Abzugsystem mit knackigem Druckpunkt.

## Varianten
- T3x Lite: Standard-Jagdbüchse, Kunststoff
- T3x Hunter: Holzschaft
- T3x Varmint: Schwerer Lauf für Präzisionsschiessen
- T3x TAC A1: Taktische Plattform mit Chassis-Schaft
- T3x UPR: Ultimate Precision Rifle

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## Mauser M18 — Die Volksrepetierbüchse
Die Mauser M18 wurde 2018 als bezahlbare Jagdbüchse mit Mauser-Qualität vorgestellt. Der Hersteller nennt sie "The People's Rifle" — sie demokratisiert den Zugang zur Marke Mauser, die sonst für Luxusgewehre ab CHF 5'000 steht.

## Technische Daten
- Kaliber: .223 Rem bis .300 Win Mag (12 Kaliber)
- System: Repetierbüchse mit 3-Warzen-Verschluss (60° Öffnungswinkel)
- Magazin: 5 Schuss (abnehmbares Kunststoffmagazin)
- Lauflänge: 560mm (Standard), 620mm (Magnum)
- Gewicht: 3,1 kg (ohne Optik)
- Abzug: Einstellbar, ab 1,2 kg

## Besonderheiten
Der 60°-Öffnungswinkel ist der kürzeste in dieser Klasse und ermöglicht das schnellste Repetieren. Die Drei-Lagen-Sicherung (Safe, Feuer, Ladezustand) entspricht dem Mauser-98-Prinzip. Der kaltgehämmerte Lauf liefert ab Werk Sub-MOA-Präzision. Trotz des günstigen Preises wird die M18 im selben Werk in Isny gefertigt wie die teure M12.

## Varianten
- M18: Standardmodell mit Polymerstoff
- M18 Feldjagd: Mit Mündungsgewinde und Laufmantel
- M18 Stainless: Edelstahl-Lauf/Verschluss
- M18 Waldjagd: Mit offener Visierung

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
Die Steyr Mannlicher Repetierbüchsen stehen für über 150 Jahre österreichische Waffenbaukunst. Der aktuelle SM12 und die Pro Hunter sind bekannt für ihren Safe-Bolt-Verschluss, die Handspannung und die typisch europäische Eleganz. Ferdinand Ritter von Mannlicher erfand 1885 den Geradezugverschluss.

## Technische Daten
- Kaliber: .222 Rem bis .300 Win Mag
- System: Repetierbüchse mit SBS-Verschluss (Safe Bolt System), 4 Verriegelungswarzen
- Magazin: 3–5 Schuss (Rotationsmagazin oder Kastenmagazin)
- Lauflänge: 508mm bis 600mm
- Gewicht: ab 3,0 kg (ohne Optik)
- Abzug: Direktabzug mit Handspannung

## Besonderheiten
Das SBS-System (Safe Bolt System) kombiniert Handspannung mit einer Vier-Warzen-Verriegelung direkt im Patronenlager — kürzerer Verschluss, steifere Systemhülse. Die Mannlicher-Variante mit Vollschaft bis zur Mündung ist ein Markenzeichen und schützt den Lauf im Gebirge. Das optional erhältliche Rotationsmagazin — ein Steyr-Patent — fasst die Patronen in einem Stern und gibt sie spielfrei zu.

## Varianten
- SM12: Aktuelles Topmodell mit SBS-Verschluss
- Pro Hunter: Robustes Jagdmodell mit Kunststoffschaft
- Classic: Traditioneller Holzschaft
- Mannlicher: Vollschaft-Ausführung
- Pro THB (Tactical Heavy Barrel): Taktisches Modell

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## Remington 700 — Das meistverkaufte Repetiergewehr der Welt
Die Remington 700 wurde 1962 eingeführt und ist mit über 5 Millionen Exemplaren das meistverkaufte Zylinderverschlussgewehr aller Zeiten. Sie dient als Basis für das M24 SWS und M40 der US-Streitkräfte und ist die am meisten modifizierte Jagd-/Scharfschützenplattform der Welt.

## Technische Daten
- Kaliber: Über 40 Kaliber (.17 Rem bis .458 Win Mag)
- System: Repetierbüchse mit 2-Warzen-Push-Feed-Verschluss
- Magazin: 3–5 Schuss (internes oder abnehmbares Magazin)
- Lauflänge: 508mm bis 660mm
- Gewicht: ab 3,3 kg (je nach Modell)
- Abzug: X-Mark Pro (einstellbar)

## Besonderheiten
Das zylindrische Systemgehäuse (Receiver) ist aus einem Stück Stahl gedreht — extrem steif und präzise. Tausende Aftermarket-Teile verfügbar: Abzüge, Schäfte, Chassis, Läufe. Die Rem 700 ist die Basis der gesamten taktischen Präzisionsgewehr-Industrie. M24 (US Army) und M40 (US Marines) basieren auf der 700er Hülse.

## Varianten
- 700 SPS: Sport-Einstiegsmodell
- 700 CDL: Classic Deluxe mit Holzschaft
- 700 5R: Polygonaler Zug für beste Präzision
- 700 Long Range: Schwerer Lauf, 26"
- 700 PCR (Precision Chassis Rifle): MDT-Chassis

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## Winchester Model 70 — The Rifleman's Rifle
Die Winchester Model 70 wurde 1936 eingeführt und erhielt den Beinamen "The Rifleman's Rifle". Sie gilt — besonders die Pre-64-Modelle — als die eleganteste amerikanische Repetierbüchse. Jack O'Connor, der berühmteste Jagdautor des 20. Jahrhunderts, machte sie zur Legende.

## Technische Daten
- Kaliber: .243 Win bis .375 H&H Magnum
- System: Repetierbüchse mit Controlled Round Feed (CRF, Mauser-Klaue)
- Magazin: 3–5 Schuss (internes Magazin)
- Lauflänge: 559mm bis 610mm
- Gewicht: ab 3,1 kg
- Abzug: MOA Trigger System (einstellbar)

## Besonderheiten
Die Pre-64 Model 70 (1936–1963) verwendeten den Controlled-Round-Feed (CRF) mit Mauser-Klaue — die Patrone wird vom Ausziehen bis zum Zuführen kontrolliert. 1964 wurde auf Push-Feed umgestellt (kostengünstiger), was zu einem Aufschrei führte. Seit 1992 ist CRF zurück. Die Three-Position-Safety (Sicher/Laden/Feuer) stammt direkt vom Mauser 98.

## Varianten
- Featherweight: Leichte Jagdausführung
- Super Grade: Premium mit AAA-Holzschaft
- Alaskan: Edelstahl für raues Klima
- Extreme Weather: Synthetic-Schaft, Cerakote-Finish
- Safari Express: Für gefährliches Grosswild

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## SIG SSG 3000 — Schweizer Scharfschützengewehr
Die SIG SSG 3000 wurde in den 1990er Jahren von SIG Sauer als Scharfschützengewehr für Militär und Polizei entwickelt. Sie basiert auf dem Sauer 200 STR und wird von Spezialeinheiten weltweit eingesetzt — die schweizer Kantonspolizeien verwenden sie als Präzisionsgewehr.

## Technische Daten
- Kaliber: .308 Winchester (7,62×51mm NATO)
- System: Repetierbüchse mit 6-Warzen-Verschluss (60° Öffnungswinkel)
- Magazin: 5 Schuss (abnehmbares Kastenmagazin)
- Lauflänge: 610mm (24")
- Gesamtlänge: 1180mm
- Gewicht: 5,9 kg (ohne Optik)
- Abzug: Match-Abzug, einstellbar 1–1,8 kg

## Besonderheiten
Der 6-Warzen-Verschluss mit nur 60° Öffnungswinkel ermöglicht schnellstes Repetieren aller Scharfschützengewehre. Der kaltgehämmerte Lauf ist ein Schweizer Qualitätsprodukt. Die McMillan-Schafteinlage absorbiert Vibrationen. Garantierte Präzision: 0,5 MOA (1,5cm auf 100m) ab Werk. Der modulare Aufbau erlaubt Kaliberwechsel.

## Varianten
- SSG 3000: Standardmodell
- SSG 3000 Patrol: Polizeiversion mit Klappschaft
- SIG Cross: Moderner Nachfolger mit Klappschaft (2020)
- Sauer S404 Synchro XTC: Jagdliche Verwandte

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## Anschütz 1913 — Olympische Präzision
Die Anschütz 1913 Super Match ist das meistverwendete Kleinkaliber-Wettkampfgewehr der Welt. Bei Olympischen Spielen, Weltmeisterschaften und nationalen Meisterschaften dominieren Anschütz-Gewehre seit Jahrzehnten die Schiessstandergebnisse — über 95% aller olympischen Medaillen im KK-Schiessen gehen an Anschütz-Schützen.

## Technische Daten
- Kaliber: .22 LR (Long Rifle)
- System: Einzellader oder Repetierer, Geradezugverschluss
- Magazin: Einzellader (Match) oder 5-Schuss-Magazin
- Lauflänge: 690mm (Match)
- Gewicht: ca. 4,5 kg (ohne Zubehör, einstellbar bis 6,5 kg)
- Abzug: 5018 Zweistufen-Match-Abzug, ab 30g (!) einstellbar

## Besonderheiten
Der Anschütz-Abzug 5018 ist legendär — einstellbar ab 30 Gramm Abzugsgewicht. Der Verschluss ist ein Geradezugverschluss mit minimalstem Spiel. Das Systemgehäuse ist aus einem Block Aluminium gefräst. Schaft mit unendlich vielen Einstellmöglichkeiten: Schaftkappe, Schaftbacke, Handauflage — alles individuell anpassbar.

## Varianten
- 1913 Super Match: Top-Wettkampfmodell, Einzellader
- 1913 Precise: Stehendanschlag-optimiert
- 1903: Sportmodell für Einsteiger
- 1827 Fortner: Biathlon-Gewehr (Geradezugverschluss für schnellstes Repetieren)

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich. Kleinkaliber-Sportwaffe.`,
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
    inhalt: `## Mauser K98k — Das Gewehr des Zweiten Weltkriegs
Der Karabiner 98 kurz (K98k) wurde 1935 als Standard-Infanteriegewehr der Wehrmacht eingeführt und ist das am weitesten verbreitete Repetiergewehr der Geschichte. Über 14 Millionen Stück wurden gefertigt. Das Mauser-98-System ist die Grundlage fast aller modernen Repetierbüchsen.

## Technische Daten
- Kaliber: 7,92×57mm Mauser (8mm Mauser)
- System: Repetierbüchse mit Mauser-Verschluss (2 Verriegelungswarzen + Sicherheitswarze)
- Magazin: 5 Schuss (internes Kastenmagazin, Ladestreifen)
- Lauflänge: 600mm
- Gesamtlänge: 1110mm
- Gewicht: 3,9 kg
- Abzug: Militärabzug, ca. 2,5 kg

## Besonderheiten
Der Mauser-98-Verschluss mit Controlled Round Feed (CRF) und drei Verriegelungswarzen setzte den Standard für über 100 Jahre Repetierbüchsenbau. Die Drei-Lagen-Sicherung (Sicher/Laden/Feuer) wurde von Winchester, Remington und anderen übernommen. Die Kammerstängel-Konstruktion ist so robust, dass K98k noch heute als Jagdwaffen umgebaut werden.

## Sammlerwert
Standard-K98k: CHF 400–1'500. Seltene Hersteller (Berlin-Lübecker, Steyr "bnz") oder Scharfschützen-Ausführungen (mit ZF41 oder ZF4): CHF 3'000–15'000+.

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## FG 42 — Das Fallschirmjägergewehr
Das Fallschirmjägergewehr 42 (FG 42) wurde 1942 für die deutschen Fallschirmjäger entwickelt und gilt als eines der innovativsten Gewehre des Zweiten Weltkriegs. Es kombinierte die Feuerkraft eines leichten MG mit dem Gewicht eines Gewehrs — ein Konzept, das seiner Zeit 20 Jahre voraus war.

## Technische Daten
- Kaliber: 7,92×57mm Mauser
- System: Gasdrucklader mit Drehkopfverschluss
- Magazin: 20 Schuss (seitlich eingesteckt)
- Feuerarten: Einzelschuss und Dauerfeuer
- Lauflänge: 502mm
- Gesamtlänge: 940mm
- Gewicht: 4,5 kg (Typ II)

## Besonderheiten
Das FG 42 feuerte im Einzelschuss aus geschlossenem Verschluss (für Präzision) und im Dauerfeuer aus offenem Verschluss (gegen Selbstentzündung) — zwei verschiedene Systeme in einer Waffe. Das seitliche Magazin hielt das Profil niedrig. Der Drehkopfverschluss und das Gassystem beeinflussten direkt die Entwicklung des M60-MG und der Stoner-63.

## Sammlerwert
Originale FG 42: CHF 100'000–400'000+ — eine der seltensten und wertvollsten Sammlerwaffen überhaupt (ca. 7'000 produziert).

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich. Halbautomatische Repliken erhältlich.`,
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
    inhalt: `## CZ 452 / CZ 455 / CZ 457 — Kleinkaliber-Referenz
Die CZ-Kleinkaliber-Baureihe (452 seit 1955, 455 seit 2010, 457 seit 2018) ist die meistverkaufte Kleinkaliber-Repetierbüchse in Europa. Gefertigt in Uherský Brod, Tschechien, bieten sie hervorragende Präzision zu einem vernünftigen Preis — der Einstieg ins Sportgewehr-Schiessen.

## Technische Daten
- Kaliber: .22 LR, .22 WMR, .17 HMR
- System: Repetierbüchse mit 2-Warzen-Verschluss
- Magazin: 5 Schuss (abnehmbares Kastenmagazin)
- Lauflänge: 525mm (Standard), 630mm (Varmint)
- Gewicht: 2,8–3,5 kg (je nach Modell)
- Abzug: Einstellbar, ab 0,5 kg (CZ 457)

## Besonderheiten
Der CZ 457 bietet einen einstellbaren Abzug ab 500g, der an Match-Qualität heranreicht. Der kaltgehämmerte Lauf liefert Sub-MOA-Präzision mit guter Munition. Der Kaliberwechsel (.22 LR auf .17 HMR) ist durch Lauf-/Magazintausch möglich. Die 452 und 455 sind auf dem Gebrauchtmarkt sehr beliebt und wertstabil.

## Varianten
- CZ 457 Lux: Holzschaft, Standard
- CZ 457 Varmint: Schwerer Lauf, Nussbaum- oder Laminatschaft
- CZ 457 Training Rifle: Schiessstand-optimiert
- CZ 457 MTR (Match Target Rifle): Wettkampf mit 20"-Match-Lauf
- CZ 457 Jaguar: Ultraleicht

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'frei',
    typischeKaliber: ['.22 LR', '.17 HMR'],
    tags: ['KK', 'CZ', 'Kleinkaliber', 'Training'],
  },

  {
    slug: 'tikka-t1x',
    titel: 'Tikka T1x',
    kategorie: 'Büchse',
    hersteller: 'Tikka',
    baujahr: '2018',
    kurzbeschreibung: 'Finnische .22 LR Büchse im T3x-Design. Gleiches Feeling wie das Hauptgewehr — günstiges Training.',
    inhalt: `## Tikka T1x — Kleinkaliber mit T3x-Ergonomie
Die Tikka T1x MTR (Multi Task Rifle) wurde 2018 als Kleinkaliber-Trainingswaffe vorgestellt, die identische Masse und Ergonomie wie die grosse T3x bietet. Sie erlaubt kostengünstiges Training mit .22 LR bei gleicher Handhabung wie die Jagdbüchse.

## Geschichte
Tikka, eine Marke der finnischen SAKO-Gruppe (Beretta-Konzern), produziert seit den 1960er-Jahren Repetierbüchsen. Die T3-Serie (2003) und ihre Nachfolgerin T3x (2016) gelten als beste Preis-Leistungs-Büchsen am Markt. 2018 erweiterte Tikka die Linie nach unten: die T1x sollte Jägern und Sportschützen erlauben, mit günstigem .22-LR-Material zu trainieren — ohne Umgewöhnung, da Schaft, Abzug und Ergonomie identisch mit der T3x sind.

## Technische Daten
- Kaliber: .22 LR, .17 HMR
- System: Repetierbüchse mit Zylinderverschluss
- Magazin: 10 Schuss (.22 LR)
- Lauflänge: 508mm (20")
- Gesamtlänge: 990mm
- Gewicht: 2,7 kg
- Abzug: Tikka T3x-Abzug, einstellbar ab 1 kg

## Besonderheiten
Der Schaft der T1x ist massstäblich identisch mit dem T3x-Schaft — gleiche Griffform, gleiche Länge, gleicher Abzug. So können Jäger und Sportschützen mit günstigem .22 LR trainieren, ohne Umgewöhnung. Das 10-Schuss-Magazin ist aus Stahl. Die Präzision ist ab Werk hervorragend — typisch 1 MOA mit Match-Munition.

## Varianten
- T1x MTR: Kunststoffschaft (Standard)
- T1x UPR: Chassis-Schaft, verstellbare Schaftkappe
- T1x Hunter: Holzschaft

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## Ruger 10/22 — Die beliebteste Kleinkaliber-Selbstladebüchse
Die Ruger 10/22 wurde 1964 eingeführt und ist mit über 7 Millionen verkauften Exemplaren die meistverkaufte halbautomatische Kleinkaliber-Büchse aller Zeiten. Ein gigantischer Zubehörmarkt macht sie zur "AR-15 der Kleinkaliber" — fast alles ist austauschbar.

## Technische Daten
- Kaliber: .22 LR
- System: Masseverschluss (Blowback)
- Magazin: 10 Schuss (Rotationsmagazin), 25 Schuss optional
- Lauflänge: 470mm (Standard)
- Gesamtlänge: 940mm
- Gewicht: 2,3 kg

## Besonderheiten
Das patentierte Rotationsmagazin fasst 10 Patronen in einem runden Kunststoff-/Metallmagazin und ist extrem zuverlässig. Der Markt für 10/22-Teile ist riesig: Hinterschafte, Vorderschäfte, Läufe, Abzüge, Chassis-Systeme — eine komplette 10/22 kann nur aus Aftermarket-Teilen aufgebaut werden. Die BX-25 Magazine (25 Schuss) sind ebenfalls sehr beliebt.

## Varianten
- 10/22 Carbine: Standard mit Holz- oder Kunststoffschaft
- 10/22 Takedown: Zerlegbar für Transport
- 10/22 Target: Schwerer Lauf, Laminatschaft
- 10/22 Competition: Match-Lauf, einstellbarer Abzug
- Charger: Pistolenversion mit kurzem Lauf

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Accuracy International AWM — Scharfschützengewehr der Spezialeinheiten
Die Accuracy International Arctic Warfare Magnum (AWM) wurde in den 1990er Jahren als Magnum-Version der AW-Serie entwickelt. Sie ist das Scharfschützengewehr zahlreicher Spezialeinheiten weltweit und hält den Rekord für den längsten bestätigten Scharfschützen-Treffer (2'475m, 2009).

## Technische Daten
- Kaliber: .338 Lapua Magnum (auch .300 Win Mag)
- System: Repetierbüchse mit Zylinderverschluss, 6 Verriegelungswarzen
- Magazin: 5 Schuss (abnehmbares Kastenmagazin)
- Lauflänge: 686mm (27")
- Gesamtlänge: 1230mm
- Gewicht: 6,9 kg (ohne Optik)
- Abzug: Einstellbar, ab 1,5 kg

## Besonderheiten
Das AI-Chassis-System (Aluminium-Rahmen mit Polymerverkleidung) war 1982 revolutionär — heute ist es Standard. Der Folding Stock klappt nach links und reduziert die Transportlänge. Das System ist so präzise, dass Sub-0.5-MOA-Gruppen Standard sind. Die .338 Lapua Magnum liefert 6'600 Joule Mündungsenergie und ist auf 1'500m+ effektiv.

## Varianten
- AW (Arctic Warfare): .308 Win Basismodell
- AWM: .338 Lapua Magnum
- AWS: Schalldämpfer-Version
- AX (AXMC): Modulares Chassis, Multi-Kaliber
- AT (2021): Neueste Generation, noch leichter

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## Barrett M82 — Anti-Materiel-Gewehr im Kaliber .50 BMG
Die Barrett M82 (militärisch M107) wurde 1982 von Ronnie Barrett als erstes halbautomatisches .50 BMG Gewehr entwickelt. Sie ist das bekannteste Anti-Materiel-Gewehr der Welt und wird von über 60 Armeen eingesetzt — konzipiert zum Bekämpfen von Fahrzeugen, Radaranlagen und Material.

## Technische Daten
- Kaliber: .50 BMG (12,7×99mm NATO)
- System: Kurzrecoil-Halbautomatik, Drehkopfverschluss
- Magazin: 10 Schuss (abnehmbares Kastenmagazin)
- Lauflänge: 737mm (29")
- Gesamtlänge: 1448mm
- Gewicht: 14 kg (!!)
- Mündungsenergie: ca. 18'000 Joule

## Besonderheiten
Die doppelte Rückstossfeder und die massive Mündungsbremse reduzieren den Rückstoss auf ein erträgliches Mass — trotz 18'000 Joule. Effektive Reichweite über 1'800m. Der Fluted-Lauf spart Gewicht. Als Halbautomatik ermöglicht sie schnelle Folgeschüsse. Die Barrett wurde im Golfkrieg 1991 berühmt und wird seither als EOD-Werkzeug (Sprengmittelvernichtung aus Distanz) geschätzt.

## Varianten
- M82A1: Standard-Halbautomatik
- M82A2: Bullpup-Version (eingestellt)
- M107A1: Leichtere Version mit QD-Schalldämpfer
- M95: Repetierbüchse (Bullpup)
- M99: Einzelschuss-Kipplauf

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich. Kein Verbotskategorie-Waffenrecht in der Schweiz für .50 BMG.`,
    rechtsstatus: 'wes',
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
    inhalt: `## AK-47 / AKM — Das meistproduzierte Gewehr der Geschichte
Die AK-47 wurde 1947 von Michail Kalaschnikow in der Sowjetunion entwickelt und ist mit geschätzten 100+ Millionen Exemplaren die meistproduzierte Waffe der Geschichte. Das AKM (1959) ist die vereinfachte, leichtere Massenproduktionsversion mit Blechprägeteilen statt Frästeilen.

## Technische Daten
- Kaliber: 7,62×39mm (AK-47/AKM), 5,45×39mm (AK-74)
- System: Gasdrucklader mit Drehkopfverschluss (Langhubtreiber)
- Magazin: 30 Schuss (gebogenes Kastenmagazin)
- Lauflänge: 415mm
- Gesamtlänge: 870mm (fester Schaft)
- Gewicht: 3,5 kg (AKM, leer)
- Feuerarten: Einzelschuss, Dauerfeuer (militärisch)

## Besonderheiten
Die AK ist für extreme Zuverlässigkeit konstruiert — sie funktioniert unter Sand, Schlamm, Frost und Vernachlässigung. Grosse Toleranzen zwischen den beweglichen Teilen verhindern Blockaden. Der Langhubtreiber (Gaskolben fest mit Verschlussträger verbunden) ist robuster als Kurzhubtreiber-Systeme. In der Schweiz sind nur halbautomatische Zivilversionen legal.

## Varianten
- AK-47 Typ I–III: Originalvarianten (1949–1959)
- AKM: Vereinfachte Produktion ab 1959
- AK-74: Kaliber 5,45×39mm ab 1974
- AK-103/104: Modernisierte Versionen
- Zivilversionen: Saiga, WBP Jack, Zastava ZPAP M70

## Rechtsstatus Schweiz
Halbautomatische Zivilversionen: WES erforderlich. Vollautomat: Verboten (Ausnahmebewilligung nötig).`,
    rechtsstatus: 'wes',
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
    inhalt: `## AR-15 / M16 — Die modulare Waffenplattform
Das AR-15 wurde 1956 von Eugene Stoner bei ArmaLite entwickelt und als M16 ab 1964 zum Standard-Sturmgewehr der US-Streitkräfte. Es ist das meistverkaufte Gewehr in den USA mit geschätzten 20+ Millionen zivilen Exemplaren. Die AR-15-Plattform ist das modularste Waffensystem der Welt.

## Technische Daten
- Kaliber: 5,56×45mm NATO / .223 Rem (auch .300 BLK, 6,5 Grendel, .308 Win bei AR-10)
- System: Gasdrucklader mit Drehkopfverschluss (Direct Impingement oder Gaskolben)
- Magazin: 30 Schuss (STANAG-kompatibel)
- Lauflänge: 254mm (10") bis 508mm (20")
- Gesamtlänge: variabel (Klappschaft)
- Gewicht: ab 2,8 kg (leichte Konfigurationen)

## Besonderheiten
Das Direct-Impingement-System leitet Pulvergas direkt in den Verschlussträger — leichter und präziser als Gaskolben, aber verschmutzungsanfälliger. Das obere und untere Gehäuse (Upper/Lower Receiver) werden mit zwei Pins verbunden und können in Sekunden getauscht werden — Kaliberwechsel durch Tausch des Upper. Unendliches Zubehör: Handschutz, Griffe, Schafte, Mündungsgeräte, Optiken.

## Varianten
- M16A4: US-Militär Standardgewehr (20" Lauf)
- M4/M4A1: Verkürzte Karabiner-Version (14,5" Lauf)
- AR-10: Grössere Version in .308 Win
- Zivilversionen: Hunderte Hersteller (Daniel Defense, BCM, Aero Precision, etc.)

## Rechtsstatus Schweiz
Halbautomatische Versionen: WES erforderlich. Grosses Magazin (>10 oder >20 Schuss je nach Kanton): evtl. ABK-pflichtig.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Heckler & Koch HK416 — Das bessere M16
Die HK416 wurde 2004 von Heckler & Koch als verbesserte AR-15-Plattform mit Gaskolben-System entwickelt. Sie wurde berühmt als die Waffe, mit der Osama bin Laden 2011 getötet wurde (DEVGRU/SEAL Team Six). Seit 2016 ist sie als M27 IAR auch das Standard-Infanteriegewehr der US Marines.

## Technische Daten
- Kaliber: 5,56×45mm NATO
- System: Gasdrucklader mit Kurzhubtreiber (HK-Gaskolben) und Drehkopfverschluss
- Magazin: 30 Schuss (STANAG-kompatibel)
- Lauflänge: 264mm (10,4"), 368mm (14,5"), 419mm (16,5"), 508mm (20")
- Gewicht: 3,5 kg (14,5" Lauf, leer)
- Feuerarten: Halbautomatik (zivil), Einzelschuss/Dauerfeuer (militärisch)

## Besonderheiten
Der HK-Kurzhubtreiber (abgeleitet vom G36) ersetzt das verschmutzungsanfällige Direct-Impingement-System des M16 — das Gas wird nicht mehr in den Verschlussträger geleitet. Dadurch läuft die HK416 sauberer und zuverlässiger. Die kaltgehämmerte Chrombeschichtung des Laufs hält 20'000+ Schuss. Volle Kompatibilität mit AR-15-Unterteilen, Magazinen und Zubehör.

## Varianten
- HK416A5: Aktuelle Militärversion (deutsches KSK, norwegische Armee)
- MR223/MR556: Zivile halbautomatische Version
- HK416C: Ultrakompakt (228mm Lauf)
- M27 IAR: US Marines Infanterie-Automatikgewehr

## Rechtsstatus Schweiz
Halbautomatische Version (MR223): WES erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Heckler & Koch G3 — Das Rollenverschluss-Gewehr
Das G3 wurde 1959 als Standard-Sturmgewehr der Bundeswehr eingeführt und diente über 40 Jahre in über 80 Armeen weltweit. Das rollenverzögerte Rückstoss-System stammt ursprünglich vom spanischen CETME und basiert auf dem deutschen StG 45(M) aus dem Zweiten Weltkrieg.

## Technische Daten
- Kaliber: 7,62×51mm NATO
- System: Rollenverzögerter Rückstosslader
- Magazin: 20 Schuss (Aluminiummagazin)
- Lauflänge: 450mm
- Gesamtlänge: 1023mm
- Gewicht: 4,4 kg (leer)
- Feuerarten: Einzelschuss, Dauerfeuer (militärisch)

## Besonderheiten
Der Rollenverschluss verzögert das Öffnen durch zwei Rollen, die in Ausnehmungen im Patronenlager greifen. Dieses System braucht keinen Gaskanal und ist extrem einfach und robust. Die Hülsen werden jedoch stark deformiert (Rillen vom geriffelten Patronenlager). Das G3 war eines der ersten Gewehre mit Kunststoff-Handschutz und Polymergriff.

## Varianten
- G3A3: Standardmodell mit festem Schaft
- G3A4: Teleskopschaft
- G3SG/1: Scharfschützenversion mit Match-Abzug
- MSG90: Verbesserte Scharfschützenversion
- HK91/PTR-91: Halbautomatische Zivilversionen

## Rechtsstatus Schweiz
Halbautomatische Version (HK91/PTR-91): WES erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Steyr AUG — Das erste erfolgreiche Bullpup-Sturmgewehr
Das Steyr AUG (Armee Universal Gewehr) wurde 1977 als StG 77 beim österreichischen Bundesheer eingeführt und war das erste erfolgreiche Bullpup-Sturmgewehr der Welt. Das integrierte Zielfernrohr und der modulare Aufbau waren revolutionär.

## Technische Daten
- Kaliber: 5,56×45mm NATO
- System: Gasdrucklader mit Drehkopfverschluss, Kurzhubtreiber
- Magazin: 30 Schuss (transparentes Kunststoffmagazin)
- Lauflänge: 508mm (Standard), auch 407mm und 621mm
- Gesamtlänge: 790mm (mit 508mm Lauf)
- Gewicht: 3,6 kg (leer)

## Besonderheiten
Das Bullpup-Design platziert das Magazin hinter dem Abzug — dadurch ist das AUG bei gleicher Lauflänge 200mm kürzer als konventionelle Gewehre. Das serienmässige 1,5x Zielfernrohr mit Strichkreis war 1977 einzigartig. Die Konstruktion aus Kunststoff und Aluminium war visionär. Schneller Laufwechsel in unter einer Minute — vom Karabiner bis zum leichten MG.

## Varianten
- AUG A1: Original mit integrierter Optik
- AUG A3: Picatinny-Schiene statt integrierter Optik
- AUG HBAR: Schwerer Lauf als leichtes MG
- AUG Para: 9mm Maschinenpistolen-Version

## Rechtsstatus Schweiz
Halbautomatische Version: WES erforderlich.`,
    rechtsstatus: 'wes',
    typischeKaliber: ['5,56×45mm NATO'],
    tags: ['Sturmgewehr', 'Steyr', 'AUG', 'Bullpup', 'Österreich'],
  },

  {
    slug: 'fn-fal',
    titel: 'FN FAL',
    kategorie: 'Büchse',
    hersteller: 'FN Herstal',
    baujahr: '1953',
    kurzbeschreibung: '"The Right Arm of the Free World". Von über 90 Ländern eingesetzt. Kaliber 7,62 NATO.',
    inhalt: `## FN FAL — Das rechte Arm der freien Welt
Die FN FAL (Fusil Automatique Léger) wurde 1953 von FN Herstal in Belgien vorgestellt und diente in über 90 Armeen. Im Kalten Krieg war sie das Standard-Gewehr der westlichen Welt — daher der Beiname "The Right Arm of the Free World". Über 7 Millionen Stück wurden produziert.

## Technische Daten
- Kaliber: 7,62×51mm NATO
- System: Gasdrucklader mit Kippblockverschluss
- Magazin: 20 Schuss
- Lauflänge: 533mm (Standard)
- Gesamtlänge: 1090mm
- Gewicht: 4,3 kg (leer, Standardmodell)

## Besonderheiten
Die FAL hat einen einstellbaren Gasregler — die Gasmenge kann an verschiedene Munitionstypen und Umweltbedingungen angepasst werden. Das Gewehr kann mit dem Gasregler auf "0" gestellt als Repetierer genutzt werden. Die FAL diente als Grundlage für das britische L1A1 SLR (nur Halbautomatik). In der Schweiz bekannt als "Fass" — die belgische Dienstwaffe.

## Varianten
- FAL 50.00: Standard-Infanteriemodell
- FAL 50.63 (Para): Klappschaft, kurzer Lauf
- FAL FALO (50.41): Schwerer Lauf, Zweibein (LMG-Rolle)
- L1A1 SLR: Britische Variante (metrisch vs. inch)
- DSA SA58: Moderne US-Zivilversion

## Rechtsstatus Schweiz
Halbautomatische Versionen: WES erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## HK MP5 — Die Referenz unter den Maschinenpistolen
Die HK MP5 wurde 1966 von Heckler & Koch vorgestellt und ist die meistverbreitete Maschinenpistole der Welt — eingesetzt von Militär, Polizei und Spezialeinheiten in über 80 Ländern. Das rollenverzögerte Verschlusssystem (vom G3) macht sie ungewöhnlich präzise für eine MP.

## Technische Daten
- Kaliber: 9×19mm (auch .40 S&W und 10mm Auto)
- System: Rollenverzögerter Rückstosslader (vom G3 abgeleitet)
- Magazin: 15 oder 30 Schuss
- Lauflänge: 225mm
- Gesamtlänge: 660mm (fester Schaft), 490mm (eingeklappt)
- Gewicht: 2,5 kg (leer, MP5A2)
- Feuerarten: Halbautomatik (zivil)

## Besonderheiten
Der geschlossene Verschluss bei Schussabgabe (statt offenem Verschluss wie bei den meisten MPs) gibt der MP5 eine für Maschinenpistolen einzigartige Präzision. Die GSG-9 setzte sie 1977 bei der Befreiung der Landshut (Mogadischu) ein — seitdem Standardwaffe für Anti-Terror-Einheiten. Die zivile Version ist halbautomatisch mit langem Lauf.

## Varianten
- MP5A2/A3: Standard mit Fest-/Klappschaft
- MP5SD: Integrierter Schalldämpfer
- MP5K: Ultrakompakt (Aktentaschen-Grösse)
- SP5: Zivile halbautomatische Version von HK
- MKE T94: Lizenzproduktion aus der Türkei

## Rechtsstatus Schweiz
Halbautomatische Zivilversion (SP5): WES erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Winchester Model 1894 — Der meistverkaufte Unterhebelrepetierer
Die Winchester 1894 wurde von John Browning konstruiert und ist mit über 7,5 Millionen Exemplaren der meistproduzierte Unterhebelrepetierer aller Zeiten. Sie war das erste Repetiergewehr für rauchlose Patronen und ist untrennbar mit der amerikanischen Jagdtradition verbunden.

## Technische Daten
- Kaliber: .30-30 Winchester (Original), auch .44 Magnum, .45 Colt, .357 Magnum
- System: Unterhebelrepetierer (Lever Action)
- Magazin: 6–8 Schuss (Röhrenmagazin)
- Lauflänge: 508mm (20", Carbine)
- Gesamtlänge: 953mm
- Gewicht: 3,1 kg (Carbine)

## Besonderheiten
Die 1894 führte die .30-30 Winchester ein — die erfolgreichste Jagdpatrone Nordamerikas, die mehr Hirsche erlegt hat als jedes andere Kaliber. Das Röhrenmagazin unter dem Lauf erfordert Rundkopfgeschosse (bei Spitzgeschossen droht Kettenreaktion im Magazin). Der Unterhebel-Mechanismus ermöglicht extrem schnelles Repetieren.

## Varianten
- Carbine: 20" Lauf, Standardmodell
- Rifle: 24" oder 26" Lauf, Oktagonlauf optional
- Trails End: Cowboy Action Shooting Version
- Sporter: Moderne Version mit Kreuzschraube
- Short Rifle: Kompakte Version mit 20" Lauf

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## Winchester Model 1873 — The Gun that Won the West
Die Winchester 1873 gilt als "The Gun that Won the West" und ist die ikonischste Waffe des Wilden Westens. Sie wurde in den gleichen Revolver-Kalibern gefertigt wie der Colt SAA — Jäger und Cowboys brauchten nur eine Munitionssorte für Gewehr und Revolver.

## Technische Daten
- Kaliber: .44-40 WCF (Original), auch .38-40, .32-20
- System: Unterhebelrepetierer (Lever Action), Toggle-Link
- Magazin: 15 Schuss (Röhrenmagazin, Rifle)
- Lauflänge: 508mm (20", Carbine), 610mm (24", Rifle)
- Gesamtlänge: 991mm (Rifle)
- Gewicht: 3,6 kg

## Besonderheiten
Die 1873 verwendete das gleiche Kaliber wie der Colt SAA (.44-40 WCF) — ein enormer logistischer Vorteil im Westen. Der Toggle-Link-Verschluss (ähnlich der Luger-Pistole) war weniger robust als spätere Systeme, aber für Pistolenpatronen ausreichend. Über 720'000 Stück wurden bis 1919 produziert.

## Varianten
- Carbine: 20" Lauf, Sattelring
- Rifle: 24" Oktagon- oder Rundlauf
- Musket: Militärversion mit 30" Lauf
- "One of One Thousand": Werkseitig selektierte Präzisionsexemplare (136 Stück)
- Miroku-Nachbau: Aktuelle Produktion in Japan

## Sammlerwert
Originale: CHF 2'000–30'000+ je nach Zustand und Jahrgang.

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## Henry Big Boy — Amerikanischer Unterhebelrepetierer
Die Henry Big Boy ist ein moderner Unterhebelrepetierer im klassischen Stil, gefertigt von Henry Repeating Arms in Wisconsin (USA). Sie ist bekannt für ihre Messinggehäuse-Optik und die butterweiche Hebelwirkung — oft als der geschmeidigste Lever-Action am Markt bezeichnet.

## Technische Daten
- Kaliber: .44 Magnum/.44 Spl, .357 Mag/.38 Spl, .45 Colt, .30-30 Win
- System: Unterhebelrepetierer (Lever Action)
- Magazin: 7–10 Schuss (Röhrenmagazin)
- Lauflänge: 508mm (20")
- Gesamtlänge: 965mm
- Gewicht: 3,9 kg (Stahl), 3,1 kg (All Weather)

## Besonderheiten
Das polierte Messinggehäuse ist das Markenzeichen der Big Boy-Serie und erinnert an die Original-Henry-Büchse von 1860. Die Hebelwirkung ist ungewöhnlich sanft und kurzhubig. Laden erfolgt von vorne durch den Röhrenmagazin-Verschluss — keine seitliche Ladeklappe. Präzision ab Werk ist überraschend gut.

## Varianten
- Big Boy Classic: Messing-Gehäuse, Walnuss-Schaft
- Big Boy Steel: Stahlgehäuse, matter Finish
- Big Boy X: Taktische Version mit Picatinny-Schiene
- Big Boy All Weather: Hartholz, rostbeständig

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## Marlin 336 — Der Hirschjäger-Klassiker
Die Marlin 336 wurde 1948 eingeführt und ist neben der Winchester 1894 der beliebteste Unterhebelrepetierer für die Jagd in Nordamerika. Mit über 6 Millionen verkauften Exemplaren hat sie sich als robuste, präzise Waldwaffe bewährt.

## Geschichte
Marlin, gegründet 1870, produzierte seit dem Model 1893 Unterhebelrepetierer. Das Model 336 von 1948 führte den runden Verschlusskopf und den seitlichen Hülsenauswurf ein — beides technische Verbesserungen gegenüber dem Vorgänger Model 36. Über Jahrzehnte war die 336 in .30-30 **die** amerikanische Hirschbüchse. Nach Marlins Konkurs 2007 und der Übernahme durch Remington (Freedom Group) sank die Qualität merklich. 2020 erwarb Ruger die Marke und startete 2021 eine neue Produktion mit deutlich verbesserter Qualität.

## Technische Daten
- Kaliber: .30-30 Winchester (auch .35 Remington)
- System: Unterhebelrepetierer (Lever Action)
- Magazin: 6 Schuss (Röhrenmagazin)
- Lauflänge: 508mm (20")
- Gesamtlänge: 965mm
- Gewicht: 3,4 kg

## Besonderheiten
Die Marlin 336 hat gegenüber der Winchester 1894 einen entscheidenden Vorteil: der seitliche Hülsenauswurf statt nach oben. Dadurch können problemlos Zielfernrohre montiert werden — bei der Winchester stören oben ausgeworfene Hülsen. Der solide Verschlusskopf und die robuste Mechanik machen die 336 extrem zuverlässig.

## Varianten
- 336C: Classic mit Walnuss-Schaft
- 336W: Hardwood (günstigere Version)
- 336 Dark Series: Matt-schwarzes Finish
- 1895: Grössere Version in .45-70 Government
- 1894: Kleinere Version in Revolver-Kalibern

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## Browning Citori — Die meistverkaufte Bockflinte der Welt
Die Browning Citori wurde 1973 in Japan (Miroku) nach dem Browning Superposed-Design eingeführt und ist die meistverkaufte Bockflinte der Welt. Sie kombiniert John Brownings geniales Bockflinten-Design mit japanischer Präzisionsfertigung.

## Technische Daten
- Kaliber: 12/76 (auch 20/76, 28/70, .410)
- System: Kipplauf-Bockflinte mit Unterverschluss
- Läufe: 2 übereinander (O/U), 660mm bis 813mm
- Chokes: Invector-Plus Wechselchokes (Standard)
- Gewicht: 3,4–3,9 kg (je nach Modell)

## Besonderheiten
Das Browning-Superposed-System mit niedrigem Profil reduziert den gefühlten Rückstoss. Die Miroku-Fertigung in Japan gilt als eine der besten der Welt — jede Citori wird einzeln eingepasst. Der mechanische Abzug (nicht rückstossgesteuert) schiesst zuverlässig auch den zweiten Schuss bei Zündversager. Über 3 Millionen Stück wurden seit 1973 verkauft.

## Varianten
- Citori 725: Aktuelles Standardmodell, schlankes Gehäuse
- Citori CX: Sportflinte für Tontauben
- Citori White Lightning: Silbernes Gehäuse, Gravur
- Citori Gran Lightning: Premium mit AAA-Walnussholz

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## Krieghoff K-80 — Deutsche Wettbewerbsflinte
Die Krieghoff K-80 wird seit 1980 in Ulm (Deutschland) gefertigt und ist die weltweit dominierende Bockflinte im Wettkampfschiessen. Bei Olympischen Spielen, Weltmeisterschaften und Grand-Prix-Veranstaltungen schiessen mehr Medaillengewinner mit Krieghoff als mit jeder anderen Marke.

## Technische Daten
- Kaliber: 12/70 oder 12/76 (auch 20/76, 28/70, .410)
- System: Kipplauf-Bockflinte mit Kersten-Verschluss
- Läufe: 710mm bis 865mm
- Chokes: Wechselchokes oder feste Chokes
- Gewicht: 3,5–4,2 kg (je nach Konfiguration)

## Besonderheiten
Der Kersten-Verschluss mit Doppelgreifer verriegelt die Läufe oben und unten — extrem stabil und langlebig. Das austauschbare Abzugsblatt ermöglicht individuelle Anpassung (Position, Krümmung, Gewicht). Die K-80 ist modular: Schaftbacke, Schaftkappe und Laufgruppe sind austauschbar. Krieghoff-Service ist legendär — Reparaturen oft innerhalb 24 Stunden.

## Varianten
- K-80 Trap: Für Trap-Schiessen, fester Schaft
- K-80 Skeet: Für Skeet
- K-80 Sporting: Für Sporting Clays / Parcours
- K-80 Pro Sporter: Premium-Sportflinte
- K-80 Gold: Handgraviertes Luxusmodell

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## Perazzi — Italienische Handwerkskunst für Olympiasieger
Perazzi wurde 1957 von Daniele Perazzi in Brescia (Italien) gegründet und fertigt ausschliesslich Wettkampf- und Premium-Jagdflinten. Jede Perazzi wird in Handarbeit gefertigt — Wartezeit für Neubestellungen: 6–18 Monate. Bei Olympischen Spielen eine der meistvertretenen Marken.

## Technische Daten
- Kaliber: 12/70 oder 12/76 (auch 20, 28, .410)
- System: Kipplauf-Bockflinte mit abnehmbarem Abzugsmechanismus
- Läufe: 680mm bis 815mm (nach Mass)
- Chokes: Wechselchokes oder feste
- Gewicht: 3,3–4,0 kg

## Besonderheiten
Der abnehmbare Abzugsmechanismus ("Trigger Group") kann in Sekunden ausgetauscht werden — ein Backup am Schiessstand einsetzen, während der andere repariert wird. Jeder Schaft wird individuell angepasst: Abzugslänge, Senkung, Schränkung nach Kundenvermessung. Die Laufbohrung wird von Hand kontrolliert. Gravuren von hauseigenen Meistergraveueren erhältlich.

## Varianten
- MX8: Standard-Wettkampfmodell
- MX2000: Top-Sporting-Modell
- High Tech: Höhenverstellbare Schaftbacke, modularer Vorderschaft
- SCO: Seitenschloss mit Handgravur (ab CHF 30'000+)

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## Beretta A400 — Modernste Selbstladeflinte aus Italien
Die Beretta A400 wurde 2010 als Flaggschiff der Beretta-Selbstladeflinten eingeführt. Sie verwendet das patentierte Blink-System für ultraschnelle Schussfolge und gilt als die zuverlässigste Selbstladeflinte am Markt — bei Jagd und Wettkampf gleichermassen.

## Geschichte
Beretta, der älteste aktive Waffenhersteller der Welt (gegr. 1526), hat eine lange Tradition im Flintenbau. Die A-Serie begann mit der A300 (2002), gefolgt von der A400 (2010). Das patentierte Blink-Gassystem war eine Eigenentwicklung, die den Gasweg optimierte und die Nachladezeit um über ein Drittel verkürzte. Die A400 wurde sofort zum Verkaufsschlager und gewann zahlreiche Wettkampftitel im Trap- und Skeetschiessen.

## Technische Daten
- Kaliber: 12/76 oder 12/89 (3,5"), auch 20/76
- System: Gasdrucklader mit Blink-Gassystem
- Magazin: 3+1 (Jagd), erweiterbar auf 7+1
- Lauflänge: 610mm bis 762mm
- Gewicht: ab 3,0 kg (20 Gauge Lite)

## Besonderheiten
Das Blink-Gassystem ist selbstreinigend und schiesst bis zu 36% schneller als konventionelle Gasdrucksysteme. Der Kick-Off-Rückstossdämpfer im Schaft reduziert den gefühlten Rückstoss um bis zu 40%. Die GunPod-Elektronik (optional) zählt Schüsse und zeichnet Trainingsdaten auf. Läuft mit allem von 24g Trap-Patronen bis 63g Magnum-Slug.

## Varianten
- A400 Xtreme Plus: 3,5"-Magnum für Wasserjagd
- A400 Xcel: Wettkampf-Sporting
- A400 Upland: Leichte Jagdflinte
- A400 Lite: Ultraleicht, Alu-Gehäuse
- A400 Action: Taktische Version

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
    typischeKaliber: ['12/70', '12/76 Magnum'],
    tags: ['Flinte', 'Beretta', 'A400', 'Halbautomatisch', 'Jagd'],
  },

  {
    slug: 'benelli-m2',
    titel: 'Benelli M2',
    kategorie: 'Flinte',
    hersteller: 'Benelli',
    baujahr: '2004',
    kurzbeschreibung: 'Halbautomatische Jagdflinte mit einzigartigem Inertie-System. Einfach, zuverlässig.',
    inhalt: `## Benelli M2 — Inertia-Rückstosslader der Spitzenklasse
Die Benelli M2 wurde 2004 als Weiterentwicklung der M1 vorgestellt und ist die beliebteste Selbstladeflinte für die Jagd in Europa. Das patentierte Inertia-System macht sie leichter und sauberer als gasdruckbetriebene Konkurrenten.

## Geschichte
Das Inertia-Driven-System wurde 1967 vom italienischen Ingenieur Bruno Civolani erfunden und von Benelli seit 1969 eingesetzt. Die M1 Super 90 (1992) machte das System populär — die M2 (2004) verfeinerte es mit dem neuen ComforTech-Schaft und einer verbesserten Abzugsgruppe. Im Gegensatz zu Gasladern wie der Beretta A400 hat das Inertia-System keine Gasbohrung im Lauf, was Reinigung und Wartung vereinfacht. Benelli gehört seit 2000 zur Beretta-Gruppe.

## Technische Daten
- Kaliber: 12/76 (auch 20/76)
- System: Rückstosslader mit Inertia-Driven-System (Masseträgheit)
- Magazin: 3+1 (Standard), erweiterbar
- Lauflänge: 610mm bis 762mm
- Gewicht: ab 2,9 kg (20 Gauge)

## Besonderheiten
Das Inertia-Driven-System nutzt die Masseträgheit eines gefederten Verschlusskopfes — ohne Gaskanal und Gaskolben. Dadurch ist die M2 leichter, sauberer und wartungsärmer als Gaslader. Der ComforTech-Schaft absorbiert bis zu 48% des Rückstosses. Extrem zuverlässig bei Kälte und Nässe — kein Gas, das bei Kälte kondensiert.

## Varianten
- M2 Field: Jagd-Standard
- M2 Comfortech: Mit Rückstossdämpfer-Schaft
- M2 Tactical: Kurzer Lauf, Ghost-Ring-Visier
- M2 Speed: Performance für Parcours
- M2 SP: Sporting-Version mit langem Lauf

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Benelli SuperNova — Unzerstörbare Pumpflinte
Die Benelli SuperNova ist die Premium-Pumpflinte des italienischen Herstellers und bekannt für ihren einteiligen Polymerschaft, der mit dem Stahlgehäuse verschmolzen ist. Diese Konstruktion macht sie praktisch unzerstörbar und ideal für härteste Bedingungen.

## Geschichte
Benelli stieg 1999 mit der Nova in den Pumpflinten-Markt ein — ungewöhnlich für einen Hersteller, der vor allem für seine Selbstladeflinten bekannt war. Die Nova zeichnete sich durch ein revolutionäres Monoblock-Design aus: der Polymerschaft wird direkt um das Stahlgehäuse gespritzt und bildet eine untrennbare Einheit. 2006 folgte die SuperNova mit ComforTech-Rückstossdämpfung und der Möglichkeit, 3,5"-Magnum-Patronen zu verschiessen — eine Seltenheit bei Pumpflinten.

## Technische Daten
- Kaliber: 12/76 oder 12/89 (3,5" Magnum!)
- System: Pumpflinte mit Rotationsverschluss
- Magazin: 4+1 (Standard)
- Lauflänge: 610mm bis 762mm
- Gewicht: 3,6 kg

## Besonderheiten
Der einteilige Polymerschaft umschliesst das Stahlgehäuse komplett — kein separates Gehäuse wie bei anderen Pumpflinten. Die SuperNova kann 3,5"-Magnum-Patronen verschiessen — mehr als die meisten Halbautomaten. Der ComforTech-Schaft mit Gelzellen reduziert den Rückstoss um bis zu 35%. Die Dual-Action-Bars verhindern Verklemmen.

## Varianten
- SuperNova: Jagd-Standard
- SuperNova Tactical: Kurzer Lauf, Ghost-Ring-Visier
- SuperNova Steady Grip: Pistolengriff für Truthahnjagd
- Nova: Günstigere Basisversion

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## Mossberg 500 — Amerikas meistverkaufte Pumpflinte
Die Mossberg 500 wurde 1961 eingeführt und ist mit über 12 Millionen Exemplaren die meistproduzierte Pumpflinte der Welt. Sie ist die einzige Pumpflinte, die die US-Mil-Spec-3443-Testanforderungen bestanden hat, und dient als M590 beim US-Militär.

## Technische Daten
- Kaliber: 12/76 (auch 20/76, .410)
- System: Pumpflinte mit Dual-Action-Bars
- Magazin: 5+1 (Standard), bis 8+1 (M590)
- Lauflänge: 457mm (18,5", Tactical) bis 762mm (30", Trap)
- Gewicht: 3,2 kg (Standard)

## Besonderheiten
Die Sicherung liegt oben auf dem Gehäuse (tang safety) — beidseits bedienbar und intuitiv. Die Dual-Action-Bars verhindern Verklemmen unter Stress. Laufwechsel in 30 Sekunden ohne Werkzeug — ein Jagd-, Trap- und Verteidigungslauf für dieselbe Waffe. Extrem günstiger Preis bei bewährter Zuverlässigkeit.

## Varianten
- 500 Field: Jagd mit Holz- oder Kunststoffschaft
- 500 Tactical: Kurzer Lauf, Pistolengriff
- 590: Militärversion mit schwererem Lauf und Bajonetthalter
- 590A1: Mil-Spec mit Aluminium-Abzugsbügel und Stahlsicherung
- Shockwave: Pistolengriff ohne Schaft (Nicht-Gewehr-Kategorie in USA)

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## Browning A5 — Die erste erfolgreiche Selbstladeflinte
Die Browning Auto-5 (A-5) wurde 1898 von John Browning entworfen und war die erste kommerziell erfolgreiche Selbstladeflinte der Welt. Sie wurde über 100 Jahre produziert (1902–1998, Neuauflage 2012) — ein Rekord in der Waffengeschichte.

## Technische Daten
- Kaliber: 12/76 (moderne A5), historisch auch 16/70, 20/70
- System: Originalmodell: Langhub-Rückstosslader; Neue A5 (2012): Kinematic Drive Inertia
- Magazin: 4+1 (Standard)
- Lauflänge: 660mm bis 762mm
- Gewicht: 3,2 kg (neue A5, 12 Gauge)

## Besonderheiten
Die originale A-5 (1902–1998) hatte einen charakteristischen "Buckel" am Gehäuse (Square Back Receiver). Über 3 Millionen Stück wurden in Belgien (FN) und Japan (Miroku) gefertigt. Die neue A5 (seit 2012) verwendet das Kinematic-Drive-System (Inertia-Prinzip) statt des historischen Rückstossladers und ist deutlich leichter.

## Varianten
- Auto-5 (1902–1998): Historisches Original, Langhub-Rückstoss
- A5 (2012–heute): Moderne Neuauflage, Kinematic Drive
- A5 Hunter: Jagd-Standardmodell
- A5 Stalker: Matt-schwarzes Finish
- A5 Sweet Sixteen: In 16 Gauge (Neuauflage)

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
    rechtsstatus: 'wes',
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
    inhalt: `## Bockbüchsflinte — Zwei Kaliber in einer Waffe
Die Bockbüchsflinte (BBF) ist eine typisch europäische Kombinationswaffe mit einem glatten Flintenlauf (Schrot) und einem gezogenen Büchsenlauf (Kugel) übereinander. Sie ist besonders bei der Niederwildjagd in Mitteleuropa beliebt, wo Jäger sowohl auf Flugwild als auch auf Raubwild treffen.

## Technische Daten
- Kaliber: Flintenlauf 12/76 oder 20/76, Büchsenlauf in diversen Kalibern (.222 Rem, 7×57R, 7×65R, .30-06, etc.)
- System: Kipplauf-Kombinationswaffe
- Schuss: 1 Flinte + 1 Büchse (2 Läufe)
- Lauflänge: 580mm bis 650mm
- Gewicht: 3,0–3,5 kg

## Besonderheiten
Die BBF erlaubt dem Jäger, ohne Waffenwechsel sowohl Schrot (für flüchtiges Niederwild) als auch Kugel (für Raubwild oder Rehwild) zu verwenden. Der Büchsenlauf liegt meist unten, der Flintenlauf oben. Ein Umschalter am Abzug wählt den aktiven Lauf. Deutsche und österreichische Hersteller (Blaser, Merkel, Krieghoff) dominieren dieses Segment.

## Varianten
- BBF Standard: Zwei Läufe (Flinte + Büchse)
- Drilling: Drei Läufe (2x Flinte + 1x Büchse)
- Vierling: Vier Läufe (2x Flinte + 2x Büchse)
- Bergstutzen: Zwei Büchsenläufe übereinander (ohne Flintenlauf)

## Rechtsstatus Schweiz
Waffenerwerbsschein (WES) erforderlich.`,
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
    inhalt: `## Walther LG400 — Olympisches Luftgewehr
Die Walther LG400 ist eines der meistverwendeten Wettkampf-Luftgewehre der Welt und wird von zahlreichen olympischen Medaillengewinnern geschossen. Sie wird in Ulm (Deutschland) gefertigt und steht für höchste Präzision im 10m-Luftgewehr-Schiessen.

## Technische Daten
- Kaliber: 4,5mm (.177) Diabolo
- System: Pressluft (Vorkomprimierung), 200 bar Druckluft-Kartusche
- Magazin: Einzellader
- Lauflänge: 420mm
- Gesamtlänge: ca. 1050mm (einstellbar)
- Gewicht: 3,8 kg (einstellbar mit Zusatzgewichten)
- Mündungsgeschwindigkeit: ca. 170 m/s
- Präzision: Streukreis <5mm auf 10m

## Besonderheiten
Mechanischer Abzug mit Einstellmöglichkeit ab 50g Abzugsgewicht. Der Schaft ist in Länge, Höhe der Schaftbacke und Schaftkappe komplett einstellbar. Ein Absorber-System reduziert die Vibration beim Schuss auf ein Minimum. Die 200-bar-Kartusche liefert konstanten Druck für über 400 Schuss.

## Varianten
- LG400 Anatomic: Standard-Wettkampfmodell
- LG400 Expert: Einstiegs-Wettkampfmodell
- LG400 Competition: Aktuelles Top-Modell
- LG500: Nachfolger mit MEC-Chassis

## Rechtsstatus Schweiz
Frei ab 18 Jahren — kein Waffenerwerbsschein nötig.`,
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
    inhalt: `## Diana — Deutsche Luftgewehr-Tradition seit 1890
Diana (heute Diana Airguns / GSG) ist eine der ältesten Luftgewehrmarken der Welt, gegründet 1890 in Rastatt (Deutschland). Die Marke steht für robuste, präzise Druckluft-Gewehre zum fairen Preis — vom Einsteiger-Knicklauf bis zum Wettkampf-Pressluftgewehr.

## Technische Daten (Diana 350 Magnum als Referenz)
- Kaliber: 4,5mm (.177), 5,5mm (.22)
- System: Federdruck-Knicklauf (auch Pressluft-Modelle verfügbar)
- Magazin: Einzellader (Knicklauf)
- Lauflänge: 450mm (je nach Modell)
- Gewicht: 3,2–4,0 kg (je nach Modell)
- Mündungsgeschwindigkeit: bis 380 m/s (Magnum-Modelle)
- Mündungsenergie: bis 28 Joule (Magnum)

## Besonderheiten
Diana-Knicklauf-Gewehre verwenden eine Unterspannfeder oder Gasdruckfeder. Der T06-Abzug ist einstellbar und für diese Preisklasse ausgezeichnet. Die Läufe sind kaltgehämmert und rifled — ungewöhnlich für Luftgewehre in diesem Segment. Für Einsteiger, Schädlingsbekämpfung und Freizeitschiessen die erste Wahl.

## Varianten
- Diana 240 Classic: Einsteiger-Knicklauf
- Diana 34 Premium: Mittlere Leistungsklasse
- Diana 350 Magnum: High-Power-Knicklauf
- Diana Stormrider: PCP-Pressluft-Repetierer
- Diana P1000: Wettkampf-Pressluftgewehr

## Rechtsstatus Schweiz
Modelle bis 7,5 Joule: Frei ab 18 Jahren. Über 7,5 Joule: WES erforderlich.`,
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
    inhalt: `## Perkussionsrevolver — Schwarzpulver-Klassiker
Perkussionsrevolver sind Vorderlader-Revolver aus der Mitte des 19. Jahrhunderts, die mit Schwarzpulver, Bleikugel und Zündhütchen geladen werden. Modelle wie der Colt Navy 1851, Colt Army 1860 und Remington 1858 sind als Repliken frei erhältlich und bei Schwarzpulver-Schützen beliebt.

## Technische Daten (Colt 1860 Army Replica als Referenz)
- Kaliber: .44 (auch .36)
- System: Single-Action-Revolver mit Perkussionszündung
- Trommel: 6 Schuss (Kammerladung von vorne)
- Lauflänge: 203mm (8", Colt Army)
- Gewicht: ca. 1200g

## Besonderheiten
Geladen wird jede Kammer einzeln von vorne: Schwarzpulver einfüllen, Bleikugel aufsetzen, mit Ladehebel einpressen, Zündhütchen auf die Pistons setzen. Dieser Vorgang dauert mehrere Minuten. Fett auf die Kammern verhindert Kettenreaktion (Durchzündung). Die Trommel wird von Hand auf jede Kammer gedreht (kein Selbstspanner bei frühen Modellen).

## Beliebte Repliken
- Colt 1851 Navy: .36 Kaliber, Oktagonlauf
- Colt 1860 Army: .44 Kaliber, runder Lauf
- Remington 1858 New Army: .44, geschlossener Rahmen (robuster)
- Pietta / Uberti: Italienische Hersteller der meisten Repliken

## Rechtsstatus Schweiz
Vorderlader/Perkussionswaffen: Frei ab 18 Jahren — kein Waffenerwerbsschein nötig!`,
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
    inhalt: `## Schreckschusswaffen — Signalwaffen und Platzpatronen
Schreckschusswaffen (SSW) sind Waffen, die ausschliesslich Platzpatronen, Reizstoffmunition (CS/Pfeffer) oder Signalmunition verschiessen können. Der Lauf ist dauerhaft blockiert — es können keine Projektile verschossen werden. Sie dienen zur Abschreckung, als Signalgeber oder für Film/Theater.

## Technische Daten (typische SSW, z.B. Walther P22 SSW)
- Kaliber: 9mm P.A.K. (Platzpatronen), auch 8mm P.A.K. oder .315
- System: Rückstosslader (halbautomatisch) oder Revolver
- Magazin: 7–18 Schuss (je nach Modell)
- Energie: Keine Geschoss-Energie (nur Knall und Gas)
- Lautstärke: ca. 155–160 dB

## Besonderheiten
Der Lauf ist durch einen Stahlzapfen dauerhaft versperrt — ein Umbau zur scharfen Waffe ist konstruktionsbedingt unmöglich (PTB-Prüfung). Die Gase und der Knall treten seitlich oder nach vorne aus. Reizstoff-Patronen (CS oder Pfeffer) haben eine Reichweite von ca. 3–5 Metern. Als Startpistole im Sport weltweit verbreitet.

## Beliebte Modelle
- Walther P22 Ready: Kompakte SSW-Pistole
- Röhm RG 96: Revolver-SSW
- Ekol Firat Magnum: Preisgünstige SSW
- Zoraki 917: Beretta-Optik
- Umarex: Lizenzkopien bekannter Marken (Walther, Beretta, Glock)

## Rechtsstatus Schweiz
Frei ab 18 Jahren — kein Waffenerwerbsschein nötig. Mitführen im öffentlichen Raum kann kantonal eingeschränkt sein.`,
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
    beschreibung: `## Geschichte und Bedeutung

Die 9×19mm Parabellum wurde 1902 von Georg Luger für die Deutsche Waffen- und Munitionsfabriken (DWM) entwickelt. Der Name "Parabellum" leitet sich vom lateinischen "Si vis pacem, para bellum" (Willst du Frieden, bereite den Krieg vor) ab. Sie ist heute das weltweit am meisten verbreitete Pistolenkaliber.

## Technische Eigenschaften

- Geschossdurchmesser: 9,01 mm
- Hülsenlänge: 19,15 mm
- Patronenlänge: 29,69 mm
- Typische Geschossgewichte: 7,5 g (115 gr), 8,0 g (124 gr), 9,5 g (147 gr)
- Mündungsgeschwindigkeit: 350–400 m/s (je nach Laborierung)
- Mündungsenergie: 480–600 J

## Verbreitung

Die 9×19mm ist die Standard-Dienstpatrone von NATO-Streitkräften, Polizei und Sicherheitskräften weltweit. In der Schweiz wird sie als Pistolenmunition der Armee (Pist Pat 41) und bei Polizeikorps verwendet.

## Geschosstypen

- Vollmantel (FMJ): Standardlaborierung für Training und Militär
- Hohlspitz (JHP): Für Behörden und Selbstverteidigung
- Teilmantel (JSP): Kompromiss zwischen Durchschlag und Energieabgabe
- Frangible: Für Nahkampftraining, zerfällt beim Aufprall`,
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
    beschreibung: `Die .308 Winchester wurde 1952 als zivile Version der militärischen 7,62×51mm NATO-Patrone eingeführt. Sie ist heute das weltweit am häufigsten verwendete Präzisionskaliber und findet Einsatz bei Militär, Polizei, Jägern und Sportschützen. Die .308 Win bietet eine hervorragende Balance zwischen Präzision, Rückstoss und Lauflebensdauer.

## Technische Daten
- Geschossdurchmesser: 7,82 mm (.308")
- Hülsenlänge: 51,18 mm
- Patronenlänge: 71,12 mm
- Geschossgewicht: 9,7–12,3 g (150–190 grain)
- Mündungsenergie: 3.400–3.600 J
- Mündungsgeschwindigkeit: 820–870 m/s
- Maximaler Gasdruck: 4.150 bar (CIP)

## Einsatzgebiete
Standard-Scharfschützenkaliber bei NATO-Armeen und Polizeien weltweit. In der Jagd universell einsetzbar für alles Wild in Mitteleuropa. Im Sportbereich dominiert die .308 Win den 300m-Distanzbereich und viele F-Class-Wettbewerbe.

## WICHTIG: .308 Win vs. 7,62×51mm NATO
.308 Winchester hat einen leicht höheren maximalen Gasdruck als 7,62×51mm NATO. .308 Win darf in NATO-Läufen geschossen werden, aber nicht umgekehrt.

## Verbreitung in der Schweiz
Sehr verbreitet bei Jägern und Sportschützen. Polizei-Scharfschützengewehre (SIG SSG 3000) in .308 Win. Trainingsmunition ab ca. CHF 0.80/Schuss, Präzisionsmunition CHF 2–4.

## Varianten
- Match: Präzisionslaborierungen (Lapua Scenar, Sierra MatchKing)
- Jagd: Teilmantel, Kupfer-Deformationsgeschosse
- FMJ: Günstige Trainingsmunition
- Subsonic: Für Schalldämpfer-Einsatz`,
  },
  {
    slug: '75x55',
    bezeichnung: '7,5×55mm Swiss',
    aliase: ['GP11', 'Schmidt-Rubin', '7,5mm Ordonnanz'],
    typ: 'Büchse',
    entwickelt: '1911',
    entwickler: 'Schweizer Armee / W+F Bern',
    kurzbeschreibung: 'Die Schweizer Ordonnanzpatrone für K31 und Stgw 57. Einzigartiges Schweizer Kaliber.',
    geschossdurchmesser: '7,78 mm',
    huelsenlaenge: '55,70 mm',
    standardenergie: '3.600 J',
    muzzleVelocity: '780 m/s',
    typischeWaffen: ['Karabiner 31 (K31)', 'Karabiner 1911', 'Sturmgewehr 57'],
    beschreibung: `Die 7,5×55mm Swiss (GP11) ist die Schweizer Ordonnanzpatrone, die 1911 als Gewehrpatrone 11 eingeführt wurde. Sie diente in den Karabinern K31 und im Sturmgewehr 57 als Standardmunition und ist für ihre aussergewöhnliche Präzision bekannt. Die GP11 gilt als eine der genauesten militärischen Patronen, die je in Serie produziert wurde.

## Technische Daten
- Geschossdurchmesser: 7,78 mm
- Hülsenlänge: 55,60 mm
- Patronenlänge: 78,10 mm
- Geschossgewicht: 11,3 g (174 grain)
- Mündungsenergie: ca. 3.600 J
- Mündungsgeschwindigkeit: ca. 780 m/s
- Maximaler Gasdruck: 3.600 bar (CIP)

## Einsatzgebiete
Entwickelt als Schweizer Militärpatrone für K31, Stgw 57 und MG 51. Heute im sportlichen 300m-Schiessen mit historischen Waffen beliebt. Die GP11 wurde für höchste Präzision auf 300m optimiert — die Standard-Schiessdistanz des Schweizer Obligatorischen.

## Verbreitung in der Schweiz
Die RUAG GP11 war bis 2020 als Armeemunition erhältlich und bei Sammlern/Sportschützen sehr beliebt. Seit der Produktionseinstellung ist GP11 Mangelware geworden. Preise: CHF 1.50–3.00/Schuss. Alternative Hersteller: PPU (Prvi Partizan), Hornady.

## Besonderheiten
Die GP11-Patrone ist NICHT identisch mit .308 Win oder 7,62×51mm NATO — trotz ähnlichem Geschossdurchmesser. Die Hülse ist länger und hat eine andere Form. In K31 und Stgw 57 darf nur 7,5×55mm Swiss verschossen werden.`,
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
    beschreibung: `Die 5,56×45mm NATO wurde in den 1960er-Jahren als Standardpatrone der NATO eingeführt, basierend auf der zivilen .223 Remington. Sie ist das Standard-Sturmgewehrkaliber der meisten westlichen Armeen, darunter auch der Schweizer Armee (als GP 90 im Stgw 90). Die Patrone wurde für geringes Gewicht und kontrollierbaren Rückstoss im Feuerstoss optimiert.

## Technische Daten
- Geschossdurchmesser: 5,70 mm
- Hülsenlänge: 44,70 mm
- Patronenlänge: 57,40 mm
- Geschossgewicht: 3,6–4,0 g (55–63 grain)
- Mündungsenergie: 1.700–1.800 J
- Mündungsgeschwindigkeit: 920–960 m/s
- Maximaler Gasdruck: 4.300 bar (NATO)

## Einsatzgebiete
NATO-Standard für Sturmgewehre und leichte MGs (STANAG 4172). In der Schweizer Armee als GP 90 im Stgw 90 im Einsatz. Zivil populär in halbautomatischen Sportgewehren (PE 90, AR-15-Plattform). Im dynamischen Schiessen und auf 300m verbreitet.

## WICHTIG: 5,56×45mm NATO vs. .223 Remington
5,56mm NATO hat einen höheren Gasdruck als .223 Rem. NATO-Munition in .223-Läufen kann gefährlich sein! Umgekehrt ist .223 Rem in 5,56mm-Läufen sicher.

## Verbreitung in der Schweiz
Schweizer Armeemunition (GP 90, RUAG). Sehr günstig als Armeeabgabe erhältlich (wenn verfügbar). Zivile Munition ab ca. CHF 0.50/Schuss. Beliebt bei PE 90/Stgw 90-Schützen.

## Varianten
- GP 90 (Schweiz): 4,0g FMJ-Geschoss, RUAG-Fertigung
- M855 (NATO): 62 grain, Stahlkern
- M193 (US): 55 grain, Bleikern
- Mk 262: 77 grain Match für Präzision`,
  },
  {
    slug: '22lr',
    bezeichnung: '.22 Long Rifle',
    aliase: ['.22 LR', '.22 lfB', '5,6mm'],
    typ: 'Kleinkaliber',
    entwickelt: '1887',
    entwickler: 'Stevens Arms',
    kurzbeschreibung: 'Weltweites Einstiegs- und Sportkaliber. Günstigste Munition — ideal für Training.',
    geschossdurchmesser: '5,70 mm',
    huelsenlaenge: '15,11 mm',
    standardenergie: '130–160 J',
    muzzleVelocity: '330–380 m/s',
    typischeWaffen: ['Anschütz 1913', 'CZ 452/457', 'Ruger 10/22', 'Tikka T1x'],
    beschreibung: `Die .22 Long Rifle (22 LR) ist die weltweit meistproduzierte und meistverkaufte Munitionspatrone überhaupt. Sie wurde 1887 von der J. Stevens Arms Company eingeführt und hat sich zum universellen Trainings-, Sport- und Kleinkaliber-Standard entwickelt. Jährlich werden weltweit über 2 Milliarden Schuss produziert.

## Technische Daten
- Geschossdurchmesser: 5,70 mm (.22")
- Hülsenlänge: 15,60 mm
- Patronenlänge: 25,40 mm
- Geschossgewicht: 2,0–2,6 g (30–40 grain)
- Mündungsenergie: 140–200 J
- Mündungsgeschwindigkeit: 280–370 m/s
- System: Randfeuerzündung

## Einsatzgebiete
Universelle Trainingspatrone für alle Disziplinen. Olympische Schiessport-Disziplinen (50m Gewehr/Pistole) verwenden ausschliesslich .22 LR. Ideal zum Erlernen der Schiessgrundlagen wegen minimalem Rückstoss und günstigen Kosten. Auch zur Schädlingsbekämpfung geeignet.

## Verbreitung in der Schweiz
Die beliebteste Kleinkaliberpatrone. Preise: CHF 0.05–0.15/Schuss. In Jugendschiessen und Ausbildungsprogrammen des SSV Standard. Zahlreiche Vereine bieten 50m-Kleinkaliber-Programme an.

## Varianten
- Standard Velocity: ~330 m/s, für Wettkampf und präzises Schiessen
- High Velocity: ~370 m/s, für allgemeinen Gebrauch
- Subsonic: ~280 m/s, für Schalldämpfer
- Match: Präzisionslaborierungen (Eley, RWS, Lapua)
- Hyper Velocity: CCI Stinger etc., höchste Geschwindigkeit`,
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
    beschreibung: `Die .357 Magnum wurde 1934 von Elmer Keith, Phillip Sharpe und Douglas Wesson gemeinsam mit Smith & Wesson entwickelt. Sie war die erste «Magnum»-Patrone und setzte neue Massstäbe in Sachen Leistung bei Kurzwaffen. Die .357 Magnum entstand durch Verlängerung der .38 Special-Hülse und deutlich erhöhten Gasdruck.

## Technische Daten
- Geschossdurchmesser: 9,07 mm (.357")
- Hülsenlänge: 32,77 mm
- Patronenlänge: 40,39 mm
- Geschossgewicht: 7,1–10,2 g (110–158 grain)
- Mündungsenergie: 700–900 J (aus 6"-Revolver)
- Mündungsgeschwindigkeit: 400–460 m/s
- Maximaler Gasdruck: 3.000 bar

## Einsatzgebiete
Klassisches Revolverkaliber für Sport, Jagd (Reh, Fuchs) und Dienst. Im Revolversport das Standard-Wettkampfkaliber. Bei Jägern für Kurzwaffen-Jagd beliebt. In der Selbstverteidigung als besonders wirksam angesehen.

## Verbreitung in der Schweiz
Im SSV-Revolversport die dominante Patrone. Typische Waffen: S&W 686, Ruger GP100, Colt Python. Preis: CHF 0.70–1.50/Schuss. Jeder .357 Magnum-Revolver kann auch günstigere .38 Special verschliessen — ideal zum Training.

## Varianten
- FMJ: Vollmantel für Training
- JHP: Hohlspitz für Maximum-Performance
- Wadcutter: Flachkopf für Präzision auf 25m
- .38 Special: Kann in allen .357-Revolvern verwendet werden (kürzere Hülse, weniger Rückstoss)`,
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
    beschreibung: `Die .44 Remington Magnum wurde 1955 gemeinsam von Elmer Keith, Smith & Wesson und Remington entwickelt. Durch Clint Eastwoods «Dirty Harry» (1971) wurde sie zum bekanntesten Revolverkaliber der Welt. Tatsächlich ist das Geschoss .429" (10,9mm) — der Name «.44» ist historisch bedingt.

## Technische Daten
- Geschossdurchmesser: 10,92 mm (.429")
- Hülsenlänge: 32,64 mm
- Patronenlänge: 40,89 mm
- Geschossgewicht: 12,0–19,4 g (180–300 grain)
- Mündungsenergie: 1.000–1.500 J
- Mündungsgeschwindigkeit: 360–440 m/s
- Maximaler Gasdruck: 2.760 bar

## Einsatzgebiete
Kraftvolles Revolverkaliber für die Jagd auf mittleres bis grosses Wild. In Nordamerika populär für die Bärenjagd. Im Sport als «Open»-Kaliber für Silhouette-Schiessen und Spezialwettbewerbe. Auch in der Desert Eagle als Pistolenpatrone erhältlich.

## Verbreitung in der Schweiz
Nischenprodukt für Sammler und Liebhaber. Typische Waffen: S&W 629, Ruger Super Redhawk, Desert Eagle. Preise: CHF 1.50–3.00/Schuss. Im Revolversport selten, da .357 Magnum praktikabler ist.

## Varianten
- Jacketed Hollow Point: Standard-Jagdlaborierung
- Hard Cast Lead: Für maximale Penetration (Bärenschutz)
- .44 Special: Reduzierte Ladung, weniger Rückstoss, gleiche Waffen`,
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
    beschreibung: `Die .45 ACP (Automatic Colt Pistol) wurde 1905 von John Moses Browning für die Colt M1911 entwickelt. Sie diente von 1911 bis 1985 als Standard-Pistolenpatrone der US-Streitkräfte und ist bis heute das Synonym für «Stoppwirkung». Die .45 ACP ist die ikonische amerikanische Pistolenpatrone.

## Technische Daten
- Geschossdurchmesser: 11,43 mm (.452")
- Hülsenlänge: 22,81 mm
- Patronenlänge: 32,19 mm
- Geschossgewicht: 12,0–15,0 g (185–230 grain)
- Mündungsenergie: 450–600 J
- Mündungsgeschwindigkeit: 250–300 m/s
- Maximaler Gasdruck: 1.500 bar (CIP)

## Einsatzgebiete
Klassisches Kaliber für 1911-Pistolen und andere Grosskaliberpistolen. Im IPSC-Sport beliebt wegen des «Major Power Factor». Die niedrige Geschwindigkeit und das schwere Geschoss erzeugen einen charakteristischen «Push»-Rückstoss statt eines scharfen Knalls.

## Verbreitung in der Schweiz
Beliebt bei 1911-Enthusiasten und IPSC-Schützen. Typische Waffen: Colt 1911, SIG P220 (.45), HK USP .45. Preise: CHF 0.80–1.50/Schuss.

## Varianten
- FMJ (230gr Ball): Standard-Trainingsmunition
- JHP: Hohlspitz, expandierend
- +P: Erhöhter Druck für mehr Energie
- Match: Präzisionslaborierungen für Wettkampf
- .45 Super: Verstärkte Version (nicht in allen Waffen sicher)`,
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
    beschreibung: `Die .380 ACP (auch 9mm Kurz oder 9×17mm) wurde 1908 von John Moses Browning für die Colt Model 1908 entwickelt. Sie ist die Standard-Patrone für Kompakt- und Taschenpistolen und bietet einen Kompromiss zwischen Leistung und Kontrollierbarkeit in kleinen Waffen.

## Technische Daten
- Geschossdurchmesser: 9,01 mm (.355")
- Hülsenlänge: 17,30 mm
- Patronenlänge: 25,00 mm
- Geschossgewicht: 5,5–6,2 g (85–95 grain)
- Mündungsenergie: 250–320 J
- Mündungsgeschwindigkeit: 290–320 m/s
- Maximaler Gasdruck: 1.575 bar (CIP)

## Einsatzgebiete
Standard für Kompakt- und Taschenpistolen. Die .380 ACP ermöglicht den Bau sehr kleiner, leichter Pistolen mit Masseverschluss (kein verriegelter Verschluss nötig). Klassische Waffe: Walther PPK. Selbstverteidigung und Backup-Waffe.

## Verbreitung in der Schweiz
Nischenprodukt — die meisten Schützen bevorzugen 9×19mm. Typische Waffen: Walther PPK, Beretta 84, SIG P232. Preise: CHF 0.50–0.80/Schuss.

## Varianten
- FMJ: Vollmantel für Training
- JHP: Hohlspitz für maximale Wirkung
- FTX (Hornady): Optimiertes Expansionsgeschoss für kurze Läufe`,
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
    beschreibung: `Die .38 Special wurde 1898 von Smith & Wesson als Verbesserung der .38 Long Colt entwickelt und war über 80 Jahre lang die Standard-Polizeipatrone in den USA. Sie ist bis heute die weltweit am zweithäufigsten verkaufte Revolverpatrone und das Einstiegskaliber für Revolverschützen.

## Technische Daten
- Geschossdurchmesser: 9,07 mm (.357")
- Hülsenlänge: 29,34 mm
- Patronenlänge: 39,37 mm
- Geschossgewicht: 8,1–10,2 g (125–158 grain)
- Mündungsenergie: 300–400 J
- Mündungsgeschwindigkeit: 260–310 m/s
- Maximaler Gasdruck: 1.800 bar (CIP)

## Einsatzgebiete
Trainingspatrone für .357 Magnum-Revolver (passt in jede .357-Trommel). Ideal für Einsteiger wegen mildem Rückstoss. Im Präzisionssport (25m Revolver) als Wadcutter-Laborierung sehr beliebt. Für leichte Revolver als Selbstverteidigungspatrone.

## Verbreitung in der Schweiz
Sehr verbreitet als Trainingspatrone für .357-Revolver. Günstiger und weicher als .357 Magnum. Preise: CHF 0.40–0.80/Schuss. Im SSV-Revolversport oft für Training verwendet.

## Varianten
- Wadcutter (WC): Flachkopf, stanzt saubere Löcher ins Papier — 25m Standardlaborierung
- Semi-Wadcutter (SWC): Halbrundkopf
- JHP: Hohlspitz für Selbstverteidigung
- +P: Erhöhter Druck für mehr Leistung
- .38 S&W: NICHT identisch! Andere Patrone mit kürzerem, dickerem Gehäuse`,
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
    beschreibung: `Die .30-06 Springfield wurde 1906 von der US Army als Standardpatrone eingeführt und diente bis 1954 als amerikanische Militärpatrone (ersetzt durch 7,62×51mm NATO). Sie ist eine der vielseitigsten Jagdpatronen weltweit und wird seit über 100 Jahren erfolgreich auf alles Wild von Reh bis Elch eingesetzt.

## Technische Daten
- Geschossdurchmesser: 7,82 mm (.308")
- Hülsenlänge: 63,35 mm
- Patronenlänge: 84,84 mm
- Geschossgewicht: 9,7–14,3 g (150–220 grain)
- Mündungsenergie: 3.500–4.000 J
- Mündungsgeschwindigkeit: 800–900 m/s
- Maximaler Gasdruck: 4.150 bar (CIP)

## Einsatzgebiete
Universal-Jagdpatrone für alles Wild in Europa und Nordamerika. Die grosse Hülsenkapazität ermöglicht schwere Geschosse (bis 220gr) für Grosswild. Im Long-Range-Sport als bewährte Patrone geschätzt.

## Verbreitung in der Schweiz
In der Schweizer Jagd weniger verbreitet als .308 Win oder 7×64, aber bei Jägern mit US-Büchsen (Winchester 70, Remington 700) anzutreffen. Preise: CHF 1.50–3.00/Schuss.

## Varianten
- 150gr Spitzer: Standard-Jagdlaborierung für mittleres Wild
- 180gr Partition: Schweres Geschoss für Grosswild
- 165gr Bonded: Kompromiss-Laborierung
- M2 Ball: Historische Militärlaborierung (150gr FMJ)`,
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
    beschreibung: `Die 7×64mm Brenneke wurde 1917 vom deutschen Munitionskonstrukteur Wilhelm Brenneke entwickelt. Sie ist eine der beliebtesten europäischen Jagdpatronen und bietet eine hervorragende Balance zwischen Flugbahnstabilität, Auftreffenergie und Rückstoss. In der Schweiz und Deutschland ist sie ein Jagdklassiker.

## Technische Daten
- Geschossdurchmesser: 7,24 mm
- Hülsenlänge: 64,00 mm
- Patronenlänge: 84,00 mm
- Geschossgewicht: 9,0–11,5 g (139–177 grain)
- Mündungsenergie: 3.300–3.800 J
- Mündungsgeschwindigkeit: 850–920 m/s
- Maximaler Gasdruck: 4.050 bar (CIP)

## Einsatzgebiete
Universal-Jagdpatrone für europäisches Wild — von Reh bis Rothirsch. Die gestreckte Flugbahn (Rasanzjäger-Kaliber) macht sie ideal für die Ansitzjagd auf mittlere Distanzen. Leistungsmässig vergleichbar mit .270 Win und .308 Win.

## Verbreitung in der Schweiz
Beliebtes Jagdkaliber, insbesondere in Mauser-System-Büchsen (Blaser, Sauer, Mauser). Preise: CHF 2.00–4.00/Schuss. Alternative: 7×65R als Randversion für Kipplaufwaffen.

## Varianten
- TM (Teilmantel): Standard-Jagdlaborierung
- Kupfer (bleifrei): Für bleifreie Jagdgebiete
- Ballistic Tip: Polymerspitze für schnelle Expansion`,
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
    beschreibung: `Die 9,3×62mm wurde 1905 vom Berliner Büchsenmacher Otto Bock entwickelt und ist die klassische «Afrikapatrone» für deutsche und skandinavische Jäger. Sie bietet ausreichend Energie für alles afrikanische Grosswild und ist gleichzeitig in Standard-Mauser-98-Systemen verwendbar — ohne den Verschlusskopf zu ändern.

## Technische Daten
- Geschossdurchmesser: 9,30 mm
- Hülsenlänge: 62,00 mm
- Patronenlänge: 84,00 mm
- Geschossgewicht: 15,0–18,5 g (232–286 grain)
- Mündungsenergie: 4.400–5.200 J
- Mündungsgeschwindigkeit: 700–790 m/s
- Maximaler Gasdruck: 3.900 bar (CIP)

## Einsatzgebiete
Klassisches Grosswild- und Afrikakalber. Für alle «Big Five» geeignet (ausser Elefant Frontalbeschuss). In Skandinavien Standard für die Elchjagd. Auch als «Universal-Drückjagdkaliber» für die Jagd auf wehrhaftes Wild in Europa im Einsatz.

## Verbreitung in der Schweiz
Nischenprodukt für Jäger, die auf Grosswild oder in Afrika jagen. Typische Waffen: Mauser M98, Blaser R8, Sauer 404. Preise: CHF 3.00–5.00/Schuss.

## Varianten
- Teilmantel: Standard für Grosswild
- Solid (Vollmantel): Für dickhäutiges Wild (Büffel, Hippo)
- Bleifrei: Kupfer-Deformationsgeschoss`,
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
    beschreibung: `Die 6,5mm Creedmoor wurde 2007 von Hornady-Ingenieur Dave Emary in Zusammenarbeit mit dem Wettkampfschützen Dennis DeMille entwickelt. In weniger als 15 Jahren wurde sie zum dominierenden Kaliber im Präzisions- und Long-Range-Schiessen. Sie bietet eine extrem flache Flugbahn bei moderatem Rückstoss.

## Technische Daten
- Geschossdurchmesser: 6,72 mm (.264")
- Hülsenlänge: 48,77 mm
- Patronenlänge: 71,76 mm
- Geschossgewicht: 6,5–9,1 g (100–140 grain)
- Mündungsenergie: 2.800–3.300 J
- Mündungsgeschwindigkeit: 820–900 m/s
- Maximaler Gasdruck: 4.350 bar (CIP)

## Einsatzgebiete
Dominiert den Long-Range-Wettkampf (PRS, F-Class, NRL). Die hohen BC-Werte (Ballistischer Koeffizient) der 6,5mm-Geschosse ergeben weniger Windabdrift und flachere Flugbahnen als .308 Win. Zunehmend auch in der Jagd beliebt, besonders auf Bergwild und mittleres Wild auf weite Distanzen.

## Verbreitung in der Schweiz
Stark wachsend, insbesondere bei Long-Range-Schützen. Typische Waffen: Tikka T3x, Sako 85, Remington 700, AI AT-X. Preise: CHF 1.50–3.50/Schuss.

## Varianten
- 140gr ELD Match: Standard-Wettkampflaborierung
- 143gr ELD-X: Jagdlaborierung mit kontrollierten Expansion
- 120gr: Leichtere Geschosse für höhere Geschwindigkeit`,
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
    beschreibung: `Die .300 Winchester Magnum wurde 1963 von Winchester eingeführt und ist heute das meistverbreitete Magnumkaliber weltweit. Sie basiert auf einer verkürzten .375 H&H-Hülse und bietet deutlich mehr Energie als die .308 Win — bei akzeptablem Rückstoss. Bei Militärscharfschützen und Grosswildjägern gleichermassen geschätzt.

## Technische Daten
- Geschossdurchmesser: 7,82 mm (.308")
- Hülsenlänge: 66,55 mm
- Patronenlänge: 84,84 mm
- Geschossgewicht: 10,7–14,3 g (165–220 grain)
- Mündungsenergie: 4.200–5.000 J
- Mündungsgeschwindigkeit: 870–960 m/s
- Maximaler Gasdruck: 4.300 bar (CIP)

## Einsatzgebiete
Militärscharfschützengewehr-Kaliber bei US, NATO und anderen Armeen. Universal-Magnumkaliber für die Jagd auf alles Wild bis Elch und Bär. Im Long-Range-Sport für Distanzen über 1.000m beliebt.

## Verbreitung in der Schweiz
Beliebt bei ambitionierten Jägern für die Jagd in Skandinavien, Kanada und Afrika. Auch bei Long-Range-Schützen verbreitet. Preise: CHF 3.00–6.00/Schuss.

## Varianten
- 180gr Partition: Standard-Jagdlaborierung
- 190gr Berger VLD: Long-Range-Wettkampf
- 200gr ELD-X: Schwere Jagdlaborierung für Grosswild`,
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
    beschreibung: `Die .338 Lapua Magnum wurde 1989 von der finnischen Firma Lapua für militärische Scharfschützengewehre entwickelt. Sie schliesst die Leistungslücke zwischen 7,62mm NATO und .50 BMG und ermöglicht effektive Bekämpfung auf Distanzen über 1.500m. Der britische Soldat Craig Harrison erzielte 2009 mit einer .338 Lapua den damaligen Rekord-Fernschuss über 2.475m.

## Technische Daten
- Geschossdurchmesser: 8,61 mm (.338")
- Hülsenlänge: 69,20 mm
- Patronenlänge: 93,50 mm
- Geschossgewicht: 16,2–19,4 g (250–300 grain)
- Mündungsenergie: 6.500–7.500 J
- Mündungsgeschwindigkeit: 880–920 m/s
- Maximaler Gasdruck: 4.200 bar (CIP)

## Einsatzgebiete
Militärisches Anti-Matériel/Scharfschützen-Kaliber bei zahlreichen NATO-Armeen. Im ELR (Extreme Long Range) Sport für Distanzen ab 1.000m. Für die Jagd auf sehr grosses Wild (Elch, Bär, afrikanisches Grosswild).

## Verbreitung in der Schweiz
Nischenprodukt für Long-Range-Enthusiasten. Typische Waffen: AI AXMC, Sako TRG 42, Barrett MRAD. Sehr teuer: CHF 6.00–12.00/Schuss. ABK-Klein erforderlich für viele Waffen in diesem Kaliber.

## Varianten
- 250gr Scenar: Standard-Matchlaborierung (Lapua)
- 300gr Berger OTM: Maximum-BC für extreme Distanzen`,
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
    beschreibung: `Die .50 BMG (Browning Machine Gun, 12,7×99mm NATO) wurde 1918 von John Moses Browning entwickelt. Sie ist die Standardpatrone für schwere Maschinengewehre und Anti-Matériel-Gewehre der NATO. Die .50 BMG kann leicht gepanzerte Fahrzeuge, Flugzeuge und Materialziele auf grosse Distanzen bekämpfen.

## Technische Daten
- Geschossdurchmesser: 12,98 mm (.510")
- Hülsenlänge: 99,00 mm
- Patronenlänge: 138,43 mm
- Geschossgewicht: 42,0–52,0 g (647–800 grain)
- Mündungsenergie: 15.000–20.000 J
- Mündungsgeschwindigkeit: 850–930 m/s
- Maximaler Gasdruck: 3.700 bar

## Einsatzgebiete
NATO-Standardpatrone für schwere MGs (M2 Browning) und Anti-Matériel-Gewehre (Barrett M82, AI AX50). Im ELR-Sport (Extreme Long Range) für Schüsse auf 1.500m+. Im Weltrekord-Long-Range-Schiessen die dominierende Patrone.

## Verbreitung in der Schweiz
Äusserst selten. Zivile Waffen in .50 BMG erfordern eine ABK (Ausnahmebewilligung). Preise: CHF 8.00–20.00/Schuss. Nur wenige Schiessanlagen erlauben das Schiessen mit diesem Kaliber.

## Varianten
- M33 Ball: Standard-FMJ-Militärlaborierung
- API (Armor Piercing Incendiary): Panzerbrand
- AMAX: Match-Laborierung für Wettkampf (Hornady)`,
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
    beschreibung: `Die 7,62×39mm wurde 1943 in der Sowjetunion als Zwischenpatrone für das SKS und später die AK-47 (Kalaschnikow) entwickelt. Sie ist nach der 9×19mm und .22 LR die dritthäufigst produzierte Patrone weltweit und das Standard-Sturmgewehrkaliber des ehemaligen Ostblocks.

## Technische Daten
- Geschossdurchmesser: 7,92 mm (.312")
- Hülsenlänge: 38,70 mm
- Patronenlänge: 56,00 mm
- Geschossgewicht: 7,9–8,1 g (122–125 grain)
- Mündungsenergie: 2.000–2.100 J
- Mündungsgeschwindigkeit: 710–730 m/s
- Maximaler Gasdruck: 3.550 bar (CIP)

## Einsatzgebiete
Standard-Sturmgewehrkaliber für AK-47/AKM, SKS und RPK-MG. In der zivilen Nutzung als günstiges Trainings- und Schiess-Kaliber in halbautomatischen AK-Varianten und Büchsen (CZ 527, Ruger Mini-30).

## Verbreitung in der Schweiz
Nischenprodukt für Besitzer ziviler AK-Varianten. Günstige Ostblock-Munition: CHF 0.40–0.70/Schuss. ABK-Klein für halbautomatische AK-Varianten erforderlich.

## Varianten
- FMJ (Stahlkern): Standard-Militärmunition
- Soft Point: Für Jagd (mittleres Wild)
- Hollow Point: Für verbesserte Expansion`,
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
    beschreibung: `Die GP 90 (Gewehr Patrone 90) ist die offizielle Schweizer Armeemunition im Kaliber 5,56×45mm, gefertigt von RUAG Ammotec (heute Beretta-Ruag) in Thun. Sie wurde speziell für das Sturmgewehr 90 (SIG 550) entwickelt und ist für maximale Präzision auf 300m optimiert — die Standard-Schiessdistanz des Schweizer Obligatorischen.

## Technische Daten
- Kaliber: 5,56×45mm NATO
- Geschossgewicht: 4,0 g (63 grain) Vollmantel-Bootail
- Mündungsenergie: ca. 1.780 J
- Mündungsgeschwindigkeit: ca. 940 m/s
- Patronenlänge: 57,40 mm
- Maximaler Gasdruck: nach NATO-STANAG

## Besonderheiten
Die GP 90 unterscheidet sich von der Standard-NATO M855 durch ihr schwereres 63-grain-Geschoss (M855: 62 grain) und die Schweizer Präzisionsanforderungen. Jede Charge wird auf Präzision geprüft. Die Hülse trägt die Bodenprägung «T» (Thun). Das Geschoss enthält keinen Stahlkern wie die M855.

## Verbreitung in der Schweiz
Weit verbreitet als Übungs- und Wettkampfmunition. Wird an Schiessobligatorischen und Feldschiessen verwendet. Armeeangehörige erhalten GP 90 für obligatorische Schiessübungen. Zivil erhältlich (wenn verfügbar) zu ca. CHF 0.50–0.80/Schuss. Seit RUAG-Umstrukturierung zeitweise knapp.

## Varianten
- GP 90: Standard-Trainings- und Gefechtsmunition
- GP 90 Spez: Spezial-Laborierung für erhöhte Anforderungen`,
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
    beschreibung: `Die 6,5×55mm Swedish (auch 6,5×55 SE oder «Schwedische Mauser») wurde 1894 gemeinsam von Schweden und Norwegen als Militärpatrone für den Mauser-Karabiner m/94 und das Gewehr m/96 entwickelt. Sie ist für ihre hervorragende Präzision und moderate Rückstossentwicklung bekannt und erlebt seit den 2000er-Jahren eine Renaissance in der Jagd.

## Technische Daten
- Geschossdurchmesser: 6,71 mm (.264")
- Hülsenlänge: 55,00 mm
- Patronenlänge: 80,00 mm
- Geschossgewicht: 6,5–10,1 g (100–156 grain)
- Mündungsenergie: 2.600–3.200 J
- Mündungsgeschwindigkeit: 780–880 m/s
- Maximaler Gasdruck: 3.800 bar (CIP)

## Einsatzgebiete
Präzisionsjagd und Sportschessen. In Skandinavien traditionelles Jagdkaliber für alles Wild bis Elch. Moderne Laborierungen mit hohen BC-Geschossen machen die 6,5×55 zu einem exzellenten Long-Range-Kaliber. Im Wettkampf für F-Class und 300m-Schiessen beliebt.

## Verbreitung in der Schweiz
Wachsende Beliebtheit bei Jägern und Sportschützen. Typische Waffen: Sako 85, Tikka T3x, Mauser M18. Preise: CHF 1.50–3.50/Schuss. Als Alternative zu 6,5 Creedmoor geschätzt (mehr Hülsenkapazität).

## Varianten
- 140gr Partition: Standard-Jagdlaborierung
- 130gr Scenar: Match/Wettkampf
- 100gr Ballistic Tip: Leichtes Geschoss für Flachbahn`,
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
    beschreibung: `Die .243 Winchester wurde 1955 von Winchester als «Doppelzweck»-Patrone eingeführt — gleichermassen für die Jagd auf Rehwild und für das sportliche Zielschiessen geeignet. Sie basiert auf der .308 Winchester-Hülse, die auf 6mm Geschossdurchmesser verengt wurde. Die .243 Win ist eine der meistvekauften Jagdpatronen weltweit.

## Technische Daten
- Geschossdurchmesser: 6,17 mm (.243")
- Hülsenlänge: 51,18 mm
- Patronenlänge: 68,83 mm
- Geschossgewicht: 5,2–6,5 g (80–100 grain)
- Mündungsenergie: 2.500–2.900 J
- Mündungsgeschwindigkeit: 870–1.020 m/s
- Maximaler Gasdruck: 4.150 bar (CIP)

## Einsatzgebiete
Universelle Jagdpatrone für leichtes bis mittleres Wild (Reh, Gams, Murmeltier). Dank flacher Flugbahn und geringem Rückstoss ideal für Jungjäger und kleinere Schützen. Im Target-Schiessen als Einstiegskaliber für mittlere Distanzen beliebt.

## Verbreitung in der Schweiz
Beliebtes Einstiegs-Jagdkaliber, besonders für die Bergjagd (Gams, Murmeltier). Preise: CHF 1.50–3.00/Schuss. Typische Waffen: Sauer 100, Tikka T3x, Blaser R8.

## Varianten
- 100gr Partition: Standard-Jagdlaborierung für Reh/Gams
- 80gr Ballistic Tip: Leichteres Geschoss für Varminting
- 95gr Berger VLD: Match-Laborierung`,
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
    beschreibung: `Die 7×65R wurde 1917 von Wilhelm Brenneke als Randversion der 7×64mm entwickelt. Das «R» steht für «Rand» — die Hülse hat einen vorstehenden Rand, der in Kipplaufwaffen (Drillingen, Bockbüchsflinten, Einzelladern) als Auszieher-Anlage dient. Die Ballistik ist praktisch identisch mit der 7×64mm.

## Technische Daten
- Geschossdurchmesser: 7,24 mm
- Hülsenlänge: 65,00 mm
- Patronenlänge: 84,50 mm
- Geschossgewicht: 8,0–11,5 g (123–177 grain)
- Mündungsenergie: 3.200–3.700 J
- Mündungsgeschwindigkeit: 820–900 m/s
- Maximaler Gasdruck: 3.700 bar (CIP)

## Einsatzgebiete
Standard-Kaliber für kombinierte Jagdwaffen (Drillinge, Bockbüchsflinten). Die Randpatrone funktioniert zuverlässig in Kipplauf-Systemen. Leistungsmässig identisch mit 7×64mm — universelles europäisches Jagdkaliber.

## Verbreitung in der Schweiz
Verbreitet bei Jägern mit Kipplaufwaffen und kombinierten Waffen. Typische Waffen: Krieghoff Drilling, Blaser B97, Merkel-Drillinge. Preise: CHF 2.50–4.00/Schuss.

## Varianten
- Teilmantel: Standard-Jagd
- Kupfer (bleifrei): Für bleifreie Gebiete`,
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
    beschreibung: `Die 9,3×74R ist die Randversion der 9,3×62mm und wurde um 1900 als Grosswildkaliber für Kipplaufwaffen und Drillinge entwickelt. Sie bietet die gleiche Leistung wie die 9,3×62mm, funktioniert aber zuverlässig in Kipplauf-Systemen dank des vorstehenden Hülsenrands.

## Technische Daten
- Geschossdurchmesser: 9,30 mm
- Hülsenlänge: 74,00 mm
- Patronenlänge: 97,30 mm
- Geschossgewicht: 15,0–18,5 g (232–286 grain)
- Mündungsenergie: 4.200–5.000 J
- Mündungsgeschwindigkeit: 680–760 m/s
- Maximaler Gasdruck: 3.500 bar (CIP)

## Einsatzgebiete
Grosswildkaliber für Kipplaufwaffen — Drillinge, Bockbüchsflinten und Kipplauf-Einzellader. Für Drückjagd auf Schwarzwild und die Jagd in Afrika auf mittleres bis grosses Wild. Beliebt bei europäischen Jägern, die Kipplaufwaffen für die Grosswildjagd nutzen.

## Verbreitung in der Schweiz
Nischenprodukt für Besitzer von Drillingen und Kipplaufbüchsen. Typische Waffen: Krieghoff-Drillinge, Merkel-Drillinge, Blaser K95. Preise: CHF 4.00–6.00/Schuss.

## Varianten
- Teilmantel: Standard-Jagd
- Solid (Vollmantel): Für dickhäutiges Grosswild`,
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
    beschreibung: `Die .300 AAC Blackout (7,62×35mm) wurde 2010 von Advanced Armament Corporation entwickelt. Sie ist speziell für den Einsatz in AR-15-Plattformen mit Schalldämpfer konzipiert und bietet sowohl Überschall- als auch Unterschall-Laborierungen. Ein AR-15 in .223/5,56mm kann mit einem einfachen Laufwechsel auf .300 BLK umgerüstet werden.

## Technische Daten
- Geschossdurchmesser: 7,82 mm (.308")
- Hülsenlänge: 34,70 mm
- Patronenlänge: 57,40 mm (passt in Standard-AR-15 Magazin)
- Geschossgewicht: 7,8–14,3 g (120–220 grain)
- Mündungsenergie: 1.300–1.800 J (Überschall), 600–750 J (Subsonic)
- Mündungsgeschwindigkeit: 670–720 m/s (Überschall), 300–320 m/s (Subsonic)

## Einsatzgebiete
Optimiert für Schalldämpfer-Einsatz in AR-15-Waffen. Mit schweren Subsonic-Geschossen (220gr) ist sie eine der leisesten Patronen im Kaliber .30. Überschall-Laborierungen bieten Leistung ähnlich der 7,62×39mm. In den USA populär für Heimverteidigung und Jagd auf kurze Distanzen.

## Verbreitung in der Schweiz
Wachsend bei AR-15-Besitzern, aber Schalldämpfer erfordern ABK Gross. Preise: CHF 1.50–3.00/Schuss. ABK Klein für Waffen in diesem Kaliber erforderlich.

## Varianten
- 125gr Supersonic: Standard-Überschalllaborierung
- 220gr Subsonic: Schweres Unterschall-Geschoss für Schalldämpfer
- 110gr V-MAX: Für Varminting/Jagd`,
  },
  {
    slug: '458-socom',
    bezeichnung: '.458 SOCOM',
    aliase: ['11,63×40mm'],
    typ: 'Büchse',
    entwickelt: '2000',
    entwickler: 'Marty ter Weeme / Tony Rumore (Teppo Jutsu / Tromix)',
    kurzbeschreibung: 'Grosskalibrige AR-15-Patrone. Für Spezialeinheiten entwickelt. Viel Energie auf kurze Distanz.',
    geschossdurchmesser: '11,63 mm',
    huelsenlaenge: '40,00 mm',
    standardenergie: '2.800–3.500 J',
    muzzleVelocity: '530–640 m/s',
    typischeWaffen: ['AR-15 (Lauf/Magazin tauschen)', 'Wilson Combat'],
    beschreibung: `Die .458 SOCOM wurde 2000 von Marty ter Weeme für die US Special Operations Command (SOCOM) entwickelt. Ziel war eine .45-Kaliber-Patrone, die in Standard-AR-15-Magazinen und auf AR-15/M4-Plattformen funktioniert — für maximale Stoppwirkung im Nahbereich.

## Technische Daten
- Geschossdurchmesser: 11,63 mm (.458")
- Hülsenlänge: 40,00 mm
- Patronenlänge: 57,40 mm (passt in AR-15 Magazin)
- Geschossgewicht: 16,2–26,0 g (250–400 grain)
- Mündungsenergie: 2.500–3.500 J
- Mündungsgeschwindigkeit: 500–600 m/s
- Magazinkapazität: 7 Schuss im Standard-AR-15 30er-Magazin

## Einsatzgebiete
Grosskaliberlösung für die AR-15-Plattform. Für die Jagd auf Grosswild auf kurze Distanzen (bis 150m). Als «Thumper»-Kaliber konzipiert — maximale Energie auf kurze Distanz. Subsonic-Laborierungen mit Schalldämpfer sehr leise.

## Verbreitung in der Schweiz
Sehr selten. Exotisches Kaliber für AR-15-Enthusiasten. Preise: CHF 4.00–8.00/Schuss. Munition oft nur per Import erhältlich.

## Varianten
- 300gr FTX: Standard-Jagdlaborierung (Hornady)
- 350gr Subsonic: Für Schalldämpfer
- 250gr Barnes TTSX: Kupfer-Jagdgeschoss`,
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
    beschreibung: `Die .40 S&W (Smith & Wesson) wurde 1990 gemeinsam von Smith & Wesson und Winchester als Reaktion auf das «FBI Miami Shootout» von 1986 entwickelt. Sie sollte die Lücke zwischen 9mm (zu schwach, so die damalige Meinung) und .45 ACP (zu gross, zu viel Rückstoss) schliessen.

## Technische Daten
- Geschossdurchmesser: 10,16 mm (.400")
- Hülsenlänge: 21,59 mm
- Patronenlänge: 28,83 mm
- Geschossgewicht: 10,0–11,7 g (155–180 grain)
- Mündungsenergie: 550–700 J
- Mündungsgeschwindigkeit: 320–380 m/s
- Maximaler Gasdruck: 2.250 bar (CIP)

## Einsatzgebiete
In den 1990er/2000er-Jahren Standard-Polizeikaliber in den USA. Das FBI wechselte 2015 zurück auf 9mm — seither rückläufige Verbreitung. Im IPSC-Sport relevant wegen des «Major Power Factor». Waffen in .40 S&W können mit einem Laufwechsel oft auf 9mm umgerüstet werden.

## Verbreitung in der Schweiz
Relativ selten. Einige IPSC-Schützen verwenden .40 S&W für Major-Division. Typische Waffen: Glock 22/35, SIG P226, CZ 75. Preise: CHF 0.70–1.20/Schuss.

## Varianten
- FMJ: Vollmantel für Training
- JHP: Hohlspitz für Dienst
- 155gr: Leichtere Laborierung, mehr Geschwindigkeit`,
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
    beschreibung: `Die 10mm Auto wurde 1983 vom schwedischen Waffen-Ingenieur Norma (nach Spezifikation von Jeff Cooper) entwickelt. Das FBI adoptierte sie 1989 als Dienstpatrone, stellte aber 1997 auf .40 S&W um — die 10mm war den meisten Agenten zu rückstosstark. Die 10mm Auto bleibt die leistungsstärkste Standard-Autopistolen-Patrone.

## Technische Daten
- Geschossdurchmesser: 10,16 mm (.400")
- Hülsenlänge: 25,20 mm
- Patronenlänge: 32,00 mm
- Geschossgewicht: 10,0–12,7 g (155–200 grain)
- Mündungsenergie: 750–1.000 J
- Mündungsgeschwindigkeit: 370–430 m/s
- Maximaler Gasdruck: 2.400 bar (CIP)

## Einsatzgebiete
Leistungsstärkstes Standard-Autopistolen-Kaliber. Für die Jagd mit Pistolen auf mittleres Wild beliebt (Glock 40 MOS). Outdoor- und Bärenland-Waffe in den USA. Im IPSC-Sport als «Major»-Kaliber anerkannt.

## Verbreitung in der Schweiz
Nischenprodukt für Grosskaliberfans. Typische Waffen: Glock 20/40, SIG P220, Dan Wesson 1911. Preise: CHF 1.00–2.00/Schuss.

## Varianten
- FMJ: Vollmantel für Training und Sport
- JHP: Hohlspitz für Jagd und Verteidigung
- Hard Cast: Blei-Flachkopf für Bärenschutz
- .40 S&W: Verkürzte/abgeschwächte Version der 10mm`,
  },
  {
    slug: '17-hmr',
    bezeichnung: '.17 HMR',
    aliase: ['.17 Hornady Magnum Rimfire', '4,5×39mmR'],
    typ: 'Kleinkaliber',
    entwickelt: '2002',
    entwickler: 'Hornady',
    kurzbeschreibung: 'Hochgeschwindigkeits-Kleinkaliber. Sehr flache Flugbahn, extrem genau auf 100–150m.',
    geschossdurchmesser: '4,37 mm',
    huelsenlaenge: '26,97 mm',
    standardenergie: '240–260 J',
    muzzleVelocity: '775–800 m/s',
    typischeWaffen: ['CZ 457', 'Tikka T1x', 'Ruger Precision Rimfire'],
    beschreibung: `Die .17 Hornady Magnum Rimfire (HMR) wurde 2002 von Hornady eingeführt. Sie basiert auf einer .22 WMR-Hülse, die auf 4,37mm (.17") Geschossdurchmesser verengt wurde. Das Ergebnis ist die flachste und schnellste Randfeuerpatrone auf dem Markt — ideal für Kleintier und Schädlingsbekämpfung auf mittlere Distanzen.

## Technische Daten
- Geschossdurchmesser: 4,37 mm (.172")
- Hülsenlänge: 27,00 mm
- Patronenlänge: 30,73 mm
- Geschossgewicht: 1,1–1,3 g (17–20 grain)
- Mündungsenergie: 250–350 J
- Mündungsgeschwindigkeit: 700–775 m/s
- System: Randfeuerzündung

## Einsatzgebiete
Schädlingsbekämpfung (Ratten, Krähen, Marder) auf Distanzen bis 150m. Die flache Flugbahn übertrifft .22 LR deutlich. Für Kleintier und Varminting in den USA sehr populär. Weniger verbreitet als .22 LR, aber präziser auf grössere Distanzen.

## Verbreitung in der Schweiz
Nischenprodukt. Typische Waffen: CZ 452, Anschütz 1517, Savage 93R17. Preise: CHF 0.40–0.60/Schuss. Deutlich teurer als .22 LR.

## Varianten
- 17gr V-MAX: Standard-Varminting-Geschoss (Polymerspitze)
- 20gr XTP: Schwereres Geschoss für bessere Windresistenz`,
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
    beschreibung: `Die .22 WMR (Winchester Magnum Rimfire, auch .22 Magnum) wurde 1959 von Winchester eingeführt. Sie ist die stärkste weit verbreitete Randfeuerpatrone und bietet deutlich mehr Energie als die .22 LR — bei moderatem Rückstoss und niedrigen Kosten. Sie schliesst die Lücke zwischen .22 LR und den Kleinstkaliber-Zentralfeuerpatronen.

## Technische Daten
- Geschossdurchmesser: 5,70 mm (.224")
- Hülsenlänge: 26,80 mm
- Patronenlänge: 34,29 mm
- Geschossgewicht: 1,9–2,6 g (30–40 grain)
- Mündungsenergie: 300–450 J
- Mündungsgeschwindigkeit: 550–640 m/s
- System: Randfeuerzündung

## Einsatzgebiete
Kleintier-Jagd und Schädlingsbekämpfung bis ca. 100m. Als Trainingspatrone für Revolver (S&W, Ruger SP101). Die .22 WMR bietet rund die doppelte Energie der .22 LR und ist für grössere Kleintiere (Fuchs, Dachs) besser geeignet.

## Verbreitung in der Schweiz
Weniger verbreitet als .22 LR und .17 HMR. Typische Waffen: Ruger Single Six, CZ 452, Winchester 94/22. Preise: CHF 0.20–0.40/Schuss.

## Varianten
- FMJ: Vollmantel für Training
- JHP: Hohlspitz für Jagd
- Poly Tip: Polymerspitze für schnelle Expansion
- Subsonic: Für leises Schiessen`,
  },
]
