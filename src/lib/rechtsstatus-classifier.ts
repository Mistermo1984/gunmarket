/**
 * Schweizer Waffenrecht — Automatische Rechtsstatus-Klassifikation
 *
 * Basierend auf dem Bundesgesetz über Waffen (WG), SR 514.54
 *
 * Drei Kategorien:
 * - frei:      Keine Bewilligung nötig. Luftdruck, CO2, Softair, Schreckschuss, Messer, Bögen,
 *              Armbrust, Dekowaffen, antike Waffen, Optik, Zubehör,
 *              Repetiergewehre, Einzellader, Bockflinten, Pump-Action, Vorderlader, Kipplauf
 * - wes:       Waffenerwerbsschein nötig. ALLE Pistolen & Revolver (Kurzwaffen),
 *              Halbautomaten mit abnehmbarem Magazin, Ordonnanzwaffen
 * - abk-klein: Ausnahmebewilligung nötig. Vollautomaten, Schalldämpfer,
 *              Nachtsicht-Zielgeräte, Laser-Zielgeräte
 *
 * PRIORITY ORDER (critical — checked top to bottom):
 *   1. Non-weapon categories (optik, zubehoer, munition, freie-waffen) → frei
 *   2. ABK patterns (full-auto, suppressor) → abk-klein
 *   3. Explicit non-weapon items (softair, CO2, deko) → frei
 *   4. Kurzwaffen category → ALWAYS WES
 *   5. Known pistol/revolver brand keywords → WES
 *   6. Ordonnanzwaffen category → WES
 *   7. Pure accessory listings (no weapon in title) → frei
 *   8. Category-specific logic (jagdwaffen, flinten, büchsen)
 *   9. Fallback → WES
 */

interface ClassificationInput {
  titel: string;
  beschreibung: string;
  hauptkategorie: string;
  unterkategorie: string;
}

// ─── ABK Klein: Verbotene Waffen / Gegenstände ──────────────────
const ABK_KLEIN_PATTERNS = [
  /\bvollautoma/i,
  /\bfull[\s-]?auto/i,
  /\bselect[\s-]?fire/i,
  /\bschalld[äa]mpfer/i,
  /\bsuppressor/i,
  /\bsilencer/i,
  /\bschallschutz/i,
  /\bnachtsicht[\s-]?ziel/i,
  /\bnight[\s-]?vision[\s-]?scope/i,
  /\blaser[\s-]?ziel/i,
  /\blaser[\s-]?sight/i,
  /\blaservisier/i,
  /\bgranate\b/i,
  /\bgranatwerfer/i,
  /\braketenwerfer/i,
];

// ─── Explicit non-weapon patterns (ONLY things that are CLEARLY not real weapons) ───
const CLEARLY_NOT_WEAPON = [
  /\bsoftair\b/i, /\bairsoft\b/i, /\bairgun\b/i,
  /\b(gbb|aeg|hpa)\b/i,
  /\bluftdruck/i, /\bluftgewehr/i, /\bluftpistole/i,
  /\bco2[\s-]?(pistol|gewehr|waffe|revolver)/i,
  /\bschreckschuss/i, /\bplatzpatron/i, /\bknallpatron/i,
  /\bsignalpistol/i, /\bsignal[\s-]?waffe/i,
  /\bgas[\s-]?pistol/i, /\bgas[\s-]?revolver/i,
  /\bstarter[\s-]?pistol/i,
  /\bdeko[\s-]?waffe/i, /\bdeaktiviert/i,
  /\battrappe/i, /\breplica\b/i, /\bnachbildung/i,
  /\bpfeffer[\s-]?spray/i, /\bpfefferspray/i,
  /\bvorderlader/i, /\bmuzzle[\s-]?load/i,
];

