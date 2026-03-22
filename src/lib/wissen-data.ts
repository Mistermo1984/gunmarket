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
  youtubeStart?: number
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
  },

  {
    slug: 'hk-usp',
    titel: 'Heckler & Koch USP',
    kategorie: 'Pistole',
    hersteller: 'Heckler & Koch',
    baujahr: '1993',
    kurzbeschreibung: 'Deutsche Präzision von HK. Polymer-Rahmen mit O-Ring Rückstoßdämpfer. Bei Spezialeinheiten beliebt.',
    inhalt: `## Die Heckler und Koch USP, die Universelle Selbstladepistole, ist ein Meilenstein in der Geschichte der modernen Dienstpistolen. Was die USP besonders macht, ist ihre Kombination aus einem robusten Polymerrahmen mit Stahleinlagen, einem patentierten Rückstoss-Puffersystem und einer beispiellosen Modularität bei den Abzugskonfigurationen. Zehn verschiedene Abzugsvarianten, drei verfügbare Kaliber und eine Reihe von Grössen machen die USP zu einem der vielseitigsten Pistolensysteme, die je entwickelt wurden. Dazu kommt die sprichwörtliche HK-Qualität, die sich in einer Lebensdauer von über 20000 Schuss ohne wesentlichen Verschleiss niederschlägt. 
Die Entwicklung der USP begann Ende der 1980er-Jahre bei Heckler und Koch in Oberndorf am Neckar. HK erkannte früh, dass der US-Behördenmarkt, damals der grösste Abnehmer von Dienstpistolen, zunehmend das Kaliber .40 S&W bevorzugte. Sie war die erste Pistole mit integrierter Zubehörschiene (Picatinny) und wurde für das .40 S&W Kaliber optimiert — der damalige Standard bei US-Behörden.

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
    youtubeVideoId: 'x3ZibgX_o1U',
    youtubeQuelle: 'Waidwissen',
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
