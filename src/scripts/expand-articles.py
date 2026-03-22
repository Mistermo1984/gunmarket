#!/usr/bin/env python3
"""Expand 10 wiki articles in wissen-data.ts to 800+ words each."""

import os

FILE = os.path.join(os.path.dirname(__file__), '..', 'lib', 'wissen-data.ts')

with open(FILE, 'r') as f:
    content = f.read()

count = 0

# ──────────────────────────────────────────────
# 1. MAUSER K98
# ──────────────────────────────────────────────
OLD_MAUSER = """## Mauser K98k — Das Gewehr des Zweiten Weltkriegs
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
Waffenerwerbsschein (WES) erforderlich."""

NEW_MAUSER = """<h2>Geschichte & Entwicklung</h2>
<p>Der Karabiner 98 kurz (K98k) wurde 1935 als Standard-Infanteriegewehr der deutschen Wehrmacht eingeführt. Er basiert auf dem Mauser-Gewehr 98, das bereits 1898 von Paul Mauser entwickelt wurde und im Ersten Weltkrieg als Gewehr 98 diente. Die Bezeichnung «kurz» bezieht sich auf den gegenüber dem Gewehr 98 verkürzten Lauf von 600 mm statt 740 mm. Das K98k war bis Kriegsende 1945 im Einsatz und wurde mit über 14 Millionen produzierten Exemplaren zum meistgefertigten Repetiergewehr der Geschichte.</p>
<p>Die Produktion erfolgte durch zahlreiche Hersteller, darunter Mauser Oberndorf, Sauer & Sohn, Erma, Berlin-Lübecker Maschinenfabrik und Steyr-Daimler-Puch. Ab 1940 wurden die Herstellerkennungen durch Buchstabencodes ersetzt — so steht etwa «byf» für Mauser Oberndorf und «bnz» für Steyr. Diese Codes sind heute für Sammler von grosser Bedeutung, da sie Herkunft und Seltenheit bestimmen.</p>
<p>Nach dem Krieg produzierten Länder wie Jugoslawien (Zastava M48), Israel und zahlreiche weitere Staaten eigene Varianten. Das Mauser-98-System bildet bis heute die Grundlage fast aller modernen Jagd-Repetierbüchsen.</p>

<h2>Technik & Konstruktion</h2>
<p>Das Herzstück des K98k ist der legendäre Mauser-98-Verschluss. Er arbeitet mit <strong>Controlled Round Feed (CRF)</strong> — der grosse Auszieher erfasst die Patrone bereits beim Zuführen aus dem Magazin und hält sie während des gesamten Zyklus fest. Dieses Prinzip verhindert Doppelzuführungen und macht das System extrem zuverlässig.</p>
<p>Der Verschluss verriegelt mit <strong>zwei Hauptverriegelungswarzen</strong> vorne am Verschlusskopf und einer dritten Sicherheitswarze am Kammerstängel. Diese dreifache Verriegelung bietet maximale Sicherheit bei hohen Gasdrücken. Die <strong>Drei-Lagen-Sicherung</strong> erlaubt die Stellungen «Sicher» (Flügel oben), «Laden» (Flügel links) und «Feuer» (Flügel rechts).</p>
<p>Das interne Kastenmagazin fasst 5 Patronen im Kaliber 7,92×57 mm und wird über Ladestreifen befüllt. Der Abzug ist ein einfacher Militärabzug mit einem Abzugsgewicht von rund 2,5 kg. Der Lauf ist konventionell gezogen mit vier Zügen und einer Drallänge von 240 mm.</p>
<ul>
<li><strong>Kaliber:</strong> 7,92×57 mm Mauser (8×57 mm IS)</li>
<li><strong>System:</strong> Repetierbüchse, Mauser-Verschluss mit CRF</li>
<li><strong>Magazin:</strong> 5 Schuss, internes Kastenmagazin</li>
<li><strong>Lauflänge:</strong> 600 mm</li>
<li><strong>Gesamtlänge:</strong> 1110 mm</li>
<li><strong>Gewicht:</strong> 3,9 kg</li>
<li><strong>Abzug:</strong> Militärabzug, ca. 2,5 kg</li>
</ul>

<h2>Varianten & Modelle</h2>
<p>Das K98k wurde in zahlreichen Varianten gefertigt:</p>
<ul>
<li><strong>Standard-K98k (1935–1945):</strong> Infanteriegewehr mit Nussbaumschaft, ab 1944 teilweise mit Laminatschaft</li>
<li><strong>Scharfschützen-K98k:</strong> Ausgewählte Läufe mit Zielfernrohr ZF39 (4x), ZF41 (1,5x) oder ZF4 (4x)</li>
<li><strong>Kriegsmodell (1945):</strong> Vereinfachte Fertigung ohne Bajonetthalterung</li>
<li><strong>Gewehr 98:</strong> Der Vorgänger mit langem Lauf (740 mm)</li>
<li><strong>Zastava M48:</strong> Jugoslawische Nachkriegsproduktion</li>
<li><strong>vz. 24:</strong> Tschechoslowakische Mauser-Variante von BRNO</li>
<li><strong>Israelische K98k:</strong> Umgerüstet auf 7,62×51 mm NATO</li>
</ul>
<p>Für Jäger sind besonders die «sportifizierten» K98k interessant — originale Systeme, die von Büchsenmachern mit neuen Jagdschäften, angepassten Abzügen und modernen Zielfernrohrmontagen versehen wurden.</p>

<h2>Kaliber & Ballistik</h2>
<p>Das K98k wurde im Kaliber <strong>7,92×57 mm Mauser</strong> (auch 8×57 mm IS) gefertigt. Diese Patrone wurde 1905 eingeführt und war bis 1945 die Standard-Infanteriepatrone Deutschlands. Sie treibt ein 12,8-g-Geschoss auf rund 760 m/s und erzeugt dabei etwa 3700 Joule Mündungsenergie.</p>
<p>Ballistisch ist die 8×57 mm IS mit der .30-06 Springfield vergleichbar und eignet sich hervorragend für die Jagd auf europäisches Schalenwild bis hin zum Rothirsch. Die Flugbahn ist gestreckt genug für Schüsse bis 300 m. Laborierungen von 9,6 g bis 14,3 g sind im Handel erhältlich. RWS, Sellier & Bellot, PPU und Norma bieten Jagdmunition an. Surplus-Munition ist ebenfalls verfügbar, sollte aber auf Korrosivität geprüft werden.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Der K98k ist auf dem Schweizer Sammlermarkt sehr präsent. Die Preise variieren stark nach Zustand, Hersteller und Seltenheit:</p>
<ul>
<li><strong>Standard-K98k (russische Beutewaffe):</strong> CHF 350–600</li>
<li><strong>Standard-K98k (matching numbers, guter Zustand):</strong> CHF 800–1500</li>
<li><strong>Seltene Hersteller (Berlin-Lübecker, frühe Steyr):</strong> CHF 1500–3500</li>
<li><strong>Scharfschützen-Ausführung mit ZF39 oder ZF4:</strong> CHF 5000–15000+</li>
<li><strong>Sportifizierter K98k (Jagdumbau):</strong> CHF 500–1200</li>
</ul>
<p>Die Preise sind kontinuierlich gestiegen, da das Angebot an gut erhaltenen Exemplaren abnimmt. Auf Plattformen wie waffenmarkt.ch, Ricardo und an Waffenbörsen werden regelmässig K98k angeboten. Der Waffenerwerbsschein (WES) ist erforderlich.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Der K98k ist wartungsarm und robust. Nach dem Schiessen sollte der Lauf mit einer Bronzebürste gereinigt und leicht eingeölt werden. Bei korrosiver Surplus-Munition ist sofortige Reinigung mit heissem Wasser und anschliessendes Ölen zwingend, um Lochfrass zu vermeiden.</p>
<p>Der Verschluss lässt sich ohne Werkzeug zerlegen: Abzugsblech nach oben drücken, Verschluss herausziehen. Empfehlenswerte Öle sind Ballistol oder Brunox.</p>
<p><strong>Beliebtes Zubehör:</strong></p>
<ul>
<li>Zielfernrohrmontagen (Scout-Montage, Seitenmontage nach Recknagel)</li>
<li>Sportschäfte von Boyds oder GRS</li>
<li>Stecher-Abzüge (Timney, Bold) für Jagdumbauten</li>
<li>Originale Trageriemen und Mündungsschutzkappen für Sammler</li>
</ul>

<h2>Fazit & Kaufempfehlung</h2>
<p>Der Mauser K98k ist eine lebende Legende — technisch überholt, aber historisch unschlagbar. Für Sammler ist er ein Muss: die Geschichte, die jedes Exemplar erzählt, ist einzigartig. Für Jäger kann ein sportifizierter K98k mit modernem Abzug und Optik eine charmante und funktionale Jagdwaffe sein.</p>
<p><strong>Empfehlung:</strong> Wer historisch sammeln will, sollte auf matching numbers und Originalzustand achten. Wer eine Jagdwaffe sucht, greift besser zu einem bereits umgebauten Exemplar. In jedem Fall lohnt sich der K98k — als Stück Geschichte und als solide Repetierbüchse.</p>"""