// ─── Known pistol/revolver keywords → instant WES ──────────────
const WES_KURZWAFFE_KEYWORDS = [
  /\bpistole?\b/i,
  /\brevolver\b/i,
  // Glock models
  /\bglock\s*\d/i,
  // SIG pistol models
  /\bsig\b.*\bp\d{3}/i, /\bp226\b/i, /\bp320\b/i, /\bp365\b/i, /\bp210\b/i, /\bp220\b/i,
  /\bsig[\s-]?sauer\b/i,
  // Beretta pistol models
  /\bberetta\b.*\b(92|px4|apx|m9|80)\b/i,
  // CZ pistol models
  /\bcz\s*(75|shadow|p[\s-]?\d|sp[\s-]?\d)/i,
  // Walther pistol models
  /\bwalther\s*(p\d|ppq|pdp|ppk|pps|creed|q\d)/i,
  // HK pistol models
  /\b(hk|heckler)\b.*\b(usp|vp\d|p\d|sfp|mk23)\b/i,
  // Smith & Wesson
  /\bsmith\s*[&+]?\s*wesson/i, /\bs&w\b/i, /\bs\s*&\s*w\b/i,
  // Colt pistol/revolver models
  /\bcolt\b.*\b(python|cobra|king|1911|anaconda|trooper|detective|peace)/i,
  /\bcolt\s+\d/i,
  // Taurus models
  /\btaurus\b.*\b(mod|raging|g[23]|th\d|g2c|judge|tracker)\b/i,
  // Springfield
  /\bspringfield\b.*\b(xd|hellcat|1911|prodigy|echelon)\b/i,
  // Kimber
  /\bkimber\b.*\b(1911|custom|ultra|pro|rapide|k6)\b/i,
  // Ruger pistol models
  /\bruger\b.*\b(sr\d|lc\d|security|mk\s*[iv]|gp100|sp101|redhawk|blackhawk|wrangler|vaquero|57)\b/i,
  // FN pistol models
  /\bfn\b.*\b(five|fiveseven|57|509|fnx|fnp)\b/i,
  // Steyr pistol
  /\bsteyr\b.*\b(m\d|l\d|c\d|s\d)\b/i,
  // Canik
  /\bcanik\b/i,
  // 1911 platform
  /\b1911\b/i,
  // Desert Eagle
  /\bdesert\s*eagle/i,
  // Makarov
  /\bmakarov\b/i,
  // Tokarev
  /\btokarev\b/i, /\btt[\s-]?33\b/i,
  // Luger
  /\bluger\b.*\bp[\s-]?08\b/i, /\bparabellum\b.*\bpistol/i,
];

// ─── Frei Langwaffen: Repetier/Einzellader/Kipplauf ────────────
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
  /\btikka\b/i, /\bsako\b/i,
  /\bblaser[\s.-]?r\d/i,
  /\bmauser[\s.-]?m\d/i, /\bmauser[\s.-]?98/i, /\bmauser[\s.-]?k98/i,
  /\bremington[\s.-]?700/i,
  /\bwinchester[\s.-]?(70|94|1895)/i,
  /\bsavage[\s.-]?\d/i,
  /\bbrowning[\s.-]?(x[\s-]?bolt|a[\s-]?bolt|citori|b525)/i,
  /\bruger[\s.-]?(american|hawkeye|precision|ranch|scout)\b/i,
  /\bbergara\b/i, /\bchristensen\b/i,
  /\bhowa\b/i, /\bweatherby\b/i,
  /\bsteyr[\s.-]?mannlicher/i,
  /\bmerkel\b/i, /\bsauer\s+\d{3}/i,
  /\bk[\s.-]?31\b/i,
  /\bkarabiner[\s.-]?31/i,
  /\bk[\s.-]?11\b/i, /\blg[\s.-]?11\b/i,
  /\big[\s.-]?11\b/i,
  /\binfanteriegewehr/i,
  /\bschmidt[\s.-]?rubin/i,
];

