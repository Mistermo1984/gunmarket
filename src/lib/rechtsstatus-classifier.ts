/**
 * Schweizer Waffenrecht — Automatische Rechtsstatus-Klassifikation
 *
 * Basierend auf dem Bundesgesetz über Waffen (WG), SR 514.54
 *
 * Drei Kategorien:
 * - frei:      Keine Bewilligung nötig. Luftdruck, CO2, Softair, Schreckschuss, Messer, Bögen,
 *              Armbrust, Dekowaffen, antike Waffen, Optik, Zubehör,
 *              Repetiergewehre, Einzellader, Bockflinten, Drillinge, Pump-Action (max 3 Schuss),
 *              Vorderlader, Kipplauf
 * - wes:       Waffenerwerbsschein nötig. ALLE Pistolen & Revolver (Kurzwaffen),
 *              Halbautomaten mit abnehmbarem Magazin, Ordonnanzwaffen (Stgw 90, SIG 550 etc.)
 * - abk-klein: Ausnahmebewilligung nötig. Vollautomaten, Schalldämpfer,
 *              Nachtsicht-Zielgeräte, Laser-Zielgeräte, militärische Waffen
 *
 * Munition: WES erforderlich (Art. 15 WG), Komponenten (Hülsen, Geschosse) = frei
 */

interface ClassificationInput {
  titel: string;
  beschreibung: string;
  hauptkategorie: string;
  unterkategorie: string;
}

