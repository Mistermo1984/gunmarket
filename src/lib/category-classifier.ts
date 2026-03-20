/**
 * Scoring-based category + subcategory classification.
 *
 * Strategy:
 * 1. Detect weapons first (kurzwaffen, langwaffen, ordonnanzwaffen, luftdruckwaffen)
 * 2. Detect non-weapon categories (munition, optik, zubehoer) with higher thresholds
 * 3. Caliber patterns ONLY boost munition if there's already a base munition signal
 * 4. Part/accessory words in descriptions don't override weapon detection
 * 5. Anti-patterns ("für Glock", title starts with accessory word) can override
 *
 * Supports German, French, and Italian keywords.
 */

interface ClassificationResult {
  hauptkategorie: string;
  unterkategorie: string;
}

export function classifyCategory(titel: string, beschreibung: string = ""): ClassificationResult {
  const titelLower = titel.toLowerCase().trim();
  const text = (titel + " " + beschreibung).toLowerCase();

  const scores: Record<string, number> = {
    munition: 0,
    optik: 0,
    zubehoer: 0,
    luftdruckwaffen: 0,
    ordonnanzwaffen: 0,
    kurzwaffen: 0,
    langwaffen: 0,
  };

  // ═══════════════════════════════════════════════════════════════
  // PHASE 1: Detect WEAPONS (score generously)
  // ═══════════════════════════════════════════════════════════════

  // --- KURZWAFFEN ---
  const kurzStrong = [
    "pistole", "pistol ", "pistolet", "handgun", "kurzwaffe",
  ];
  // "revolver" handled separately to avoid matching "revolver" in description of holsters
  if (/\brevolver\b/i.test(titelLower)) scores.kurzwaffen += 4;

  const kurzModels = [
    "glock ", "glock-", "sig p2", "sig p3", "sig p9", "sig sp2",
    "beretta 92", "beretta px", "beretta apx", "beretta m9",
    "cz 75", "cz shadow", "cz p-0", "cz p-1", "cz ts",
    "walther pp", "walther pd", "walther p9", "walther creed", "walther q5",
    "desert eagle", "hk usp", "hk vp", "hk p30", "hk p2", "hk45",
    "sp2022", "sp 2022", "sp-01",
    "canik ", "taurus g", "taurus judge", "taurus raging",
    "springfield xd", "springfield hellcat",
    "browning hi power", "browning hp", "fn 509", "fn five",
    "kimber ", "ruger gp100", "ruger sp101", "ruger blackhawk",
    "ruger redhawk", "ruger wrangler", "ruger vaquero", "ruger security",
    "smith & wesson", "s&w mod", "s&w m&p",
    "1911 ", "hämmerli ", "hammerli ",
    "grand power", "phoenix ", "arex ",
    "steyr m9", "steyr l9", "steyr c9",
    "chiappa rhino", "korth ", "manurhin",
    "astra ", "star bm", "star model",
    "feg ", "pa-63", "tokarev",
    "makarov", "colt python", "colt cobra", "colt king",
    "colt commander", "colt detective", "colt 1911", "colt combat",
    "ruger mark", "ruger sr",
    "sig sauer p", "sig-sauer p",
    "tanfoglio", "pardini", "morini", "match gun",
    "stoeger str", "uberti ", "pietta ",
    "colt single action", "colt saa", "colt 19", "colt anaconda",
    "h&k p", "hk p7", "hk p8",
    "walther p2", "walther g22",
    "nedi ", "feg pa",
    "erma ep", "erma esp",
    "sig-sauer p", "sig sauer p",
  ];

  for (const k of kurzStrong) { if (text.includes(k)) scores.kurzwaffen += 4; }
  for (const k of kurzModels) { if (titelLower.includes(k)) scores.kurzwaffen += 4; }

  // --- LANGWAFFEN ---
  const langStrong = [
    "büchse", "gewehr", "rifle", "karabiner", "carabine",
    "langwaffe", "jagdbüchse", "jagdgewehr", "jagdkarabiner",
    "repetier", "halbautomat", "einzellader", "bolt action", "bolt-action",
    "unterhebelrepetierer", "vorderschaftrepetierer",
    "sturmgewehr",
  ];

  const langModels = [
    "tikka ", "sako ", "sauer 1", "sauer 2", "sauer 4",
    "blaser r", "blaser s", "blaser k",
    "mauser m1", "mauser m1", "steyr mannlicher", "steyr scout",
    "browning x-bolt", "browning bar", "browning a-bolt", "browning bl",
    "winchester model", "winchester xpr", "winchester 94", "winchester sx",
    "remington 700", "remington 783", "marlin ",
    "howa ", "weatherby", "bergara", "christensen",
    "savage ", "ruger american", "ruger precision", "ruger ranch",
    "ruger pc ", "ruger 10/22", "ruger mini",
    "ar-15", "ar15", "ar 15",
    "hera ar", "adc ", "schmeisser",
    "sig mcx", "sig mpx", "sig 55",
    "cz 457", "cz 455", "cz 527", "cz 557",
    "anschütz", "anschutz",
    "kel-tec", "keltec",
    "pedersoli", "henry ", "zastava",
    "rizzini", "chapuis",
    "doppelbüchse", "doppelbuechse", "bergstutzen",
    "lmt ", "hk mr", "hk sl", "hk 416", "hk 417",
    "steyr aug",
    "olympic arms",
    "h&k 6", "h&k 7", "h&k 9",
    "saiga ", "vepr ",
    "mp5 ", "mp 5 ", "mp5k",
    "krico ", "voere ",
    "erma m", "erma em",
  ];

  const flintenKeys = [
    "flinte", "shotgun", "schrotflinte", "bockflinte", "querflinte",
    "drilling", "over/under", "side by side", "pump action", "pump-action",
    "pumpflinte", "bockdoppelflinte",
    "mossberg 500", "mossberg 590", "remington 870",
    "benelli ", "beretta a400", "beretta 686", "beretta 690",
    "beretta 692", "franchi",
    "fusil de chasse",
  ];

  for (const k of langStrong) { if (text.includes(k)) scores.langwaffen += 3; }
  for (const k of langModels) { if (titelLower.includes(k)) scores.langwaffen += 4; }
  for (const k of flintenKeys) { if (text.includes(k)) scores.langwaffen += 4; }

  // --- ORDONNANZWAFFEN ---
  const ordHigh = [
    "k31", "karabiner 31", "k 31", "k-31",
    "stgw 57", "stgw57", "stg 57", "sturmgewehr 57",
    "stgw 90", "stgw90", "sig 550", "sig 551", "sig 553",
    "pe 57", "pe57",
    "schmidt-rubin", "schmidt rubin",
    "vetterli", "infanteriegewehr",
    "sig p210", "sig p 210", "p210",
    "p49", "p75 ",
    "armeerevolver", "armeepistol",
    "ordonnanz",
    "k11", "karabiner 11", "k 11",
    "lg 11", "lg11", "ig 11",
    "mosin", "nagant", "lee enfield", "garand", "mauser 98", "k98",
    "luger p08", "parabellum pistol",
    "ex-armee", "ex armee",
    "stg 90", "stg90", "pe 90", "pe90",
    "gp11",
  ];

  for (const k of ordHigh) { if (text.includes(k)) scores.ordonnanzwaffen += 4; }

  // --- LUFTDRUCKWAFFEN ---
  const luftHigh = [
    "luftgewehr", "luftpistole", "luftdruck", "air rifle", "air pistol",
    "airsoft", "softair", "bb gun", "pellet", "4.5mm bb", "6mm bb",
    "co2 pistole", "co2 gewehr", "co2 revolver", "pcp ", "pressluft",
    "federdruck", "knicklauf", "diabolo", "umarex",
    "home defense", "t4e ", "paintball",
  ];

  for (const k of luftHigh) { if (text.includes(k)) scores.luftdruckwaffen += 4; }

  // ═══════════════════════════════════════════════════════════════
  // PHASE 2: Detect NON-WEAPON categories
  // ═══════════════════════════════════════════════════════════════

  // --- MUNITION (only STRONG signals, NOT caliber alone) ---
  const munitionStrong = [
    "patronen", "schrot ", "slug ", "cartouche", "cartucce",
    "50 stk", "20 stk", "100 stk", "250 stk", "500 stk", "1000 stk",
    " stk.", " stk ",
    "fmj", "hpbt", "hollow point", "hohlspitz", "vollmantel", "teilmantel",
    "bleifrei", "kupfergeschoss",
    "wiederladeset", "ladepress", "hülsentrimm", "pulvermass",
    "matrizensatz", "matrizen ",
  ];

  for (const k of munitionStrong) { if (text.includes(k)) scores.munition += 4; }
  // "Munition" in title is a very strong signal — but "inkl. Munition" is a weapon with ammo
  if (/\bmunition\b/i.test(titelLower) && !/\b(inkl\.?|inklusive|mit|\+|&)\s+.*munition/i.test(titelLower)) scores.munition += 6;
  // "Schuss" only counts for munition if it's the MAIN topic (e.g., "50 Schuss 9mm"), not "400 Schuss" describing use
  if (/\d+\s*schuss\b/i.test(titelLower) && !/\b(pistol|revolver|gewehr|büchse|flinte|glock|sig|beretta|cz|walther|hk)\b/i.test(titelLower)) scores.munition += 4;

  // Caliber patterns ONLY boost munition if there's already a base signal
  if (scores.munition > 0) {
    const caliberBoosters = [
      ".308 win", ".223 rem", ".300 win", "9mm para", "9x19", "7.62x", "5.56x",
      ".45 acp", ".40 s&w", ".357 mag", ".38 spec", "12/70", "12/76", "20/70", "20/76",
      ".22 lr", ".17 hmr", "7.5x55", "grain", " grs",
    ];
    for (const k of caliberBoosters) { if (text.includes(k)) scores.munition += 2; }
  }

  // --- OPTIK ---
  const optikHigh = [
    "zielfernrohr", "rotpunkt", "red dot", "reflex sight",
    "holographic", "leuchtpunkt", "fernglas", "binocular", "spektiv",
    "wärmebildkamera", "wärmebild", "thermal", "nachtsicht", "night vision",
  ];
  const optikBrands = [
    "nightforce", "leupold", "vortex ", "zeiss ", "swarovski ",
    "schmidt & bender", "s&b ", "kahles", "aimpoint",
    "trijicon", "holosun", "bushnell", "hawke ", "steiner ",
    "meopta",
  ];

  for (const k of optikHigh) { if (text.includes(k)) scores.optik += 4; }
  // Optics brands in TITLE — but only if no weapon model also in title
  const hasWeaponInTitle = scores.kurzwaffen >= 4 || scores.langwaffen >= 3 || scores.ordonnanzwaffen >= 4;
  for (const k of optikBrands) {
    if (titelLower.includes(k)) {
      scores.optik += hasWeaponInTitle ? 1 : 4;  // Weaker when weapon is primary
    }
  }
  // "scope" only in title to avoid matching "scope" in random descriptions
  if (/\bscope\b/i.test(titelLower) && !hasWeaponInTitle) scores.optik += 4;

  // --- ZUBEHOER (only from TITLE patterns, not description) ---
  // Title starts with accessory word → strong accessory signal
  if (/^(magazin|holster|schaft |griff |stock |mount|adapter|tasche|koffer|riemen|feder |sling |schiene |bipod|trigger|abzug |ersatz|wechsel|umbau|teile|parts|veste|gilet|jacke|hose|schuh|brille)/i.test(titelLower)) {
    scores.zubehoer += 6;
  }

  // Clearly accessory in title
  const zubehoerTitleWords = [
    "reinigungsset", "putzzeug", "waffenkoffer", "waffentasche",
    "magazintasche", "tragriemen", "zweibein",
    "mündungsbremse", "flash hider", "compensator",
    "griffschalen", "wechsellauf", "ersatzlauf",
    "gehörschutz", "schutzbrille", "ohrenschutz",
    "waffenschrank", "tresor",
    "zubehör", "accessoire",
    "linsenschutz", "objektivdeckel",
    "ersatzteile", "umbausatz",
    "wiederlade", "wiederlad",
    "messer ", "dolch ", "schwert", "bowie", "machete",
    "bogen ", "armbrust",
  ];

  for (const k of zubehoerTitleWords) { if (titelLower.includes(k)) scores.zubehoer += 5; }

  // ═══════════════════════════════════════════════════════════════
  // PHASE 3: ANTI-PATTERNS
  // ═══════════════════════════════════════════════════════════════

  // "Für Glock 17" / "für SIG P226" / "zu K31" / "zu Stgw 90" → accessory, not the gun itself
  if (/\b(für|zu|per|pour)\s+(glock|sig|beretta|cz|walther|hk|h&k|smith|s&w|ruger|taurus|1911|ar.?15|tikka|blaser|remington|benelli|mossberg|stgw|k31|k11|p210|p226|p229|p320|mp5|hämmerli|hammerli)/i.test(titelLower)) {
    scores.zubehoer += 6;
    scores.kurzwaffen = Math.max(0, scores.kurzwaffen - 4);
    scores.langwaffen = Math.max(0, scores.langwaffen - 4);
    scores.ordonnanzwaffen = Math.max(0, scores.ordonnanzwaffen - 4);
  }

  // "Holster für" / "Magazin für" / "Trigger Glock" / "Stock AR15" etc. → clearly accessory
  if (/\b(holster|magazin|ersatzteil|teile|mount|montage|adapter|hülle|etui|étui|schaft|griff|trigger|abzug|stock|futteral|handschutz|filter|lauf)\s+(für|zu|to|per|pour|glock|sig|beretta|cz|walther|hk|stgw|k31|ar.?15|mp5)\b/i.test(titelLower)) {
    scores.zubehoer += 6;
    scores.kurzwaffen = Math.max(0, scores.kurzwaffen - 4);
    scores.langwaffen = Math.max(0, scores.langwaffen - 4);
    scores.ordonnanzwaffen = Math.max(0, scores.ordonnanzwaffen - 4);
  }

  // Clothing/gear → zubehoer (only check title)
  if (/\b(veste|gilet|vest |jacket|jacke|hose|schuh|stiefel|handschuh|cap |mütze|rucksack|backpack|brille)\b/i.test(titelLower)) {
    scores.zubehoer += 8;
    scores.kurzwaffen = 0;
    scores.langwaffen = 0;
  }

  // "inkl." / "mit" + accessory words in title means it's a weapon WITH accessories, not an accessory
  // Don't let "inkl. 2 Magazine" push a weapon into zubehoer
  if (/\b(inkl\.?|inklusive|mit|plus|\+|&)\s+.{0,15}(magazin|holster|koffer|tasche|munition|visier|red dot|zielfernrohr|montage)/i.test(titelLower)) {
    // This is a weapon with extras — reduce zubehoer score
    scores.zubehoer = Math.max(0, scores.zubehoer - 4);
  }

  // ═══════════════════════════════════════════════════════════════
  // PHASE 4: FIND WINNER
  // ═══════════════════════════════════════════════════════════════

  const weaponCategories = ["kurzwaffen", "langwaffen", "ordonnanzwaffen", "luftdruckwaffen"];

  // Weapons get priority in ties
  const allEntries = Object.entries(scores);
  allEntries.sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    // Tie-break: prefer weapon categories
    const aIsWeapon = weaponCategories.includes(a[0]) ? 1 : 0;
    const bIsWeapon = weaponCategories.includes(b[0]) ? 1 : 0;
    return bIsWeapon - aIsWeapon;
  });

  const maxScore = allEntries[0][1];

  // If no category scored at all, default to zubehoer
  if (maxScore < 2) {
    return { hauptkategorie: "zubehoer", unterkategorie: detectSubcategory("zubehoer", text) };
  }

  const winner = allEntries[0][0];
  const sub = detectSubcategory(winner, text);

  return { hauptkategorie: winner, unterkategorie: sub };
}