if OLD_MAUSER in content:
    content = content.replace(OLD_MAUSER, NEW_MAUSER)
    count += 1
    print("OK: mauser-k98")
else:
    print("NOT FOUND: mauser-k98")

# ──────────────────────────────────────────────
# 2. FG42
# ──────────────────────────────────────────────
OLD_FG42 = """## FG 42 — Das Fallschirmjägergewehr
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
Waffenerwerbsschein (WES) erforderlich. Halbautomatische Repliken erhältlich."""

NEW_FG42 = """<h2>Geschichte & Entwicklung</h2>
<p>Das Fallschirmjägergewehr 42 (FG 42) wurde 1942 im Auftrag des Reichsluftfahrtministeriums für die deutschen Fallschirmjäger entwickelt. Nach der verlustreichen Luftlandeschlacht um Kreta 1941 wurde deutlich, dass die Fallschirmjäger eine kompakte, leistungsstarke Waffe benötigten, die sowohl als präzises Einzelfeuergewehr als auch als leichtes Maschinengewehr dienen konnte.</p>
<p>Die Entwicklung wurde von Louis Stange bei Rheinmetall-Borsig begonnen. Die Produktion des Typ I erfolgte bei Krieghoff in Suhl ab 1943, nur rund 2000 Stück wurden gefertigt. Der verbesserte Typ II wurde ebenfalls von Krieghoff produziert, insgesamt entstanden etwa 5000 Stück. Die Gesamtproduktion beider Typen wird auf ca. 7000 Exemplare geschätzt.</p>
<p>Das FG 42 kam unter anderem bei der spektakulären Befreiung Mussolinis am Gran Sasso 1943 zum Einsatz. Nach dem Krieg beeinflusste das Design direkt die Entwicklung des amerikanischen M60-Maschinengewehrs und des Stoner-63-Systems.</p>

<h2>Technik & Konstruktion</h2>
<p>Das FG 42 war seiner Zeit technisch weit voraus. Die genialste Innovation war das <strong>duale Verschlusssystem</strong>: Im Einzelfeuermodus feuerte die Waffe aus geschlossenem Verschluss für maximale Präzision, während sie im Dauerfeuermodus aus offenem Verschluss feuerte, um eine Selbstentzündung der Patrone durch den heissen Verschluss zu verhindern. Zwei verschiedene Abfeuermechanismen in einer einzigen Waffe — das wurde seither nie wieder so umgesetzt.</p>
<p>Der <strong>Gasdrucklader</strong> arbeitete mit einem Drehkopfverschluss und Langhubtreiber. Das seitlich eingesteckte 20-Schuss-Magazin hielt das Profil der Waffe niedrig, was für den liegenden Anschlag entscheidend war. Der integrierte Zweibein diente als MG-Stütze. Der Rückstoss im Kaliber 7,92×57 mm war im Dauerfeuer erheblich.</p>
<ul>
<li><strong>Kaliber:</strong> 7,92×57 mm Mauser</li>
<li><strong>System:</strong> Gasdrucklader mit Drehkopfverschluss</li>
<li><strong>Magazin:</strong> 20 Schuss, seitlich eingesteckt</li>
<li><strong>Feuerarten:</strong> Einzelschuss und Dauerfeuer</li>
<li><strong>Lauflänge:</strong> 502 mm</li>
<li><strong>Gesamtlänge:</strong> 940 mm</li>
<li><strong>Gewicht:</strong> 4,5 kg (Typ II)</li>
</ul>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>Typ I (Ausführung E):</strong> Erste Serienversion, geprägter Stahlschaft, schräggestellter Pistolengriff, ca. 2000 Stück</li>
<li><strong>Typ II (Ausführung G):</strong> Verbesserte Version mit Holzschaft, geändertem Zweibein, verstärktem System, ca. 5000 Stück</li>
<li><strong>SMG Guns FG42 (Replik):</strong> Moderne halbautomatische Reproduktion aus den USA</li>
<li><strong>BD42 (War Horse Industries):</strong> Weitere halbautomatische Replik für den Sammlermarkt</li>
</ul>
<p>Die Unterschiede zwischen Typ I und Typ II sind erheblich: Der Typ II hat ein steileres Pistolengriff-Design, einen Holzschaft statt des geprägten Metallschafts, ein modifiziertes Zweibein und diverse interne Verbesserungen. Für Sammler ist der Typ I aufgrund der geringeren Stückzahl noch seltener und wertvoller.</p>

<h2>Kaliber & Ballistik</h2>
<p>Das FG 42 verwendet das Standard-Infanteriekaliber <strong>7,92×57 mm Mauser</strong>. Aus dem 502-mm-Lauf erreicht das 12,8-g-Geschoss etwa 740 m/s Mündungsgeschwindigkeit, was rund 3500 Joule Mündungsenergie ergibt — geringfügig weniger als aus dem längeren K98k-Lauf.</p>
<p>Die Wahl des vollen Infanteriekalibers statt einer reduzierten Zwischenpatrone war gleichzeitig Stärke und Schwäche: Die Reichweite und Durchschlagskraft waren hervorragend, aber der Rückstoss im Dauerfeuer war bei nur 4,5 kg Waffengewicht kaum beherrschbar. Die Kadenz lag bei etwa 750 Schuss pro Minute, was das 20-Schuss-Magazin in unter zwei Sekunden leerte.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Originale FG 42 gehören zu den seltensten und wertvollsten Sammlerwaffen weltweit:</p>
<ul>
<li><strong>Originales FG 42 Typ I:</strong> CHF 200000–400000+ (extrem selten)</li>
<li><strong>Originales FG 42 Typ II:</strong> CHF 100000–250000</li>
<li><strong>Halbautomatische Replik (SMG Guns):</strong> CHF 5000–8000</li>
<li><strong>Deaktivierte Originale:</strong> CHF 15000–40000</li>
</ul>
<p>In der Schweiz tauchen originale FG 42 nur äusserst selten auf dem Markt auf. Die meisten Exemplare befinden sich in festen Sammlungen oder Museen. Der WES ist für den Erwerb erforderlich. Die halbautomatischen Repliken sind eine realistische Alternative für Sammler, die das Schiesserlebnis suchen.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Die Wartung eines originalen FG 42 erfordert besondere Sorgfalt und Fachkenntnis. Ersatzteile sind praktisch nicht erhältlich, weshalb jede Reparatur von einem spezialisierten Büchsenmacher durchgeführt werden sollte. Bei Repliken ist die Ersatzteilversorgung besser.</p>
<p>Grundsätzlich gelten die üblichen Pflegehinweise für Gasdrucklader: Gassystem regelmässig reinigen, Verschluss und Verriegelungswarzen auf Verschleiss prüfen, Lauf nach jedem Schiessen reinigen und einölen. Bei Originalen sollte auf die Verwendung moderner Munition mit nicht-korrosiven Zündhütchen geachtet werden.</p>
<p><strong>Zubehör für Originale:</strong></p>
<ul>
<li>Originale ZF42-Zielfernrohre (extrem selten und wertvoll)</li>
<li>Original-Magazine (20 Schuss, gesucht und teuer)</li>
<li>Originale Trageriemen und Zweibein-Ersatzteile</li>
</ul>

<h2>Fazit & Kaufempfehlung</h2>
<p>Das FG 42 ist eines der faszinierendsten Gewehre der Waffengeschichte — ein technisches Meisterwerk, das seiner Zeit 20 Jahre voraus war. Das duale Verschlusssystem, das kompakte Design und die Feuerkraft machten es zum vielleicht fortschrittlichsten Infanteriegewehr des Zweiten Weltkriegs.</p>
<p><strong>Empfehlung:</strong> Originale FG 42 sind Investitionsobjekte im sechsstelligen Bereich und nur für ernsthafte Sammler realistisch. Wer das Schiesserlebnis sucht, sollte zu einer halbautomatischen Replik greifen. In jedem Fall ist das FG 42 ein Stück Waffengeschichte, das seinesgleichen sucht.</p>"""

