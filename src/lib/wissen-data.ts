// ============================================================
// GunMarket.ch — src/lib/wissen-data.ts
// 100 Waffen + 30 Kaliber — Wikipedia-recherchiert
// Einfügen in: /Users/maurice/waffenmarkt/src/lib/wissen-data.ts
// ============================================================

export type Rechtsstatus = 'frei' | 'wes' | 'abk-klein' | 'ordonnanz'

export interface PriceGuide {
  gut: string
  sehrGut: string
  neuwertig: string
  sammler?: string
}

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
  youtubeStart?: number
  relatedSlugs?: string[]
  priceGuide?: PriceGuide
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
    inhalt: `Das Sturmgewehr 90, international als SIG 550 bekannt, ist seit 1990 die Standardwaffe der Schweizer Armee und gilt weltweit als eines der präzisesten und zuverlässigsten Sturmgewehre überhaupt. Über 450'000 Exemplare wurden an die Schweizer Armee geliefert, und die Waffe hat sich in drei Jahrzehnten Dienst als absolut feldtauglich bewiesen. Für Schweizer Schützen und Sammler ist das Stgw 90 weit mehr als ein Armeegewehr — es ist ein Stück nationale Identität.

Die Entwicklung des SIG 550 begann in den späten 1970er-Jahren, als die Schweizer Armee nach einem Nachfolger für das schwere Sturmgewehr 57 suchte. SIG in Neuhausen am Rheinfall erhielt den Auftrag, ein leichteres, moderneres Gewehr im NATO-Kaliber 5,56×45mm zu entwickeln. Die ersten Prototypen (SG 540/542) wurden bereits in den 1970ern getestet, doch erst das überarbeitete SG 550 erfüllte die strengen Schweizer Anforderungen. 1986 gewann SIG die Ausschreibung, und ab 1990 lief die Serienproduktion an. Die Waffe wurde vollständig in der Schweiz gefertigt — zunächst bei SIG, später bei Swiss Arms in Neuhausen.

Technisch arbeitet das Stgw 90 mit einem indirekten Gasdrucksystem und einem Drehkopfverschluss mit zwei Verriegelungswarzen. Das Gasdrucksystem ähnelt dem des AK-47 — ein langer Gaskolben treibt den Verschlussträger an — und nicht dem Direktgassystem des M16. Das macht die Waffe deutlich weniger empfindlich gegenüber Verschmutzung und Schmierung. Im Kaliber 5,56×45mm NATO (Schweizer Bezeichnung: Gewehrpatrone 90, GP90) verschiesst das Gewehr sowohl die Schweizer GP90 als auch NATO-Standardmunition. Das Magazin aus transparentem Kunststoff fasst 5, 10, 20 oder 30 Patronen und erlaubt eine schnelle visuelle Füllstandskontrolle. Zwei Magazine lassen sich seitlich zusammenstecken, was den Magazinwechsel im Feld massiv beschleunigt. Die Gesamtlänge beträgt 998mm, mit eingeklapptem Schaft 772mm, bei einem Gewicht von 4,1 kg leer. Die Feuerarten umfassen Einzelschuss, 3-Schuss-Feuerstoss und Dauerfeuer. Ab Werk wird jedes Gewehr auf maximal 11cm Streukreis auf 300 Meter geprüft — ein Wert, den viele zivile Präzisionsgewehre nicht erreichen.

Im Schweizer Kontext nimmt das Stgw 90 eine besondere Stellung ein. Jeder Schweizer Soldat erhält sein persönliches Sturmgewehr für die Dauer der Dienstpflicht und kann es nach dem Dienst als halbautomatische Version übernehmen. Die zivile Variante, die SG 550 PE (Privat-Einzelfeuer), wurde über 33'000 Mal verkauft und ist an Schweizer Schiesständen allgegenwärtig. Das Obligatorische Schiessen und das Feldschiessen werden regelmässig mit dem Stgw 90 absolviert. Die Waffe ist damit tief in der Schweizer Schiesstradition verankert. Neben der Standardversion existieren die kompaktere SG 551 (LB/SB) sowie die sehr kompakte SG 553, die als Stgw 04/07 bei Schweizer Spezialeinheiten im Einsatz ist. Die SG 553 wird auch international von Eliteeinheiten verwendet.

Der Preisguide für den Schweizer Markt 2026 zeigt folgendes Bild: Ein übernommenes Armeegewehr in gutem Zustand, also mit normalen Gebrauchsspuren aus dem Dienst, wird für CHF 600 bis 900 gehandelt. Exemplare in sehr gutem Zustand, mit wenig Schusszahlen und intaktem Finish, erzielen CHF 900 bis 1'400. Neuwertige oder ungeschossene PE 90 mit Originalverpackung und Zubehör liegen bei CHF 1'400 bis 2'200. Die kurze SG 553 erzielt als zivile Halbautomatversion deutlich höhere Preise, oft CHF 3'000 bis 5'000, da sie nur in kleinen Stückzahlen auf den Markt kommt.

Beim Kauf eines Stgw 90 sollte man vor allem den Lauf prüfen. Exemplare aus dem Dienst haben oft 1'000 bis 3'000 Schuss auf dem Zähler, was bei guter Pflege kein Problem darstellt. Kritisch sind Laufmündungen mit Beschädigungen vom Blindverschluss und ausgefranste Züge. Der Verschluss sollte leichtgängig arbeiten, und die Verriegelungswarzen dürfen keine übermässige Abnutzung zeigen. Beim Klappschaft auf Spiel prüfen — ein lockerer Schaft deutet auf starke Beanspruchung hin. Originalmagazine in gutem Zustand sind ein Plus, da Ersatzmagazine einzeln CHF 30 bis 50 kosten. Der Gasregler sollte sich leicht drehen lassen, sonst droht er festzukorrodieren.

Rechtlich ist das Stgw 90 als Ordonnanzwaffe klassifiziert. Der Erwerb setzt Schweizer Bürgerrecht oder eine Niederlassungsbewilligung C voraus. Ein Waffenerwerbsschein ist nicht erforderlich — es genügt ein Kaufvertrag zwischen Verkäufer und Käufer. Die vollautomatische Armeeversion darf nur als halbautomatische Variante in Privatbesitz gehalten werden. Der Umbau wird bei der Rückgabe durch die Armee durchgeführt.`,
    rechtsstatus: 'ordonnanz',
    typischeKaliber: ['5,56×45mm NATO'],
    tags: ['Ordonnanz', 'Sturmgewehr', 'Schweiz', 'SIG', 'Armee', 'Stgw90', 'PE90'],
    youtubeVideoId: 'IdCJNilFjVM',
    youtubeQuelle: 'Forgotten Weapons / Ian McCollum',
    relatedSlugs: ['stgw57', 'k31', 'sig-p226', 'steyr-aug'],
    priceGuide: { gut: "CHF 1200–1800", sehrGut: "CHF 1800–2500", neuwertig: "CHF 2500–3200" },
  },

  {
    slug: 'k31',
    titel: 'Karabiner 31 (K31)',
    kategorie: 'Ordonnanzwaffe',
    hersteller: 'SIG / W+F Bern',
    baujahr: '1931',
    kurzbeschreibung: 'Der legendäre Schweizer Karabiner mit Geradezugverschluss. Einer der genauesten Serienkarabiner aller Zeiten.',
    inhalt: `Der Karabiner 31, kurz K31, ist der wohl ikonischste Schweizer Karabiner und gilt bis heute als einer der präzisesten Serienkarabiner, die je gefertigt wurden. Von 1933 bis etwa 1974 war er die Ordonnanzwaffe der Schweizer Armee, und sein legendärer Ruf zieht Sammler und Sportschützen aus aller Welt an. Wer einen K31 in der Hand hält, spürt sofort die Qualität Schweizer Waffenbaukunst.

Die Entwicklung des K31 begann Ende der 1920er-Jahre in der Eidgenössischen Waffenfabrik Bern unter der Leitung von Oberst Adolf Furrer. Ziel war es, den Karabiner 1911 (K11) durch ein moderneres, kompakteres und vor allem schneller zu bedienendes Modell zu ersetzen. Der K31 übernahm das bewährte Geradezug-Prinzip des Schmidt-Rubin-Systems, konstruierte den Verschluss aber kompakter und kürzer. Die Serienproduktion lief von 1933 bis 1958, und insgesamt wurden rund 583'000 Stück gefertigt — ausschliesslich in der Waffenfabrik Bern. Jeder K31 wurde einzeln eingeschossen und musste strenge Präzisionsnormen erfüllen, bevor er an die Truppe ausgeliefert wurde.

Das Herzstück des K31 ist sein einzigartiger Geradezugverschluss. Anders als beim Mauser-System, das eine Dreh-Zug-Bewegung erfordert, wird der K31-Verschluss nur gerade zurückgezogen und vorgeschoben. Zwei Verriegelungswarzen am Verschlusskopf greifen durch eine kurze Drehung in den Verschlussring — diese Drehung wird aber automatisch durch die Geradebewegung des Kammergriffs erzeugt. Das Resultat: Der Schütze repetiert ohne Anheben des Kopfes und ohne Verschiebung des Zielpunkts, was eine deutlich höhere Feuerrate ermöglicht als vergleichbare Repetiergewehre der Epoche. Das Kaliber ist die leistungsstarke 7,5×55mm Swiss (GP11), die mit einer Mündungsgeschwindigkeit von rund 780 m/s und einem 11,3g-Geschoss eine flache Flugbahn und hohe Präzision auf grosse Distanzen bietet. Das abnehmbare Kastenmagazin fasst 6 Patronen und wird von oben mit Ladestreifen befüllt. Die Lauflänge beträgt 652mm, die Gesamtlänge 1'100mm bei einem Gewicht von 4,0 kg.

Im Schweizer Kontext ist der K31 tief verankert. Generationen von Schweizer Soldaten haben mit diesem Karabiner den Dienst absolviert, und am Feldschiessen wird auch heute noch auf 300 Meter mit dem K31 geschossen. Für Sportschützen ist der K31 ein preiswerter Einstieg ins Präzisionsschiessen auf lange Distanz — die GP11-Munition ist vergleichsweise günstig und die Präzision des K31 überraschend gut. Sammler schätzen besonders die Truppzettel, die sich unter dem Schaftblech finden: kleine Zettel mit dem Namen, der Einheit und dem Jahrgang des letzten Soldaten, der die Waffe trug. Neben dem Standard-K31 existieren die seltenen Scharfschützenversionen ZfK 31/42 und ZfK 31/43 mit montierten Zielfernrohren, von denen nur wenige hundert Stück gefertigt wurden.

Beim Preisguide Schweiz 2026 sieht der Markt wie folgt aus: K31 in gutem Zustand mit normalen Gebrauchsspuren, intaktem Lauf und funktionierendem Verschluss werden für CHF 300 bis 500 gehandelt. Exemplare in sehr gutem Zustand mit scharfen Zügen, wenig Schaftdellen und vollständiger Nummerierung erzielen CHF 500 bis 800. Ungeschossene oder nahezu neuwertige K31, die direkt aus dem Zeughaus kamen, liegen bei CHF 800 bis 1'200. Die seltenen Scharfschützenversionen ZfK 31/42 und 31/43 beginnen bei CHF 3'000 und können bei hervorragendem Zustand CHF 5'000 bis 8'000 erreichen. Diopter-Modelle und spezielle Versuchsausführungen sind ebenfalls stark nachgefragt.

Beim Kauf eines K31 sollte man zuerst den Lauf prüfen — mit einem Laufspiegel die Züge und Felder begutachten. Scharfe, klar definierte Züge deuten auf wenig Gebrauch hin. Ausgewaschene oder dunkle Züge zeigen starke Abnutzung oder mangelhafte Pflege. Den Verschluss auf Leichtgängigkeit prüfen und sicherstellen, dass die Verriegelungswarzen keine Grate oder Risse aufweisen. Die Nummerngleichheit ist ein wichtiger Wertfaktor: Schaft, System, Lauf und Magazin sollten die gleiche Seriennummer tragen. Ein K31 mit gemischten Nummern ist funktional einwandfrei, erzielt aber weniger am Sammlermarkt. Den Holzschaft auf Risse und Reparaturen prüfen — originaler Schaft in gutem Zustand steigert den Wert erheblich. Unter dem Schaftblech nach dem Truppzettel schauen, der für Sammler einen besonderen Reiz darstellt.

Rechtlich ist der K31 eine Ordonnanzwaffe der Kategorie C im Schweizer Waffengesetz. Der Erwerb setzt Schweizer Bürgerrecht oder eine Niederlassungsbewilligung C voraus. Ein Waffenerwerbsschein ist nicht nötig — ein einfacher Kaufvertrag zwischen den Parteien genügt. Der K31 ist als Repetiergewehr frei erwerbbar und unterliegt keiner Meldepflicht gegenüber der Kantonspolizei, solange der Kaufvertrag korrekt ausgefüllt und aufbewahrt wird.`,
    rechtsstatus: 'ordonnanz',
    typischeKaliber: ['7,5×55mm Swiss (GP11)'],
    tags: ['Ordonnanz', 'K31', 'Karabiner', 'Schweiz', 'Geradezug', 'Sammler', 'GP11'],
    youtubeVideoId: 'z4_mh4V_mus',
    youtubeQuelle: 'Simon Koeniger',
    youtubeStart: 629,
    relatedSlugs: ['stgw57', 'stgw90', 'sig-p210', 'k11'],
    priceGuide: { gut: "CHF 400–600", sehrGut: "CHF 600–900", neuwertig: "CHF 900–1200", sammler: "CHF 1500–3000" },
  },

  {
    slug: 'stgw57',
    titel: 'Sturmgewehr 57 (SIG 510)',
    kategorie: 'Ordonnanzwaffe',
    hersteller: 'SIG',
    baujahr: '1957',
    kurzbeschreibung: 'Vorgänger des Stgw 90. Robust, präzise — und mit 5,7 kg das schwerste Schweizer Ordonnanzgewehr.',
    inhalt: `Das Sturmgewehr 57, international als SIG SG 510 bekannt, war von 1957 bis 1990 die Ordonnanzwaffe der Schweizer Armee und geniesst bis heute einen exzellenten Ruf für Präzision und Robustheit. Mit einem Gewicht von 5,7 kg war es das schwerste Sturmgewehr seiner Ära, doch genau diese Masse trug zur hervorragenden Schussstabilität bei. Für Sammler und Schützen in der Schweiz ist das Stgw 57 ein begehrtes Stück Militärgeschichte.

Die Wurzeln des Stgw 57 reichen zurück in die deutsche Waffenentwicklung des Zweiten Weltkriegs. Das rollenverzögerte Verschlusssystem basiert auf dem Prinzip der StG 45 (Mauser), das später von CETME in Spanien und Heckler und Koch in Deutschland weiterentwickelt wurde. SIG in Neuhausen lizenzierte das System und passte es an das leistungsstarke Schweizer Kaliber 7,5×55mm GP11 an. Die Schweizer Armee nahm das Gewehr 1957 als Sturmgewehr 57 an — als eines der ersten Sturmgewehre weltweit, das gleichzeitig als leichtes Maschinengewehr eingesetzt werden konnte. Die Produktion lief von 1957 bis in die 1980er-Jahre, wobei rund 600'000 Stück für die Schweizer Armee und Exportkunden gefertigt wurden.

Technisch ist das Stgw 57 ein rollenverzögerter Rückstoßlader. Zwei Rollen im Verschlusskopf werden beim Verriegeln in Aussparungen im Laufträger gedrückt und verlangsamen die Verschlussöffnung durch mechanischen Nachteil. Das Resultat ist ein extrem weicher, kontrollierter Rückstoss trotz des leistungsstarken GP11-Kalibers. Das Stahlmagazin fasst 24 Patronen. Die Lauflänge beträgt 583mm bei einer Gesamtlänge von 1'016mm. Feuerarten sind Einzelschuss und Dauerfeuer mit einer Kadenz von 450 bis 600 Schuss pro Minute. Ein integriertes klappbares Zweibein erlaubt den Einsatz als leichtes Maschinengewehr. Der Winterabzug — ein vergrösserter Abzugsbügel — ermöglicht das Schiessen mit Handschuhen. Die Visierung reicht bis 640 Meter, und die Präzision des Stgw 57 auf diese Distanz ist bemerkenswert.

In der Schweiz hat das Stgw 57 Generationen von Soldaten geprägt. Wer zwischen 1957 und 1990 Militärdienst leistete, hat mit dem Stgw 57 geschossen, und viele erinnern sich an das markante Geräusch des rollenverzögerten Verschlusses. Die halbautomatische Zivilversion PE 57 war lange Zeit am Schweizer Markt erhältlich und wird an Schiesständen noch regelmässig verwendet. Sportschützen schätzen die Präzision, die mit GP11-Munition auf 300 Meter Gruppen unter 5 cm ermöglicht. Sammler suchen besonders nach vollständigen Exemplaren mit Originalzubehör wie Zweibein, Reinigungsgerät und Magazintasche. Die Exportversion SG 510-4 in 7,62×51mm NATO wurde an Chile, Bolivien und mehrere afrikanische Staaten verkauft.

Der Preisguide Schweiz 2026 für das Stgw 57 zeigt stabile bis leicht steigende Preise. Exemplare in gutem Zustand mit normalen Dienst-Gebrauchsspuren werden für CHF 600 bis 900 gehandelt. Waffen in sehr gutem Zustand mit intaktem Finish und scharfen Zügen erzielen CHF 900 bis 1'500. Neuwertige oder ungeschossene Stgw 57, etwa aus aufgelösten Zeughausbeständen, können CHF 1'500 bis 2'200 erreichen. Die PE 57 Zivilversion liegt preislich ähnlich, wobei Exemplare mit niedrigen Seriennummern einen Aufpreis erzielen. Originalmagazine in gutem Zustand sind mit CHF 20 bis 40 pro Stück vergleichsweise günstig.

Beim Kauf eines Stgw 57 ist der Lauf das wichtigste Prüfkriterium. GP11-Munition ist korrosiv, und schlecht gepflegte Exemplare zeigen Lochfrass im Lauf. Mit einem Laufspiegel die Züge auf Schärfe und Gleichmässigkeit prüfen. Den Verschluss auf Leichtgängigkeit testen — die Rollen müssen frei beweglich sein und dürfen keine Grate aufweisen. Das Zweibein auf Funktion prüfen, da die Scharniere bei vernachlässigten Waffen gerne festkorrodieren. Die Holzteile — Pistolengriff, Handschutz und Schaft — auf Risse und Ausbrüche kontrollieren. Nummerngleichheit ist auch hier ein Wertfaktor, wobei das Stgw 57 oft zeughausbedingte Teiletausche aufweist. Das Gasgestänge und den Gasregler auf Korrosion prüfen.

Rechtlich ist das Stgw 57 als Ordonnanzwaffe klassifiziert und fällt unter Kategorie C des Schweizer Waffengesetzes. Der Erwerb setzt Schweizer Bürgerrecht oder eine Niederlassungsbewilligung C voraus. Kein Waffenerwerbsschein nötig — ein Kaufvertrag genügt. Die vollautomatische Armeeversion darf nur als halbautomatische Variante in Privatbesitz sein.`,
    rechtsstatus: 'ordonnanz',
    typischeKaliber: ['7,5×55mm Swiss (GP11)'],
    tags: ['Ordonnanz', 'Stgw57', 'SIG', 'Schweiz', 'Sammler', 'GP11'],
    youtubeVideoId: 'mjMlEfDYTTI',
    youtubeQuelle: 'Andreas Schneider',
    youtubeStart: 336,
    relatedSlugs: ['k31', 'stgw90', 'sig-p210', 'hk-g3'],
    priceGuide: { gut: "CHF 800–1200", sehrGut: "CHF 1200–1800", neuwertig: "CHF 1800–2500", sammler: "CHF 3000–5000" },
  },

  {
    slug: 'sig-p210',
    titel: 'SIG P210 (Pistole 49)',
    kategorie: 'Ordonnanzwaffe',
    hersteller: 'SIG',
    baujahr: '1949',
    kurzbeschreibung: 'Die Schweizer Präzisionspistole. Ordonnanz der Armee 1949–1975. Heute Sammlerstück und Sportikone.',
    inhalt: `Die SIG P210 ist eine Legende unter den Pistolen und gilt weltweit als eine der präzisesten Serienpistolen, die je gebaut wurden. Als Ordonnanzpistole 49 diente sie von 1949 bis 1975 der Schweizer Armee, und ihr Ruf für Präzision und Verarbeitungsqualität hat sie zu einem der begehrtesten Sammlerstücke im Faustfeuerwaffen-Bereich gemacht. Wer eine P210 besitzt, hält ein Stück Schweizer Waffenbaukunst der Spitzenklasse in der Hand.

Die Entwicklung der P210 begann während des Zweiten Weltkriegs bei SIG in Neuhausen am Rheinfall. Charles Petter, ein französischer Ingenieur, hatte ein verbessertes Browning-Verschlusssystem entworfen, das SIG als Basis für die neue Pistole verwendete. Ab 1944 entstanden die ersten Prototypen unter der Bezeichnung SP 47/8. Die Schweizer Armee evaluierte die Waffe ausführlich und nahm sie 1949 als Pistole 49 an — als Nachfolgerin der Parabellum P06. Die Produktion lief bis 2006 bei SIG in Neuhausen, wobei jede einzelne Pistole von Hand eingepasst und auf dem Schiessstand geprüft wurde. Insgesamt wurden etwa 200'000 Stück gefertigt.

Das zentrale Konstruktionsmerkmal der P210 ist einzigartig in der Welt der Pistolen: Der Verschluss — also der Schlitten — läuft innen im Rahmen, nicht aussen wie bei praktisch allen anderen Pistolenmodellen. Diese umgekehrte Schlitten-Rahmen-Anordnung ergibt minimalstes Spiel zwischen den Teilen und damit eine Präzision, die ihresgleichen sucht. Das Kaliber ist 9×19mm im Armeestandard, alternativ 7,65×21mm Parabellum. Das Magazin fasst 8 Patronen. Der Abzug arbeitet im Single-Action-Modus (SA) mit einem Abzugsgewicht von nur 1,5 bis 2 kg — knackig, trocken und ohne Kriechweg. Die Lauflänge beträgt 120mm beim Standardmodell, die Gesamtlänge 215mm bei einem Gewicht von rund 900g. Jede P210 wurde mit Handarbeit eingepasst, was die hohen Herstellungskosten und den entsprechenden Preis erklärt.

In der Schweiz nimmt die P210 eine besondere Stellung ein. Neben dem Militärdienst wurde sie von zahlreichen Kantonspolizeien als Dienstwaffe geführt und war jahrzehntelang die Pistole der Wahl im Schweizer Pistolensport. Am 25- und 50-Meter-Schiessen ist die P210 eine Ikone. Die wichtigsten Varianten sind die P210-1 mit poliertem Rahmen und Holzgriffschalen, die P210-2 als sandgestrahlte Armeeversion, die P210-5 mit verlängertem 150mm-Lauf für den Sport, die P210-6 als meistverkauftes Sportmodell mit 120mm-Lauf, und die P210-7 in .22 LR für günstiges Training. Seit 2018 bietet SIG Sauer mit der P210 Target eine modernisierte Neuauflage an, die zwar die Grundform beibehält, aber mit modernen Fertigungsmethoden hergestellt wird.

Der Preisguide Schweiz 2026 für die P210 ist stark varianten- und zustandsabhängig. Eine P210-2 (Armeeversion) in gutem Zustand mit normalen Gebrauchsspuren wird für CHF 800 bis 1'400 gehandelt. Exemplare in sehr gutem Zustand mit intaktem Finish und scharfem Lauf erzielen CHF 1'400 bis 2'200. Die begehrte P210-6 in sehr gutem Zustand liegt bei CHF 2'000 bis 3'000. Die seltene P210-1 mit poliertem Rahmen und Originalholzgriff kann CHF 3'000 bis 5'000 erreichen. Neuwertige, ungeschossene Exemplare oder seltene Varianten wie die P210-5 mit langem Lauf werden für CHF 4'000 bis 8'000+ gehandelt. Die neue P210 Target von SIG Sauer kostet im Handel ab CHF 2'500 neu.

Beim Kauf einer P210 ist die Passung das wichtigste Kriterium. Den Schlitten auf dem Rahmen vor- und zurückbewegen — es darf praktisch kein Spiel spürbar sein. Jede P210 hat eine individuelle Passung, und nachgesetzte Teile können die Präzision ruinieren. Die Nummerngleichheit ist entscheidend: Rahmen, Schlitten und Lauf müssen die gleiche Nummer tragen. Den Lauf auf Verschleiss prüfen — bei einer Waffe, die für Präzision gebaut wurde, sind abgenutzte Züge besonders wertmindernd. Den Abzug testen: Er sollte trocken und ohne Spiel brechen. Die Griffschalen auf Risse prüfen — originale Holz- oder Kunststoffgriffe sind wertvoller als Ersatzteile. Beim Kauf einer Armeeversion darauf achten, ob es sich um eine Rückgabe oder einen freien Verkauf handelt — Armeerückgaben haben manchmal nachlässig überarbeitete Oberflächen.

Rechtlich fällt die P210 als ehemalige Ordonnanzpistole unter spezielle Regelungen. Armeemodelle (P210-2) sind als Ordonnanzwaffen klassifiziert — der Erwerb setzt Schweizer Bürgerrecht oder Niederlassungsbewilligung C voraus, ein Kaufvertrag genügt. Zivile Modelle (P210-1, -5, -6, -7) erfordern hingegen einen Waffenerwerbsschein (WES), da sie als gewöhnliche Faustfeuerwaffen gelten und unter Kategorie B fallen.`,
    rechtsstatus: 'ordonnanz',
    typischeKaliber: ['9×19mm', '7,65mm Parabellum'],
    tags: ['Ordonnanz', 'SIG', 'P210', 'P49', 'Schweiz', 'Sammler', 'Präzision'],
    youtubeVideoId: 'MFySDAvQG8M',
    youtubeQuelle: 'hickok45',
    relatedSlugs: ['k31', 'stgw57', 'sig-p226', 'luger-p08'],
    priceGuide: { gut: "CHF 1200–2000", sehrGut: "CHF 2000–3500", neuwertig: "CHF 3500–5000", sammler: "CHF 5000–12000" },
  },

  {
    slug: 'p06',
    titel: 'Parabellum P06 (Luger)',
    kategorie: 'Ordonnanzwaffe',
    hersteller: 'DWM / W+F Bern',
    baujahr: '1906',
    kurzbeschreibung: 'Die ikonische Kniehebelpistole. Schweizer Ordonnanzpistole 1906–1949. Heiss begehrtes Sammlerstück.',
    inhalt: `Die Parabellum P06, weltweit als Luger bekannt, ist eine der ikonischsten Handfeuerwaffen der Geschichte und war von 1906 bis 1949 die Ordonnanzpistole der Schweizer Armee. Ihr unverwechselbarer Kniehebelverschluss, die elegante Linienführung und die hervorragende Fertigungsqualität machen sie zu einem der begehrtesten Sammlerstücke überhaupt. Die Schweiz war 1900 der erste Staat weltweit, der die Parabellum als Militärpistole einführte — noch vor dem Deutschen Kaiserreich.

Die Geschichte der Parabellum beginnt mit Hugo Borchardt, der 1893 die Borchardt C-93 entwickelte — eine der ersten selbstladenden Pistolen. Georg Luger, ein österreichischer Ingenieur bei DWM (Deutsche Waffen- und Munitionsfabriken), überarbeitete Borchardts Konstruktion grundlegend und schuf eine kompaktere, handlichere Waffe. Er behielt den Kniehebelverschluss bei, verkürzte aber den Mechanismus und veränderte den Griffwinkel. Die Schweizer Armee testete die neue Pistole ab 1898 und führte sie 1900 als Ordonnanzpistole ein — im damals neuen Kaliber 7,65×21mm Parabellum, das Luger eigens für diese Waffe entwickelte. 1906 folgte die überarbeitete P06, und ab 1918 wurde die Produktion an die Eidgenössische Waffenfabrik Bern (W+F Bern) übertragen, die bis 1949 rund 30'000 Stück fertigte.

Technisch ist die Parabellum ein Rückstoßlader mit Kniehebelverschluss — ein System, das in der Waffengeschichte einzigartig geblieben ist. Beim Abfeuern bewegen sich Lauf und Verschluss kurz gemeinsam zurück, bevor der Kniehebel an einer Steuerkurve nach oben knickt und den Verschluss freigibt. Dieses System ermöglicht einen extrem flachen Griffwinkel von 55 Grad, der ein natürliches, instinktives Zielen erlaubt. Das Magazin fasst 8 Patronen im Kastenmagazin im Griff. Die ursprüngliche P06 verschoss 7,65×21mm Parabellum, die ab 1929 eingeführte P06/29 wurde auf 9×19mm umgestellt. Die Lauflänge beträgt 120mm beim Standardmodell, das Gewicht liegt bei 870g, die Gesamtlänge bei 222mm. Die Fertigungsqualität, insbesondere bei den Schweizer Exemplaren von W+F Bern, war aussergewöhnlich hoch — jedes Teil wurde von Hand eingepasst und poliert.

Im Schweizer Kontext ist die P06 ein Stück Militärgeschichte von besonderem Rang. Die Schweizer Parabellum-Pistolen von W+F Bern gelten unter Sammlern als die bestverarbeiteten aller Luger-Varianten weltweit. Die Produktion in Bern unter strengster Qualitätskontrolle resultierte in Waffen, die selbst nach über 100 Jahren noch tadellos funktionieren. Für Schweizer Sammler sind besonders die frühen P00 (Modell 1900) und die P06 mit niedrigen Seriennummern interessant. Das Schweizer Armeewappen auf dem Rahmen und die W+F-Markierung sind Erkennungszeichen, die den Wert erheblich steigern. Die P06 wurde 1949 durch die SIG P210 abgelöst, doch ihr Legendenstatus blieb ungebrochen.

Der Preisguide Schweiz 2026 für die P06 ist stark von Jahrgang, Variante und Zustand abhängig. Standardmässige P06 von W+F Bern in gutem Zustand, also funktionsfähig mit normalen Gebrauchsspuren und leicht abgegriffenem Finish, werden für CHF 1'200 bis 2'000 gehandelt. Exemplare in sehr gutem Zustand mit weitgehend intakter Brünierung und scharfem Lauf erzielen CHF 2'000 bis 3'500. Neuwertige oder ungeschossene P06 mit Originalholster und Zubehör können CHF 3'500 bis 6'000 erreichen. Besonders seltene frühe Modelle (P00, Baujahre 1900 bis 1906) oder Exemplare mit nachweisbarer Regimentsgeschichte können deutlich über CHF 8'000 gehandelt werden. Die P06/29 in 9mm liegt preislich leicht unter den 7,65mm-Modellen.

Beim Kauf einer P06 ist die Nummerngleichheit das A und O. Rahmen, Verschluss, Kniehebel, Schliessfeder, Seitenplatte und Magazin sollten die gleiche Seriennummer tragen. Gemischte Nummern deuten auf Teiletausche hin und mindern den Sammlerwert erheblich. Den Kniehebelmechanismus auf Leichtgängigkeit prüfen — er muss sauber auf- und zuklappen. Den Lauf auf Korrosion und Züge kontrollieren. Die Brünierung begutachten: Originale Schweizer Brünierung hat einen charakteristischen Blauton. Nachbrünierte Waffen sind deutlich weniger wert. Das Holzgriffstück auf Risse prüfen — originale Griffschalen mit Schweizer Kreuz sind wertsteigernd. Besondere Vorsicht bei "Zusammenbauten" aus verschiedenen Teilen, die als original verkauft werden.

Rechtlich ist die P06 als Ordonnanzwaffe der Kategorie C klassifiziert. Der Erwerb setzt Schweizer Bürgerrecht oder eine Niederlassungsbewilligung C voraus. Ein Waffenerwerbsschein ist nicht erforderlich — es genügt ein Kaufvertrag. Da die P06 vor 1900 respektive vor 1906 entwickelt wurde, fallen besonders alte Exemplare teilweise unter antike Waffen, was den Erwerb noch vereinfacht.`,
    rechtsstatus: 'ordonnanz',
    typischeKaliber: ['7,65×21mm Parabellum', '9×19mm'],
    tags: ['Ordonnanz', 'P06', 'Luger', 'Parabellum', 'Schweiz', 'Sammler', 'Kniehebel'],
    youtubeVideoId: 'xUNqg7i1Z3Y',
    youtubeQuelle: 'Verein Schweizer Armeemuseum',
    youtubeStart: 4245,
    priceGuide: { gut: "CHF 600–1000", sehrGut: "CHF 1000–1800", neuwertig: "CHF 1800–2500", sammler: "CHF 3000–8000" },
  },

  {
    slug: 'k11',
    titel: 'Karabiner 1911 (K11)',
    kategorie: 'Ordonnanzwaffe',
    hersteller: 'W+F Bern / SIG',
    baujahr: '1911',
    kurzbeschreibung: 'Vorgänger des K31. Schmidt-Rubin System mit Geradezugverschluss. Beliebtes Sammlerstück.',
    inhalt: `Der Karabiner Modell 1911, im Volksmund schlicht K11 genannt, gehört zu den prägenden Ordonnanzwaffen der Schweizer Militärgeschichte. Er steht für eine Epoche, in der die Schweiz waffentechnisch auf Augenhöhe mit den Grossmächten agierte und mit dem Schmidt-Rubin-System einen eigenständigen, technisch überlegenen Weg beschritt. Wer heute einen K11 in den Händen hält, hält ein Stück Schweizer Ingenieurskunst aus der Belle Époque, das in seiner Präzision und Verarbeitungsqualität noch immer beeindruckt.

Die Entwicklung des K11 geht auf die Arbeiten von Oberst Rudolf Schmidt und dem Ballistiker Eduard Rubin zurück, die bereits Ende des 19. Jahrhunderts den Geradezugverschluss für die Schweizer Armee konzipierten. Das Vorgängermodell, das Gewehr 1889, war das erste Seriengewehr mit diesem revolutionären Verschlusssystem. Über das Modell 1896/11 und das Infanteriegewehr 1911 wurde das System kontinuierlich verbessert, bis 1913 der Karabiner 1911 als verkürzte Variante für berittene Truppen, Artilleristen und Versorgungssoldaten eingeführt wurde. Die Produktion lief von 1913 bis 1933 bei der Eidgenössischen Waffenfabrik Bern (W+F Bern) und bei SIG in Neuhausen. Insgesamt wurden rund 135'000 Stück gefertigt, bevor der K31 den K11 als Standardwaffe ablöste.

Technisch zeichnet sich der K11 durch den Schmidt-Rubin-Geradezugverschluss aus. Anders als beim weit verbreiteten Mauser-System wird der Verschluss nicht gedreht und dann zurückgezogen, sondern ausschliesslich gerade nach hinten gezogen und wieder vorgeschoben. Die Verriegelung erfolgt über Stützwarzen, die sich beim Vorführen des Verschlusses in entsprechende Ausnehmungen im Hülsengehäuse drehen. Dieses Prinzip erlaubt ein deutlich schnelleres Repetieren als bei Drehverschlüssen, erfordert allerdings einen längeren Verschlussweg. Das Kaliber ist 7,5x55mm Swiss, verschossen wird die legendäre GP11-Patrone, die für ihre hervorragende Ballistik und Präzision bekannt ist. Der Lauf misst 590 mm und weist 12 Züge auf, was für die damalige Zeit ungewöhnlich viele waren und zur hohen Treffgenauigkeit beiträgt. Das abnehmbare Kastenmagazin fasst 6 Patronen und wird von oben über Ladestreifen befüllt. Die Gesamtlänge beträgt 1100 mm bei einem Gewicht von 3,9 kg. Die Visierung ist eine offene Kimme mit Korn, justierbar bis 1500 Meter.

Was den K11 besonders macht, ist die Kombination aus Präzision und Handhabungsgeschwindigkeit. In den Händen eines geübten Schützen lässt sich der Geradezugverschluss deutlich schneller betätigen als ein Mauser-Verschluss, was im damaligen militärischen Kontext ein erheblicher Vorteil war. Die Verarbeitungsqualität ist typisch schweizerisch: sauber gefräste Metallteile, passgenau eingesetzte Nussbaum-Schäfte und eine insgesamt sehr solide Konstruktion. Viele K11 tragen Truppenstempel und Einheitszuordnungen, die heute für Sammler von grossem Interesse sind. Die Ladestreifen-Befüllung funktioniert zuverlässig, und die GP11-Munition ist auch 2026 noch problemlos über Schweizer Händler erhältlich, was den K11 auch als Schiesswaffe praxistauglich macht.

Im Schweizer Kontext nimmt der K11 eine besondere Stellung ein. Er war die Waffe einer Generation, die zwischen den beiden Weltkriegen diente, und er steht im Schatten seines berühmteren Nachfolgers, des K31. Gerade deshalb ist der K11 bei Sammlern beliebt: Er ist weniger gehypt als der K31, historisch aber ebenso interessant und oft zu günstigeren Preisen erhältlich. In der Schweizer Schützentradition wird der K11 regelmässig an historischen Schiessanlässen und Veteranenmatches eingesetzt. Viele Exemplare stammen aus Armeebeständen und wurden nach der Ausmusterung an die Soldaten abgegeben oder über den Waffenhandel verkauft. Die eidgenössische Herkunft macht den K11 zu einem durch und durch schweizerischen Sammlerstück, das in keiner Ordonnanzsammlung fehlen sollte.

Der Preisrahmen für den K11 auf dem Schweizer Markt im Jahr 2026 lässt sich in drei Kategorien einteilen. In gutem Zustand, also mit Gebrauchsspuren, etwas nachgedunkeltem Schaft und leichten Oberflächenspuren am Metall, aber voll funktionsfähigem Verschluss und intakter Visierung, sind K11 für CHF 280 bis 400 zu haben. In sehr gutem Zustand, mit überwiegend erhaltenem Originalblau, sauberem Schaft ohne grössere Beschädigungen und gut lesbaren Stempeln, liegen die Preise bei CHF 400 bis 600. Neuwertige oder ungebrauchte Exemplare, die selten sind und oft aus Arsenalbeständen stammen, können CHF 600 bis 900 erzielen, insbesondere wenn sie mit Originalzubehör wie Bajonett, Mündungsschoner und Ladestreifen angeboten werden.

Beim Kauf eines K11 sollte man zunächst den Verschluss prüfen: Er muss leichtgängig laufen und sauber verriegeln. Der Lauf sollte mit einem Blick durch die Mündung auf Rostnarben und Verschleiss geprüft werden. Scharfe, klar definierte Züge deuten auf einen guten Lauf hin. Die Holzteile sind wichtig für den Sammlerwert: Originale Nussbaum-Schäfte mit Regimentsstempel und Soldatennummer sind wertvoller als Ersatzschäfte. Die Seriennummer auf dem Hülsengehäuse sollte mit der Nummer auf dem Verschluss übereinstimmen (nummerngleich). Nicht nummerngleiche Exemplare sind deutlich weniger wert. Zusätzlich lohnt es sich, auf den Zustand des Magazins zu achten und sicherzustellen, dass es original ist und nicht vom K31 stammt, da die Magazine nicht identisch sind.

Rechtlich ist der K11 als Ordonnanzwaffe der Schweizer Armee klassifiziert. Der Erwerb ist in der Schweiz für Schweizer Bürger und Personen mit Niederlassungsbewilligung C ohne Waffenerwerbsschein möglich. Es genügt ein Kaufvertrag mit Ausweiskopien beider Parteien. Für Personen mit Aufenthaltsbewilligung B oder andere Ausländer ist ein Waffenerwerbsschein (WES) beim kantonalen Waffenbüro zu beantragen. Der K11 unterliegt keiner Meldepflicht beim Kauf unter Schweizer Bürgern, muss aber bei Besitzwechsel korrekt dokumentiert werden. Die GP11-Munition ist frei erhältlich. Der K11 ist somit eine der am einfachsten zu erwerbenden historischen Schweizer Waffen und bietet einen ausgezeichneten Einstieg in die Welt der Ordonnanzwaffen.`,
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
    inhalt: `Das Vetterli-Gewehr Modell 1869 nimmt in der Waffengeschichte eine einzigartige Stellung ein: Es war das erste Repetiergewehr, das von einer Armee offiziell als Ordonnanzwaffe eingeführt wurde. Während die grossen europäischen Mächte noch mit Einzelladern wie dem Chassepot oder dem Dreyse-Zündnadelgewehr hantierten, verfügte die kleine Schweiz bereits über ein Mehrladergewehr mit elf Schuss im Röhrenmagazin. Diese technische Pionierleistung macht das Vetterli zu einem der bedeutendsten Sammlerstücke der Schweizer Militärgeschichte und zu einem begehrten Objekt für internationale Waffensammler.

Die Entwicklung des Vetterli geht auf Friedrich Vetterli zurück, einen Büchsenmacher und Ingenieur aus Neuhausen am Rheinfall, der bei der Schweizerischen Industrie-Gesellschaft (SIG) tätig war. Vetterli erkannte früh das Potenzial von Repetierwaffen und kombinierte bewährte Konstruktionsprinzipien auf innovative Weise. Er übernahm den Zylinderverschluss, der sich vom Dreyse-Prinzip ableitete, und paarte ihn mit einem Röhrenmagazin, das dem amerikanischen Henry-Gewehr nachempfunden war. Die Verwendung von Randfeuer-Patronen im Kaliber 10,4x38mm war ein weiteres Novum für Militärgewehre. Die Schweizer Bundesversammlung nahm das Gewehr 1868 an, und ab 1869 begann die Serienproduktion bei SIG in Neuhausen sowie bei der Eidgenössischen Waffenfabrik in Bern. Insgesamt wurden über 150'000 Exemplare in verschiedenen Ausführungen gefertigt.

Technisch betrachtet ist das Vetterli ein beeindruckendes Stück Handwerkskunst. Der Zylinderverschluss wird durch Anheben und Zurückziehen des Verschlussgriffs bedient, wobei die abgeschossene Hülse ausgeworfen wird. Beim Vorführen des Verschlusses wird eine neue Patrone aus dem Röhrenmagazin unter dem Lauf zugeführt. Das Magazin fasst elf Patronen, dazu kommt eine zwölfte im Patronenlager. Das Kaliber 10,4x38mm Randfeuer erzeugt eine moderate Rückstossenergie und war für die damalige Zeit ballistisch ausreichend. Der Lauf des Gewehrmodells misst 840 mm bei einer Gesamtlänge von 1310 mm. Das Gewicht beträgt rund 4,5 kg. Die Visierung besteht aus einer klappbaren Leitervisierung, die auf verschiedene Distanzen eingestellt werden kann. Die Karabinerversion hat einen verkürzten Lauf von 540 mm und war für berittene Truppen und Artilleristen vorgesehen.

Was das Vetterli besonders macht, ist nicht nur sein historischer Pionierstatus, sondern auch die handwerkliche Qualität der Fertigung. Die Metallteile sind sauber verarbeitet, die Nussbaumschäfte zeigen die typische schweizerische Sorgfalt. Die Randfeuer-Mechanik des Originalmodells 1869 ist dabei besonders interessant: Der Schlagbolzen trifft auf den Rand des Patronenbodens, nicht auf ein zentrales Zündhütchen. Dieses System wurde bei späteren Modellen aufgegeben. Das Modell 1869/71 brachte kleinere Verbesserungen, das Modell 1878 wurde auf 10,4mm Zentralfeuer umgerüstet, und das Modell 1881 war ein Versuchsmodell mit Rubin-Munition im kleineren Kaliber. Besonders selten und sammlerwürdig sind die frühen Originalmodelle 1869, die noch die Randfeuer-Konfiguration aufweisen.

Im Schweizer Kontext ist das Vetterli ein Symbol für den technologischen Fortschritt der jungen Eidgenossenschaft. Nur zwei Jahrzehnte nach der Gründung des Bundesstaates 1848 gelang es der Schweiz, eine waffentechnische Innovation hervorzubringen, die weltweit Beachtung fand. Das Vetterli-System wurde auch nach Italien exportiert, wo es als Fucile Vetterli-Vitali in abgewandelter Form übernommen wurde. In der Schweiz selbst blieb das Vetterli bis zur Einführung des Schmidt-Rubin-Systems 1889 im Dienst und wurde danach schrittweise ausgemustert. Viele Exemplare landeten in privaten Händen oder wurden zu Scheibengewehren umgebaut. Die Schweizer Schützentradition hat dafür gesorgt, dass zahlreiche Vetterli-Gewehre erhalten geblieben sind, auch wenn der Zustand stark variiert.

Die Munitionsfrage ist beim Vetterli ein zentrales Thema. Die originale 10,4x38mm Randfeuer-Munition wird seit über hundert Jahren nicht mehr hergestellt. Für Sammler, die ihr Vetterli auch schiessen möchten, gibt es spezialisierte Anbieter, die Randfeuer-Patronen in Kleinserie fertigen, allerdings zu hohen Stückpreisen. Die auf Zentralfeuer umgebauten Modelle 1878 sind in dieser Hinsicht praktischer, da für diese Patronen leichter Hülsen und Komponenten zum Wiederladen beschafft werden können. Wer ein Vetterli primär als Sammlerstück erwirbt, muss sich um die Munitionsfrage weniger kümmern.

Der Preisrahmen für Vetterli-Gewehre auf dem Schweizer Markt 2026 staffelt sich wie folgt. In gutem Zustand, also mit deutlichen Gebrauchsspuren, nachgedunkeltem oder repariertem Schaft und funktionsfähiger Mechanik, sind Vetterli-Gewehre für CHF 250 bis 450 erhältlich. In sehr gutem Zustand, mit überwiegend erhaltenem Originalfinish, sauberem Schaft und gut lesbaren Stempeln, liegen die Preise bei CHF 450 bis 800. Herausragende Exemplare, insbesondere frühe Modelle 1869 im Originalzustand mit Randfeuer-Mechanik und vollständiger Stempelung, können CHF 800 bis 1'400 erzielen. Karabinerversionen und seltene Varianten wie das Scharfschützenmodell sind tendenziell teurer.

Beim Kauf eines Vetterli sollte man besonders auf den Zustand des Röhrenmagazins achten, da dieses anfällig für Dellen und Verformungen ist, die die Funktion beeinträchtigen. Der Verschluss muss sauber laufen und der Schlagbolzen intakt sein. Bei Randfeuer-Modellen ist die Funktionsfähigkeit des Schlagbolzens besonders zu prüfen, da dieser anders positioniert ist als bei Zentralfeuer-Waffen. Der Lauf sollte auf Rostnarben und Verschleiss kontrolliert werden. Die Holzteile sind bei einem über 150 Jahre alten Gewehr naturgemäss oft beansprucht. Originale Schäfte ohne Risse oder Reparaturen steigern den Wert erheblich. Die Seriennummer und Stempel sind wichtig für die Zuordnung zum Produktionszeitraum und Hersteller.

Rechtlich ist das Vetterli-Gewehr in der Schweiz als Waffe vor 1871 klassifiziert, sofern es sich um ein Originalmodell 1869 handelt. Waffen, die vor 1871 konstruiert wurden, sind in der Schweiz frei erhältlich und erfordern weder einen Waffenerwerbsschein noch einen Kaufvertrag. Es genügt, dass beide Parteien handlungsfähig und volljährig sind. Spätere Modelle wie das 1878 oder 1881 fallen hingegen unter die Ordonnanzwaffen-Regelung und erfordern für Schweizer Bürger und Personen mit C-Bewilligung lediglich einen Kaufvertrag. Das Vetterli 1869 ist damit eine der wenigen historischen Waffen, die in der Schweiz ohne jegliche bürokratische Hürde erworben werden können, was es besonders für Einsteiger in die Welt der historischen Waffen attraktiv macht.`,
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
    inhalt: `Die SIG Sauer P226 gilt seit über vier Jahrzehnten als eine der besten Kampfpistolen der Welt. Sie vereint schweizerisch-deutsche Ingenieurskunst mit kompromissloser Zuverlässigkeit und wurde zur Standardwaffe von Eliteeinheiten auf der ganzen Welt. Für Schweizer Schützen hat die P226 eine besondere Bedeutung, denn sie trägt das Erbe der SIG-Werke in Neuhausen am Rheinfall in sich, auch wenn die Produktion heute grösstenteils in Deutschland und den USA stattfindet.

Die Geschichte der P226 beginnt in den frühen 1980er Jahren, als die US-Armee eine neue Dienstpistole suchte, um die alternde Colt M1911 im Kaliber .45 ACP abzulösen. SIG Sauer entwickelte die P226 als Weiterentwicklung der bewährten P220 und reichte sie bei der XM9-Ausschreibung ein. Technisch schnitt die P226 am besten ab, sie bestand alle Tests ohne eine einzige Funktionsstörung. Den Zuschlag erhielt jedoch Beretta mit der 92F, da diese im Stückpreis günstiger war. Diese Niederlage erwies sich paradoxerweise als Segen für SIG Sauer: Die US Navy SEALs, die von der Zuverlässigkeit der P226 überzeugt waren, wählten sie als eigene Dienstpistole. Im Laufe der folgenden Jahre übernahmen zahlreiche weitere Eliteeinheiten die P226, darunter die britischen SAS, die deutsche GSG9, verschiedene FBI-Abteilungen und zahlreiche Polizeibehörden weltweit. Die P226 wurde zum Inbegriff der professionellen Kampfpistole.

Technisch basiert die P226 auf dem Prinzip des verriegelten Kurzhub-Rückstossladers mit modifiziertem Browning-Verschluss. Der Lauf ist über einen Verriegelungsblock mit dem Schlitten verbunden und entriegelt sich beim Rückstoss durch eine Steuerkurve am Laufende. Das Kaliber ist primär 9x19mm Parabellum, es gibt jedoch auch Versionen in .40 S&W und .357 SIG. Das doppelreihige Magazin fasst 15 Patronen im Kaliber 9mm, was gegenüber der einreihigen P220 eine deutliche Kapazitätssteigerung darstellt. Der Lauf misst 112 mm, die Gesamtlänge beträgt 196 mm, und das Leergewicht liegt bei 844 Gramm. Der Abzug arbeitet im DA/SA-Modus: Der erste Schuss kann mit langem, schwerem Spannabzug (Double Action) abgefeuert werden, alle folgenden Schüsse erfolgen im kurzen, leichten Single-Action-Modus. Ein Entspannhebel (Decocking Lever) auf der linken Seite erlaubt das sichere Entspannen des Hahns, ohne den Abzug zu betätigen. Einen manuellen Sicherungshebel gibt es bewusst nicht, die Sicherheit wird durch den langen DA-Erstschuss und die Schlagbolzensicherung gewährleistet.

Was die P226 besonders auszeichnet, ist die Verarbeitungsqualität. Der Stahlschlitten sitzt auf einem Rahmen aus eloxiertem Leichtmetall, was eine optimale Balance zwischen Gewicht und Rückstossdämpfung ergibt. Die Passgenauigkeit zwischen Schlitten und Rahmen ist minimal, was sich in einer hervorragenden Präzision niederschlägt. Die Oberflächenbehandlung, je nach Modell Nitron-Beschichtung oder Phosphatierung, bietet exzellenten Korrosionsschutz. Die Ergonomie des Griffs gilt als vorbildlich und die P226 liegt auch in kleineren Händen gut. Der SRT-Abzug (Short Reset Trigger), der bei neueren Modellen serienmässig verbaut ist, verkürzt den Abzugsweg im SA-Modus erheblich und ermöglicht schnellere Folgeschüsse.

Im Schweizer Kontext ist die P226 vor allem bei Sportschützen und bei kantonalen Polizeikorps verbreitet. Verschiedene Schweizer Polizeieinheiten führten oder führen die P226 als Dienstwaffe. Auf dem zivilen Markt ist sie bei IPSC-Schützen und allgemein bei Pistolenschützen beliebt, die eine zuverlässige, präzise und hochwertig verarbeitete Waffe suchen. Die P226 wird in der Schweiz über autorisierte Händler vertrieben. Die X-Five-Variante ist im Sportbereich besonders geschätzt und wird auch für Wettkämpfe der Stufe A eingesetzt. Die Verfügbarkeit von Ersatzteilen und Zubehör ist in der Schweiz über den Fachhandel gut gewährleistet.

Die wichtigsten Varianten der P226 sind die Standard-Nitron-Ausführung, die MK25 (die Navy-SEAL-Version mit Phosphatbeschichtung, Ankermarkierung und Picatinny-Rail), die Legion-Serie (eine Premium-Ausführung mit G10-Griffschalen, SRT-Abzug und verbesserter Ergonomie) sowie die X-Five (eine Sportversion mit verlängertem Lauf, Balancegewicht und Single-Action-Abzug). Die neueren Modelle verfügen über eine Picatinny-Rail für Lichtmodule und Laser.

Preislich bewegt sich die P226 auf dem Schweizer Markt 2026 in folgendem Rahmen. Gebrauchte Exemplare in gutem Zustand, also funktionsfähig mit normalen Gebrauchsspuren am Finish, aber intaktem Abzugssystem und zuverlässiger Funktion, kosten CHF 650 bis 900. In sehr gutem Zustand, mit wenig Tragespuren, sauberem Lauf und gepflegtem Gesamtbild, liegen die Preise bei CHF 900 bis 1'300. Neuwertige oder wenig geschossene Exemplare, insbesondere die Legion- oder MK25-Varianten, erzielen CHF 1'300 bis 1'800. Die X-Five-Sportversion liegt neu bei rund CHF 2'200 bis 2'800. Neupreise für die Standard-P226 liegen 2026 bei etwa CHF 1'200 bis 1'500.

Beim Kauf einer gebrauchten P226 sollte man besonders auf den Verschleiss an der Verriegelung achten: Ein ausgeschlagener Verriegelungsblock kann die Präzision beeinträchtigen. Der Abzug sollte in beiden Modi sauber brechen, ohne Kratzen oder Schleifen. Die Magazinfeder sollte noch ausreichend Spannung haben, da ermüdete Federn zu Zuführstörungen führen können. Originalmagazine sind wertvoller als Nachbauten. Der Lauf sollte scharfe Züge und Felder aufweisen. Ein Blick auf die Schlitteninnenseite gibt Aufschluss über die Schussbelastung: Starke Abriebspuren deuten auf hohe Schusszahlen hin. Bei älteren Modellen ohne Picatinny-Rail ist der Anbau von Lichtmodulen nur über Adapter möglich.

Rechtlich erfordert der Erwerb einer SIG P226 in der Schweiz einen Waffenerwerbsschein (WES). Dieser wird beim kantonalen Waffenbüro beantragt und setzt voraus, dass keine Einträge im Strafregister vorliegen, kein Hinweis auf Selbst- oder Fremdgefährdung besteht und der Antragsteller mindestens 18 Jahre alt ist. Schweizer Bürger und Personen mit C-Bewilligung erhalten den WES in der Regel innerhalb weniger Wochen. Für EU-Bürger mit B-Bewilligung gelten zusätzliche Anforderungen. Die P226 darf nach Erwerb zu Hause aufbewahrt werden, wobei die Munition separat gelagert werden muss, wenn die Waffe nicht in einem Waffenschrank verwahrt wird. Für das Schiessen auf bewilligten Schiessanlagen ist keine weitere Bewilligung nötig. Der Transport zum Schiessstand muss auf direktem Weg und mit entladener, gesicherter Waffe erfolgen.`,
    rechtsstatus: 'wes',
    typischeKaliber: ['9×19mm', '.40 S&W', '.357 SIG'],
    tags: ['Pistole', 'SIG', 'P226', 'Polizei', 'DA/SA', 'SEALs'],
    relatedSlugs: ['sig-p210', 'glock-17', 'hk-usp', 'beretta-92'],
    priceGuide: { gut: "CHF 500–800", sehrGut: "CHF 800–1200", neuwertig: "CHF 1200–1600" },
  },

  {
    slug: 'sig-p320',
    titel: 'SIG Sauer P320',
    kategorie: 'Pistole',
    hersteller: 'SIG Sauer',
    baujahr: '2014',
    kurzbeschreibung: 'Modulare Pistole. Seit 2017 die neue US-Army Pistole (M17). Austauschbarer Griffrahmen.',
    inhalt: `Die SIG Sauer P320 markiert einen Paradigmenwechsel im modernen Pistolenbau. Mit ihrem revolutionären modularen Konzept, bei dem das serialisierte Waffenstück ein herausnehmbares Stahlchassis ist, hat sie die Art und Weise verändert, wie Pistolen konfiguriert und angepasst werden. Der Gewinn der Ausschreibung der US-Armee im Jahr 2017 als M17/M18 hat die P320 endgültig als eine der wichtigsten Militärpistolen des 21. Jahrhunderts etabliert. Auch auf dem Schweizer Markt erfreut sich die P320 wachsender Beliebtheit bei Sport- und Freizeitschützen.

Die Entwicklungsgeschichte der P320 beginnt um 2012, als SIG Sauer eine striker-fired Pistole entwickelte, die das Erbe der P250 antreten sollte. Die P250, die ebenfalls über ein modulares Chassis verfügte, hatte sich am Markt nicht durchsetzen können, weil sie einen reinen Double-Action-Abzug besass, der im Vergleich zu Glock und anderen Striker-Pistolen als Nachteil empfunden wurde. Die P320 übernahm das modulare Chassis-Konzept, wechselte aber zu einem Schlagbolzenschloss-System (Striker), das einen deutlich kürzeren und leichteren Abzug ermöglichte. 2014 wurde die P320 offiziell vorgestellt. 2017 gewann sie als M17 (Full-Size) und M18 (Compact) die Modular Handgun System-Ausschreibung der US-Armee und löste damit die Beretta M9 ab, die seit 1985 im Dienst war. Dies war das erste Mal seit über 30 Jahren, dass die US-Streitkräfte eine neue Standardpistole einführten.

Das technische Herzstück der P320 ist die Fire Control Unit (FCU), ein serialisiertes Stahlchassis, das die Abzugsgruppe, den Schlagbolzen und alle wesentlichen Funktionskomponenten enthält. Dieses Chassis kann aus dem Polymergriffmodul herausgenommen und in ein anderes Griffmodul eingesetzt werden, etwa von Full-Size auf Compact oder Subcompact. Da waffenrechtlich nur das Chassis die Waffe darstellt, sind Griffmodule, Schlitten und Läufe als Zubehör klassifiziert und können ohne weitere Formalitäten getauscht werden. Die P320 im Full-Size-Format verschiesst 9x19mm aus einem doppelreihigen Magazin mit 17 Patronen. Die Lauflänge beträgt 119 mm bei der Full-Size-Version, 99 mm bei der Compact und 91 mm bei der Subcompact. Das Leergewicht der Full-Size liegt bei 833 Gramm. Der modifizierte Browning-Verschluss sorgt für eine sichere Verriegelung. Neben 9mm ist die P320 auch in .40 S&W, .357 SIG und .45 ACP erhältlich, wobei 9mm die mit Abstand populärste Variante ist.

Was die P320 besonders macht, ist die beispiellose Modularität. Ein Schütze kann mit einer einzigen registrierten Waffe verschiedene Konfigurationen nutzen: Full-Size für den Schiessstand, Compact für verdecktes Tragen, Subcompact als Backup. Der Wechsel dauert wenige Minuten und erfordert kein Werkzeug. Die Abzugscharakteristik der P320 wird allgemein als eine der besten unter den Striker-Pistolen bewertet: kurzer Vorlauf, sauberes Brechen und ein definierter Reset. Die P320 verfügt über keine manuellen Sicherungshebel in der Standardkonfiguration, die M17/M18-Militärversionen haben jedoch einen manuellen Sicherungshebel auf Anforderung der US-Armee erhalten. Die Zuverlässigkeit ist hervorragend, was durch die bestandenen Militärtests mit über 12'000 Schuss ohne Störung dokumentiert ist.

Im Schweizer Kontext gewinnt die P320 zunehmend an Bedeutung. Sie ist bei Sportschützen beliebt, die eine vielseitige Plattform suchen, und wird auch von einigen Sicherheitsdiensten evaluiert. Die X-Five-Legion-Variante mit Tungsten-Griffmodul hat sich als ernsthafte Wettkampfpistole etabliert und wird bei IPSC-Matches und anderen Pistolenwettbewerben eingesetzt. Die Verfügbarkeit verschiedener Griffmodule, darunter das AXG-Aluminiumgriffmodul und diverse Aftermarket-Optionen, macht die P320 zu einer Plattform, die sich individuell auf die Bedürfnisse des Schützen anpassen lässt. In der Schweiz werden P320-Modelle über den autorisierten Fachhandel vertrieben, und die Ersatzteilversorgung ist gut.

Die Variantenvielfalt der P320 ist beachtlich. Die M17 in Coyote Tan ist die US-Armee-Standardversion mit manuellem Sicherungshebel. Die M18 ist die kompaktere Version für die US Marines. Die X-Five Legion ist eine Wettkampfpistole mit schwerem Tungsten-Griffmodul für reduzierte Mündungsbewegung. Die AXG-Serie ersetzt den Polymergriff durch ein Aluminiumgriffmodul, was der Waffe ein solideres Gefühl und bessere Balance verleiht. Die Spectre-Serie bietet Premium-Features wie einen integrierten Kompensator und spezielle Grifftexturen. Die P320 XTEN erweitert das System ins Kaliber 10mm Auto. Alle diese Varianten teilen die gleiche FCU als Basis.

Auf dem Schweizer Markt 2026 liegen die Preise für gebrauchte P320-Pistolen wie folgt. In gutem Zustand, funktionsfähig mit normalen Gebrauchsspuren, kostet eine P320 CHF 550 bis 750. In sehr gutem Zustand, mit wenig Tragespuren und gepflegtem Lauf, liegen die Preise bei CHF 750 bis 1'000. Neuwertige Exemplare oder wenig geschossene Modelle erzielen CHF 1'000 bis 1'400. Die X-Five Legion liegt gebraucht bei CHF 1'200 bis 1'600, neu bei rund CHF 1'800 bis 2'200. Die M17/M18-Militärversionen sind bei Sammlern beliebt und erzielen ähnliche Preise wie die Legion-Modelle. Neupreise für die Standard-P320 beginnen bei etwa CHF 850.

Beim Kauf einer gebrauchten P320 ist der Zustand der FCU das Wichtigste. Das Chassis sollte keine Risse oder Verformungen aufweisen. Der Abzug muss sauber brechen und der Striker-Reset klar spürbar sein. Die Polymergriffmodule sollten auf Risse an den Schienennuten geprüft werden, insbesondere bei älteren Modellen. Es gab bei frühen P320-Produktionen Berichte über unbeabsichtigte Schussabgaben bei Sturz, was SIG Sauer durch ein freiwilliges Upgrade-Programm mit verbessertem Abzugsmechanismus behoben hat. Beim Gebrauchtkauf sollte man prüfen, ob das Upgrade durchgeführt wurde, erkennbar an der modifizierten Abzugsstange. Originalmagazine von SIG sind den Nachbauten vorzuziehen.

Rechtlich benötigt man für den Erwerb einer P320 in der Schweiz einen Waffenerwerbsschein (WES). Dieser wird beim kantonalen Waffenbüro beantragt. Die Voraussetzungen sind dieselben wie bei anderen Faustfeuerwaffen: Mindestalter 18, kein Strafregistereintrag, keine Hinweise auf Selbst- oder Fremdgefährdung. Die Bearbeitungszeit beträgt in der Regel zwei bis vier Wochen. Wichtig zu wissen: Zusätzliche Griffmodule, Schlitten und Läufe können ohne WES erworben werden, da nur die FCU als Waffe gilt. Dies macht die P320 in der Schweiz besonders attraktiv, da man die Konfiguration ohne bürokratischen Aufwand ändern kann. Die Aufbewahrung zu Hause unterliegt den üblichen Vorschriften für Faustfeuerwaffen.`,
    rechtsstatus: 'wes',
    typischeKaliber: ['9×19mm', '.40 S&W', '.45 ACP'],
    tags: ['Pistole', 'SIG', 'P320', 'M17', 'US-Army', 'Modular', 'Striker'],
    relatedSlugs: ['glock-17', 'sig-p226', 'hk-vp9', 'walther-ppq'],
  },

  {
    slug: 'glock-17',
    titel: 'Glock 17',
    kategorie: 'Pistole',
    hersteller: 'Glock',
    baujahr: '1982',
    kurzbeschreibung: 'Die revolutionäre Kunststoffpistole. Meistverkaufte Pistole weltweit. 34 Teile, extrem zuverlässig.',
    inhalt: `Die Glock 17 ist die meistverkaufte Pistole der Welt und hat den modernen Pistolenbau wie kaum eine andere Waffe geprägt. Was 1982 als unkonventioneller Entwurf eines branchenfremden Ingenieurs begann, wurde innerhalb weniger Jahrzehnte zum globalen Standard für Militär, Polizei und Zivilisten. Die Kombination aus Polymerrahmen, Striker-Abzug und radikaler Einfachheit war revolutionär und ist bis heute das Konzept, an dem sich alle anderen Dienstpistolen messen lassen müssen. Auch in der Schweiz gehört die Glock 17 zu den beliebtesten Faustfeuerwaffen auf dem zivilen Markt.

Die Entstehungsgeschichte der Glock 17 ist ungewöhnlich. Gaston Glock, ein österreichischer Ingenieur und Unternehmer, der zuvor Vorhangstangen, Messergriffe und Feldspaten produzierte, erfuhr 1980 von der Ausschreibung des österreichischen Bundesheeres für eine neue Dienstpistole. Ohne jegliche Erfahrung im Waffenbau begann er, eine Pistole zu konstruieren, die alle Anforderungen der Ausschreibung optimal erfüllen sollte. Er befragte führende Schiesstrainer und Militärexperten und entwarf eine Waffe, die konsequent auf Einfachheit, Zuverlässigkeit und geringe Herstellungskosten ausgelegt war. Der Einsatz von Polymer für den Rahmen war zu dieser Zeit höchst unkonventionell und stiess zunächst auf Skepsis. 1982 gewann die Glock 17 jedoch die österreichische Ausschreibung gegen etablierte Hersteller wie SIG Sauer, Beretta und Heckler und Koch. Der Name 17 bezieht sich auf Glocks siebzehntes Patent, nicht auf die Magazinkapazität, obwohl das Standardmagazin zufälligerweise ebenfalls 17 Patronen fasst.

Technisch ist die Glock 17 ein Kurzhub-Rückstosslader mit modifiziertem Browning-Verschluss. Der Lauf verriegelt sich über einen rechteckigen Verriegelungsblock mit dem Schlitten und wird beim Rückstoss durch eine Steuerkurve abgekippt. Das Kaliber ist 9x19mm Parabellum. Der Lauf misst 114 mm, die Gesamtlänge beträgt 186 mm bei der aktuellen Gen5, und das Leergewicht liegt bei lediglich 625 Gramm, was die Glock 17 zu einer der leichtesten Full-Size-Pistolen macht. Das Safe-Action-Abzugssystem ist ein teilgespanntes Schlagbolzenschloss: Der Striker wird beim Durchladen nur teilweise gespannt und erst beim Betätigen des Abzugs vollständig gespannt und ausgelöst. Drei passive Sicherungen arbeiten zusammen: die Abzugssicherung (ein Hebel im Abzugszüngel, der gedrückt werden muss), die Schlagbolzensicherung (ein federbelasteter Stift, der den Striker blockiert, bis der Abzug fast vollständig durchgezogen ist) und die Fallsicherung (eine Raste, die den Abzugsstollen bei Erschütterung fixiert). Einen manuellen Sicherungshebel gibt es nicht. Die gesamte Pistole besteht aus nur 34 Teilen, weniger als jede andere moderne Dienstpistole.

Was die Glock 17 besonders macht, ist die kompromisslose Fokussierung auf Zuverlässigkeit und Einfachheit. In Dauertests hat die Glock 17 über 300'000 Schuss ohne Funktionsstörung überstanden. Sie funktioniert unter extremsten Bedingungen: nach Eintauchen in Schlamm, Sand, Salzwasser und bei Temperaturen von minus 40 bis plus 70 Grad Celsius. Die Zerlegung zur Reinigung erfolgt werkzeuglos in Sekunden. Die Austauschbarkeit der Teile ist so hoch, dass Komponenten verschiedener Glock-17-Pistolen ohne Anpassung untereinander getauscht werden können. Der Polymerrahmen ist korrosionsfrei, leichter als Aluminium und absorbiert Rückstossenergie. Die Fertigungskosten sind dank des Spritzgussverfahrens für den Rahmen und der geringen Teilezahl niedrig, was sich in einem attraktiven Verkaufspreis niederschlägt.

Die Glock 17 hat im Laufe ihrer Geschichte fünf Generationen durchlaufen. Die Gen1 von 1982 war das Originalmodell mit glattem Griff. Die Gen2 von 1988 erhielt eine texturierte Griffoberfläche. Die Gen3 von 1998 führte Fingermulden und eine Picatinny-Rail für Lichtmodule ein. Die Gen4 von 2010 brachte austauschbare Griffrücken in verschiedenen Grössen und eine doppelseitige Magazinhalterung. Die aktuelle Gen5 von 2017 verzichtet auf die Fingermulden für universellere Ergonomie, hat einen verbesserten Lauf mit Marksman-Profil und eine leicht modifizierte Oberfläche des Schlittens. Neben der Standard-Glock-17 gibt es die Glock 17L mit verlängertem 153-mm-Lauf für Sportschützen, die Glock 17 MOS mit gefräster Schlittenoberseite für die Montage von Rotpunktvisieren und die Glock 17C mit Kompensatorschlitzen in Lauf und Schlitten zur Reduzierung des Mündungshochschlags.

Im Schweizer Kontext ist die Glock 17 eine der am häufigsten gehandelten Pistolen auf dem Gebrauchtmarkt. Sie wird von zahlreichen Sportschützen geschätzt, die ihre Zuverlässigkeit und die niedrigen Betriebskosten zu schätzen wissen. Auch im IPSC-Schiesssport ist die Glock 17 in der Production Division weit verbreitet. Einige kantonale Polizeikorps und Sicherheitsdienste setzen Glock-Pistolen ein. Die grosse Verbreitung hat zur Folge, dass Zubehör, Magazine und Ersatzteile in der Schweiz leicht verfügbar sind. Es existiert eine aktive Community von Glock-Schützen, und an den meisten Schweizer Schiessständen sind Glock-Pistolen regelmässig anzutreffen. Im Vergleich zu SIG-Pistolen gilt die Glock als das pragmatische, schnörkellose Arbeitswerkzeug, das ohne Allüren seinen Dienst verrichtet.

Die Preise für die Glock 17 auf dem Schweizer Markt 2026 gliedern sich in drei Stufen. In gutem Zustand, also voll funktionsfähig mit sichtbaren Gebrauchsspuren am Schlitten und Rahmen, aber intaktem Abzugssystem und sauberem Lauf, kostet eine Glock 17 CHF 450 bis 600. In sehr gutem Zustand, mit minimalen Tragespuren und gepflegtem Gesamteindruck, liegen die Preise bei CHF 600 bis 800. Neuwertige oder kaum geschossene Exemplare, insbesondere die Gen5 oder die MOS-Variante, erzielen CHF 800 bis 1'000. Der Neupreis für eine Glock 17 Gen5 liegt in der Schweiz 2026 bei rund CHF 750 bis 900, die MOS-Variante bei CHF 850 bis 1'050. Die Glock 17 gehört damit zu den preisgünstigsten hochwertigen Full-Size-Pistolen auf dem Markt.

Beim Kauf einer gebrauchten Glock 17 gibt es einige Punkte zu beachten. Der Polymerrahmen sollte auf Risse geprüft werden, insbesondere an den Schienennuten und im Bereich der Verschlussfanghebel-Aufnahme. Der Schlitten sollte auf übermässigen Verschleiss an der Innenseite und an den Verriegelungsflächen kontrolliert werden. Der Lauf sollte scharfe Züge und Felder aufweisen. Der Abzug muss sauber zurücksetzen und der Striker-Reset deutlich spürbar sein. Bei Gen3-Modellen und älter kann die Abzugsstangenfeder ermüdet sein, was sich in einem schwammigen Abzugsgefühl äussert. Originalteile von Glock sind günstig und leicht erhältlich, was Reparaturen und Wartung unkompliziert macht. Magazine sollten auf korrekten Sitz und einwandfreie Zuführung geprüft werden. Aftermarket-Modifikationen wie geänderte Abzüge oder Stipplings am Griff können den Wiederverkaufswert sowohl positiv als auch negativ beeinflussen, je nach Geschmack des Käufers.

Der Erwerb einer Glock 17 in der Schweiz erfordert einen Waffenerwerbsschein (WES), wie bei allen Faustfeuerwaffen. Der WES wird beim kantonalen Waffenbüro des Wohnkantons beantragt. Die Voraussetzungen sind Volljährigkeit, ein sauberes Strafregister und keine Hinweise auf Gefährdung. Die Bearbeitungszeit beträgt üblicherweise zwei bis vier Wochen. Nach dem Erwerb muss die Waffe sicher aufbewahrt werden, idealerweise in einem Waffenschrank oder zumindest getrennt von der Munition. Für den Transport zum Schiessstand gelten die üblichen Regeln: entladen, in einer geschlossenen Tasche oder einem Koffer, auf direktem Weg. Die 9mm-Munition ist in der Schweiz über den Fachhandel und an Schiessständen frei erhältlich. Magazine jeder Kapazität sind in der Schweiz legal erwerbbar, was die Glock 17 mit optionalen 19-, 24- oder 33-Schuss-Magazinen zu einer äusserst vielseitigen Plattform macht.`,
    rechtsstatus: 'wes',
    typischeKaliber: ['9×19mm'],
    tags: ['Pistole', 'Glock', 'G17', 'Polymer', 'Polizei', 'Safe-Action'],
    youtubeVideoId: '0XT67GPIFes',
    youtubeQuelle: 'Simon Koeniger',
    relatedSlugs: ['glock-19', 'sig-p226', 'hk-usp', 'walther-ppq', 'cz75'],
    priceGuide: { gut: "CHF 350–500", sehrGut: "CHF 500–700", neuwertig: "CHF 700–900" },
  },

  {
    slug: 'glock-19',
    titel: 'Glock 19',
    kategorie: 'Pistole',
    hersteller: 'Glock',
    baujahr: '1988',
    kurzbeschreibung: 'Der universelle Allrounder. Kompakter als G17, 15+1 Schuss — die meistverkaufte Pistole der Welt.',
    inhalt: `Die Glock 19 ist die kompakte Version der legendären Glock 17 und hat sich seit ihrer Einführung 1988 zur meistverkauften Pistole der Welt entwickelt. Was sie besonders macht, ist der nahezu perfekte Kompromiss zwischen Kompaktheit und Leistungsfähigkeit. Mit 15 Schuss im Standardmagazin bietet sie die gleiche Feuerkraft wie viele vollgrosse Dienstpistolen, lässt sich aber deutlich besser verbergen und tragen. Hinzu kommt die volle Abwärtskompatibilität mit den grösseren Glock-17-Magazinen — wer möchte, kann also auch 17-, 19-, 24- oder sogar 33-Schuss-Magazine verwenden. Diese Kombination aus Kompaktheit, Kapazität und Vielseitigkeit hat die Glock 19 zur universellen Referenzpistole gemacht, an der sich alle Konkurrenten messen lassen müssen.

Die Geschichte der Glock 19 beginnt mit dem Erfolg der Glock 17. Gaston Glock hatte 1982 mit seiner ersten Pistole die Fachwelt überrascht — ein Ingenieur ohne jede Erfahrung im Waffenbau konstruierte eine Pistole, die alle etablierten Hersteller in den österreichischen Armeetests schlug. Die Glock 17 wurde schnell zum Exporterfolg, doch es gab eine wachsende Nachfrage nach einer kompakteren Version. US-Strafverfolgungsbehörden und verdeckte Ermittler benötigten eine Waffe, die unter einem Sakko verschwand, ohne auf Feuerkraft verzichten zu müssen. 1988 stellte Glock die Modell 19 vor, die genau diese Lücke füllte. Der Schlitten wurde um 12mm und der Griff um eine halbe Fingerbreite gekürzt. Das Resultat war so überzeugend, dass die Glock 19 ihre grosse Schwester an Verkaufszahlen bald überholte. US-Spezialeinheiten wie Delta Force und Navy SEALs wählten die G19 als bevorzugte Seitenwaffe, und heute ist sie die meistverkaufte einzelne Pistolenvariante weltweit.

Technisch arbeitet die Glock 19 mit dem modifizierten Browning-Kurzrücklaufsystem und dem patentierten Safe-Action-System. Der Schlagbolzen ist nicht vorgespannt, sondern wird erst beim Durchziehen des Abzugs vollständig gespannt und ausgelöst. Drei automatische Sicherungen — Schlagbolzensicherung, Abzugssteg-Sicherung und Fallsicherung — verhindern eine unbeabsichtigte Schussabgabe ohne manuellen Sicherungshebel. Das Kaliber ist 9x19mm Parabellum. Die Lauflänge beträgt 102mm, die Gesamtlänge 174mm in der aktuellen Gen5-Version. Das Leergewicht liegt bei 602 Gramm. Der Polymerrahmen mit Stahleinlagen macht die Pistole korrosionsbeständig und leicht. Der Tenifer-beschichtete Schlitten bietet eine Oberflächenhärte von 64 HRC — härter als viele Industriewerkzeuge. Die Gen5-Version brachte mehrere Verbesserungen: den Marksman-Lauf mit verbessertem Züge-Profil für höhere Präzision, den ambidextren Verschlussfanghebel, den Wegfall der Fingerrillen am Griff für bessere Anpassbarkeit und die nDLC-Beschichtung des Schlittens.

In der Schweiz ist die Glock 19 die beliebteste Zivilpistole überhaupt. Kein anderes Modell wird häufiger auf Schweizer Schiesständen gesehen. Das liegt nicht nur an der bewährten Technik, sondern auch an der hervorragenden Teile- und Zubehörversorgung. Schweizer Waffenhändler führen die gesamte Glock-Palette permanent an Lager, und Ersatzteile sind günstig und überall erhältlich. Für Sportschützen eignet sich die G19 als Einstiegspistole in die IPSC Production Division, auch wenn die längere G34 dort Vorteile hat. Im Heimverteidigungskontext schätzen Schweizer Besitzer die unkomplizierte Handhabung — keine Sicherung zum Vergessen, keine komplizierte Entriegelung, einfach durchladen und fertig. Die Glock 19 wird auch regelmässig in Schweizer Waffenmagazinen getestet und empfohlen.

Neben der Standardversion gibt es mehrere wichtige Varianten. Die Glock 19X kombiniert das längere Griffstück der G17 mit dem kompakten Schlitten der G19 in Coyote-Tan-Farbe — ursprünglich für die US-Armeeausschreibung entwickelt. Die Glock 45 ist im Grunde die gleiche Konfiguration in Schwarz und mit Front-Serrations. Die Glock 19 MOS (Modular Optic System) bietet eine ab Werk gefräste Optik-Schnittstelle für Rotpunktvisiere wie Trijicon RMR, Holosun 507C oder Aimpoint Acro. Die MOS-Version wird in der Schweiz zunehmend populär, da Rotpunktvisiere im Sportschiessbetrieb immer verbreiteter werden.

Der Preisguide für den Schweizer Markt 2026 zeigt folgendes Bild: Gebrauchte Glock 19 in gutem Zustand mit normalen Gebrauchsspuren und funktional einwandfrei werden für CHF 450 bis 550 gehandelt. Exemplare in sehr gutem Zustand mit wenig Schusszahlen und intaktem Finish erzielen CHF 550 bis 700. Neuwertige oder ungeschossene Glock 19 Gen5, eventuell noch mit Originalverpackung und allen Beilagen, liegen bei CHF 700 bis 850. Die MOS-Varianten erzielen einen Aufpreis von rund CHF 80 bis 120 gegenüber der Standardversion. Fabrikneue Glock 19 Gen5 sind beim Schweizer Händler ab etwa CHF 750 bis 850 erhältlich, die MOS-Version ab CHF 850 bis 950.

Beim Kauf einer gebrauchten Glock 19 gibt es einige Punkte zu beachten. Zunächst die Generation identifizieren: Gen1 bis Gen3 haben keine austauschbaren Griffrücken, Gen4 hat den vergrösserten Magazinschachtausschnitt und RTF-Griffstruktur, Gen5 den Marksman-Lauf und die flache Frontpartie ohne Fingerrillen. Den Lauf auf Verschleiss prüfen — Glock-Läufe halten typischerweise 40'000 bis 60'000 Schuss, aber bei starker Nutzung mit heissen Ladungen kann der Verschleiss früher eintreten. Die Schlittenführungsschienen im Polymerrahmen auf Verschleiss kontrollieren, obwohl dies bei Glocks selten ein Problem ist. Den Abzug auf gleichmässigen Druckpunkt prüfen. Beim Zerlegen auf Risse im Rahmen achten, besonders an den Schlittenführungsschienen. Originalmagazine bevorzugen — Glock-Magazine kosten neu CHF 35 bis 45 und sind ein Qualitätsmerkmal. Generell gilt die Glock 19 als ausserordentlich langlebig und wartungsarm, weshalb selbst stärker gebrauchte Exemplare oft problemlos funktionieren.

Rechtlich unterliegt die Glock 19 in der Schweiz dem Waffenerwerbsschein (WES). Schweizer Bürger und Personen mit Niederlassungsbewilligung C können den WES bei der zuständigen kantonalen Behörde beantragen. Der Antrag erfordert einen Strafregisterauszug, der nicht älter als drei Monate sein darf, sowie einen Nachweis, dass kein Waffenerwerbsverbot vorliegt. Der WES wird in der Regel innert zwei bis vier Wochen ausgestellt und berechtigt zum Erwerb einer Waffe innerhalb von sechs Monaten. Die Glock 19 ist als halbautomatische Handfeuerwaffe in der Schweiz frei erwerbbar mit WES — es braucht keine Ausnahmebewilligung.`,
    rechtsstatus: 'wes',
    typischeKaliber: ['9×19mm'],
    tags: ['Pistole', 'Glock', 'G19', 'Compact', 'Allrounder'],
    relatedSlugs: ['glock-17', 'sig-p365', 'hk-usp', 'springfield-hellcat'],
    priceGuide: { gut: "CHF 380–520", sehrGut: "CHF 520–720", neuwertig: "CHF 720–950" },
  },

  {
    slug: 'glock-34',
    titel: 'Glock 34 / 35',
    kategorie: 'Pistole',
    hersteller: 'Glock',
    baujahr: '1998',
    kurzbeschreibung: 'Glock Wettbewerbspistole. Langer Lauf, langer Sichtradius, optimierter Abzug. IPSC Standard.',
    inhalt: `Die Glock 34 ist Glocks Antwort auf die Anforderungen des Wettkampfschiessens und hat sich seit ihrer Einführung 1998 zur dominierenden Pistole in der IPSC Production Division entwickelt. Was sie besonders macht, ist die konsequente Optimierung der bewährten Glock-Plattform für Präzision und schnelle Folgeschüsse. Der verlängerte Lauf und Schlitten bieten einen längeren Sichtradius und eine ruhigere Schwingungscharakteristik, während der leichtere Schlitten den Rückstoss reduziert und schnellere Zielaufnahme ermöglicht. Die G34 beweist, dass das Glock-System nicht nur als robuste Dienstwaffe taugt, sondern auch im Wettkampf auf höchstem Niveau bestehen kann.

Die Entstehungsgeschichte der Glock 34 ist eng mit dem Aufstieg des dynamischen Schiessens verbunden. Ende der 1990er-Jahre erkannte Glock, dass die Standard-G17 im Wettkampfbereich gegen spezialisierte Sportpistolen wie die CZ 75 Shadow, die Beretta 92 Stock oder die Tanfoglio Stock kaum konkurrenzfähig war. Diese Waffen boten längere Visierlinien, bessere Abzüge und geringeren Rückstoss. Glocks Lösung war elegant simpel: ein verlängerter Schlitten auf dem bewährten G17-Rahmen, kombiniert mit einem erleichterten Abzug. 1998 wurden die G34 im Kaliber 9x19mm und die G35 im Kaliber .40 S&W gleichzeitig vorgestellt. Der Erfolg war durchschlagend — innerhalb weniger Jahre dominierte die G34 die IPSC Production Division weltweit. Das lag nicht nur an der Waffe selbst, sondern auch am riesigen Aftermarket-Angebot. Tuner und Zubehörhersteller entwickelten Abzugsverbesserungen, Visierungen, Griffbearbeitungen und Kompensatoren speziell für die G34. Heute ist die Glock 34 Gen5 MOS die meistverwendete Pistole in der Production Division — sowohl auf nationaler als auch auf internationaler Ebene.

Technisch basiert die Glock 34 auf dem identischen modifizierten Browning-Kurzrücklaufsystem wie alle Glock-Modelle, wurde aber gezielt für den Wettkampf angepasst. Das Kaliber ist 9x19mm Parabellum. Die Lauflänge beträgt 135mm — 21mm mehr als bei der G17 — und die Gesamtlänge 207mm. Das Leergewicht liegt bei 650 Gramm. Der entscheidende Vorteil ist die Visierlänge von 172mm gegenüber 153mm bei der G17. Diese zusätzlichen 19mm Sichtradius machen sich besonders auf grössere Distanzen bemerkbar, wo kleine Visierfehler stärker ins Gewicht fallen. Der Schlitten ist durch grosszügige Ausfräsungen leichter als bei der G17, was den gefühlten Rückstoss reduziert und ein schnelleres Zurückschwingen ins Ziel ermöglicht. Ab Werk wird die G34 mit einem erleichterten Abzug von circa 2 Kilogramm ausgeliefert, im Vergleich zu den üblichen 2,5 Kilogramm bei der G17. Die Gen5-MOS-Version bietet zusätzlich die Optik-Schnittstelle für Rotpunktvisiere, austauschbare Griffrücken und den Marksman-Lauf mit polygonalem Profil.

Im Schweizer Kontext ist die Glock 34 die erste Wahl für Sportschützen, die in der IPSC Production oder Production Optics Division antreten. Schweizer IPSC-Schützen sind international erfolgreich, und viele von ihnen setzen auf die G34. Die Schweizer Sektion des IPSC-Verbandes verzeichnet stetig wachsende Mitgliederzahlen, und an den nationalen Meisterschaften ist die G34 das am häufigsten verwendete Modell. Auch für das statische Sportschiessen auf 25 und 50 Meter eignet sich die G34 hervorragend — die längere Visierlinie und der ruhigere Haltepunkt zahlen sich auf diese Distanzen besonders aus. Wer sich ernsthaft mit dem Pistolenschiessen beschäftigen will, findet in der G34 einen zuverlässigen Partner, der bei Bedarf mit Aftermarket-Teilen wie verbessertem Abzug, Fiberoptik-Visierung oder Rotpunktvisier weiter aufgerüstet werden kann. Schweizer Waffenhändler führen die G34 Gen5 MOS in der Regel an Lager, und die Versorgung mit Ersatzteilen und Zubehör ist hervorragend.

Neben der Standard-G34 gibt es die Glock 35 in .40 S&W, die in der IPSC Standard Division eingesetzt wird, und die Glock 41 in .45 ACP. Die Gen5-MOS-Variante ist heute der Standard für Wettkampfschützen, da die ab Werk integrierte Optik-Schnittstelle einen soliden und repetierbaren Sitz für Rotpunktvisiere gewährleistet. Im Aftermarket-Bereich sind vor allem verbesserte Abzugssysteme von Herstellern wie Timney, Overwatch Precision oder Agency Arms beliebt, ebenso wie erweiterte Magazinhalter und Magwells für schnellere Nachladungen.

Der Preisguide für den Schweizer Markt 2026 sieht wie folgt aus: Gebrauchte Glock 34 in gutem Zustand mit normalen Gebrauchsspuren aus dem Wettkampfbetrieb werden für CHF 500 bis 650 gehandelt. Exemplare in sehr gutem Zustand mit moderaten Schusszahlen und intaktem Finish erzielen CHF 650 bis 800. Neuwertige oder wenig geschossene G34 Gen5 MOS liegen bei CHF 800 bis 1'000. Fabrikneue Glock 34 Gen5 MOS sind beim Schweizer Händler ab etwa CHF 900 bis 1'050 erhältlich. Ältere Generationen (Gen3, Gen4) sind günstiger, wobei Gen3-Modelle oft unter CHF 500 zu finden sind. Wettkampfmässig aufgerüstete G34 mit Custom-Abzug, Visierung und Stippling können je nach Ausbaustufe CHF 1'200 bis 1'800 erzielen.

Beim Kauf einer gebrauchten Glock 34 sollte man bedenken, dass viele Exemplare aus dem Wettkampfbetrieb kommen und entsprechend hohe Schusszahlen aufweisen können. Den Lauf auf Verschleiss prüfen — bei Wettkampfpistolen sind 20'000 bis 50'000 Schuss keine Seltenheit. Die Schlittenführungsschienen kontrollieren, da die häufigen Schlitten-Zyklen im Trockentraining Verschleiss verursachen können. Den Abzug auf Konsistenz prüfen — viele Wettkampf-G34 haben modifizierte Abzüge, die nicht immer fachgerecht eingebaut wurden. Falls ein Aftermarket-Abzug verbaut ist, dessen Hersteller und Einbauqualität überprüfen. Die MOS-Plattform auf Beschädigungen der Optik-Schnittstelle kontrollieren, da häufiges Wechseln von Visieren die Gewinde belasten kann. Originalmagazine bevorzugen und auf Risse in den Magazinlippen achten, besonders bei stark genutzten Wettkampfmagazinen.

Rechtlich unterliegt die Glock 34 in der Schweiz dem Waffenerwerbsschein (WES). Der Erwerb ist für Schweizer Bürger und Personen mit Niederlassungsbewilligung C über den normalen WES-Prozess möglich. Ein aktueller Strafregisterauszug und die Bestätigung, dass kein Waffenerwerbsverbot besteht, sind erforderlich. Die Glock 34 ist als halbautomatische Handfeuerwaffe ohne Einschränkungen erwerbbar — es braucht keine Ausnahmebewilligung oder Sondergenehmigung.`,
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
    inhalt: `Die Walther PPK ist eine der berühmtesten Pistolen der Welt und untrennbar mit dem Namen James Bond verbunden. Was sie besonders macht, geht aber weit über ihren Filmruhm hinaus. Die PPK (Polizeipistole Kriminal) war bei ihrer Einführung 1931 eine technische Revolution — die erste kommerziell erfolgreiche Kompaktpistole mit Double-Action/Single-Action-Abzug, Signalstift und sicherem Entspannhebel. Diese Kombination aus kompakten Abmessungen, zuverlässiger Funktion und eleganter Formgebung machte sie über Jahrzehnte zur bevorzugten Waffe von Kriminalbeamten, Geheimdienstagenten und anspruchsvollen Zivilisten weltweit. Noch heute wird die PPK produziert und verkauft — ein Beweis für die zeitlose Qualität dieses Designs.

Die Geschichte der Walther PPK beginnt 1929 mit der Walther PP (Polizeipistole). Fritz Walther und sein Sohn Carl entwickelten in Zella-Mehlis (Thüringen) eine Selbstladepistole mit einem für die damalige Zeit revolutionären DA/SA-Abzugssystem. Der Schütze konnte die Waffe geladen und entspannt tragen und im Bedarfsfall durch einfaches Durchziehen des Abzugs feuern — ohne manuelles Spannen des Hahns. 1931 folgte die PPK als kompaktere Version für Kriminalbeamte in Zivilkleidung. Der Name steht für Polizeipistole Kriminal, nicht wie oft fälschlich behauptet für Polizeipistole Kurz. Im Zweiten Weltkrieg wurde die PPK zur beliebtesten Offizierspistole der Wehrmacht — Hunderttausende wurden produziert. Nach 1945 wechselte die Produktion mehrfach den Standort: Manurhin in Frankreich fertigte sie von 1952 bis 1986 in Lizenz, dann wurde sie in den USA unter verschiedenen Marken (Interarms, Smith and Wesson) hergestellt. Seit 2018 produziert Walther die PPK wieder selbst in Ulm. Der grösste Bekanntheitsschub kam 1962, als Ian Fleming auf Empfehlung des Waffenexperten Geoffrey Boothroyd die PPK als Dienstwaffe seines Romancharakters James Bond einführte. Seither ist die PPK untrennbar mit dem Agenten ihrer Majestät verbunden.

Technisch ist die Walther PPK ein einfacher Rückstosslader (Blowback) mit feststehendem Lauf. Dieses System ist bei den verwendeten Kalibern — 7,65mm Browning (.32 ACP) und .380 ACP (9mm kurz) — ausreichend und ermöglicht eine besonders kompakte Bauweise. Die Lauflänge beträgt nur 83mm, die Gesamtlänge 155mm und das Gewicht 568 Gramm leer. Das Ganzstahl-Design macht die Pistole für ihre Grösse relativ schwer, was den spürbaren Rückstoss des Blowback-Systems dämpft. Das Magazin fasst 7 Schuss im Kaliber 7,65mm Browning oder 6 Schuss in .380 ACP. Der DA/SA-Abzug erlaubt einen langen Erstschuss mit circa 6 Kilogramm Abzugsgewicht und kurze Folgeschüsse mit circa 2,5 Kilogramm. Der Sicherungshebel dient gleichzeitig als Entspannhebel — eine elegante Lösung, die viele spätere Pistolen kopierten. Der Signalstift am Schlittenende zeigt taktil und visuell an, ob eine Patrone im Lauf ist.

Im Schweizer Kontext ist die Walther PPK vor allem als Sammler- und Liebhaberstück gefragt. Als Selbstverteidigungswaffe hat sie in der Schweiz keine grosse praktische Bedeutung, da Concealed Carry nicht üblich ist. Dafür schätzen Schweizer Sammler die PPK als eines der elegantesten und historisch bedeutsamsten Pistolendesigns überhaupt. Besonders gesucht sind die frühen Zella-Mehlis-Produktionen mit ihrem hervorragenden Finish und die Manurhin-Modelle, die in der französischen Qualitätstradition gefertigt wurden. Auf Schweizer Waffenbörsen und in Waffengeschäften tauchen regelmässig PPK verschiedener Produktionsepochen auf. Die PPK wird auch gelegentlich auf Schweizer Schiesständen im Kurzwaffenprogramm eingesetzt, wobei sie im Kaliber .32 ACP wegen des minimalen Rückstosses besonders angenehm zu schiessen ist.

Die wichtigsten Varianten umfassen die grössere PP (Polizeipistole) von 1929, die eigentliche PPK ab 1931, die PPK/S — ein Hybrid mit dem PP-Griffstück und dem PPK-Schlitten, der für den US-Import geschaffen wurde, da die ursprüngliche PPK nach dem Gun Control Act von 1968 zu klein für den Import war — sowie die moderne Neuauflage PPK/E. Aktuelle Produktionsmodelle aus Ulm sind in .380 ACP erhältlich und bieten ein verbessertes Finish sowie modernere Materialien, behalten aber das klassische Design bei.

Der Preisguide für den Schweizer Markt 2026 variiert stark nach Produktionsepoche und Zustand. Nachkriegs-PPK (Manurhin oder spätere Walther) in gutem Zustand mit normalen Gebrauchsspuren werden für CHF 400 bis 600 gehandelt. Exemplare in sehr gutem Zustand mit intakter Brünierung und wenig Tragespuren erzielen CHF 600 bis 900. Neuwertige PPK, ob aktuelle Produktion oder ungeschossene ältere Modelle, liegen bei CHF 900 bis 1'200. Kriegsproduktionen aus Zella-Mehlis sind Sammlerstücke und beginnen bei CHF 800 für abgenutzte Exemplare, können in hervorragendem Zustand aber CHF 1'500 bis 3'000 erreichen. Seltene Varianten, etwa mit speziellen Markierungen oder in ungewöhnlichen Konfigurationen, erzielen am Sammlermarkt deutlich höhere Preise.

Beim Kauf einer gebrauchten Walther PPK sollte man zunächst die Produktionsepoche identifizieren. Zella-Mehlis-Modelle haben die höchste Sammlerqualität, Manurhin-Modelle gelten als qualitativ hervorragend, US-Produktionen variieren stärker in der Qualität. Den Lauf auf Verschleiss und Lochfrass prüfen — ältere PPK, die mit korrosiver Munition geschossen wurden, zeigen oft Schäden. Die Brünierung begutachten — Holsterabnutzung an den Kanten ist normal, grossflächiger Brünierungsverlust mindert den Wert. Den DA/SA-Abzug auf Funktion prüfen und sicherstellen, dass der Entspannhebel sauber arbeitet. Den Signalstift auf korrekte Funktion kontrollieren. Beim Griffstück auf Risse im Bereich der Abzugsbügelverschweissung achten — bei sehr alten Modellen eine bekannte Schwachstelle. Originalmagazine sind bei älteren PPK oft schwer zu beschaffen und entsprechend wertvoll.

Rechtlich unterliegt die Walther PPK in der Schweiz dem Waffenerwerbsschein (WES). Als halbautomatische Kurzwaffe ist sie ohne Einschränkungen mit WES erwerbbar. Der übliche Prozess mit Strafregisterauszug und Antrag bei der kantonalen Behörde gilt. Für Kriegsproduktionen oder historisch bedeutsame Exemplare kann zusätzlich eine Registrierung als Sammlerstück sinnvoll sein, ist aber nicht zwingend vorgeschrieben.`,
    rechtsstatus: 'wes',
    typischeKaliber: ['.380 ACP', '.32 ACP'],
    tags: ['Pistole', 'Walther', 'PPK', 'JamesBond', 'Kompakt'],
    priceGuide: { gut: "CHF 400–700", sehrGut: "CHF 700–1000", neuwertig: "CHF 1000–1400", sammler: "CHF 1500–3000" },
  },

  {
    slug: 'walther-p99',
    titel: 'Walther P99',
    kategorie: 'Pistole',
    hersteller: 'Walther',
    baujahr: '1997',
    kurzbeschreibung: 'James Bonds Dienstpistole seit 1997. Anti-Stress Abzugssystem — kombiniert SA und DA.',
    inhalt: `Die Walther P99 war bei ihrer Einführung 1997 ein Meilenstein in der Pistolenentwicklung und markierte Walthers Eintritt ins Zeitalter der Polymer-Striker-Pistolen. Was sie besonders macht, ist das innovative Anti-Stress-Abzugssystem (AS), das drei verschiedene Abzugsmodi in einer Waffe vereint — eine Lösung, die kein anderer Hersteller in dieser Form anbietet. Zudem war die P99 die weltweit erste Striker-Fired-Pistole mit austauschbaren Griffrücken, ein Konzept das Glock erst 13 Jahre später mit der Gen4 übernahm. Bekannt wurde die P99 auch als neue James-Bond-Pistole — ab dem Film Tomorrow Never Dies (1997) ersetzte sie die klassische Walther PPK als Dienstwaffe des Agenten.

Die Geschichte der Walther P99 ist eine Geschichte des Comebacks. Nach dem Ende des Kalten Krieges und dem allmählichen Auslaufen der klassischen PP-Serie verlor Walther in den frühen 1990er-Jahren massiv Marktanteile an Glock, SIG Sauer und Beretta. Die traditionellen Stahlpistolen waren in der Produktion teurer und schwerer als die neuen Polymer-Modelle, und der Markt verlangte nach modernen Lösungen. 1994 begann Walther in Arnsberg mit der Entwicklung einer völlig neuen Pistole. Das Ziel war klar: eine Waffe schaffen, die technisch mit der Glock mithalten oder sie übertreffen konnte, ohne Walthers Tradition innovativer Abzugssysteme aufzugeben. 1997 wurde die P99 vorgestellt und sofort als technischer Durchbruch anerkannt. Das Anti-Stress-System war die Antwort auf eine reale Problemstellung bei Polizeieinsätzen: In Stresssituationen spannen Beamte oft unbewusst den Abzug vor, was zu unbeabsichtigten Schussabgaben führen kann. Die P99 AS löste dieses Problem elegant. Zahlreiche deutsche Polizeien übernahmen die P99 als Dienstwaffe, darunter Nordrhein-Westfalen, Bayern und Hamburg. Die Produktion endete 2024, wobei die PDP (Performance Duty Pistol) als offizielle Nachfolgerin gilt.

Technisch ist die Walther P99 ein Kurzhub-Rückstosslader mit modifiziertem Browning-Verschluss und Schlagbolzenschloss (Striker). Das Kaliber ist primär 9x19mm Parabellum, es existiert auch eine Version in .40 S&W. Die Lauflänge beträgt 102mm, die Gesamtlänge 180mm und das Leergewicht 630 Gramm. Das Magazin fasst 15 Schuss in 9mm oder 12 Schuss in .40 S&W. Das Herzstück ist das AS-Abzugssystem, das drei Modi kombiniert. Im ersten Modus (Double Action) hat der Abzug einen langen Weg mit circa 4,5 Kilogramm Gewicht — ideal für den sicheren Erstschuss. Nach dem ersten Schuss schaltet der Abzug automatisch in den SA-Modus (Single Action) mit kurzem Weg und circa 2 Kilogramm Gewicht für präzise Folgeschüsse. Der dritte Modus, der namensgebende Anti-Stress-Modus, wird durch Drücken eines Entkupplungsknopfes am Schlitten aktiviert — der Abzug kehrt in den langen DA-Modus zurück, ohne dass die Waffe entladen werden muss. Die drei austauschbaren Griffrücken in den Grössen S, M und L ermöglichen eine individuelle Anpassung an unterschiedliche Handgrössen.

Im Schweizer Kontext hat die Walther P99 eine treue, wenn auch nicht riesige Anhängerschaft. Sie wird von Schützen geschätzt, die das AS-Abzugssystem als überlegen gegenüber dem reinen Striker-Abzug der Glock empfinden. Das DA/SA-ähnliche Verhalten bietet ein Sicherheitsplus, das besonders für Heimverteidigung und für Schützen, die von klassischen DA/SA-Pistolen wie der SIG P226 kommen, attraktiv ist. Auf dem Gebrauchtmarkt tauchen regelmässig P99 auf, da die Waffe seit den späten 1990er-Jahren in der Schweiz verkauft wurde. Die P99 hat den Ruf einer zuverlässigen und ergonomisch gelungenen Pistole, die allerdings in Sachen Aftermarket-Unterstützung und Zubehörvielfalt nicht mit der Glock mithalten kann. Für Sportschützen in der IPSC Production Division ist die P99 eine exotische, aber durchaus konkurrenzfähige Wahl. Ersatzteile sind über Walther-Servicepartner in der Schweiz erhältlich, wenn auch nicht so breit wie bei Glock.

Die wichtigsten Varianten der P99 umfassen die P99 AS (Anti-Stress Standard), die P99 DAO (nur Double Action mit konstantem langen Abzugsweg), die P99 QA (Quick Action mit teilgespanntem Schlagbolzen und konstantem kurzem Abzugsweg — das Modell, das zur PPQ weiterentwickelt wurde) und die P99 RAD (Behördenversion der deutschen Polizei mit spezifischen Anpassungen). Es existieren auch kompakte Versionen und Varianten mit verlängertem Lauf.

Der Preisguide für den Schweizer Markt 2026 zeigt folgendes Bild: Gebrauchte P99 in gutem Zustand mit normalen Gebrauchsspuren werden für CHF 350 bis 500 gehandelt. Da die Produktion eingestellt wurde, sinken die Preise für Standardmodelle tendenziell. Exemplare in sehr gutem Zustand mit wenig Schusszahlen erzielen CHF 500 bis 650. Neuwertige P99, insbesondere letzte Produktionsserien oder ungeschossene Exemplare, liegen bei CHF 650 bis 800. Die P99 QA-Version kann etwas höhere Preise erzielen, da sie als Vorläufer der beliebten PPQ ein gewisses Sammlerinteresse weckt. Originalzubehör wie Ersatzmagazine (CHF 30 bis 45) und Griffrücken-Sets sind noch über den Fachhandel erhältlich.

Beim Kauf einer gebrauchten Walther P99 sollte man zunächst die Variante identifizieren — AS, DAO oder QA, da sich die Abzugssysteme grundlegend unterscheiden. Den Entkupplungsknopf bei der AS-Version auf korrekte Funktion prüfen — er muss den Abzug zuverlässig in den DA-Modus zurücksetzen. Den Lauf auf Verschleiss kontrollieren, wobei die P99 als langlebig gilt. Die Polymerrahmen-Schienen auf Verschleiss prüfen. Die austauschbaren Griffrücken auf korrekten Sitz testen — lose Griffrücken deuten auf ausgeschlagene Rastpunkte hin. Die Magazine auf Risse und korrekte Zuführung prüfen. Da die P99 nicht mehr produziert wird, ist die langfristige Ersatzteilversorgung ein Faktor, den man beim Kauf berücksichtigen sollte — Walther hat jedoch zugesagt, Ersatzteile weiterhin bereitzuhalten.

Rechtlich unterliegt die Walther P99 in der Schweiz dem Waffenerwerbsschein (WES). Der Erwerb ist für Schweizer Bürger und Personen mit Niederlassungsbewilligung C über den regulären WES-Prozess möglich. Ein aktueller Strafregisterauszug ist erforderlich, und es darf kein Waffenerwerbsverbot bestehen. Die P99 ist als halbautomatische Handfeuerwaffe ohne Einschränkungen erwerbbar.`,
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
    inhalt: `Die Walther PPQ (Police Pistol Quick Defence) hat sich seit ihrer Einführung 2011 den Ruf erarbeitet, den besten Serienabzug aller Polymerrahmen-Pistolen zu besitzen. Was sie besonders macht, ist der legendäre Quick-Defence-Abzug mit nur 9mm Abzugsweg und einem extrem kurzen, taktil klar spürbaren Reset von circa 2,5mm. Dieses Abzugsverhalten ermöglicht schnelle, präzise Folgeschüsse, wie sie sonst nur mit aufwendig getunten Wettkampfpistolen möglich sind — und das ab Werk. Dazu kommt eine Ergonomie, die von nahezu allen Testern als herausragend bewertet wird. Die PPQ liegt in der Hand, als wäre sie dafür gegossen worden.

Die Geschichte der Walther PPQ ist die Geschichte einer konsequenten Destillation. Walther hatte mit der P99 QA (Quick Action) ein Abzugskonzept entwickelt, das bei Sportschützen beliebt war: ein teilgespannter Striker mit konstantem, kurzem Abzugsweg. Bei Behörden fehlte jedoch die zweite Abzugslänge des Anti-Stress-Systems, was die QA-Version für den Polizeidienst weniger attraktiv machte. 2011 nahm Walther das Beste aus der P99 QA — den kurzen, knackigen Abzug und die hervorragende Ergonomie — und destillierte es in ein neues, eigenständiges Modell: die PPQ. Der Name knüpft bewusst an die Tradition der Walther-Polizeipistolen an (PP, PPK, PPQ). Die erste Generation (M1) behielt den europäischen Paddle-Magazinlöser am Abzugsbügel bei. 2013 folgte die M2 mit dem weltweit bevorzugten Druckknopf-Magazinlöser, die zum Standardmodell wurde. 2017 kam die PPQ Q5 Match als Wettkampfversion mit 5-Zoll-Lauf auf den Markt und bewies, dass das PPQ-System auch für den ernsthaften Schiesssport taugt. 2021 wurde die PPQ offiziell durch die PDP (Performance Duty Pistol) abgelöst, die ab Werk Optics-Ready ist und den PPQ-Abzug in leicht modifizierter Form weiterführt.

Technisch ist die Walther PPQ ein Kurzhub-Rückstosslader mit modifiziertem Browning-Verschluss und Schlagbolzenschloss (Striker). Das Kaliber ist primär 9x19mm Parabellum, es gibt auch Versionen in .40 S&W und .45 ACP. Die Lauflänge beträgt 102mm, die Gesamtlänge 180mm und das Leergewicht 615 Gramm. Das Magazin fasst 15 Schuss in der M1-Version und 15 oder 17 Schuss in der M2, je nach Magazinvariante. Das Herzstück ist der Quick-Defence-Abzug mit einem Gewicht von circa 2,5 Kilogramm. Der Abzugsweg beträgt nur 9mm bis zum Druckpunkt, und der Reset — also der Weg, den der Abzug nach dem Schuss zurücklegen muss, bevor er erneut ausgelöst werden kann — liegt bei nur 2,5mm. Dieser kurze Reset ist der Schlüssel zu den schnellen Folgeschüssen, für die die PPQ berühmt ist. Im Vergleich: Eine Glock hat einen Reset von circa 5 bis 6mm. Die Ergonomie wird durch den tief ansetzenden Griffwinkel, die texturierte Oberfläche und die austauschbaren Griffrücken bestimmt. Eine Picatinny-Schiene am Rahmen erlaubt die Montage von Lampen und Lasern.

Im Schweizer Kontext hat die Walther PPQ eine feste Fangemeinde, besonders unter Sportschützen, die den Abzug als entscheidendes Kriterium betrachten. In der IPSC Production Division ist die PPQ eine ernst zu nehmende Alternative zur dominierenden Glock 34, wobei sie dank ihres Abzugs bei Präzisionsaufgaben Vorteile bietet. An Schweizer Schiesständen trifft man die PPQ regelmässig an, und der Nachfolger PDP gewinnt zunehmend an Marktanteilen. Schweizer Waffenhändler führen die PDP als aktuelles Modell an Lager, während die PPQ nur noch gebraucht erhältlich ist. Für Schützen, die von der Glock kommen und einen besseren Abzug suchen, ohne auf die Zuverlässigkeit einer modernen Polymer-Pistole zu verzichten, ist die PPQ eine hervorragende Wahl. Die Q5 Match hat sich als bezahlbare Wettkampfpistole etabliert und wird an Schweizer IPSC-Matches regelmässig eingesetzt.

Die wichtigsten Varianten umfassen die PPQ M1 mit dem europäischen Paddle-Magazinlöser, die PPQ M2 mit Druckknopf-Magazinlöser als meistverkaufte Version, die PPQ SC (Subcompact) als verkürzte Variante mit 10 Schuss Kapazität und die PPQ Q5 Match als Wettkampfversion mit 5-Zoll-Lauf, verlängertem Schlitten und verbesserter Visierung. Die Nachfolgerin PDP ist ab Werk Optics-Ready und verfügt über den sogenannten Performance Duty Trigger, der den PPQ-Abzug weiter verfeinert.

Der Preisguide für den Schweizer Markt 2026 zeigt folgendes Bild: Gebrauchte PPQ M2 in gutem Zustand mit normalen Gebrauchsspuren werden für CHF 400 bis 550 gehandelt. Exemplare in sehr gutem Zustand mit wenig Schusszahlen erzielen CHF 550 bis 700. Neuwertige PPQ, falls noch verfügbar, liegen bei CHF 700 bis 850. Die Q5 Match erzielt höhere Preise — gebraucht in gutem Zustand CHF 600 bis 750, in sehr gutem Zustand CHF 750 bis 900, neuwertig CHF 900 bis 1'100. Die Nachfolgerin PDP ist fabrikneu beim Schweizer Händler ab circa CHF 700 bis 850 erhältlich, die PDP Pro SD ab CHF 950. Originalmagazine für die PPQ kosten CHF 35 bis 50.

Beim Kauf einer gebrauchten Walther PPQ zunächst die Version identifizieren — M1 oder M2 — da sich der Magazinlöser grundlegend unterscheidet und Magazine nicht zwischen den Versionen austauschbar sind. Den Abzug besonders sorgfältig prüfen: Der Reset muss kurz, knackig und konsistent sein. Ein weicher oder ungleichmässiger Reset kann auf verschlissene Abzugskomponenten hindeuten. Den Lauf auf Verschleiss kontrollieren, wobei die PPQ als langlebig gilt. Die Schlittenführungsschienen im Polymerrahmen auf Verschleiss prüfen. Die austauschbaren Griffrücken auf korrekten Sitz testen. Magazine auf korrekte Zuführung prüfen — die PPQ ist beim Magazinzustand etwas empfindlicher als die Glock. Wer zukunftssicher kaufen will, sollte die PDP in Betracht ziehen, da sie als aktuelles Modell eine bessere langfristige Ersatzteilversorgung bietet.

Rechtlich unterliegt die Walther PPQ in der Schweiz dem Waffenerwerbsschein (WES). Der Erwerb ist für Schweizer Bürger und Personen mit Niederlassungsbewilligung C über den regulären WES-Prozess möglich. Ein aktueller Strafregisterauszug ist erforderlich, und es darf kein Waffenerwerbsverbot bestehen. Die PPQ ist als halbautomatische Handfeuerwaffe ohne Einschränkungen erwerbbar — weder für die Standard- noch für die Q5-Match-Version braucht es eine Ausnahmebewilligung.`,
    rechtsstatus: 'wes',
    typischeKaliber: ['9×19mm', '.40 S&W'],
    tags: ['Pistole', 'Walther', 'PPQ', 'PDP', 'Striker'],
    relatedSlugs: ['sig-p320', 'glock-17', 'hk-vp9', 'sig-p226'],
  },

  {
    slug: 'cz75',
    titel: 'CZ 75',
    kategorie: 'Pistole',
    hersteller: 'CZ (Česká Zbrojovka)',
    baujahr: '1975',
    kurzbeschreibung: 'Die tschechische Präzisionspistole. Ergonomisch, präzise, günstig — einer der besten Werte.',
    inhalt: `Die CZ 75 ist eine der einflussreichsten und meistkopierten Pistolen der Waffengeschichte. Seit ihrer Einführung 1975 hat sie sich weltweit einen Ruf als aussergewöhnlich präzise, ergonomische und zuverlässige Handfeuerwaffe erarbeitet. Was die CZ 75 besonders macht, ist die Kombination aus einem Ganzstahlrahmen, einer innenliegenden Schlittenführung und einem Double-Action/Single-Action-Abzug, die zusammen ein Schiesserlebnis bieten, das in dieser Preisklasse nahezu unerreicht ist. Der Schlitten läuft innerhalb der Rahmenführungen, ähnlich wie bei der legendären SIG P210, was das Schlittenspiel minimiert und die Präzision deutlich steigert. Diese Konstruktionsweise ist bei modernen Pistolen eine Seltenheit und verleiht der CZ 75 einen Vorteil, den man beim Schiessen sofort spürt.

Die Geschichte der CZ 75 beginnt in der damaligen Tschechoslowakei. Die Brüder František und Josef Koucký entwickelten die Pistole bei Česká Zbrojovka in Uherský Brod. Ihr Ziel war eine Dienstpistole, die westliche Designs in Präzision und Ergonomie übertreffen sollte. Die Konstrukteure studierten insbesondere die Browning Hi-Power und die SIG P210 und kombinierten deren beste Eigenschaften in einem neuen Design. Da der Ostblock keine Patente im Westen anmeldete, wurde die CZ 75 von über zwanzig Herstellern weltweit kopiert oder adaptiert. Tanfoglio in Italien, IMI in Israel mit der Jericho 941, Springfield Armory in den USA, Sphinx in der Schweiz und viele weitere Hersteller bauten Pistolen auf Basis des CZ-75-Designs. Diese Verbreitung ist ein eindrücklicher Beweis für die Qualität der Konstruktion. Während des Kalten Krieges war die CZ 75 im Westen schwer erhältlich, was ihren Mythos nur verstärkte. Erst nach 1989 wurde sie frei exportiert und eroberte rasch die internationalen Märkte.

Technisch arbeitet die CZ 75 als Kurzhub-Rückstosslader mit einem modifizierten Browning-Verschlusssystem und Kammerverriegelung. Das Kaliber ist primär 9×19mm Parabellum, es gibt aber auch Versionen in .40 S&W. Das Magazin fasst in der Standardausführung 16 Schuss in 9mm. Die Lauflänge beträgt 120mm bei einer Gesamtlänge von 206mm. Das Gewicht liegt bei rund 1000 Gramm leer, was für eine Polymerpistolen-verwöhnte Generation viel klingt, aber den Rückstoss spürbar dämpft und die Waffe beim schnellen Schiessen ruhig in der Hand liegen lässt. Der DA/SA-Abzug erlaubt den ersten Schuss wahlweise im Double-Action-Modus mit längerem, schwererem Abzugsweg oder im Single-Action-Modus mit gespanntem Hahn und kurzem, leichtem Abzug. Eine manuelle Sicherung ergänzt das Sicherheitskonzept. Der tief liegende Lauf reduziert den Muzzle Flip, was besonders bei schnellen Schussfolgen vorteilhaft ist.

Die Variantenvielfalt der CZ 75 ist beachtlich. Die CZ 75 B ist die modernisierte Standardversion mit integrierter Schlagbolzensicherung, die ein Auslösen des Schlagbolzens ohne Betätigung des Abzugs verhindert. Die CZ 75 SP-01 verfügt über eine Zubehörschiene nach Picatinny-Standard und ein erweitertes 18-Schuss-Magazin, womit sie sich besonders als Dienstpistole eignet. Die CZ 75 Shadow ist die wettkampforientierte Version ohne Sicherungshebel, dafür mit optimiertem Abzug. Die CZ 75 Compact ist die verkürzte Variante mit kürzerem Lauf und Griff für verdecktes Tragen. Daneben existieren zahlreiche weitere Ausführungen wie die CZ 75 TS Tactical Sport für IPSC Standard Division und die CZ 75 Kadet, ein Wechselsystem im Kaliber .22 LR zum günstigen Training.

Im Schweizer Kontext ist die CZ 75 seit Jahrzehnten ein fester Bestandteil der Schiesssportszene. Viele Schweizer Sportschützen schätzen die CZ 75 als Einstieg in den IPSC-Sport, da sie werksseitig einen guten Abzug bietet und preislich deutlich unter vergleichbaren Schweizer oder deutschen Pistolen liegt. An den Schweizer Schiesständen trifft man die CZ 75 in allen Varianten an, besonders die SP-01 und die Shadow-Modelle sind im Wettkampf verbreitet. Die Ersatzteilversorgung in der Schweiz ist über spezialisierte Händler und den Importeur gut gesichert. Auch Tuning-Teile von Eemann Tech, Cajun Gun Works oder CZ Custom sind in der Schweiz problemlos erhältlich.

Der Preisguide für den Schweizer Markt 2026 gliedert sich in drei Stufen. Eine CZ 75 B in gutem Zustand mit normalen Gebrauchsspuren wird für CHF 450 bis 600 gehandelt. Exemplare in sehr gutem Zustand mit wenig Schusszahlen und intaktem Finish erzielen CHF 600 bis 800. Neuwertige oder ungeschossene Exemplare mit Originalverpackung und Zubehör liegen bei CHF 800 bis 1000. Die SP-01-Versionen liegen preislich etwa CHF 100 bis 200 höher, die Shadow-Modelle können gebraucht CHF 900 bis 1300 erreichen. Originalmagazine kosten einzeln CHF 35 bis 50, was im Vergleich zu SIG oder HK moderat ist.

Beim Kauf einer gebrauchten CZ 75 sollte man den Zustand der Schlittenführungen besonders beachten. Da der Schlitten innen läuft, können abgenutzte Führungsflächen die Präzision beeinträchtigen. Den Abzug im DA- und SA-Modus testen und auf Kratzen oder ungleichmässigen Druckpunkt achten. Die Laufmündung auf Beschädigungen prüfen und durch den Lauf schauen, um den Zustand der Züge und Felder zu beurteilen. Der Hahn sollte sicher in der Rast einrasten, und die manuelle Sicherung muss fest und eindeutig arbeiten. Seriennummern auf Rahmen, Schlitten und Lauf sollten übereinstimmen. Bei älteren Modellen ohne Schlagbolzensicherung (Pre-B) ist besondere Vorsicht geboten, diese Modelle haben aber bei Sammlern einen eigenen Reiz.

Rechtlich unterliegt die CZ 75 in der Schweiz dem Waffengesetz und erfordert einen Waffenerwerbsschein (WES). Schweizer Bürger und Personen mit Niederlassungsbewilligung C können den WES beim kantonalen Waffenbüro beantragen. EU-Bürger mit Aufenthaltsbewilligung B benötigen zusätzlich eine Bescheinigung des Heimatlandes. Die CZ 75 ist als halbautomatische Pistole mit Magazinen bis 20 Schuss WES-pflichtig. Magazine mit einer Kapazität über 20 Schuss würden eine Ausnahmebewilligung erfordern, sind aber für die CZ 75 ohnehin nicht standardmässig erhältlich.`,
    rechtsstatus: 'wes',
    typischeKaliber: ['9×19mm', '.40 S&W'],
    tags: ['Pistole', 'CZ', 'CZ75', 'Tschechien', 'IPSC', 'Präzision'],
    relatedSlugs: ['sig-p226', 'beretta-92', 'tanfoglio-witness', 'glock-17'],
  },

  {
    slug: 'cz-shadow2',
    titel: 'CZ Shadow 2',
    kategorie: 'Pistole',
    hersteller: 'CZ',
    baujahr: '2016',
    kurzbeschreibung: 'Die dominante IPSC Production-Pistole. Werksseitig mit bestem DA/SA-Abzug auf dem Markt.',
    inhalt: `Die CZ Shadow 2 ist die dominierende Wettkampfpistole in der IPSC Production Division und hat sich seit ihrer Einführung 2016 als Mass aller Dinge in dieser Disziplin etabliert. Was die Shadow 2 besonders macht, ist die kompromisslose Ausrichtung auf den Schiesssport bei gleichzeitig werksseitig so hoher Qualität, dass viele Schützen sie direkt aus der Schachtel im Wettkampf einsetzen. Das absichtlich hohe Gewicht von 1280 Gramm, der tiefe Griffansatz und der ab Werk hervorragende Single-Action-Abzug machen sie zu einer Pistole, die auf Geschwindigkeit und Präzision gleichermassen optimiert ist.

Die Entwicklungsgeschichte der Shadow 2 beginnt mit der CZ 75 SP-01 Shadow, die 2009 in Zusammenarbeit mit dem CZ-Werksteam für den Schiesssport entwickelt wurde. Die SP-01 Shadow war bereits erfolgreich, doch fehlte ihr ein von Grund auf als Wettkampfwaffe konzipiertes Design. CZ analysierte das Feedback von Spitzenschützen weltweit und entwickelte eine komplett überarbeitete Version. 2016 wurde die Shadow 2 vorgestellt, mit neuem Griffstück, höherer Beavertail-Abdeckung, verbesserter Schlittenführung und deutlich mehr Gewicht. Der Erfolg war durchschlagend. Innerhalb eines Jahres nach der Markteinführung gewann die Shadow 2 die IPSC-Weltmeisterschaft in der Production Division. Seither dominiert sie diese Klasse mit einer Verbreitung, die keine andere Pistole erreicht. An IPSC-Wettkämpfen weltweit schiessen regelmässig über 50 Prozent der Teilnehmer in der Production Division eine Shadow 2.

Die technischen Daten sprechen für sich. Die Shadow 2 verschiesst das Kaliber 9×19mm und arbeitet als Kurzhub-Rückstosslader mit modifiziertem Browning-Verschluss. Das Magazin fasst 17 Schuss. Die Lauflänge beträgt 120mm bei einer Gesamtlänge von 228mm. Das Gewicht von 1280 Gramm leer ist bewusst hoch gewählt, denn mehr Masse bedeutet weniger Rückstoss und schnellere Folgschüsse. Der DA/SA-Abzug erreicht im Single-Action-Modus ab Werk ein Abzugsgewicht von rund 1,3 Kilogramm mit einem kurzen, knackigen Reset. Dieser Abzug ist so gut, dass er in der Welt der Serienpistolen als Referenz gilt. Im Double-Action-Modus liegt das Abzugsgewicht bei etwa 4,5 Kilogramm mit einem langen, aber gleichmässigen Weg. Die Schlittenführung wurde gegenüber der SP-01 verbessert und bietet minimales Spiel, was sich direkt in der Präzision niederschlägt.

Der Griff der Shadow 2 wurde komplett neu gestaltet. Er sitzt höher als bei der SP-01, sodass die schiessende Hand näher an der Laufachse liegt. Dies reduziert den Muzzle Flip erheblich und ermöglicht schnellere Schussfolgen. Die Griffschalen sind aus Aluminium gefertigt und tragen zum hohen Gewicht bei. Die Checkering an den Griffseiten bietet ausreichend Halt, ohne bei langen Wettkämpfen die Hände zu strapazieren. Der erweiterte Beavertail schützt die Hand vor dem Hahn und ermöglicht einen höheren, festeren Griff. Der Magazintrichter ist ab Werk montiert und erleichtert schnelle Magazinwechsel unter Stress.

Es gibt drei Hauptvarianten der Shadow 2. Das Standardmodell ist in Schwarz oder Urban Grey erhältlich und deckt die Bedürfnisse der meisten Schützen ab. Die Shadow 2 OR (Optics Ready) verfügt über einen gefrästen Schlitten zur Aufnahme von Rotpunktvisieren und richtet sich an Schützen, die in der Production Optics Division antreten. Die Shadow 2 Orange ist die Premium-Ausführung, die im CZ-Werk von Hand gefittet wird, mit poliertem Abzugsmechanismus und noch engeren Toleranzen. Sie ist die Wahl für ambitionierte Wettkampfschützen, die das Maximum aus der Plattform herausholen wollen.

Im Schweizer Kontext hat die CZ Shadow 2 die Wettkampfszene nachhaltig verändert. An Schweizer IPSC-Matches ist sie die mit Abstand häufigste Pistole in der Production Division. Die Kombination aus hoher Qualität ab Werk, moderatem Preis im Vergleich zur Konkurrenz und der enormen Verfügbarkeit von Zubehör und Tuning-Teilen macht sie zur logischen Wahl für Ein- und Aufsteiger im IPSC-Sport. Schweizer Händler führen die Shadow 2 regelmässig auf Lager, und die Wartezeiten sind mittlerweile kurz. Tuning-Teile von Eemann Tech, CZ Custom oder Cajun Gun Works sind über Schweizer Fachhändler erhältlich. Viele Schweizer IPSC-Schützen schiessen die Shadow 2 im Werkszustand und investieren allenfalls in bessere Griffschalen oder einen leicht angepassten Abzug.

Der Preisguide für den Schweizer Markt 2026 zeigt folgendes Bild. Eine gebrauchte Shadow 2 in gutem Zustand mit sichtbaren Gebrauchsspuren und höherer Schusszahl wird für CHF 900 bis 1100 gehandelt. Exemplare in sehr gutem Zustand mit moderater Nutzung und intaktem Finish erzielen CHF 1100 bis 1400. Neuwertige oder wenig geschossene Exemplare mit Originalverpackung und allem Zubehör liegen bei CHF 1400 bis 1700. Die OR-Version liegt preislich CHF 100 bis 200 über dem Standardmodell. Die Shadow 2 Orange erzielt gebraucht CHF 1800 bis 2500, neuwertig CHF 2500 bis 3000. Neupreise beim Händler liegen für das Standardmodell bei rund CHF 1500 bis 1700.

Beim Kauf einer gebrauchten Shadow 2 sollte man bedenken, dass diese Pistolen oft intensiv im Wettkampf eingesetzt werden. Schusszahlen von 10000 bis 30000 sind keine Seltenheit. Den Lauf auf Abnutzung der Züge und Felder prüfen. Den Abzug im SA-Modus testen und auf den Reset achten, der knackig und kurz sein sollte. Die Schlittenführung auf Spiel prüfen, indem man den Schlitten bei gesicherter Waffe leicht seitlich bewegt. Der Magazintrichter sollte fest sitzen, und die Griffschalen dürfen kein Spiel aufweisen. Fragen nach durchgeführtem Tuning sind wichtig, denn unsachgemässe Modifikationen können Probleme verursachen. Originalteile wie Federn und Abzugsstange sind Verschleissteile und sollten bei hohen Schusszahlen ersetzt worden sein.

Rechtlich ist die CZ Shadow 2 in der Schweiz WES-pflichtig. Der Erwerb erfordert einen Waffenerwerbsschein, der beim kantonalen Waffenbüro beantragt wird. Als halbautomatische Pistole mit Magazinen unter 20 Schuss fällt sie in die Standardkategorie. Der Besitz ist nach Erwerb meldepflichtig, und die Waffe muss sicher aufbewahrt werden. Für den Transport zum Schiessstand gelten die üblichen Vorschriften: Die Waffe muss entladen und getrennt von der Munition transportiert werden.`,
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
    inhalt: `Die Beretta 92, in der militärischen Variante als M9 bekannt, ist eine der ikonischsten Dienstpistolen des 20. Jahrhunderts. Was diese Pistole besonders macht, ist ihre einzigartige Konstruktion mit offener Schlittenoberseite, dem Schwenkriegel-Verriegelungssystem und dem robusten Aluminiumrahmen. Diese Kombination bietet eine Zuverlässigkeit, die sich in über drei Jahrzehnten Militärdienst bei der US-Armee bewährt hat. Dazu kommt ein markantes, sofort erkennbares Design, das die Beretta 92 zu einer der meistfotografierten und filmisch am häufigsten eingesetzten Pistolen der Welt gemacht hat.

Die Geschichte der Beretta 92 beginnt 1975 in der Beretta-Fabrik in Gardone Val Trompia, Italien. Beretta, einer der ältesten Waffenhersteller der Welt mit einer Geschichte bis ins Jahr 1526, entwickelte die 92 als moderne Dienstpistole auf Basis der Beretta M1951. Das Design übernahm das Schwenkriegel-Verriegelungssystem der Walther P38, kombinierte es aber mit einem Aluminium-Rahmen und einem doppelreihigen Magazin. 1985 gewann die Beretta 92 die kontroverse Ausschreibung der US-Armee und ersetzte die legendäre Colt M1911A1, die seit 1911 im Dienst gestanden hatte. Als M9 wurde sie zur Standard-Dienstpistole aller US-Teilstreitkräfte. Über 600000 Exemplare wurden an das US-Militär geliefert, bevor sie 2017 durch die SIG P320 als M17 und M18 abgelöst wurde. Neben den USA setzen Dutzende von Streitkräften und Polizeieinheiten weltweit die Beretta 92 ein, darunter die italienischen Carabinieri, die französische Gendarmerie und brasilianische Streitkräfte.

Technisch arbeitet die Beretta 92 als Kurzhub-Rückstosslader mit Schwenkriegel-Verriegelung, auch als Walther-Prinzip oder Propeller-Verriegelung bekannt. Anders als beim Browning-System, bei dem der Lauf beim Entriegeln kippt, bleibt der Lauf der Beretta 92 achsparallel. Dies führt theoretisch zu einer besseren Präzision, da der Lauf sich beim Schuss nicht verkantet. Das Kaliber ist 9×19mm Parabellum. Das Magazin fasst 15 Schuss in der militärischen M9-Version und 17 Schuss im zivilen 92FS-Standardmagazin. Die Lauflänge beträgt 125mm bei einer Gesamtlänge von 217mm. Das Gewicht liegt bei 950 Gramm leer. Der DA/SA-Abzug arbeitet mit einem kombinierten Sicherungs- und Entkupplungshebel auf dem Schlitten, der den Hahn sicher ablässt und gleichzeitig als Sicherung fungiert. Das markanteste Merkmal ist die offene Schlittenoberseite, ein Beretta-Markenzeichen, das den Hülsenauswurf extrem zuverlässig macht und Auswurfstörungen praktisch ausschliesst.

Die Variantenvielfalt der Beretta 92 ist über die Jahrzehnte gewachsen. Die 92FS ist die verbesserte Zivilversion mit einer Sicherungsnut am Schlitten, die verhindert, dass sich der Schlitten bei einem Bruch nach hinten löst. Die M9A3 ist eine modernisierte Militärversion mit FDE-Finish, Gewindlauf für Schalldämpfer und Zubehörschiene. Die 92X Performance ist die Wettkampfvariante mit schwererem Brigadier-Schlitten, Skeleton-Hammer und verbessertem Abzug. Die Beretta M9A4 ist die aktuelle Generation mit Optics-Ready-Schlitten für Rotpunktvisiere und modularem Griffrücken. Jede dieser Varianten behält das grundlegende 92-Design bei, optimiert aber spezifische Aspekte für den jeweiligen Einsatzzweck.

Im Schweizer Kontext ist die Beretta 92 weniger verbreitet als etwa Glock- oder SIG-Pistolen, hat aber eine treue Anhängerschaft. Sie wird vor allem von Sammlern und Liebhabern geschätzt, die den Charakter einer klassischen Ganzmetallpistole mit DA/SA-Abzug bevorzugen. Im Schweizer Schiesssport wird sie gelegentlich im Ordonnanzpistolenschiessen eingesetzt, wobei die 92X Performance auch in IPSC Production eine Nische besetzt. Die Ersatzteilversorgung in der Schweiz ist über den Beretta-Importeur und spezialisierte Händler gewährleistet. Magazine und Zubehör sind gut verfügbar, da die Beretta 92 weltweit eine der meistproduzierten Pistolen ist.

Der Preisguide für den Schweizer Markt 2026 zeigt folgende Richtwerte. Eine Beretta 92FS in gutem Zustand mit normalen Gebrauchsspuren wird für CHF 500 bis 700 gehandelt. Exemplare in sehr gutem Zustand mit wenig Schusszahlen und gepflegtem Finish erzielen CHF 700 bis 950. Neuwertige Exemplare mit Originalverpackung und Zubehör liegen bei CHF 950 bis 1200. Die 92X Performance liegt deutlich höher, gebraucht bei CHF 1200 bis 1600, neuwertig bei CHF 1600 bis 2000. Militärische M9-Exemplare mit nachgewiesener Armeehistorie können bei Sammlern Aufpreise erzielen. Magazine kosten einzeln CHF 30 bis 45.

Beim Kauf einer gebrauchten Beretta 92 sollte man besonders auf den Zustand des Schlittens achten, da die offene Bauweise anfälliger für Korrosion an den Innenflächen sein kann. Den Schwenkriegel auf Abnutzung prüfen, denn er ist ein zentrales Verschleissteil. Die Verriegelungsflächen am Lauf und am Rahmen inspizieren. Der Aluminiumrahmen sollte keine Risse oder tiefe Kratzer aufweisen. Den Sicherungshebel auf beiden Seiten testen, er muss satt und eindeutig einrasten. Bei älteren 92er-Modellen ohne die FS-Sicherungsnut am Schlitten ist besondere Vorsicht geboten. Die Magazinhalterung sollte die Magazine sicher halten und beim Betätigen des Magazinlösers zuverlässig freigeben.

Rechtlich erfordert die Beretta 92 in der Schweiz einen Waffenerwerbsschein (WES). Der Erwerb erfolgt über das kantonale Waffenbüro. Als halbautomatische Pistole mit Magazinen bis 20 Schuss fällt sie in die Standardkategorie des Waffengesetzes. Die Beretta 92 unterliegt keinen besonderen Einschränkungen und kann von allen WES-berechtigten Personen erworben werden. Die Aufbewahrung muss sicher erfolgen, und der Transport zum Schiessstand erfordert die Waffe entladen und getrennt von der Munition.`,
    rechtsstatus: 'wes',
    typischeKaliber: ['9×19mm'],
    tags: ['Pistole', 'Beretta', 'M9', 'US-Army', 'Film'],
    relatedSlugs: ['sig-p226', 'cz75', 'hk-usp', 'walther-p38'],
  },

  {
    slug: 'hk-usp',
    titel: 'Heckler & Koch USP',
    kategorie: 'Pistole',
    hersteller: 'Heckler & Koch',
    baujahr: '1993',
    kurzbeschreibung: 'Deutsche Präzision von HK. Polymer-Rahmen mit O-Ring Rückstoßdämpfer. Bei Spezialeinheiten beliebt.',
    inhalt: `Die Heckler und Koch USP, die Universelle Selbstladepistole, ist ein Meilenstein in der Geschichte der modernen Dienstpistolen. Was die USP besonders macht, ist ihre Kombination aus einem robusten Polymerrahmen mit Stahleinlagen, einem patentierten Rückstoss-Puffersystem und einer beispiellosen Modularität bei den Abzugskonfigurationen. Zehn verschiedene Abzugsvarianten, drei verfügbare Kaliber und eine Reihe von Grössen machen die USP zu einem der vielseitigsten Pistolensysteme, die je entwickelt wurden. Dazu kommt die sprichwörtliche HK-Qualität, die sich in einer Lebensdauer von über 20000 Schuss ohne wesentlichen Verschleiss niederschlägt.

Die Entwicklung der USP begann Ende der 1980er-Jahre bei Heckler und Koch in Oberndorf am Neckar. HK erkannte früh, dass der US-Behördenmarkt, damals der grösste Abnehmer von Dienstpistolen, zunehmend das Kaliber .40 S&W bevorzugte. Statt eine bestehende 9mm-Pistole auf das grössere Kaliber umzurüsten, entwarf HK die USP von Grund auf für das .40-Kaliber und passte sie dann an 9mm und .45 ACP an. 1993 wurde die USP vorgestellt und war die erste Serienpistole mit integrierter Zubehörschiene, die die Montage von Taschenlampen und Lasern ohne Adapter erlaubte. Diese heute selbstverständliche Eigenschaft war damals revolutionär. Die USP wurde rasch von zahlreichen Behörden weltweit übernommen, darunter deutsche Zollbehörden, amerikanische Bundesagenturen und Spezialeinheiten verschiedener Länder. Die .45-ACP-Variante bildete die Grundlage für die berühmte Mk23 SOCOM, die für das US Special Operations Command entwickelt wurde.

Technisch arbeitet die USP als Kurzhub-Rückstosslader mit einem modifizierten Browning-Verschluss. Das Besondere ist das HK-Rückstoss-Puffersystem, eine separate Feder im Verschluss, die den Aufprall des Schlittens auf den Rahmen abfedert und die mechanische Belastung um bis zu 30 Prozent reduziert. Dies verlängert die Lebensdauer der Waffe erheblich und reduziert den spürbaren Rückstoss. Die USP ist in den Kalibern 9×19mm, .40 S&W und .45 ACP erhältlich. Die Magazinkapazität beträgt 15 Schuss in 9mm, 13 in .40 und 12 in .45. Die Lauflänge liegt bei 108mm, die Gesamtlänge bei 194mm, und das Gewicht beträgt 748 Gramm leer in der 9mm-Version. Der kaltgehämmerte Polygonallauf garantiert Langlebigkeit und Präzision. Der Polymerrahmen verwendet Stahleinlagen an allen kritischen Belastungspunkten und ist chemisch beständig gegen Lösungsmittel, Öle und Korrosion.

Die Modularität des Abzugssystems ist ein Alleinstellungsmerkmal der USP. Zehn verschiedene Konfigurationen, bezeichnet als V1 bis V10, erlauben die Wahl zwischen DA/SA mit Sicherung und Entkupplung, DA/SA nur mit Entkupplung, DA/SA nur mit Sicherung, DAO und dem LEM-System, das einen konstanten Abzugsweg ohne DA/SA-Unterschied bietet. Diese Flexibilität macht die USP für unterschiedlichste Einsatzkonzepte geeignet. Die Variantenpalette umfasst die USP Compact mit verkürztem Lauf und Griff, die USP Expert mit verlängertem Lauf von 124mm und einstellbarem Visier, die USP Tactical mit Gewindlauf für Schalldämpfer und erhöhter Visierung, sowie die USP Match mit Gewichtskompensator für den Schiesssport.

Im Schweizer Kontext geniesst die USP einen soliden Ruf als zuverlässige und langlebige Pistole. Sie ist bei Schweizer Sportschützen beliebt, die eine robuste DA/SA-Pistole mit HK-Qualität suchen, und wird auch als Heimverteidigungswaffe geschätzt. Die Verarbeitungsqualität und die Zuverlässigkeit der USP sind in der Schweiz unanfochten, wobei der etwas klobigere Griff im Vergleich zu neueren HK-Modellen wie der VP9 oder P30 von manchen Schützen als Nachteil empfunden wird. Ersatzteile und Zubehör sind über den Schweizer HK-Importeur und spezialisierte Händler gut verfügbar. Die USP in .45 ACP hat in der Schweiz eine besondere Anhängerschaft, da es nur wenige hochwertige Polymerpistolen in diesem Kaliber gibt.

Der Preisguide für den Schweizer Markt 2026 sieht wie folgt aus. Eine USP in gutem Zustand mit normalen Gebrauchsspuren wird je nach Kaliber für CHF 550 bis 750 gehandelt. Exemplare in sehr gutem Zustand erzielen CHF 750 bis 1000. Neuwertige Exemplare mit Originalverpackung und Zubehör liegen bei CHF 1000 bis 1300. Die .45-ACP-Versionen liegen tendenziell CHF 50 bis 100 über den 9mm-Preisen. Die USP Expert und Tactical erzielen gebraucht CHF 900 bis 1400, neuwertig CHF 1400 bis 1800. Die USP Match ist seltener und kann gebraucht CHF 1200 bis 1800 erreichen. Originalmagazine kosten CHF 40 bis 60.

Beim Kauf einer gebrauchten USP sollte man den Zustand des Rückstoss-Puffers prüfen, der nach vielen Schüssen ermüden kann. Die Abzugsvariante bestimmen, da ein Wechsel möglich, aber nicht trivial ist. Den Polymerrahmen auf Risse oder Verformungen untersuchen, besonders am Bereich der Zubehörschiene. Die Schlittenführungen auf Abnutzung kontrollieren. Der Polygonallauf sollte keine Ablagerungen oder Beschädigungen aufweisen. Die Sicherungs- oder Entkupplungshebel müssen satt und eindeutig einrasten. Bei der USP Tactical den Gewindlauf auf Beschädigungen am Gewinde prüfen.

Rechtlich ist die HK USP in der Schweiz WES-pflichtig. Der Waffenerwerbsschein wird beim kantonalen Waffenbüro beantragt. Alle Kalibervarianten fallen als halbautomatische Pistolen unter die gleiche Regelung. Die Magazinkapazitäten der USP liegen alle unter 20 Schuss, sodass keine Ausnahmebewilligung erforderlich ist. Die USP unterliegt keinen besonderen Einschränkungen und kann von allen WES-berechtigten Personen erworben werden.`,
    rechtsstatus: 'wes',
    typischeKaliber: ['9×19mm', '.40 S&W', '.45 ACP'],
    tags: ['Pistole', 'HK', 'USP', 'Deutschland', 'Polymer'],
    relatedSlugs: ['sig-p226', 'glock-17', 'beretta-92', 'walther-ppq'],
  },

  {
    slug: 'hk-vp9',
    titel: 'Heckler & Koch VP9',
    kategorie: 'Pistole',
    hersteller: 'HK',
    baujahr: '2014',
    kurzbeschreibung: 'HKs moderne Striker-Pistole. Exzellenter Abzug, BSF-System für individuelle Griffanpassung.',
    inhalt: `Die Heckler und Koch VP9 ist HKs Antwort auf den globalen Trend zur Striker-Fired-Pistole und hat sich seit ihrer Einführung 2014 als eine der besten Pistolen in dieser Kategorie etabliert. Was die VP9 besonders macht, ist die Kombination aus dem besten Striker-Fired-Abzug auf dem Markt, einem einzigartigen modularen Griffsystem mit 27 Kombinationsmöglichkeiten und der kompromisslosen HK-Fertigungsqualität. Im direkten Vergleich mit der Glock 17, der SIG P320 oder der Walther PDP bietet die VP9 einen spürbar besseren Abzug mit sauberem Druckpunkt und knackigem Reset, der an einen guten Single-Action-Abzug erinnert.

Die Entwicklungsgeschichte der VP9 reicht weiter zurück als man vermuten würde. HK hatte bereits 1970 mit der VP70 die weltweit erste Polymer-Pistole mit Striker-System vorgestellt, doch diese war ihrer Zeit technisch voraus und kommerziell kein durchschlagender Erfolg. Über vier Jahrzehnte später nahm HK das Striker-Konzept wieder auf, diesmal mit dem gesammelten Wissen aus der Entwicklung der USP, P2000 und P30. Das Ergebnis war die VP9, die 2014 vorgestellt wurde und sofort für Aufsehen sorgte. Der Name VP steht für Volkspistole, eine bewusste Anlehnung an die VP70, und signalisiert HKs Anspruch, eine hochwertige Pistole zu einem zugänglicheren Preis als die traditionellen HK-Modelle anzubieten. Die VP9 wurde von Behörden und Zivilschützen gleichermassen gut aufgenommen und hat sich als eine der meistverkauften HK-Pistolen überhaupt etabliert.

Technisch arbeitet die VP9 als Kurzhub-Rückstosslader mit Schlagbolzenschloss im Kaliber 9×19mm. Das Magazin fasst 17 Schuss im Standardmodell, optional sind 10- und 15-Schuss-Magazine erhältlich. Die Lauflänge beträgt 104mm bei einer Gesamtlänge von 184mm und einem Gewicht von 726 Gramm leer. Der kaltgehämmerte Polygonallauf ist auf über 20000 Schuss Lebensdauer ausgelegt und bietet hervorragende Präzision. Das Abzugsgewicht liegt bei rund 2,5 Kilogramm mit einem kurzen Vorlauf, einem definierten Druckpunkt und einem sehr kurzen, taktil spürbaren Reset. Dieser Abzug ist das Herzstück der VP9 und der Hauptgrund, warum viele Schützen sie der Konkurrenz vorziehen.

Das modulare Griffsystem der VP9 ermöglicht 27 verschiedene Kombinationen aus austauschbaren Griffrücken und Seitenteilen in je drei Grössen. Damit kann die Pistole an praktisch jede Handgrösse und -form angepasst werden. Die beidseitigen Ladehilfen, von HK als Charging Supports bezeichnet, sind am hinteren Ende des Schlittens angebracht und erleichtern das Durchladen erheblich, besonders mit nassen oder behandschuhten Händen. Der Magazinlöser ist als HK-typischer Paddle-Hebel am Abzugsbügel ausgeführt und beidseits bedienbar. Die Zubehörschiene am Rahmen nimmt gängige Lampen und Laser auf.

Die Variantenpalette der VP9 ist umfangreich. Das Standardmodell deckt die meisten Bedürfnisse ab. Die VP9 OR (Optics Ready) verfügt über einen gefrästen Schlitten mit verschiedenen Adapterplatten für Rotpunktvisiere aller gängigen Hersteller. Die VP9 Tactical bietet einen Gewindlauf für Schalldämpfer und erhöhte Nachtvisierung. Die VP9-B ersetzt den Paddle-Magazinlöser durch einen Druckknopf, was Umsteiger von Glock oder SIG bevorzugen. Die VP9 Match verfügt über einen verlängerten 5,51-Zoll-Lauf und einen optimierten Sporttrigger für den Wettkampfeinsatz.

Im Schweizer Kontext hat die VP9 eine wachsende Fangemeinde. Sie spricht Schützen an, die die Einfachheit eines Striker-Systems schätzen, aber nicht auf Abzugsqualität verzichten wollen. Im Vergleich zur allgegenwärtigen Glock bietet die VP9 einen deutlich besseren Abzug und eine individuellere Griffanpassung. Für IPSC Production ist sie eine valable Alternative zur CZ Shadow 2, wobei sie mit ihrem geringeren Gewicht schneller aus dem Holster gezogen werden kann. Die Ersatzteilversorgung über den Schweizer HK-Importeur ist zuverlässig, und auch Zubehör wie Holster, Magazine und Visierungen sind gut verfügbar.

Der Preisguide für den Schweizer Markt 2026 gliedert sich wie folgt. Eine VP9 in gutem Zustand mit normalen Gebrauchsspuren wird für CHF 500 bis 700 gehandelt. Exemplare in sehr gutem Zustand mit wenig Schusszahlen erzielen CHF 700 bis 900. Neuwertige Exemplare mit Originalverpackung und Zubehör liegen bei CHF 900 bis 1100. Die OR-Version liegt preislich CHF 50 bis 150 über dem Standardmodell. Die VP9 Match erzielt gebraucht CHF 900 bis 1200, neuwertig CHF 1200 bis 1500. Neupreise beim Händler beginnen bei rund CHF 900 für das Standardmodell. Magazine kosten einzeln CHF 40 bis 55.

Beim Kauf einer gebrauchten VP9 den Abzug besonders aufmerksam testen, da er das Hauptargument für diese Pistole ist. Der Reset muss kurz und knackig sein, und der Druckpunkt darf nicht schwammig wirken. Die Griffrücken und Seitenteile auf festen Sitz prüfen. Die Charging Supports am Schlitten sollten fest sitzen und keine Risse aufweisen. Den Polymerrahmen auf Verformungen oder Risse untersuchen, besonders an der Zubehörschiene und den Führungsschienen. Die Verriegelung zwischen Lauf und Schlitten auf Spiel prüfen. Bei der OR-Version die Fräsung und die Adapterplatten auf Beschädigungen kontrollieren.

Rechtlich erfordert die HK VP9 in der Schweiz einen Waffenerwerbsschein (WES). Als halbautomatische Pistole mit Standardmagazinen unter 20 Schuss fällt sie in die reguläre WES-Kategorie. Der Erwerb erfolgt über das kantonale Waffenbüro. Die VP9 unterliegt keinen besonderen Einschränkungen und kann von allen WES-berechtigten Personen erworben werden.`,
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
    inhalt: `Die Heckler und Koch P30 ist eine modulare Dienstpistole, die 2006 als Nachfolgerin der P2000 vorgestellt wurde und sich seither als eine der vielseitigsten und ergonomischsten Polizeipistolen auf dem Markt etabliert hat. Was die P30 besonders macht, ist ihr einzigartiges modulares Griffsystem mit 27 Kombinationsmöglichkeiten, die vollständig ambidextre Bedienung und die Wahl zwischen einem klassischen DA/SA-Abzug und dem innovativen LEM-System. Die P30 vereint die bewährte HK-Zuverlässigkeit mit modernem Design und ist die Dienstpistole der deutschen Bundespolizei, mehrerer Landespolizeien und zahlreicher europäischer Behörden. Einem breiteren Publikum wurde sie durch die John-Wick-Filmreihe bekannt.

Die Entwicklung der P30 basiert auf den Erfahrungen, die HK mit der P2000 gesammelt hatte. Die P2000 war 2001 als kompakte Polizeipistole eingeführt worden, doch Behörden wünschten sich ein grösseres Modell mit verbesserter Ergonomie und mehr Anpassungsmöglichkeiten. HK entwickelte die P30 mit einem komplett neuen Griffstück, das austauschbare Griffrücken und Seitenteile in je drei Grössen bietet. 2006 wurde die P30 vorgestellt und gewann rasch Ausschreibungen bei deutschen und europäischen Polizeibehörden. Die deutsche Bundespolizei übernahm sie als Standarddienstwaffe, ebenso verschiedene Landespolizeien und Zollbehörden. International wird die P30 von norwegischen, portugiesischen und verschiedenen anderen europäischen Polizeieinheiten eingesetzt.

Technisch arbeitet die P30 als Kurzhub-Rückstosslader mit modifiziertem Browning-Verschluss im Kaliber 9×19mm, wobei auch eine .40-S&W-Variante erhältlich ist. Das Magazin fasst 15 Schuss in 9mm. Die Lauflänge beträgt 99mm bei einer Gesamtlänge von 178mm und einem Gewicht von 740 Gramm leer. Der kaltgehämmerte Polygonallauf bietet exzellente Präzision und Langlebigkeit. Die P30 ist mit zwei unterschiedlichen Abzugssystemen erhältlich. Der klassische DA/SA-Abzug bietet einen langen Double-Action-Erstschuss und kurze, leichte Single-Action-Folgeschüsse. Das LEM-System (Law Enforcement Modification) bietet einen konstanten Abzugsweg von rund 3,5 Kilogramm ohne den Unterschied zwischen DA und SA, was die Ausbildung vereinfacht und das Risiko von unbeabsichtigten Schüssen bei Stress reduziert. Das LEM-System ist bei Behörden besonders beliebt, da es die Vorteile eines gespannten Abzugs mit der Sicherheit eines langen Abzugswegs kombiniert.

Das modulare Griffsystem ist das herausragende Merkmal der P30. Austauschbare Griffrücken in klein, mittel und gross sowie austauschbare Seitenteile in denselben drei Grössen ermöglichen 27 verschiedene Kombinationen. Damit kann die P30 an praktisch jede Handgrösse angepasst werden, was besonders für Behörden mit vielen unterschiedlichen Nutzern wichtig ist. Alle Bedienelemente sind vollständig ambidextr ausgelegt. Der Magazinlöser ist als beidseitig bedienbarer Paddle-Hebel am Abzugsbügel ausgeführt, und der Schlittenfanghebel ist beidseitig angebracht. Die Zubehörschiene am Rahmen nimmt gängige Lampen und Laser auf.

Die Variantenpalette umfasst vier Hauptmodelle. Die P30 ist das Standardmodell mit 99mm Lauflänge. Die P30L verfügt über einen verlängerten Lauf und Schlitten mit 112mm Lauflänge, was eine längere Visierlinie und leicht bessere Präzision bietet. Die P30S ergänzt das Standardmodell um eine manuelle Sicherung am Rahmen. Die P30SK ist die Subkompakt-Version mit verkürztem Lauf und Griff für verdecktes Tragen oder als Backup-Waffe.

Im Schweizer Kontext ist die P30 bei Sportschützen und Privatpersonen gleichermassen beliebt. Sie bietet die typische HK-Qualität zu einem moderaten Preis und eignet sich sowohl für den Schiesssport als auch für die Heimverteidigung. Das modulare Griffsystem wird von Schützen mit kleineren oder grösseren Händen besonders geschätzt, da es eine optimale Passform ermöglicht. Die Ersatzteilversorgung in der Schweiz ist über den HK-Importeur und Fachhändler gesichert. Magazine und Zubehör sind weitgehend mit der VP9 kompatibel, was die Verfügbarkeit verbessert. Im Wettkampfbereich wird die P30L gelegentlich in der IPSC Production Division eingesetzt, wobei sie dort gegen die CZ Shadow 2 einen schweren Stand hat.

Der Preisguide für den Schweizer Markt 2026 zeigt folgendes Bild. Eine P30 in gutem Zustand mit normalen Gebrauchsspuren wird für CHF 500 bis 700 gehandelt. Exemplare in sehr gutem Zustand mit wenig Schusszahlen erzielen CHF 700 bis 900. Neuwertige Exemplare mit Originalverpackung und Zubehör liegen bei CHF 900 bis 1150. Die P30L liegt preislich CHF 50 bis 100 über der Standardversion. Ehemalige Behördenwaffen tauchen gelegentlich auf dem Markt auf und bieten oft ein gutes Preis-Leistungs-Verhältnis bei CHF 400 bis 600, wobei sie hohe Schusszahlen aufweisen können. Magazine kosten einzeln CHF 35 bis 50.

Beim Kauf einer gebrauchten P30 sollte man den Abzugsmodus bestimmen, da der Wechsel zwischen DA/SA und LEM möglich, aber aufwendig ist. Das Griffsystem auf Vollständigkeit und festen Sitz prüfen, inklusive aller mitgelieferten Griffrücken und Seitenteile. Den Polymerrahmen auf Risse oder Verformungen untersuchen. Bei ehemaligen Behördenwaffen die Schusszahl beachten, die bei Polizeipistolen oft im Bereich von 5000 bis 15000 liegt. Den Paddle-Magazinlöser auf einwandfreie Funktion testen. Die Schlittenführungen auf Abnutzung kontrollieren. Bei der P30L den verlängerten Lauf auf Mündungsbeschädigungen prüfen.

Rechtlich erfordert die HK P30 in der Schweiz einen Waffenerwerbsschein (WES). Als halbautomatische Pistole mit Magazinen unter 20 Schuss fällt sie in die Standardkategorie. Ehemalige Behördenwaffen unterliegen denselben Bestimmungen wie zivile Modelle. Der Erwerb erfolgt über das kantonale Waffenbüro, und die Waffe muss nach dem Kauf sicher aufbewahrt werden.`,
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
    inhalt: `Die Heckler und Koch Mk 23 ist eine der aussergewöhnlichsten Pistolen, die je in Serie gefertigt wurden. Was sie so besonders macht, ist ihr Ursprung: Sie wurde nicht als Kompromiss zwischen verschiedenen Anforderungen geboren, sondern als kompromissloses Werkzeug für eine einzige Aufgabe. Das US Special Operations Command wollte eine Offensivwaffe, die Spezialeinheiten als primäre Kampfwaffe einsetzen konnten, nicht bloss als Backup. Das Ergebnis ist eine Pistole, die in Sachen Grösse, Gewicht und Robustheit alles überragt, was je für eine Militäreinheit gebaut wurde.

Die Geschichte der Mk 23 beginnt 1991, als USSOCOM das Programm Offensive Handgun Weapon System ausschrieb. Die Anforderungen waren extrem: Die Pistole musste in .45 ACP kalibriert sein, mindestens 10 Schuss fassen, einen Schalldämpfer und ein Lasermodul aufnehmen können, und sie musste Salzwasser, Sand, Schlamm sowie extreme Temperaturen überleben. Heckler und Koch in Oberndorf am Neckar gewann den Wettbewerb 1996 gegen Colt. Die Waffe wurde als Mk 23 Mod 0 bei den Navy SEALs, Delta Force und weiteren Spezialeinheiten eingeführt. Obwohl sie im Einsatz teilweise durch kompaktere Waffen wie die HK45C ersetzt wurde, bleibt sie bis heute offiziell im Inventar der US-Spezialkräfte.

Technisch basiert die Mk 23 auf einem modifizierten Browning-Kipplaufsystem mit Kurzhub-Rückstossladerung. Der Lauf hat eine Länge von 149 Millimetern und trägt ein Gewinde zur Aufnahme des Knights Armament Company Schalldämpfers. Das Magazin fasst 12 Patronen im Kaliber .45 ACP, und die Waffe ist für den dauerhaften Beschuss mit +P-Munition ausgelegt. Das Gesamtgewicht beträgt leer rund 1210 Gramm, die Gesamtlänge ohne Schalldämpfer 245 Millimeter. Der Abzug arbeitet im DA/SA-Modus mit einem ambidextren Sicherungs- und Entkupplungshebel. Unter dem Lauf befindet sich eine proprietäre Schiene für das Insight LAM, ein kombiniertes Laser- und Lichtmodul. Im berühmten USSOCOM-Test überstand die Mk 23 dreissigtausend Schuss ohne eine einzige Funktionsstörung, was damals kein anderes Waffensystem geschafft hatte.

In der Schweiz ist die Mk 23 eine Randerscheinung, aber sie hat eine treue Fangemeinde unter Sammlern und Schützen, die das Besondere suchen. Da die Waffe nie als Ordonnanzwaffe eines Landes eingeführt wurde, das einen engen Bezug zur Schweiz hat, fehlt die historische Verbindung, die etwa bei der SIG P220 oder der Parabellum-Pistole besteht. Dennoch taucht sie gelegentlich auf dem Schweizer Markt auf, meist als kaum geschossenes Sammlerstück. Schweizer Schützen schätzen die Mk 23 vor allem für das Schiessen auf dem 25-Meter-Stand, wo die Kombination aus schwerem Gewicht, langem Lauf und gutem SA-Abzug bemerkenswerte Präzision ermöglicht. Die Grösse macht sie allerdings für sportliche Disziplinen unpraktisch, und für die Jagd kommt sie aufgrund des Kalibers kaum in Frage.

Was die Preise auf dem Schweizer Markt betrifft, muss man zwischen der militärischen Mk 23 und der zivilen Mark 23 unterscheiden. Echte Militärversionen mit Parkerized-Finish und Maritime-Behandlung sind in der Schweiz extrem selten und erzielen Sammlerpreise. Für die zivile HK Mark 23 gelten folgende Richtwerte im Jahr 2026: Ein Exemplar in gutem Zustand mit normalen Gebrauchsspuren wechselt den Besitzer für ungefähr 2200 bis 2600 Franken. In sehr gutem Zustand, also mit minimalen Tragespuren und einem gepflegten Lauf, sind 2600 bis 3200 Franken realistisch. Neuwertige Exemplare, die kaum oder nie geschossen wurden und idealerweise noch mit Originalbox und Zubehör kommen, können 3200 bis 3800 Franken und mehr erzielen. Die Neupreise lagen beim Schweizer Fachhandel zuletzt bei rund 3500 bis 4000 Franken, sofern die Waffe überhaupt lieferbar war, da HK die Produktion immer wieder unterbricht.

Beim Kauf einer Mk 23 auf dem Gebrauchtmarkt sollte man einige Punkte beachten. Der O-Ring am Lauf, der die Mündung im Schlitten zentriert, ist ein Verschleissteil und sollte geprüft werden. Ersatz-O-Ringe kosten nur wenige Franken, aber ein fehlender oder beschädigter Ring kann die Präzision beeinträchtigen. Die Gewindeschutzhülse am Lauf sollte vorhanden und unbeschädigt sein, da Ersatz schwer zu beschaffen ist. Die Polymerbeschichtung des Rahmens ist sehr widerstandsfähig, aber an den Griffkanten kann sie sich nach intensivem Gebrauch lösen. Der Abzug sollte im SA-Modus klar und sauber brechen, ohne Kriechweg. Im DA-Modus ist der Abzug lang, aber gleichmässig. Die Magazine sind teuer und nicht immer einfach zu beschaffen. Idealerweise kauft man ein Exemplar mit mindestens zwei Magazinen.

Der rechtliche Status in der Schweiz ist klar geregelt. Die HK Mk 23 beziehungsweise Mark 23 fällt als halbautomatische Faustfeuerwaffe unter die Kategorie der bewilligungspflichtigen Waffen. Für den Erwerb benötigt man einen Waffenerwerbsschein, der beim kantonalen Waffenbüro beantragt wird. Die Voraussetzungen sind die üblichen: Schweizer Bürgerrecht oder Niederlassungsbewilligung C, kein Eintrag im Strafregister für Gewaltdelikte, kein Hinweis auf Selbst- oder Fremdgefährdung. Der WES ist innerhalb von sechs Monaten nach Ausstellung zu nutzen und berechtigt zum Kauf einer einzelnen Waffe. Für das Schiessen auf bewilligten Schiessständen ist keine weitere Bewilligung erforderlich. Der Transport hat auf direktem Weg und in nicht schussbereitem Zustand zu erfolgen. Ein Schalldämpfer, wie er zum System der Mk 23 gehört, ist in der Schweiz verboten und darf weder besessen noch eingeführt werden.`,
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
    inhalt: `Die Colt M1911 ist nicht bloss eine Pistole, sondern ein Monument der Waffentechnik. Was sie so besonders macht, lässt sich in einem Satz zusammenfassen: John Moses Browning entwarf mit ihr nicht nur eine herausragende Waffe, sondern definierte das Funktionsprinzip, nach dem fast alle modernen Selbstladepistolen bis heute arbeiten. Die Kipplaufverriegelung mit Schwenkriegel, der Single-Action-Abzug und die Kombination aus Griff- und Daumensicherung sind Konstruktionsmerkmale, die über hundert Jahre nach ihrer Einführung immer noch als Massstab gelten. Kein anderes Waffendesign hat eine derart weitreichende und anhaltende Wirkung auf die Entwicklung von Handfeuerwaffen gehabt.

Die Geschichte der 1911 beginnt im Jahr 1906, als die US-Armee nach den Erfahrungen im Philippinisch-Amerikanischen Krieg ein neues Kaliber suchte. Die damalige Ordonnanzpistole im Kaliber .38 Long Colt hatte sich im Kampf gegen die Moro-Krieger als unzureichend erwiesen. Die Thompson-LaGard-Tests ergaben, dass ein Kaliber von mindestens .45 Zoll nötig sei. John Browning, der bereits mit seinen automatischen Pistolen für Colt Erfahrung gesammelt hatte, entwickelte daraufhin eine Pistole im neuen Kaliber .45 ACP, die in den Armeetests von 1910 und 1911 alle Konkurrenten schlug. Am 29. März 1911 wurde sie offiziell als M1911 eingeführt. Die leicht überarbeitete Version A1 kam 1926, mit Verbesserungen an der Griffform, dem Abzug und der Visierung. Von 1911 bis 1985 diente sie als Standardpistole der US-Streitkräfte, wurde in beiden Weltkriegen, in Korea und in Vietnam getragen und geschätzt. Selbst nach der offiziellen Ablösung durch die Beretta M9 im Jahr 1985 blieben 1911-Varianten bei Spezialeinheiten wie den Marine Raiders und Delta Force im Einsatz.

Die technischen Eckdaten der klassischen Government-Ausführung: Kaliber .45 ACP, Magazinkapazität 7 Schuss im Standardmagazin oder 8 Schuss mit modernen Magazinen, Lauflänge 127 Millimeter bei fünf Zoll, Gesamtlänge 216 Millimeter, Gewicht rund 1105 Gramm mit leerem Stahlmagazin. Das System arbeitet als Kurzhub-Rückstosslader mit dem berühmten Browning-Schwenkriegel, bei dem der Lauf über zwei Verriegelungswarzen in den Schlitten eingreift und beim Rückstoss über einen Schwenkriegel nach unten gezogen wird. Der Abzug ist ein reiner Single-Action-Mechanismus, was bedeutet, dass der Hahn vor dem ersten Schuss gespannt sein muss. Die Kombination aus Griffsicherung, die beim Greifen der Waffe automatisch deaktiviert wird, und manueller Daumensicherung sorgt für ein hohes Mass an Tragessicherheit in der Condition-One-Position, also mit Patrone im Lauf und gespanntem Hahn.

In der Schweiz hat die 1911 keine militärische Tradition, da die Eidgenossenschaft stets eigene Ordonnanzwaffen bevorzugte. Dennoch ist sie auf Schweizer Schiessständen ein verbreiteter Anblick, besonders bei IPSC-Schützen in den Divisionen Classic und Standard. Viele Schweizer Sportschützen schätzen den präzisen SA-Abzug und das vorhersehbare Rückstossverhalten der schweren Stahlpistole. Einige Schweizer Büchsenmacher haben sich auf das Tuning und Anpassen von 1911-Pistolen spezialisiert. Die grosse Vielfalt an Herstellern, von einfachen Serienmodellen bis zu handgefertigten Meisterwerken, macht die 1911 zudem für Sammler interessant.

Die Preisspanne auf dem Schweizer Gebrauchtmarkt im Jahr 2026 ist enorm, da die Qualitätsunterschiede zwischen den Herstellern riesig sind. Für eine Standardausführung eines seriösen Herstellers wie Colt, Springfield Armory oder Ruger gelten folgende Richtwerte: In gutem Zustand mit sichtbaren Gebrauchsspuren aber vollem Funktionsumfang sind 800 bis 1200 Franken realistisch. Sehr gute Exemplare mit gepflegtem Lauf und wenigen Tragespuren bewegen sich zwischen 1200 und 1800 Franken. Neuwertige Pistolen mit Originalverpackung und Zubehör können 1800 bis 2500 Franken erzielen. Für Premium-Hersteller wie Wilson Combat, Nighthawk Custom oder Les Baer gelten völlig andere Massstäbe: Hier beginnen die Preise auch gebraucht bei 3000 Franken und können bis weit über 6000 Franken reichen. Importierte Originalmodelle von Colt kosten im Schweizer Fachhandel neu etwa 1800 bis 2200 Franken, während Premium-Modelle bei 4000 Franken aufwärts beginnen.

Beim Kauf einer gebrauchten 1911 gibt es einige wichtige Prüfpunkte. Die Passgenauigkeit zwischen Schlitten und Rahmen sollte eng sein, aber der Schlitten muss noch frei gleiten. Übermässiges Spiel deutet auf hohen Verschleiss hin. Die Verriegelungswarzen am Lauf sollten keine Riefen oder Abplattungen zeigen. Der Abzug sollte sauber und klar brechen, ohne Kriechweg oder Nachziehen. Die Griffsicherung muss zuverlässig einrasten und lösen. Besonders bei älteren Modellen sollte man die Auswerferfeder und den Schlagbolzenstop prüfen, da diese Teile zu den typischen Verschleissstellen zählen. Ein wichtiger Hinweis für Käufer: Die 1911 verlangt regelmässige Wartung und ist empfindlicher gegenüber Vernachlässigung als moderne Polymerwaffen. Gute Magazine sind entscheidend für die Zuverlässigkeit, und hier lohnt es sich, in hochwertige Produkte von Wilson Combat oder Chip McCormick zu investieren.

Rechtlich fällt die Colt 1911 in der Schweiz unter die bewilligungspflichtigen Waffen. Für den Erwerb ist ein Waffenerwerbsschein erforderlich, der bei der zuständigen kantonalen Behörde beantragt wird. Es handelt sich um eine frei erwerbbare Waffe im Sinne des Waffengesetzes, sofern der Käufer die Voraussetzungen für den WES erfüllt. Die 1911 ist keine Ordonnanzwaffe der Schweizer Armee und geniesst daher keinen Sonderstatus. Der Import aus den USA kann über spezialisierte Händler abgewickelt werden, wobei die üblichen Einfuhrbestimmungen gelten.`,
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
    inhalt: `Die Desert Eagle ist eine Waffe, die man sofort erkennt, selbst wenn man sich nie mit Schusswaffen beschäftigt hat. Was sie so besonders macht, ist nicht nur ihre schiere Grösse und Kraft, sondern vor allem ihr einzigartiges technisches Konzept. Sie ist die einzige serienmässig produzierte Selbstladepistole, die mit einem Gasdrucklader-System und einem Drehkopfverschluss arbeitet, also nach dem gleichen Prinzip wie ein Sturmgewehr. Diese Konstruktion erlaubt es ihr, Magnumpatronen zu verschiessen, die normalerweise ausschliesslich Revolvern vorbehalten sind. In der Welt der Handfeuerwaffen nimmt die Desert Eagle damit eine Sonderstellung ein, die weder kopiert noch übertroffen wurde.

Die Entwicklungsgeschichte der Desert Eagle ist komplexer, als viele annehmen. Das Grundkonzept stammt nicht aus Israel, sondern aus den USA. Bernard White aus Minneapolis reichte 1979 ein Patent für eine gasdruckbetriebene Magnumpistole ein. Magnum Research, ebenfalls aus Minneapolis, übernahm das Konzept und begann mit der Entwicklung. Die Produktion und Weiterentwicklung wurde dann an Israel Military Industries in Ramat HaSharon übergeben, wo die Waffe unter dem Markennamen Desert Eagle ab 1983 in Serie ging. Die erste Version war im Kaliber .357 Magnum erhältlich, 1986 folgte die .44 Magnum und 1991 das brachiale Kaliber .50 Action Express, das eigens für die Desert Eagle entwickelt wurde. Seit den späten 1990er Jahren wird die aktuelle Mark-XIX-Generation produziert, bei der durch den Wechsel von Lauf, Verschluss und Magazin zwischen allen drei Kalibern gewechselt werden kann. Seit 2009 liegt die Produktion bei IWI in Israel sowie bei Magnum Research, das heute zu Kahr Arms gehört.

Die technischen Daten sind beeindruckend. Im Kaliber .50 Action Express wiegt die Waffe leer rund 1998 Gramm, also fast zwei Kilogramm. Die Gesamtlänge mit dem Sechs-Zoll-Lauf beträgt 269 Millimeter, mit dem Zehn-Zoll-Lauf entsprechend mehr. Das Magazin fasst 7 Patronen im Kaliber .50 AE, 8 in .44 Magnum und 9 in .357 Magnum. Das Gasdrucksystem entnimmt Pulvergas aus dem feststehenden Lauf und betätigt damit einen Kolben, der den Verschluss mit Drehkopfverriegelung entriegelt und öffnet. Der feststehende Lauf ist ein grosser Vorteil für die Präzision, da er sich beim Schuss nicht bewegt. Der Abzug arbeitet im Single-Action-Modus, eine manuelle Sicherung und ein Schlittenfanghebel sind beidseitig bedienbar. Der Rückstoss ist trotz des enormen Kalibers dank des hohen Waffengewichts und des Gasdrucksystems beherrschbar, wenn auch deutlich spürbar.

In der Schweiz ist die Desert Eagle vor allem als Spasswaffe und Sammlerstück bekannt. Auf dem Schiessstand zieht sie zuverlässig die Aufmerksamkeit auf sich, und wer einmal einen .50-AE-Schuss aus nächster Nähe erlebt hat, vergisst das nicht so schnell. Praktische Anwendungen sind begrenzt: Für die Jagd ist sie aufgrund der Grösse und des Gewichts kaum geeignet, obwohl die .44-Magnum-Version theoretisch für Wildschweinjagd in Frage käme. Für den Sportschuss gibt es präzisere und ergonomischere Alternativen. Die Desert Eagle bleibt in der Schweiz ein Liebhaberobjekt für Schützen, die das Aussergewöhnliche suchen und den Knall und den Rückstoss einer Magnumpatrone aus einer Selbstladepistole erleben wollen.

Die Preise in der Schweiz liegen im Jahr 2026 deutlich über dem internationalen Durchschnitt, da die Waffe importiert werden muss und die Nachfrage bei begrenztem Angebot stabil ist. In gutem Zustand mit normalen Gebrauchsspuren und funktionierender Mechanik kostet eine Desert Eagle Mark XIX im Kaliber .50 AE zwischen 1800 und 2400 Franken. Sehr gute Exemplare mit wenigen Schussspuren und gepflegter Oberfläche erzielen 2400 bis 3200 Franken. Neuwertige Pistolen, womöglich mit Originalbox und allen Beilagen, können 3200 bis 4000 Franken kosten. Die .44-Magnum- und .357-Magnum-Versionen sind tendenziell etwas günstiger. Sondereditionsmit vergoldetem oder tigergraviertem Finish erzielen auf dem Sammlermarkt teils erhebliche Aufpreise. Im Schweizer Fachhandel liegt der Neupreis je nach Ausführung bei 2800 bis 4500 Franken.

Wer eine Desert Eagle kaufen möchte, sollte auf einige Punkte achten. Die Waffe ist bekannt dafür, bei der Munitionsauswahl anspruchsvoll zu sein. Unterladen oder schwache Handladungen führen häufig zu Ladehemmungen, da das Gasdrucksystem einen bestimmten Druck benötigt. Nur hochwertige Fabrikmunition sollte verwendet werden. Der Zustand des Gaszylinders und des Kolbens sollte geprüft werden, ebenso wie der Verschlusskopf auf Risse oder Verschleiss. Die Magazine sind teuer und manchmal schwer zu beschaffen, weshalb ein Kauf mit mehreren Magazinen vorzuziehen ist. Die Oberfläche der Waffe, besonders bei den verchromten und vergoldeten Versionen, ist empfindlich und zeigt Kratzer schnell.

Der Rechtsstatus in der Schweiz ist eindeutig: Die Desert Eagle ist eine bewilligungspflichtige Waffe, für deren Erwerb ein Waffenerwerbsschein erforderlich ist. Der WES wird beim kantonalen Waffenbüro beantragt, wobei die üblichen Voraussetzungen gelten: kein relevanter Strafregistereintrag, kein Hinweis auf Selbst- oder Fremdgefährdung, Schweizer Bürgerrecht oder Niederlassungsbewilligung C. Die Waffe darf auf bewilligten Schiessständen geschossen werden, der Transport erfolgt in nicht schussbereitem Zustand auf direktem Weg. Es gibt keine Einschränkungen bezüglich des Kalibers, auch der Erwerb im Kaliber .50 AE ist mit dem normalen WES möglich.`,
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
    inhalt: `Die FN Browning Hi-Power, auch bekannt als Grande Puissance oder schlicht HP, ist eine der einflussreichsten Pistolen des 20. Jahrhunderts. Was sie besonders macht, ist die Tatsache, dass sie gleich zwei wegweisende Neuerungen in einer einzigen Konstruktion vereinte: die vereinfachte Kipplaufverriegelung mit Steuerkurve, die den Schwenkriegel der 1911 ersetzte und bis heute in praktisch allen modernen Pistolen verwendet wird, sowie das erste funktionsfähige Doppelreihemagazin in einer Militärpistole. Mit 13 Schuss im Jahr 1935 bot sie fast die doppelte Kapazität zeitgenössischer Konstruktionen und setzte einen Standard, der erst Jahrzehnte später zur Norm wurde.

Die Geschichte der Hi-Power ist untrennbar mit zwei Namen verbunden: John Moses Browning und Dieudonné Saive. Browning begann die Entwicklung in den frühen 1920er Jahren, teilweise auf Basis einer Ausschreibung der französischen Armee, die eine Pistole mit grosser Magazinkapazität und einem Kaliber von 9 Millimetern verlangte. Browning arbeitete an dem Entwurf bei der Fabrique Nationale in Herstal, Belgien, starb aber 1926, bevor er die Konstruktion vollenden konnte. Sein belgischer Kollege Dieudonné Saive brachte das Projekt bis zur Serienreife und meldete 1934 die wesentlichen Patente an. 1935 ging die Pistole als Grand Rendement Modèle 1935 in Produktion. Im Zweiten Weltkrieg erlebte die Hi-Power die einmalige Situation, auf beiden Seiten des Konflikts eingesetzt zu werden: Die Alliierten erhielten Exemplare aus der nach Kanada verlagerten FN-Produktion, während die deutsche Wehrmacht Pistolen aus dem besetzten belgischen Werk als Pistole 640(b) nutzte. Nach dem Krieg wurde die Hi-Power zur am weitesten verbreiteten Militärpistole der westlichen Welt und diente in über neunzig Armeen, darunter der britischen Armee bis 2017. Im Jahr 2022 stellte FN Herstal eine komplett neukonstruierte FN High Power vor, die den klassischen Linien treu bleibt, aber moderne Fertigungsmethoden und Materialien nutzt.

Technisch ist die originale Hi-Power ein Kurzhub-Rückstosslader mit Browning-Kipplaufsystem, bei dem eine Steuerkurve an der Unterseite des Laufs den Kipplauf beim Rückstoss nach unten zieht. Das 13-Schuss-Doppelreihemagazin wird im Einreiher-Ausgang zugeführt, was die Zuverlässigkeit erhöht. Der Lauf hat eine Länge von 118 Millimetern, die Gesamtlänge beträgt 200 Millimeter, und das Gewicht liegt bei 882 Gramm leer mit Stahlrahmen. Der Abzug arbeitet ausschliesslich im Single-Action-Modus, wobei der berühmte Kritikpunkt das Magazin-Disconnect-System ist: Ein federbelasteter Stift blockiert den Abzug, wenn kein Magazin eingesetzt ist. Dieses System verschlechtert das Abzugsgefühl erheblich und wird von vielen Besitzern entfernt, was allerdings den Originalzustand verändert.

In der Schweiz hat die Hi-Power eine lange, wenn auch inoffizielle Tradition. Obwohl die Eidgenossenschaft stets auf eigene Ordonnanzwaffen setzte, waren Hi-Powers auf dem Zivilmarkt stets beliebt. Viele Schweizer Schützen schätzen sie als historische Waffe mit Gebrauchswert: Der SA-Abzug ist für präzises Schiessen auf 25 und 50 Meter gut geeignet, das Kaliber 9x19mm ist erschwinglich, und die Waffe liegt dank des Stahlrahmens und der optimalen Griffneigung hervorragend in der Hand. Auf Schweizer Waffenbörsen und Auktionsplattformen werden regelmässig Hi-Powers angeboten, von frühen Vorkriegsmodellen über WK2-Produktionen bis hin zu späten Mk-III-Ausführungen. Die neue FN High Power von 2022 ist ebenfalls über den Schweizer Fachhandel erhältlich.

Die Preisspanne auf dem Schweizer Markt im Jahr 2026 ist breit und hängt stark von Alter, Zustand und historischer Bedeutung ab. Für eine Standard-Hi-Power der Nachkriegsproduktion in gutem Zustand, also funktionsfähig mit normalen Gebrauchsspuren, sind 700 bis 1100 Franken realistisch. In sehr gutem Zustand mit scharfer Brünierung und gutem Lauf bewegen sich die Preise zwischen 1100 und 1600 Franken. Neuwertige Exemplare der späten Produktion erzielen 1600 bis 2200 Franken. Vorkriegsmodelle und WK2-Exemplare mit nachweisbarer Geschichte können deutlich mehr kosten und sind eher Sammlerobjekte. Die neue FN High Power von 2022 kostet im Schweizer Fachhandel rund 1600 bis 1900 Franken.

Beim Kauf einer gebrauchten Hi-Power sollte man besonderes Augenmerk auf den Zustand der Steuerkurve am Lauf legen, da diese bei frühen Modellen aus weicherem Stahl gefertigt wurde und sich abnutzen kann. Die Verriegelungsflächen am Lauf und am Schlitten sollten keine übermässigen Schlagmarken aufweisen. Der Zustand der Abzugsstange und des Magazin-Disconnects beeinflusst das Abzugsgefühl erheblich. Man sollte prüfen, ob das Disconnect entfernt wurde, was zwar das Abzugsgefühl verbessert, aber bei einer Sammlerwaffe den Wert mindern kann. Die Griffschalen aus Kunststoff oder Holz sollten riss- und bruchfrei sein. Originalmagazine sind teurer als Nachbauten, aber zuverlässiger.

Der rechtliche Status in der Schweiz ist klar: Die FN Hi-Power ist eine bewilligungspflichtige Waffe. Für den Erwerb wird ein Waffenerwerbsschein benötigt, der beim kantonalen Waffenbüro beantragt wird. Die üblichen Voraussetzungen für den WES gelten. Die Waffe darf auf bewilligten Schiessständen im Kaliber 9x19mm geschossen werden. Es handelt sich nicht um eine Schweizer Ordonnanzwaffe, weshalb kein Sonderstatus besteht. Der Import älterer Modelle aus dem Ausland ist über den Fachhandel möglich, wobei die Einfuhrbewilligung des Bundes erforderlich ist.`,
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
    inhalt: `Die FN FNX ist eine Pistole, die belgische Ingenieurskunst mit amerikanischer Marktkenntnis verbindet. Was sie besonders macht, ist die konsequente Umsetzung zweier Prinzipien: vollständige Ambidextrie aller Bedienelemente und eine Magazinkapazität, die in jedem Kaliber die Konkurrenz übertrifft. Besonders die FNX-45 Tactical hat sich als eine der besten taktischen Pistolen auf dem Markt etabliert, denn sie bietet 15 Schuss im Kaliber .45 ACP, mehr als jede andere Pistole in diesem Kaliber, dazu einen Gewindlauf für Schalldämpfer und eine ab Werk gefräste Schlittenoberfläche für Rotpunktvisiere. Diese Kombination aus Feuerkraft, Vielseitigkeit und Qualität macht die FNX zu einer ernstzunehmenden Wahl für anspruchsvolle Schützen.

Die Geschichte der FNX beginnt mit der FNP-Serie, die FN Herstal ab 2006 für den amerikanischen Markt entwickelte. Die FNP war eine solide, aber etwas konservative Konstruktion, die in einem von Glock und SIG dominierten Markt nicht den erhofften Durchbruch schaffte. 2009 stellte FN die überarbeitete FNX-Serie vor, die zahlreiche Verbesserungen brachte: einen ergonomischeren Griff mit austauschbaren Rückenstücken, vollständig ambidextre Bedienelemente und ein verfeinertes Abzugssystem. Der eigentliche Durchbruch kam 2012 mit der FNX-45 Tactical, die als Antwort auf das mittlerweile eingestellte US Joint Combat Pistol Programm entwickelt wurde. Dieses Programm suchte einen Ersatz für die Beretta M9 und verlangte unter anderem ein grosses Magazin im Kaliber .45 ACP, Schalldämpfertauglichkeit und die Möglichkeit zur Montage von Optiken. Obwohl das Programm ohne Sieger endete, hatte FN mit der FNX-45 Tactical ein Produkt geschaffen, das auf dem Zivilmarkt und bei Spezialkräften weltweit enormen Anklang fand. Die Waffe wurde das meistverkaufte taktische Pistolenmodell ihrer Klasse.

Die technischen Spezifikationen variieren je nach Modell. Die FNX-9 verschiesst 9x19mm aus einem 17-Schuss-Magazin, die FNX-40 nutzt .40 S&W mit 14 Schuss, und die FNX-45 bietet 15 Schuss .45 ACP. Der Lauf der Standard-FNX-9 misst 112 Millimeter, die FNX-45 Tactical hat einen verlängerten Gewindlauf mit 117 Millimetern. Das Gewicht der FNX-45 Tactical beträgt leer rund 866 Gramm, die Gesamtlänge der FNX-9 liegt bei 190 Millimetern. Das System arbeitet als Kurzhub-Rückstosslader mit modifiziertem Browning-Verschluss. Der Abzug ist ein DA/SA-System mit einem kombinierten Sicherungs- und Entkupplungshebel auf beiden Seiten. Im Double-Action-Modus ist der Abzugswiderstand lang und schwer, im Single-Action-Modus kurz und klar. Der Polymerrahmen nimmt austauschbare Rückenstücke in verschiedenen Grössen auf, die Zubehörschiene unter dem Lauf ist mit allen gängigen Lampen und Lasern kompatibel.

In der Schweiz ist die FN FNX eine Nischenwaffe, die vor allem Kenner anspricht. FN Herstal geniesst in der Schweiz einen exzellenten Ruf, nicht zuletzt wegen der langen Geschichte der Zusammenarbeit zwischen belgischen und Schweizer Waffenherstellern. Die FNX-45 Tactical hat auf dem Schweizer Markt eine kleine, aber treue Anhängerschaft unter Schützen gefunden, die eine vielseitige Grosskaliber-Pistole suchen. Für IPSC-Schützen in der Production Optics Division ist die FNX-45 Tactical eine interessante Option, da sie ab Werk Optics-Ready ist und die hohe Magazinkapazität im grossen Kaliber einen Vorteil bietet. Die 9mm-Version wird seltener nachgefragt, da in diesem Segment die Konkurrenz durch Glock, SIG und CZ übermächtig ist.

Was die Preise auf dem Schweizer Gebrauchtmarkt im Jahr 2026 angeht, sind FNX-Pistolen aufgrund ihrer relativen Seltenheit nicht immer einfach zu finden. Die FNX-9 in gutem Zustand wechselt den Besitzer für rund 600 bis 850 Franken, in sehr gutem Zustand für 850 bis 1100 Franken, und neuwertig für 1100 bis 1400 Franken. Die begehrte FNX-45 Tactical liegt deutlich höher: in gutem Zustand 1200 bis 1500 Franken, in sehr gutem Zustand 1500 bis 1900 Franken, und neuwertig 1900 bis 2400 Franken. Der Neupreis im Schweizer Fachhandel beträgt für die FNX-45 Tactical rund 1800 bis 2200 Franken, wobei die Verfügbarkeit schwanken kann, da FN die Produktion primär auf den amerikanischen Markt ausrichtet.

Beim Kauf einer gebrauchten FNX sollte man auf den Zustand des Polymerrahmens achten, insbesondere auf Risse an den Schlittenführungen, die bei intensivem Gebrauch auftreten können. Der Gewindlauf der Tactical-Version sollte auf seinem gesamten Gewinde unbeschädigt sein. Die Nachtvisierung mit Tritiumeinsätzen verliert mit der Zeit an Leuchtkraft, und nach etwa zehn Jahren ist ein Austausch empfehlenswert. Die Optics-Ready-Fräsung am Schlitten der Tactical-Version nimmt verschiedene Micro-Rotpunktvisiere auf, wobei die mitgelieferten Adapterplatten vorhanden sein sollten. Der DA/SA-Abzug sollte im SA-Modus klar und ohne Nachziehen brechen. Die Magazine sind robust, aber teuer im Ersatz.

Rechtlich unterliegt die FN FNX in der Schweiz dem normalen Waffenerwerbsschein. Als halbautomatische Faustfeuerwaffe fällt sie in die Kategorie der bewilligungspflichtigen Waffen. Der WES wird beim kantonalen Waffenbüro beantragt, die üblichen Voraussetzungen müssen erfüllt sein. Der Gewindlauf ist in der Schweiz legal, solange kein Schalldämpfer montiert wird, da Schalldämpfer verboten sind. Die Montage eines Rotpunktvisiers ist ohne weitere Bewilligung möglich. Die Waffe darf auf bewilligten Schiessständen geschossen und auf direktem Weg in nicht schussbereitem Zustand transportiert werden.`,
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
    inhalt: `Die SIG P220 verdient den Titel einer wahrhaft schweizerischen Pistole mehr als jede andere im SIG-Sortiment. Was sie besonders macht, ist die Tatsache, dass sie den Grundstein für eine ganze Familie legendärer Dienstpistolen legte. Aus der P220 entstanden die P225, P226, P228 und P229, also praktisch alle SIG-Pistolen, die seit den 1970er Jahren von Polizei- und Militäreinheiten auf der ganzen Welt getragen werden. Gleichzeitig führte die P220 mehrere Konstruktionsmerkmale ein, die wegweisend waren: den Leichtmetallrahmen, das SIG-eigene Verriegelungssystem mit Verriegelungsblock an der Auswurföffnung und den Entkupplungshebel anstelle einer manuellen Sicherung. Diese Kombination aus Innovation, Zuverlässigkeit und Schweizer Fertigungsqualität macht die P220 zu einer der bedeutendsten Pistolenkonstruktionen des 20. Jahrhunderts.

Die Geschichte der P220 beginnt Mitte der 1960er Jahre, als die Schweizerische Eidgenossenschaft einen Nachfolger für die legendäre SIG P210 suchte. Die P210 war zwar die präziseste Militärpistole der Welt, aber auch die teuerste, da sie vollständig aus geschmiedetem Stahl gefertigt wurde und extrem enge Toleranzen aufwies. Die Armee brauchte eine günstigere Alternative, die sich in grossen Stückzahlen produzieren liess. SIG in Neuhausen am Rheinfall entwickelte daraufhin unter der Leitung von Charles Hässig die P220, die 1975 als Pistole 75 bei der Schweizer Armee eingeführt wurde. Der Leichtmetallrahmen aus Aluminiumlegierung senkte die Produktionskosten erheblich, während das neue Verriegelungssystem die Fertigung vereinfachte. Die P220 wurde auch bei zahlreichen Schweizer Polizeikorps eingeführt und bei der japanischen Selbstverteidigungskraft als P220 9mm übernommen. In den USA erlangte die P220 vor allem in der .45-ACP-Version grosse Beliebtheit, da sie dort als eine der zuverlässigsten Alternativen zur 1911 galt. Die Partnerschaft mit J.P. Sauer und Sohn in Eckernförde, Deutschland, für die internationale Produktion führte zum heute bekannten Firmennamen SIG Sauer.

Technisch arbeitet die P220 als Kurzhub-Rückstosslader mit dem patentierten SIG-Verriegelungssystem. Anstatt den Lauf über Verriegelungswarzen oder eine Steuerkurve zu entriegeln, nutzt SIG einen grossen Verriegelungsblock an der Laufoberseite, der in die Auswurföffnung des Schlittens greift. Beim Rückstoss wird der Lauf über eine Steuerkurve nach unten gezogen und entriegelt. Dieses System ist einfach, robust und ermöglicht enge Passungen bei gleichzeitig hoher Zuverlässigkeit. Der Lauf misst 112 Millimeter, die Gesamtlänge beträgt 198 Millimeter, und das Gewicht liegt bei rund 750 Gramm leer in der 9mm-Version. Das Magazin ist ein Einreiher mit 8 Schuss im Kaliber 9x19mm beziehungsweise 8 Schuss in .45 ACP. Der Abzug arbeitet im DA/SA-Modus: Der erste Schuss kann mit entspanntem Hahn im langen Double-Action-Zug abgefeuert werden, alle weiteren Schüsse erfolgen im kurzen Single-Action-Modus. Anstelle einer manuellen Sicherung besitzt die P220 einen Entkupplungshebel, der den gespannten Hahn sicher ablässt, ohne den Schlagbolzen zu berühren.

In der Schweiz ist die P220 als Pistole 75 allgegenwärtig. Generationen von Schweizer Soldaten haben ihre Schiessausbildung mit dieser Waffe absolviert, und bis heute ist sie im Armeebestand. Bei der Entlassung aus der Armee können Schweizer Bürger ihre Ordonnanzpistole 75 unter bestimmten Voraussetzungen übernehmen, was bedeutet, dass Tausende von P220 in Privatbesitz sind. Diese Ordonnanzwaffen in 9x19mm sind auf dem Gebrauchtmarkt entsprechend häufig. Daneben gibt es die zivilen Versionen, die sich vor allem durch die Kaliberauswahl und die Ausstattung unterscheiden. Auf dem Schiessstand ist die P220 ein vertrauter Anblick, und viele Schweizer Schützen verwenden sie beim obligatorischen Schiessen oder im Vereinssport.

Die Preise auf dem Schweizer Gebrauchtmarkt im Jahr 2026 hängen stark von der Version ab. Ehemalige Ordonnanzpistolen 75 in 9x19mm sind am günstigsten: In gutem Zustand mit normalem Dienstgebrauch sind 350 bis 550 Franken realistisch. In sehr gutem Zustand, also mit wenig geschossenem Lauf und minimalen Tragespuren, bewegen sich die Preise zwischen 550 und 800 Franken. Neuwertige Exemplare, die praktisch ungebraucht aus dem Armeebestand kommen, können 800 bis 1100 Franken erzielen. Zivile P220-Modelle in .45 ACP liegen höher: gut erhaltene Exemplare kosten 700 bis 1000 Franken, sehr gute 1000 bis 1400 Franken, und neuwertige Stücke 1400 bis 1800 Franken. Premium-Versionen wie die P220 Elite oder Legion erzielen entsprechend mehr. Der Neupreis für eine aktuelle zivile P220 im Schweizer Fachhandel liegt bei rund 1200 bis 1800 Franken je nach Ausführung.

Beim Kauf einer gebrauchten P220 sollte man auf den Zustand des Leichtmetallrahmens achten. Obwohl die Aluminiumlegierung sehr widerstandsfähig ist, können bei älteren Exemplaren Korrosionsspuren auftreten, besonders wenn die Waffe unsachgemäss gelagert wurde. Die Schlittenführungsschienen am Rahmen sollten frei von übermässigem Verschleiss sein. Bei Ordonnanzpistolen lohnt es sich, den Lauf mit einer Lauflehre prüfen zu lassen, da viele Exemplare hohe Schusszahlen hinter sich haben. Der Abzug sollte im SA-Modus sauber brechen, und der Entkupplungshebel muss den Hahn zuverlässig und sicher ablassen. Die Kunststoffgriffschalen der Armeeversion sind robust, können aber vergilben.

Der Rechtsstatus der P220 in der Schweiz ist differenziert. Die Ordonnanzpistole 75 in 9x19mm, die bei der Entlassung aus dem Militärdienst übernommen wurde, gilt als ehemalige Ordonnanzwaffe und kann unter erleichterten Bedingungen besessen werden. Für den Kauf einer P220 auf dem Gebrauchtmarkt oder im Fachhandel, unabhängig davon ob Ordonnanz- oder Zivilversion, ist ein Waffenerwerbsschein erforderlich. Die üblichen Voraussetzungen für den WES gelten. Die Waffe darf auf bewilligten Schiessständen geschossen werden, und der Transport erfolgt in nicht schussbereitem Zustand auf direktem Weg.`,
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
    inhalt: `Die SIG Sauer P250 ist eine Pistole, die in der Geschichte der Waffenentwicklung eine besondere Rolle einnimmt, auch wenn sie kommerziell nie den ganz grossen Durchbruch erzielte. Was sie besonders macht, ist die Tatsache, dass sie das Konzept der vollständigen Modularität bei Handfeuerwaffen einführte. Die P250 war die erste Serienpistole, bei der eine herausnehmbare Fire Control Unit, also ein serialisiertes Stahlchassis mit der gesamten Abzugsgruppe, das eigentliche Waffenstück darstellte. Rahmen, Schlitten und Lauf waren dagegen nicht serialisierte Bauteile, die ohne zusätzliche waffenrechtliche Bewilligung gewechselt werden konnten. Dieses Konzept war seiner Zeit voraus und wurde später in der enorm erfolgreichen P320 perfektioniert, die unter anderem als M17 und M18 zur aktuellen US-Armeepistole wurde.

Die Geschichte der P250 beginnt in den frühen 2000er Jahren, als SIG Sauer unter dem damaligen CEO Ron Cohen eine Pistole entwickelte, die mehrere Probleme auf einmal lösen sollte. Polizeibehörden und Militärs wollten eine Waffe, die sich an unterschiedliche Handgrössen und Einsatzzwecke anpassen liess, ohne jedes Mal ein komplett neues Waffenstück beschaffen zu müssen. Die Idee war bestechend: Eine einzige FCU, die in verschiedenen Griffmodulen, Schlitten und Läufen eingesetzt werden konnte, von der Full-Size-Dienstpistole in 9mm bis zur Subcompact in .45 ACP. 2007 wurde die P250 offiziell vorgestellt und stiess zunächst auf grosses Interesse. Die Modularität beeindruckte Behörden und Zivilkunden gleichermassen. Allerdings zeigte sich bald, dass der reine DAO-Abzug, den SIG bewusst für den Behördenmarkt gewählt hatte, ein Hindernis für den kommerziellen Erfolg war. Der lange, gleichmässige Abzugszug ohne einen klaren Druckpunkt war zwar sicher und konsistent, wurde aber von vielen Schützen als zu schwer und unpräzise empfunden. Ab 2014 stellte SIG die P320 vor, die das gleiche FCU-Konzept mit einem Striker-Fire-Abzug kombinierte und damit den Massengeschmack traf. Die P250 wurde daraufhin schrittweise aus dem Programm genommen, bleibt aber als konzeptioneller Meilenstein in Erinnerung.

Technisch arbeitet die P250 als Kurzhub-Rückstosslader mit dem bewährten SIG-Verriegelungssystem. Die FCU ist ein Stahlchassis, das den Abzugsmechanismus, den Hahn und alle zugehörigen Federn enthält. Sie wird über Führungsschienen in den Polymerrahmen eingesetzt und dort durch einen Stift gesichert. Der Wechsel zwischen verschiedenen Konfigurationen dauert nur wenige Minuten und erfordert kein Werkzeug ausser einem Stift zum Herausdrücken der Achse. Im Kaliber 9x19mm fasst das Full-Size-Magazin 17 Patronen, das Compact-Magazin 15 und das Subcompact-Magazin 12. Der Lauf der Full-Size-Version misst 119 Millimeter, der Compact-Lauf 99 Millimeter und der Subcompact-Lauf 91 Millimeter. Das Gewicht der Full-Size-Version beträgt leer rund 756 Gramm. Neben 9x19mm war die P250 auch in .40 S&W, .357 SIG und .45 ACP erhältlich, wobei für den Kaliberwechsel lediglich Schlitten, Lauf und Magazin getauscht werden mussten.

In der Schweiz ist die P250 eine Seltenheit, die vor allem bei SIG-Enthusiasten und Sammlern moderner Waffenentwicklungen auf Interesse stösst. Da SIG Sauer mit der P220, P226 und P228 in der Schweiz eine lange und tiefe Tradition hat, wird die P250 von manchen Schweizer Schützen als interessante Fussnote in der SIG-Geschichte betrachtet. Die Modularität ist in der Schweiz waffenrechtlich allerdings weniger attraktiv als in den USA, da für den Erwerb der FCU ein WES nötig ist und die einzelnen Wechselkomponenten nicht so einfach nachgekauft werden können wie auf dem amerikanischen Markt. Dennoch schätzen einige Schützen den DAO-Abzug als sicherheitsfreundliche Lösung, besonders Personen, die eine Pistole hauptsächlich zur Heimverteidigung halten und einen gleichmässigen, vorhersehbaren Abzug bevorzugen.

Die Preise auf dem Schweizer Gebrauchtmarkt im Jahr 2026 sind moderat, da die P250 nie eine breite Fangemeinde aufbauen konnte und die P320 sie als bevorzugtes modulares System abgelöst hat. In gutem Zustand mit normalen Gebrauchsspuren wechselt eine P250 den Besitzer für rund 400 bis 600 Franken. In sehr gutem Zustand sind 600 bis 850 Franken realistisch. Neuwertige Exemplare, die kaum geschossen wurden, erzielen 850 bis 1100 Franken. Komplette Kits mit mehreren Griffmodulen und Wechselläufen sind selten, können aber einen Aufpreis von 200 bis 400 Franken erzielen. Die Neupreise lagen vor der Einstellung der Produktion bei rund 900 bis 1200 Franken im Schweizer Fachhandel.

Beim Kauf einer gebrauchten P250 sollte man darauf achten, dass die FCU keine Risse oder Verformungen aufweist und dass alle Stifte fest sitzen. Der DAO-Abzug sollte gleichmässig und ohne Kratzen ziehen. Die Polymerrahmen sind robust, können aber an den Führungsschienen Verschleiss zeigen, wenn die Waffe viel geschossen wurde. Die Magazine sollten ohne Widerstand einrasten und beim Betätigen der Magazinhaltetaste sauber herausfallen. Da die P250 aus dem Programm genommen wurde, kann die Ersatzteilversorgung langfristig schwieriger werden, weshalb man idealerweise ein Exemplar mit Ersatzmagazinen und, falls vorhanden, weiteren Griffmodulen erwirbt.

Rechtlich fällt die SIG P250 in der Schweiz unter die bewilligungspflichtigen Waffen. Für den Erwerb ist ein Waffenerwerbsschein erforderlich. Die FCU ist das serialisierte Bauteil und damit das eigentliche Waffenstück im Sinne des Waffengesetzes. Zusätzliche Griffmodule, Schlitten und Läufe gelten als wesentliche Waffenteile und unterliegen ebenfalls den Bestimmungen des Waffengesetzes, können aber in der Regel über den Fachhandel bezogen werden. Die üblichen Voraussetzungen für den WES gelten, und die Waffe darf auf bewilligten Schiessständen geschossen werden.`,
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
    inhalt: `Die SIG Sauer P365 hat bei ihrer Einführung im Jahr 2018 einen Paradigmenwechsel im Markt für Kompaktpistolen ausgelöst. Was sie so besonders macht, ist eine scheinbar simple Errungenschaft, die jedoch jahrelange Entwicklungsarbeit erforderte: zehn Patronen Kaliber 9x19mm in einem Doppelreihemagazin, das nur 25,4 Millimeter breit ist. Bis dahin galt es als unmöglich, ein Doppelreihemagazin in einem Griffstück unterzubringen, das kaum grösser ist als das einer Einreiher-Taschenpistole. SIG löste dieses Problem mit einem neuartigen Magazindesign, bei dem die Patronen in zwei Reihen gestaffelt sind und sich zur Mündung hin auf eine einzige Reihe verjüngen. Das Ergebnis war eine Pistole, die bei Glock-43-Abmessungen fast die doppelte Kapazität bot und damit eine neue Kategorie begründete: die Mikrokompaktpistole.

Die Geschichte der P365 ist eng mit dem Boom des verdeckten Tragens in den USA verknüpft, wo immer mehr Bundesstaaten das verdeckte Führen von Schusswaffen ohne Bewilligung erlaubten. Die Nachfrage nach möglichst kleinen und leichten 9mm-Pistolen mit hoher Kapazität war enorm, und SIG Sauer erkannte die Chance. Die Entwicklung der P365 dauerte mehrere Jahre und erforderte nicht nur ein neues Magazindesign, sondern auch einen speziell konzipierten Schlitten und Rahmen. Bei der Markteinführung im Januar 2018 auf der SHOT Show in Las Vegas sorgte die P365 für Furore und wurde von der NRA zur Handfeuerwaffe des Jahres gewählt. Die ersten Produktionschargen hatten allerdings Anlaufschwierigkeiten: Einige Kunden berichteten über vorzeitigen Verschleiss am Schlagbolzen und gelegentliche Rostbildung auf dem Schlitten. SIG reagierte schnell mit einer überarbeiteten Schlagbolzenfeder und einer verbesserten Oberflächenbehandlung. Seit Mitte 2018 gelten diese Probleme als gelöst. In den folgenden Jahren baute SIG die P365-Familie kontinuierlich aus: 2019 kam die P365 XL mit verlängertem Griff und Schlitten, 2021 die P365X als Mittelweg, und 2022 die P365-XMACRO mit integriertem Kompensator und 17-Schuss-Magazin.

Technisch arbeitet die P365 als Kurzhub-Rückstosslader mit Schlagbolzenschloss, also einem Striker-Fire-System. Der Lauf hat eine Länge von 79 Millimetern, die Gesamtlänge beträgt nur 146 Millimeter, und das Gewicht liegt bei lediglich 518 Gramm leer. Die Breite von 25,4 Millimetern macht die Waffe extrem flach und leicht zu verbergen. Das Basismagazin fasst 10 Schuss, optional sind 12- und 15-Schuss-Magazine erhältlich, die den Griff entsprechend verlängern. Die serienmässige XRAY3-Visierung kombiniert Tritium-Einsätze für die Nacht mit einer kontrastreichen Tagvisierung. Der Abzug bricht nach einem kurzen Vorweg klar und hat einen spürbaren Reset. Die Verarbeitung ist für eine Pistole dieser Grösse bemerkenswert hochwertig, mit einem Stahlschlitten auf einem Edelstahl-verstärkten Polymerrahmen.

In der Schweiz ist die P365 vor allem bei Sportschützen beliebt, die eine kompakte und leichte Pistole für das Training suchen, sowie bei Schützen, die eine handliche Waffe für zu Hause haben möchten. Das verdeckte Tragen von Schusswaffen ist in der Schweiz im Alltag nicht üblich und erfordert eine kantonale Waffentragbewilligung, die nur unter strengen Voraussetzungen erteilt wird. Dennoch hat die P365 auf dem Schweizer Markt eine Nische gefunden. SIG Sauer hat in der Schweiz ohnehin einen hervorragenden Ruf, und viele Schützen, die bereits eine P226 oder P320 besitzen, ergänzen ihre Sammlung gerne mit der kleinen Schwester. Auf dem Schiessstand überrascht die P365 regelmässig durch ihre Präzision, die man einer so kleinen Waffe kaum zutrauen würde. Der tief liegende Lauf und das geringe Mündungshochschlagen machen sie auch für Schützen mit kleineren Händen gut beherrschbar.

Die Preise auf dem Schweizer Gebrauchtmarkt im Jahr 2026 sind stabil, da die Nachfrage das begrenzte Angebot gut abfedert. Eine P365 im Basismodell in gutem Zustand kostet zwischen 550 und 750 Franken. In sehr gutem Zustand mit wenigen Gebrauchsspuren und gepflegtem Lauf sind 750 bis 950 Franken realistisch. Neuwertige Exemplare mit Originalbox und Zubehör erzielen 950 bis 1200 Franken. Die P365 XL liegt in der Regel 50 bis 100 Franken höher, die XMACRO kann neuwertig bis 1400 Franken kosten. Im Schweizer Fachhandel liegt der Neupreis für eine P365 bei rund 850 bis 1100 Franken, für die XL bei 950 bis 1200 Franken, und für die XMACRO bei 1100 bis 1400 Franken, jeweils abhängig von der Ausstattung.

Beim Kauf einer gebrauchten P365 sollte man einige Dinge beachten. Die frühen Produktionschargen von Anfang 2018 können noch die ursprüngliche Schlagbolzenfeder haben, die zu vorzeitigem Verschleiss neigt. SIG tauscht diese kostenlos aus, aber man sollte prüfen, ob der Austausch bereits erfolgt ist. Der Schlitten sollte keine Rostspuren zeigen, und die Nitron-Beschichtung sollte intakt sein. Die Magazine sind das Herzstück der P365, und ein defektes Magazin kann zu Zuführungsproblemen führen. Man sollte die Magazinfeder auf Spannkraft prüfen und darauf achten, dass die Patronen sauber in das Magazin gleiten. Die XRAY3-Visierung ist robust, aber die Tritiumeinsätze verlieren nach etwa zehn Jahren an Leuchtkraft.

Der Rechtsstatus in der Schweiz ist klar: Die SIG P365 ist eine bewilligungspflichtige Waffe, für deren Erwerb ein Waffenerwerbsschein erforderlich ist. Die Voraussetzungen sind die üblichen für den WES. Es handelt sich um eine frei erwerbbare Waffe ohne Sonderstatus. Die Waffe darf auf bewilligten Schiessständen geschossen werden, und der Transport hat in nicht schussbereitem Zustand auf direktem Weg zu erfolgen. Für eine Waffentragbewilligung, die das Führen der Waffe in der Öffentlichkeit erlauben würde, sind besondere Gründe nachzuweisen, was in der Praxis nur selten gelingt.`,
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
    inhalt: `Die Springfield Hellcat ist die Antwort auf die Frage, wie viel Feuerkraft in eine Pistole passt, die kaum grösser ist als eine Handfläche. Was sie besonders macht, ist die Kombination aus extremer Kompaktheit und einer Magazinkapazität von 11 Schuss im Kaliber 9x19mm, die bei ihrer Einführung 2019 einen neuen Rekord für Mikropistolen setzte. Dazu kam als Branchenneuheit die OSP-Version, die als erste Mikropistole überhaupt ab Werk einen gefrästen Schlitten für die Montage von Micro-Rotpunktvisieren anbot. Die aggressive Grifftextur, die kontrastreiche U-Dot-Visierung und ein überraschend guter Abzug für eine Waffe dieser Grössenklasse runden das Paket ab.

Die Geschichte der Hellcat ist eine Geschichte des Wettbewerbs. Als SIG Sauer 2018 mit der P365 den Markt für Mikrokompaktpistolen aufmischte, reagierten die Konkurrenten schnell. Springfield Armory, ein Unternehmen aus Geneseo, Illinois, das trotz seines historischen Namens keine direkte Verbindung zur legendären Springfield Armory des US-Militärs hat, stellte im September 2019 die Hellcat vor. Der Name war klug gewählt und erinnerte an die aggressiven Dodge-Muscle-Cars. Die Hellcat bot mit 11 Schuss im bündig abschliessenden Magazin einen Schuss mehr als die P365 und war dabei sogar noch einen Hauch kompakter. Die OSP-Version, deren Kürzel für Optical Sight Pistol steht, setzte einen weiteren Akzent, indem sie die Montage von Micro-Rotpunktvisieren wie dem Shield RMSc oder dem JP Enterprises JPoint ohne Adapter ermöglichte. 2022 erweiterte Springfield die Familie um die Hellcat Pro, eine grössere Version mit 15 Schuss und Compact-Abmessungen, die den Sprung in eine andere Grössenklasse vollzog. Die Hellcat RDP folgte mit integriertem Kompensator und vorinstalliertem Hex Wasp Rotpunktvisier als Komplettsystem für anspruchsvolle Anwender.

Die technischen Daten der Hellcat im Detail: Das Kaliber ist 9x19mm, das System ein Kurzhub-Rückstosslader mit Schlagbolzenschloss. Das Basismagazin fasst 11 Schuss, das verlängerte Magazin 13 Schuss. Der Lauf misst 76 Millimeter, die Gesamtlänge beträgt 152 Millimeter, und das Gewicht liegt bei 530 Gramm leer. Die Breite von 25,4 Millimetern entspricht der der SIG P365. Der Abzug hat einen flachen Abzugzüngel mit einem integrierten Sicherungshebel und bricht nach einem kurzen, leichten Vorweg klar. Der Reset ist kurz und taktil spürbar. Die serienmässige U-Dot-Visierung besteht aus einem U-förmigen Kimmeneinschnitt und einem grossen Tritium-Leuchtpunkt auf dem Korn, was eine sehr schnelle Zielerfassung ermöglicht. Die Grifftextur ist deutlich aggressiver als bei den meisten Konkurrenten und bietet auch mit nassen oder verschwitzten Händen sicheren Halt. Die Zubehörschiene unter dem Staubschutzblech nimmt kompakte Waffenlampen auf.

In der Schweiz ist die Springfield Hellcat weniger bekannt als die Konkurrenzmodelle von SIG oder Glock, was hauptsächlich daran liegt, dass Springfield Armory in Europa keine starke Vertriebspräsenz hat. Die Waffe muss über spezialisierte Importeure bezogen werden, was die Verfügbarkeit einschränkt und die Preise in die Höhe treibt. Dennoch hat die Hellcat auf dem Schweizer Markt ihre Abnehmer gefunden, vor allem unter Schützen, die bereits mit amerikanischen Waffen vertraut sind und die Vorzüge des Modells schätzen. Auf dem Schiessstand überrascht die Hellcat durch ihre Präzision auf 25 Meter, die für eine Waffe mit nur 76 Millimeter Lauflänge bemerkenswert ist. Die aggressive Grifftextur wird von manchen Schützen als unangenehm empfunden, insbesondere bei längeren Trainingssessions, kann aber mit einem Handschuh oder einer Griffhülle gemildert werden.

Was die Preise auf dem Schweizer Gebrauchtmarkt im Jahr 2026 betrifft, muss man berücksichtigen, dass Springfield-Produkte in der Schweiz selten sind und daher tendenziell höhere Preise erzielen als in den USA. Eine Hellcat im Standardmodell in gutem Zustand wechselt den Besitzer für rund 550 bis 750 Franken. In sehr gutem Zustand sind 750 bis 1000 Franken realistisch. Neuwertige Exemplare mit Originalbox und allen Beilagen können 1000 bis 1300 Franken kosten. Die OSP-Version liegt in der Regel 50 bis 100 Franken über dem Standardmodell. Die Hellcat Pro erzielt ähnliche Preise in der Compact-Klasse. Im Schweizer Fachhandel, sofern die Waffe überhaupt verfügbar ist, liegt der Neupreis bei rund 800 bis 1100 Franken für die Basisversion und 900 bis 1200 Franken für die OSP.

Beim Kauf einer gebrauchten Hellcat sollte man auf einige Punkte achten. Die aggressive Grifftextur kann bei intensivem Gebrauch abgenutzt sein, was den Halt verschlechtert. Der Schlitten sollte auf Verschleissspuren an den Führungsschienen geprüft werden. Die U-Dot-Visierung ist robust, aber die Tritiumeinsätze verlieren über die Jahre an Leuchtkraft. Bei der OSP-Version sollte man prüfen, ob die Adapterplatte für das gewünschte Rotpunktvisier vorhanden ist und ob die Schrauben korrekt angezogen sind, da lose Optik-Schrauben ein häufiges Problem bei nachgerüsteten Visieren sind. Die Magazine der Hellcat sind spezifisch und nicht mit anderen Springfield-Modellen austauschbar. Ersatzmagazine sind in der Schweiz schwerer zu beschaffen als bei den gängigeren Marken.

Rechtlich fällt die Springfield Hellcat in der Schweiz unter die bewilligungspflichtigen Waffen, für deren Erwerb ein Waffenerwerbsschein erforderlich ist. Die üblichen Voraussetzungen für den WES gelten. Die Waffe darf auf bewilligten Schiessständen geschossen werden, und der Transport hat in nicht schussbereitem Zustand auf direktem Weg zu erfolgen. Es gibt keine besonderen Einschränkungen für diese Waffe in der Schweiz. Eine Waffentragbewilligung für das Führen in der Öffentlichkeit wird nur unter strengen Voraussetzungen erteilt und kommt für die meisten Privatpersonen nicht in Frage.`,
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
    inhalt: `Die Ruger LCP ist die Pistole, die man vergisst, dass man sie dabeihat. Was sie besonders macht, ist ihre extreme Kompaktheit und ihr minimales Gewicht. Mit nur 272 Gramm leer und einer Gesamtlänge von 131 Millimetern ist sie so klein und leicht, dass sie in einer Hosentasche oder einer Jackentasche verschwindet, ohne aufzufallen oder zu stören. Diese Eigenschaft hat die LCP zur meistverkauften Taschenpistole der Welt gemacht, mit über drei Millionen verkauften Exemplaren seit 2008. Sie ist keine Waffe für den Schiessstand oder den Wettkampf, sondern ein reines Zweckgerät, das für einen einzigen Einsatzzweck optimiert wurde: immer dabei zu sein, wenn es darauf ankommt.

Die Geschichte der LCP beginnt mit einem Konkurrenzprodukt: der Kel-Tec P-3AT, die ab 2003 als erste ultraleichte .380-ACP-Taschenpistole den amerikanischen Markt eroberte. Kel-Tec, ein kleiner Hersteller aus Florida, konnte die enorme Nachfrage nicht befriedigen, und Sturm, Ruger and Company aus Southport, Connecticut, sah eine Chance. Die 2008 vorgestellte LCP, deren Kürzel für Lightweight Compact Pistol steht, war deutlich von der P-3AT inspiriert, bot aber eine bessere Verarbeitungsqualität, eine zuverlässigere Funktion und den starken Rückhalt des Ruger-Kundendienstes. Die LCP wurde sofort zum Bestseller und dominierte das Segment der Taschenpistolen für fast ein Jahrzehnt. 2016 stellte Ruger die LCP II vor, die wesentliche Verbesserungen brachte: einen deutlich besseren Abzug mit kürzerem Reset, eine sichtbare Visierung anstelle der rudimentären Kimme des Originals und einen Schlittenfanghebel, der beim Original fehlte. Der grösste Sprung kam 2021 mit der LCP MAX, die ein Doppelreihenmagazin mit 10 Schuss in der praktisch gleichen Baugrösse unterbrachte und damit die Kapazität gegenüber dem Original fast verdoppelte. Parallel dazu brachte Ruger eine LCP II im Kaliber .22 LR heraus, die als günstige Trainingsversion dient.

Die technischen Daten der LCP II im Detail: Das Kaliber ist .380 ACP, also 9mm kurz, ein Kaliber, das sich am unteren Rand dessen bewegt, was für die Selbstverteidigung als ausreichend angesehen wird. Das System ist ein Kurzhub-Rückstosslader mit Browning-Kipplauf und innenliegendem Hahn. Das Magazin fasst 6 Schuss, bei der LCP MAX sind es 10 Schuss aus einem Doppelreihenmagazin. Der Lauf misst 70 Millimeter, die Gesamtlänge beträgt 131 Millimeter, und das Gewicht liegt bei nur 272 Gramm leer. Die Breite von lediglich 20 Millimetern macht die LCP zu einer der flachsten Pistolen am Markt. Der Abzug ist ein langer, gleichmässiger Zug ohne separaten Sicherungshebel, der als integriertes Sicherheitsmerkmal dient. Der Rahmen besteht aus glasfaserverstärktem Nylon, der Schlitten aus einer gehärteten Leichtmetalllegierung. Die fest montierten Visierungen sind minimal und für instinktives Schiessen auf kurze Distanz ausgelegt.

In der Schweiz ist die Ruger LCP ein Nischenprodukt mit begrenzter Verbreitung. Das Konzept der ultrakompakten Taschenpistole für das verdeckte Tragen hat in der Schweiz weniger Relevanz als in den USA, da das verdeckte Führen einer Waffe in der Öffentlichkeit eine Waffentragbewilligung erfordert, die nur unter strengen Voraussetzungen erteilt wird. Dennoch findet die LCP auch in der Schweiz Käufer, sei es als Kuriosität, als Sammlerobjekt oder als kompakte Waffe für den Nachttisch. Auf dem Schiessstand ist die LCP eine Herausforderung: Der kurze Lauf, der leichte Rahmen und die minimalen Visierungen machen präzises Schiessen auf Distanz schwierig. Allerdings ist sie auf die typischen Selbstverteidigungsdistanzen von unter fünf Metern ausreichend präzise. Das Kaliber .380 ACP ist in der Schweiz weniger verbreitet als 9x19mm, aber Fabrikmunition ist über den Fachhandel ohne Weiteres erhältlich.

Die Preise auf dem Schweizer Gebrauchtmarkt im Jahr 2026 sind moderat, da die LCP kein Prestigeobjekt ist und die Nachfrage in der Schweiz überschaubar bleibt. Eine LCP oder LCP II in gutem Zustand wechselt den Besitzer für rund 300 bis 450 Franken. In sehr gutem Zustand sind 450 bis 600 Franken realistisch. Neuwertige Exemplare mit Originalbox und Beilagen können 600 bis 800 Franken kosten. Die LCP MAX liegt aufgrund ihrer höheren Kapazität tendenziell 50 bis 150 Franken über der LCP II. Im Schweizer Fachhandel, sofern die Waffe überhaupt geführt wird, liegt der Neupreis bei rund 500 bis 700 Franken für die LCP II und 600 bis 800 Franken für die LCP MAX. Die Verfügbarkeit schwankt, da Ruger-Produkte in der Schweiz nicht flächendeckend im Sortiment sind.

Beim Kauf einer gebrauchten LCP sollte man einige Punkte beachten. Der Polymerrahmen ist robust, kann aber bei intensivem Gebrauch an den Schlittenführungen Verschleiss zeigen. Die Abzugsfeder sollte geprüft werden, da ein zu leichter oder zu schwerer Abzug auf Verschleiss oder unsachgemässe Modifikation hindeuten kann. Bei der ersten Generation war die Visierung praktisch nicht vorhanden, was beim Schiessen auf dem Stand frustrierend sein kann. Die LCP II hat hier deutlich nachgebessert. Die Magazine sind günstig und zuverlässig, sollten aber auf Verformungen an den Lippen geprüft werden. Ein wichtiger Hinweis: Die LCP verschiesst ausschliesslich .380 ACP und darf nicht mit 9x19mm Munition geladen werden, obwohl beide Kaliber umgangssprachlich als 9mm bezeichnet werden. Verwechslungen sind gefährlich.

Der Rechtsstatus in der Schweiz ist eindeutig: Die Ruger LCP ist eine bewilligungspflichtige Waffe, für deren Erwerb ein Waffenerwerbsschein erforderlich ist. Die üblichen Voraussetzungen für den WES gelten. Es gibt keine besonderen Einschränkungen aufgrund des Kalibers oder der Baugrösse. Die Waffe darf auf bewilligten Schiessständen geschossen werden, und der Transport erfolgt in nicht schussbereitem Zustand auf direktem Weg. Für das Tragen der Waffe in der Öffentlichkeit wäre eine Waffentragbewilligung erforderlich, die in der Schweiz nur unter sehr restriktiven Bedingungen erteilt wird und für die meisten Privatpersonen nicht in Frage kommt.`,
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
    inhalt: `Die Taurus G2C und ihre Nachfolgerin G3C sind brasilianische Kompaktpistolen, die im absoluten Einstiegspreissegment angesiedelt sind und dort eine erstaunlich solide Leistung bieten. Was sie besonders macht, ist das Preis-Leistungs-Verhältnis: Für einen Bruchteil des Preises einer Glock, SIG oder CZ erhält der Käufer eine funktionstüchtige, zuverlässige 9mm-Pistole mit 12-Schuss-Magazin und einer Ausstattung, die man in dieser Preisklasse nicht erwarten würde. Die G3C kommt ab Werk mit drei Magazinen, manueller Sicherung, Zubehörschiene und einer Restrike-Funktion bei Zündversagern. Diese Kombination hat die G-Serie zum meistverkauften Modell von Taurus gemacht und zu einer der meistverkauften Pistolen weltweit.

Die Geschichte der G2C und G3C beginnt mit der Taurus PT111 Millennium Pro, die in den frühen 2000er Jahren als günstige Kompaktpistole auf den Markt kam. Taurus, gegründet 1939 in Porto Alegre, Brasilien, ist einer der grössten Waffenhersteller der Welt und bekannt für preiswerte Handfeuerwaffen. Die PT111 hatte zunächst einen gemischten Ruf: Die frühen Modelle litten unter Qualitätsproblemen und Rückrufaktionen, die dem Image von Taurus erheblich schadeten. Ab 2016 brachte Taurus mit der G2C eine grundlegend überarbeitete Version auf den Markt, die viele der früheren Probleme beseitigte. Die Verarbeitungsqualität stieg deutlich, die Zuverlässigkeit verbesserte sich markant, und der Preis blieb niedrig. 2020 folgte die G3C als nochmals verbesserte Version mit besserem Abzug, verfeinerter Grifftextur und überarbeiteter Visierung. Parallel stellte Taurus die G3 als Full-Size-Version mit 17-Schuss-Magazin vor und 2022 die G3X als Hybrid mit G3-Schlitten auf G3C-Griffstück.

Technisch arbeiten G2C und G3C als Kurzhub-Rückstosslader mit Browning-Kipplaufsystem. Das Kaliber ist 9x19mm, wobei auch eine .40-S&W-Version existiert. Das Magazin fasst 12 Schuss in Doppelreihe. Der Lauf hat eine Länge von 83 Millimetern, die Gesamtlänge beträgt 163 Millimeter, und das Gewicht liegt bei 623 Gramm leer. Der Abzug ist ein SA/DA-System mit einem innenliegenden Hahn, das eine besondere Eigenschaft bietet: die Restrike-Fähigkeit. Falls eine Patrone beim ersten Abschlag nicht zündet, kann der Abzug erneut betätigt werden, um den Hahn nochmals auf das Zündhütchen fallen zu lassen, ohne die Waffe manuell repetieren zu müssen. Eine manuelle Sicherung auf beiden Seiten des Rahmens ermöglicht das gesicherte Tragen mit gespanntem Hahn. Die Zubehörschiene unter dem Lauf nimmt handelsübliche Waffenlichter und Laser auf. Der Polymerrahmen ist solide, wenn auch nicht so fein verarbeitet wie bei europäischen Premiumherstellern.

Die Modellpalette der Taurus G-Serie hat sich in den letzten Jahren deutlich erweitert. Die G2C war das Ursprungsmodell von 2016 und ist mittlerweile weitgehend durch die G3C ersetzt worden. Die G3C von 2020 bietet den verbesserten Abzug mit kürzerem Reset, eine aggressivere Grifftextur und eine überarbeitete Visierung mit weissen Kontrastpunkten. Die G3 ist die Full-Size-Version mit 17+1 Schuss und einem längeren Lauf von 102 Millimetern, die sich an Besitzer richtet, die eine grössere Waffe für den Schiessstand oder zu Hause bevorzugen. Die G3X kombiniert den längeren G3-Schlitten mit dem kompakteren G3C-Griffstück und bietet damit einen Kompromiss zwischen Visierradius und Tragbarkeit. Alle Modelle sind in Schwarz erhältlich, einige auch in verschiedenen Cerakote-Farben wie OD Green oder Flat Dark Earth.

Im Kaliber 9x19mm liefert die G3C mit dem 83-Millimeter-Lauf rund 350 m/s Mündungsgeschwindigkeit und etwa 490 Joule Mündungsenergie mit Standard-Fabrikmunition. Das ist etwas weniger als aus einer Full-Size-Pistole mit längerem Lauf, aber für die kompakten Abmessungen absolut respektabel. Die .40-S&W-Version bietet höhere Einzelschuss-Energie von rund 575 Joule, wurde aber von der 9mm-Version in der Beliebtheit überholt, da 9mm-Munition günstiger ist und moderne 9mm-Ladungen die Leistungslücke zur .40 S&W weitgehend geschlossen haben. Die effektive Reichweite für präzises Schiessen liegt bei 25 Metern, was für eine Kompaktpistole dieser Preisklasse akzeptabel ist. Die Präzision ist nicht auf dem Niveau einer SIG P226 oder CZ 75, aber für den vorgesehenen Einsatzzweck mehr als ausreichend.

In der Schweiz ist die Taurus G-Serie vor allem als Budget-Option für Einsteiger interessant. Neupreise in der Schweiz liegen bei CHF 350–450 für die G3C. Auf dem Gebrauchtmarkt sind Exemplare ab CHF 200 erhältlich, wobei gut erhaltene G3C für CHF 250–350 den Besitzer wechseln. Die G3 Full-Size kostet neu CHF 400–500. Im Vergleich zu einer Glock 19 für CHF 700–800 oder einer SIG P320 für CHF 800–1'000 ist die Ersparnis erheblich. Für den Erwerb ist ein Waffenerwerbsschein (WES) erforderlich, der beim kantonalen Waffenbüro beantragt wird. Die üblichen Voraussetzungen gelten: kein relevanter Strafregistereintrag, kein Hinweis auf Gefährdung, Schweizer Bürgerrecht oder Niederlassungsbewilligung C. Die Verfügbarkeit in der Schweiz ist eingeschränkt, da Taurus auf dem europäischen Markt weniger präsent ist als in Nord- und Südamerika. Einige Fachhändler führen die G-Serie jedoch regulär, und Importbestellungen sind über den Fachhandel möglich.

Die Pflege der G3C ist unkompliziert und erfordert keine besonderen Kenntnisse. Die Zerlegung erfolgt werkzeuglos über den Zerlegehebel am Rahmen. Lauf, Schlitten und Rückstossfeder sollten nach jedem Schiessgang gereinigt und leicht geölt werden. Die Magazine sind robust, sollten aber periodisch zerlegt und gereinigt werden, da sich Schmutz unter der Bodenplatte ansammeln kann. An Zubehör sind Holster für die G3C von verschiedenen Herstellern erhältlich, wobei die Auswahl kleiner ist als bei Glock oder SIG. Waffenlichter wie die Streamlight TLR-6 oder Olight PL-Mini passen auf die Zubehörschiene. Ersatzmagazine kosten CHF 25–35 und sind relativ günstig, was angesichts der drei im Lieferumfang enthaltenen Magazine aber selten nötig ist.

Die Taurus G3C ist die ideale Pistole für Einsteiger und preisbewusste Käufer in der Schweiz. Wer eine funktionale 9mm-Pistole sucht und das Budget nicht für eine Glock oder SIG reicht, findet in der G3C eine überraschend gute Alternative. Die drei mitgelieferten Magazine, die manuelle Sicherung und die Restrike-Funktion bieten einen Mehrwert, den teurere Konkurrenten nicht immer mitbringen. Die Nachteile liegen in der etwas groberen Verarbeitung, dem weniger feinen Abzug und dem geringeren Wiederverkaufswert im Vergleich zu Premiummarken. Wer die Waffe jedoch zum Schiessen kauft und nicht als Wertanlage, macht mit der G3C keinen Fehler. Als Empfehlung für den Schweizer Markt ist die G3C der klare Preis-Leistungs-Sieger im Segment der kompakten 9mm-Pistolen.`,
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
    inhalt: `Die Springfield XD ist eine Pistole mit einer ungewöhnlichen Herkunftsgeschichte und einem einzigartigen technischen Merkmal. Was sie besonders macht, ist die Griffsicherung am Rückstrang des Griffstücks, die bei keiner anderen modernen Polymerrahmen-Pistole zu finden ist. Dieses Sicherheitsmerkmal, das von der legendären M1911 übernommen wurde, muss vollständig eingedrückt werden, bevor die Waffe feuern kann. Zusammen mit dem Abzugssicherungshebel, einem Ladezustandsanzeiger und einem Spannungsanzeiger verfügt die XD über mehr passive Sicherheitssysteme als jede andere Striker-Fire-Pistole.

Die Geschichte der Springfield XD beginnt nicht in den USA, sondern in Kroatien. Das ursprüngliche Design stammt von HS Produkt, einem kroatischen Waffenhersteller in Karlovac, der die Pistole unter dem Namen HS2000 entwickelte und ab 1999 an die kroatischen Streitkräfte lieferte. Im Jahr 2002 schloss Springfield Armory, ein traditionsreiches amerikanisches Unternehmen mit Sitz in Geneseo, Illinois, eine Lizenzvereinbarung mit HS Produkt und begann, die HS2000 unter dem Namen Springfield XD auf dem US-Markt zu vertreiben. Der Name XD steht für Extreme Duty. Die Kombination aus dem kroatischen Engineering und der amerikanischen Vermarktung erwies sich als Erfolgsrezept: Die XD verkaufte sich millionenfach und wurde von zahlreichen US-Polizeidienststellen als Dienstwaffe übernommen. 2009 folgte die XDm mit verbessertem Match-Lauf, austauschbaren Griffrücken und höherer Magazinkapazität. 2012 kam die XD-S als Single-Stack-Subcompact für verdecktes Tragen, und 2020 stellte Springfield die XD-M Elite als neueste Generation mit dem META-Abzugssystem vor, das einen deutlich kürzeren Reset und ein klareres Abzugsgefühl bietet.

Technisch arbeitet die Springfield XD als Kurzhub-Rückstosslader mit Browning-Kipplauf und einem Striker-Fire-Abzugssystem. Die Verriegelung erfolgt über einen Verriegelungsblock am Lauf, der in die Auswurföffnung des Schlittens greift. Im Kaliber 9x19mm fasst das Magazin der 4-Zoll-Version 16 Patronen, die 5-Zoll-Tactical-Version ebenfalls 16. In .40 S&W sind es 12 Patronen, in .45 ACP 13. Der Lauf der 4-Zoll-Version misst 102 Millimeter, die 5-Zoll-Tactical-Version hat einen Lauf von 127 Millimetern. Die Gesamtlänge beträgt 184 Millimeter in der 4-Zoll-Version, das Gewicht liegt bei 737 Gramm leer in 9mm. Die Griffsicherung ist eine federbelastete Schwinge am Rückstrang, die durch den normalen Griff automatisch eingedrückt wird. Zusätzlich verfügt der Abzug über einen Sicherungshebel ähnlich dem der Glock. Ein Ladezustandsanzeiger am Schlitten zeigt an, ob sich eine Patrone in der Kammer befindet, und ein Spannungsanzeiger am Heck des Schlittens signalisiert, ob der Schlagbolzen gespannt ist.

Die Modellpalette der XD-Familie ist umfangreich. Die originale XD ist in den Lauflängen 3 Zoll, 4 Zoll und 5 Zoll erhältlich. Die XDm brachte 2009 einen Match-Grade-Lauf, austauschbare Griffrücken in drei Grössen und eine Magazinkapazität von 19 Schuss in 9mm mit dem Full-Size-Griffstück. Die XD-S von 2012 ist ein Single-Stack-Subcompact mit nur 25,4 Millimetern Breite, konzipiert für verdecktes Tragen. Die XD-M Elite von 2020 ist die aktuelle Spitzenversion mit META-Abzug, gefrästem Schlitten für Optics und verbesserter Ergonomie. Die Hellcat, obwohl technisch eine eigenständige Linie, gehört zur Springfield-Familie und wird separat behandelt. Alle XD-Modelle werden nach wie vor bei HS Produkt in Kroatien gefertigt und von Springfield Armory in den USA importiert und vertrieben.

Im Kaliber 9x19mm liefert die XD mit dem 102-Millimeter-Lauf rund 365 m/s Mündungsgeschwindigkeit und etwa 535 Joule Mündungsenergie mit Standard-NATO-Munition. Die 5-Zoll-Tactical-Version mit 127-Millimeter-Lauf erreicht rund 380 m/s und etwa 580 Joule. In .40 S&W sind es rund 575 Joule, in .45 ACP rund 480 Joule. Die Präzision ist dank des eng gepassten Laufs und der guten Visierung für eine Dienstpistole überdurchschnittlich. Die effektive Reichweite für präzises Schiessen liegt bei 50 Metern, wobei die 5-Zoll-Tactical-Version aufgrund des längeren Visierradius hier Vorteile hat.

In der Schweiz ist die Springfield XD eine seltenere Erscheinung, da Springfield Armory auf dem europäischen Markt weniger aktiv ist als SIG Sauer oder Glock. Dennoch sind XD-Modelle über spezialisierte Fachhändler erhältlich und tauchen gelegentlich auf dem Gebrauchtmarkt auf. Neupreise in der Schweiz liegen bei CHF 650–850 für die Standard-XD und CHF 800–1'000 für die XDm Elite. Auf dem Gebrauchtmarkt sind Exemplare ab CHF 400 erhältlich, wobei gut erhaltene XDm-Modelle CHF 500–700 kosten. Sehr gute Exemplare mit Originalverpackung und Zubehör erzielen CHF 700–900. Für den Erwerb ist ein Waffenerwerbsschein (WES) erforderlich, der beim kantonalen Waffenbüro beantragt wird. Die üblichen Voraussetzungen gelten: kein relevanter Strafregistereintrag, kein Hinweis auf Gefährdung, Schweizer Bürgerrecht oder Niederlassungsbewilligung C.

Die Springfield XD ist eine pflegeleichte Pistole. Die Zerlegung für die Grundreinigung erfordert das Zurückziehen des Schlittens, das Drehen des Zerlegehebels und das Abnehmen des Schlittens nach vorne. Die Griffsicherung muss beim Zerlegen eingedrückt gehalten werden, was eine kleine Besonderheit darstellt. Lauf, Schlitten und Rückstossfeder sollten nach jedem Schiessgang gereinigt und leicht geölt werden. Die Griffsicherung selbst sollte periodisch auf Leichtgängigkeit geprüft werden. An Zubehör sind Holster von verschiedenen Herstellern erhältlich, wobei die Griffsicherung bei einigen Holstertypen berücksichtigt werden muss. Die Zubehörschiene nimmt alle gängigen Waffenlichter und Laser auf. Ersatzmagazine kosten CHF 35–50 und sind über den Fachhandel bestellbar.

Die Springfield XD richtet sich an Schützen, die eine zuverlässige Polymerrahmen-Pistole mit zusätzlichen Sicherheitsmerkmalen suchen. Die Griffsicherung ist dabei das Hauptargument: Wer eine Striker-Fire-Pistole mit einem zusätzlichen passiven Sicherheitssystem bevorzugt, findet in der XD eine der wenigen Optionen am Markt. Die Verarbeitungsqualität ist für den Preis gut, die Zuverlässigkeit nach Jahrzehnten am Markt erwiesen. Die Nachteile liegen in der begrenzten Verfügbarkeit in der Schweiz und der kleineren Zubehörindustrie im Vergleich zu Glock. Für Schweizer Käufer, die eine Alternative zu Glock und SIG suchen und die Griffsicherung schätzen, ist die XD eine überlegenswerte Wahl zum moderaten Preis. Die XDm Elite mit dem META-Abzug ist die empfehlenswerteste Variante, da sie die neueste Technik mit bewährter Zuverlässigkeit verbindet.`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Die Tanfoglio Witness, international auch als EAA Witness vermarktet, ist ein italienischer Klon der legendären CZ 75, gefertigt von Fratelli Tanfoglio in Gardone Val Trompia — dem historischen Zentrum der italienischen Waffenindustrie in der Provinz Brescia. Die Firma Tanfoglio wurde 1961 von Giuseppe Tanfoglio gegründet und begann zunächst mit der Produktion kleiner Taschenpistolen.</p>
<p>In den späten 1970er-Jahren erwarb Tanfoglio eine Lizenz zur Fertigung der CZ 75, die damals aufgrund des Eisernen Vorhangs im Westen schwer erhältlich war. Aus dieser Lizenzproduktion entwickelte sich schnell eine eigenständige Plattform, die in vielen Aspekten über das tschechische Original hinausging. Besonders im Bereich des IPSC-Schiesssports etablierte sich die Witness als dominante Waffe in der Standard- und Open-Division.</p>
<p>Ab den 1990er-Jahren begann Tanfoglio, enge Kooperationen mit Top-IPSC-Schützen wie Eric Grauffel einzugehen, was zur kontinuierlichen Verbesserung der Plattform führte. Die Einführung der Stock-Serie markierte den Durchbruch als ernstzunehmende Wettkampfwaffe, die ab Werk mit der Präzision und dem Abzug von handgefertigten Custom-Pistolen konkurrieren konnte.</p>

<h2>Technik & Konstruktion</h2>
<p>Die Tanfoglio Witness basiert auf dem bewährten Browning-Verschlussprinzip in der CZ-75-Ausführung mit innenliegendem Schlitten. Diese Konstruktion bietet gegenüber konventionellen Pistolen mit aussen liegendem Schlitten entscheidende Vorteile: Der tiefere Schwerpunkt reduziert den Mündungshochdruck, und die grössere Führungsfläche zwischen Rahmen und Schlitten sorgt für eine spielfreiere Verriegelung.</p>
<p>Der Verschluss arbeitet als Kurzhub-Rückstosslader. Beim Schuss bewegen sich Lauf und Schlitten zunächst gemeinsam zurück, bis der Lauf durch eine Steuerkurve nach unten abgekippt wird und den Schlitten freigibt. Dieser Mechanismus ist extrem zuverlässig und ermöglicht eine hohe Fertigungstoleranz ohne Präzisionsverlust.</p>
<p>Die Abzugssysteme variieren je nach Modell: Die Standard-Witness verwendet einen konventionellen DA/SA-Abzug mit Sicherungshebel, während die Wettkampfmodelle (Stock II, Stock III, Gold) einen reinen Single-Action-Abzug (SAO) mit extrem kurzem Weg und geringem Abzugsgewicht bieten. Das SAO-Abzugsgewicht der Stock III liegt bei ca. 900 bis 1100 Gramm ab Werk.</p>
<p>Der Stahlrahmen der Witness ist aus geschmiedetem Stahl gefräst und bietet eine hervorragende Steifigkeit. Die Polymer-Variante (Wonder) verwendet einen glasfaserverstärkten Polymerrahmen mit Stahleinlagen an den kritischen Kontaktpunkten.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>Witness Standard:</strong> Das DA/SA-Basismodell mit Stahlrahmen. Erhältlich in allen Kalibern. Solide Gebrauchspistole für Sport und Freizeit.</li>
<li><strong>Witness Polymer (Wonder):</strong> Leichtere Version mit Polymerrahmen (ca. 820 g). Gut geeignet als Einstiegsmodell.</li>
<li><strong>Witness Stock II:</strong> SAO-Wettkampfmodell mit verbessertem Abzug, einstellbarer Visierung und erweitertem Magazinschacht.</li>
<li><strong>Witness Stock III:</strong> Weiterentwicklung der Stock II mit nochmals verbessertem Abzug und verfeinertem Griffdesign. Aktuelles Top-Modell für IPSC Production und Standard.</li>
<li><strong>Witness Gold:</strong> Das Spitzenmodell mit Kompensator, Bull-Barrel und handgefittetem Abzug. Konzipiert für die IPSC Open Division.</li>
<li><strong>Witness Match:</strong> Sportmodell mit langem Lauf und Matchvisierung.</li>
<li><strong>Limited Custom:</strong> Handgefittete Einzelstücke aus dem Tanfoglio Custom Shop mit speziellen Oberflächenbehandlungen.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Ein wesentlicher Vorteil der Tanfoglio-Plattform ist die enorme Kalibervielfalt — die grösste aller CZ-75-basierten Pistolen:</p>
<ul>
<li><strong>9x19mm Parabellum:</strong> Standardkaliber für IPSC Production. Magazinkapazität 17 Schuss. Mündungsenergie ca. 500 bis 550 Joule.</li>
<li><strong>.40 S&W:</strong> Beliebt in der IPSC Standard Division wegen des höheren Powerfactors. 14 Schuss. Ca. 575 bis 650 Joule.</li>
<li><strong>10mm Auto:</strong> Die leistungsstärkste Variante für Autoloader. 14 Schuss. Bis zu 900 Joule möglich.</li>
<li><strong>.45 ACP:</strong> Klassisches Grosskaliber mit 10 Schuss Kapazität. Ca. 500 Joule.</li>
<li><strong>.38 Super:</strong> Bevorzugtes Kaliber für die Open Division wegen der hohen Geschwindigkeit und des guten Powerfactors.</li>
</ul>
<p>Die Läufe der Witness-Pistolen sind kaltgehämmert und bieten eine ausgezeichnete Genauigkeit. Die Polygonalzüge der neueren Modelle reduzieren den Verschleiss und erleichtern die Reinigung.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Tanfoglio-Pistolen sind in der Schweiz über verschiedene Importeure erhältlich und bieten ein hervorragendes Preis-Leistungs-Verhältnis:</p>
<ul>
<li><strong>Witness Standard (Stahl) neu:</strong> CHF 650 bis 850</li>
<li><strong>Witness Polymer (Wonder) neu:</strong> CHF 550 bis 700</li>
<li><strong>Witness Stock II neu:</strong> CHF 1100 bis 1400</li>
<li><strong>Witness Stock III neu:</strong> CHF 1400 bis 1700</li>
<li><strong>Witness Gold neu:</strong> CHF 2200 bis 2800</li>
<li><strong>Limited Custom neu:</strong> CHF 2500 bis 4000</li>
</ul>
<p>Gebrauchtpreise auf dem Schweizer Markt:</p>
<ul>
<li><strong>Witness Standard gebraucht:</strong> CHF 400 bis 600</li>
<li><strong>Stock II gebraucht:</strong> CHF 750 bis 1100</li>
<li><strong>Stock III gebraucht:</strong> CHF 1000 bis 1400</li>
</ul>
<p>Die Preisentwicklung ist stabil, da die Nachfrage im IPSC-Bereich konstant hoch bleibt.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Die Witness erfordert die gleiche Grundpflege wie alle Kurzwaffen: Reinigung nach jedem Schiesstraining, regelmässige Schmierung der Schlitten-Führungsflächen und Kontrolle der Verschleissteile.</p>
<ul>
<li><strong>Rückstellfeder:</strong> Wechsel alle 3000 bis 5000 Schuss empfohlen.</li>
<li><strong>Abzugsfeder:</strong> Bei intensivem Wettkampfeinsatz alle 10000 Schuss kontrollieren.</li>
<li><strong>Magazinfedern:</strong> Nach 5000 Ladezyklen austauschen.</li>
<li><strong>Visierung:</strong> Regelmässig auf festen Sitz prüfen bei den Stock-Modellen.</li>
</ul>
<p>Beliebtes Zubehör umfasst Henning-Griffschalen, erweiterte Magazinböden, Titan-Schlagbolzen sowie Holster von Amadini, Ghost und DAA.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die Tanfoglio Witness ist die ideale Wahl für Schützen, die eine CZ-75-basierte Pistole mit hervorragendem Preis-Leistungs-Verhältnis suchen. Für IPSC-Einsteiger ist die Stock II ein ausgezeichneter Einstieg, während ambitionierte Wettkampfschützen mit der Stock III eine ab Werk wettkampffertige Pistole erhalten.</p>
<p>Die Witness eignet sich weniger als reine Dienstwaffe — ihre Stärke liegt klar im sportlichen Bereich, wo sie seit Jahrzehnten Podiumsplätze sammelt. Wer den Einstieg in den IPSC-Sport plant und eine zuverlässige, präzise und erweiterbare Plattform sucht, macht mit einer Tanfoglio Witness nichts falsch. Der Wiederverkaufswert ist stabil, Ersatzteile und Zubehör sind reichlich vorhanden.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Die Pistole 08 (P08), im Ausland als "Luger" bekannt, war von 1908 bis 1945 die Standard-Dienstpistole der deutschen Armee. Georg Luger entwickelte sie aus der Borchardt C-93, einer sperrigen, aber technisch brillanten Selbstladepistole von Hugo Borchardt aus dem Jahr 1893. Luger vereinfachte den Mechanismus, verkleinerte die Waffe und schuf damit eine der ikonischsten Handfeuerwaffen der Geschichte.</p>
<p>Der Name "Parabellum" stammt vom lateinischen Sprichwort "Si vis pacem, para bellum" und war zugleich das Telegramm-Codewort der Deutschen Waffen- und Munitionsfabriken (DWM). Die erste militärische Einführung erfolgte 1900 durch die Schweiz — die Schweizer Armee war damit weltweit der erste Abnehmer der Luger-Pistole im Kaliber 7,65mm Parabellum.</p>
<p>1904 forderte die deutsche Marine ein grösseres Kaliber, woraufhin Luger die 9x19mm-Patrone entwickelte — ein Kaliber, das heute als weltweit meistverwendete Pistolenpatrone gilt. Die deutsche Armee übernahm die Pistole 1908 offiziell als P08. Während des Ersten und Zweiten Weltkriegs wurden Millionen Exemplare von DWM, Mauser, Simson, Krieghoff und anderen Herstellern produziert.</p>
<p>Nach 1945 endete die militärische Produktion, doch die Luger blieb als Sammlerstück und Symbol für Ingenieurskunst lebendig. Mauser produzierte in den 1970er-Jahren eine begrenzte Neuauflage.</p>

<h2>Technik & Konstruktion</h2>
<p>Der Kniehebelverschluss der Luger ist weltweit einzigartig und technisch faszinierend. Zwei Gelenkhebel knicken beim Rückstoss nach oben ab und ziehen dabei die leere Hülse aus dem Patronenlager. Dieses System unterscheidet sich grundlegend vom heute üblichen Browning-Verschluss: Statt einer linearen Rückwärtsbewegung des Schlittens erfolgt eine elegante Kippbewegung nach oben.</p>
<p>Der natürliche Griffwinkel von 55 Grad ist steiler als bei den meisten modernen Pistolen und ermöglicht ein instinktives Zielen — die Luger zeigt fast automatisch auf das Ziel, wenn man sie in Anschlag bringt. Die Fertigungsqualität war legendär: Jede Luger bestand aus über 90 Einzelteilen, die handgefertigt und individuell eingepasst wurden.</p>
<p>Die Verriegelung erfolgt durch das Kniegelenk: In gestreckter Position ist der Verschluss starr verriegelt. Beim Rückstoss trifft ein Nocken am Rahmen auf die Knieachse und knickt das Gelenk nach oben ab. Diese Konstruktion ist extrem präzise, aber auch empfindlich gegenüber Verschmutzung und erfordert hochwertige Munition mit konsistentem Gasdruck.</p>
<p>Der Abzugsmechanismus ist rein Single-Action. Der Abzug ist kurz und knackig, was zur legendären Präzision der Luger beiträgt.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>P08 (1908):</strong> Standard-Militärmodell mit 100mm Lauf. Die häufigste Variante, millionenfach produziert.</li>
<li><strong>Lange Pistole 08 (LP08):</strong> Artilleriemodell mit 200mm Lauf, Trommelmagazin (32 Schuss) und ansteckbarem Anschlagschaft.</li>
<li><strong>Marine-Modell (1904):</strong> 150mm Lauf, eingeführt bei der Kaiserlichen Marine.</li>
<li><strong>Schweizer Ordonnanz (Parabellum 1900/06):</strong> Die früheste Militärvariante im Kaliber 7,65mm Parabellum.</li>
<li><strong>Kommerzielle Modelle:</strong> Zahlreiche zivile Varianten mit unterschiedlichen Lauflängen und Kalibern.</li>
<li><strong>Krieghoff-Luger:</strong> Seltene Luftwaffen-Variante, heute extrem gesuchtes Sammlerstück.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Die Luger P08 wurde primär in zwei Kalibern gefertigt:</p>
<ul>
<li><strong>9x19mm Parabellum:</strong> Das von Georg Luger entwickelte Kaliber. Geschossgewicht 8 g, Mündungsgeschwindigkeit ca. 360 m/s, Mündungsenergie ca. 520 Joule.</li>
<li><strong>7,65x21mm Parabellum:</strong> Das ursprüngliche Kaliber der frühen Modelle. Geschossgewicht 6 g, Mündungsgeschwindigkeit ca. 370 m/s, Mündungsenergie ca. 410 Joule.</li>
</ul>
<p>Die Präzision der Luger ist für eine Militärpistole aussergewöhnlich — auf 25 Meter sind Streukreise unter 50mm keine Seltenheit mit guter Munition. Der längere Lauf des Artilleriemodells verbessert die Genauigkeit und erhöht die Mündungsgeschwindigkeit um ca. 50 m/s.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Die Luger hat in der Schweiz eine besondere Bedeutung, da die Schweizer Armee als erste weltweit die Parabellum-Pistole einführte. Schweizer Varianten (W+F Bern) sind unter Sammlern besonders begehrt.</p>
<ul>
<li><strong>Standard P08 (guter Zustand) gebraucht:</strong> CHF 800 bis 2500</li>
<li><strong>LP08 mit Trommelmagazin gebraucht:</strong> CHF 3000 bis 8000</li>
<li><strong>Schweizer Parabellum 1900/06 gebraucht:</strong> CHF 1500 bis 5000</li>
<li><strong>DWM 1900 Schweizer Modell (selten):</strong> CHF 3000 bis 12000</li>
<li><strong>Krieghoff-Luger gebraucht:</strong> CHF 5000 bis 20000</li>
<li><strong>Seltene Varianten:</strong> CHF 10000 bis 50000+</li>
</ul>
<p>Die Preise steigen kontinuierlich, da das Angebot an gut erhaltenen Exemplaren schrumpft. Matching-Nummern (alle Seriennummern übereinstimmend) erhöhen den Wert erheblich.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Die Luger P08 erfordert sorgfältigere Pflege als moderne Pistolen. Der Kniehebelmechanismus hat viele Gelenkflächen, die sauber und leicht geölt sein müssen.</p>
<ul>
<li><strong>Reinigung:</strong> Nach jedem Schiessen den Kniehebelmechanismus komplett zerlegen und alle Gelenkflächen reinigen.</li>
<li><strong>Schmierung:</strong> Nur leichtes Waffenöl verwenden — zu viel Öl zieht Schmutz an und kann verharzen.</li>
<li><strong>Magazine:</strong> Originalmagazine sind oft verschlissen. Reproduktionen von Mec-Gar bieten zuverlässigere Funktion.</li>
<li><strong>Federn:</strong> Die Schliessfeder sollte bei regelmässigem Gebrauch kontrolliert werden.</li>
</ul>
<p>Wichtig für Sammler: Originalteile niemals polieren oder nachbrünieren — dies zerstört den Sammlerwert. Holzgriffschalen mit Leinöl pflegen.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die Luger P08 ist weniger eine Gebrauchswaffe als ein Stück Technikgeschichte. Als Sammlerstück ist sie unübertroffen — keine andere Pistole vereint Ingenieurskunst, Ästhetik und historische Bedeutung so perfekt. Für Sammler empfiehlt sich der Kauf von Exemplaren mit passenden Nummern und nachvollziehbarer Provenienz.</p>
<p>Als Schiesswaffe ist die Luger durchaus noch brauchbar, erfordert aber hochwertige Munition und sorgfältige Pflege. Für Einsteiger in die Luger-Sammlung empfiehlt sich eine Standard-P08 in gutem Zustand — diese sind noch erschwinglich und bieten den vollen Genuss dieser einzigartigen Konstruktion.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Die Walther P38 wurde 1938 als Nachfolgerin der aufwendig gefertigten und teuren Luger P08 eingeführt. Die Wehrmacht benötigte eine Dienstpistole, die sich schneller und kostengünstiger produzieren liess als die P08 mit ihrem komplexen Kniehebelverschluss. Carl Walther in Zella-Mehlis gewann den Auftrag mit einer revolutionären Konstruktion.</p>
<p>Die P38 setzte den Standard für alle modernen DA/SA-Pistolen. Sie war die erste Militärpistole mit Double-Action-Abzug und externem Hahn — ein Konzept, das bis heute in SIG, Beretta und CZ-Pistolen lebt. Während des Zweiten Weltkriegs wurde die P38 nicht nur bei Walther, sondern auch bei Mauser (Oberndorf) und Spreewerk (Werk Grottau) in Massenproduktion gefertigt.</p>
<p>Nach dem Krieg übernahm die neu gegründete Bundeswehr die P38 unter der Bezeichnung P1 als Ordonnanzwaffe — sie diente von 1957 bis zur Einführung der P8 (HK USP) im Jahr 2004. Die P38 beeinflusste zahlreiche spätere Konstruktionen, darunter die Beretta 92, die SIG P220 und die CZ 75.</p>

<h2>Technik & Konstruktion</h2>
<p>Die P38 verwendet einen Kurzhub-Rückstosslader mit Schwenkriegel-Verriegelung. Zwei seitliche Riegel verriegeln den Lauf im Schlitten. Beim Rückstoss bewegen sich Lauf und Schlitten zunächst gemeinsam zurück, bis die Riegel durch eine Steuerfläche am Rahmen nach innen gezogen werden und den Lauf freigeben. Dieses System wurde später von Beretta für die Model 92 übernommen.</p>
<p>Die P38 führte drei Innovationen ein, die bis heute Standard sind: Der Double-Action-Erstschuss ermöglicht das Abfeuern ohne vorheriges Spannen des Hahns. Der Ladezustandsanzeiger — ein fühlbarer Stift am Schlitten — zeigt an, ob sich eine Patrone im Lauf befindet. Der Sicherungshebel mit Entkupplungsfunktion lässt den gespannten Hahn sicher ab und blockiert den Schlagbolzen.</p>
<p>Die Verarbeitungsqualität variiert stark je nach Produktionszeitraum. Frühe Walther-Modelle (ac-Codes bis 1943) zeigen exzellente Fertigung, während späte Kriegsproduktionen (besonders Spreewerk) deutliche Vereinfachungen aufweisen. Alle Varianten sind jedoch funktionszuverlässig und für den Schiessbetrieb geeignet.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>P38 (1938-1945):</strong> Kriegsproduktion bei Walther (ac-Code), Mauser (byf/svw) und Spreewerk (cyq). Über eine Million Exemplare gefertigt.</li>
<li><strong>P1 (1957-2000):</strong> Nachkriegsversion der Bundeswehr mit Aluminium-Rahmen statt Stahl. Leichter, aber anfälliger für Rahmenrisse bei intensivem Gebrauch.</li>
<li><strong>P4:</strong> Verkürzte Polizeiversion mit kürzerem Lauf und verbessertem Sicherungsmechanismus.</li>
<li><strong>P38K:</strong> Extrem kurze Variante mit 70mm Lauf, sehr selten.</li>
<li><strong>HP (Heeres-Pistole):</strong> Vorserienmodelle, bei Sammlern sehr begehrt.</li>
<li><strong>Null-Serie:</strong> Erste Produktionsserie mit besonderen Merkmalen, extrem selten.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Die P38 wurde ausschliesslich im Kaliber 9x19mm Parabellum gefertigt:</p>
<ul>
<li><strong>9x19mm Parabellum:</strong> Geschossgewicht 8 g, Mündungsgeschwindigkeit ca. 365 m/s aus dem 125mm-Lauf, Mündungsenergie ca. 530 Joule.</li>
</ul>
<p>Die Präzision der P38 ist gut, aber nicht auf dem Niveau der Luger P08. Der längere Abzugsweg im DA-Modus reduziert die Erstschuss-Präzision, während der SA-Modus sehr gute Ergebnisse liefert. Auf 25 Meter sind Streukreise von 60 bis 80mm realistisch.</p>
<p>Zivile Versionen wurden gelegentlich auch in 7,65mm Parabellum und .22 LR gefertigt, diese sind jedoch selten. Die P38 funktioniert zuverlässig mit allen gängigen 9mm-Fabrikpatronen, von leichten 115-Grain- bis zu schweren 147-Grain-Subsonic-Ladungen.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Die P38 ist auf dem Schweizer Sammlermarkt gut verfügbar, da viele Exemplare über die Jahrzehnte importiert wurden.</p>
<ul>
<li><strong>Walther-Produktion (ac-Code) gebraucht:</strong> CHF 600 bis 2000</li>
<li><strong>Mauser-Produktion (byf/svw) gebraucht:</strong> CHF 500 bis 1500</li>
<li><strong>Spreewerk (cyq) gebraucht:</strong> CHF 400 bis 1200</li>
<li><strong>P1 Bundeswehr gebraucht:</strong> CHF 300 bis 700</li>
<li><strong>HP (Heeres-Pistole) gebraucht:</strong> CHF 2000 bis 6000</li>
<li><strong>Null-Serie gebraucht:</strong> CHF 5000 bis 15000+</li>
</ul>
<p>Die Preise für WW2-Originale steigen langsam aber stetig. Besonders gesucht sind frühe ac-Codes mit hoher Verarbeitungsqualität und matching Nummern. P1-Modelle der Bundeswehr sind deutlich günstiger und bieten eine gute Einstiegsmöglichkeit.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Die P38 ist pflegeleichter als die Luger, da ihr Verschlusssystem weniger komplex ist. Dennoch gibt es einige wichtige Punkte zu beachten:</p>
<ul>
<li><strong>Schwenkriegel:</strong> Die beiden Verriegelungsriegel müssen sauber und leicht geölt sein. Verschmutzung kann zu Verriegelungsproblemen führen.</li>
<li><strong>Schlagbolzen:</strong> Der Schlagbolzen sollte regelmässig auf Risse kontrolliert werden, besonders bei älteren Modellen.</li>
<li><strong>P1-Rahmen:</strong> Aluminium-Rahmen der P1 auf Risse im Bereich der Verriegelungsaufnahme prüfen — ein bekanntes Problem bei hoher Schusszahl.</li>
<li><strong>Magazine:</strong> Originale 8-Schuss-Magazine sind zuverlässig. Nachfertigungen von Mec-Gar sind eine gute Alternative.</li>
</ul>
<p>Als Zubehör sind originale Lederholster (Wehrmacht oder Bundeswehr) begehrte Sammlerstücke. Ersatzteile sind dank der hohen Produktionszahlen gut verfügbar.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die Walther P38 ist ein Meilenstein der Waffengeschichte und als Sammlerstück hochinteressant. Sie bietet den historischen Reiz einer WW2-Dienstwaffe mit der Alltagstauglichkeit eines modernen DA/SA-Systems. Für Sammler empfiehlt sich eine frühe Walther-Produktion (ac 41 bis ac 43) als beste Kombination aus Qualität und Verfügbarkeit.</p>
<p>Als Schiesswaffe ist die P38 immer noch uneingeschränkt brauchbar und bietet ein angenehmes Schiesserlebnis. Die P1 der Bundeswehr ist die günstigste Option für Schützen, die eine historische Pistole regelmässig nutzen möchten, ohne Sammlerwert zu riskieren.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Der Smith & Wesson 686 wurde 1981 als Edelstahl-Version des Model 586 eingeführt und ist seither der meistverkaufte .357 Magnum Revolver der Welt. Seine Entwicklung war eine direkte Reaktion auf die Probleme des K-Rahmen Model 19: Dieser beliebte Polizeirevolver zeigte bei intensivem .357-Magnum-Gebrauch Materialermüdung, insbesondere Risse im Bereich der Laufaufnahme.</p>
<p>Smith & Wesson entwickelte daraufhin den L-Rahmen — grösser und stärker als der K-Rahmen, aber kompakter als der massive N-Rahmen des Model 29. Dieser Kompromiss traf den Nerv der Zeit: Polizeibehörden, Sportschützen und Jäger erhielten einen Revolver, der unbegrenzt Magnum-Dauerfeuer aushielt, ohne die Handlichkeit eines Dienstrevolveres einzubüssen.</p>
<p>Die Einführung der 686 Plus-Variante mit 7 statt 6 Schuss war ein weiterer Meilenstein. Der zusätzliche Schuss machte den 686 Plus zum Favoriten vieler Wettkampfschützen und Sicherheitskräfte. Heute ist der 686 das Rückgrat des S&W-Revolverprogramms und in zahlreichen Varianten erhältlich.</p>

<h2>Technik & Konstruktion</h2>
<p>Der 686 verwendet den L-Rahmen aus rostfreiem Edelstahl (416 Stainless Steel), der speziell für die Dauerbelastung mit .357 Magnum entwickelt wurde. Der Rahmen ist aus einem Stück Stahl geschmiedet und anschliessend CNC-gefräst — eine Kombination, die maximale Festigkeit bei hoher Präzision bietet.</p>
<p>Das Abzugssystem ist das klassische S&W DA/SA-System mit Blattfeder. Der Double-Action-Abzug des 686 gilt als der sanfteste und gleichmässigste aller Serienrevolver — ein Ergebnis jahrzehntelanger Verfeinerung. Im SA-Modus bricht der Abzug glasklar bei ca. 1,5 kg.</p>
<p>Die Trommel ist mit einem Kugelverschluss am Crane gesichert und wird durch den vorderen Trommelbolzen zusätzlich gehalten. Der Ausstosser wirft alle Hülsen gleichzeitig aus. Der Lauf ist ein Full-Lug-Design mit vollem Unterlug bis zur Mündung, was das Gewicht nach vorne verlagert und den Mündungshochdruck bei Magnum-Ladungen reduziert.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>686 Standard:</strong> 6 Schuss, erhältlich mit 4" und 6" Lauf. Das klassische Basismodell.</li>
<li><strong>686 Plus:</strong> 7 Schuss dank vergrösserter Trommel. Gleiche Rahmengrösse wie der Standard.</li>
<li><strong>686 SSR (Pro Series):</strong> Wettkampfmodell mit Holzgriff, einstellbarem Abzugsanschlag und verbesserter Visierung.</li>
<li><strong>686 Competitor:</strong> Performance Center Modell mit 6" Lauf, gewichtetem Unterlug und hauseigenem Tuning.</li>
<li><strong>686 Plus 3-5-7 Magnum Series:</strong> Erhältlich mit 3", 5" und 7" Lauf für unterschiedliche Einsatzzwecke.</li>
<li><strong>586:</strong> Die brünierte Version des 686, heute nicht mehr in Produktion und bei Sammlern beliebt.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Der 686 verschiesst zwei Kaliber:</p>
<ul>
<li><strong>.357 Magnum:</strong> Geschossgewicht 8,1 bis 10,2 g (125 bis 158 Grain), Mündungsgeschwindigkeit 370 bis 440 m/s aus dem 4"-Lauf, Mündungsenergie 700 bis 900 Joule. Hervorragend für Jagd auf Rehwild und als Verteidigungspatrone.</li>
<li><strong>.38 Special:</strong> Geschossgewicht 8,1 bis 10,2 g, Mündungsgeschwindigkeit 240 bis 300 m/s, Mündungsenergie 250 bis 400 Joule. Ideal für Training und Wettkampf wegen des geringen Rückstosses.</li>
</ul>
<p>Der 6"-Lauf bietet gegenüber dem 4"-Lauf ca. 30 bis 50 m/s mehr Mündungsgeschwindigkeit und eine längere Visierlinie für präziseres Schiessen. Für die Jagd empfiehlt sich der 6"-Lauf, für vielseitigen Einsatz der 4"-Lauf.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Der S&W 686 ist in der Schweiz einer der beliebtesten Revolver und bei allen grösseren Waffenhändlern erhältlich:</p>
<ul>
<li><strong>686 Standard (4") neu:</strong> CHF 1100 bis 1350</li>
<li><strong>686 Plus (4") neu:</strong> CHF 1150 bis 1400</li>
<li><strong>686 SSR Pro Series neu:</strong> CHF 1400 bis 1700</li>
<li><strong>686 Competitor (Performance Center) neu:</strong> CHF 1800 bis 2200</li>
</ul>
<p>Gebrauchtpreise:</p>
<ul>
<li><strong>686 Standard gebraucht:</strong> CHF 700 bis 1000</li>
<li><strong>686 Plus gebraucht:</strong> CHF 750 bis 1100</li>
<li><strong>586 (brüniert, gebraucht):</strong> CHF 800 bis 1400 (Sammlerzuschlag)</li>
</ul>
<p>Die Preise sind in den letzten Jahren leicht gestiegen, da S&W die Schweizer Importpreise angehoben hat. Gebrauchte 686er halten ihren Wert hervorragend.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Der 686 ist dank seiner Edelstahl-Konstruktion aussergewöhnlich pflegeleicht und korrosionsbeständig.</p>
<ul>
<li><strong>Reinigung:</strong> Trommel und Lauf nach jedem Schiessen reinigen. Bei .38 Special Wadcutter-Munition kann Bleiablagerung im Lauf auftreten.</li>
<li><strong>Abzug:</strong> Der DA-Abzug profitiert von einem leichten Ölfilm auf den Kontaktflächen. Ein professioneller Trigger-Job verbessert den ohnehin guten Abzug nochmals deutlich.</li>
<li><strong>Trommelspalt:</strong> Der Spalt zwischen Trommel und Lauf sollte regelmässig auf gleichmässigen Abstand geprüft werden.</li>
<li><strong>Griffschalen:</strong> Holzgriffe mit Leinöl pflegen. Gummigriffe von Hogue oder Pachmayr reduzieren den Rückstoss erheblich.</li>
</ul>
<p>Beliebtes Zubehör sind Griffschalen von Hogue, VZ Grips oder Altamont, Speedloader von HKS oder Safariland sowie einstellbare Visierungen.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Der S&W 686 ist der vielseitigste .357 Magnum Revolver auf dem Markt. Er eignet sich gleichermassen für Sportschützen, Jäger und Selbstverteidiger. Mit .38 Special ist er ein sanfter Übungsrevolver, mit .357 Magnum ein ernsthaftes Jagd- und Verteidigungsinstrument.</p>
<p>Für Einsteiger empfiehlt sich der 686 Plus mit 4"-Lauf als Allrounder. Wettkampfschützen greifen zum 6"-Modell oder zum SSR Pro Series. Wer maximale Leistung will, ist mit dem Competitor aus dem Performance Center bestens bedient.</p>
<p>Der 686 ist eine Investition, die ein Leben lang hält — bei entsprechender Pflege überlebt er seinen Besitzer problemlos.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Der Colt Python wurde 1955 als Premium-Revolver vorgestellt und gilt als der schönste und am besten verarbeitete Revolver aller Zeiten. Er wurde auf dem I-Rahmen von Colt gebaut — dem gleichen Rahmen wie der Colt Officer's Model und der Trooper — erhielt aber eine völlig andere Behandlung in der Fertigung.</p>
<p>Jeder Python wurde von Hand eingepasst und poliert, was die Produktionskosten erheblich erhöhte, aber einen Revolver von unvergleichlicher Qualität schuf. Die berühmte "Royal Blue" Hochglanzbrünierung erforderte bis zu 12 Arbeitsgänge von Hand — ein Aufwand, der in der modernen Serienproduktion undenkbar wäre.</p>
<p>Die Originalproduktion lief von 1955 bis 2005, wobei die Qualität nach den 1970er-Jahren allmählich nachliess, als Colt mit finanziellen Schwierigkeiten kämpfte. 2020 wurde der Python mit einer komplett neuen Konstruktion wiederbelebt — ein moderner Revolver, der den Namen trägt, aber technisch ein völlig anderes Produkt ist.</p>

<h2>Technik & Konstruktion</h2>
<p>Der originale Python verwendet Colts charakteristisches V-Feder-Abzugssystem, das sich grundlegend von der Blattfeder-Konstruktion bei Smith & Wesson unterscheidet. Die V-Feder sitzt im Griff und treibt sowohl den Hahn als auch den Abzugsrücklauf an. Dieses System erzeugt einen besonders gleichmässigen und weichen DA-Abzug.</p>
<p>Der Lauf ist mit einem belüfteten Laufmantel (Ventilated Rib) und einer durchgehenden Laufschiene versehen — das ikonische Erscheinungsbild des Python. Der volle Unterlug erstreckt sich vom Rahmen bis zur Mündung und verleiht der Waffe ihre charakteristische massive Optik bei gleichzeitig hervorragender Balance.</p>
<p>Die Trommel dreht im Uhrzeigersinn (bei S&W gegen den Uhrzeigersinn) und wird durch den typischen Colt-Verschluss mit Auslöser an der Rückseite der Trommel entriegelt. Der Trommelspalt ist extrem eng gehalten, was zur Präzision beiträgt. Die Läufe sind aus hochwertigem Chromstahl gefertigt und bieten ausgezeichnete Genauigkeit.</p>
<p>Der 2020er Python verwendet ein komplett neues Design mit einer Blattfeder statt der originalen V-Feder. Puristen kritisieren dies, doch der neue Abzug ist objektiv betrachtet ebenfalls sehr gut und vor allem wartungsärmer als das Originalsystem.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>Python (1955-2005):</strong> Originalproduktion, handgefertigt. Erhältlich in Royal Blue und Nickel-Finish.</li>
<li><strong>Python (2020-heute):</strong> Neukonstruktion mit verbesserter Feder-Mechanik. Edelstahl-Ausführung.</li>
<li><strong>Python Target:</strong> Einstellbare Visierung, 8" Lauf, für Wettkampfschiessen konzipiert.</li>
<li><strong>Python Hunter:</strong> Mit werksmontiertem Leupold-Zielfernrohr und 8" Lauf für die Jagd.</li>
<li><strong>Python Elite:</strong> Späte Sonderedition mit verbessertem Finish und einstellbarem Abzug.</li>
<li><strong>Python 2,5":</strong> Die kurze Variante, extrem selten und unter Sammlern die begehrteste Version.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Der Python wurde ausschliesslich in .357 Magnum gefertigt:</p>
<ul>
<li><strong>.357 Magnum:</strong> Geschossgewicht 8,1 bis 10,2 g, Mündungsgeschwindigkeit 380 bis 440 m/s aus dem 6"-Lauf, Mündungsenergie 700 bis 900 Joule.</li>
<li><strong>.38 Special:</strong> Vollständig kompatibel und ideal für Training. Mündungsenergie ca. 250 bis 400 Joule.</li>
</ul>
<p>Die Präzision des Python ist legendär — er gilt als der genaueste Serienrevolver, der je gebaut wurde. Auf 25 Meter sind Streukreise unter 30mm mit Match-Munition möglich. Der 6"-Lauf bietet die beste Balance zwischen Präzision, Mündungsgeschwindigkeit und Handlichkeit. Die hervorragende Genauigkeit ist das Ergebnis der handeingepassten Lauf-Trommel-Geometrie und des engen Trommelspalts.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Der Colt Python ist in der Schweiz ein gesuchtes Sammlerstück. Original-Pythons sind selten und erzielen Premiumpreise:</p>
<ul>
<li><strong>Original Python 6" Royal Blue (gut) gebraucht:</strong> CHF 2500 bis 5000</li>
<li><strong>Original Python 6" Nickel (gut) gebraucht:</strong> CHF 3500 bis 7000</li>
<li><strong>Original Python 2,5" (selten) gebraucht:</strong> CHF 5000 bis 10000</li>
<li><strong>Original Python 8" Target gebraucht:</strong> CHF 3000 bis 6000</li>
<li><strong>Neuer Python (2020+) neu:</strong> CHF 1800 bis 2200</li>
<li><strong>Neuer Python (2020+) gebraucht:</strong> CHF 1400 bis 1800</li>
</ul>
<p>Die Preise für Original-Pythons steigen seit Jahren stark an. Ein Python in neuwertigem Zustand mit Originalbox und Papieren kann deutlich über CHF 10000 erzielen. Der neue Python (2020+) ist deutlich günstiger, hat aber keinen Sammlerwert im klassischen Sinne.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Originale Pythons erfordern besondere Sorgfalt, da Ersatzteile schwer beschaffbar sind:</p>
<ul>
<li><strong>Brünierung:</strong> Die Royal Blue Brünierung ist empfindlich. Nur mit weichem Tuch und leichtem Waffenöl pflegen. Niemals mit Scheuermitteln behandeln.</li>
<li><strong>V-Feder:</strong> Die originale V-Feder kann brechen und ist schwer zu ersetzen. Wolff Gunsprings bietet Ersatz-V-Federn an.</li>
<li><strong>Abzug:</strong> Niemals einen Python-Abzug von einem nicht-spezialisierten Büchsenmacher bearbeiten lassen — das Colt-System erfordert spezifisches Know-how.</li>
<li><strong>Trommelachse:</strong> Regelmässig auf seitliches Spiel prüfen. Lockere Trommelachsen sind ein häufiges Problem bei älteren Pythons.</li>
</ul>
<p>Für den neuen Python (2020+) sind Ersatzteile über Colt verfügbar. Beliebtes Zubehör umfasst Holzgriffe von Altamont oder Hogue, Speedloader von HKS und hochwertige Lederholster.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Der Colt Python ist der "Rolls-Royce der Revolver" — wer das ultimative Revolvererlebnis sucht, kommt an ihm nicht vorbei. Ein originaler Python in gutem Zustand ist eine Wertanlage, die stetig an Wert gewinnt.</p>
<p>Für Schützen, die einen Python zum regelmässigen Schiessen suchen, empfiehlt sich der neue Python (2020+) — er bietet hervorragende Qualität ohne den Druck, ein Sammlerstück zu verschleissen. Original-Pythons sollten als Sammler- und Gelegenheits-Schiesswaffen behandelt werden.</p>
<p>Der Python ist keine rationale Kaufentscheidung — er ist eine emotionale. Wer ihn einmal in der Hand hatte, versteht, warum er seit über 60 Jahren als der schönste Revolver der Welt gilt.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Der Colt Single Action Army (SAA), auch "Peacemaker" genannt, wurde 1873 eingeführt und ist die ikonischste Waffe des Wilden Westens. Entwickelt von William Mason und Charles Brinckerhoff Richards bei Colt, gewann der SAA die Armeeausschreibung gegen den Smith & Wesson Schofield und wurde zur offiziellen Ordonnanzwaffe der US-Kavallerie.</p>
<p>Von 1873 bis 1892 diente der SAA als Standard-Seitenwaffe der US-Armee. In dieser Zeit wurde er zur Legende — getragen von Wyatt Earp, Bat Masterson, Pat Garrett und zahllosen Cowboys, Outlaws und Gesetzeshütern. Kein anderer Revolver ist so eng mit der amerikanischen Frontier-Geschichte verbunden.</p>
<p>Colt produzierte drei Generationen: Die 1st Generation (1873-1941) umfasst ca. 357000 Exemplare und ist das Sammlerziel schlechthin. Die 2nd Generation (1956-1974) wurde nach grosser Nachfrage wieder aufgelegt. Die 3rd Generation (1976 bis heute) wird weiterhin in Hartford, Connecticut gefertigt und nutzt moderne CNC-Fertigung bei traditionellem Design.</p>

<h2>Technik & Konstruktion</h2>
<p>Der SAA ist ein Single-Action-Revolver — der Hahn muss vor jedem Schuss manuell gespannt werden. Dieses System ist in seiner Einfachheit kaum zu übertreffen: Der Abzugsmechanismus besteht aus nur wenigen Teilen und ist extrem zuverlässig.</p>
<p>Das Laden und Entladen erfolgt einzeln über die seitliche Ladeklappe — ein Ausschwenken der Trommel wie bei modernen Revolvern ist nicht möglich. Der Schütze öffnet die Ladeklappe, dreht die Trommel von Hand und lädt jede Kammer einzeln. Leere Hülsen werden mit dem unter dem Lauf montierten Auszieherstab einzeln ausgestossen.</p>
<p>Die Trommel hat keine Sicherheitsraste zwischen den Kammern. Aus Sicherheitsgründen wurde traditionell nur mit fünf Patronen geladen, wobei die Kammer unter dem Hahn leer blieb. Moderne Repliken haben teilweise einen Transfer-Bar-Mechanismus, der das Tragen mit sechs geladenen Kammern erlaubt.</p>
<p>Der SA-Abzug des Colt SAA ist legendär — ein kurzer, knackiger Abzug mit typischem "four clicks" beim Spannen des Hahns: Sicherheitsraste, Halbraste, Vollraste und der finale Klick beim Drehen der Trommel.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>Cavalry Model:</strong> 7,5" Lauf in .45 Colt, die Original-Armeeversion.</li>
<li><strong>Artillery Model:</strong> 5,5" Lauf, entstand durch Rückkäufe und Umbauten für Artilleristen.</li>
<li><strong>Gunfighter / Civilian:</strong> 4,75" Lauf, die beliebteste zivile Lauflänge.</li>
<li><strong>Sheriff's Model:</strong> 3" Lauf, ohne Auszieherstange, für verdecktes Tragen.</li>
<li><strong>Buntline Special:</strong> 12" Lauf, benannt nach dem Schriftsteller Ned Buntline.</li>
<li><strong>Frontier Six-Shooter:</strong> In .44-40 WCF, passend zur Winchester 1873 Repetierbüchse.</li>
<li><strong>Bisley Model:</strong> Mit verändertem Griff und breiterem Abzug für Wettkampfschiessen.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Der SAA wurde in einer enormen Vielfalt an Kalibern gefertigt — über 30 verschiedene über die Produktionsgeschichte:</p>
<ul>
<li><strong>.45 Colt (Long Colt):</strong> Das Originalkaliber. Geschossgewicht 16,2 g (250 Grain), Mündungsgeschwindigkeit ca. 260 m/s, Mündungsenergie ca. 550 Joule.</li>
<li><strong>.44-40 WCF:</strong> Das zweitbeliebteste Kaliber, kompatibel mit der Winchester 1873.</li>
<li><strong>.357 Magnum:</strong> Modernes Kaliber in aktuellen Produktionen, bietet deutlich höhere Leistung als die historischen Kaliber.</li>
<li><strong>.44 Special:</strong> Beliebtes Kaliber für Cowboy Action Shooting mit moderatem Rückstoss.</li>
</ul>
<p>Die Präzision des SAA ist für einen Revolver mit Kerbenvisierung bemerkenswert gut — auf 25 Meter sind handbreite Gruppen mit guter Munition möglich. Der lange 7,5"-Lauf der Cavalry-Version bietet die beste Genauigkeit.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Der Colt SAA hat in der Schweiz eine treue Fangemeinde, besonders unter Western-Enthusiasten und Cowboy Action Shootern:</p>
<ul>
<li><strong>Colt SAA 3rd Generation neu:</strong> CHF 2200 bis 3500</li>
<li><strong>Colt SAA 3rd Generation gebraucht:</strong> CHF 1500 bis 2500</li>
<li><strong>Colt SAA 2nd Generation gebraucht:</strong> CHF 2000 bis 5000</li>
<li><strong>Colt SAA 1st Generation gebraucht:</strong> CHF 3000 bis 50000+</li>
<li><strong>Uberti/Pietta Repliken (Italien) neu:</strong> CHF 500 bis 900</li>
<li><strong>USFA Single Action neu/gebraucht:</strong> CHF 1200 bis 2500</li>
</ul>
<p>Die Preise für 1st Generation SAA steigen seit Jahrzehnten kontinuierlich. Exemplare mit dokumentierter Geschichte oder in seltenen Kalibern erzielen Spitzenpreise. Italienische Repliken von Uberti und Pietta bieten eine erschwingliche Alternative für Sportschützen.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Der SAA ist mechanisch einfach und entsprechend pflegeleicht:</p>
<ul>
<li><strong>Reinigung:</strong> Trommel und Lauf nach jedem Schiessen reinigen. Bei Schwarzpulverladungen (Cowboy Action) ist sofortige Reinigung zwingend, da Schwarzpulverrückstände korrosiv sind.</li>
<li><strong>Handfedern:</strong> Die flache Hauptfeder sollte auf Risse kontrolliert werden — ein Bruch ist die häufigste Störung beim SAA.</li>
<li><strong>Auszieherstab:</strong> Regelmässig auf festen Sitz prüfen — ein lockerer Ejector kann die Trommelrotation blockieren.</li>
<li><strong>Holzgriffe:</strong> Originale Hartgummi- oder Holzgriffe mit Leinöl pflegen. Aftermarket-Griffe von Eagle, Ajax oder Altamont sind in vielen Ausführungen erhältlich.</li>
</ul>
<p>Für Cowboy Action Shooting sind Lederholster und Patronengürtel von Firmen wie El Paso Saddlery unverzichtbares Zubehör.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Der Colt SAA ist ein Stück lebendige Geschichte — die Waffe, die den Wilden Westen definierte. Für Sammler sind 1st Generation Exemplare die Krönung, während 3rd Generation Colts eine hervorragende Kombination aus Authentizität und Gebrauchstauglichkeit bieten.</p>
<p>Wer den SAA primär zum Schiessen oder für Cowboy Action Shooting nutzen möchte, ist mit einer italienischen Replik von Uberti bestens bedient — diese sind erschwinglich, gut verarbeitet und in allen relevanten Kalibern erhältlich. Ein originaler Colt sollte eher als Sammlerstück behandelt werden.</p>
<p>Der SAA ist kein praktischer Revolver im modernen Sinne — er ist ein Erlebnis. Das bewusste Spannen des Hahns, das einzelne Laden und die perfekte Ergonomie machen jeden Schuss zu einem besonderen Moment.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Der Smith & Wesson 629 ist die Edelstahl-Version des legendären Model 29, das durch Clint Eastwood als "Dirty Harry" (1971) weltberühmt wurde. Der Film machte den .44 Magnum Revolver zum Kultobjekt — "the most powerful handgun in the world" wurde zum geflügelten Wort, auch wenn dies bereits 1971 nicht mehr ganz stimmte.</p>
<p>Das Model 29 wurde 1955 gemeinsam mit der .44 Remington Magnum Patrone eingeführt, die von Elmer Keith und Remington entwickelt wurde. Der massive N-Rahmen von Smith & Wesson war der einzige Serienrahmen, der die enormen Drücke dieser Patrone verkraftete.</p>
<p>1979 führte S&W den 629 in Edelstahl ein — eine logische Weiterentwicklung, da Edelstahl korrosionsbeständiger und robuster ist als die brünierte Oberfläche des Model 29. Der 629 wurde schnell zum Standard-Revolver für .44 Magnum und ist bis heute das meistverkaufte Modell in diesem Kaliber.</p>

<h2>Technik & Konstruktion</h2>
<p>Der 629 basiert auf dem massiven N-Rahmen, dem grössten Standard-Revolverrahmen von Smith & Wesson (nur der X-Rahmen des Model 500 ist grösser). Der N-Rahmen wurde in den 1900er-Jahren für grosse Kaliber entwickelt und bietet die nötige Materialmasse, um den Gasdruck von über 2700 bar der .44 Magnum sicher aufzunehmen.</p>
<p>Der Edelstahl 416 bietet eine hervorragende Korrosionsbeständigkeit und Festigkeit. Der Rahmen ist aus geschmiedetem Stahl gefräst, die Trommel aus einem massiven Stahlzylinder gebohrt. Das Gewicht von über 1200 g (6"-Lauf) hilft, den erheblichen Rückstoss der .44 Magnum zu absorbieren.</p>
<p>Der DA-Abzug arbeitet mit dem bewährten S&W-Blattfedermechanismus und bietet einen gleichmässigen, wenn auch aufgrund der starken Hauptfeder etwas schwereren Abzug als der 686. Im SA-Modus bricht der Abzug sauber und deutlich. Der Full-Lug-Lauf (beim Classic) verlagert Gewicht nach vorne und reduziert den Mündungshochdruck.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>629 Classic:</strong> Standardmodell mit Full-Lug-Lauf. Erhältlich in 4", 5", 6" und 6,5" Lauflängen.</li>
<li><strong>629 Stealth Hunter:</strong> Performance Center Modell in matt-schwarzer PVD-Beschichtung mit 7,5"-Lauf. Konzipiert für die Jagd.</li>
<li><strong>629 Competitor:</strong> Performance Center mit 6" gewichtetem Lauf und hauseigenem Tuning.</li>
<li><strong>629 V-Comp:</strong> Mit integriertem Kompensator für deutlich reduzierten Rückstoss.</li>
<li><strong>629 Deluxe:</strong> Aufgewertetes Modell mit Textured Wood-Griff und goldfarbenem Abzug.</li>
<li><strong>Model 29 (brüniert):</strong> Das originale brünierte Modell, periodisch als Sonderedition wieder aufgelegt.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Der 629 verschiesst zwei Kaliber:</p>
<ul>
<li><strong>.44 Remington Magnum:</strong> Geschossgewicht 15,6 bis 19,4 g (240 bis 300 Grain), Mündungsgeschwindigkeit 360 bis 440 m/s aus dem 6"-Lauf, Mündungsenergie 1200 bis 1570 Joule. Eine der leistungsstärksten Revolverpatronen und für die Jagd auf Grosswild geeignet.</li>
<li><strong>.44 Special:</strong> Geschossgewicht 15,6 g (240 Grain), Mündungsgeschwindigkeit ca. 230 m/s, Mündungsenergie ca. 410 Joule. Ideal für Training und Freizeit — deutlich weniger Rückstoss als die Magnum-Ladung.</li>
</ul>
<p>Der Rückstoss der .44 Magnum ist erheblich und erfordert eine korrekte Grifftechnik. Der 8,375"-Lauf bietet maximale Mündungsgeschwindigkeit und die längste Visierlinie, ist aber unhandlich. Der 6"-Lauf ist der beste Kompromiss für die meisten Anwendungen.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Der S&W 629 ist in der Schweiz bei Jägern und Grosskaliberschützen beliebt:</p>
<ul>
<li><strong>629 Classic (4" oder 6") neu:</strong> CHF 1300 bis 1600</li>
<li><strong>629 Stealth Hunter neu:</strong> CHF 1800 bis 2200</li>
<li><strong>629 Competitor (Performance Center) neu:</strong> CHF 1900 bis 2400</li>
<li><strong>629 V-Comp neu:</strong> CHF 1700 bis 2100</li>
</ul>
<p>Gebrauchtpreise:</p>
<ul>
<li><strong>629 Classic gebraucht:</strong> CHF 850 bis 1200</li>
<li><strong>Model 29 (brüniert) gebraucht:</strong> CHF 1200 bis 3000 (Sammlerzuschlag)</li>
</ul>
<p>Originale Model 29 aus den 1950er- und 1960er-Jahren sind gesuchte Sammlerstücke und erzielen deutlich höhere Preise als der Edelstahl-629.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Der 629 ist dank Edelstahl robust und pflegeleicht, erfordert aber einige spezifische Beachtungspunkte:</p>
<ul>
<li><strong>Verschluss:</strong> Bei intensivem .44-Magnum-Schiessen kann sich der Ausstosser-Stab lockern. Regelmässig auf festen Sitz prüfen.</li>
<li><strong>Trommelspiel:</strong> Das Endshake (axiales Spiel der Trommel) sollte kontrolliert werden, besonders nach hoher Schusszahl mit Vollladungen.</li>
<li><strong>Griffschalen:</strong> Gummigriffe von Hogue oder Pachmayr sind bei .44 Magnum fast unverzichtbar — sie reduzieren die Übertragung des Rückstosses auf die Hand erheblich.</li>
<li><strong>Lauf:</strong> .44 Magnum erzeugt mehr Verschleiss als kleinere Kaliber. Regelmässige Laufkontrolle empfohlen.</li>
</ul>
<p>Beliebtes Zubehör umfasst Hogue Monogrip-Griffschalen, Speedloader von HKS oder Safariland sowie Jagdholster für den Feldeinsatz.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Der S&W 629 ist der Inbegriff des Grosskaliberrevolvers. Mit .44 Magnum geladen ist er eine ernstzunehmende Jagdwaffe und bietet ein unvergessliches Schiesserlebnis. Mit .44 Special wird er zum angenehmen Trainingsrevolver.</p>
<p>Für Einsteiger in die .44-Magnum-Welt empfiehlt sich der 629 Classic mit 6"-Lauf — er bietet die beste Balance zwischen Handlichkeit und Schiesskomfort. Jäger greifen zum Stealth Hunter mit langem Lauf für maximale Reichweite und Präzision.</p>
<p>Der 629 ist nichts für empfindliche Hände — aber wer den Rückstoss beherrscht, erlebt einen Revolver von beeindruckender Leistung und Präzision.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Der Ruger GP100 wurde 1985 als Nachfolger des Ruger Security-Six eingeführt. Sturm, Ruger & Co. entwickelte den GP100 mit einer klaren Philosophie: Der Revolver sollte stärker gebaut sein als für das Kaliber .357 Magnum eigentlich nötig — ein Sicherheitspuffer, der unbegrenzte Lebensdauer garantiert.</p>
<p>Der GP100 wurde von Anfang an als Arbeitsrevolver konzipiert — für Polizeibehörden, die täglich mit Magnum-Ladungen trainierten, und für Sportschützen mit hohem Patronenverbrauch. Die Konstruktion verzichtet auf filigrane Eleganz zugunsten purer Robustheit, was dem GP100 den Ruf einer "unzerstörbaren" Waffe einbrachte.</p>
<p>Im Laufe der Jahre erweiterte Ruger das Programm um verschiedene Varianten, darunter den Match Champion für Wettkampfschützen und eine Version im seltenen Kaliber .327 Federal Magnum mit 7-Schuss-Trommel. Der GP100 ist heute neben dem S&W 686 einer der beiden dominanten .357-Magnum-Revolver auf dem Markt.</p>

<h2>Technik & Konstruktion</h2>
<p>Der GP100 verwendet ein dreifach verriegeltes Trommelsystem — die Trommel wird vorne am Trommelbolzen, hinten am Rahmen und seitlich am Auslöser arretiert. Diese dreifache Verriegelung ist stabiler als das Zwei-Punkt-System der meisten S&W-Revolver.</p>
<p>Der Rahmen ist aus einem einzigen Stück Investment-Cast-Stahl gefertigt — nicht wie bei S&W aus zwei verschraubten Hälften (Rahmen und Seitenplatte). Diese monolithische Konstruktion eliminiert eine potenzielle Schwachstelle und macht den GP100 strukturell überlegen.</p>
<p>Das Griffsystem ist modular aufgebaut: Ein Stahlkern-Adapter ist fest mit dem Rahmen verbunden, auf den verschiedene Griffschalen aus Holz, Gummi oder Kunststoff aufgesteckt werden. Dieses System ermöglicht eine einfache Anpassung an die Handgrösse des Schützen.</p>
<p>Der DA-Abzug verwendet eine Schraubenfeder statt der Blattfeder bei S&W. Der Abzug ist ab Werk etwas schwerer als bei S&W, wird aber nach einigen hundert Schuss merklich geschmeidiger. Ein Federtausch auf leichtere Wolff-Federn verbessert den Abzug deutlich.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>GP100 Standard:</strong> Edelstahl oder brüniert, erhältlich mit 2,5", 4,2" und 6" Lauf. Das robuste Basismodell.</li>
<li><strong>GP100 Match Champion:</strong> 4,2" Lauf mit Halbunterlug, verbesserte einstellbare Visierung, Hogue-Griffschalen. Der Wettkampf-Favorit.</li>
<li><strong>GP100 in .327 Federal Magnum:</strong> 7-Schuss-Trommel im seltenen .327 Fed. Mag., das auch .32 H&R Magnum und .32 S&W Long verschiesst.</li>
<li><strong>GP100 10mm:</strong> Ungewöhnliche Variante für die 10mm-Auto-Patrone, geladen mit Halbmond-Clips.</li>
<li><strong>GP100 in .44 Special:</strong> 5-Schuss-Version im Kaliber .44 Special für Liebhaber grosser Kaliber mit moderatem Rückstoss.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Der GP100 ist primär für .357 Magnum und .38 Special ausgelegt:</p>
<ul>
<li><strong>.357 Magnum:</strong> Geschossgewicht 8,1 bis 10,2 g (125 bis 158 Grain), Mündungsgeschwindigkeit 370 bis 430 m/s aus dem 4,2"-Lauf, Mündungsenergie 700 bis 850 Joule.</li>
<li><strong>.38 Special:</strong> Geschossgewicht 8,1 bis 10,2 g, Mündungsgeschwindigkeit 240 bis 300 m/s, Mündungsenergie 250 bis 400 Joule. Ideal für Training.</li>
<li><strong>.327 Federal Magnum:</strong> Geschossgewicht 5,5 bis 6,5 g (85 bis 100 Grain), Mündungsgeschwindigkeit 400 bis 470 m/s, Mündungsenergie ca. 550 bis 700 Joule. Überraschend leistungsstark bei geringerem Rückstoss als .357 Magnum.</li>
</ul>
<p>Die Präzision des GP100 ist hervorragend — auf 25 Meter sind Streukreise unter 40mm mit Match-Munition möglich. Der schwere Rahmen und das hohe Gewicht absorbieren den Rückstoss besser als leichtere Konkurrenten.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Der Ruger GP100 bietet auf dem Schweizer Markt ein exzellentes Preis-Leistungs-Verhältnis — deutlich günstiger als vergleichbare S&W-Modelle:</p>
<ul>
<li><strong>GP100 Standard (4,2") neu:</strong> CHF 850 bis 1050</li>
<li><strong>GP100 Standard (6") neu:</strong> CHF 900 bis 1100</li>
<li><strong>GP100 Match Champion neu:</strong> CHF 1050 bis 1300</li>
<li><strong>GP100 .327 Fed. Mag. neu:</strong> CHF 900 bis 1100</li>
</ul>
<p>Gebrauchtpreise:</p>
<ul>
<li><strong>GP100 Standard gebraucht:</strong> CHF 550 bis 800</li>
<li><strong>GP100 Match Champion gebraucht:</strong> CHF 700 bis 1000</li>
</ul>
<p>Der GP100 ist damit ca. CHF 200 bis 300 günstiger als der vergleichbare S&W 686 und bietet dafür eine noch robustere Konstruktion.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Der GP100 ist einer der wartungsärmsten Revolver auf dem Markt:</p>
<ul>
<li><strong>Reinigung:</strong> Standard-Revolverpflege nach jedem Schiessen — Lauf und Trommelkammern reinigen.</li>
<li><strong>Abzugsfeder:</strong> Der häufigste Upgrade ist ein Wolff-Federset (ca. CHF 25), das den DA-Abzug von ca. 5,5 kg auf ca. 4 kg reduziert.</li>
<li><strong>Trommelbolzen:</strong> Gelegentlich auf festen Sitz prüfen. Kann mit einem Tropfen Schraubensicherung fixiert werden.</li>
<li><strong>Griffschalen:</strong> Dank des modularen Systems leicht austauschbar. Hogue, Badger und Altamont bieten zahlreiche Optionen.</li>
</ul>
<p>Der GP100 verträgt jede .357-Magnum-Ladung — einschliesslich der heissesten Handladungen — ohne Verschleiss. Er wurde für über 10000 Vollladungs-Patronen ohne jegliche Abnutzung getestet.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Der Ruger GP100 ist der robusteste .357 Magnum Revolver auf dem Markt — eine Waffe, die Generationen überdauert. Er bietet nicht die Eleganz eines S&W 686 oder die Legende eines Colt Python, dafür aber eine praktisch unzerstörbare Konstruktion zum günstigeren Preis.</p>
<p>Für Schützen, die einen zuverlässigen Arbeitsrevolver suchen, der höchste Belastungen aushält, ist der GP100 die erste Wahl. Der Match Champion bietet zusätzlich wettkampftaugliche Features ab Werk.</p>
<p>Der GP100 ist die rationale Entscheidung unter den .357-Magnum-Revolvern — wer Zuverlässigkeit und Langlebigkeit über Prestige stellt, wird mit diesem Revolver auf Jahre hinaus zufrieden sein.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Der Ruger SP101 wurde 1989 als kompakter, aber extrem robuster Revolver eingeführt. Er füllte eine Lücke im Ruger-Programm zwischen dem grossen GP100 und dem damaligen Mangel an kleinen Ruger-Revolvern. Während Konkurrenten wie Smith & Wesson ihre J-Frame-Revolver aus Aluminium oder sogar Scandium fertigten, setzte Ruger konsequent auf Vollstahl.</p>
<p>Diese Entscheidung machte den SP101 schwerer als die Konkurrenz, aber auch deutlich langlebiger. Er ist einer der wenigen Kompaktrevolver, der .357 Magnum dauerhaft verkraftet — die meisten Konkurrenten in dieser Grösse empfehlen dauerhaften .357-Gebrauch nicht oder limitieren ihn ausdrücklich.</p>
<p>Im Laufe der Jahre wurde der SP101 in verschiedenen Kalibern und Varianten angeboten, darunter .327 Federal Magnum mit 6-Schuss-Trommel und .22 LR als Trainingsrevolver. Die grundlegende Konstruktion blieb seit der Einführung weitgehend unverändert — ein Zeichen dafür, dass Ruger das Design von Anfang an richtig umgesetzt hat.</p>

<h2>Technik & Konstruktion</h2>
<p>Der SP101 teilt die konstruktiven Grundprinzipien des grossen GP100: Der Rahmen ist aus einem einzigen Stück Investment-Cast-Stahl gefertigt, die Trommel wird dreifach verriegelt (vorne, hinten und seitlich), und das Griffsystem ist modular aufgebaut.</p>
<p>Trotz seiner kompakten Grösse (Gesamtlänge nur 200mm mit 2,25"-Lauf) ist der SP101 massiv gebaut. Der Stahlrahmen wiegt deutlich mehr als vergleichbare Aluminium- oder Scandium-Revolver, was den Rückstoss der .357 Magnum erheblich besser absorbiert. Wo ein S&W 340PD (Scandium, 326g) bei Magnum-Ladungen schmerzhaft in die Hand schlägt, ist der SP101 (737g) noch komfortabel zu schiessen.</p>
<p>Der DA-Abzug verwendet die gleiche Schraubenfeder-Mechanik wie der GP100. Ab Werk ist der Abzug etwas schwer (ca. 5 bis 6 kg im DA-Modus), wird aber nach einigen hundert Schuss spürbar leichter. Ein Wolff-Federsatz verbessert den Abzug weiter, ohne die Zündsicherheit zu gefährden.</p>
<p>Der Hammer kann ab Werk bestellt oder nachträglich für verdecktes Tragen eingekürzt werden (Spurless-Variante), was ein Hängenbleiben in der Kleidung verhindert, aber den SA-Modus eliminiert.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>SP101 Standard:</strong> Edelstahl, erhältlich mit 2,25" und 3" Lauf. 5 Schuss in .357 Magnum.</li>
<li><strong>SP101 Spurless:</strong> Ohne Hahnsporn, rein DAO (Double-Action-Only). Ideal für verdecktes Tragen.</li>
<li><strong>SP101 4,2":</strong> Längere Laufvariante mit einstellbarer Visierung. Besser geeignet für Sport und Freizeit.</li>
<li><strong>SP101 in .22 LR:</strong> 6-Schuss-Trommel, 4,2" Lauf. Hervorragender Trainingsrevolver.</li>
<li><strong>SP101 in .327 Federal Magnum:</strong> 6-Schuss-Trommel, verschiesst auch .32 H&R Magnum und .32 S&W Long.</li>
<li><strong>Wiley Clapp SP101:</strong> Spezialedition mit Novak-Visierung, goldener Perlkorn-Visierung und Spezialgriff.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Der SP101 ist in mehreren Kalibern erhältlich:</p>
<ul>
<li><strong>.357 Magnum:</strong> Geschossgewicht 8,1 bis 10,2 g, Mündungsgeschwindigkeit 320 bis 370 m/s aus dem 2,25"-Lauf (ca. 50 m/s weniger als aus 4"-Läufen), Mündungsenergie 550 bis 700 Joule. Der kurze Lauf reduziert die Leistung gegenüber dem GP100 merklich.</li>
<li><strong>.38 Special:</strong> Ideal für regelmässiges Training. Mündungsenergie ca. 250 bis 350 Joule aus dem kurzen Lauf. Angenehm zu schiessen.</li>
<li><strong>.327 Federal Magnum:</strong> 6 Schuss statt 5, mit ca. 450 m/s Mündungsgeschwindigkeit und 500 bis 650 Joule. Ein interessanter Kompromiss zwischen Kapazität und Leistung.</li>
<li><strong>.22 LR:</strong> 6 Schuss, ideal für günstiges Training und Einsteiger.</li>
</ul>
<p>Der Mündungsblitz der .357 Magnum aus dem kurzen 2,25"-Lauf ist erheblich — in Innenschiesständen empfiehlt sich ein guter Gehörschutz und die Verwendung von .38 Special.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Der SP101 ist in der Schweiz als kompakter Allrounder-Revolver beliebt:</p>
<ul>
<li><strong>SP101 Standard (2,25") neu:</strong> CHF 700 bis 900</li>
<li><strong>SP101 Standard (3") neu:</strong> CHF 720 bis 920</li>
<li><strong>SP101 4,2" neu:</strong> CHF 750 bis 950</li>
<li><strong>SP101 .22 LR neu:</strong> CHF 680 bis 850</li>
<li><strong>Wiley Clapp SP101 neu:</strong> CHF 850 bis 1050</li>
</ul>
<p>Gebrauchtpreise:</p>
<ul>
<li><strong>SP101 Standard gebraucht:</strong> CHF 450 bis 650</li>
<li><strong>SP101 .22 LR gebraucht:</strong> CHF 400 bis 600</li>
</ul>
<p>Der SP101 ist damit eine der günstigsten Optionen für einen hochwertigen Kompaktrevolver auf dem Schweizer Markt.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Der SP101 ist ähnlich wartungsarm wie der GP100:</p>
<ul>
<li><strong>Reinigung:</strong> Lauf und Trommel nach jedem Schiessen reinigen. Bei .357-Magnum-Gebrauch mit kurzem Lauf besonders auf Bleiablagerungen achten.</li>
<li><strong>Abzugsverbesserung:</strong> Ein Wolff-Federsatz (ca. CHF 25) ist das lohnendste Upgrade. Alternativ kann ein Büchsenmacher die Kontaktflächen polieren.</li>
<li><strong>Griffschalen:</strong> Die Standardgriffe sind funktional, aber viele Schützen bevorzugen die grösseren Hogue-Gummigriffe, die bessere Kontrolle bei .357 Magnum bieten.</li>
<li><strong>Visierung:</strong> Das Standardkorn kann durch ein Fiber-Optic-Korn ersetzt werden für schnellere Zielerfassung.</li>
</ul>
<p>Dank seiner robusten Edelstahl-Konstruktion verträgt der SP101 auch vernachlässigte Pflege besser als die meisten Konkurrenten.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Der Ruger SP101 ist der robusteste Kompaktrevolver auf dem Markt. Sein Vollstahlrahmen macht ihn schwerer als Aluminium-Konkurrenten, aber auch angenehmer zu schiessen und praktisch unverwüstlich.</p>
<p>Für Schützen, die einen kompakten .357-Magnum-Revolver suchen, ist der SP101 mit 3"-Lauf die beste Wahl — er bietet den besten Kompromiss zwischen Tragbarkeit und Schiesskomfort. Die .22 LR-Version ist ein ausgezeichneter Trainingsrevolver für Einsteiger.</p>
<p>Der SP101 ist keine Schönheit — er ist ein Werkzeug, das seinen Job perfekt erledigt und dabei ein Leben lang hält.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Das Smith & Wesson Model 60 wurde 1965 als weltweit erster komplett aus Edelstahl gefertigter Revolver vorgestellt. Zuvor waren alle Revolver entweder brüniert oder vernickelt — Oberflächen, die regelmässige Pflege erforderten, um Korrosion zu verhindern. Das Model 60 revolutionierte den Markt mit einer Waffe, die praktisch wartungsfrei war.</p>
<p>Basierend auf dem legendären J-Rahmen, der seit 1950 die Kategorie der kompakten Taschenrevolver definiert, war das Model 60 ursprünglich nur in .38 Special erhältlich. 1996 folgte ein bedeutendes Upgrade: Smith & Wesson bot das Model 60 erstmals auch in .357 Magnum an — eine bemerkenswerte Leistung für einen Revolver dieser Kompaktheit.</p>
<p>Die Einführung des 3"-Laufs war eine weitere wichtige Entwicklung. Der zusätzliche Zoll Lauflänge bot einen merklich besseren Kompromiss zwischen Tragbarkeit und Schiesskomfort als der ursprüngliche 2"-Lauf, besonders mit .357-Magnum-Ladungen. Das Model 60 ist bis heute in Produktion und bleibt einer der beliebtesten Kompaktrevolver der Welt.</p>

<h2>Technik & Konstruktion</h2>
<p>Das Model 60 basiert auf dem J-Rahmen, dem kleinsten Revolverrahmen von Smith & Wesson. Der J-Rahmen wurde 1950 eingeführt und definiert seither die Kategorie der Fünfschuss-Kompaktrevolver. Trotz seiner geringen Grösse ist der Rahmen aus Edelstahl 416 ausreichend stark für .357-Magnum-Drücke.</p>
<p>Der DA/SA-Abzugsmechanismus verwendet die klassische S&W-Blattfeder. Der DA-Abzug des J-Rahmens ist naturgemäss etwas schwerer als bei grösseren S&W-Rahmen, da die kürzeren Hebelverhältnisse mehr Fingerkraft erfordern. Im SA-Modus bricht der Abzug jedoch sauber und deutlich.</p>
<p>Die Trommel fasst 5 Schuss — ein Schuss weniger als bei den grösseren L- und N-Rahmen-Revolvern. Die Trommel schwingt nach links aus und wird durch den typischen S&W-Trommelriegel entriegelt. Der Ausstosser wirft alle fünf Hülsen gleichzeitig aus.</p>
<p>Das Gewicht von 680 g (3"-Lauf) liegt zwischen den ultraleichten Scandium-Modellen (ca. 330 g) und dem Ruger SP101 (737 g). Dieser Kompromiss macht das Model 60 zu einem der angenehmsten kompakten .357-Revolver zum Schiessen.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>Model 60 Standard:</strong> 2" oder 3" Lauf, DA/SA mit freiliegendem Hammer. Die klassische Version.</li>
<li><strong>Model 60 Pro Series:</strong> Verbesserte einstellbare Visierung, Wolff-Feder ab Werk und verbesserter Abzug.</li>
<li><strong>Model 60 3":</strong> Die bevorzugte Variante für .357 Magnum, bietet den besten Kompromiss zwischen Tragbarkeit und Schiesskomfort.</li>
<li><strong>Model 642:</strong> Verwandtes Modell mit intern gespanntem Hammer (DAO) und Aluminium-Rahmen. Leichter, aber nur in .38 Special.</li>
<li><strong>Model 640:</strong> J-Rahmen in Edelstahl ohne freiliegenden Hammer (DAO). Die "hammerlose" Alternative zum Model 60.</li>
<li><strong>Model 340PD:</strong> Ultra-leichte Version aus Scandium und Titanium, nur 326 g. In .357 Magnum, aber mit erheblichem Rückstoss.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Das Model 60 verschiesst zwei Kaliber:</p>
<ul>
<li><strong>.357 Magnum:</strong> Geschossgewicht 8,1 bis 10,2 g, Mündungsgeschwindigkeit 300 bis 350 m/s aus dem 3"-Lauf (deutlich weniger als aus 4" oder 6" Läufen), Mündungsenergie 450 bis 600 Joule. Der kurze Lauf reduziert die Leistung, erzeugt aber einen erheblichen Mündungsblitz.</li>
<li><strong>.38 Special:</strong> Geschossgewicht 8,1 bis 10,2 g, Mündungsgeschwindigkeit 220 bis 270 m/s, Mündungsenergie 200 bis 320 Joule. Für Training und regelmässiges Schiessen die bessere Wahl.</li>
</ul>
<p>Die Präzision des Model 60 ist für einen Kompaktrevolver gut — auf 15 Meter sind handbreite Gruppen im SA-Modus möglich. Der DA-Modus erfordert viel Übung für präzises Schiessen. Der 3"-Lauf bietet gegenüber dem 2"-Lauf ca. 20 bis 30 m/s mehr Mündungsgeschwindigkeit und eine längere Visierlinie.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Das Model 60 ist in der Schweiz als kompakter Qualitätsrevolver beliebt:</p>
<ul>
<li><strong>Model 60 Standard (2" oder 3") neu:</strong> CHF 900 bis 1100</li>
<li><strong>Model 60 Pro Series neu:</strong> CHF 1100 bis 1350</li>
<li><strong>Model 642 (Aluminium, DAO) neu:</strong> CHF 650 bis 850</li>
<li><strong>Model 640 (Edelstahl, DAO) neu:</strong> CHF 900 bis 1100</li>
</ul>
<p>Gebrauchtpreise:</p>
<ul>
<li><strong>Model 60 gebraucht:</strong> CHF 550 bis 800</li>
<li><strong>Model 642 gebraucht:</strong> CHF 400 bis 600</li>
<li><strong>Ältere Model 60 (vor 1996, nur .38 Special):</strong> CHF 450 bis 700</li>
</ul>
<p>Das Model 60 hält seinen Wert gut, da die Nachfrage nach kompakten S&W-Revolvern konstant hoch ist.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Das Model 60 ist dank seiner Edelstahl-Konstruktion aussergewöhnlich pflegeleicht:</p>
<ul>
<li><strong>Reinigung:</strong> Lauf und Trommel nach jedem Schiessen reinigen. Edelstahl verzeiht gelegentliches Vernachlässigen besser als brünierte Modelle.</li>
<li><strong>Abzug:</strong> Ein leichter Ölfilm auf den Abzugskontaktflächen hält den DA-Abzug geschmeidig. Ein professioneller Trigger-Job kann den Abzug erheblich verbessern.</li>
<li><strong>Griffschalen:</strong> Die Standardgriffe sind klein und bei .357 Magnum unbequem. Boot Grips von Hogue oder Pachmayr bieten mehr Grifffläche und bessere Kontrolle.</li>
<li><strong>Visierung:</strong> Das Standardkorn kann durch ein XS Big Dot oder Fiber-Optic-Korn für schnellere Zielerfassung ersetzt werden.</li>
</ul>
<p>Beliebtes Zubehör umfasst HKS Speedloader, DeSantis oder Galco Holster sowie Crimson Trace Lasergriffe für verbesserte Zielerfassung bei schlechten Lichtverhältnissen.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Das S&W Model 60 ist der Klassiker unter den Kompaktrevolvern — der erste Edelstahlrevolver der Welt und bis heute einer der besten. Die Kombination aus kompakter Grösse, .357-Magnum-Fähigkeit und wartungsfreiem Edelstahl macht ihn zum idealen Allrounder.</p>
<p>Für den besten Kompromiss empfiehlt sich das Model 60 mit 3"-Lauf — der zusätzliche Zoll macht einen spürbaren Unterschied beim Schiesskomfort mit Magnum-Ladungen. Die Pro Series bietet für den Aufpreis einen merklich besseren Abzug und eine einstellbare Visierung.</p>
<p>Wer einen kompakten, langlebigen und zuverlässigen Revolver sucht, der gleichermassen für Sport und Freizeit geeignet ist, findet im Model 60 einen treuen Begleiter für Jahrzehnte.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Die Geschichte von Korth beginnt 1954, als der Ingenieur Willi Korth in Ratzeburg (Schleswig-Holstein) mit der Entwicklung eines Revolvers begann, der alle bisherigen Serienmodelle in Qualität und Präzision übertreffen sollte. 1964 wurde der erste Korth-Revolver der Öffentlichkeit vorgestellt — ein Meilenstein in der Revolvergeschichte. Willi Korth war überzeugt, dass ein Revolver nur dann perfekt sein kann, wenn er von einem einzigen Büchsenmacher von Anfang bis Ende gefertigt wird. Dieses Prinzip gilt bis heute.</p>
<p>Nach dem Tod des Gründers im Jahr 1997 übernahm die Familie die Leitung, bevor 2009 die Produktion nach Lollar (Hessen) verlegt wurde. Heute führt die Korth Group das Erbe fort und arbeitet seit 2015 eng mit dem US-amerikanischen Premiumhersteller Nighthawk Custom zusammen. Diese Kooperation hat Korth auch auf dem amerikanischen Markt bekannt gemacht und die Nachfrage deutlich gesteigert. Die jährliche Produktion liegt bei geschätzten 300–500 Revolvern — jeder ein Unikat in Bezug auf Finish und Ausstattung.</p>

<h2>Technik & Konstruktion</h2>
<p>Der Korth-Revolver wird aus einem massiven Block hochfestem Stahl CNC-gefräst und anschliessend vollständig von Hand eingepasst. Pro Revolver fallen über 60 Arbeitsstunden an. Das Ergebnis ist eine Passgenauigkeit und Oberflächenqualität, die kein anderer Serienhersteller erreicht.</p>
<p>Das einzigartige Merkmal des Korth ist die <strong>auswechselbare Trommel</strong>: Sie lässt sich sowohl nach vorne als auch nach hinten ausschwenken. Damit kann der Besitzer zwischen einer .357-Magnum-Trommel und einer 9×19-mm-Trommel wechseln — bei keinem anderen Revolver der Welt möglich. Der Lauf ist ebenfalls vom Besitzer selbst wechselbar, was verschiedene Lauflängen mit derselben Waffe erlaubt.</p>
<p>Der Abzug ist legendär: Im Double-Action-Modus ist er der leichtgängigste und gleichmässigste aller Serienrevolver. Der Single-Action-Abzug bricht glashart ohne jedes Kriechen. Die gesamte Mechanik ist so präzise eingepasst, dass es keinerlei Spiel gibt — die Trommelrotation, das Verriegelungsbolzensystem und der Schlossmechanismus arbeiten mit uhrmacherischer Genauigkeit.</p>
<ul>
<li><strong>Kaliber:</strong> .357 Magnum (.38 Special kompatibel), auch 9×19 mm (mit Wechseltrommel)</li>
<li><strong>System:</strong> Doppelwirkender Revolver (DA/SA)</li>
<li><strong>Trommel:</strong> 6 Schuss</li>
<li><strong>Lauflänge:</strong> 76 mm (3"), 102 mm (4"), 152 mm (6")</li>
<li><strong>Gewicht:</strong> ca. 1050 g (4" Lauf, je nach Ausstattung)</li>
</ul>

<h2>Varianten & Modelle</h2>
<p>Korth bietet verschiedene Modelllinien an, die jeweils für unterschiedliche Einsatzzwecke konzipiert sind:</p>
<ul>
<li><strong>Korth Combat:</strong> Das Standardmodell mit vollem Laufmantel, erhältlich in diversen Lauflängen und Ausführungen. Die meistverkaufte Variante.</li>
<li><strong>Korth Sport:</strong> Wettkampfversion mit verlängertem Lauf (6") und verbesserter Visierung, optimiert für Präzisionsschiesswettbewerbe.</li>
<li><strong>Korth Sky Marshal:</strong> Ultraleichte DAO-Version (Double Action Only), ursprünglich für den Einsatz durch Flugsicherheitsbegleiter entwickelt. Kein Hahn sichtbar, verdecktes Tragen möglich.</li>
<li><strong>Korth Ranger:</strong> Eine Einzelschuss-Kipplauf-Pistole — technisch kein Revolver, aber mit der gleichen Korth-Qualität gefertigt.</li>
<li><strong>Nighthawk/Korth Mongoose:</strong> In Zusammenarbeit mit Nighthawk Custom entwickeltes Modell für den US-Markt, mit DLC-Beschichtung und modernem Design.</li>
<li><strong>Korth NXS:</strong> Neuestes Modell mit eckigerem, modernem Design und optimierter Ergonomie.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Der Korth-Revolver ist primär für das Kaliber <strong>.357 Magnum</strong> konzipiert, das auch das schwächere .38 Special verschiesst. Mit der Wechseltrommel steht zusätzlich 9×19 mm Parabellum zur Verfügung — ein enormer Vorteil für Schützen, die günstigere Munition trainieren möchten.</p>
<p>Die .357 Magnum entwickelt aus einem 4"-Lauf eine Mündungsenergie von ca. 700–800 Joule, was für Selbstverteidigung und sportliches Schiessen mehr als ausreichend ist. Die .38 Special liegt mit ca. 300–350 Joule deutlich darunter und eignet sich hervorragend für rückstossarmes Training. Die 9×19 mm erreicht aus dem Revolverlauf ca. 500–550 Joule und bietet einen guten Kompromiss zwischen Leistung und Kosten.</p>
<p>Dank des hervorragenden Abzugs und der perfekten Laufqualität erreichen Korth-Revolver eine Präzision, die manche Halbautomatikpistolen übertrifft — Streukreise unter 25 mm auf 25 Meter sind die Regel.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Korth-Revolver sind in der Schweiz über spezialisierte Waffenhändler erhältlich, wobei die Verfügbarkeit aufgrund der kleinen Produktionszahlen stets begrenzt ist. Die Wartezeiten betragen häufig 6–12 Monate.</p>
<p>Aktuelle Preise auf dem Schweizer Markt (Neuwaffen):</p>
<ul>
<li><strong>Korth Combat 4":</strong> CHF 4'500 – 5'500</li>
<li><strong>Korth Sport 6":</strong> CHF 5'000 – 6'500</li>
<li><strong>Korth Sky Marshal:</strong> CHF 4'800 – 5'800</li>
<li><strong>Nighthawk/Korth Mongoose:</strong> CHF 5'500 – 7'500</li>
<li><strong>Korth NXS:</strong> CHF 5'000 – 7'000</li>
<li><strong>Wechseltrommel 9×19 mm:</strong> CHF 600 – 800</li>
</ul>
<p>Auf dem Occasionsmarkt sind Korth-Revolver sehr wertstabil. Gut erhaltene gebrauchte Modelle erzielen häufig 80–95 % des Neupreises. Ältere Ratzeburger Modelle aus den 1960er- bis 1990er-Jahren können als Sammlerstücke sogar über dem originalen Neupreis gehandelt werden. Ein Korth ist eine der wenigen Waffen, die als echte Wertanlage betrachtet werden kann.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Die Pflege eines Korth-Revolvers unterscheidet sich grundsätzlich nicht von anderen hochwertigen Revolvern, verdient aber aufgrund des Werts besondere Aufmerksamkeit:</p>
<ul>
<li><strong>Reinigung nach jedem Schiessen:</strong> Lauf und Trommelbohrungen mit Messinglaufbürste und Laufreiniger säubern. Anschliessend leicht ölen.</li>
<li><strong>Trommelstern:</strong> Verbrennungsrückstände am Trommelstern regelmässig entfernen — hier lagert sich besonders viel Schmauch ab.</li>
<li><strong>Oberfläche:</strong> Polierte Korth-Oberflächen sind empfindlich gegen Fingerabdrücke. Nach dem Anfassen mit einem Silicontuch abreiben.</li>
<li><strong>Abzugsmechanik:</strong> Nur sparsam ölen; keinesfalls WD-40 oder andere Kriechöle verwenden. Feines Waffenöl genügt.</li>
<li><strong>Service:</strong> Korth bietet einen Werksservice an, bei dem der Revolver komplett zerlegt, gereinigt und neu eingepasst wird — empfohlen alle 5'000 Schuss.</li>
</ul>
<p>Als Zubehör empfehlen sich hochwertige Holzgriffschalen (Korth bietet Nussbaum, Cocobolo und Ebenholz an), ein passender Korth-Koffer sowie eine Wechseltrommel in 9×19 mm für günstigeres Training.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Der Korth-Revolver ist nichts weniger als das Beste, was die Revolvertechnik hervorbringen kann. Wer bereit ist, CHF 4'500 oder mehr für einen Revolver auszugeben, erhält ein Stück deutscher Handwerkskunst, das in Verarbeitung, Abzugsqualität und Präzision seinesgleichen sucht.</p>
<p>Für Schweizer Schützen empfiehlt sich der <strong>Korth Combat in 4"</strong> als vielseitigstes Modell: Er eignet sich gleichermassen für den Schiessstand, für Wettkämpfe und als Sammlerstück. Die Investition in eine Wechseltrommel 9×19 mm ist nahezu obligatorisch — sie macht das Training deutlich günstiger. Wer einen Korth kauft, kauft in der Regel fürs Leben — und vererbt ihn an die nächste Generation.</p>
<p><em>Rechtsstatus Schweiz: Waffenerwerbsschein (WES) erforderlich.</em></p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Die Blaser Jagdwaffen GmbH wurde 1957 von Horst Blaser in Isny im Allgäu gegründet. Von Beginn an setzte das Unternehmen auf innovative Verschlusssysteme und modulare Konzepte. Die legendäre R93 (1993) revolutionierte mit ihrem Geradezugverschluss den Jagdwaffenmarkt und wurde zum Verkaufsschlager in ganz Europa.</p>
<p>2008 stellte Blaser die R8 als konsequente Weiterentwicklung der R93 vor. Die wesentlichen Verbesserungen betreffen die Verriegelung (neu mit 14 Radialverriegelungsfingern statt Kolbenverriegelung), das Handspannsystem und die noch einfachere Modulbauweise. Die R8 ist heute die meistverkaufte Premiumjagdbüchse Europas und wird in über 80 Länder exportiert. Blaser gehört seit 1997 zur Lüke und Ortmeier Gruppe, zusammen mit Sauer und Mauser — drei deutsche Traditionsmarken unter einem Dach.</p>

<h2>Technik & Konstruktion</h2>
<p>Das Herzstück der R8 ist der <strong>Geradezugverschluss mit Radialverriegelung</strong>: 14 Verriegelungsfinger greifen radial in den Lauf ein und gewährleisten eine extrem steife Verbindung. Anders als bei herkömmlichen Repetierbüchsen muss der Kammerstängel nicht angehoben und gesenkt werden — der Verschluss wird gerade nach hinten gezogen und wieder vorgeschoben. Das ermöglicht das schnellste Repetieren aller Jagdbüchsen.</p>
<p>Das <strong>Handspannsystem</strong> ist ein weiteres Alleinstellungsmerkmal: Die Waffe wird durch Vorschieben des Handspannschiebers am Pistolengriff gespannt. Damit entfällt ein separater Sicherungshebel — die Waffe ist entweder entspannt (absolut sicher) oder gespannt und feuerbereit. Der Direktabzug bricht mit werksseitig eingestellten 800 g sauber und wiederholbar.</p>
<p>Das modulare Laufwechselsystem ermöglicht den Kaliberwechsel in unter zwei Minuten: Vorderschaft abnehmen, Lauf mit Verschlusskopf herausziehen, neuen Lauf einsetzen — fertig. Die Treffpunktlage bleibt nach dem Wechsel konstant, da der Lauf immer exakt gleich verriegelt.</p>
<ul>
<li><strong>Kaliber:</strong> Über 30 Kaliber verfügbar (.222 Rem bis .500 Jeffery)</li>
<li><strong>System:</strong> Geradezug-Repetierer mit Radialverriegelung</li>
<li><strong>Magazin:</strong> 3–5 Schuss (abnehmbares Kastenmagazin)</li>
<li><strong>Lauflänge:</strong> 520 mm, 580 mm oder 650 mm je nach Kaliber</li>
<li><strong>Gewicht:</strong> ab 3,1 kg (ohne Optik)</li>
<li><strong>Abzug:</strong> Direktabzug mit Handspannung, ca. 800 g</li>
</ul>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>R8 Standard:</strong> Klassischer Holzschaft in Nussbaum, die traditionelle Wahl für den ästhetisch orientierten Jäger.</li>
<li><strong>R8 Professional:</strong> Robuster Kunststoffschaft mit Gummieinlage, ideal für den harten Jagdalltag bei jedem Wetter.</li>
<li><strong>R8 Professional Success:</strong> Wie Professional, aber mit Ledereinsatz im Schaft — Robustheit trifft Eleganz.</li>
<li><strong>R8 Silence:</strong> Mit integriertem Schalldämpfer im Vorderschaft — besonders beliebt in Skandinavien und zunehmend in der Schweiz.</li>
<li><strong>R8 Ultimate:</strong> Premium-Ausführung mit Handgravur, ausgesuchtem AAA-Nussbaumholz und höchster Oberflächenveredelung.</li>
<li><strong>R8 Intuition:</strong> Speziell für Jägerinnen entwickelt, mit angepasster Schaftgeometrie.</li>
<li><strong>R8 Attaché:</strong> Der Koffer-Take-Down — die gesamte Waffe passt in einen eleganten Aktenkoffer.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Die R8 ist in über 30 Kalibern erhältlich, von der kleinen .222 Remington für die Fuchsjagd bis zur gewaltigen .500 Jeffery für afrikanisches Grosswild. Die in der Schweiz populärsten Kaliber sind:</p>
<ul>
<li><strong>.308 Winchester:</strong> Universalkaliber für Reh, Gams und Rothirsch bis 200 m.</li>
<li><strong>7x64 mm:</strong> Das klassische europäische Jagdkaliber mit flacher Flugbahn bis 250 m.</li>
<li><strong>6,5 Creedmoor:</strong> Modernes Präzisionskaliber mit geringem Rückstoss und hervorragender Fernwirkung.</li>
<li><strong>9,3x62 mm:</strong> Für Schwarzwild und stärkeres Wild, auch in der Drückjagd beliebt.</li>
<li><strong>.30-06 Springfield:</strong> Der Allrounder mit riesiger Laborierungsvielfalt.</li>
</ul>
<p>Die Werkspräzision der R8 liegt typischerweise bei 1 MOA oder besser — mit passender Munition sind Sub-MOA-Gruppen keine Seltenheit.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Die Blaser R8 ist die meistverkaufte Premiumjagdbüchse in der Schweiz. Praktisch jeder Büchsenmacher und Waffenfachhändler führt sie. Die Preise (Neuwaffen, inkl. MwSt.):</p>
<ul>
<li><strong>R8 Professional:</strong> CHF 3'200 – 3'800</li>
<li><strong>R8 Standard (Holz):</strong> CHF 3'800 – 4'500</li>
<li><strong>R8 Professional Success:</strong> CHF 3'500 – 4'200</li>
<li><strong>R8 Silence:</strong> CHF 4'500 – 5'500</li>
<li><strong>R8 Ultimate:</strong> CHF 7'000 – 15'000 (je nach Gravur)</li>
<li><strong>Wechsellauf:</strong> CHF 900 – 1'500 (je nach Kaliber)</li>
<li><strong>Zielfernrohr-Sattelmontage:</strong> CHF 350 – 500</li>
</ul>
<p>Auf dem Occasionsmarkt werden gut erhaltene R8 für CHF 2'500–3'500 gehandelt. Die Wertstabilität ist ausgezeichnet. Wechselläufe sind gebraucht ab CHF 600 erhältlich.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<ul>
<li><strong>Laufreinigung:</strong> Nach jedem Jagdtag den Lauf mit Putzstock und Reinigungspatches säubern. Bei Kupferablagerungen einen Kupferlöser verwenden.</li>
<li><strong>Verschluss:</strong> Verschlusskopf regelmässig auf Verschmutzung prüfen und mit öligem Tuch abwischen.</li>
<li><strong>Handspannmechanik:</strong> Werksseitig geschmiert und wartungsarm. Alle 1'000–2'000 Schuss professionelle Inspektion empfohlen.</li>
<li><strong>Holzschaft:</strong> Mit Schaftöl oder Wachs pflegen, besonders nach Nasseinwirkung.</li>
<li><strong>Lagerung:</strong> In belüftetem Waffenschrank, Lauf leicht geölt.</li>
</ul>
<p>Empfohlenes Zubehör: Blaser Sattelmontage, Original-Blaser-Trageriemen, Schalldämpfer und Wechselläufe in weiteren Kalibern.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die Blaser R8 ist die vielseitigste Jagdbüchse der Welt. Kein anderes System bietet diese Kombination aus Schnelligkeit (Geradezug), Sicherheit (Handspannung), Modularität (Kaliberwechsel) und Präzision. Für Schweizer Jäger, die eine einzige Büchse für alle Jagdarten suchen — von der Gamsjagd im Bündnerland bis zur Drückjagd im Mittelland — ist die R8 die logische Wahl.</p>
<p>Einsteiger greifen zur <strong>R8 Professional</strong> (ab CHF 3'200), ambitionierte Jäger zur <strong>R8 Standard</strong> mit Holzschaft. Wer Wert auf Lautstärkereduktion legt, wählt die <strong>R8 Silence</strong>. Die Investition in Wechselläufe macht das System komplett und deckt praktisch jede Jagdsituation ab.</p>
<p><em>Rechtsstatus Schweiz: Waffenerwerbsschein (WES) erforderlich.</em></p>`,
    rechtsstatus: 'frei',
    typischeKaliber: ['7×64mm', '.308 Win', '6,5 Creedmoor', '9,3×62mm'],
    tags: ['Büchse', 'Blaser', 'R8', 'Jagd', 'Premium', 'Geradezug', 'Modular'],
    relatedSlugs: ['sako-85', 'tikka-t3x', 'mauser-m18', 'steyr-mannlicher'],
  },

  {
    slug: 'sako-85',
    titel: 'Sako 85',
    kategorie: 'Büchse',
    hersteller: 'Sako',
    baujahr: '2006',
    kurzbeschreibung: 'Finnische Präzision. Einer der besten Abzüge serienmässig. Sehr beliebt in der Schweiz.',
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Die Geschichte von Sako beginnt 1921 in Helsinki, als die Suojeluskuntain Ase- ja Konepaja Osakeyhtiö (kurz Sako) als Reparaturwerkstatt für Schusswaffen der finnischen Schutzkorps gegründet wurde. 1927 begann die eigenständige Waffenproduktion. Die extremen klimatischen Bedingungen Finnlands — von minus 40 bis plus 30 Grad — prägten die Philosophie: Absolute Zuverlässigkeit unter allen Bedingungen.</p>
<p>Die Sako 85, eingeführt 2006, vereint das Beste der Vorgängermodelle (Sako 75, Sako Hunter) mit modernen Fertigungsverfahren. Seit 2000 gehört Sako zur italienischen Beretta-Gruppe, produziert aber weiterhin ausschliesslich in Riihimäki, Finnland. Die Schwestermarke Tikka wird im selben Werk gefertigt.</p>

<h2>Technik & Konstruktion</h2>
<p>Die Sako 85 zeichnet sich durch ihren <strong>Drei-Warzen-Verschluss mit 70-Grad-Öffnungswinkel</strong> aus. Der reduzierte Öffnungswinkel ermöglicht schnelleres Repetieren und bessere Kompatibilität mit grossen Zielfernrohren. Die drei Verriegelungswarzen sorgen für gleichmässige Kraftverteilung und hohe Steifigkeit.</p>
<p>Ein Alleinstellungsmerkmal ist die Fertigung in <strong>fünf verschiedenen Hülsengrössen</strong> (XS, S, SM, M, L), jeweils mit massgeschneidertem Verschluss. Dadurch sind die Proportionen der Waffe immer optimal auf das Kaliber abgestimmt.</p>
<p>Der Abzug stammt aus dem berühmten <strong>TRG-Scharfschützengewehr</strong> und ist werksseitig auf 1–2 kg einstellbar. Er gehört zu den besten Serienabzügen am Markt. Das abnehmbare Magazin verfügt über eine Totalverriegelung — es kann nicht versehentlich herausfallen.</p>
<p>Jede Sako 85 wird ab Werk einzeln auf Präzision getestet und mit einer <strong>Werkszielscheibe</strong> ausgeliefert.</p>
<ul>
<li><strong>Kaliber:</strong> .222 Rem bis .375 H&amp;H Magnum (über 30 Kaliber)</li>
<li><strong>System:</strong> Repetierbüchse mit 3-Warzen-Verschluss (70-Grad-Öffnungswinkel)</li>
<li><strong>Magazin:</strong> 4–6 Schuss (abnehmbar, Totalverriegelung)</li>
<li><strong>Lauflänge:</strong> 510 mm bis 620 mm</li>
<li><strong>Gewicht:</strong> ab 2,9 kg (Carbonite)</li>
<li><strong>Abzug:</strong> TRG-Abzug, einstellbar 1–2 kg</li>
</ul>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>Sako 85 Hunter:</strong> Klassische Jagdausführung mit Nussbaum-Holzschaft und offener Visierung.</li>
<li><strong>Sako 85 Finnlight:</strong> Ultraleicht mit geflötetem Edelstahllauf und Kunststoffschaft, ideal für Gebirgsjagd. Ab 2,7 kg.</li>
<li><strong>Sako 85 Bavarian:</strong> Bayerischer Schaftstil mit Hirschfänger-Griff — in der Schweiz sehr beliebt.</li>
<li><strong>Sako 85 Carbonlight:</strong> Carbon-Edelstahl-Kombination, ab 2,4 kg — das leichteste Modell.</li>
<li><strong>Sako 85 Long Range:</strong> Schwerer Lauf mit Thumbhole-Schaft für Präzisionsschiessen.</li>
<li><strong>Sako 85 Varmint:</strong> Schwerer Lauf für Raubwildjagd und sportliches Schiessen.</li>
<li><strong>Sako 85 Black Bear:</strong> Schwarze Ausführung mit Mündungsgewinde.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Die Sako 85 ist in über 30 Kalibern erhältlich. Die in der Schweiz gängigsten:</p>
<ul>
<li><strong>6,5x55 Swedish:</strong> Skandinavischer Klassiker mit moderatem Rückstoss, sehr beliebt bei Schweizer Jägern.</li>
<li><strong>.308 Winchester:</strong> Universalkaliber für mitteleuropäische Jagdverhältnisse.</li>
<li><strong>7x64 mm:</strong> Klassisches europäisches Jagdkaliber mit flacher Flugbahn.</li>
<li><strong>.30-06 Springfield:</strong> Vielseitiger Allrounder für alle europäischen Wildarten.</li>
<li><strong>6,5 Creedmoor:</strong> Modern und präzise, zunehmend beliebt.</li>
</ul>
<p>Die Werkspräzision liegt dank kaltgehämmertem Lauf und TRG-Abzug bei 0,8–1,2 MOA — mit Matchmunition oft deutlich darunter.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Sako geniesst in der Schweiz einen ausgezeichneten Ruf. Preise (Neuwaffen):</p>
<ul>
<li><strong>Sako 85 Hunter:</strong> CHF 2'200 – 2'600</li>
<li><strong>Sako 85 Finnlight:</strong> CHF 2'400 – 2'900</li>
<li><strong>Sako 85 Bavarian:</strong> CHF 2'500 – 3'000</li>
<li><strong>Sako 85 Carbonlight:</strong> CHF 3'200 – 3'800</li>
<li><strong>Sako 85 Long Range:</strong> CHF 2'800 – 3'200</li>
</ul>
<p>Auf dem Occasionsmarkt erzielen Sako 85 stabile Preise zwischen CHF 1'500 und 2'200. Gut erhaltene Exemplare finden schnell einen Käufer.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<ul>
<li><strong>Laufreinigung:</strong> Nach jedem Schiessen mit Messingbürste und Laufreiniger säubern. Sako-Läufe sind kaltgehämmert und besonders glatt.</li>
<li><strong>Verschluss:</strong> Verriegelungswarzen und Stossbodenfläche regelmässig reinigen und leicht ölen.</li>
<li><strong>Magazin:</strong> Totalverriegelung auf festen Sitz prüfen. Magazinfeder bei Nichtgebrauch entlasten.</li>
<li><strong>Abzug:</strong> Der TRG-Abzug ist wartungsarm. Abzugsgewicht lässt sich vom Büchsenmacher individuell einstellen.</li>
<li><strong>Schaft:</strong> Holzschäfte mit Leinöl pflegen; Kunststoffschäfte sind witterungsbeständig.</li>
</ul>
<p>Empfohlenes Zubehör: Optilock-Montageringe von Sako, Mündungsgewinde-Adapter für Schalldämpfer, Sako-Trageriemen.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die Sako 85 gehört zu den besten Repetierbüchsen der Welt. In Verarbeitung, Abzugsqualität und Präzision setzt sie Massstäbe. Für Schweizer Jäger, die kompromisslose Qualität und skandinavische Zuverlässigkeit suchen, ist sie eine erstklassige Wahl.</p>
<p>Für die Gebirgsjagd empfiehlt sich die <strong>Finnlight</strong> oder <strong>Carbonlight</strong>, für die klassische Jagd die <strong>Bavarian</strong>. Der Aufpreis gegenüber Tikka ist durch die feinere Verarbeitung, den TRG-Abzug und die fünf Hülsengrössen gerechtfertigt.</p>
<p><em>Rechtsstatus Schweiz: Waffenerwerbsschein (WES) erforderlich.</em></p>`,
    rechtsstatus: 'frei',
    typischeKaliber: ['7×64mm', '.308 Win', '.30-06', '6,5×55mm'],
    tags: ['Büchse', 'Sako', 'Finnland', 'Jagd', 'Präzision'],
    relatedSlugs: ['blaser-r8', 'tikka-t3x', 'remington-700', 'winchester-70'],
  },

  {
    slug: 'tikka-t3x',
    titel: 'Tikka T3x',
    kategorie: 'Büchse',
    hersteller: 'Tikka',
    baujahr: '2016',
    kurzbeschreibung: 'Finnische Präzision zum fairen Preis. CHF 700–900 für sub-MOA Leistung. Preis-Leistungs-Sieger.',
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Tikka ist eine finnische Waffenmarke, die 1893 gegründet wurde und seit 1983 als Tochtermarke von Sako firmiert. Die Produktion findet im selben Werk in Riihimäki statt, in dem auch die teureren Sako-Gewehre gefertigt werden. Die Idee hinter Tikka war von Anfang an, Sako-Qualität zu einem breiteren Publikum zu bringen — ohne Kompromisse bei der Präzision.</p>
<p>Die Tikka T3 wurde 2003 eingeführt und wurde schnell zum Bestseller auf dem europäischen Jagdwaffenmarkt. 2016 folgte das Update zur T3x, das wesentliche Verbesserungen am Schaftsystem, der Haptik und der Modulierbarkeit brachte. Die T3x ist heute die meistverkaufte Jagdrepetierbüchse in der Schweiz und eine der meistverkauften weltweit. Sie hat sich den Ruf als unschlagbarer Preis-Leistungs-Sieger erarbeitet.</p>

<h2>Technik & Konstruktion</h2>
<p>Die Tikka T3x basiert auf einem <strong>Zwei-Warzen-Verschluss</strong> mit einem Öffnungswinkel von 72 Grad. Der Verschluss läuft auf einer glasglatten Oberfläche und ermöglicht ein geschmeidiges, schnelles Repetieren. Die Systemhülse ist aus einem Block Stahl gefertigt und bietet hohe Steifigkeit.</p>
<p>Das <strong>modulare Schaftsystem</strong> — die wichtigste Neuerung der T3x gegenüber der T3 — erlaubt den Austausch von Pistolengriff-Einsätzen und bietet eine verstellbare Schaftbacke. Damit lässt sich die Waffe individuell an den Schützen anpassen, ohne teure Schaftmodifikationen.</p>
<p>Der Abzug ist ein Highlight: Er lässt sich vom Benutzer selbst auf 1–2 kg einstellen und bricht sauber mit einem klar definierten Druckpunkt. Für diese Preisklasse ist die Abzugsqualität aussergewöhnlich. Ab Werk liefert die T3x typischerweise <strong>Sub-MOA-Präzision</strong> (unter 3 cm auf 100 m) — ein Versprechen, das kaum ein Mitbewerber in dieser Preisklasse halten kann.</p>
<ul>
<li><strong>Kaliber:</strong> .204 Ruger bis .300 Win Mag (über 20 Kaliber)</li>
<li><strong>System:</strong> Repetierbüchse mit 2-Warzen-Verschluss (72-Grad-Öffnung)</li>
<li><strong>Magazin:</strong> 3–6 Schuss (abnehmbar)</li>
<li><strong>Lauflänge:</strong> 510 mm bis 620 mm</li>
<li><strong>Gewicht:</strong> ab 2,9 kg (Lite)</li>
<li><strong>Abzug:</strong> Einstellbar, ab 1 kg</li>
</ul>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>T3x Lite:</strong> Die Standard-Jagdbüchse mit Kunststoffschaft — leicht, robust und preiswert. Der Bestseller.</li>
<li><strong>T3x Hunter:</strong> Klassische Variante mit Nussbaum-Holzschaft für den traditionell orientierten Jäger.</li>
<li><strong>T3x Laminated Stainless:</strong> Edelstahllauf mit Schichtholzschaft — wetterfest und robust.</li>
<li><strong>T3x Varmint:</strong> Schwerer Lauf für Präzisionsschiessen und Raubwildjagd.</li>
<li><strong>T3x TAC A1:</strong> Taktische Plattform mit Aluminium-Chassis-Schaft, Picatinny-Schiene und klappbarer Schaftkappe — für den Präzisionssport.</li>
<li><strong>T3x UPR (Ultimate Precision Rifle):</strong> Kompakter Chassis-Repetierer für taktisches Schiessen.</li>
<li><strong>T3x Super Varmint:</strong> Schwerer geflöteter Lauf mit verstellbarem Schaft für maximale Präzision.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Die T3x deckt das gesamte Spektrum der gängigen Jagd- und Sportkaliber ab:</p>
<ul>
<li><strong>.308 Winchester:</strong> Der Allrounder für Reh, Gams und Rothirsch — in der Schweiz am häufigsten gewählt.</li>
<li><strong>6,5 Creedmoor:</strong> Das Trendkaliber mit geringem Rückstoss und hervorragender Langstreckenpräzision.</li>
<li><strong>7x64 mm:</strong> Europäischer Klassiker mit flacher Flugbahn.</li>
<li><strong>.243 Winchester:</strong> Ideal für Rehwild und kleineres Wild, sehr rückstossarm.</li>
<li><strong>.300 Win Mag:</strong> Für grosse Distanzen und stärkeres Wild.</li>
</ul>
<p>Die T3x liefert ab Werk regelmässig Gruppen unter 1 MOA — viele Exemplare schaffen mit passender Munition 0,5–0,7 MOA. Das ist ein Präzisionsniveau, das bei Mitbewerbern oft erst ab dem doppelten Preis erreicht wird.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Die Tikka T3x ist das meistverkaufte Jagdgewehr in der Schweiz — sowohl als Erstwaffe für Jungschützen als auch als Zweitwaffe für erfahrene Jäger. Preise (Neuwaffen):</p>
<ul>
<li><strong>T3x Lite:</strong> CHF 750 – 900</li>
<li><strong>T3x Hunter:</strong> CHF 950 – 1'100</li>
<li><strong>T3x Laminated Stainless:</strong> CHF 1'000 – 1'200</li>
<li><strong>T3x Varmint:</strong> CHF 1'000 – 1'200</li>
<li><strong>T3x TAC A1:</strong> CHF 1'800 – 2'200</li>
<li><strong>T3x UPR:</strong> CHF 1'600 – 1'900</li>
</ul>
<p>Gebrauchte T3x werden ab CHF 500–700 gehandelt. Aufgrund der grossen Stückzahlen ist die Verfügbarkeit auf dem Occasionsmarkt gut. Die T3x ist auch eine beliebte Plattform für Custom-Umbauten (Chassis, Abzug, Lauf).</p>

<h2>Pflege, Wartung & Zubehör</h2>
<ul>
<li><strong>Laufreinigung:</strong> Kaltgehämmerter Lauf — nach jedem Schiessen mit Putzstock und Patches reinigen. Kupferlöser nach 100–200 Schuss empfohlen.</li>
<li><strong>Verschluss:</strong> Regelmässig reinigen und dünn ölen. Der glatte Verschlusslauf sorgt für leichtes Repetieren.</li>
<li><strong>Abzugseinstellung:</strong> Mit dem mitgelieferten Schlüssel selbst einstellbar — keine Werkstatt nötig.</li>
<li><strong>Schaft:</strong> Kunststoffschaft ist pflegeleicht; Holzschaft mit Schaftöl behandeln.</li>
<li><strong>Magazin:</strong> Regelmässig auf festen Sitz und Funktion der Magazinfeder prüfen.</li>
</ul>
<p>Beliebtes Zubehör: Mündungsgewinde-Adapter (M14x1 oder M15x1), Schalldämpfer, Sako Optilock-Ringe, MDT- oder KRG-Chassis für taktische Umbauten.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die Tikka T3x ist der unangefochtene Preis-Leistungs-Sieger unter den Jagdrepetierbüchsen. Für CHF 750–900 erhält man ein Gewehr mit Sub-MOA-Präzision, einem hervorragenden Abzug und finnischer Fertigungsqualität. Es gibt schlicht keine andere Büchse in dieser Preisklasse, die so viel bietet.</p>
<p>Für Erstjäger und preisbewusste Schützen ist die <strong>T3x Lite</strong> die klare Empfehlung. Wer einen traditionellen Look bevorzugt, greift zur <strong>T3x Hunter</strong>. Für Präzisionsenthusiasten bietet die <strong>T3x TAC A1</strong> eine taktische Plattform, die mit deutlich teureren Systemen mithalten kann.</p>
<p><em>Rechtsstatus Schweiz: Waffenerwerbsschein (WES) erforderlich.</em></p>`,
    rechtsstatus: 'frei',
    typischeKaliber: ['7×64mm', '.308 Win', '6,5 Creedmoor', '.243 Win'],
    tags: ['Büchse', 'Tikka', 'T3x', 'Preis-Leistung', 'Jagd'],
    relatedSlugs: ['sako-85', 'mauser-m18', 'remington-700', 'blaser-r8'],
  },

  {
    slug: 'mauser-m18',
    titel: 'Mauser M18',
    kategorie: 'Büchse',
    hersteller: 'Mauser',
    baujahr: '2018',
    kurzbeschreibung: 'Moderner Mauser zum erschwinglichen Preis. CHF 700–900. Europas günstigstes Premium-Jagdgewehr.',
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Der Name Mauser steht seit 1872 für deutsche Waffenbaukunst. Die Gebrüder Wilhelm und Paul Mauser schufen mit dem Mauser 98 das Verschlusssystem, das bis heute die Grundlage der meisten Repetierbüchsen bildet. Über Jahrzehnte war Mauser vor allem für hochpreisige Jagdgewehre ab CHF 5'000 bekannt.</p>
<p>2018 änderte sich das: Mauser stellte die M18 vor, intern "The People's Rifle" genannt. Ziel war es, die Marke einem breiteren Publikum zugänglich zu machen. Die M18 wird im selben Werk in Isny gefertigt wie die teurere M12. Mauser gehört zur Lüke und Ortmeier Gruppe (zusammen mit Blaser und Sauer).</p>

<h2>Technik & Konstruktion</h2>
<p>Die M18 verwendet einen <strong>Drei-Warzen-Verschluss mit 60-Grad-Öffnungswinkel</strong> — der kürzeste Hub in dieser Klasse. Dadurch ist das Repetieren schneller als bei den meisten Konkurrenten. Die drei Verriegelungswarzen sorgen für symmetrische Kraftverteilung und hohe Verriegelungsfestigkeit.</p>
<p>Die <strong>Drei-Lagen-Sicherung</strong> (Sicher, Feuer, Ladestellung) folgt dem Mauser-98-Prinzip: In der Ladestellung kann der Verschluss geöffnet werden, während der Schlagbolzen gesichert bleibt.</p>
<p>Der kaltgehämmerte Lauf liefert ab Werk <strong>Sub-MOA-Präzision</strong>. Das abnehmbare Kunststoffmagazin fasst 5 Schuss. Der Polymerschaft ist mit Softgrip-Einlage ausgestattet und liegt auch bei Nässe sicher in der Hand.</p>
<ul>
<li><strong>Kaliber:</strong> .223 Rem bis .300 Win Mag (12 Kaliber)</li>
<li><strong>System:</strong> Repetierbüchse mit 3-Warzen-Verschluss (60-Grad-Öffnungswinkel)</li>
<li><strong>Magazin:</strong> 5 Schuss (abnehmbares Kunststoffmagazin)</li>
<li><strong>Lauflänge:</strong> 560 mm (Standard), 620 mm (Magnum)</li>
<li><strong>Gewicht:</strong> 3,1 kg (ohne Optik)</li>
<li><strong>Abzug:</strong> Einstellbar, ab 1,2 kg</li>
</ul>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>M18:</strong> Standardmodell mit schwarzem Polymerschaft und Softgrip-Einlage — der Bestseller.</li>
<li><strong>M18 Feldjagd:</strong> Mit Mündungsgewinde (M15x1) und Laufmantel, bereit für Schalldämpfer.</li>
<li><strong>M18 Waldjagd:</strong> Mit offener Visierung (Kimme und Korn) für schnelle Schüsse auf kurze Distanz.</li>
<li><strong>M18 Stainless:</strong> Lauf und Verschluss in Edelstahl — für extreme Witterung.</li>
<li><strong>M18 Savanna:</strong> In Savannen-Braun, für offenes Gelände.</li>
<li><strong>M18 Fenris:</strong> Limitierte Sonderausgabe mit speziellem Schaftdesign.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Die M18 ist in 12 Kalibern erhältlich, die alle gängigen Jagdsituationen abdecken:</p>
<ul>
<li><strong>.308 Winchester:</strong> Der Klassiker für Reh, Gams und Hirsch — häufigste Wahl in der Schweiz.</li>
<li><strong>7x64 mm:</strong> Traditionelles europäisches Jagdkaliber mit rasanter Flugbahn.</li>
<li><strong>6,5 Creedmoor:</strong> Modernes Präzisionskaliber mit wenig Rückstoss.</li>
<li><strong>.30-06 Springfield:</strong> Vielseitiger Allrounder mit grosser Munitionsauswahl.</li>
<li><strong>.300 Win Mag:</strong> Für grosse Distanzen und stärkeres Wild.</li>
<li><strong>.223 Remington:</strong> Für Fuchsjagd und sportliches Schiessen.</li>
</ul>
<p>Die Werkspräzision liegt typischerweise bei 1 MOA — für den Preis bemerkenswert. Viele Exemplare schaffen mit passender Munition 0,7–0,8 MOA.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Die Mauser M18 hat sich in der Schweiz als ernsthafte Alternative zur Tikka T3x und Sauer 100 etabliert. Der Name Mauser hat traditionell einen guten Klang. Preise (Neuwaffen):</p>
<ul>
<li><strong>M18 Standard:</strong> CHF 750 – 900</li>
<li><strong>M18 Feldjagd:</strong> CHF 800 – 950</li>
<li><strong>M18 Waldjagd:</strong> CHF 800 – 950</li>
<li><strong>M18 Stainless:</strong> CHF 900 – 1'050</li>
<li><strong>M18 Savanna:</strong> CHF 800 – 950</li>
</ul>
<p>Auf dem Occasionsmarkt sind M18 ab CHF 500–650 erhältlich. Die Wertstabilität ist gut, liegt aber leicht unter der Tikka T3x, da die M18 noch nicht so lange auf dem Markt ist.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<ul>
<li><strong>Laufreinigung:</strong> Kaltgehämmerter Lauf — nach jedem Schiessen mit Putzstock und Patches reinigen. Alle 200 Schuss Kupferlöser empfohlen.</li>
<li><strong>Verschluss:</strong> Drei-Warzen-Verschluss regelmässig reinigen und dünn ölen.</li>
<li><strong>Sicherung:</strong> Drei-Lagen-Sicherung auf Leichtgängigkeit prüfen.</li>
<li><strong>Polymerschaft:</strong> Pflegeleicht und witterungsbeständig — bei Bedarf einfach abwischen.</li>
<li><strong>Magazin:</strong> Kunststoffmagazin auf Risse oder Verformungen prüfen.</li>
</ul>
<p>Empfohlenes Zubehör: Schalldämpfer (Mündungsgewinde M15x1 bei Feldjagd), Mauser-Montageringe, Trageriemen und Zielfernrohr im Bereich CHF 500–1'500.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die Mauser M18 demokratisiert den Zugang zur Marke Mauser. Für CHF 750–900 erhält man ein solides, präzises Jagdgewehr mit deutschem Namen und bewährter Fertigungsqualität. Die M18 konkurriert direkt mit der Tikka T3x und der Sauer 100 — alle drei hervorragend in derselben Preisklasse.</p>
<p>Für Schweizer Jungjäger ist die <strong>M18 Feldjagd</strong> (mit Mündungsgewinde) die beste Wahl — ab Werk bereit für Schalldämpfer. Wer bei jedem Wetter jagt, greift zur <strong>M18 Stainless</strong>. Der 60-Grad-Öffnungswinkel und die Drei-Lagen-Sicherung machen die M18 besonders für Drückjagd-Schützen attraktiv.</p>
<p><em>Rechtsstatus Schweiz: Waffenerwerbsschein (WES) erforderlich.</em></p>`,
    rechtsstatus: 'frei',
    typischeKaliber: ['.308 Win', '7×64mm', '6,5 Creedmoor', '.30-06'],
    tags: ['Büchse', 'Mauser', 'M18', 'Jagd', 'Preis-Leistung'],
    relatedSlugs: ['tikka-t3x', 'sako-85', 'blaser-r8', 'remington-700'],
  },

  {
    slug: 'steyr-mannlicher',
    titel: 'Steyr Mannlicher CL II',
    kategorie: 'Büchse',
    hersteller: 'Steyr Arms',
    baujahr: '2004',
    kurzbeschreibung: 'Österreichische Jagdtradition seit 1864. Bekannt für den Set Trigger (Stecher) und Qualität.',
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Steyr Mannlicher blickt auf über 160 Jahre Waffenbaugeschichte zurück. Die Österreichische Waffenfabriks-Gesellschaft wurde 1864 in Steyr (Oberösterreich) gegründet und entwickelte sich rasch zum grössten Waffenhersteller der k.u.k. Monarchie. Ferdinand Ritter von Mannlicher, einer der genialsten Waffenkonstrukteure aller Zeiten, erfand 1885 den Geradezugverschluss und das Paketladerahmen-System — Innovationen, die den Waffenbau revolutionierten.</p>
<p>Die modernen Steyr Mannlicher Jagdgewehre bauen auf dieser Tradition auf. Das Safe Bolt System (SBS), eingeführt mit der CL II (2004) und weiterentwickelt im SM12, kombiniert Handspannung mit einem innovativen Vier-Warzen-Verschluss. Steyr Arms (wie das Unternehmen heute heisst) produziert weiterhin in Steyr und ist neben Jagdwaffen auch für das AUG (Sturmgewehr der österreichischen Armee) und die Steyr-Pistolen bekannt.</p>

<h2>Technik & Konstruktion</h2>
<p>Das Herzstück der aktuellen Steyr Mannlicher Büchsen ist das <strong>SBS-System (Safe Bolt System)</strong>. Es zeichnet sich durch folgende Merkmale aus:</p>
<ul>
<li><strong>Vier-Warzen-Verriegelung:</strong> Vier Verriegelungswarzen greifen direkt im Patronenlager ein — nicht wie üblich am Systemgehäuseende. Das ergibt einen kürzeren, steiferen Verschluss.</li>
<li><strong>Handspannung:</strong> Der Schlagbolzen wird durch einen Schieber am Pistolengriff gespannt — die Waffe ist entweder sicher (entspannt) oder feuerbereit. Ein separater Sicherungshebel entfällt.</li>
<li><strong>Direktabzug:</strong> Sauber brechender Abzug mit werksseitig ca. 1 kg Abzugsgewicht.</li>
</ul>
<p>Die <strong>Mannlicher-Variante</strong> mit Vollschaft bis zur Mündung ist ein Markenzeichen des Hauses. Der Vollschaft schützt den Lauf bei der Gebirgsjagd vor Beschädigungen und verleiht der Waffe ein unverwechselbares Erscheinungsbild. Das optional erhältliche <strong>Rotationsmagazin</strong> — ein Steyr-Patent — ordnet die Patronen sternförmig an und führt sie spielfrei zu.</p>
<ul>
<li><strong>Kaliber:</strong> .222 Rem bis .300 Win Mag</li>
<li><strong>System:</strong> Repetierbüchse mit SBS-Verschluss, 4 Verriegelungswarzen</li>
<li><strong>Magazin:</strong> 3–5 Schuss (Rotationsmagazin oder Kastenmagazin)</li>
<li><strong>Lauflänge:</strong> 508 mm bis 600 mm</li>
<li><strong>Gewicht:</strong> ab 3,0 kg (ohne Optik)</li>
<li><strong>Abzug:</strong> Direktabzug mit Handspannung</li>
</ul>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>SM12:</strong> Das aktuelle Topmodell mit SBS-Verschluss, erhältlich in diversen Schaftausführungen und Kalibern. Der Nachfolger der CL II.</li>
<li><strong>Pro Hunter:</strong> Robustes Jagdmodell mit wetterfestem Kunststoffschaft — für den harten Einsatz im Gelände.</li>
<li><strong>Classic:</strong> Traditioneller Holzschaft mit bayerischer Schaftbacke — zeitlose Eleganz.</li>
<li><strong>Mannlicher:</strong> Die ikonische Vollschaft-Ausführung bis zur Mündung — das Erkennungszeichen der Marke.</li>
<li><strong>Pro THB (Tactical Heavy Barrel):</strong> Taktisches Modell mit schwerem Lauf und Mündungsgewinde für Präzisionsschiessen.</li>
<li><strong>SM12 SX:</strong> Moderne Ausführung mit Kunststoffschaft und ergonomischem Design.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Steyr Mannlicher bietet eine solide Auswahl an Kalibern für die europäische Jagd:</p>
<ul>
<li><strong>7x64 mm:</strong> Der europäische Klassiker — in Österreich und der Schweiz das meistgewählte Kaliber bei Steyr.</li>
<li><strong>.308 Winchester:</strong> Universalkaliber für Mitteleuropa.</li>
<li><strong>6,5x55 Swedish:</strong> Skandinavischer Klassiker mit moderatem Rückstoss.</li>
<li><strong>9,3x62 mm:</strong> Für Schwarzwild und Drückjagd.</li>
<li><strong>.300 Win Mag:</strong> Für weite Schüsse im Hochgebirge.</li>
</ul>
<p>Die Präzision der Steyr-Läufe ist hervorragend — kaltgehämmerte Läufe aus Steyr-Stahl gehören zu den besten in der Branche. Typische Werkspräzision: 0,8–1,2 MOA.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Steyr Mannlicher hat in der Schweiz eine treue Fangemeinde, besonders unter Gebirgsjägern und Traditionalisten. Die Nähe Österreichs und die gemeinsame Jagdkultur machen die Marke hier besonders beliebt. Preise (Neuwaffen):</p>
<ul>
<li><strong>SM12 Classic:</strong> CHF 2'800 – 3'400</li>
<li><strong>SM12 Mannlicher (Vollschaft):</strong> CHF 3'200 – 3'800</li>
<li><strong>Pro Hunter:</strong> CHF 2'200 – 2'800</li>
<li><strong>Pro THB:</strong> CHF 2'500 – 3'000</li>
<li><strong>SM12 SX:</strong> CHF 2'600 – 3'200</li>
</ul>
<p>Gebrauchte Steyr Mannlicher erzielen CHF 1'500–2'500 auf dem Occasionsmarkt. Ältere Modelle (SBS 96, CL II) sind ab CHF 1'200 erhältlich und bieten ein ausgezeichnetes Preis-Leistungs-Verhältnis.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<ul>
<li><strong>Laufreinigung:</strong> Nach jedem Schiessen mit Putzstock und Patches reinigen. Die kaltgehämmerten Steyr-Läufe sind besonders langlebig.</li>
<li><strong>SBS-Verschluss:</strong> Die vier Verriegelungswarzen und den Handspannmechanismus regelmässig reinigen und leicht ölen.</li>
<li><strong>Rotationsmagazin:</strong> Die Magazinfeder regelmässig auf Funktion prüfen. Bei Nichtgebrauch entlasten.</li>
<li><strong>Vollschaft:</strong> Holzvollschäfte mit Schaftöl pflegen. Auf Risse am Laufkanal achten (temperaturbedingt).</li>
<li><strong>Stecher-Abzug:</strong> Falls vorhanden, den Stecher (Set Trigger) regelmässig betätigen, um die Mechanik geschmeidig zu halten.</li>
</ul>
<p>Empfohlenes Zubehör: Steyr-Montageringe, Schalldämpfer (Mündungsgewinde bei Pro Hunter und Pro THB), hochwertiger Trageriemen.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Steyr Mannlicher verbindet österreichische Jagdtradition mit modernem Verschlussdesign. Das SBS-System mit Handspannung gehört zu den sichersten Systemen am Markt. Für Schweizer Jäger, die Wert auf Tradition, Qualität und österreichische Wertarbeit legen, ist Steyr Mannlicher eine ausgezeichnete Wahl.</p>
<p>Für Gebirgsjäger ist die <strong>Mannlicher-Vollschaft-Variante</strong> die klassische Empfehlung — der Vollschaft schützt den Lauf optimal. Pragmatiker greifen zum <strong>Pro Hunter</strong> mit Kunststoffschaft. Wer das Beste sucht, wählt den <strong>SM12</strong> in der gewünschten Schaftausführung.</p>
<p><em>Rechtsstatus Schweiz: Waffenerwerbsschein (WES) erforderlich.</em></p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Die Remington Arms Company, gegründet 1816 in Ilion, New York, ist der älteste Waffenhersteller der USA. Die Model 700 wurde 1962 eingeführt und ist mit über 5 Millionen Exemplaren das meistverkaufte Zylinderverschlussgewehr aller Zeiten. Militärisch dient die 700 als Basis für das M24 SWS (US Army) und M40 (US Marines). Sie ist die Grundlage der modernen taktischen Präzisionsgewehr-Industrie. 2020 meldete Remington Insolvenz an; die Marke wurde aufgekauft und die Produktion wird fortgeführt.</p>

<h2>Technik & Konstruktion</h2>
<p>Die 700 basiert auf einem <strong>zylindrischen Systemgehäuse</strong>, aus einem Stück Stahl gedreht — extrem steif und perfekte Grundlage für Präzisionsumbauten. Der <strong>Zwei-Warzen-Push-Feed-Verschluss</strong> ist einfach, robust und bewährt. Der aktuelle <strong>X-Mark Pro Trigger</strong> ist einstellbar und bietet einen sauberen Abzug. Die wahre Stärke liegt in der <strong>Aftermarket-Kompatibilität</strong>: Kein anderes Gewehr hat ein so grosses Zubehör-Ökosystem.</p>
<ul>
<li><strong>Kaliber:</strong> Über 40 Kaliber (.17 Rem bis .458 Win Mag)</li>
<li><strong>System:</strong> Repetierbüchse mit 2-Warzen-Push-Feed-Verschluss</li>
<li><strong>Magazin:</strong> 3–5 Schuss (internes oder abnehmbares Magazin)</li>
<li><strong>Lauflänge:</strong> 508 mm bis 660 mm</li>
<li><strong>Gewicht:</strong> ab 3,3 kg</li>
<li><strong>Abzug:</strong> X-Mark Pro (einstellbar)</li>
</ul>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>700 SPS:</strong> Sport-Einstiegsmodell mit Kunststoffschaft.</li>
<li><strong>700 CDL:</strong> Classic Deluxe mit Holzschaft.</li>
<li><strong>700 5R:</strong> Polygonaler Drall für beste Präzision.</li>
<li><strong>700 Long Range:</strong> Schwerer 26-Zoll-Lauf.</li>
<li><strong>700 PCR:</strong> MDT-Aluminium-Chassis — taktische Variante ab Werk.</li>
<li><strong>700 Sendero SF II:</strong> Edelstahllauf mit Fluting.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Die 700 ist in mehr Kalibern erhältlich als jede andere Repetierbüchse:</p>
<ul>
<li><strong>.308 Winchester:</strong> Standardkaliber für Präzisionsschiessen.</li>
<li><strong>6,5 Creedmoor:</strong> Modernes Langstreckenkaliber.</li>
<li><strong>.30-06 Springfield:</strong> Amerikanischer Klassiker.</li>
<li><strong>.300 Win Mag:</strong> Für weite Distanzen.</li>
<li><strong>.223 Remington:</strong> Für Varmint-Schiessen.</li>
</ul>
<p>Standard-Modelle liefern 1–1,5 MOA, 5R und Long-Range schaffen Sub-MOA. Mit Custom-Lauf sind 0,3–0,5 MOA möglich.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Die 700 ist in der Schweiz weniger verbreitet als europäische Büchsen, hat aber eine treue Anhängerschaft unter Präzisionsschützen. Preise (Neuwaffen):</p>
<ul>
<li><strong>700 SPS:</strong> CHF 900 – 1'200</li>
<li><strong>700 CDL:</strong> CHF 1'200 – 1'500</li>
<li><strong>700 5R:</strong> CHF 1'300 – 1'600</li>
<li><strong>700 Long Range:</strong> CHF 1'200 – 1'500</li>
<li><strong>700 PCR:</strong> CHF 1'800 – 2'200</li>
</ul>
<p>Gebrauchte 700er ab CHF 600–900. Custom-Umbauten kosten CHF 3'000–5'000.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<ul>
<li><strong>Laufreinigung:</strong> Regelmässig reinigen, besonders Chromoly-Stahl-Läufe.</li>
<li><strong>Verschluss:</strong> Zwei-Warzen-Verschluss reinigen und leicht ölen.</li>
<li><strong>Abzug:</strong> X-Mark Pro auf Funktion prüfen. Ältere Walker-Abzüge ersetzen.</li>
<li><strong>Schaft/Chassis:</strong> Kunststoff pflegeleicht; Holz mit Schaftöl behandeln.</li>
</ul>
<p>Empfohlenes Zubehör: TriggerTech- oder Timney-Abzug, MDT- oder KRG-Chassis, Custom-Lauf, Badger-Ordnance-Magazinboden.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die Remington 700 ist die meistverbreitete Plattform für Präzisionsgewehre weltweit. Ihre Stärke liegt im riesigen Aftermarket-Ökosystem. Für Schweizer Schützen, die eine taktische Präzisionsplattform suchen, ist die <strong>700 PCR</strong> ein guter Einstieg. Budget-Projekte starten mit einer gebrauchten <strong>700 SPS</strong> plus Custom-Lauf und Abzug. Für die Jagd gibt es in Europa bessere Alternativen — die 700 spielt ihre Stärken im Präzisionssport aus.</p>
<p><em>Rechtsstatus Schweiz: Waffenerwerbsschein (WES) erforderlich.</em></p>`,
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
    inhalt: `<h2>Geschichte &amp; Entwicklung</h2>
<p>Das Winchester Model 70 wurde 1936 von der Winchester Repeating Arms Company eingeführt und erhielt schon bald den ehrenvollen Beinamen The Riflemans Rifle. Es basierte auf dem früheren Model 54 und wurde von Winchesters Ingenieuren unter der Leitung von Thomas C. Johnson grundlegend überarbeitet. Das Model 70 zeichnete sich von Anfang an durch einen exzellenten Abzug, eine solide Controlled-Round-Feed-Verriegelung nach Mauser-Prinzip und eine überragende Verarbeitungsqualität aus. Legendäre Jäger wie Jack OConnor priesen das Model 70 als das beste Jagdgewehr der Welt und trugen massgeblich zu seinem Ruf bei.</p>
<p>Die Geschichte des Model 70 wird in zwei Epochen geteilt: Pre-64 und Post-64. Die Modelle vor 1964 gelten als die Krone der Winchester-Produktion und sind heute begehrte Sammlerstücke. 1964 führte Winchester aus Kostengründen ein neues Push-Feed-System und günstigere Fertigungsmethoden ein, was unter Schützen und Jägern zu einem Aufschrei führte. Die Qualität der Post-64-Modelle wurde über die Jahrzehnte kontinuierlich verbessert, und 2008 kehrte Winchester mit dem Model 70 Super Grade zum klassischen Controlled-Round-Feed-System zurück. Heute wird das Model 70 von der FN-Tochter Winchester Repeating Arms in Columbia, South Carolina, gefertigt.</p>

<h2>Technik &amp; Konstruktion</h2>
<p>Das Herzstück des Model 70 ist der Controlled-Round-Feed-Verschluss nach Mauser-Bauart. Der grosse Klauen-Auszieher greift die Patrone beim Zuführen aus dem Magazin und kontrolliert sie über den gesamten Lade- und Auswurfvorgang. Dieses System ist besonders zuverlässig und verhindert Doppelladungen. Der Verschluss verriegelt mit zwei Warzen und hat einen Öffnungswinkel von 90 Grad. Die Systemhülse ist aus geschmiedetem Stahl gefertigt und bietet höchste Festigkeit.</p>
<p>Der Abzug des Model 70 ist ein einstellbarer MOA-Trigger (Minute of Angle) mit einem sauberen, glasklaren Druckpunkt bei circa 1500 Gramm. Die Dreistellungssicherung erlaubt gesichertes Entladen. Der Lauf ist frei schwingend im Schaft eingebettet, was die Präzision verbessert. Die Pre-64-Modelle hatten einen Kegelverschluss, der als besonders weich und präzise in der Repetierbarkeit gilt. Die aktuellen Modelle verwenden einen zylindrischen Verschluss mit kontrollierter Zuführung. Das Gewicht variiert je nach Modell zwischen 3,2 und 4,0 Kilogramm, die Lauflänge zwischen 559 und 660 Millimetern.</p>

<h2>Varianten &amp; Modelle</h2>
<p>Das Model 70 wird in zahlreichen Varianten angeboten. Der Super Grade ist das Premiummodell mit hochwertigem Nussbaum-Schaft, Fischhaut-Griffbearbeitung und polierter Brünierung — die moderne Interpretation des klassischen Pre-64. Der Featherweight ist das leichte Jagdmodell mit schlankem Lauf und kompaktem Schaft für die Bergjagd. Der Extreme Weather bietet einen glockenförmigen Kunststoffschaft und Edelstahl-Finish für raue Bedingungen. Der Alaskan ist das robuste Grosswildmodell mit schwererem Lauf. Der Sporter ist das klassische Allround-Jagdmodell. Der Coyote Light ist für Varmint-Jagd optimiert mit schwerem Lauf und Lamellenschlitten. Winchester bietet zudem limitierte Sondermodelle und Sammlereditionen an, die regelmässig in kleinen Stückzahlen aufgelegt werden.</p>

<h2>Kaliber &amp; Ballistik</h2>
<p>Das Winchester Model 70 ist in einer breiten Palette von Kalibern erhältlich. Die gängigsten sind .243 Win, .270 Win, 7mm Rem Mag, .308 Win, .30-06 Springfield, .300 Win Mag, .300 WSM, .325 WSM und .338 Win Mag. Die .270 Winchester ist historisch das Signaturkaliber des Model 70, da Jack OConnor diese Kombination über Jahrzehnte in seinen Kolumnen propagierte. In .30-06 und .308 Win liefert das Model 70 typischerweise Streukreise von 1 MOA oder besser auf 100 Meter. Die Magnum-Kaliber erreichen dank der steifen Systemhülse und des frei schwingenden Laufs ebenfalls hervorragende Präzision. Die effektive Reichweite liegt je nach Kaliber zwischen 300 und 600 Metern für die jagdliche Nutzung.</p>

<h2>Schweizer Markt &amp; Preisentwicklung</h2>
<p>Das Winchester Model 70 hat in der Schweiz eine treue Fangemeinde, ist aber weniger verbreitet als europäische Büchsen. Neupreise für den Sporter liegen bei CHF 1200 bis 1500, den Featherweight bei CHF 1400 bis 1700, und den Super Grade bei CHF 2200 bis 2800. Pre-64-Modelle in gutem Zustand sind begehrte Sammlerstücke und erzielen auf dem Schweizer Markt CHF 2000 bis 5000, je nach Kaliber, Zustand und Seltenheit. Auf dem Gebrauchtmarkt liegen Post-64-Modelle bei CHF 600 bis 1000 in gutem Zustand, neuere CRF-Modelle bei CHF 900 bis 1400. Der Erwerb erfordert einen Waffenerwerbsschein (WES). Die Verfügbarkeit ist bei spezialisierten Händlern gegeben, wobei nicht alle Varianten an Lager sind und teilweise bestellt werden müssen.</p>

<h2>Pflege, Wartung &amp; Zubehör</h2>
<p>Die Pflege des Model 70 ist unkompliziert. Der Verschluss wird durch Drücken des Verschlussfangs bei geöffnetem Verschluss entnommen. Der Lauf sollte nach jedem Schiessgang gereinigt und konserviert werden. Besondere Aufmerksamkeit verdient der grosse Klauen-Auszieher, der gelegentlich auf Federspannung und Funktion geprüft werden sollte. Holzschäfte profitieren von regelmässiger Pflege mit Schaftöl. Das Model 70 nutzt Standard-Montagegewinde, sodass die meisten gängigen Zielfernrohrmontagen passen. Leupold, Talley und Warne bieten spezifische Montagen für das Model 70 an. Als Optik empfehlen sich je nach Einsatzzweck Leupold VX-3HD, Vortex Viper oder Swarovski Z5 im gehobenen Segment.</p>

<h2>Fazit &amp; Kaufempfehlung</h2>
<p>Das Winchester Model 70 ist ein amerikanischer Klassiker, der auch nach über 85 Jahren Produktionsgeschichte nichts von seiner Faszination verloren hat. Das Controlled-Round-Feed-System ist eines der zuverlässigsten Repetiersysteme überhaupt, der Abzug gehört zu den besten in der Preisklasse, und die Verarbeitungsqualität der aktuellen Modelle ist hervorragend. Für Schweizer Jäger und Sammler, die einen Hauch amerikanischer Waffenkultur schätzen, ist das Model 70 eine charaktervolle Alternative zu den dominierenden europäischen Herstellern. Besonders empfehlenswert ist der Featherweight für die alpine Bergjagd und der Super Grade als repräsentatives Jagdgewehr. Pre-64-Modelle sind eine solide Wertanlage mit steigenden Preisen. Das Model 70 ist keine Modewaffe, sondern ein zeitloser Klassiker, der über Generationen weitergegeben wird.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Die SIG SSG 3000 wurde Anfang der 1990er von SIG Sauer als Scharfschützengewehr für Militär und Polizei entwickelt. Sie basiert auf dem Sauer 200 STR und verbindet deutsche Sauer-Präzision mit Schweizer SIG-Qualität. In der Schweiz ist sie das Standard-Präzisionsgewehr vieler Kantonspolizeien. Die Entwicklung fiel in eine Zeit steigender Anforderungen an polizeiliche Präzisionsgewehre durch Geiselnahmen und Terrorbedrohungen. SIG Sauer ist heute in Eckernförde und Exeter ansässig.</p>
<h2>Technik & Konstruktion</h2>
<p>Die SSG 3000 verwendet einen <strong>Sechs-Warzen-Verschluss mit 60 Grad Öffnungswinkel</strong> — einer der kürzesten aller Scharfschützengewehre. Der kaltgehämmerte Lauf liefert garantierte <strong>0,5 MOA</strong> ab Werk. Der Matchabzug ist 1–1,8 kg einstellbar und bricht sauber. Der McMillan-Fiberglas-Schaft mit Aluminium-Bettungsblock absorbiert Vibrationen und ist witterungsbeständig.</p>
<ul>
<li><strong>Kaliber:</strong> .308 Winchester (7,62x51 mm NATO)</li>
<li><strong>System:</strong> Repetierbüchse mit 6-Warzen-Verschluss (60 Grad)</li>
<li><strong>Magazin:</strong> 5 Schuss (abnehmbares Kastenmagazin)</li>
<li><strong>Lauflänge:</strong> 610 mm</li>
<li><strong>Gesamtlänge:</strong> 1180 mm</li>
<li><strong>Gewicht:</strong> 5,9 kg (ohne Optik)</li>
<li><strong>Abzug:</strong> Match-Abzug, einstellbar 1–1,8 kg</li>
</ul>
<h2>Varianten & Modelle</h2>
<ul>
<li><strong>SSG 3000:</strong> Standardmodell mit McMillan-Schaft — Basis für Polizei und Militär.</li>
<li><strong>SSG 3000 Patrol:</strong> Polizeiversion mit klappbarem Hinterschaft und verstellbarer Schaftbacke.</li>
<li><strong>SSG 3000 Tactical:</strong> Erweitert mit Picatinny-Schiene und Zubehörschienen am Vorderschaft.</li>
<li><strong>SIG Cross:</strong> Moderner Nachfolger (2020) mit Klappschaft und Chassis-System.</li>
<li><strong>Sauer S404 Synchro XTC:</strong> Jagdliche Verwandte aus dem Hause Sauer.</li>
</ul>
<h2>Kaliber & Ballistik</h2>
<p>Die SSG 3000 ist auf <strong>.308 Winchester</strong> ausgelegt — das weltweite Standardkaliber für Scharfschützengewehre. Mündungsenergie ca. 3500 Joule mit 168-gr-HPBT-Match, effektive Reichweite bis 800 m. Typische Munition: Federal Gold Medal Match, Lapua Scenar, Swiss P Target. Die garantierte 0,5 MOA bedeutet auf 300 m einen Streukreis unter 5 cm. Mit Swiss-P-Munition erreichen viele SSG 3000 sogar 0,3 MOA.</p>
<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Die SSG 3000 geniesst als SIG-Produkt höchstes Vertrauen bei Behörden und Sportschützen. Preise:</p>
<ul>
<li><strong>SSG 3000 (Neuwaffe, falls verfügbar):</strong> CHF 3500 – 4500</li>
<li><strong>SSG 3000 Patrol:</strong> CHF 4000 – 5000</li>
<li><strong>SIG Cross (Nachfolger):</strong> CHF 2200 – 2800</li>
</ul>
<p>Gebrauchte SSG 3000 erzielen CHF 2500–3500. Ehemalige Polizeiwaffen gelegentlich ab CHF 2000. Preise steigen, da die Produktion eingestellt wurde.</p>
<h2>Pflege, Wartung & Zubehör</h2>
<ul>
<li><strong>Laufreinigung:</strong> Nach jedem Schiessen reinigen. Alle 200–300 Schuss Kupferlöser verwenden.</li>
<li><strong>Verschluss:</strong> 6-Warzen-Verschluss reinigen und leicht ölen.</li>
<li><strong>Matchabzug:</strong> Nicht selbst zerlegen — bei Problemen Büchsenmacher konsultieren.</li>
<li><strong>McMillan-Schaft:</strong> Fiberglas ist witterungsbeständig und pflegeleicht.</li>
<li><strong>Optik:</strong> Montage regelmässig auf festen Sitz prüfen.</li>
</ul>
<p>Empfohlenes Zubehör: Schmidt und Bender oder Nightforce Zielfernrohr, Harris-Zweibein, Gewehrauflagesack, Swiss-P-Match-Munition.</p>
<h2>Fazit & Kaufempfehlung</h2>
<p>Die SIG SSG 3000 ist eines der besten polizeilichen Scharfschützengewehre überhaupt. Sub-MOA-Präzision, schneller 60-Grad-Verschluss und Schweizer Qualität machen sie zur Legende. Für Schweizer Präzisionsschützen ist sie ausgezeichnet — sofern man ein Exemplar findet. Wer moderner will, greift zum <strong>SIG Cross</strong>. Wer eine SSG 3000 besitzt, sollte sie behalten — der Wert steigt kontinuierlich.</p>
<p><em>Rechtsstatus Schweiz: Waffenerwerbsschein (WES) erforderlich.</em></p>`,
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
    inhalt: `ANSCHUETZ_1913_PLACEHOLDER`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Der Karabiner 98 kurz (K98k) wurde 1935 als Standard-Infanteriegewehr der Wehrmacht eingeführt und ist das am weitesten verbreitete Repetiergewehr der Geschichte. Über 14 Millionen Stück wurden gefertigt. Das Mauser-98-System ist die Grundlage fast aller modernen Repetierbüchsen.

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
    youtubeVideoId: 'x3ZibgX_o1U',
    youtubeQuelle: 'Waidwissen',
    relatedSlugs: ['k31', 'fg42', 'stgw57', 'ar15-m16'],
    priceGuide: { gut: "CHF 400–800", sehrGut: "CHF 800–1500", neuwertig: "CHF 1500–2500", sammler: "CHF 3000–10000" },
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
    relatedSlugs: ['hk416', 'stgw90', 'steyr-aug', 'fn-fal'],
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
    relatedSlugs: ['ar15-m16', 'stgw90', 'fn-fal', 'hk-g3'],
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
    relatedSlugs: ['hk416', 'ar15-m16', 'stgw90'],
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
    relatedSlugs: ['krieghoff-k80', 'perazzi', 'beretta-a400'],
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Perazzi wurde 1957 von Daniele Perazzi in Brescia gegründet, dem Zentrum der italienischen Waffenindustrie. Daniele Perazzi war selbst begeisterter Wettkampfschütze und wollte eine Flinte bauen, die den Anforderungen des olympischen Tontaubenschiessens perfekt gerecht wird. Bereits in den frühen 1960er-Jahren gewannen Perazzi-Flinten erste internationale Wettkämpfe. Der grosse Durchbruch kam bei den Olympischen Spielen 1968 in Mexiko-Stadt, als Ennio Mattarelli mit einer Perazzi die Goldmedaille im Trap gewann.</p>
<p>Seitdem ist Perazzi bei Olympischen Spielen eine der meistvertretenen Marken im Tontaubenschiessen. Bis heute wurde die Manufaktur in der Familie weitergegeben — Mauro Perazzi führt das Unternehmen in zweiter Generation. Im Gegensatz zu vielen Mitbewerbern hat Perazzi die Produktion nie ins Ausland verlagert: Jede Flinte wird vollständig in Brescia gefertigt. Die Wartezeit für eine massangefertigte Perazzi beträgt je nach Modell und Gravurwunsch zwischen 6 und 18 Monaten. Perazzi produziert jährlich nur wenige tausend Flinten — Exklusivität ist Teil der Markenidentität.</p>

<h2>Technik & Konstruktion</h2>
<p>Das Herzstück jeder Perazzi ist der abnehmbare Abzugsmechanismus, die sogenannte <strong>Trigger Group</strong>. Dieser kann in wenigen Sekunden ohne Werkzeug aus dem Gehäuse entnommen und durch ein Ersatzteil ersetzt werden. Am Schiessstand bedeutet das: Funktioniert der Abzug nicht einwandfrei, wird er sofort gegen einen Backup-Abzug getauscht — kein Wettkampf geht verloren.</p>
<p>Die Verschlussverriegelung erfolgt über massive Verriegelungsbolzen, die in die Laufhaken eingreifen. Perazzi verwendet für ihre Gehäuse eine spezielle Stahllegierung, die extrem hohe Belastungen aushält. Die Läufe werden aus Chrom-Molybdän-Stahl gefertigt und von Hand endkontrolliert. Die Laufbohrung wird individuell poliert, um optimale Muster und geringstmögliche Bleiablagerungen zu gewährleisten. Die Basküle (Gehäuse) wird aus einem einzigen Stahlblock gefräst und anschliessend wärmebehandelt.</p>
<p>Jeder Schaft wird individuell nach Kundenvermessung gefertigt: <strong>Abzugslänge</strong>, <strong>Senkung</strong> (Drop), <strong>Schränkung</strong> (Cast) und <strong>Pitch</strong> werden exakt auf den Schützen angepasst. Das Schaftholz ist ausgesuchtes türkisches Nussbaum, bei Sondermodellen mit spektakulärer Maserung.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>MX8:</strong> Das Standard-Wettkampfmodell und meistverkaufte Perazzi. Verfügbar als Trap-, Skeet- und Sporting-Version. Flaches Gehäuse, bewährte Technik.</li>
<li><strong>MX2000:</strong> Top-Sporting-Modell mit verbesserter Ergonomie und breiterer Schiene. Besonders beliebt im Parcours-Schiessen.</li>
<li><strong>High Tech:</strong> Höhenverstellbare Schaftbacke, modularer Vorderschaft und zahlreiche Einstellmöglichkeiten. Für Schützen, die maximale Anpassbarkeit wünschen.</li>
<li><strong>MX12:</strong> Leichteres Modell mit schlankerem Gehäuse, ideal für die Jagd oder Schützen, die eine handlichere Flinte bevorzugen.</li>
<li><strong>SCO/SCO Gold:</strong> Seitenschloss-Modelle mit aufwendiger Handgravur durch hauseigene Meistergraveure. Funktionale Kunstwerke ab CHF 30'000.</li>
<li><strong>Extra/Extra Gold:</strong> Die Spitzenmodelle mit Bulino-Gravur und feinster Holzauswahl. Preise bis CHF 80'000 und darüber.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Das Standardkaliber bei Perazzi ist <strong>12/70</strong> — das universelle Wettkampfkaliber für Trap, Skeet und Sporting. Für die Jagd und spezielle Einsatzgebiete bietet Perazzi auch <strong>12/76 Magnum</strong>, <strong>20/70</strong>, <strong>28/70</strong> und <strong>.410</strong> an. Die kleineren Kaliber sind besonders im Sub-Gauge-Sporting beliebt.</p>
<p>Die Lauflängen reichen von 680mm bis 815mm, wobei für Trap typischerweise 750mm oder 760mm gewählt werden. Sporting-Schützen bevorzugen oft 760mm bis 810mm. Die Choke-Konfiguration kann als Wechselchoke oder fester Choke bestellt werden. Perazzi bietet ein eigenes Wechselchoke-System mit besonders langen Chokes, die ein gleichmässigeres Schrotbild erzeugen. Die Laufbohrung ist typischerweise 18,4mm (Standard) oder 18,7mm (Overbore), wobei letztere den Rückstoss reduziert und ein breiteres Schrotbild erzeugt.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Perazzi-Flinten gehören zum oberen Preissegment und sind in der Schweiz über spezialisierte Fachhändler erhältlich. Die Preisspanne ist enorm:</p>
<ul>
<li><strong>MX8 Standard:</strong> CHF 8'000 – 12'000</li>
<li><strong>MX2000 / High Tech:</strong> CHF 12'000 – 18'000</li>
<li><strong>MX8 mit Sonderausstattung:</strong> CHF 15'000 – 25'000</li>
<li><strong>SCO Seitenschloss:</strong> CHF 30'000 – 50'000</li>
<li><strong>Extra/Extra Gold:</strong> CHF 50'000 – 100'000+</li>
</ul>
<p>Gebrauchte Perazzi halten ihren Wert ausgezeichnet. Eine gut erhaltene MX8 aus den 1990er-Jahren wird für CHF 5'000 – 8'000 gehandelt. Seltene Modelle und Seitenschloss-Ausführungen können im Preis sogar steigen. Der Schweizer Markt ist klein, aber es gibt eine treue Perazzi-Gemeinde, besonders unter Trap- und Sporting-Schützen. Waffenerwerbsschein (WES) ist erforderlich.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Perazzi-Flinten sind für intensive Nutzung gebaut — manche Wettkampfschützen verschiessen 50'000 bis 100'000 Patronen pro Jahr. Dennoch ist regelmässige Pflege unerlässlich:</p>
<ul>
<li><strong>Läufe:</strong> Nach jedem Schiesstag mit Laufreiniger und Bronzebürste reinigen. Blei- und Plastikrückstände entfernen.</li>
<li><strong>Trigger Group:</strong> Regelmässig entnehmen, reinigen und leicht ölen. Keine aggressiven Lösungsmittel verwenden.</li>
<li><strong>Basküle:</strong> Verriegelungsflächen prüfen und leicht fetten. Die Drehpunkte (Scharnier) benötigen gelegentlich einen Tropfen Öl.</li>
<li><strong>Schaft:</strong> Holzschaft mit Schaftöl oder Wachs pflegen. Synthetikschäfte mit Silikonspray behandeln.</li>
</ul>
<p>Als Zubehör empfehlen sich ein Ersatz-Abzugsmechanismus (CHF 800 – 1'500), hochwertige Wechselchokes und ein massgeschneiderter Waffenkoffer. Perazzi bietet einen hauseigenen Service in Brescia, der auch von Schweizer Kunden genutzt wird.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Perazzi ist die Referenz im Wettkampf-Flintenschiessen und eine Investition fürs Leben. Wer regelmässig Trap, Skeet oder Sporting schiesst und eine Flinte sucht, die exakt auf seine Körpermasse gefertigt wird, liegt mit Perazzi goldrichtig. Der Einstieg mit einer MX8 ab CHF 8'000 ist für ambitionierte Wettkampfschützen fair — die Flinte wird Jahrzehnte halten und ihren Wiederverkaufswert behalten.</p>
<p>Für Gelegenheitsschützen oder reine Jäger ist eine Perazzi allerdings überdimensioniert. Hier bieten Beretta, Browning oder Krieghoff ein besseres Preis-Leistungs-Verhältnis. Wer hingegen das Beste vom Besten will und bereit ist, auf eine Massanfertigung zu warten, wird mit einer Perazzi belohnt — mit italienischer Handwerkskunst, olympischer Präzision und dem Wissen, eine der besten Flinten der Welt in Händen zu halten.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Beretta, der älteste aktive Waffenhersteller der Welt, wurde 1526 in Gardone Val Trompia (Italien) gegründet und blickt auf fast 500 Jahre Erfahrung im Waffenbau zurück. Die Entwicklung der A400 begann Mitte der 2000er-Jahre als Nachfolgerin der erfolgreichen A300-Serie. Das Ziel war klar: die schnellste und zuverlässigste Selbstladeflinte der Welt zu bauen.</p>
<p>2010 wurde die A400 offiziell vorgestellt und setzte sofort neue Massstäbe. Das patentierte Blink-Gassystem war eine hauseigene Entwicklung, die den Gasweg optimierte und die Nachladezeit um über ein Drittel gegenüber herkömmlichen Gasdruckladern verkürzte. Die A400 wurde zum Verkaufsschlager bei Jägern und Wettkampfschützen gleichermassen und gewann in kurzer Zeit zahlreiche internationale Titel im Trap- und Skeetschiessen. Beretta entwickelt die Plattform kontinuierlich weiter — die aktuellen Modelle profitieren von optimierten Gaswegen und verbesserter Ergonomie.</p>

<h2>Technik & Konstruktion</h2>
<p>Das <strong>Blink-Gassystem</strong> ist das technische Highlight der A400. Es nutzt einen optimierten Gaskanal mit grösserem Querschnitt, der die Pulvergase effizienter ableitet und den Verschluss schneller zurückführt. Das System ist selbstreinigend: Überschüssige Gase werden automatisch abgeleitet, was die Wartungsintervalle verlängert.</p>
<p>Der <strong>Kick-Off-Rückstossdämpfer</strong> im Schaft besteht aus zwei gegenläufig arbeitenden Dämpfern, die den gefühlten Rückstoss um bis zu 40% reduzieren. Dies ist besonders bei langen Schiesstagen oder beim Verschiessen schwerer Magnum-Patronen ein enormer Vorteil. Das Gehäuse besteht aus einer leichten Aluminiumlegierung, die trotz geringem Gewicht höchste Belastbarkeit bietet.</p>
<p>Optional bietet Beretta das <strong>GunPod-System</strong> an — ein elektronisches Modul im Schaftende, das Schüsse zählt, Temperatur misst und Trainingsdaten auf dem Smartphone aufzeichnet. Die A400 verschiesst alles von leichten 24g-Trap-Patronen bis hin zu 63g-Magnum-Slugs ohne manuelle Anpassung.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>A400 Xtreme Plus:</strong> Die 3,5-Zoll-Magnum-Version für die Wasserjagd und harte Bedingungen. Camo-Beschichtung, verlängertes Magazin, extrem wetterfest.</li>
<li><strong>A400 Xcel:</strong> Die Wettkampf-Sporting-Version mit verlängerter Ladeklappe, Balance-Cap-System und optimiertem Schaft für schnelle Schussfolgen.</li>
<li><strong>A400 Upland:</strong> Leichte Jagdflinte mit klassischer Holzoptik für die Niederwildjagd. Schlankes Profil, schnelle Handhabung im Feld.</li>
<li><strong>A400 Lite:</strong> Die ultraleichte Version mit Aluminium-Gehäuse. Ab 2,9 kg in 20 Gauge — ideal für kleinere Schützen oder lange Jagdtage.</li>
<li><strong>A400 Action:</strong> Taktische Version mit Picatinny-Schiene, Pistolengriff-Option und kürzerem Lauf für den sportlichen Einsatz.</li>
<li><strong>A400 Cole Pro:</strong> Limitierte Sporting-Edition mit speziellem Finish und verbesserter Ergonomie.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Die A400 ist in <strong>12/76</strong> (3 Zoll) als Standardkaliber erhältlich. Die Xtreme-Version akzeptiert sogar <strong>12/89</strong> (3,5 Zoll) Magnum-Patronen — damit ist sie eine der wenigen Halbautomaten, die diese Belastung zuverlässig bewältigen. In <strong>20/76</strong> ist die A400 als besonders leichte Variante verfügbar.</p>
<p>Die Lauflängen reichen von 610mm (24 Zoll) bis 762mm (30 Zoll), wobei Jäger typischerweise 710mm (28 Zoll) und Sporting-Schützen 760mm bevorzugen. Die Optima-HP-Wechselchokes sind im Lieferumfang enthalten und bieten Engungen von Zylinder bis Vollchoke. Die verlängerten Optima-Choke-Plus-Varianten erzeugen ein gleichmässigeres Schrotbild mit weniger Deformation der Schrotkugeln.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Die Beretta A400 ist in der Schweiz über das offizielle Beretta-Händlernetz gut verfügbar. Die Preise staffeln sich wie folgt:</p>
<ul>
<li><strong>A400 Lite / Upland:</strong> CHF 1'500 – 1'900</li>
<li><strong>A400 Xcel Sporting:</strong> CHF 1'800 – 2'400</li>
<li><strong>A400 Xtreme Plus:</strong> CHF 1'900 – 2'500</li>
<li><strong>A400 Action:</strong> CHF 1'600 – 2'000</li>
<li><strong>A400 Cole Pro / Sonderedition:</strong> CHF 2'500 – 3'200</li>
</ul>
<p>Gebrauchte A400 in gutem Zustand werden für CHF 1'000 – 1'600 gehandelt. Die A400 verliert in den ersten Jahren rund 30–40% ihres Neupreises, stabilisiert sich dann aber auf einem soliden Niveau. Als meistverkaufte Selbstladeflinte in der Schweiz ist der Wiederverkauf unproblematisch. Waffenerwerbsschein (WES) ist erforderlich.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Trotz des selbstreinigenden Blink-Systems sollte die A400 regelmässig gepflegt werden:</p>
<ul>
<li><strong>Gassystem:</strong> Alle 500–1000 Schuss den Gaskolben und die Gasbohrung reinigen. Karbonablagerungen mit speziellem Lösungsmittel entfernen.</li>
<li><strong>Lauf:</strong> Nach jedem Schiesstag durchputzen. Wechselchokes herausschrauben und Gewinde fetten.</li>
<li><strong>Verschluss:</strong> Regelmässig reinigen und leicht ölen. Die Verschlussführungen im Gehäuse sauber halten.</li>
<li><strong>Kick-Off-Dämpfer:</strong> Alle 5'000 Schuss auf Verschleiss prüfen. Ersatzdämpfer kosten ca. CHF 50.</li>
</ul>
<p>Empfehlenswertes Zubehör: Verlängerungsmagazin (CHF 80–120), GunPod-Elektronik (CHF 150), Beretta-Waffenkoffer (CHF 200–400) und ein Satz Extended-Wechselchokes (CHF 30–50 pro Stück).</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die Beretta A400 ist die vielseitigste Selbstladeflinte auf dem Markt und für die meisten Jäger und Sporting-Schützen die beste Wahl in ihrer Preisklasse. Das Blink-System liefert eine konkurrenzlose Schussfolge, der Kick-Off-Dämpfer macht lange Schiesstage angenehm, und die Zuverlässigkeit ist legendär.</p>
<p>Für Jäger empfiehlt sich die Upland oder Xtreme Plus, für Wettkampfschützen die Xcel. Wer ein besonders leichtes Gewehr sucht, greift zur 20-Gauge-Lite. Mit einem Neupreis ab CHF 1'500 bietet die A400 ein ausgezeichnetes Preis-Leistungs-Verhältnis — eine Investition, die sich über viele tausend Schuss bezahlt macht.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Die Geschichte der Benelli M2 beginnt 1967, als der italienische Ingenieur Bruno Civolani das revolutionäre Inertia-Driven-System erfand. Dieses System nutzt die Masseträgheit statt Gasdruck, um den Nachladevorgang anzutreiben — ein radikal anderer Ansatz als bei konventionellen Selbstladeflinten. Benelli setzte das System ab 1969 in seinen Flinten ein und wurde damit zum Pionier einer neuen Technologie.</p>
<p>Die M1 Super 90, eingeführt 1992, machte das Inertia-System weltweit populär und wurde besonders bei der Jagd geschätzt. 2004 folgte die M2 als konsequente Weiterentwicklung mit dem neuen ComforTech-Rückstossdämpfungs-System und einer verbesserten Abzugsgruppe. Die M2 wurde schnell zur meistverkauften Selbstladeflinte für die Jagd in Europa. Benelli gehört seit 2000 zur Beretta Holding, operiert aber als eigenständige Marke mit eigener Fertigung in Urbino (Italien). Die M2 wird kontinuierlich weiterentwickelt und ist heute in der dritten Generation erhältlich.</p>

<h2>Technik & Konstruktion</h2>
<p>Das <strong>Inertia-Driven-System</strong> ist das technische Herzstück der M2 und funktioniert grundlegend anders als Gasdrucklader. Beim Schuss bewegt sich der gesamte Lauf und das Gehäuse kurz nach hinten, während der schwere Verschlusskopf durch seine Trägheit stehen bleibt. Zwischen Verschlusskopf und Verschlussträger sitzt eine starke Feder, die komprimiert wird und dann den Verschluss nach hinten schleudert — die leere Hülse wird ausgeworfen und eine neue Patrone zugeführt.</p>
<p>Der grosse Vorteil: Es gibt keinen Gaskanal, keinen Gaskolben und keine Gasbohrung im Lauf. Dadurch ist die M2 leichter, sauberer und wartungsärmer als jeder Gaslader. Der Lauf bleibt frei von Gasrückständen, und die gesamte Mechanik verschmutzt wesentlich weniger. Der <strong>ComforTech-Schaft</strong> verwendet ein System aus Gelzellen und synthetischen Chevrons, die bis zu 48% des Rückstosses absorbieren.</p>
<p>Das Gehäuse besteht aus einer hochwertigen Aluminiumlegierung, der Verschluss aus gehärtetem Stahl. Der Rotationsverschluss verriegelt mit zwei Verriegelungswarzen im Laufgewinde — ein extrem sicheres und bewährtes System. Die gesamte Flinte kann ohne Werkzeug in ihre Hauptkomponenten zerlegt werden.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>M2 Field:</strong> Das Jagd-Standardmodell mit klassischem Holz- oder Kunststoffschaft. Verfügbar in verschiedenen Lauflängen und Camo-Ausführungen.</li>
<li><strong>M2 Comfortech:</strong> Mit dem vollständigen ComforTech-Rückstossdämpfungssystem. Besonders empfehlenswert für intensive Nutzung und empfindliche Schützen.</li>
<li><strong>M2 Tactical:</strong> Kurzer 470mm-Lauf mit Ghost-Ring-Visier und Picatinny-Schiene. Für den taktischen Einsatz und sportliches Dynamic-Shotgun-Schiessen.</li>
<li><strong>M2 Speed:</strong> Performance-Version für den Parcours mit verlängerter Ladeklappe und optimiertem Schaft für schnelle Zielerfassung.</li>
<li><strong>M2 SP:</strong> Die Sporting-Version mit langem 760mm-Lauf, erhöhter Schiene und Wettbewerbsausstattung.</li>
<li><strong>M2 Turkey:</strong> Speziell für die Truthahnjagd mit extra-engem Choke und Tarnmuster.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Die M2 ist in <strong>12/76</strong> (3 Zoll Magnum) als Hauptkaliber erhältlich. Die 20/76-Version ist besonders leicht und eignet sich hervorragend für die Niederwildjagd und kleinere Schützen. Das Inertia-System benötigt eine gewisse Mindestrückstossenergie, um zuverlässig zu funktionieren — ultraleichte Patronen unter 24g können gelegentlich zu Ladehemmungen führen.</p>
<p>Die Lauflängen reichen von 470mm (Tactical) über 660mm und 710mm (Jagd-Standard) bis 760mm (Sporting). Benelli liefert standardmässig ein Set von fünf Crio-Wechselchokes (Zylinder, Viertel, Halb, Dreiviertel, Voll). Das Crio-System mit kryogenisch behandelten Läufen sorgt für gleichmässigere Schrotbilder und reduzierte Bleiablagerungen. Die Mündungsgeschwindigkeit liegt je nach Laborierung bei 380–430 m/s.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Die Benelli M2 ist in der Schweiz über Fachhändler und den Beretta/Benelli-Vertrieb erhältlich. Aktuelle Preise:</p>
<ul>
<li><strong>M2 Field (Kunststoff):</strong> CHF 1'400 – 1'700</li>
<li><strong>M2 Comfortech:</strong> CHF 1'600 – 1'900</li>
<li><strong>M2 Speed / SP:</strong> CHF 1'800 – 2'200</li>
<li><strong>M2 Tactical:</strong> CHF 1'500 – 1'800</li>
<li><strong>M2 Camo-Ausführungen:</strong> CHF 1'700 – 2'100</li>
</ul>
<p>Gebrauchte M2 in gutem Zustand werden für CHF 900 – 1'300 gehandelt. Die M2 hält ihren Wert gut, da sie als die zuverlässigste Jagd-Selbstladeflinte gilt. Der Gebrauchtmarkt in der Schweiz ist lebhaft — M2 werden häufig gehandelt. Waffenerwerbsschein (WES) ist erforderlich.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Die M2 ist dank des gaslosen Inertia-Systems besonders pflegeleicht:</p>
<ul>
<li><strong>Lauf:</strong> Nach jedem Schiesstag reinigen. Crio-Läufe sind etwas schmutzresistenter als konventionelle Läufe.</li>
<li><strong>Verschluss:</strong> Die Inertia-Feder und den Verschlusskopf regelmässig reinigen und leicht ölen. Kein übermässiges Öl verwenden.</li>
<li><strong>Gehäuse:</strong> Innen sauber halten. Da kein Gas ins Gehäuse gelangt, verschmutzt es wesentlich weniger als bei Gasladern.</li>
<li><strong>ComforTech-Elemente:</strong> Gelzellen und Chevrons auf Risse prüfen. Ersatz bei Benelli verfügbar.</li>
</ul>
<p>Empfehlenswertes Zubehör: Magazinverlängerung (CHF 80–120), Nordic-Components-Ladetuben, Extended-Wechselchokes (CHF 35–60) und ein Benelli-Waffenkoffer (CHF 150–300).</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die Benelli M2 ist die beste Wahl für Jäger, die eine leichte, zuverlässige und wartungsarme Selbstladeflinte suchen. Das Inertia-System ist dem Gasdrucksystem in Sachen Sauberkeit und Gewicht überlegen. Wer bei jedem Wetter und in jeder Situation eine Flinte braucht, die einfach funktioniert, wird mit der M2 glücklich.</p>
<p>Im Vergleich zur Beretta A400 ist die M2 leichter und sauberer, aber die Schussfolge ist etwas langsamer und ultraleichte Patronen können Probleme machen. Für die Jagd ist die M2 die erste Wahl, für reines Wettkampf-Sporting könnte die A400 Xcel die bessere Option sein. Mit einem Neupreis ab CHF 1'400 bietet die M2 ein hervorragendes Preis-Leistungs-Verhältnis.</p>`,
    rechtsstatus: 'wes',
    typischeKaliber: ['12/70', '20/70'],
    tags: ['Flinte', 'Benelli', 'M2', 'Inertie', 'Halbautomatisch'],
    relatedSlugs: ['beretta-a400', 'benelli-supernova', 'browning-a5', 'mossberg-500'],
  },

  {
    slug: 'benelli-supernova',
    titel: 'Benelli SuperNova',
    kategorie: 'Flinte',
    hersteller: 'Benelli',
    baujahr: '2006',
    kurzbeschreibung: 'Pump-Action mit Polymer-Chassis und ComforTech Rückstoss-System. Sehr robust.',
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Benelli, weltweit bekannt für seine Inertia-Selbstladeflinten, wagte 1999 einen unerwarteten Schritt: den Einstieg in den Markt der Pumpflinten mit der Nova. Dieser Entscheid war strategisch motiviert — Benelli wollte ein robustes, preiswertes Modell für Jäger anbieten, die eine manuelle Flinte bevorzugen. Die Nova war von Anfang an radikal anders konzipiert als konventionelle Pumpflinten.</p>
<p>Das Besondere an der Nova war das sogenannte Monoblock-Design: Der Polymerschaft wird direkt um das Stahlgehäuse gespritzt und bildet eine untrennbare, monolithische Einheit. Dieses Verfahren eliminiert die bei herkömmlichen Pumpflinten übliche Verschraubung zwischen Schaft und Gehäuse — eine potenzielle Schwachstelle. 2006 folgte die SuperNova als verbesserte Version mit dem ComforTech-Rückstossdämpfungssystem und der Möglichkeit, 3,5-Zoll-Magnum-Patronen (12/89) zu verschiessen. Damit gehört die SuperNova zu den wenigen Pumpflinten weltweit, die diese extremen Belastungen bewältigen.</p>

<h2>Technik & Konstruktion</h2>
<p>Das <strong>Monoblock-Design</strong> ist das konstruktive Herzstück der SuperNova. Der glasfaserverstärkte Polymerschaft wird in einem Spritzgussverfahren direkt um das Stahlgehäuse gegossen. Es gibt keinen Spalt, keine Verschraubung und keine Möglichkeit, dass sich Schaft und Gehäuse lösen. Diese Konstruktion ist extrem widerstandsfähig gegen Stösse, Kälte, Feuchtigkeit und Salzwasser.</p>
<p>Der <strong>Rotationsverschluss</strong> verriegelt den Lauf mit mehreren Verriegelungswarzen — dasselbe bewährte System wie bei den Benelli-Selbstladeflinten. Die <strong>Dual-Action-Bars</strong> (doppelte Pumpstangen) stellen sicher, dass der Vorderschaft nicht verkanten kann, selbst wenn er unter Stress oder in ungünstiger Position betätigt wird. Dies ist ein kritischer Vorteil gegenüber Pumpflinten mit nur einer Action-Bar.</p>
<p>Der <strong>ComforTech-Schaft</strong> verwendet Gelzellen und synthetische Chevron-Elemente, die bis zu 35% des Rückstosses absorbieren. Besonders bei 3,5-Zoll-Magnum-Patronen, die einen erheblichen Rückstoss erzeugen, macht sich dieses System deutlich bemerkbar. Der Rotations-Rückstosspuffer im Schaftende fängt die Energie zusätzlich ab.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>SuperNova Jagd:</strong> Das Standardmodell mit 660mm oder 710mm Lauf, ComforTech-Schaft und komplettem Wechselchoke-Set. In Schwarz oder verschiedenen Camo-Mustern erhältlich.</li>
<li><strong>SuperNova Tactical:</strong> Kurzer 470mm-Lauf mit Ghost-Ring-Visier, Picatinny-Schiene und taktischem Pistolengriff. Für den sportlich-taktischen Einsatz.</li>
<li><strong>SuperNova Steady Grip:</strong> Mit festem Pistolengriff und kurzem Lauf, speziell konzipiert für die Truthahnjagd und das Schiessen aus dem Anschlag.</li>
<li><strong>Nova:</strong> Die günstigere Basisversion ohne ComforTech-System. Solide Pumpflinte zum attraktiven Preis.</li>
<li><strong>SuperNova Rifled Slug:</strong> Mit gezogenem Flintenlauf für Brenneke-Geschosse und Sabot-Slugs — präzise Kugelschüsse bis 100 Meter.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Die SuperNova ist für das Kaliber <strong>12/76</strong> (3 Zoll Magnum) als Standard ausgelegt, kann aber auch <strong>12/89</strong> (3,5 Zoll Super-Magnum) Patronen verschiessen. Diese Vielseitigkeit macht sie zur idealen Flinte für die Wasserjagd, wo schwere Stahlschrot-Magnum-Patronen Standard sind.</p>
<p>Die Lauflängen reichen von 470mm (Tactical) bis 762mm (30 Zoll). Für die Jagd werden typischerweise 660mm oder 710mm gewählt. Das Standard-Wechselchoke-Set umfasst fünf Crio-Chokes. Die SuperNova verschiesst zuverlässig alles von leichten 24g-Schrotpatronen bis zu 63g-Magnum-Stahlschroten. Die Mündungsgeschwindigkeit variiert je nach Laborierung zwischen 370 und 430 m/s.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Die SuperNova ist eine der preiswertesten Premium-Pumpflinten auf dem Schweizer Markt:</p>
<ul>
<li><strong>Nova (Basis):</strong> CHF 450 – 600</li>
<li><strong>SuperNova Jagd:</strong> CHF 550 – 750</li>
<li><strong>SuperNova Tactical:</strong> CHF 600 – 800</li>
<li><strong>SuperNova Camo:</strong> CHF 650 – 850</li>
<li><strong>SuperNova Steady Grip:</strong> CHF 600 – 800</li>
</ul>
<p>Gebrauchte SuperNova sind für CHF 350 – 550 erhältlich. Die Flinte hält ihren Wert gut, da sie als praktisch unzerstörbar gilt — eine 10 Jahre alte SuperNova funktioniert in der Regel tadellos. Der Wiederverkauf ist in der Schweiz unproblematisch. Waffenerwerbsschein (WES) ist erforderlich.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Die SuperNova ist für minimale Wartung konzipiert:</p>
<ul>
<li><strong>Lauf:</strong> Nach jedem Einsatz reinigen, besonders nach dem Verschiessen von Stahlschrot.</li>
<li><strong>Pumpenmechanismus:</strong> Die Dual-Action-Bars und die Führungsschienen gelegentlich reinigen und leicht ölen.</li>
<li><strong>Verschluss:</strong> Den Rotationsverschluss regelmässig reinigen. Leicht ölen, nicht überfetten.</li>
<li><strong>Polymerschaft:</strong> Mit warmem Wasser und Seife reinigen. Keine aggressiven Lösungsmittel verwenden.</li>
</ul>
<p>Empfehlenswertes Zubehör: Magazinverlängerung auf 7+1 (CHF 60–100), Wechselchokes in Spezial-Engungen (CHF 25–40), Neopren-Schaftüberzug für die Winterjagd (CHF 30) und eine Lauf-Wechselgarnitur (CHF 200–350) für den schnellen Umbau zwischen Jagd und Tactical.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die Benelli SuperNova ist die robusteste Pumpflinte auf dem Markt und eine exzellente Wahl für Jäger, die eine unverwüstliche, wartungsarme Flinte für harte Bedingungen suchen. Die Kombination aus Monoblock-Design, ComforTech-Rückstossdämpfung und 3,5-Zoll-Magnum-Fähigkeit ist einzigartig.</p>
<p>Im Vergleich zur Mossberg 500 bietet die SuperNova mehr Robustheit und Komfort, kostet aber auch mehr. Für die Wasserjagd und die Jagd bei extremem Wetter ist die SuperNova die erste Wahl. Wer eine zuverlässige Pumpflinte zum günstigen Preis sucht und auf den ComforTech-Komfort verzichten kann, greift zur Nova. Mit einem Neupreis ab CHF 550 ist die SuperNova eine lohnende Investition für Jahrzehnte zuverlässigen Dienst.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Die Mossberg 500 wurde 1961 von O.F. Mossberg & Sons in North Haven, Connecticut (USA), eingeführt und ist mit über 12 Millionen produzierten Exemplaren die meistverkaufte Pumpflinte der Welt. Oscar Frederick Mossberg gründete das Unternehmen 1919 als Hersteller erschwinglicher Jagdwaffen — die 500 wurde zum Inbegriff dieser Philosophie: maximale Zuverlässigkeit zum geringstmöglichen Preis.</p>
<p>Die Mossberg 500 ist die einzige Pumpflinte, die die strengen US-Militärprüfungen nach Mil-Spec 3443 bestanden hat. Seit den 1970er-Jahren dient sie als M590/M590A1 bei den US-Streitkräften. Im Laufe der Jahrzehnte wurde die 500 in unzähligen Varianten gefertigt — von der einfachen Jagdflinte über Trap-Modelle bis hin zu taktischen Versionen. Das Grunddesign blieb dabei stets gleich, was die Austauschbarkeit von Teilen und Zubehör über Jahrzehnte hinweg sicherstellt.</p>

<h2>Technik & Konstruktion</h2>
<p>Die Mossberg 500 zeichnet sich durch ein bewusst einfach gehaltenes Design aus, das auf maximale Zuverlässigkeit und leichte Wartung ausgelegt ist. Das Aluminiumgehäuse ist leicht und korrosionsbeständig. Der Verschluss verriegelt mit einer einzigen Verriegelungswarze direkt im Lauf — einfach, aber extrem belastbar.</p>
<p>Die <strong>Tang Safety</strong> (Sicherung oben auf dem Gehäuse) ist ein Markenzeichen der Mossberg. Sie liegt direkt unter dem Daumen und ist beidhändig bedienbar — ein ergonomischer Vorteil gegenüber der bei Remington üblichen Trigger-Guard-Sicherung. Die <strong>Dual-Action-Bars</strong> (doppelte Pumpstangen) verhindern ein Verkanten des Vorderschafts und gewährleisten eine zuverlässige Funktion selbst unter Stress.</p>
<p>Das geniale Laufwechsel-System erlaubt es, den Lauf in unter 30 Sekunden ohne Werkzeug zu tauschen. Der Lauf wird einfach durch Lösen der Magazinkappe abgezogen und durch einen anderen ersetzt. Damit kann dieselbe Waffe mit einem Jagdlauf (710mm), einem Trap-Lauf (762mm) oder einem taktischen Lauf (457mm) bestückt werden — maximale Vielseitigkeit zu minimalem Preis.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>500 Field:</strong> Die klassische Jagdflinte mit Holz- oder Kunststoffschaft, verfügbar in diversen Lauflängen und Konfigurationen.</li>
<li><strong>500 Tactical:</strong> Kurzer 470mm-Lauf, Pistolengriff, oft mit Hitzeschild und Picatinny-Schiene. Für sportlich-taktischen Einsatz.</li>
<li><strong>500 Combo:</strong> Zwei Läufe im Set — ein Jagdlauf und ein Slug-Lauf. Hervorragendes Preis-Leistungs-Verhältnis.</li>
<li><strong>590:</strong> Die Militärversion mit schwererem Lauf, Bajonetthalterung und erweitertem 8+1-Magazin. Schwererer Lauf für intensive Nutzung.</li>
<li><strong>590A1:</strong> Die Mil-Spec-Version mit Aluminium-Abzugsbügel, Stahlsicherung und dem schwersten Lauf. Das Modell, das die Militärtests bestanden hat.</li>
<li><strong>Shockwave:</strong> Kurzversion mit Raptor-Birdshead-Griff, ohne konventionellen Schaft. In den USA als Nicht-Gewehr klassifiziert.</li>
<li><strong>Retrograde:</strong> Nostalgische Version mit Holzmöbeln im klassischen Stil der 1960er-Jahre.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Die Mossberg 500 ist primär in <strong>12/76</strong> (3 Zoll Magnum) erhältlich — dem universellsten Flintenkaliber. Daneben gibt es Versionen in <strong>20/76</strong> (ideal für Jugendliche und kleinere Schützen) und <strong>.410 Bore</strong> (leichteste Option). Die 590er-Serie ist ausschliesslich in 12/76 verfügbar.</p>
<p>Die Lauflängen reichen von 457mm (18,5 Zoll, Tactical) bis 762mm (30 Zoll, Trap). Für die Jagd ist der 710mm-Lauf (28 Zoll) der Standard. Mossberg verwendet das Accu-Choke-Wechselchoke-System, das im Lieferumfang typischerweise drei Chokes umfasst (Viertel, Halb, Voll). Accu-Chokes sind weit verbreitet und günstig erhältlich. Die 500 verschiesst zuverlässig alle gängigen 12/70- und 12/76-Patronen, von leichten Trap-Ladungen bis zu Magnum-Schrotpatronen und Slugs.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Die Mossberg 500 ist in der Schweiz über spezialisierte Importeure und Fachhändler erhältlich. Als amerikanisches Produkt ist sie weniger weit verbreitet als europäische Pumpflinten, aber dank ihres hervorragenden Preis-Leistungs-Verhältnisses beliebt:</p>
<ul>
<li><strong>500 Field:</strong> CHF 400 – 600</li>
<li><strong>500 Tactical:</strong> CHF 500 – 700</li>
<li><strong>500 Combo (2 Läufe):</strong> CHF 550 – 750</li>
<li><strong>590:</strong> CHF 600 – 850</li>
<li><strong>590A1 Mil-Spec:</strong> CHF 800 – 1'100</li>
<li><strong>Shockwave:</strong> CHF 500 – 700</li>
</ul>
<p>Gebrauchte Mossberg 500 sind ab CHF 250 – 450 zu finden. Die Flinte verliert relativ wenig an Wert, da das Design seit über 60 Jahren bewährt ist und Ersatzteile günstig und überall erhältlich sind. Waffenerwerbsschein (WES) ist erforderlich.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Die Mossberg 500 ist für ihre Wartungsfreundlichkeit bekannt:</p>
<ul>
<li><strong>Lauf:</strong> Nach jedem Einsatz reinigen. Der Lauf ist schnell abnehmbar, was die Reinigung erleichtert.</li>
<li><strong>Pumpenmechanismus:</strong> Dual-Action-Bars und Führungsschienen gelegentlich ölen.</li>
<li><strong>Verschluss:</strong> Einfach zu reinigen — die Verschlussgruppe kann ohne Werkzeug entnommen werden.</li>
<li><strong>Magazinrohr:</strong> Innen sauber halten, damit die Magazinfeder frei gleiten kann.</li>
</ul>
<p>Die Mossberg 500 hat das grösste Zubehör-Ökosystem aller Pumpflinten: Wechselläufe (CHF 100–200), Hitzeschilde (CHF 30–50), Picatinny-Schienen (CHF 20–40), Magazinverlängerungen (CHF 50–80), Schaftsysteme von Magpul, Hogue und anderen (CHF 60–150). Praktisch jedes Bauteil kann individuell angepasst oder aufgerüstet werden.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die Mossberg 500 ist die preiswerteste zuverlässige Pumpflinte auf dem Markt und eine exzellente Wahl für Einsteiger, Jäger und Sportschützen mit begrenztem Budget. Die Tang Safety, das werkzeuglose Laufwechselsystem und die Mil-Spec-Qualität der 590er-Serie sind handfeste Vorteile.</p>
<p>Im Vergleich zur Benelli SuperNova ist die Mossberg weniger komfortabel (kein ComforTech) und etwas weniger robust verarbeitet, kostet dafür aber nur die Hälfte. Für die Jagd in der Schweiz empfiehlt sich die 500 Field oder Combo, für den taktisch-sportlichen Einsatz die 590A1. Mit einem Neupreis ab CHF 400 ist die Mossberg 500 die günstigste Möglichkeit, eine bewährte, militärerprobte Pumpflinte zu besitzen.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Die Browning Auto-5 ist ein Meilenstein der Waffengeschichte. John Moses Browning, der wohl genialste Waffenkonstrukteur aller Zeiten, entwarf die Auto-5 im Jahr 1898 als erste funktionsfähige Selbstladeflinte der Welt. Nach einem gescheiterten Deal mit Winchester lizenzierte Browning das Design 1902 an die belgische Fabrique Nationale (FN) in Herstal. Die Produktion begann im selben Jahr.</p>
<p>Die Auto-5 wurde über 96 Jahre ununterbrochen produziert (1902–1998) — ein Rekord, der in der Waffengeschichte seinesgleichen sucht. Über 3 Millionen Exemplare wurden in Belgien (FN), Japan (Miroku) und den USA (Remington, als Modell 11) gefertigt. Die Auto-5 diente im Ersten und Zweiten Weltkrieg, im Korea- und Vietnamkrieg und war über Jahrzehnte die beliebteste Jagdflinte Nordamerikas. 2012 lancierte Browning eine moderne Neuauflage unter dem Namen A5, die das ikonische Design mit moderner Technik verbindet.</p>

<h2>Technik & Konstruktion</h2>
<p>Die <strong>originale Auto-5</strong> (1902–1998) verwendete ein Langhub-Rückstosslader-System, das Browning eigens für diese Flinte entwickelte. Beim Schuss bewegen sich Lauf und Verschluss gemeinsam zurück, wobei der Lauf nach kurzem Weg gestoppt wird und der Verschluss weiterläuft, um die leere Hülse auszuwerfen und eine neue Patrone zuzuführen. Dieses System ist extrem zuverlässig, erzeugt aber einen charakteristisch starken Rückstoss. Der markante «Buckel» am Gehäuse (Square Back Receiver) ist das Erkennungszeichen der originalen Auto-5.</p>
<p>Die <strong>neue A5</strong> (seit 2012) verwendet das völlig andere <strong>Kinematic Drive System</strong>, das auf dem Inertia-Prinzip basiert. Ein gefederter Verschlusskörper nutzt die Masseträgheit, um den Nachladevorgang anzutreiben — ähnlich dem Benelli-System, aber mit eigener Browning-Konstruktion. Die neue A5 ist deutlich leichter als das Original und hat einen wesentlich geringeren Rückstoss. Das hump-back Design wurde als Hommage an das Original beibehalten, ist aber rein kosmetisch.</p>
<p>Beide Versionen verwenden einen Rotationsverschluss für die Laufverriegelung. Die neue A5 verfügt zudem über den Inflex-Rückstosspuffer, der die Energie nach unten ableitet und den Kopfstoss (Schaftschlag gegen die Wange) reduziert.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>Auto-5 (1902–1998):</strong> Das historische Original in diversen Ausführungen. Standardmodell, Magnum, Light Twelve, Sweet Sixteen. Beliebte Sammlerstücke.</li>
<li><strong>A5 Hunter (2012–heute):</strong> Das moderne Jagd-Standardmodell mit Holzschaft und glänzendem Finish. Klassische Optik mit moderner Technik.</li>
<li><strong>A5 Stalker:</strong> Matt-schwarzes Finish mit Kunststoffschaft. Robust und pflegeleicht für den harten Jagdeinsatz.</li>
<li><strong>A5 Sweet Sixteen:</strong> Die Neuauflage in 16 Gauge — leichter und eleganter als die 12er-Version. Ein Tribut an die legendäre Sweet Sixteen der 1950er-Jahre.</li>
<li><strong>A5 Camo:</strong> Verschiedene Tarnmuster (Mossy Oak, Realtree) für die Wasserjagd und Tarnstellung.</li>
<li><strong>A5 Wicked Wing:</strong> Speziell für die Wasserjagd mit Cerakote-Beschichtung, verlängertem Magazin und 3,5-Zoll-Magnum-Fähigkeit.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Die <strong>originale Auto-5</strong> war in <strong>12/70</strong>, <strong>16/70</strong> (Sweet Sixteen) und <strong>20/70</strong> erhältlich. Spätere Magnum-Versionen akzeptierten auch 12/76. Die historischen 16er-Modelle sind bei Sammlern besonders begehrt.</p>
<p>Die <strong>neue A5</strong> ist in <strong>12/76</strong> (3 Zoll) als Standard und <strong>12/89</strong> (3,5 Zoll, Wicked Wing) erhältlich. Die Sweet Sixteen verwendet <strong>16/70</strong>. Die Lauflängen der neuen A5 reichen von 660mm (26 Zoll) bis 762mm (30 Zoll). Browning verwendet das Invector-DS-Wechselchoke-System mit drei Standard-Chokes im Lieferumfang. Das Kinematic-Drive-System arbeitet zuverlässig mit Patronen ab 28g Vorlage.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Browning-Produkte sind in der Schweiz über das FN/Browning-Händlernetz gut erhältlich:</p>
<ul>
<li><strong>A5 Hunter (neu):</strong> CHF 1'500 – 1'800</li>
<li><strong>A5 Stalker (neu):</strong> CHF 1'400 – 1'700</li>
<li><strong>A5 Sweet Sixteen:</strong> CHF 1'600 – 1'900</li>
<li><strong>A5 Wicked Wing:</strong> CHF 1'800 – 2'200</li>
<li><strong>Auto-5 Original (gebraucht):</strong> CHF 500 – 2'500 (je nach Zustand und Seltenheit)</li>
<li><strong>Auto-5 Sweet Sixteen Original:</strong> CHF 800 – 3'500 (Sammlerwert)</li>
</ul>
<p>Originale Auto-5 in gutem Zustand sind gesuchte Sammlerstücke. Belgische FN-Produktionen (vor 1975) erzielen höhere Preise als japanische Miroku-Fertigungen (ab 1975). Die neue A5 verliert in den ersten Jahren rund 30% ihres Neupreises. Waffenerwerbsschein (WES) ist erforderlich.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<ul>
<li><strong>Originale Auto-5:</strong> Die Reibungsringe (Friction Rings) im Rückstosssystem müssen korrekt eingestellt sein — falsche Einstellung führt zu Funktionsstörungen. Regelmässig reinigen und ölen. Verschleissteile wie Auswerferfeder und Reibungsringe prüfen.</li>
<li><strong>Neue A5:</strong> Kinematic-Drive-System ist weitgehend wartungsfrei. Lauf nach jedem Schiesstag reinigen. Verschluss und Gehäuse gelegentlich reinigen und leicht ölen.</li>
<li><strong>Holzschäfte:</strong> Mit hochwertigem Schaftöl pflegen. Originale Auto-5-Schäfte sind oft aus Nussbaum und erfordern besondere Aufmerksamkeit.</li>
<li><strong>Wechselchokes:</strong> Gewinde regelmässig fetten. Nie ohne Choke schiessen.</li>
</ul>
<p>Für originale Auto-5 sind Ersatzteile über Browning-Service und Spezialanbieter wie Numrich erhältlich. Die neue A5 verwendet Standard-Invector-DS-Chokes und hat eine gute Ersatzteilversorgung.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die Browning A5 vereint Geschichte und Moderne wie kaum eine andere Flinte. Wer eine der wichtigsten Waffenkonstruktionen der Geschichte besitzen möchte, greift zur originalen Auto-5 — als Sammlerstück und funktionale Jagdflinte gleichermassen faszinierend. Wer moderne Technik im klassischen Design sucht, wählt die neue A5 mit Kinematic Drive.</p>
<p>Die neue A5 konkurriert direkt mit der Benelli M2 (gleiches Inertia-Prinzip) und bietet ein vergleichbares Leistungsniveau bei eigenständigem Design. Für Sammler und Liebhaber ist die Auto-5 ein Muss, für pragmatische Jäger eine von vielen guten Optionen in der Preisklasse um CHF 1'500.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Die Bockbüchsflinte (BBF) hat ihre Wurzeln im 19. Jahrhundert, als europäische Büchsenmacher begannen, Flinten- und Büchsenläufe in einer einzigen Waffe zu kombinieren. Die Idee war pragmatisch: Ein Jäger auf der Niederwildjagd trifft sowohl auf Flugwild (Schrot) als auch auf Raubwild oder Rehwild (Kugel) — mit einer BBF ist er auf beides vorbereitet, ohne eine zweite Waffe tragen zu müssen.</p>
<p>Die BBF ist ein typisch mitteleuropäisches Konzept. In Nordamerika oder Grossbritannien ist sie praktisch unbekannt, während sie in Deutschland, Österreich und der Schweiz seit über 150 Jahren zur Grundausstattung vieler Jäger gehört. Deutsche und österreichische Büchsenmacher wie Merkel, Krieghoff, Blaser, Sauer und Ferlach-Meisterbüchsenmacher haben die BBF zur Perfektion entwickelt. Der Drilling — eine Erweiterung mit drei Läufen — ist die konsequente Weiterentwicklung des BBF-Konzepts und gilt als die «typisch deutsche» Jagdwaffe schlechthin.</p>

<h2>Technik & Konstruktion</h2>
<p>Die BBF ist eine <strong>Kipplauf-Kombinationswaffe</strong> mit zwei übereinander liegenden Läufen: oben der glatte Flintenlauf (Schrot), unten der gezogene Büchsenlauf (Kugel). Der Jäger kann über einen Umschalter oder Schieber am Abzug wählen, welcher Lauf beim Betätigen des Abzugs gezündet wird. Bei Modellen mit zwei Abzügen (Doppelabzug) hat jeder Lauf seinen eigenen Abzug.</p>
<p>Die Verschlussverriegelung erfolgt typischerweise über einen <strong>Kersten-Verschluss</strong> (Doppelgreifer oben) oder einen <strong>Blitz-Verschluss</strong>. Die beiden Läufe sind verlötet oder verschraubt und werden als Laufbündel gemeinsam in die Basküle eingesetzt. Die Regulierung der Läufe — das exakte Zusammenschiessen beider Läufe auf einen Haltepunkt — ist eine der anspruchsvollsten Aufgaben des Büchsenmachers und bestimmt massgeblich die Qualität und den Preis einer BBF.</p>
<p>Der <strong>Drilling</strong> erweitert das Konzept um einen dritten Lauf: Typischerweise zwei Flintenläufe nebeneinander (oben) und ein Büchsenlauf (unten). Die Steuerung der drei Läufe erfolgt über eine Kombinationsschaltung mit Schieber und Abzügen. Der Drilling ist technisch anspruchsvoller und schwerer als die BBF, bietet aber noch mehr Vielseitigkeit.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>Bockbüchsflinte (BBF):</strong> Zwei Läufe übereinander — ein Flintenlauf und ein Büchsenlauf. Das Grundmodell der Kombinationswaffen. Leicht und handlich.</li>
<li><strong>Drilling:</strong> Drei Läufe — zwei Flintenläufe oben, ein Büchsenlauf unten. Die klassische deutsche Universaljagdwaffe. Schwerer als die BBF, aber vielseitiger.</li>
<li><strong>Vierling:</strong> Vier Läufe — typischerweise zwei Flinten- und zwei Büchsenläufe. Extrem selten und teuer. Ein Meisterstück der Büchsenmacherkunst.</li>
<li><strong>Bergstutzen:</strong> Zwei Büchsenläufe übereinander, ohne Flintenlauf. Für die Bergjagd, wo zwei verschiedene Kaliber (z.B. ein leichtes und ein schweres) gewünscht sind.</li>
<li><strong>Bockdrilling:</strong> Drei Läufe übereinander statt nebeneinander — eine seltene, besonders kompakte Variante.</li>
</ul>
<p>Führende Hersteller sind <strong>Merkel</strong> (Suhl), <strong>Krieghoff</strong> (Ulm), <strong>Blaser</strong> (Isny), <strong>Sauer</strong> (Eckernförde) und diverse Ferlacher Meisterbüchsenmacher aus Österreich.</p>

<h2>Kaliber & Ballistik</h2>
<p>Die Kaliberwahl bei einer BBF ist eine der wichtigsten Entscheidungen. Der <strong>Flintenlauf</strong> ist typischerweise in <strong>12/76</strong> (Standard) oder <strong>20/76</strong> (leichtere BBF) ausgeführt. Der <strong>Büchsenlauf</strong> kann in einer Vielzahl von Kalibern bestellt werden:</p>
<ul>
<li><strong>.222 Remington:</strong> Für Fuchs und kleines Raubwild. Geringer Rückstoss, flache Flugbahn.</li>
<li><strong>5,6×52R (.22 Savage):</strong> Klassisches Niederwildkaliber mit Randbefestigungshülse, ideal für Kipplaufwaffen.</li>
<li><strong>7×57R / 7×65R:</strong> Universelle Rehwildkaliber mit Rand. In der Schweiz und Deutschland sehr beliebt.</li>
<li><strong>.30-06 Springfield:</strong> Allround-Kaliber für alle europäischen Wildarten bis Rotwild.</li>
<li><strong>9,3×74R:</strong> Das klassische Drückjagdkaliber für schweres Wild (Wildschwein, Rotwild) in Kipplaufwaffen.</li>
</ul>
<p>Das «R» bei Kaliberbezeichnungen steht für «Rand» — eine Randpatrone, die speziell für Kipplaufwaffen konstruiert ist und ein zuverlässiges Ausziehen der Hülse gewährleistet.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Kombinationswaffen haben in der Schweiz eine treue Anhängerschaft, besonders bei Niederwild- und Drückjagd-Jägern:</p>
<ul>
<li><strong>Merkel BBF B3:</strong> CHF 3'500 – 5'000</li>
<li><strong>Blaser BBF 97:</strong> CHF 4'500 – 7'000</li>
<li><strong>Krieghoff BBF Teck:</strong> CHF 6'000 – 10'000</li>
<li><strong>Merkel Drilling 96K:</strong> CHF 5'000 – 8'000</li>
<li><strong>Krieghoff Drilling Neptun:</strong> CHF 8'000 – 15'000</li>
<li><strong>Ferlach-Meisterdrilling:</strong> CHF 15'000 – 50'000+</li>
</ul>
<p>Gebrauchte BBF und Drillinge sind in der Schweiz gut erhältlich, da viele ältere Jäger auf modernere Systeme (Blaser R8, etc.) umsteigen. Eine gut erhaltene Merkel-BBF aus den 1980er-Jahren ist für CHF 1'500 – 3'000 zu finden. Ältere Drillinge von Sauer oder Simson aus der Vorkriegszeit haben Sammlerwert und erzielen entsprechende Preise. Waffenerwerbsschein (WES) ist erforderlich.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<ul>
<li><strong>Laufpflege:</strong> Beide Läufe nach jedem Einsatz reinigen — der Büchsenlauf mit Messingbürste und Laufreiniger, der Flintenlauf mit Filzpfropfen und Flintenreiniger. Unterschiedliche Kaliber erfordern unterschiedliches Reinigungszubehör.</li>
<li><strong>Verschluss:</strong> Verriegelungsflächen regelmässig prüfen und leicht fetten. Den Scharnierstift gelegentlich ölen.</li>
<li><strong>Regulierung:</strong> Die Zusammenschuss-Regulierung der Läufe regelmässig auf der Schiessanlage überprüfen. Temperaturschwankungen und Alterung können die Treffpunktlage beeinflussen.</li>
<li><strong>Holzschaft:</strong> Hochwertiges Schaftöl verwenden. Den Schaft vor extremer Feuchtigkeit und Hitze schützen.</li>
</ul>
<p>Empfehlenswertes Zubehör: Ein gutes Zielfernrohr mit Schnellspannmontage (CHF 500 – 1'500), Einsteckläufe für zusätzliche Kaliber (CHF 300 – 800), und ein robuster Jagdrucksack mit Waffenfach.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die Bockbüchsflinte ist eine der vielseitigsten Jagdwaffen überhaupt und in der Schweiz bei der Niederwildjagd kaum zu ersetzen. Wer auf Fasanen und Hasen pirscht und gleichzeitig auf den Fuchs vorbereitet sein will, braucht eine BBF. Der Drilling erweitert diese Vielseitigkeit noch weiter und ist das ultimative «Ein-Waffe-für-alles»-Konzept.</p>
<p>Für Einsteiger empfiehlt sich eine Merkel BBF im mittleren Preissegment (CHF 3'500 – 5'000). Wer das Beste will, greift zum Krieghoff oder lässt sich in Ferlach eine Massanfertigung bauen. Eine gut gepflegte BBF oder ein Drilling ist eine Anschaffung fürs Leben — und oft ein Erbstück, das über Generationen weitergegeben wird.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Walther, gegründet 1886 von Carl Walther in Zella-Mehlis (Thüringen), ist einer der traditionsreichsten Waffenhersteller Deutschlands. Nach dem Zweiten Weltkrieg wurde das Unternehmen in Ulm an der Donau neu aufgebaut. Neben den legendären Pistolen (PP, PPK, P99) hat sich Walther als führender Hersteller von Wettkampf-Luftgewehren etabliert.</p>
<p>Die LG400 wurde 2010 als Nachfolgerin der erfolgreichen LG300 eingeführt und setzte sofort neue Massstäbe im 10-Meter-Luftgewehr-Wettkampf. Mit der LG400 wurden zahlreiche olympische Medaillen, Weltmeistertitel und Europameisterschaften gewonnen. Die Waffe wurde in enger Zusammenarbeit mit Spitzenschützen entwickelt und wird kontinuierlich verbessert. Walther dominiert zusammen mit Feinwerkbau und Anschütz den Markt der olympischen Luftgewehre. Die LG400 wird vollständig in Ulm gefertigt und durchläuft strenge Qualitätskontrollen, bevor sie das Werk verlässt.</p>

<h2>Technik & Konstruktion</h2>
<p>Die LG400 verwendet ein <strong>Pressluft-System (PCP — Pre-Charged Pneumatic)</strong> mit einer 200-bar-Druckluftkartusche. Beim Schuss wird ein präzise dosiertes Volumen komprimierter Luft freigegeben, das das 4,5mm-Diabolo durch den Lauf treibt. Der Regulator sorgt für konstanten Druck über die gesamte Kartuschenladung — typischerweise über 400 Schuss mit gleichbleibender Geschwindigkeit.</p>
<p>Der <strong>mechanische Abzug</strong> ist das Herzstück der Präzision. Er lässt sich ab einem Abzugsgewicht von nur 50 Gramm einstellen — so leicht, dass der Schuss bei minimaler Berührung bricht. Vorzugsweg, Druckpunkt und Abzugsposition sind individuell einstellbar. Das <strong>Absorber-System</strong> im Gehäuse reduziert Vibrationen beim Schuss auf ein absolutes Minimum und verhindert, dass Schwingungen die Flugbahn des Diabolos beeinflussen.</p>
<p>Der Lauf ist kaltgehämmert und mit einer speziellen Legierung beschichtet, die eine extrem glatte Innenfläche garantiert. Die Matchläufe erzielen auf 10 Meter Streukreise von unter 5mm — Schuss für Schuss. Der gesamte Schaft ist modular aufgebaut: Schaftlänge, Schaftbackenhöhe, Schaftkappenhöhe und -neigung, Handstoppposition und Vorderschaftbreite sind stufenlos einstellbar.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>LG400 Anatomic:</strong> Das Standard-Wettkampfmodell mit anatomisch geformtem Griff und vollständig einstellbarem Aluminiumschaft. Das Arbeitstier der Wettkampfschützen.</li>
<li><strong>LG400 Expert:</strong> Das Einstiegs-Wettkampfmodell mit etwas weniger Einstellmöglichkeiten, aber derselben Präzision. Ideal für aufsteigende Schützen.</li>
<li><strong>LG400 Competition:</strong> Das aktuelle Top-Modell mit allen verfügbaren Einstellmöglichkeiten, Carbon-Elementen und feinster Verarbeitung.</li>
<li><strong>LG400 Blacktec:</strong> Version mit schwarzem Schaft und modernem Design.</li>
<li><strong>LG500:</strong> Der Nachfolger mit MEC-Chassis-System. Noch mehr Einstellmöglichkeiten und ein modulares Schaftkonzept, das individuelle Anpassungen auf höchstem Niveau ermöglicht.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Die LG400 verwendet ausschliesslich Kaliber <strong>4,5mm (.177)</strong> — das Standardkaliber für den olympischen 10-Meter-Luftgewehr-Wettkampf. Verschossen werden <strong>Diabolos</strong> (taillierte Bleiprojektile) mit einem Gewicht von typischerweise 0,50 bis 0,53 Gramm.</p>
<p>Die Mündungsgeschwindigkeit liegt bei ca. <strong>170 m/s</strong>, was einer Mündungsenergie von rund <strong>7,5 Joule</strong> entspricht — exakt an der Grenze der in der Schweiz frei erhältlichen Luftgewehre. Die Flugzeit auf 10 Meter beträgt ca. 0,06 Sekunden. Die Präzision ist aussergewöhnlich: Spitzenschützen erzielen Streukreise von unter 4mm auf 10 Meter, Schuss für Schuss.</p>
<p>Die Wahl des richtigen Diabolos ist entscheidend für die Präzision. Führende Hersteller wie <strong>RWS</strong> (R10 Match), <strong>H&N</strong> (Finale Match) und <strong>JSB</strong> bieten speziell für Wettkampf-Luftgewehre optimierte Diabolos an. Jedes Gewehr hat seine «Lieblingsmunition» — Wettkampfschützen testen verschiedene Chargen, um die optimale Kombination zu finden.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Walther-Luftgewehre sind in der Schweiz über den Fachhandel und spezialisierte Schiesssport-Ausstatter erhältlich:</p>
<ul>
<li><strong>LG400 Expert:</strong> CHF 2'200 – 2'800</li>
<li><strong>LG400 Anatomic:</strong> CHF 2'800 – 3'500</li>
<li><strong>LG400 Competition:</strong> CHF 3'500 – 4'200</li>
<li><strong>LG500:</strong> CHF 3'800 – 4'500</li>
<li><strong>Gebrauchte LG400:</strong> CHF 1'500 – 2'500</li>
</ul>
<p>Zusätzlich benötigt man ein hochwertiges Diopter-Visier (CHF 300 – 800) und eine Schiessjacke (CHF 400 – 800). Gebrauchte LG400 sind bei Vereinen und auf Schiesssport-Börsen verfügbar und bieten ein gutes Preis-Leistungs-Verhältnis für Einsteiger in den Wettkampfsport. Luftgewehre bis 7,5 Joule sind in der Schweiz frei ab 18 Jahren — kein Waffenerwerbsschein nötig.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<ul>
<li><strong>Lauf:</strong> Regelmässig mit speziellem Luftgewehr-Filzpfropfen und Reinigungspellets reinigen. Keine aggressiven Lösungsmittel verwenden — Luftgewehrläufe sind empfindlicher als Feuerwaffenläufe.</li>
<li><strong>Druckluftkartusche:</strong> Nur mit sauberer, trockener Druckluft befüllen (nicht mit Sauerstoff oder CO2!). Die Kartusche fasst ca. 200 bar und liefert über 400 Schuss.</li>
<li><strong>Abzug:</strong> Nicht ölen — der mechanische Abzug arbeitet trocken. Einstellungen nur bei Bedarf ändern und dokumentieren.</li>
<li><strong>Dichtungen:</strong> Die O-Ring-Dichtungen im Druckluftsystem gelegentlich auf Verschleiss prüfen. Ersatzdichtungen bei Walther erhältlich.</li>
</ul>
<p>Unverzichtbares Zubehör: Diopter-Visier von Centra oder AHG (CHF 300 – 800), Druckluft-Füllstation oder Handpumpe (CHF 200 – 500), Schiessjacke und Schiesshandschuh (CHF 500 – 1'000), und ein stabiler Gewehrkoffer (CHF 100 – 300).</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die Walther LG400 ist eines der besten Wettkampf-Luftgewehre der Welt und die richtige Wahl für ambitionierte Schützen, die den 10-Meter-Wettkampf ernst nehmen. Die Präzision ist auf olympischem Niveau, die Einstellmöglichkeiten sind nahezu unbegrenzt, und die Verarbeitung ist «Made in Germany» auf höchstem Niveau.</p>
<p>Für Einsteiger im Wettkampfschiessen empfiehlt sich die LG400 Expert — sie bietet dieselbe Präzision wie die teureren Modelle bei etwas weniger Einstellmöglichkeiten. Wer das Maximum will, greift zur LG400 Competition oder zum Nachfolger LG500. Alternativen auf gleichem Niveau sind die Feinwerkbau 800 und die Anschütz 9015 — die Wahl zwischen diesen drei Marken ist letztlich eine Frage des persönlichen Geschmacks und des Anschlags.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Diana ist eine der ältesten und traditionsreichsten Luftgewehrmarken der Welt. Das Unternehmen wurde 1890 in Rastatt (Baden-Württemberg) als «Mayer & Grammelspacher» gegründet und begann mit der Produktion von Luftgewehren für den Freizeit- und Schiesssport. Der Markenname «Diana» — nach der römischen Göttin der Jagd — wurde schnell zum Synonym für solide deutsche Luftgewehr-Qualität.</p>
<p>Im Laufe des 20. Jahrhunderts entwickelte sich Diana zum grössten Luftgewehrhersteller Deutschlands. In den 1950er- und 1960er-Jahren erlebte die Marke ihre Blütezeit mit Modellen wie der Diana 27 und Diana 35, die in Millionenauflage produziert wurden. In den 2000er-Jahren durchlief das Unternehmen mehrere Eigentümerwechsel und firmiert heute als Diana Airguns / GSG (German Sport Guns). Die Produktion wurde teilweise nach China verlagert, aber die Kernmodelle werden weiterhin in Deutschland entwickelt und die Läufe in Rastatt gefertigt. Diana bedient heute das gesamte Spektrum von günstigen Einsteiger-Knickläufen bis hin zu PCP-Pressluftgewehren.</p>

<h2>Technik & Konstruktion</h2>
<p>Diana-Luftgewehre basieren auf zwei grundlegend verschiedenen Antriebssystemen:</p>
<p><strong>Federdruck-Knicklauf:</strong> Das klassische Diana-System. Beim Spannen wird der Lauf nach unten geknickt, was einen Kolben gegen eine starke Feder (Stahlfeder oder Gasdruckfeder) zurückzieht. Beim Schuss schnellt der Kolben nach vorne und komprimiert die Luft im Zylinder, die das Diabolo durch den Lauf treibt. Diana verwendet wahlweise eine konventionelle <strong>Unterspannfeder</strong> (Stahlfeder) oder eine <strong>Gasdruckfeder (N-TEC)</strong>, die wartungsfrei ist und keine Ermüdung zeigt.</p>
<p><strong>PCP-Pressluft:</strong> Bei Modellen wie der Stormrider und P1000 wird vorkomprimierte Druckluft aus einem Reservoir verwendet — dasselbe Prinzip wie bei der Walther LG400, aber in einer erschwinglicheren Ausführung. PCP-Modelle bieten höhere Präzision und die Möglichkeit des Repetierens (Mehrschuss-Magazin).</p>
<p>Der <strong>T06-Abzug</strong> ist ein Highlight der Diana-Knicklaufgewehre. Er ist einstellbar in Vorzugsweg und Abzugsgewicht und bietet für seine Preisklasse einen ausgezeichneten, definierten Druckpunkt. Die Läufe werden <strong>kaltgehämmert</strong> und mit Zügen versehen — eine Qualitätsstufe, die bei Luftgewehren in diesem Preissegment ungewöhnlich ist. Die kaltgehämmerten Läufe sind langlebiger und präziser als gezogene oder gepresste Läufe.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>Diana 240 Classic:</strong> Das Einsteiger-Knicklaufgewehr mit Holzschaft und ca. 7,5 Joule. Ideal für Jugendliche und Anfänger. In der Schweiz frei ab 18 Jahren.</li>
<li><strong>Diana 34 Premium:</strong> Das meistverkaufte Diana-Modell in der mittleren Leistungsklasse. Robust, präzise und mit dem T06-Abzug ausgestattet. Ca. 16–20 Joule.</li>
<li><strong>Diana 350 Magnum:</strong> Das leistungsstärkste Knicklauf-Modell mit bis zu 28 Joule Mündungsenergie. Für Schädlingsbekämpfung und ambitioniertes Freizeitschiessen.</li>
<li><strong>Diana 56 Target Hunter:</strong> Unterspannhebel-Modell (kein Knicklauf) mit feststehender Laufachse für höhere Präzision.</li>
<li><strong>Diana Stormrider:</strong> PCP-Pressluft-Repetierer mit 9-Schuss-Magazin. Deutlich präziser als Knicklaufmodelle, aber Druckluftquelle benötigt.</li>
<li><strong>Diana P1000:</strong> Das Wettkampf-Pressluftgewehr mit einstellbarem Schaft und Match-Abzug. Für ambitionierte Vereinsschützen.</li>
<li><strong>Diana Bandit:</strong> PCP-Luftpistole im kompakten Format für das Schiessen auf kurze Distanzen.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Diana-Luftgewehre sind typischerweise in zwei Kalibern erhältlich:</p>
<ul>
<li><strong>4,5mm (.177):</strong> Das Standardkaliber für Wettkampf und Freizeit. Flachere Flugbahn, höhere Geschwindigkeit, geringere Auftreffenergie. Ideal für Scheibenschiessen und leichte Schädlingsbekämpfung.</li>
<li><strong>5,5mm (.22):</strong> Grösseres Kaliber mit mehr Auftreffenergie, aber gekrümmterer Flugbahn. Bevorzugt für Schädlingsbekämpfung und Jagd (wo erlaubt).</li>
</ul>
<p>Die Mündungsgeschwindigkeiten variieren je nach Modell erheblich: Die Diana 240 erreicht ca. 170 m/s (7,5 Joule), die Diana 34 ca. 280 m/s (ca. 16 Joule), und die Diana 350 Magnum bis zu 380 m/s (ca. 28 Joule) mit leichten Diabolos. Die effektive Reichweite für präzises Schiessen liegt bei Knicklauf-Modellen bei ca. 25–35 Metern, bei PCP-Modellen bei 40–50 Metern.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Diana-Luftgewehre sind in der Schweiz über den Fachhandel, Online-Shops und Waffenbörsen gut erhältlich:</p>
<ul>
<li><strong>Diana 240 Classic:</strong> CHF 150 – 220</li>
<li><strong>Diana 34 Premium:</strong> CHF 280 – 380</li>
<li><strong>Diana 350 Magnum:</strong> CHF 350 – 480</li>
<li><strong>Diana 56 Target Hunter:</strong> CHF 450 – 600</li>
<li><strong>Diana Stormrider PCP:</strong> CHF 300 – 420</li>
<li><strong>Diana P1000:</strong> CHF 800 – 1'200</li>
</ul>
<p><strong>Wichtig für die Schweiz:</strong> Modelle bis 7,5 Joule Mündungsenergie sind frei ab 18 Jahren erhältlich — kein Waffenerwerbsschein nötig. Modelle über 7,5 Joule (wie die Diana 34, 350 Magnum, etc.) erfordern einen Waffenerwerbsschein (WES). Gebrauchte Diana-Gewehre sind ab CHF 80 – 200 erhältlich und bieten ein hervorragendes Preis-Leistungs-Verhältnis.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<ul>
<li><strong>Federdruck-Modelle:</strong> Den Lauf regelmässig mit Filzpfropfen reinigen. Die Kolbendichtung alle paar tausend Schuss prüfen. Kein Öl in den Kompressionszylinder geben — dies kann zum gefährlichen «Dieseln» führen (Selbstentzündung des Ölnebels).</li>
<li><strong>Gasdruckfeder (N-TEC):</strong> Wartungsfrei. Die Gasdruckfeder sollte nicht dauerhaft gespannt gelagert werden.</li>
<li><strong>PCP-Modelle:</strong> Druckluftreservoir nur mit sauberer, trockener Luft befüllen. O-Ring-Dichtungen gelegentlich prüfen und bei Bedarf ersetzen.</li>
<li><strong>Abzug:</strong> Den T06-Abzug nicht übermässig ölen. Einstellungen vorsichtig vornehmen.</li>
</ul>
<p>Empfehlenswertes Zubehör: Ein gutes Zielfernrohr (CHF 80 – 300, auf «Rückstossfest für Luftgewehr» achten!), eine Schiesstasche (CHF 30 – 80), hochwertige Diabolos von RWS, H&N oder JSB (CHF 8 – 15 pro 500 Stück), und für PCP-Modelle eine Handpumpe oder Tauchflasche mit Adapter (CHF 150 – 400).</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Diana-Luftgewehre sind die beste Wahl für Einsteiger, Freizeitschützen und alle, die ein solides, deutsches Luftgewehr zum fairen Preis suchen. Die Verarbeitung ist gut, die kaltgehämmerten Läufe bieten Präzision über dem Klassenniveau, und der T06-Abzug setzt Massstäbe in der Preisklasse.</p>
<p>Für den Einstieg empfiehlt sich die Diana 34 Premium — sie bietet das beste Gleichgewicht aus Leistung, Präzision und Preis. Wer maximale Leistung im Knicklauf sucht, greift zur 350 Magnum. Für präziseres Schiessen und Repetierkomfort ist die Stormrider PCP eine ausgezeichnete und erstaunlich günstige Option. Im Vergleich zur Konkurrenz (Weihrauch HW 97, BSA, Gamo) bietet Diana das beste Preis-Leistungs-Verhältnis bei solider deutscher Qualität.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Die Ära der Perkussionsrevolver begann in den 1830er-Jahren, als Samuel Colt 1836 seinen ersten Revolver patentieren liess — den Colt Paterson. Doch erst der <strong>Colt Walker</strong> (1847) und der <strong>Colt Dragoon</strong> (1848) brachten den kommerziellen Durchbruch. Diese massiven .44-Kaliber-Revolver wurden vom US-Militär übernommen und bewiesen die Überlegenheit des Revolverkonzepts gegenüber Einzelschuss-Pistolen.</p>
<p>Die bekanntesten Perkussionsrevolver entstanden in den 1850er- und 1860er-Jahren: Der <strong>Colt Navy 1851</strong> (.36 Kaliber) wurde zum Standardrevolver der US Navy und zum Lieblingsrevolver von Wild Bill Hickok. Der <strong>Colt Army 1860</strong> (.44 Kaliber) war die Hauptwaffe der Union im US-Bürgerkrieg. Der <strong>Remington 1858 New Army</strong> (.44) mit seinem geschlossenen Rahmen galt als robuster und wurde von vielen Soldaten bevorzugt. Mit der Einführung der Metallpatrone in den 1870er-Jahren endete die Ära der Perkussionsrevolver — aber ihr Erbe lebt in einer lebendigen Schwarzpulver-Schützenszene weiter. Heute werden originalgetreue Repliken vor allem von den italienischen Herstellern <strong>Pietta</strong> und <strong>Uberti</strong> produziert.</p>

<h2>Technik & Konstruktion</h2>
<p>Perkussionsrevolver sind <strong>Vorderlader</strong>: Die Trommelkammern werden von vorne geladen, nicht von hinten wie bei modernen Patronenrevolvern. Der Ladevorgang für eine Kammer umfasst mehrere Schritte:</p>
<ul>
<li>Schwarzpulver abmessen und in die Kammer füllen (typisch 20–30 Grains je nach Kaliber)</li>
<li>Rundkugel oder konisches Geschoss auf die Kammeröffnung setzen</li>
<li>Mit dem Ladehebel unter dem Lauf die Kugel in die Kammer pressen</li>
<li>Fett oder Wachspfropfen auf die Kammeröffnung auftragen (verhindert Durchzündung benachbarter Kammern)</li>
<li>Zündhütchen auf die Pistons am Trommelende setzen</li>
</ul>
<p>Dieser Vorgang wird für alle sechs Kammern wiederholt und dauert mehrere Minuten. Der Abzugsmechanismus ist <strong>Single Action</strong>: Der Hahn muss vor jedem Schuss manuell gespannt werden, was gleichzeitig die Trommel um eine Position weiterdreht. Der Schlagbolzen trifft auf das Zündhütchen, das den Zündstrahl durch einen Kanal ins Schwarzpulver leitet. Die Funktionsweise ist einfach, robust und — bei korrekter Handhabung — zuverlässig.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>Colt 1851 Navy (.36):</strong> Der elegante Revolver mit Oktagonallauf. Leichter und handlicher als die .44er-Modelle. Berühmt durch den US-Bürgerkrieg und den Wilden Westen.</li>
<li><strong>Colt 1860 Army (.44):</strong> Die Hauptbewaffnung der Unionskavallerie. Runder Lauf, schlankeres Profil als der Dragoon. Das beliebteste Replikenmodell.</li>
<li><strong>Remington 1858 New Army (.44):</strong> Geschlossener Rahmen (Top Strap) statt offener Rahmen wie bei Colt. Robuster, ermöglicht schnellen Trommelwechsel. Bei vielen Schwarzpulverschützen das bevorzugte Modell.</li>
<li><strong>Colt 1849 Pocket (.31):</strong> Kompakter 5-Schuss-Revolver. Leicht und tragbar, aber geringere Leistung.</li>
<li><strong>Colt 1848 Dragoon (.44):</strong> Der massige Vorläufer des Army. Schwerer, aber leistungsstärker.</li>
<li><strong>Rogers & Spencer (.44):</strong> Seltener, aber technisch fortschrittlich. Beliebt bei Wettkampfschützen wegen der guten Visierung.</li>
<li><strong>Ruger Old Army (.44):</strong> Moderner Perkussionsrevolver (1972–2008) mit modernen Fertigungsmethoden. Gilt als der präziseste und zuverlässigste Perkussionsrevolver überhaupt.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Perkussionsrevolver verwenden Rundkugeln aus Weichblei, die beim Einpressen in die Kammer leicht verformt werden und so gasdicht abschliessen. Die gängigen Kaliber:</p>
<ul>
<li><strong>.36 (Navy):</strong> Kugeldurchmesser ca. 9,1mm, Gewicht ca. 80 Grains (5,2g). Pulverladung ca. 15–20 Grains. Mündungsgeschwindigkeit ca. 230–280 m/s. Mündungsenergie ca. 150–200 Joule.</li>
<li><strong>.44 (Army):</strong> Kugeldurchmesser ca. 11,2mm, Gewicht ca. 140 Grains (9,1g). Pulverladung ca. 25–35 Grains. Mündungsgeschwindigkeit ca. 240–300 m/s. Mündungsenergie ca. 250–400 Joule.</li>
</ul>
<p>Als Treibladung dient <strong>Schwarzpulver</strong> (FFFg-Körnung) oder <strong>Schwarzpulverersatz</strong> wie Pyrodex. Rauchloses Pulver darf keinesfalls verwendet werden — es erzeugt zu hohe Drücke und kann den Revolver zerstören. Die effektive Reichweite liegt bei ca. 25–50 Metern, die Präzision ist aufgrund des Vorderlader-Prinzips naturgemäss geringer als bei modernen Waffen.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Perkussionsrevolver-Repliken sind in der Schweiz <strong>frei ab 18 Jahren</strong> erhältlich — kein Waffenerwerbsschein nötig! Dies macht sie zu einem beliebten Einstieg in die Welt der Schusswaffen:</p>
<ul>
<li><strong>Pietta Colt 1851 Navy:</strong> CHF 250 – 350</li>
<li><strong>Pietta Colt 1860 Army:</strong> CHF 280 – 400</li>
<li><strong>Uberti Remington 1858:</strong> CHF 350 – 500</li>
<li><strong>Pietta 1858 Target (einstellbare Visierung):</strong> CHF 380 – 500</li>
<li><strong>Ruger Old Army (gebraucht):</strong> CHF 800 – 1'500 (Sammlerwert, da nicht mehr produziert)</li>
<li><strong>Uberti Colt Walker:</strong> CHF 400 – 550</li>
</ul>
<p>Zusätzlich benötigt man Schwarzpulver (ca. CHF 30 pro 500g), Zündhütchen (CHF 8–12 pro 100 Stück), Bleikugeln (CHF 15–25 pro 100 Stück) und Reinigungszubehör. Schwarzpulver ist in der Schweiz frei erhältlich, muss aber sachgemäss gelagert werden.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Schwarzpulverwaffen erfordern deutlich mehr Pflege als moderne Waffen, da Schwarzpulverrückstände korrosiv (salzhaltig) sind:</p>
<ul>
<li><strong>Reinigung nach jedem Schiessen:</strong> Den Revolver komplett zerlegen. Alle Teile mit heissem Seifenwasser waschen (Schwarzpulverrückstände sind wasserlöslich). Gründlich trocknen und sofort einölen.</li>
<li><strong>Trommel:</strong> Die Kammern mit Messingbürste und Seifenwasser reinigen. Die Pistons (Zündkegel) herausschrauben und separat reinigen.</li>
<li><strong>Lauf:</strong> Mit Wasser durchputzen, trocknen, ölen. Schwarzpulverrust bildet sich innerhalb von Stunden, wenn nicht gereinigt wird.</li>
<li><strong>Mechanismus:</strong> Alle beweglichen Teile reinigen und leicht ölen. Die Handachse und den Ladehebel-Mechanismus prüfen.</li>
</ul>
<p>Unverzichtbares Zubehör: Pulvermass (CHF 15–30), Zündhütchensetzer (CHF 20–40), Kugelgiessform (CHF 30–60), Reinigungsset für Schwarzpulverwaffen (CHF 25–50), und eine feuerfeste Aufbewahrungsbox für Schwarzpulver.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Perkussionsrevolver sind faszinierende Waffen, die Geschichte lebendig machen. Das Laden, Schiessen und Reinigen ist ein Ritual, das eine ganz eigene Faszination ausübt. In der Schweiz sind sie als Vorderlader frei erhältlich — ein grosser Vorteil für Interessierte ohne Waffenerwerbsschein.</p>
<p>Für Einsteiger empfiehlt sich der <strong>Pietta Remington 1858</strong> — der geschlossene Rahmen ist robuster als die offenen Colt-Designs, und die Visierung ist besser. Wer das historische Flair des Wilden Westens sucht, greift zum Colt 1860 Army. Wichtig: Schwarzpulverschiessen erfordert Disziplin bei der Pflege — wer nach dem Schiessen nicht reinigen will, sollte die Finger davon lassen. Wer sich darauf einlässt, wird mit einem einzigartigen Schiesserlebnis belohnt.</p>`,
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
    inhalt: `<h2>Geschichte & Entwicklung</h2>
<p>Schreckschusswaffen (SSW) haben ihren Ursprung in den Theaterrequisiten und Signalpistolen des 19. Jahrhunderts. Bereits im Ersten Weltkrieg wurden spezielle Signalpistolen verwendet, die nur Leucht- und Knallmunition verschiessen konnten. Die moderne Schreckschusspistole in ihrer heutigen Form entstand in den 1950er-Jahren in Deutschland, als die Nachfrage nach legalen Selbstverteidigungsmitteln und Signalgebern stieg.</p>
<p>In Deutschland wurde das PTB-Prüfzeichen (Physikalisch-Technische Bundesanstalt) eingeführt, das garantiert, dass eine Schreckschusswaffe konstruktionsbedingt nicht zum Verschiessen von Projektilen umgebaut werden kann. Diese Prüfung ist zum internationalen Standard geworden. Heute werden SSW von zahlreichen Herstellern produziert — von etablierten Waffenfirmen wie Walther und Umarex bis zu spezialisierten Herstellern wie Zoraki (Türkei) und Ekol (Türkei). Der Markt ist in Europa gross, da SSW in vielen Ländern ohne Waffenerlaubnis erhältlich sind. In der Schweiz sind sie frei ab 18 Jahren.</p>

<h2>Technik & Konstruktion</h2>
<p>Der entscheidende konstruktive Unterschied zu scharfen Waffen ist der <strong>dauerhaft blockierte Lauf</strong>. Ein Stahlzapfen, Stahlstifte oder eine massive Verengung im Lauf verhindern physisch, dass ein Projektil den Lauf passieren könnte. Bei der PTB-Prüfung wird sichergestellt, dass diese Blockierung nicht ohne Zerstörung der Waffe entfernt werden kann — ein Umbau zur scharfen Waffe ist konstruktionsbedingt unmöglich.</p>
<p>Die Gase und der Knall treten je nach Konstruktion <strong>seitlich</strong> (durch Öffnungen am Laufende) oder <strong>nach vorne</strong> (durch verengte Kanäle am Zapfen vorbei) aus. Bei Reizstoff-Patronen wird der Wirkstoff (CS-Gas oder OC-Pfeffer) durch diese Öffnungen ausgestossen. Die Funktionsmechanik — Rückstosslader bei Pistolen, Revolvermechanismus bei Revolvern — ist identisch mit scharfen Waffen und bietet ein realistisches Handling und Schussgefühl.</p>
<p>Die Lautstärke beim Abfeuern beträgt ca. <strong>155–160 dB</strong> — vergleichbar mit einer scharfen Pistole und potenziell gehörschädigend. Das Tragen von Gehörschutz beim Schiessen ist daher zwingend empfohlen. Die Mündungsflamme bei Platzpatronen kann je nach Munition beeindruckend sein, insbesondere bei Revolver-SSW.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>Walther P22 Ready:</strong> Kompakte SSW-Pistole im Design der Walther P22. Zuverlässig, gut verarbeitet, deutsche Qualität. 7 Schuss Magazin.</li>
<li><strong>Walther P99 SSW:</strong> Lizenzkopie der legendären P99. Realistisches Handling, 15 Schuss Magazin. Eines der beliebtesten Modelle.</li>
<li><strong>Umarex Glock 17 Gen5:</strong> Offizielle Glock-Lizenz. Originalgetreues Design und Handling. Sehr beliebt wegen der Glock-Optik.</li>
<li><strong>Röhm RG 96:</strong> Klassischer SSW-Revolver. Robust und einfach in der Handhabung. Beeindruckende Mündungsflamme.</li>
<li><strong>Zoraki 917:</strong> Beretta-inspiriertes Design aus türkischer Produktion. Preisgünstig bei solider Funktion.</li>
<li><strong>Ekol Firat Magnum:</strong> Günstige SSW im Desert-Eagle-Stil. Beliebt bei Einsteigern wegen des niedrigen Preises.</li>
<li><strong>Reck Miami 92F:</strong> Beretta-92-Optik. Klassiker unter den SSW.</li>
<li><strong>Signalpistolen (Leuchtpistolen):</strong> Für maritime Signalgebung und Notsignale. Verschiessen Leuchtpatronen und Knallkörper.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Schreckschusswaffen verwenden spezielle Munition, die <strong>keine Projektile</strong> enthält:</p>
<ul>
<li><strong>9mm P.A.K. (Pistole Automatik Knall):</strong> Das Standardkaliber für SSW-Pistolen. Die am weitesten verbreitete SSW-Munition. Lauter Knall, sichtbarer Mündungsblitz.</li>
<li><strong>9mm R.K. (Revolver Knall):</strong> Für SSW-Revolver. Etwas anders dimensioniert als P.A.K.</li>
<li><strong>8mm P.A.K.:</strong> Kleineres Kaliber für kompaktere SSW. Etwas leiser als 9mm.</li>
<li><strong>.315:</strong> Spezialkaliber für bestimmte Revolver-SSW.</li>
<li><strong>15mm Signalmunition:</strong> Für Leucht- und Signalpistolen.</li>
</ul>
<p>Neben Platzpatronen (reiner Knall) gibt es <strong>Reizstoff-Patronen</strong> mit CS-Gas oder OC-Pfeffer (Reichweite ca. 3–5 Meter) und <strong>Signalpatronen</strong> (Leuchtmunition, Pfeifpatronen). Die Geschossenergie ist definitionsgemäss null — es wird kein Projektil verschossen. Dennoch können die austretenden heissen Gase auf sehr kurze Distanz (unter 1 Meter) Verbrennungen verursachen.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Schreckschusswaffen sind in der Schweiz <strong>frei ab 18 Jahren</strong> erhältlich — kein Waffenerwerbsschein und kein Kaufvertrag nötig. Die Preise sind moderat:</p>
<ul>
<li><strong>Ekol / Zoraki Einstiegsmodelle:</strong> CHF 60 – 120</li>
<li><strong>Röhm Revolver-SSW:</strong> CHF 120 – 200</li>
<li><strong>Walther P22 Ready:</strong> CHF 150 – 220</li>
<li><strong>Walther P99 SSW:</strong> CHF 180 – 280</li>
<li><strong>Umarex Glock 17 Gen5 SSW:</strong> CHF 200 – 300</li>
<li><strong>Signalpistolen (Leuchtpistolen):</strong> CHF 80 – 200</li>
</ul>
<p>Munitionspreise: 9mm P.A.K. Platzpatronen ca. CHF 12–18 pro 50 Stück, Reizstoff-Patronen ca. CHF 15–25 pro 10 Stück. Gebrauchte SSW werden für 40–60% des Neupreises gehandelt. Das Mitführen im öffentlichen Raum kann kantonal eingeschränkt sein — informieren Sie sich über die kantonalen Bestimmungen.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<ul>
<li><strong>Reinigung:</strong> Nach jedem Schiessen den Lauf (soweit zugänglich) und den Verschluss reinigen. Platzpatronen erzeugen erhebliche Rückstände, die korrosiv wirken können.</li>
<li><strong>Mechanismus:</strong> Verschluss und Abzugsmechanismus regelmässig reinigen und leicht ölen. SSW-Mechaniken sind identisch mit scharfen Waffen und erfordern dieselbe Pflege.</li>
<li><strong>Magazin:</strong> Magazinfeder und Magazingehäuse sauber halten. Rückstände können Zuführprobleme verursachen.</li>
<li><strong>Lagerung:</strong> Trocken und sicher aufbewahren. Obwohl kein Waffenschrank gesetzlich vorgeschrieben ist, empfiehlt sich eine abschliessbare Aufbewahrung.</li>
</ul>
<p>Sinnvolles Zubehör: Gehörschutz (unverzichtbar, CHF 15–80), Reinigungsset (CHF 15–30), Ersatzmagazine (CHF 20–40), Holster (CHF 20–50), und eine Aufbewahrungsbox (CHF 30–60).</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Schreckschusswaffen sind in der Schweiz eine legale und unkomplizierte Möglichkeit, das Handling und die Mechanik von Pistolen und Revolvern kennenzulernen — ohne Waffenerwerbsschein und ohne bürokratische Hürden. Sie eignen sich als Signalgeber, für Theaterproduktionen, als Startpistolen im Sport und für das Training des Waffenhandlings.</p>
<p>Für den Einstieg empfiehlt sich die <strong>Walther P22 Ready</strong> — kompakt, zuverlässig und gut verarbeitet. Wer ein realistischeres Handling wünscht, greift zur Walther P99 SSW oder zur Umarex Glock 17. Von sehr günstigen Modellen unter CHF 60 ist abzuraten — die Verarbeitung und Zuverlässigkeit leiden deutlich. Wichtig: Schreckschusswaffen sind keine Spielzeuge. Der Knall kann gehörschädigend sein, und die heissen Gase können auf kurze Distanz Verletzungen verursachen. Verantwortungsvoller Umgang ist Pflicht.</p>`,
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
