/**
 * Schweizer Waffenrecht — Automatische Rechtsstatus-Klassifikation
 *
 * Basierend auf dem Bundesgesetz über Waffen (WG), Art. 4, 5, 7, 8, 10, 11, 28, 28b, 28d
 *
 * Kategorien:
 * - frei:       Luftdruck, CO2, Schreckschuss, Softair, antike Waffen (vor 1870), Messer, Bögen
 * - kaufvertrag: Repetiergewehre (Jagd), Einzellader, Bockflinten, Drillinge — nur schriftl. Vertrag nötig
 * - wes:        Pistolen, Revolver, Halbautomaten (Magazin ≤10 Schuss Langwaffe, ≤20 Kurzwaffe)
 * - abk-klein:  Ehemalige Vollautomaten → Halbautomat, Halbautomaten mit grossem Magazin (>10/20),
 *               auf <60cm verkürzbare Waffen, Pumpguns <50cm Lauf
 * - abk-gross:  Vollautomaten, Schalldämpfer, Nachtsicht-Zielgeräte, Laser-Zielgeräte
 *
 * Nicht-Waffen (Optik, Munition, Zubehör allgemein): "frei" — kein WES nötig für Kauf
 * Munition allein: "wes" — Munitionserwerb erfordert WES in der Schweiz
 */

interface ClassificationInput {
  titel: string;
  beschreibung: string;
  hauptkategorie: string;
  unterkategorie: string;
}

// ─── ABK Gross: Verbotene Waffen / Gegenstände ──────────────────
const ABK_GROSS_PATTERNS = [
  // Vollautomaten (nicht umgebaut)
  /\bvollautoma/i,
  /\bfull[\s-]?auto/i,
  /\bselect[\s-]?fire/i,
  // Schalldämpfer
  /\bschalld[äa]mpfer/i,
  /\bsuppressor/i,
  /\bsilencer/i,
  /\bschallschutz/i,
  /\bmoderator/i,
  // Nachtsicht-Zielgeräte (am Waffe montiert, nicht Beobachtung)
  /\bnachtsicht[\s-]?ziel/i,
  /\bnight[\s-]?vision[\s-]?scope/i,
  // Laser-Zielgeräte
  /\blaser[\s-]?ziel/i,
  /\blaser[\s-]?sight/i,
  /\blaservisier/i,
  // Granaten, Minen etc.
  /\bgranate\b/i,
  /\bgranatwerfer/i,
  /\bmine\b/i,
  /\braketenwerfer/i,
];

