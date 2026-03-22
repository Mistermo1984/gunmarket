const fs = require("fs");
let c = fs.readFileSync("src/lib/wissen-data.ts", "utf8");

function replaceInhalt(slug, newContent) {
  const slugStr = "slug: '" + slug + "'";
  const slugIdx = c.indexOf(slugStr);
  if (slugIdx === -1) { console.error("Slug not found: " + slug); process.exit(1); }
  const inhaltStr = "inhalt: `";
  const inhaltStart = c.indexOf(inhaltStr, slugIdx);
  if (inhaltStart === -1) { console.error("inhalt not found for: " + slug); process.exit(1); }
  const contentStart = inhaltStart + inhaltStr.length;
  const closingIdx = c.indexOf("`,", contentStart);
  if (closingIdx === -1) { console.error("Closing not found for: " + slug); process.exit(1); }
  c = c.substring(0, contentStart) + newContent + c.substring(closingIdx);
  const wordCount = newContent.replace(/<[^>]+>/g, " ").split(/\s+/).filter(w => w.length > 0).length;
  console.log("OK: " + slug + " (~" + wordCount + " words)");
}

const a = {};

a["hk-g3"] = `<h2>Geschichte & Entwicklung</h2>
<p>Die Geschichte des Heckler & Koch G3 beginnt in den letzten Tagen des Zweiten Weltkriegs. Deutsche Ingenieure bei Mauser entwickelten das StG 45(M), ein Sturmgewehr mit einem neuartigen rollenverzögerten Rückstosssystem. Nach Kriegsende floh der Ingenieur Ludwig Vorgrimler nach Spanien, wo er am CETME-Gewehr weiterarbeitete. Dieses Konzept wurde von der neu gegründeten Firma Heckler & Koch in Oberndorf am Neckar aufgegriffen und zum G3 weiterentwickelt.</p>
<p>1959 führte die Bundeswehr das G3 als Standardwaffe ein. Es ersetzte das belgische FN FAL, das zuvor in Lizenz gefertigt worden war. Das G3 wurde in über 80 Ländern eingeführt und in zahlreichen Nationen in Lizenz produziert, darunter Pakistan, Iran, Türkei, Griechenland, Norwegen, Schweden und Portugal. Insgesamt wurden schätzungsweise 7 bis 8 Millionen Exemplare hergestellt. In der Bundeswehr diente das G3 bis 1997, als es durch das G36 abgelöst wurde. Viele Länder setzen es jedoch bis heute ein.</p>

<h2>Technik & Konstruktion</h2>
<p>Das Herzstück des G3 ist der rollenverzögerte Rückstosslader. Zwei Rollen im Verschlusskopf greifen in Ausnehmungen im Laufansatz und verzögern das Öffnen des Verschlusses, bis der Gasdruck auf ein sicheres Niveau gesunken ist. Dieses System benötigt keinen separaten Gaskanal und keine Gasentnahme – es arbeitet ausschliesslich mit dem Rückstoss. Der Vorteil ist ein extrem einfacher und robuster Mechanismus mit wenigen beweglichen Teilen.</p>
<p>Das Patronenlager ist mit feinen Rillen versehen (geriffeltes Patronenlager), die Gas zwischen Hülse und Kammerwand leiten. Dies verhindert das Festkleben der Hülse, führt aber zu charakteristischen Längsrillen auf den abgefeuerten Hülsen. Für Wiederlader ist dies problematisch, da die Hülsen stärker beansprucht werden. Der Verschluss schlägt beim Laden energisch vor, was eine zuverlässige Zuführung auch unter widrigen Bedingungen sicherstellt.</p>
<p>Das G3 war eines der ersten Gewehre mit Kunststoff-Handschutz und Polymergriff. Der Abzugsmechanismus erlaubt in der militärischen Version Einzelschuss und Dauerfeuer. Das Gewehr kann mit Zweibein, Bajonett und verschiedenen Optiken ausgestattet werden. Die Visierung besteht aus einem Trommelvisier mit Einstellungen für 100, 200, 300 und 400 Meter.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>G3A3:</strong> Standardmodell mit festem Kunststoffschaft und grünem Handschutz. Die am weitesten verbreitete Version.</li>
<li><strong>G3A4:</strong> Version mit einziehbarem Teleskopschaft für Fahrzeugbesatzungen und Fallschirmjäger.</li>
<li><strong>G3KA4:</strong> Verkürzte Karabinerversion mit kürzerem Lauf für Spezialeinheiten.</li>
<li><strong>G3SG/1:</strong> Scharfschützenversion mit verbessertem Match-Abzug, einstellbarer Schaftbacke und Zielfernrohr.</li>
<li><strong>MSG90:</strong> Weiterentwickelte Scharfschützenversion mit freischwingendem Lauf und modernem Schaft.</li>
<li><strong>HK91:</strong> Halbautomatische Zivilversion von Heckler & Koch, in den 1970er–1980er Jahren sehr beliebt.</li>
<li><strong>PTR-91:</strong> Moderne halbautomatische Zivilversion von PTR Industries, gefertigt auf originalen HK-Maschinen.</li>
<li><strong>MKE T41:</strong> Türkische Lizenzproduktion, auch als halbautomatische Zivilversion erhältlich.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Das G3 ist für das Kaliber 7,62×51mm NATO ausgelegt. Diese Patrone entspricht im Wesentlichen der zivilen .308 Winchester, wobei die NATO-Spezifikation leicht höhere Drücke erlaubt. Das 7,62mm-Geschoss (typisch 9,5 g / 147 grain Vollmantel) erreicht eine Mündungsgeschwindigkeit von rund 800 m/s und eine Mündungsenergie von etwa 3000 Joule.</p>
<p>Auf Entfernungen bis 400 Meter ist das G3 wirksam gegen weiche und mittelharte Ziele. Die effektive Reichweite wird mit 400 Metern für Punktziele und 600 Metern für Flächenziele angegeben. Die Streuung liegt beim Standard-G3 bei etwa 4–5 MOA, bei der Scharfschützenversion G3SG/1 bei rund 1,5 MOA. Der Rückstoss ist aufgrund des Kalibers spürbar, aber durch das Gewicht der Waffe gut beherrschbar.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>In der Schweiz sind halbautomatische Versionen des G3 mit Waffenerwerbsschein (WES) erhältlich. Die PTR-91 ist die am häufigsten angebotene Variante und liegt preislich bei <strong>CHF 1200 bis 1800</strong> für Neuwaffen. Gebrauchte PTR-91 werden ab etwa <strong>CHF 900</strong> gehandelt.</p>
<p>Originale HK91 sind selten geworden und erzielen auf dem Sammlermarkt <strong>CHF 2500 bis 4500</strong> je nach Zustand und Jahrgang. Türkische MKE-Varianten sind günstiger und werden ab <strong>CHF 800 bis 1200</strong> angeboten. Magazin und Zubehörpreise sind günstig: Originalmagazine aus Aluminium kosten CHF 10–25, Stahlmagazine CHF 15–35. Die grosse Verfügbarkeit von Surplus-Teilen hält die Unterhaltskosten niedrig.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Das G3 ist konstruktionsbedingt pflegeleicht. Der Verschluss kann ohne Werkzeug zerlegt werden: Verschlussträger mit Verschlusskopf und Rollen, Schliessrohr und Schliessfeder – das sind die wesentlichen Komponenten. Nach dem Schiessen sollte das geriffelte Patronenlager gründlich gereinigt werden, da sich dort Pulverrückstände ansammeln.</p>
<p>Empfohlenes Zubehör umfasst ein HK-Mehrzweckwerkzeug für die Feldzerlegung, ein Reinigungsset mit Messingbürste für das Patronenlager sowie Picatinny-Montagen für Zielfernrohre. Für PTR-91 und HK91 gibt es zahlreiche Aftermarket-Teile: verstellbare Schäfte, Vorderschafte mit M-LOK-Schnittstellen, verbesserte Abzüge und Mündungsbremsen.</p>
<p>Verschleissteile sind die Verschlussrollen, die nach etwa 10000–15000 Schuss kontrolliert werden sollten, sowie die Schliessfeder. Der Lauf hält bei Verwendung von NATO-Munition typischerweise 15000–25000 Schuss.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Das G3 bzw. seine halbautomatische Zivilversion ist eine robuste, zuverlässige und historisch bedeutsame Waffe. Für Schützen, die ein leistungsfähiges Selbstladegewehr in 7,62×51mm NATO suchen, ist die PTR-91 eine ausgezeichnete Wahl mit hervorragendem Preis-Leistungs-Verhältnis. Die grosse Verfügbarkeit günstiger Magazine und Ersatzteile ist ein weiterer Pluspunkt.</p>
<p>Nachteile sind das relativ hohe Gewicht, der kräftige Rückstoss und die für Wiederlader problematische Hülsenbehandlung. Wer primär Präzision auf Distanz sucht, greift besser zu einem Repetierer oder einem modernen Halbautomat wie dem HK MR308. Für Sammler, Sportschützen und Liebhaber militärischer Klassiker bleibt das G3-System jedoch eine faszinierende und erschwingliche Plattform.</p>`;