// ─── Frei Flinten: Bock/Quer/Pump ─────────────────────────────
const FREI_FLINTEN_PATTERNS = [
  /\bbock[\s-]?flinte/i,
  /\bquer[\s-]?flinte/i,
  /\bkipplauf/i,
  /\bdrilling\b/i,
  /\bpump[\s-]?action/i, /\bpump[\s-]?gun/i, /\bpumpflinte/i, /\bvorderschaftrepet/i,
  /\bremington[\s.-]?870/i,
  /\bmossberg[\s.-]?500/i, /\bmossberg[\s.-]?590/i,
  /\bbenelli[\s.-]?(supernova|nova)\b/i,
  /\bbrowning[\s.-]?bps/i,
  /\bberetta[\s.-]?(686|690|691|692|dt\d|silver)\b/i,
  /\bbrowning[\s.-]?(citori|b525)\b/i,
  /\bbenelli[\s.-]?(828|montefeltro)\b/i,
  /\brizzini\b/i,
  /\bover[\s/-]?under/i, /\bside[\s/-]?by[\s/-]?side/i,
  /\bsuperpos[ée]/i, /\bjuxtapos[ée]/i,
];

// ─── Pure non-weapon items (accessories, optics, gear) ─────────
const PURE_ACCESSORY_PATTERNS = [
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
  /\bh[üu]lse\b/i, /\bgeschoss\b/i,
  /\bzielfernrohr/i, /\bfernrohr\b/i, /\bfernglas/i, /\bspektiv/i,
  /\bred[\s-]?dot/i, /\brotpunkt/i, /\breflex[\s-]?visier/i,
  /\bholosun\b/i, /\baimpoint\b/i, /\beotech\b/i, /\btrijicon\b/i,
  /\bvortex\b/i, /\bkahles\b/i, /\bswarovski\b/i,
  /\bvector[\s-]?optics/i,
  /\bwaffenschrank/i, /\bwaffenkoffer/i, /\btresor/i,
  /\bbekleidung/i, /\bjacke\b/i, /\bhose\b/i, /\bschuh/i,
  /\bgehörschutz/i, /\bschutzbrille/i,
  /\bschiess[\s-]?stand/i,
  /\bmesser\b/i, /\bklappmesser/i, /\btaschenmesser/i,
  /\bdolch\b/i, /\bschwert/i, /\bs[äa]bel\b/i,
  /\bbajonett/i, /\bmachete/i, /\bbeil\b/i, /\baxt\b/i,
  /\bvictorinox/i, /\bblankwaffe/i,
  /\bbogen\b/i, /\bcompound[\s-]?bogen/i, /\brecurve/i,
  /\barmbrust/i, /\bcrossbow/i,
  /\bpfeil\b/i, /\bbolzen\b/i,
  /\bantik/i, /\bvor\s*18[0-6]\d/i,
  /\bdiabolos?\b/i,
  /\b4[,.]5[\s]?mm.*luft/i, /\bluft.*4[,.]5/i,
  /\b\.177\b/i,
  /\bumarex\b/i,
];

// Does the text reference an actual firearm?
const HAS_WEAPON_NAME = /\b(pistol|revolver|gewehr|b[üu]chse|flinte|karabiner|stgw|fass\s*\d|sig\s*(p\d|55|51)|glock|beretta|colt|taurus|ruger|walther|hk|cz\s*\d|smith|s&w|browning|benelli|remington|winchester|mauser|springfield|kimber|canik|1911|desert\s*eagle)\b/i;

/**
 * Bestimmt den Rechtsstatus basierend auf Titel, Beschreibung und Kategorie.
 */