function detectSubcategory(hauptkategorie: string, text: string): string {
  switch (hauptkategorie) {
    case "kurzwaffen": {
      if (/revolver|python|cobra|anaconda|detective|tracker|judge|raging|blackhawk|wrangler|vaquero|gp100|sp101|redhawk|model\s*\d+.*mag/i.test(text)) return "revolver";
      return "pistolen";
    }
    case "langwaffen": {
      if (/flinte|shotgun|schrotflinte|bockflinte|querflinte|drilling|pump.?action|pumpflinte|over[\s/]under|side[\s/]by|beretta\s*(686|690|691|692|a400)|benelli|franchi|mossberg|remington\s*870/i.test(text)) return "flinten";
      if (/jagd|pirsch|ansitz|kirrung|kipplauf|bockb[üu]chs/i.test(text)) return "jagdwaffen";
      if (/b[üu]chse|repetier|bolt[\s-]?action|einzellad|karabiner/i.test(text)) return "buechsen";
      return "andere-langwaffen";
    }
    case "ordonnanzwaffen": {
      if (/p[\s.-]?210|p49|p75|ordonnanzpistol|armeepistol|armeerevolver/i.test(text)) return "kurzwaffen-ordonnanz";
      return "langwaffen-ordonnanz";
    }
    case "luftdruckwaffen": {
      if (/luftpistol|air[\s-]?pistol|co2[\s-]?pistol/i.test(text)) return "luftpistolen";
      if (/co2|softair|airsoft|bb[\s-]?gun|gbb|aeg|hpa|paintball|t4e/i.test(text)) return "co2-waffen";
      return "luftgewehre";
    }
    case "optik": {
      if (/rotpunkt|red[\s-]?dot|reflex|holosun|aimpoint|eotech|leuchtpunkt/i.test(text)) return "rotpunktvisiere";
      if (/fernglas|spektiv|binocular/i.test(text)) return "fernglaeser";
      if (/montage|ring|rail|weaver|picatinny/i.test(text)) return "montagen";
      return "zielfernrohre";
    }
    case "zubehoer": {
      if (/magazin|ladevorrichtung|charger|speedloader|moonclip/i.test(text)) return "magazine";
      if (/holster|tasche|futteral|koffer|etui|étui/i.test(text)) return "holster";
      if (/lauf|verschluss|schlitten|abzug|trigger|griffst[üu]ck|teil|parts|pin |set /i.test(text)) return "lauefe-teile";
      if (/reinigung|pflege|[öo]l\b|putzstock|putzzeug/i.test(text)) return "reinigung";
      return "andere-zubehoer";
    }
    case "munition":
      return "";
    default:
      return "";
  }
}