a["steyr-aug"] = `<h2>Geschichte & Entwicklung</h2>
<p>Das Steyr AUG (Armee Universal Gewehr) wurde in den frühen 1970er Jahren von einem Designteam unter Horst Wesp und Karl Wagner bei Steyr-Daimler-Puch in Österreich entwickelt. 1977 führte das österreichische Bundesheer das AUG als Sturmgewehr 77 (StG 77) ein – es war das erste Bullpup-Sturmgewehr, das als Standard-Ordonnanzwaffe einer Armee eingeführt wurde.</p>
<p>Das revolutionäre Design vereinte mehrere Innovationen: ein integriertes Zielfernrohr, einen Kunststoffgehäuse-Aufbau, modulare Laufwechsel und ein transparentes Magazin. Neben Österreich übernahmen Australien, Neuseeland, Irland, Saudi-Arabien und weitere Staaten das AUG. Steyr Arms produziert das Gewehr bis heute in modernisierten Versionen und es gilt als eines der einflussreichsten Gewehrdesigns des 20. Jahrhunderts.</p>

<h2>Technik & Konstruktion</h2>
<p>Das AUG arbeitet als Gasdrucklader mit einem Kurzhubtreiber und einem Drehkopfverschluss mit sieben Verriegelungswarzen. Der Gasentnahmepunkt liegt etwa auf halber Lauflänge. Die Gasdruckladung ist selbstregulierend und kommt ohne manuell einstellbaren Gasregler aus.</p>
<p>Das Bullpup-Design platziert das Magazin und den Verschluss hinter dem Abzug. Dadurch ist das AUG mit einem 508mm-Lauf nur 790mm lang – rund 200mm kürzer als ein konventionelles Gewehr gleicher Lauflänge. Das Gehäuse besteht aus glasfaserverstärktem Polyamid und ist extrem widerstandsfähig. Der Lauf kann ohne Werkzeug in unter einer Minute gewechselt werden, wodurch das System vom Karabiner bis zum leichten MG konfigurierbar ist.</p>
<p>Das serienmässige 1,5x Zielfernrohr mit Strichkreis war 1977 absolut einzigartig. Es ermöglicht schnelles Zielen auf Kampfentfernungen und hat sich in zahlreichen Konflikten bewährt. Modernere AUG-A3-Versionen verzichten zugunsten einer Picatinny-Schiene auf die integrierte Optik.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>AUG A1:</strong> Originalmodell mit integriertem 1,5x Zielfernrohr. Die klassische Version, wie sie beim österreichischen Bundesheer eingeführt wurde.</li>
<li><strong>AUG A2:</strong> Übergangsmodell mit abnehmbarer Optik und Montageschiene.</li>
<li><strong>AUG A3:</strong> Aktuelle Version mit durchgehender Picatinny-Schiene am Oberteil. Kompatibel mit allen gängigen Optiken und Rotpunktvisieren.</li>
<li><strong>AUG HBAR:</strong> Version mit schwerem Lauf und Zweibein für die Rolle als leichtes Maschinengewehr.</li>
<li><strong>AUG Para:</strong> Umrüstung auf 9×19mm mit eigenem Verschluss und Magazinadapter.</li>
<li><strong>AUG Z (zivil):</strong> Halbautomatische Zivilversion, die in verschiedenen Ländern angeboten wird.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Das AUG ist primär für das NATO-Standardkaliber 5,56×45mm ausgelegt. Mit dem Standard-Lauf (508mm) erreicht das SS109-Geschoss (4 g / 62 grain) eine Mündungsgeschwindigkeit von rund 940 m/s und eine Mündungsenergie von etwa 1760 Joule. Die Drallänge beträgt 228mm (1:9"), was sowohl leichte als auch schwere 5,56mm-Geschosse stabilisiert.</p>
<p>Dank des langen Laufs im kompakten Gehäuse bietet das AUG eine ballistische Leistung, die konventionellen Gewehren gleicher Gesamtlänge deutlich überlegen ist. Die Präzision ab Werk liegt typischerweise bei 1,5–2 MOA mit Standardmunition. Der Rückstoss ist dank des in die Schulter gedrückten Designs minimal und gut kontrollierbar.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>In der Schweiz ist das Steyr AUG als halbautomatische Version mit Waffenerwerbsschein (WES) erhältlich. Neupreise für das AUG A3 liegen bei <strong>CHF 2200 bis 2800</strong>. Gebrauchte Exemplare werden ab <strong>CHF 1500 bis 2200</strong> gehandelt, wobei gut erhaltene A1-Modelle mit Originaloptik bei Sammlern besonders gefragt sind.</p>
<p>Die Verfügbarkeit in der Schweiz ist gut, da Steyr Arms als österreichischer Hersteller den europäischen Markt direkt beliefert. Originalmagazine kosten CHF 30–50, Aftermarket-Magazine sind ab CHF 20 erhältlich. Ersatzläufe sind ab etwa CHF 400 verfügbar.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Das AUG ist wartungsfreundlich konstruiert. Die Feldzerlegung erfolgt werkzeuglos in vier Hauptbaugruppen: Gehäuse, Laufgruppe, Verschlussgruppe und Abzugsgruppe. Der Lauf wird durch eine Schnellwechselvorrichtung gehalten und kann in Sekunden entnommen werden. Das Patronenlager sollte nach dem Schiessen gründlich gereinigt werden.</p>
<p>Der Gaskolben und der Gaskanal sollten regelmässig von Verbrennungsrückständen befreit werden. Das Polymergehäuse benötigt keine besondere Pflege – ein Abwischen mit einem leicht geölten Tuch genügt. Verschleissteile sind der Verschlusskopf (Lebensdauer ca. 15000–20000 Schuss) und die Schliessfeder.</p>
<p>Beliebtes Zubehör umfasst Picatinny-Schienen für die A1-Version, taktische Vordergriffe, Kompensatoren und Rotpunktvisiere. Für die A3-Version ist das Zubehörangebot besonders gross, da sie mit dem vollen Spektrum an NATO-kompatiblen Anbauteilen kompatibel ist.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Das Steyr AUG ist ein Meilenstein der Waffentechnik und auch nach fast 50 Jahren ein zeitgemässes und leistungsfähiges System. Die kompakte Bauweise, die Modularität und die solide Verarbeitung machen es für Sportschützen und Sammler gleichermassen attraktiv. Die österreichische Fertigung steht für hohe Qualität.</p>
<p>Für Schützen, die eine kompakte, zuverlässige Selbstladebüchse in 5,56mm suchen, ist das AUG A3 eine hervorragende Wahl. Der einzige Nachteil ist der für Bullpup-Gewehre typische längere Abzugsweg. Wer ein Stück Waffengeschichte besitzen möchte, greift zum klassischen A1 mit integrierter Optik.</p>`;