// ─── ABK Klein: Verbotene Waffen / Gegenstände ──────────────────
const ABK_KLEIN_PATTERNS = [
  // Vollautomaten
  /\bvollautoma/i,
  /\bfull[\s-]?auto/i,
  /\bselect[\s-]?fire/i,
  // Schalldämpfer
  /\bschalld[äa]mpfer/i,
  /\bsuppressor/i,
  /\bsilencer/i,
  /\bschallschutz/i,
  /\bmoderator/i,
  // Nachtsicht-Zielgeräte (am Waffe montiert)
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

// ─── Frei: Keine Bewilligung nötig ─────────────────────────────
const FREI_PATTERNS = [
  // Luftdruck / CO2 / Softair
  /\bluftdruck/i, /\bluftgewehr/i, /\bluftpistole/i,
  /\bco2[\s-]?(pistol|gewehr|waffe|revolver)/i, /\bco2\b/i,
  /\bsoftair/i, /\bairsoft/i, /\bairgun/i,
  /\b(gbb|aeg|hpa)\b/i,
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
  // Antik / Vorderlader
  /\bantik/i, /\bvor\s*18[0-6]\d/i,
  /\bvorderlader/i, /\bmuzzle[\s-]?load/i,
  // Dekowaffen
  /\bdeko[\s-]?waffe/i, /\bdeaktiviert/i, /\bdekoriert/i,
  /\battrappe/i, /\breplica\b/i, /\bnachbildung/i,
  // Zubehör
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
  /\bgeschoss\b/i,
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

// ─── Frei Langwaffen: Repetier/Einzellader/Kipplauf/Pump ──────
const FREI_LANGWAFFEN_PATTERNS = [
  /\brepetier[\s-]?b[üu]chse/i,
  /\brepetier[\s-]?gewehr/i,
  /\bbolt[\s-]?action/i,
  /\bkipplauf/i,
  /\beinzellader/i,
  /\bbock[\s-]?b[üu]chse/i,
  /\bbock[\s-]?flinte/i,
  /\bquer[\s-]?flinte/i,
  /\bdrilling\b/i,
  /\bbock[\s-]?b[üu]chs[\s-]?flinte/i,
  /\bjagd[\s-]?b[üu]chse/i,
  /\bjagd[\s-]?gewehr/i,
  /\bjagd[\s-]?karabiner/i,
  /\bjagd[\s-]?flinte/i,
  /\bunterhebelrepet/i, /\blever[\s-]?action/i,
  /\bhenry\b/i, /\bmarlin\b/i, /\brossi\b/i,
  // Bekannte Repetiergewehre
  /\btikka\b/i,
  /\bsako\b/i,
  /\bblaser[\s.-]?r\d/i,
  /\bmauser[\s.-]?m\d/i, /\bmauser[\s.-]?98/i, /\bmauser[\s.-]?k98/i,
  /\bremington[\s.-]?700/i,
  /\bwinchester[\s.-]?(70|94|1895)/i,
  /\bsavage[\s.-]?\d/i,
  /\bbrowning[\s.-]?(x[\s-]?bolt|a[\s-]?bolt|citori|b525)/i,
  /\bruger[\s.-]?(american|hawkeye|precision|ranch|scout)/i,
  /\bbergara\b/i, /\bchristensen\b/i,
  /\bhowa\b/i, /\bweatherby\b/i,
  /\bsteyr[\s.-]?mannlicher/i,
  /\bmerkel\b/i, /\bsauer\s+\d{3}/i,
  // K31, K11 (Ordonnanz-Repetiergewehre = frei)
  /\bk[\s.-]?31\b/i,
  /\bkarabiner[\s.-]?31/i,
  /\bk[\s.-]?11\b/i, /\blg[\s.-]?11\b/i,
  /\big[\s.-]?11\b/i,
  /\binfanteriegewehr/i,
  /\bschmidt[\s.-]?rubin/i,
];

// ─── Frei Flinten: Bock/Quer/Pump (nicht Halbautomat) ─────────
const FREI_FLINTEN_PATTERNS = [
  /\bbock[\s-]?flinte/i,
  /\bquer[\s-]?flinte/i,
  /\bkipplauf/i,
  /\bdrilling\b/i,
  /\bpump[\s-]?action/i, /\bpump[\s-]?gun/i, /\bpumpflinte/i, /\bvorderschaftrepet/i,
  /\bremington[\s.-]?870/i,
  /\bmossberg[\s.-]?500/i, /\bmossberg[\s.-]?590/i,
  /\bbenelli[\s.-]?(supernova|nova)/i,
  /\bbrowning[\s.-]?bps/i,
  /\bberetta[\s.-]?(686|690|691|692|dt\d|silver)/i,
  /\bbrowning[\s.-]?(citori|b525)/i,
  /\bbenelli[\s.-]?(828|montefeltro)/i,
];

/**
 * Bestimmt den Rechtsstatus basierend auf Titel, Beschreibung und Kategorie.
 *
 * Priorität: abk-klein > frei (Nicht-Waffen) > frei (Langwaffen) > wes (default für Waffen)
 */
export function classifyRechtsstatus(input: ClassificationInput): string {
  const text = `${input.titel} ${input.beschreibung}`.toLowerCase();
  const { hauptkategorie } = input;

  // ─── Nicht-Waffen Kategorien: direkt klassifizieren ────────────

  // Optik: immer frei
  if (hauptkategorie === "optik") {
    if (ABK_KLEIN_PATTERNS.some(p => p.test(text))) return "abk-klein";
    return "frei";
  }

  // Zubehör: fast immer frei
  if (hauptkategorie === "zubehoer") {
    if (ABK_KLEIN_PATTERNS.some(p => p.test(text))) return "abk-klein";
    return "frei";
  }

  // Munition: WES erforderlich (Art. 15 WG)
  if (hauptkategorie === "munition") {
    if (/knallpatron/i.test(text) || /platzpatron/i.test(text) || /übung/i.test(text)) return "frei";
    if (/hülse\b/i.test(text) || /geschoss/i.test(text) || /wiederlad/i.test(text)) return "frei";
    return "wes";
  }

  // Freie Waffen Kategorie: Luftdruck, Softair etc.
  if (hauptkategorie === "freie-waffen") {
    return "frei";
  }

  // ─── Waffen-Kategorien: Detailanalyse ─────────────────────────

  // 1. ABK Klein zuerst (höchste Stufe)
  if (ABK_KLEIN_PATTERNS.some(p => p.test(text))) {
    return "abk-klein";
  }

  // 2. Nicht-Waffen in Waffen-Kategorie (Zubehör/Optik falsch kategorisiert)
  const isAccessory = /\b(rail|montage|picatinny|schaft|griffschale|magazin|bipod|mündungsbremse|kompensator|adapter|set\b.*(?:rail|montage|picatinny))\b/i.test(text);
  if (isAccessory && !/\b(pistol|revolver|gewehr|büchse|flinte|karabiner)\b/i.test(text)) {
    return "frei";
  }

  // Prüfe ob Frei-Muster matchen (Softair, Messer, Dekowaffen etc.)
  if (FREI_PATTERNS.some(p => p.test(text))) {
    const hasRealWeapon = /\b(pistol|revolver|gewehr|büchse|flinte|karabiner|stgw|sig\s+p\d)\b/i.test(text);
    if (!hasRealWeapon || /\bsoftair|airsoft|luftdruck|schreckschuss|deko|replika|nachbildung|co2\b/i.test(text)) {
      return "frei";
    }
  }

  // 3. KURZWAFFEN: ALLE Pistolen & Revolver = WES, keine Ausnahme
  if (hauptkategorie === "kurzwaffen") {
    return "wes";
  }

  // 4. Ordonnanzwaffen: alle WES (Stgw 90, SIG 550, Ordonnanzpistolen etc.)
  if (hauptkategorie === "ordonnanzwaffen") {
    return "wes";
  }

  // 5. Jagdwaffen: default frei (Repetier/Einzellader/Kipplauf)
  if (hauptkategorie === "jagdwaffen") {
    // Halbautomaten in Jagdkategorie = WES
    if (/\bhalbautomat|selbstlade|semi[\s-]?auto/i.test(text)) return "wes";
    return "frei";
  }

  // 6. Flinten
  if (hauptkategorie === "flinten") {
    // Halbautomatische Flinten = WES
    if (/\bselbstlade|halbautomat|semi[\s-]?auto/i.test(text)) return "wes";
    // Bock/Quer/Pump/Kipplauf = frei
    if (FREI_FLINTEN_PATTERNS.some(p => p.test(text))) return "frei";
    // Default Flinten = frei (Bockflinten etc.)
    return "frei";
  }

  // 7. Büchsen
  if (hauptkategorie === "buechsen") {
    // Halbautomatische Büchsen = WES
    if (/\bhalbautomat|selbstlade|semi[\s-]?auto/i.test(text)) return "wes";
    // Repetiergewehre / Einzellader = frei
    if (FREI_LANGWAFFEN_PATTERNS.some(p => p.test(text))) return "frei";
    if (/\brepetier|bolt[\s-]?action|einzellad/i.test(text)) return "frei";
    // Default Büchsen: wes (sicherste Annahme)
    return "wes";
  }

  // 8. Check ob es ein freies Langwaffen-Muster ist
  if (FREI_LANGWAFFEN_PATTERNS.some(p => p.test(text))) {
    if (/\bhalbautomat|selbstlade|semi[\s-]?auto/i.test(text)) return "wes";
    return "frei";
  }

  // Fallback: WES (sicherste Annahme für unbekannte Waffen)
  return "wes";
}