if OLD_FG42 in content:
    content = content.replace(OLD_FG42, NEW_FG42)
    count += 1
    print("OK: fg42")
else:
    print("NOT FOUND: fg42")

# ──────────────────────────────────────────────
# 3. CZ452
# ──────────────────────────────────────────────
OLD_CZ = """## CZ 452 / CZ 455 / CZ 457 — Kleinkaliber-Referenz
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
Waffenerwerbsschein (WES) erforderlich."""

NEW_CZ = """<h2>Geschichte & Entwicklung</h2>
<p>Die Geschichte der CZ-Kleinkalibergewehre beginnt 1955 mit der CZ 452, entwickelt im Werk Česká zbrojovka in Uherský Brod (Tschechien). Die CZ 452 setzte über Jahrzehnte den Massstab für bezahlbare, präzise Kleinkaliber-Repetierbüchsen in Europa und war besonders bei Jägern, Sportschützen und Ausbildungsinstitutionen beliebt.</p>
<p>2010 erschien die CZ 455 als Nachfolgerin mit einem entscheidenden Vorteil: dem <strong>Kaliberwechsel-System</strong>. Durch einfachen Tausch von Lauf und Magazin konnte zwischen .22 LR, .22 WMR und .17 HMR gewechselt werden. 2018 stellte CZ die aktuelle Generation vor — die <strong>CZ 457</strong> — mit nochmals verbessertem Abzug, höherer Präzision und modularerem Aufbau. Die CZ 457 gilt heute als die Referenz im Segment der Kleinkaliber-Repetierbüchsen unter CHF 1000.</p>
<p>CZ gehört seit 2021 zur Colt CZ Group und ist einer der grössten Waffenhersteller Europas. Die Kleinkaliber-Baureihe profitiert von der gleichen Fertigungsqualität wie die grösseren CZ-Büchsen und Pistolen.</p>

<h2>Technik & Konstruktion</h2>
<p>Die CZ 457 arbeitet mit einem einfachen, aber präzisen <strong>Zylinderverschluss mit zwei Verriegelungswarzen</strong>. Der Verschluss gleitet butterweich und ermöglicht schnelle Repetierzyklen. Der <strong>kaltgehämmerte Lauf</strong> wird im CZ-eigenen Verfahren gefertigt und liefert hervorragende Laufqualität, die Sub-MOA-Gruppen mit passender Munition ermöglicht.</p>
<p>Das Herzstück der CZ 457 ist der <strong>einstellbare Abzug</strong>, der ab 500 g Abzugsgewicht eingestellt werden kann — ein Wert, der an Match-Abzüge heranreicht und bei Büchsen dieser Preisklasse einzigartig ist. Der Abzug ist sauber und knackig, ohne Vorweg oder Nachzug. Das abnehmbare 5-Schuss-Kastenmagazin aus Kunststoff ist robust und zuverlässig.</p>
<ul>
<li><strong>Kaliber:</strong> .22 LR, .22 WMR, .17 HMR</li>
<li><strong>System:</strong> Repetierbüchse mit 2-Warzen-Verschluss</li>
<li><strong>Magazin:</strong> 5 Schuss, abnehmbares Kastenmagazin</li>
<li><strong>Lauflänge:</strong> 525 mm (Standard), 630 mm (Varmint)</li>
<li><strong>Gewicht:</strong> 2,8–3,5 kg je nach Modell</li>
<li><strong>Abzug:</strong> Einstellbar, ab 0,5 kg (CZ 457)</li>
</ul>

<h2>Varianten & Modelle</h2>
<p>Die CZ 457-Baureihe umfasst zahlreiche Varianten für unterschiedliche Einsatzzwecke:</p>
<ul>
<li><strong>CZ 457 Lux:</strong> Klassischer Nussbaumschaft, Standardlauf — der Allrounder</li>
<li><strong>CZ 457 Varmint:</strong> Schwerer Lauf (20 mm Durchmesser), Nussbaum- oder Laminatschaft, ideal für Benchrest</li>
<li><strong>CZ 457 Training Rifle:</strong> Schiessstand-optimiert mit langem Lauf und ergonomischem Schaft</li>
<li><strong>CZ 457 MTR (Match Target Rifle):</strong> Wettkampfmodell mit 20"-Match-Lauf</li>
<li><strong>CZ 457 Jaguar:</strong> Ultraleichte Ausführung für die Jagd</li>
<li><strong>CZ 457 Royal:</strong> Hochwertiger Nussbaumschaft mit Fischhaut-Griffstück</li>
<li><strong>CZ 457 Synthetic:</strong> Wetterfester Kunststoffschaft</li>
</ul>
<p>Die Vorgängermodelle CZ 452 und CZ 455 sind auf dem Gebrauchtmarkt weiterhin sehr beliebt und wertstabil. Besonders die CZ 452 mit ihrem traditionelleren Verschluss hat eine treue Fangemeinde.</p>

<h2>Kaliber & Ballistik</h2>
<p>Die CZ 457 ist in drei Kalibern erhältlich. Das Hauptkaliber <strong>.22 LR</strong> (Long Rifle) ist die weltweit meistverkaufte Patrone. Sie treibt ein 2,6-g-Geschoss auf 330 m/s und erzeugt etwa 140 Joule Mündungsenergie. Die effektive Reichweite liegt bei 50–100 m.</p>
<p>Die <strong>.17 HMR</strong> (Hornady Magnum Rimfire) bietet mit 780 m/s und 245 Joule deutlich mehr Leistung und eine flachere Flugbahn — ideal für Schüsse bis 150 m auf Kleintiere. Die <strong>.22 WMR</strong> liegt leistungsmässig dazwischen.</p>
<p>Die Präzision der CZ 457 ist bemerkenswert: Mit hochwertiger Munition (SK Standard Plus, Eley Club, RWS Target Rifle) sind Streukreise unter 15 mm auf 50 m die Regel. Mit Match-Munition (Eley Tenex, SK Long Range Match) sind unter 10 mm möglich. Die Munitionswahl ist bei .22 LR entscheidend — jeder Lauf hat seine Lieblingsmunition.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Die CZ 457 ist in der Schweiz flächendeckend bei Waffenhändlern erhältlich:</p>
<ul>
<li><strong>CZ 457 Synthetic:</strong> CHF 450–520</li>
<li><strong>CZ 457 Lux (Holzschaft):</strong> CHF 520–600</li>
<li><strong>CZ 457 Varmint:</strong> CHF 580–680</li>
<li><strong>CZ 457 MTR:</strong> CHF 650–750</li>
<li><strong>CZ 457 Royal:</strong> CHF 620–720</li>
<li><strong>CZ 452 (Gebraucht):</strong> CHF 300–450</li>
<li><strong>CZ 455 (Gebraucht):</strong> CHF 350–500</li>
</ul>
<p>Die CZ 457 bietet das beste Preis-Leistungs-Verhältnis im Kleinkaliber-Segment. Der WES ist für den Erwerb erforderlich. Munition in .22 LR kostet CHF 0.05–0.15 pro Schuss, was die CZ 457 zur idealen Trainingswaffe macht.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Kleinkaliber-Büchsen sind grundsätzlich pflegeleicht. Der Lauf sollte alle 200–500 Schuss gereinigt werden — bei .22 LR ist insbesondere die Bleiablagerung im Lauf ein Thema. Ein Filzdurchzug mit Ballistol oder einem speziellen KK-Laufreiniger genügt. Bronzebürsten sollten sparsam eingesetzt werden, da der KK-Lauf empfindlicher ist.</p>
<p>Der Verschluss der CZ 457 lässt sich einfach entnehmen und reinigen. Öl und Fett sollten sparsam verwendet werden — zu viel Öl im Schlagbolzenkanal kann bei Kälte zu Zündversagern führen.</p>
<p><strong>Empfehlenswertes Zubehör:</strong></p>
<ul>
<li>Zielfernrohr 3–9×40 oder 4–16×44 (z. B. Vortex Crossfire II, Bushnell Banner)</li>
<li>Weaver- oder Picatinny-Montage (11-mm-Prisma ab Werk vorhanden)</li>
<li>CZ-Ersatzmagazine (5 oder 10 Schuss)</li>
<li>Schalldämpfer (in der Schweiz kantonal unterschiedlich geregelt)</li>
</ul>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die CZ 457 ist die unbestrittene Referenz im Segment der Kleinkaliber-Repetierbüchsen. Für Einsteiger, Sportschützen und Jäger gleichermassen geeignet, bietet sie einen hervorragenden Abzug, präzise kaltgehämmerte Läufe und eine breite Modellpalette zu fairen Preisen.</p>
<p><strong>Empfehlung:</strong> Für den Einstieg ist die CZ 457 Lux mit Holzschaft die beste Wahl. Wer primär am Schiessstand schiesst, sollte zur Varmint mit schwerem Lauf greifen. Für Wettkampfambitionen ist die MTR richtig. Auf dem Gebrauchtmarkt sind CZ 452 und 455 hervorragende Alternativen. Ein besseres Preis-Leistungs-Verhältnis im KK-Bereich ist kaum zu finden.</p>"""