a["fn-fal"] = `<h2>Geschichte & Entwicklung</h2>
<p>Die FN FAL (Fusil Automatique Léger – leichtes automatisches Gewehr) wurde ab 1946 von Dieudonné Saive bei FN Herstal in Belgien entwickelt. Ursprünglich für die deutsche Kurzpatrone 7,92×33mm konzipiert, wurde das Design auf Druck der NATO auf das neue Kaliber 7,62×51mm NATO umgestellt. 1953 wurde die FAL offiziell vorgestellt und begann ihren Siegeszug.</p>
<p>Im Kalten Krieg avancierte die FAL zum Standard-Kampfgewehr der westlichen Welt – über 90 Nationen führten sie ein, darunter Grossbritannien, Kanada, Australien, Belgien, die Niederlande, Österreich, Brasilien, Argentinien und zahlreiche afrikanische und asiatische Staaten. Mit über 7 Millionen produzierten Exemplaren und Lizenzfertigungen in einem Dutzend Ländern erhielt die FAL den legendären Beinamen "The Right Arm of the Free World".</p>

<h2>Technik & Konstruktion</h2>
<p>Die FAL arbeitet als Gasdrucklader mit einem Kippblockverschluss. Der Gasentnahmepunkt liegt nahe der Mündung, und ein verstellbarer Gasregler ermöglicht die Anpassung der Gasmenge an verschiedene Munitionstypen und Umweltbedingungen. Wird der Gasregler auf die Stellung "0" gedreht, kann das Gewehr als manueller Repetierer genutzt werden – ein taktischer Vorteil beim Einsatz mit Schalldämpfer.</p>
<p>Der Kippblockverschluss verriegelt durch Abkippen eines Verschlussteils in eine Schulter im Gehäuse. Dieses System ist robust, einfach zu fertigen und langlebig. Das Gewehr kann ohne Werkzeug in seine Hauptbaugruppen zerlegt werden. Die obere und untere Gehäusehälfte werden durch einen Stift verbunden und lassen sich einfach trennen.</p>
<p>Die FAL wurde in zwei Masssystemen gefertigt: metrisch (Originalversion von FN) und zöllig (inch pattern, hauptsächlich für Commonwealth-Staaten). Teile beider Systeme sind nur eingeschränkt austauschbar, was beim Kauf von Ersatzteilen und Magazinen zu beachten ist.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>FAL 50.00:</strong> Standard-Infanteriemodell mit festem Schaft und 533mm-Lauf.</li>
<li><strong>FAL 50.63 (Para):</strong> Fallschirmjäger-Version mit Klappschaft und verkürztem 436mm-Lauf.</li>
<li><strong>FAL FALO (50.41):</strong> Schwere Version mit dickerem Lauf, Zweibein und 30-Schuss-Magazin für die LMG-Rolle.</li>
<li><strong>L1A1 SLR:</strong> Britische Variante im Zoll-Masssystem, ausschliesslich halbautomatisch.</li>
<li><strong>C1/C1A1:</strong> Kanadische Version mit Detailänderungen, ebenfalls nur halbautomatisch.</li>
<li><strong>StG 58:</strong> Österreichische Version, gefertigt von Steyr. Mit Klappgriff und eigenem Mündungsfeuerdämpfer.</li>
<li><strong>DSA SA58:</strong> Moderne amerikanische Zivilversion von DS Arms, in verschiedenen Konfigurationen erhältlich.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Die FAL ist für das Kaliber 7,62×51mm NATO ausgelegt. Das Standardgeschoss (9,5 g / 147 grain Vollmantel) erreicht aus dem 533mm-Lauf eine Mündungsgeschwindigkeit von etwa 840 m/s und eine Mündungsenergie von rund 3350 Joule. Die effektive Reichweite liegt bei 400–600 Metern.</p>
<p>Die Präzision der FAL liegt mit Standardmunition typischerweise bei 2–3 MOA, was für ein Kampfgewehr dieser Ära ausgezeichnet ist. Der einstellbare Gasregler ermöglicht die optimale Abstimmung auf verschiedene Munitionsladungen. Der Rückstoss ist aufgrund des Gasdrucklader-Systems moderater als beim rollenverzögerten G3.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>In der Schweiz sind halbautomatische FAL-Versionen mit Waffenerwerbsschein (WES) erhältlich. Neue DSA SA58 kosten <strong>CHF 2200 bis 3500</strong> je nach Konfiguration. Gebrauchte originale FN FAL in halbautomatischer Ausführung werden für <strong>CHF 1800 bis 3000</strong> gehandelt.</p>
<p>Originale militärische FAL aus Armeebeständen (z.B. österreichische StG 58) sind als Sammlerwaffen beliebt und kosten <strong>CHF 1200 bis 2500</strong>. Britische L1A1 sind in der Schweiz seltener und erzielen <strong>CHF 1500 bis 3000</strong>. Originalmagazine kosten CHF 15–40, wobei zwischen metrischen und Zoll-Magazinen unterschieden werden muss.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Die FAL ist robust und wartungsfreundlich. Die Feldzerlegung erfolgt werkzeuglos durch Herausziehen des Verbindungsstifts zwischen oberem und unterem Gehäuse. Der Gasregler sollte regelmässig gereinigt werden, da sich dort Pulverrückstände ansammeln können.</p>
<p>Der Gaskolben und das Gasrohr sind die wartungsintensivsten Teile. Eine regelmässige Reinigung nach jedem Schiessen ist empfehlenswert. Verschleissteile sind der Verschluss (Lebensdauer ca. 15000–20000 Schuss) und die Schliessfeder.</p>
<p>An Zubehör stehen DSA-Handschutzsysteme mit Picatinny-Schienen, verstellbare Schäfte, Mündungsbremsen und verschiedene Montagesysteme für Optiken zur Verfügung. Der Aftermarket ist gut bestückt, besonders für die metrische Version.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die FN FAL ist eine der bedeutendsten Militärwaffen des 20. Jahrhunderts und bietet auch heute noch eine solide Plattform für den Sportschützen. Der einstellbare Gasregler, die robuste Konstruktion und die gute Ergonomie machen sie zu einer angenehm zu schiessenden Waffe im Kaliber 7,62mm NATO.</p>
<p>Für den Einstieg empfiehlt sich eine DSA SA58, die moderne Fertigungsqualität mit dem bewährten FAL-Design verbindet. Sammler werden sich für originale FN-Produktionen oder seltene nationale Varianten interessieren. Die FAL ist eine lohnende Investition für jeden, der sich für Militärgeschichte und leistungsfähige Halbautomaten begeistert.</p>`;