export function classifyRechtsstatus(input: ClassificationInput): string {
  const text = `${input.titel} ${input.beschreibung}`.toLowerCase();
  const titel = input.titel.toLowerCase();
  const { hauptkategorie } = input;

  // ═══════════════════════════════════════════════════════════════
  // STEP 1: Non-weapon categories → frei (except munition → wes)
  // ═══════════════════════════════════════════════════════════════

  if (hauptkategorie === "optik") {
    if (ABK_KLEIN_PATTERNS.some(p => p.test(text))) return "abk-klein";
    return "frei";
  }
  if (hauptkategorie === "zubehoer") {
    if (ABK_KLEIN_PATTERNS.some(p => p.test(text))) return "abk-klein";
    return "frei";
  }
  if (hauptkategorie === "munition") {
    if (/knallpatron|platzpatron|übung/i.test(text)) return "frei";
    if (/hülse\b|geschoss|wiederlad/i.test(text)) return "frei";
    return "wes";
  }
  if (hauptkategorie === "freie-waffen") {
    return "frei";
  }

  // ═══════════════════════════════════════════════════════════════
  // STEP 2: ABK Klein (highest restriction)
  // ═══════════════════════════════════════════════════════════════

  if (ABK_KLEIN_PATTERNS.some(p => p.test(text))) {
    return "abk-klein";
  }

  // ═══════════════════════════════════════════════════════════════
  // STEP 3: Explicit non-weapons (softair, CO2, deko, schreckschuss)
  // These override everything below — if it says "Softair Glock", it's frei
  // ═══════════════════════════════════════════════════════════════

  if (CLEARLY_NOT_WEAPON.some(p => p.test(text))) {
    return "frei";
  }

  // ═══════════════════════════════════════════════════════════════
  // STEP 4: KURZWAFFEN CATEGORY → ALWAYS WES
  // This MUST come before any accessory/frei checks.
  // A Glock with a holster mentioned is still WES.
  // ═══════════════════════════════════════════════════════════════

  if (hauptkategorie === "kurzwaffen") {
    return "wes";
  }

  // ═══════════════════════════════════════════════════════════════
  // STEP 5: Known pistol/revolver TITLE keywords → WES
  // Catches pistols/revolvers in wrong categories
  // ═══════════════════════════════════════════════════════════════

  if (WES_KURZWAFFE_KEYWORDS.some(p => p.test(titel))) {
    return "wes";
  }

  // ═══════════════════════════════════════════════════════════════
  // STEP 6: Ordonnanzwaffen category → WES
  // (K31 accessories will be caught by pure-accessory check below)
  // ═══════════════════════════════════════════════════════════════

  if (hauptkategorie === "ordonnanzwaffen") {
    // Pure accessories in ordonnanz category → frei
    if (!HAS_WEAPON_NAME.test(titel) && PURE_ACCESSORY_PATTERNS.some(p => p.test(titel))) {
      return "frei";
    }
    return "wes";
  }

  // ═══════════════════════════════════════════════════════════════
  // STEP 7: Pure accessory listings (no weapon name in title) → frei
  // ═══════════════════════════════════════════════════════════════

  if (!HAS_WEAPON_NAME.test(titel) && PURE_ACCESSORY_PATTERNS.some(p => p.test(titel))) {
    return "frei";
  }

  // ═══════════════════════════════════════════════════════════════
  // STEP 8: Category-specific logic
  // ═══════════════════════════════════════════════════════════════

  // Jagdwaffen (legacy slug, now merged into buechsen): default frei (bolt-action, single-shot)
  if (hauptkategorie === "jagdwaffen") {
    if (/\bhalbautomat|selbstlade|semi[\s-]?auto/i.test(text)) return "wes";
    return "frei";
  }

  // Flinten: Over/Under, pump = frei; semi-auto = wes
  if (hauptkategorie === "flinten") {
    if (/\bselbstlade|halbautomat|semi[\s-]?auto/i.test(text)) return "wes";
    if (FREI_FLINTEN_PATTERNS.some(p => p.test(text))) return "frei";
    return "frei";
  }

  // Büchsen: bolt-action/repeater = frei; semi-auto = wes
  if (hauptkategorie === "buechsen") {
    if (/\bhalbautomat|selbstlade|semi[\s-]?auto/i.test(text)) return "wes";
    if (FREI_LANGWAFFEN_PATTERNS.some(p => p.test(text))) return "frei";
    if (/\brepetier|bolt[\s-]?action|einzellad/i.test(text)) return "frei";
    return "wes";
  }

  // ═══════════════════════════════════════════════════════════════
  // STEP 9: No category match — check by text patterns
  // ═══════════════════════════════════════════════════════════════

  if (FREI_LANGWAFFEN_PATTERNS.some(p => p.test(text))) {
    if (/\bhalbautomat|selbstlade|semi[\s-]?auto/i.test(text)) return "wes";
    return "frei";
  }

  // Fallback: WES (safest assumption for unknown weapons)
  return "wes";
}