// ─── ABK Klein: Ehemals verbotene / umgebaute Waffen ────────────
// Ehemalige Sturmgewehre/MG umgebaut auf Halbautomat
const ABK_KLEIN_WEAPON_MODELS = [
  // Schweizer Sturmgewehre (umgebaut)
  /\bstgw[\s.-]?90\b/i, /\bstgw[\s.-]?57\b/i,
  /\bfass[\s.-]?90\b/i, /\bfass[\s.-]?57\b/i,
  /\bsig[\s.-]?55[0-3x]/i,  // SIG 550, 551, 552, 553, 55X
  /\bsig[\s.-]?510/i,
  /\bpe[\s.-]?57\b/i,
  // AK-Varianten (zivile Halbautomaten von ehem. Vollautomaten)
  /\bak[\s-]?47\b/i, /\bak[\s-]?74\b/i, /\bakm\b/i, /\baks[\s-]?74/i,
  /\bvz[\s.-]?58\b/i, /\bvz[\s.-]?61\b/i,
  /\bsaiga\b/i,
  // AR-15 Plattform (Halbautomat, aber >10 Magazin möglich → ABK Klein)
  /\bar[\s-]?15\b/i, /\bm[\s-]?4\b(?!.*softair|.*airsoft|.*gbb|.*hpa)/i,
  /\bm[\s-]?16\b/i,
  /\bhk[\s.-]?416\b/i, /\bhk[\s.-]?417\b/i, /\bhk[\s.-]?mr\d/i,
  /\bsig[\s.-]?mcx/i, /\bsig[\s.-]?mpx/i,
  /\bsig[\s.-]?sauer[\s]+(516|716)/i,
  /\bcz[\s.-]?bren/i,
  /\bberetta[\s.-]?arx/i,
  // MP-Varianten (umgebaut)
  /\bmp[\s-]?5\b/i, /\bmp[\s-]?7\b/i, /\bmp[\s-]?9\b/i,
  /\bump[\s-]?45\b/i, /\bump[\s-]?9\b/i,
  /\bb&?t[\s.-]?apc/i, /\bb&?t[\s.-]?spc/i, /\bb&?t[\s.-]?ghm/i,
  /\bspectre[\s.-]?m4/i,
  /\bscorpion[\s.-]?evo/i,
  /\bthompson\b/i, /\btommy[\s-]?gun/i,
  /\bsten\b/i, /\bmp[\s-]?40\b/i,
  /\buzi\b/i, /\bmini[\s-]?uzi/i, /\bmicro[\s-]?uzi/i,
  // MG umgebaut
  /\bmg[\s-]?34\b/i, /\bmg[\s-]?42\b/i, /\bmg[\s-]?3\b/i,
  /\blmg[\s-]?25\b/i, /\blmg[\s-]?51\b/i,
  /\bbren[\s-]?gun/i,
  // FN-Varianten
  /\bfn[\s.-]?fal\b/i, /\bfn[\s.-]?scar/i, /\bfn[\s.-]?fs2000/i,
  /\bfn[\s.-]?p90/i,
  // G-Serie (HK)
  /\bg[\s-]?3\b/i, /\bg[\s-]?36\b/i,
  /\bhk[\s.-]?g3/i, /\bhk[\s.-]?g36/i,
  // Steyr
  /\bsteyr[\s.-]?aug/i,
  // Galil
  /\bgalil\b/i,
  // IWI
  /\btavor\b/i, /\bx[\s-]?95\b/i,
  // SUB2000 / KelTec
  /\bsub[\s-]?2000/i, /\bkel[\s-]?tec/i,
  // Stoner
  /\bstoner\b/i,
];