a["mp5-zivil"] = `<h2>Geschichte & Entwicklung</h2>
<p>Die HK MP5 wurde 1966 von Heckler & Koch in Oberndorf am Neckar vorgestellt. Sie basiert auf dem rollenverzögerten Verschlusssystem des G3-Sturmgewehrs, herunterskaliert auf das Pistolenkaliber 9×19mm. Damit war die MP5 eine der ersten Maschinenpistolen, die aus geschlossenem Verschluss feuerte – ein Merkmal, das ihr eine für Maschinenpistolen einzigartige Präzision verleiht.</p>
<p>Den weltweiten Durchbruch erlebte die MP5 am 18. Oktober 1977, als die GSG-9 bei der Befreiung der entführten Lufthansa-Maschine "Landshut" in Mogadischu eingesetzt wurde. Seitdem wurde die MP5 zum Standard bei Anti-Terror-Einheiten weltweit. Über 100 Staaten setzen sie bei Polizei, Militär und Spezialeinheiten ein. Heckler & Koch hat verschiedene Lizenzfertigungen vergeben, unter anderem an die Türkei (MKE), Pakistan (POF) und Griechenland (EAS).</p>

<h2>Technik & Konstruktion</h2>
<p>Die MP5 verwendet das gleiche rollenverzögerte Rückstosssystem wie das G3. Zwei Rollen im Verschlusskopf greifen in Ausnehmungen im Laufansatz und verzögern das Öffnen des Verschlusses. Der entscheidende Vorteil gegenüber konventionellen Maschinenpistolen mit offenem Verschluss: Bei der MP5 ist der Verschluss beim Schuss geschlossen und verriegelt. Es gibt keine schwere Verschlussmasse, die beim Abdrücken nach vorne schlägt und die Zielerfassung stört.</p>
<p>Das Ergebnis ist eine Streuung von unter 2 MOA auf 25 Meter – für eine Maschinenpistole herausragend. Der Abzug ist sauber und definiert, vergleichbar mit einer Pistole. Das Patronenlager ist wie beim G3 mit Rillen versehen, was die Hülsenextraktion sicherstellt, die Hülsen aber markiert.</p>
<p>Die MP5 kann werkzeuglos in ihre Hauptbaugruppen zerlegt werden. Das Gehäuse ist aus Stahlblech gepresst und mit einer Polymergriffeinheit kombiniert. Die Waffe ist kompakt, gut ausbalanciert und liegt hervorragend in der Hand.</p>

<h2>Varianten & Modelle</h2>
<ul>
<li><strong>MP5A2:</strong> Standardmodell mit festem Kunststoffschaft. Die Grundversion für Polizei und Militär.</li>
<li><strong>MP5A3:</strong> Version mit einziehbarem Metallschaft für kompakteren Transport.</li>
<li><strong>MP5SD:</strong> Version mit integriertem Schalldämpfer und gelochtem Lauf. Reduziert die Mündungsgeschwindigkeit auf Unterschallniveau.</li>
<li><strong>MP5K:</strong> Ultrakompakte Version ohne Schaft, nur 325mm lang. Entwickelt für verdeckten Einsatz.</li>
<li><strong>MP5/10 und MP5/40:</strong> Varianten in 10mm Auto bzw. .40 S&W für US-Behörden.</li>
<li><strong>SP5:</strong> Offizielle halbautomatische Zivilversion von Heckler & Koch. Premium-Qualität.</li>
<li><strong>MKE T94:</strong> Türkische Lizenzproduktion als halbautomatische Zivilversion. Gutes Preis-Leistungs-Verhältnis.</li>
<li><strong>SP5K:</strong> Zivile Version der MP5K mit kurzem Lauf und Picatinny-Schiene.</li>
</ul>

<h2>Kaliber & Ballistik</h2>
<p>Die MP5 ist primär für das Kaliber 9×19mm Parabellum ausgelegt. Aus dem 225mm-Lauf der militärischen Version erreicht ein 8g-Vollmantelgeschoss eine Mündungsgeschwindigkeit von rund 400 m/s und eine Mündungsenergie von etwa 640 Joule. Die zivile SP5 mit längerem Lauf erzielt leicht höhere Werte.</p>
<p>Die effektive Reichweite liegt bei 100–150 Metern für Punktziele. In 9mm ist die MP5 für den Einsatz in geschlossenen Räumen und auf kurze Distanz optimiert. Der Rückstoss ist minimal und extrem gut kontrollierbar, was schnelle Folgeschüsse ermöglicht. Mit hochwertiger Munition sind Streukreise unter 50mm auf 25 Meter möglich.</p>

<h2>Schweizer Markt & Preisentwicklung</h2>
<p>In der Schweiz ist die halbautomatische SP5 von Heckler & Koch mit Waffenerwerbsschein (WES) erhältlich. Der Neupreis für die SP5 liegt bei <strong>CHF 3200 bis 3800</strong>. Die SP5K ist etwas günstiger bei <strong>CHF 2800 bis 3200</strong>.</p>
<p>Die türkische MKE T94 bietet eine günstigere Alternative bei <strong>CHF 1400 bis 1800</strong> und ist in der Schweiz gut verfügbar. Gebrauchte SP5 werden selten angeboten und halten ihren Wert gut bei <strong>CHF 2800 bis 3500</strong>. Ältere HK94 sind Sammlerstücke und erzielen <strong>CHF 3500 bis 5000</strong>.</p>
<p>Magazine kosten CHF 30–60 für Originale von HK, MKE-Magazine sind ab CHF 20 erhältlich. Zubehör wie Klappschäfte, Handschutze und Optik-Montagen sind reichlich verfügbar.</p>

<h2>Pflege, Wartung & Zubehör</h2>
<p>Die MP5 ist robust und wartungsarm. Die Feldzerlegung erfolgt werkzeuglos in wenigen Handgriffen. Das geriffelte Patronenlager sollte regelmässig mit einer Kammerbürste gereinigt werden. Der Lauf ist verchromt und extrem langlebig – Standzeiten von 30000 Schuss und mehr sind normal.</p>
<p>Die Verschlussrollen sollten alle 10000–15000 Schuss kontrolliert werden. Die Schliessfeder ist das häufigste Verschleissteil und sollte alle 5000–8000 Schuss ersetzt werden. Ansonsten ist die MP5 ausserordentlich zuverlässig und verträgt auch billige Übungsmunition.</p>
<p>Beliebtes Zubehör umfasst B&T-Handschutze mit Picatinny-Schienen, Rotpunktvisiere, taktische Taschenlampen, Klappschäfte und verschiedene Mündungsgeräte. Der Aftermarket für die MP5-Plattform ist einer der grössten überhaupt.</p>

<h2>Fazit & Kaufempfehlung</h2>
<p>Die MP5 ist die Ikone unter den Maschinenpistolen und bietet auch in der halbautomatischen Zivilversion ein einzigartiges Schiesserlebnis. Die legendäre Präzision, der geringe Rückstoss und die ikonische Optik machen sie zur Traumwaffe vieler Sportschützen.</p>
<p>Wer das Original will und bereit ist, dafür zu bezahlen, greift zur SP5 von Heckler & Koch. Für preisbewusste Käufer ist die MKE T94 eine solide Alternative mit nahezu identischer Technik. Die MP5-Plattform ist ein zeitloses Design, das auch Jahrzehnte nach seiner Einführung nichts von seiner Faszination verloren hat.</p>`;

for (const [slug, content] of Object.entries(a)) {
  replaceInhalt(slug, content);
}

fs.writeFileSync("src/lib/wissen-data.ts", c);
console.log("Part 1 done (4 articles). File saved.");