if OLD_CZ in content:
    content = content.replace(OLD_CZ, NEW_CZ)
    count += 1
    print("OK: cz452")
else:
    print("NOT FOUND: cz452")

# ──────────────────────────────────────────────
# 4. TIKKA T1X
# ──────────────────────────────────────────────
OLD_TIKKA = """## Tikka T1x — Kleinkaliber mit T3x-Ergonomie
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
Waffenerwerbsschein (WES) erforderlich."""

NEW_TIKKA = """<h2>Geschichte & Entwicklung</h2>
<p>Die Tikka T1x MTR (Multi Task Rifle) wurde 2018 von Tikka vorgestellt — einer Marke der finnischen SAKO-Gruppe, die seit 2000 zum Beretta-Konzern gehört. Tikka produziert seit den 1960er-Jahren Repetierbüchsen und hat sich mit der T3-Serie (2003) und deren Nachfolgerin T3x (2016) als eine der besten Preis-Leistungs-Marken am Markt etabliert.</p>
<p>Die Idee hinter der T1x war einfach und genial: Eine Kleinkaliber-Trainingswaffe zu schaffen, die <strong>identische Masse und Ergonomie</strong> wie die grosse T3x bietet. Jäger und Sportschützen sollten mit günstiger .22 LR Munition trainieren können, ohne sich an eine andere Waffengeometrie gewöhnen zu müssen. Schaft, Abzug, Griffwinkel und Gesamtlänge sind massstäblich identisch mit der T3x.</p>
<p>Die Produktion erfolgt im SAKO-Werk in Riihimäki, Finnland, wo auch die T3x und die SAKO-Büchsen gefertigt werden. Tikka nutzt dabei die gleichen Qualitätsstandards und Fertigungsprozesse wie für die grösseren Kaliber.</p>

<h2>Technik & Konstruktion</h2>
<p>Die T1x arbeitet mit einem <strong>Zylinderverschluss</strong>, der für das Kleinkaliber-Patronenlager optimiert wurde. Der Verschluss ist leichtgängig und ermöglicht schnelle Repetierzyklen. Die T1x verwendet einen <strong>Push-Feed-Mechanismus</strong>, der die Patrone sicher aus dem Stahlmagazin in das Patronenlager führt.</p>
<p>Der <strong>Tikka-T3x-Abzug</strong> ist eines der Highlights der T1x. Er ist ab 1 kg einstellbar, arbeitet sauber und definiert, und fühlt sich identisch an wie der Abzug der grossen Schwester. Der kaltgehämmerte Lauf hat eine Länge von 508 mm (20 Zoll) und liefert ab Werk hervorragende Präzision — typisch 1 MOA mit hochwertiger Munition.</p>
<p>Das <strong>10-Schuss-Stahlmagazin</strong> ist robust und zuverlässig. Die Zuführung erfolgt störungsfrei auch mit verschiedenen Munitionstypen. Der Schaft aus glasfaserverstärktem Polypropylen ist wetterfest und liegt hervorragend in der Hand.</p>
<ul>
<li><strong>Kaliber:</strong> .22 LR, .17 HMR</li>
<li><strong>System:</strong> Repetierbüchse mit Zylinderverschluss</li>
<li><strong>Magazin:</strong> 10 Schuss (.22 LR), Stahlmagazin</li>
<li><strong>Lauflänge:</strong> 508 mm (20")</li>
<li><strong>Gesamtlänge:</strong> 990 mm</li>
<li><strong>Gewicht:</strong> 2,7 kg</li>
<li><strong>Abzug:</strong> Tikka T3x-Abzug, einstellbar ab 1 kg</li>
</ul>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>T1x MTR:</strong> Standardmodell mit schwarzem Kunststoffschaft, 20"-Lauf — der Bestseller</li>
<li><strong>T1x UPR (Ultimate Precision Rifle):</strong> Chassis-Schaft aus Aluminium, verstellbare Schaftkappe und Wangenauflage, ideal für Precision Rimfire</li>
<li><strong>T1x Hunter:</strong> Klassischer Holzschaft in Nussbaum</li>
</ul>
<p>Alle Varianten teilen das gleiche System und den gleichen Abzug. Die T1x ist mit der T3x-Schnittstelle kompatibel, was bedeutet, dass viele T3x-Schäfte und Chassis-Systeme von Drittanbietern (KRG Bravo, MDT, GRS) auch an der T1x montiert werden können. Für den Precision-Rimfire-Sport ist die UPR-Variante besonders beliebt.</p>

<h2>Kaliber & Ballistik</h2>
<p>Die T1x ist primär in <strong>.22 LR</strong> erhältlich, dem weltweit beliebtesten Kleinkaliber. Die .22 LR treibt ein 2,6-g-Geschoss auf rund 330 m/s und erzeugt etwa 140 Joule Mündungsenergie. Die effektive Präzisionsreichweite liegt bei 50–100 m, wobei erfahrene Schützen auch auf 200 m noch treffen.</p>
<p>In der Variante <strong>.17 HMR</strong> bietet die T1x deutlich mehr Leistung: 780 m/s Mündungsgeschwindigkeit, 245 Joule Energie und eine wesentlich flachere Flugbahn. Die .17 HMR eignet sich für Schüsse bis 150 m.</p>
<p>Die T1x zeigt sich wenig wählerisch bei der Munitionswahl. Gute Ergebnisse werden mit SK Standard Plus, Eley Club, CCI Standard Velocity und RWS Target Rifle erzielt. Die Streukreise liegen typisch bei 12–18 mm auf 50 m mit Standardmunition und unter 10 mm mit Match-Munition.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Die Tikka T1x ist in der Schweiz gut verfügbar:</p>
<ul>
<li><strong>T1x MTR (Kunststoffschaft):</strong> CHF 480–550</li>
<li><strong>T1x UPR (Chassis):</strong> CHF 850–950</li>
<li><strong>T1x Hunter (Holzschaft):</strong> CHF 580–650</li>
<li><strong>T1x Gebraucht:</strong> CHF 380–480</li>
</ul>
<p>Im Vergleich zur CZ 457 liegt die T1x preislich etwas höher, bietet dafür aber die Ergonomie-Kompatibilität mit der T3x — ein unschätzbarer Vorteil für Jäger, die bereits eine T3x besitzen. Der WES ist erforderlich. Zusätzlich sollte ein Budget für ein Zielfernrohr (CHF 200–500) und Munition eingeplant werden.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Die T1x ist pflegeleicht und finnisch-robust. Der Lauf sollte alle 300–500 Schuss gereinigt werden. Ein Filzdurchzug mit KK-Reiniger genügt. Bronzebürsten sparsam einsetzen, da der KK-Lauf weicher ist als ein Grosskaliberlauf.</p>
<p>Der Verschluss kann einfach entnommen und gereinigt werden. Der Abzug benötigt keine Wartung. Bei Kälte sollte wenig Öl im Schlagbolzenkanal sein, um Zündversager zu vermeiden.</p>
<p><strong>Empfehlenswertes Zubehör:</strong></p>
<ul>
<li>Zielfernrohr 4–16×44 oder 6–24×50 für Precision Rimfire</li>
<li>Picatinny-Schiene (ab Werk vorhanden)</li>
<li>Ersatzmagazine (10 Schuss, Stahl)</li>
<li>Schalldämpfer (kantonal geregelt)</li>
<li>Zweibein (Harris, Magpul, Atlas)</li>
</ul>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die Tikka T1x ist die ideale Trainingswaffe für T3x-Besitzer — und auch ohne diese Verbindung eine hervorragende Kleinkaliber-Repetierbüchse. Der finnische Qualitätsanspruch, der exzellente Abzug und die ab Werk hervorragende Präzision machen sie zur Top-Empfehlung.</p>
<p><strong>Empfehlung:</strong> Wer bereits eine T3x besitzt, sollte die T1x MTR als günstige Trainingswaffe kaufen. Für Precision Rimfire ist die UPR-Variante die richtige Wahl. Als Erstwaffe für Einsteiger ist die T1x ebenfalls hervorragend geeignet, da sie von Anfang an einen hohen Standard setzt.</p>"""