// ─── Frei: Keine Bewilligung nötig ─────────────────────────────
const FREI_PATTERNS = [
  // Luftdruck / CO2 / Softair
  /\bluftdruck/i, /\bluftgewehr/i, /\bluftpistole/i,
  /\bco2[\s-]?(pistol|gewehr|waffe|revolver)/i, /\bco2\b/i,
  /\bsoftair/i, /\bairsoft/i, /\bairgun/i,
  /\b(gbb|aeg|hpa)\b/i,  // Airsoft antriebe
  /\bumarex\b.*(?!echt)/i,
  /\bdiabolos?\b/i,
  /\b4[,.]5[\s]?mm.*luft/i, /\bluft.*4[,.]5/i,
  /\b\.177\b/i,
  // Schreckschuss / Signalwaffen
  /\bschreckschuss/i, /\bplatzpatron/i, /\bknallpatron/i,
  /\bsignalpistol/i, /\bsignal[\s-]?waffe/i,
  /\bgas[\s-]?pistol/i, /\bgas[\s-]?revolver/i,
  /\bstarter[\s-]?pistol/i,
  /\bpfeffer[\s-]?spray/i, /\bpfefferspray/i,
  // Messer / Blankwaffen
  /\bmesser\b/i, /\bklappmesser/i, /\btaschenmesser/i,
  /\bdolch\b/i, /\bschwert/i, /\bs[äa]bel\b/i,
  /\bbajonett/i, /\bmachete/i, /\bbeil\b/i, /\baxt\b/i,
  /\bvictorinox/i,
  /\bblankwaffe/i,
  // Bogen / Armbrust
  /\bbogen\b/i, /\bcompound[\s-]?bogen/i, /\brecurve/i,
  /\barmbrust/i, /\bcrossbow/i,
  /\bpfeil\b/i, /\bbolzen\b/i,
  // Antik
  /\bantik/i,  /\bvor\s*18[0-6]\d/i,
  // Dekowaffen
  /\bdeko[\s-]?waffe/i, /\bdeaktiviert/i, /\bdekoriert/i,
  /\battrappe/i, /\breplica\b/i, /\bnachbildung/i,
  // Zubehör das kein WES braucht
  /\bholster\b/i, /\btasche\b/i, /\bkoffer\b/i, /\bfutteral/i,
  /\breinigung/i, /\bpflege/i, /\bwaffen[\s-]?[öo]l/i,
  /\bgriffschale/i, /\bgriffst[üu]ck/i,
  /\bschaft\b/i, /\bvorderschaft/i, /\bhandschutz/i,
  /\bpicatinny/i, /\brail\b/i, /\bmontage\b/i, /\bringe\b/i,
  /\bbipod\b/i, /\bstativ\b/i,
  /\bm[üu]ndungsbremse/i, /\bkompensator/i,
  /\bmagazin\b/i, /\blader\b/i,
  /\btrageriemen/i, /\bgurt\b/i,
  /\bwiederlad/i, /\bmatriz/i, /\bladepress/i,
  /\bh[üu]lse\b/i,
  /\bgeschoss\b/i,  // Komponenten
  /\bzielfernrohr/i, /\bfernrohr\b/i, /\bfernglas/i, /\bspektiv/i,
  /\bred[\s-]?dot/i, /\brotpunkt/i, /\breflex[\s-]?visier/i,
  /\bholosun\b/i, /\baimpoint\b/i, /\beotech\b/i, /\btrijicon\b/i,
  /\bvortex\b/i, /\bkahles\b/i, /\bswarovski\b.*optik/i,
  /\bvector[\s-]?optics/i,
  /\bwaffenschrank/i, /\bwaffenkoffer/i, /\btresor/i,
  /\bbekleidung/i, /\bjacke\b/i, /\bhose\b/i, /\bschuh/i,
  /\bgehörschutz/i, /\bschutzbrille/i,
  /\bschiess[\s-]?stand/i,
];

// WES ist der Default-Fallback für Waffen — keine explizite Pattern-Liste nötig.
// Kurzwaffen (Pistolen, Revolver), reguläre Halbautomaten = WES

// ─── Kaufvertrag: Langwaffen die nur Vertrag brauchen ───────────
const KAUFVERTRAG_PATTERNS = [
  // Repetiergewehre für Jagd/Sport
  /\brepetier[\s-]?b[üu]chse/i,
  /\brepetier[\s-]?gewehr/i,
  /\bbolt[\s-]?action/i,
  // Kipplauf / Einzellader
  /\bkipplauf/i,
  /\beinzellader/i,
  /\bbock[\s-]?b[üu]chse/i,
  /\bbock[\s-]?flinte/i,
  /\bquer[\s-]?flinte/i,
  /\bdrilling\b/i,
  /\bbock[\s-]?b[üu]chs[\s-]?flinte/i,
  // Jagdgewehre
  /\bjagd[\s-]?b[üu]chse/i,
  /\bjagd[\s-]?gewehr/i,
  /\bjagd[\s-]?karabiner/i,
  /\bjagd[\s-]?flinte/i,
  // Bekannte Jagd-/Repetiergewehre
  /\btikka\b/i,
  /\bsako\b/i,
  /\bblaser[\s.-]?r\d/i,  // Blaser R8, R93
  /\bmauser[\s.-]?m\d/i, /\bmauser[\s.-]?98/i, /\bmauser[\s.-]?k98/i,
  /\bremington[\s.-]?700/i, /\bremington[\s.-]?870/i,
  /\bwinchester[\s.-]?(70|94|1895)/i,
  /\bsavage[\s.-]?\d/i,
  /\bbrowning[\s.-]?(bar|x[\s-]?bolt|a[\s-]?bolt|citori|maxus|b525)/i,
  /\bbenelli[\s.-]?(828|ethos|montefeltro|supernova)/i,
  /\bberetta[\s.-]?(686|690|691|692|dt\d|a300|a400|silver)/i,
  /\bruger[\s.-]?(american|hawkeye|precision|ranch|scout)/i,
  /\bbergara\b/i, /\bchristensen\b/i,
  /\bhowa\b/i, /\bweatherby\b/i,
  /\bsteyr[\s.-]?mannlicher/i,
  /\bmerkel\b/i, /\bsauer\s+\d{3}/i,
  // K31 (Ordonnanz-Repetiergewehr — Kaufvertrag bei Privatkauf)
  /\bk[\s.-]?31\b/i,
  /\bkarabiner[\s.-]?31/i,
  /\bk[\s.-]?11\b/i, /\blg[\s.-]?11\b/i,
  /\big[\s.-]?11\b/i,
  /\binfanteriegewehr/i,
  /\bschmidt[\s.-]?rubin/i,
  // Unterhebelrepetierer
  /\bunterhebelrepet/i, /\blever[\s-]?action/i,
  /\bhenry\b/i, /\bmarlin\b/i, /\brossi\b/i,
];