if OLD_TIKKA in content:
    content = content.replace(OLD_TIKKA, NEW_TIKKA)
    count += 1
    print("OK: tikka-t1x")
else:
    print("NOT FOUND: tikka-t1x")

# ──────────────────────────────────────────────
# 5. RUGER 10/22
# ──────────────────────────────────────────────
OLD_RUGER = """## Ruger 10/22 — Die beliebteste Kleinkaliber-Selbstladebüchse
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
Waffenerwerbsschein (WES) erforderlich."""

NEW_RUGER = """<h2>Geschichte & Entwicklung</h2>
<p>Die Ruger 10/22 wurde 1964 von Sturm, Ruger & Co. auf den Markt gebracht und ist seither ununterbrochen in Produktion. Mit über 7 Millionen verkauften Exemplaren ist sie die <strong>meistverkaufte halbautomatische Kleinkaliber-Büchse aller Zeiten</strong>. Der Name «10/22» steht für das 10-Schuss-Magazin im Kaliber .22 LR.</p>
<p>Bill Ruger entwarf die 10/22 als einfache, zuverlässige und erschwingliche Selbstladebüchse für Anfänger, Jäger und Plinkschützen. Das geniale Rotationsmagazin und das unkomplizierte Blowback-System machten die Waffe sofort populär. Bereits in den 1970er-Jahren begann sich ein enormer Aftermarket zu entwickeln, der heute seinesgleichen sucht.</p>
<p>Die 10/22 wird oft als die «AR-15 der Kleinkaliber» bezeichnet — fast jedes Teil kann durch Aftermarket-Komponenten ersetzt werden. Es ist möglich, eine komplette 10/22 nur aus Aftermarket-Teilen aufzubauen. Diese Modularität hat sie zur Plattform für unzählige Custom-Projekte gemacht.</p>

<h2>Technik & Konstruktion</h2>
<p>Die Ruger 10/22 arbeitet mit einem einfachen <strong>Masseverschluss (Blowback)</strong>. Der Verschluss wird durch den Gasdruck der abgefeuerten Patrone nach hinten getrieben, spannt den Schlagbolzen und führt beim Vorlauf eine neue Patrone zu. Das System ist extrem einfach, robust und zuverlässig.</p>
<p>Das <strong>patentierte Rotationsmagazin</strong> ist das Markenzeichen der 10/22. Es fasst 10 Patronen in einer runden Trommel und führt diese über eine Drehbewegung zu. Diese Konstruktion ist zuverlässiger als konventionelle Kastenmagazine, da kein Federdruck auf den Patronenstapel wirkt.</p>
<p>Der Aluminium-Receiver nimmt den Lauf, den Verschluss und den Abzugsmechanismus auf. Die V-Block-Laufbefestigung hält den Lauf mit zwei Schrauben — einfach zu lösen für den Lauftausch. Der Standard-Abzug hat ein Abzugsgewicht von rund 2,5–3 kg und ist der erste Kandidat für ein Upgrade.</p>
<ul>
<li><strong>Kaliber:</strong> .22 LR</li>
<li><strong>System:</strong> Masseverschluss (Blowback), Halbautomatik</li>
<li><strong>Magazin:</strong> 10 Schuss (Rotationsmagazin), 25 Schuss optional (BX-25)</li>
<li><strong>Lauflänge:</strong> 470 mm (Standard)</li>
<li><strong>Gesamtlänge:</strong> 940 mm</li>
<li><strong>Gewicht:</strong> 2,3 kg</li>
</ul>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>10/22 Carbine:</strong> Das Standardmodell mit Holz- oder Kunststoffschaft, 18,5"-Lauf</li>
<li><strong>10/22 Takedown:</strong> Zerlegbar in zwei Hälften für einfachen Transport</li>
<li><strong>10/22 Target:</strong> Schwerer Bull-Barrel-Lauf, Laminatschaft für Benchrest</li>
<li><strong>10/22 Competition:</strong> Match-Lauf mit Kompensator, einstellbarer Abzug</li>
<li><strong>10/22 Sporter:</strong> Nussbaumschaft mit Fischhaut</li>
<li><strong>Charger:</strong> Pistolenversion mit kurzem Lauf und Picatinny-Schiene</li>
</ul>
<p>Darüber hinaus existieren unzählige Aftermarket-Konfigurationen: vom Precision-Chassis (Volquartsen, Kidd) über AR-15-ähnliche Gehäuse bis hin zu Bullpup-Umbauten.</p>

<h2>Kaliber & Ballistik</h2>
<p>Die 10/22 ist ausschliesslich im Kaliber <strong>.22 LR</strong> erhältlich. Als Halbautomatik mit Masseverschluss ist sie auf High-Velocity- und Standard-Velocity-Munition ausgelegt. Die meisten 10/22 funktionieren zuverlässig mit Munition ab 320 m/s — Subsonic-Munition kann zu Zuführstörungen führen.</p>
<p>Für zuverlässige Funktion empfehlen sich: CCI Mini-Mag, Federal AutoMatch, Winchester Wildcat. Für maximale Präzision bei zuverlässiger Funktion: CCI Standard Velocity, SK Standard Plus oder Eley Club. Die Streukreise liegen mit dem Standardlauf bei 20–30 mm auf 50 m; mit Aftermarket-Match-Lauf (Volquartsen, Kidd, Green Mountain) sind unter 15 mm möglich.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>Die Ruger 10/22 ist in der Schweiz gut erhältlich. Als Halbautomatik ist ein WES erforderlich:</p>
<ul>
<li><strong>10/22 Carbine (Holzschaft):</strong> CHF 400–480</li>
<li><strong>10/22 Carbine (Kunststoffschaft):</strong> CHF 350–420</li>
<li><strong>10/22 Takedown:</strong> CHF 480–560</li>
<li><strong>10/22 Target:</strong> CHF 550–650</li>
<li><strong>10/22 Competition:</strong> CHF 700–800</li>
<li><strong>10/22 Gebraucht:</strong> CHF 250–400</li>
</ul>
<p>BX-25-Magazine kosten rund CHF 35–45. Aftermarket-Abzüge (BX-Trigger, Volquartsen, Kidd) liegen bei CHF 80–250. Das grosse Aftermarket-Angebot ist über Importeure und Online-Shops gut zugänglich.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Die 10/22 ist äusserst pflegeleicht. Der Verschluss lässt sich durch Entfernen des Abzugsmechanismus (ein Pin) einfach entnehmen. Der Lauf sollte alle 500 Schuss gereinigt werden. Das Rotationsmagazin kann zerlegt und von Bleirückständen befreit werden.</p>
<p>Die häufigste Störung ist eine Zuführhemmung durch verschmutzte Magazine oder zu schwache Munition. Regelmässiges Reinigen des Magazins und High-Velocity-Munition lösen die meisten Probleme.</p>
<p><strong>Die beliebtesten Aftermarket-Upgrades:</strong></p>
<ul>
<li><strong>Abzug:</strong> BX-Trigger, Volquartsen Target Trigger, Kidd Single-Stage</li>
<li><strong>Lauf:</strong> Volquartsen, Kidd, Green Mountain — für bessere Präzision</li>
<li><strong>Schaft/Chassis:</strong> Magpul X-22, Boyd's, MDT</li>
<li><strong>Magazin:</strong> BX-25 (25 Schuss), Steel Lips Magazine</li>
<li><strong>Verschluss:</strong> Volquartsen Bolt, Kidd Bolt</li>
</ul>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die Ruger 10/22 ist der Klassiker unter den Kleinkaliber-Halbautomaten — millionenfach bewährt, unendlich anpassbar und erschwinglich. Als Einstiegswaffe, Plinking-Büchse oder Basis für ein Custom-Projekt ist sie kaum zu schlagen.</p>
<p><strong>Empfehlung:</strong> Für den Einstieg genügt die Carbine-Version. Die Takedown ist ideal für kompakten Transport. Wer aufrüsten will, sollte zuerst in einen besseren Abzug investieren — das bringt den grössten Präzisionsgewinn. Die 10/22 ist eine Plattform, die mit dem Schützen wächst.</p>"""

if OLD_RUGER in content:
    content = content.replace(OLD_RUGER, NEW_RUGER)
    count += 1
    print("OK: ruger-1022")
else:
    print("NOT FOUND: ruger-1022")

with open(FILE, 'w') as f:
    f.write(content)

print(f"\nDone: {count}/5 articles replaced in batch 1")