// Spezifische Ordonnanz-Modelle die je nach Situation unterschiedlich klassifiziert werden
const ORDONNANZ_MODELS = [
  /\bstgw[\s.-]?90\b/i, /\bstgw[\s.-]?57\b/i,
  /\bfass[\s.-]?90\b/i, /\bfass[\s.-]?57\b/i,
  /\bsig[\s.-]?55[0-3x]/i, /\bsig[\s.-]?510/i,
  /\bpe[\s.-]?57\b/i,
];

/**
 * Bestimmt den Rechtsstatus basierend auf Titel, Beschreibung und Kategorie.
 *
 * Priorität: abk-gross > frei (Nicht-Waffen) > abk-klein > kaufvertrag > wes (default für Waffen)
 */
export function classifyRechtsstatus(input: ClassificationInput): string {
  const text = `${input.titel} ${input.beschreibung}`.toLowerCase();
  const { hauptkategorie } = input;

  // ─── Nicht-Waffen Kategorien: direkt klassifizieren ────────────

  // Optik: immer frei (kein WES nötig für Optik-Kauf)
  if (hauptkategorie === "optik") {
    // Ausnahme: Nachtsicht-Zielgeräte am Waffe = ABK Gross
    if (/nachtsicht[\s-]?ziel/i.test(text) || /night[\s-]?vision[\s-]?scope/i.test(text)) {
      return "abk-gross";
    }
    return "frei";
  }

  // Zubehör: fast immer frei
  if (hauptkategorie === "zubehoer") {
    // Schalldämpfer im Zubehör → ABK Gross
    if (ABK_GROSS_PATTERNS.some(p => p.test(text))) return "abk-gross";
    return "frei";
  }

  // Munition: WES erforderlich (Art. 15 WG)
  if (hauptkategorie === "munition") {
    // Knallpatronen, Platzpatronen = frei
    if (/knallpatron/i.test(text) || /platzpatron/i.test(text) || /übung/i.test(text)) return "frei";
    // Hülsen, Geschosse (Komponenten) = frei
    if (/hülse\b/i.test(text) || /geschoss/i.test(text) || /wiederlad/i.test(text)) return "frei";
    return "wes";
  }

  // Freie Waffen Kategorie: Luftdruck, Softair etc.
  if (hauptkategorie === "freie-waffen") {
    return "frei";
  }

  // ─── Waffen-Kategorien: Detailanalyse ─────────────────────────

  // 1. Check ABK Gross zuerst (höchste Stufe)
  if (ABK_GROSS_PATTERNS.some(p => p.test(text))) {
    return "abk-gross";
  }

  // 2. Check ob es ein Nicht-Waffen-Artikel ist (Zubehör/Optik in Waffen-Kategorie)
  // Wenn der Titel klar Zubehör ist, frei
  const isAccessory = /\b(rail|montage|picatinny|schaft|griffschale|magazin|bipod|mündungsbremse|kompensator|adapter|set\b.*(?:rail|montage|picatinny))\b/i.test(text);
  if (isAccessory && !/\b(pistol|revolver|gewehr|büchse|flinte|karabiner)\b/i.test(text)) {
    return "frei";
  }

  // Prüfe ob Frei-Muster matchen (Softair, Messer, Dekowaffen etc.)
  if (FREI_PATTERNS.some(p => p.test(text))) {
    // Aber nicht wenn es auch eine echte Waffe ist
    const hasRealWeapon = /\b(pistol|revolver|gewehr|büchse|flinte|karabiner|stgw|sig\s+p\d)\b/i.test(text);
    if (!hasRealWeapon || /\bsoftair|airsoft|luftdruck|schreckschuss|deko|replika|nachbildung|co2\b/i.test(text)) {
      return "frei";
    }
  }

  // 3. Check ABK Klein
  // Ordonnanzwaffen-Kategorie: ehem. Sturmgewehre → ABK Klein
  if (hauptkategorie === "ordonnanzwaffen") {
    // Halbautomatische Ordonnanzwaffen (Stgw, SIG 550 etc.) = ABK Klein
    if (ORDONNANZ_MODELS.some(p => p.test(text))) {
      return "abk-klein";
    }
    // Repetier-Ordonnanzwaffen (K31, K11, IG11) = Kaufvertrag
    if (KAUFVERTRAG_PATTERNS.some(p => p.test(text))) {
      return "kaufvertrag";
    }
    // Default Ordonnanz: WES (z.B. Ordonnanzpistolen)
    return "wes";
  }

  // Ehem. Vollautomaten / Sturmgewehre → ABK Klein
  if (ABK_KLEIN_WEAPON_MODELS.some(p => p.test(text))) {
    // Ausnahme: Wenn es klar Softair/Airsoft ist
    if (/\bsoftair|airsoft|gbb|aeg|hpa\b/i.test(text)) return "frei";
    return "abk-klein";
  }

  // 4. Check Kaufvertrag (Repetiergewehre, Jagdwaffen, Einzellader)
  if (hauptkategorie === "jagdwaffen") {
    return "kaufvertrag";
  }

  if (KAUFVERTRAG_PATTERNS.some(p => p.test(text))) {
    // Aber nicht wenn es auch ein Halbautomat ist
    if (/\bhalbautomat|selbstlade|semi[\s-]?auto/i.test(text)) {
      return "wes";
    }
    return "kaufvertrag";
  }

  // Flinten: Standard Bock/Querflinten = Kaufvertrag, Selbstlader = WES, Pump = kontextabhängig
  if (hauptkategorie === "flinten") {
    if (/\bbock|quer|kipplauf|drilling/i.test(text)) return "kaufvertrag";
    if (/\bselbstlade|halbautomat|semi[\s-]?auto/i.test(text)) return "wes";
    if (/\bpump|vorderschaft/i.test(text)) {
      // Pump-Action mit kurzem Lauf (<50cm) = ABK Klein
      if (/\bkurz|compact|tactical|taktisch|breacher/i.test(text)) return "abk-klein";
      return "wes";
    }
    return "kaufvertrag"; // Default Flinten = Kaufvertrag
  }

  // 5. Default: Kurzwaffen = WES, Büchsen = kontextabhängig
  if (hauptkategorie === "kurzwaffen") {
    return "wes";
  }

  if (hauptkategorie === "buechsen") {
    // Halbautomatische Büchsen: prüfe ob ABK Klein nötig
    if (/\bhalbautomat|selbstlade|semi[\s-]?auto/i.test(text)) {
      // Wenn es ein ehem. Sturmgewehr ist → ABK Klein (schon oben abgefangen)
      return "wes"; // Regulärer Halbautomat = WES
    }
    // Repetiergewehre = Kaufvertrag
    if (/\brepetier|bolt[\s-]?action|einzellad/i.test(text)) return "kaufvertrag";
    // Default Büchsen: WES (sicherste Annahme)
    return "wes";
  }

  // Fallback: WES (sicherste Annahme für unbekannte Waffen)
  return "wes";
}
