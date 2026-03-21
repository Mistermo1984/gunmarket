// ─── Types ───────────────────────────────────────────────────────────────────
export interface BannerEvent {
  name: string;
  date: string;
  dateEnd: string;
  ort: string;
  inhalt: string;
  href: string;
}

export interface BannerItem {
  name: string;
  meta: string;
  href: string;
}

// ─── ALLE EVENTS 2026 ───────────────────────────────────────────────────────
export const ALL_EVENTS: BannerEvent[] = [
  // Historische Schiessen
  { name: 'Grauholzschiessen',              date: '2026-02-28', dateEnd: '2026-03-01', ort: 'Grauholz',       inhalt: 'Gewehr',            href: 'https://www.grauholzschiessen.ch' },
  { name: 'Erinnerungsschiessen Burgdorf',  date: '2026-02-28', dateEnd: '2026-02-28', ort: 'Burgdorf',       inhalt: 'Gewehr',            href: 'https://www.stadtschuetzen-burgdorf.ch' },
  { name: 'Fahrtschiessen Mollis',          date: '2026-04-18', dateEnd: '2026-04-19', ort: 'Mollis',         inhalt: 'Gewehr',            href: 'https://www.schuetzenveteranen-zh.ch' },
  { name: 'Gedenkschiessen Rothenthurm',    date: '2026-04-25', dateEnd: '2026-04-26', ort: 'Rothenthurm',   inhalt: 'Gewehr',            href: 'https://www.gedenkschiessen.ch' },
  { name: 'Tir de Bourbaki',               date: '2026-05-08', dateEnd: '2026-05-09', ort: 'Les Verrières',  inhalt: 'Gewehr',            href: 'https://www.laverrisanne.ch' },
  { name: 'Calvenschiessen Davos',          date: '2026-05-23', dateEnd: '2026-05-23', ort: 'Davos',          inhalt: 'Gewehr / Pistole',  href: 'https://www.calvenschiessen.ch' },
  { name: 'Staudenschlacht',               date: '2026-05-09', dateEnd: '2026-05-09', ort: 'Bremgarten',     inhalt: 'Gewehr / Pistole',  href: 'https://www.staudenschlacht.ch' },
  { name: 'Murtenschiessen',               date: '2026-05-21', dateEnd: '2026-05-21', ort: 'Murten',         inhalt: 'Gewehr',            href: 'https://www.murtenschiessen.ch' },
  { name: 'Sempacher Schiessen',           date: '2026-06-24', dateEnd: '2026-06-27', ort: 'Sempach',        inhalt: 'Gewehr',            href: '#' },
  { name: 'Stoss-Schiessen',               date: '2026-08-29', dateEnd: '2026-08-30', ort: 'Stoss AR',       inhalt: 'Gewehr',            href: '#' },
  { name: 'Schwaderloh-Schiessen',         date: '2026-09-19', dateEnd: '2026-09-27', ort: 'Schwaderloh',    inhalt: 'Gewehr / Pistole',  href: '#' },
  { name: 'Bauernkriegs-Gedenkschiessen',  date: '2026-10-03', dateEnd: '2026-10-03', ort: 'Entlebuch',      inhalt: 'Gewehr',            href: 'https://www.asg-entlebuch.ch' },
  { name: 'Gotthardschiessen',             date: '2026-10-09', dateEnd: '2026-10-10', ort: 'Airolo',         inhalt: 'Gewehr',            href: 'https://www.tirostoricosangottardo.ch' },
  { name: 'Rütlischiessen',               date: '2026-11-04', dateEnd: '2026-11-04', ort: 'Rütli',          inhalt: 'Gewehr',            href: 'https://www.ruetlischiessen.ch' },
  { name: 'Morgartenschiessen',            date: '2026-11-14', dateEnd: '2026-11-14', ort: 'Morgarten',      inhalt: 'Gewehr / Pistole',  href: 'https://www.morgartenschiessen.ch' },

  // Waffenbörsen
  { name: '50. Int. Waffen-Sammlerbörse Luzern', date: '2026-03-27', dateEnd: '2026-03-29', ort: 'KKL Luzern', inhalt: 'Börse', href: 'https://www.waffenboerse-luzern.ch' },

  // Waffenläufe
  { name: 'Wiedlisbacher Waffenlauf',      date: '2026-04-12', dateEnd: '2026-04-12', ort: 'Wiedlisbach',    inhalt: '13,1 km',           href: 'https://www.fruehlingsslauf-wiedlisbach.ch' },
  { name: 'Domleschger Waffenlauf',        date: '2026-05-03', dateEnd: '2026-05-03', ort: 'Scharans',       inhalt: '14,0 km',           href: 'https://www.domleschger-lauf.org' },
  { name: '5-Schlösserlauf',              date: '2026-05-24', dateEnd: '2026-05-24', ort: 'Holderbank',     inhalt: '11,3 km',           href: 'https://www.5schloesserlauf.ch' },
  { name: 'Lenzburger Waffenlauf',         date: '2026-05-30', dateEnd: '2026-05-30', ort: 'Lenzburg',       inhalt: '14,4 km',           href: 'https://www.lenzburgerrlauf.ch' },
  { name: 'Fricktaler Waffenlauf',         date: '2026-05-07', dateEnd: '2026-05-07', ort: 'Kaisten',        inhalt: '16,3 km',           href: 'https://www.vckaisten.ch' },
  { name: 'Murianer Waffenlauf',           date: '2026-09-05', dateEnd: '2026-09-05', ort: 'Muri AG',        inhalt: '14,8 km',           href: 'https://www.herbstlauf.ch' },
  { name: 'Burgdorfer Waffenlauf',         date: '2026-10-17', dateEnd: '2026-10-17', ort: 'Burgdorf',       inhalt: '16,1 km',           href: '#' },
  { name: 'Niederbipper Waffenlauf',       date: '2026-11-01', dateEnd: '2026-11-01', ort: 'Niederbipp',     inhalt: '21,1 km',           href: '#' },

  // Militär / Spezial
  { name: 'STAC 2026 — Swiss Tank & Artillery Challenge', date: '2026-09-18', dateEnd: '2026-09-18', ort: 'Thun BE', inhalt: 'Militär', href: 'https://www.vtg.admin.ch' },
];

// ─── WAFFENHÄNDLER ──────────────────────────────────────────────────────────
export const DEALERS: BannerItem[] = [
  // Top-Adressen
  { name: 'Gun Factory',              meta: 'Rümlang ZH',               href: 'https://www.gunfactory.ch' },
  { name: 'Munitionsdepot.ch',        meta: 'Zwingen BL',               href: 'https://www.munitionsdepot.ch' },
  { name: 'W. Glaser Waffen',         meta: 'Zürich ZH',                href: 'https://www.wglaser.ch' },
  { name: 'Natur Aktiv / Waffenbörse',meta: 'Dietikon ZH',              href: 'https://www.waffenboerse.ch' },
  { name: 'Felder Jagdhof',           meta: 'Ebikon LU',                href: 'https://www.felder-jagdhof.ch' },
  { name: 'B&T Shop',                 meta: 'Thun / Wallisellen',        href: 'https://www.bt-ag.ch' },
  { name: 'Waffen Ingold',            meta: 'Oensingen SO',             href: 'https://www.waffen-ingold.ch' },
  { name: 'Aebi Waffen',              meta: 'Hasle-Rüegsau BE',         href: 'https://www.aebiwaffen.ch' },
  { name: 'Lagardère',                meta: 'Morges VD',                href: 'https://www.lagardere.ch' },
  { name: 'Wyss Waffen',              meta: 'Burgdorf BE',              href: 'https://www.wysswaffen.ch' },
  { name: 'Schild Waffen',            meta: 'Wallisellen ZH',           href: 'https://www.schildwaffen.ch' },
  { name: 'Gundam.ch / René Hild',    meta: 'Friltschen TG',            href: 'https://www.gundam.ch' },
  { name: 'Geissbühler Schiesssport', meta: 'Zuchwil SO',               href: 'https://www.geissbuehler.ch' },
  { name: 'Grünig & Elmiger',         meta: 'Malters LU',               href: 'https://www.gruenel.ch' },
  { name: 'Treehuggers Supply',       meta: 'Bülach ZH',                href: 'https://www.treehuggers.ch' },
  { name: 'Waffen Dobler',            meta: 'Kaltbrunn SG',             href: 'https://www.waffendobler.ch' },
  { name: 'Gunlex',                   meta: 'Lyss BE',                  href: 'https://www.gunlex.ch' },
  { name: 'Brownells Schweiz',        meta: 'Online / Luzern',          href: 'https://www.brownells.ch' },
  { name: 'Poyet AG',                 meta: 'Bern BE',                  href: 'https://www.poyet.ch' },
  { name: 'Outdoor Enterprise',       meta: 'Le Mont-sur-Lausanne VD',  href: 'https://www.outdoor-enterprise.ch' },
  { name: 'Hebeisen Hunting',         meta: 'Zürich ZH',                href: 'https://www.hebeisen.ch' },
  { name: 'Waffenshop Gerber',        meta: 'Trubschachen BE',          href: 'https://www.waffenshop-gerber.ch' },
  { name: 'Birkenast',                meta: 'Zuzwil SG',                href: 'https://www.birkenast.ch' },
  { name: 'Forney Waffen',            meta: 'Zürich ZH',                href: 'https://www.forney-waffen.ch' },
  { name: 'Schwyzer Waffen',          meta: 'Goldau SZ',                href: 'https://www.schwyzerwaffen.ch' },
  { name: 'Tanner Waffen',            meta: 'Thayngen SH',              href: 'https://www.tanner-waffen.ch' },
  { name: 'Fischlin Waffen',          meta: 'Goldau SZ',                href: 'https://www.fischlin-waffen.ch' },
  { name: 'Bürchler Waffen',          meta: 'Zürich ZH',                href: 'https://www.waffen-buerchler.ch' },
  { name: 'Hausammann',               meta: 'Uttwil TG',                href: 'https://www.hausammann.ch' },
  { name: 'Waffen-Zentrum',           meta: 'Gampelen BE',              href: 'https://www.waffen-zentrum.ch' },
  // Weitere Fachgeschäfte
  { name: 'Armurerie du Château',     meta: 'Puidoux VD',               href: 'https://www.armurerie-du-chateau.ch' },
  { name: 'Armurerie de la Bourse',   meta: 'Genève GE',                href: 'https://www.armurerie-bourse.ch' },
  { name: 'Petitpierre Armurerie',    meta: 'Auvernier NE',             href: 'https://www.armurerie-petitpierre.ch' },
  { name: 'Ducret Armurerie',         meta: 'Orbe VD',                  href: 'https://www.armurerie-ducret.ch' },
  { name: 'Tissot Armurerie',         meta: 'Fribourg FR',              href: 'https://www.tissot-armurerie.ch' },
  { name: 'Armeria Bioggio',          meta: 'Bioggio TI',               href: 'https://www.armeriabioggio.ch' },
  { name: 'Armeria del Ceresio',      meta: 'Melano TI',                href: 'https://www.armeriadelceresio.ch' },
  { name: 'Waffen Schuler',           meta: 'Brunnen SZ',               href: 'https://www.waffenschuler.ch' },
  { name: 'Kessler Waffen',           meta: 'Degersheim SG',            href: 'https://www.kesslerwaffen.ch' },
  { name: 'Waffen-Pfister',           meta: 'Pfäffikon ZH',             href: 'https://www.waffen-pfister.ch' },
  { name: 'Antikschuss',              meta: 'Aadorf TG',                href: 'https://www.antikschuss.ch' },
  { name: 'Militaria-Shop',           meta: 'Online / Bern',            href: 'https://www.militaria-shop.ch' },
  { name: 'Salvisberg Waffen',        meta: 'Bern BE',                  href: 'https://www.salvisberg-waffen.ch' },
  { name: 'Richner Waffen',           meta: 'Lenzburg AG',              href: 'https://www.richner-waffen.ch' },
  { name: 'Waffen-Friedlin',          meta: 'Zug ZG',                   href: 'https://www.waffenfriedlin.ch' },
  { name: 'Brünig Indoor',            meta: 'Brünig OW',                href: 'https://www.bruenigindoor.ch' },
  { name: 'Waffen Widmer',            meta: 'Horgen ZH',                href: 'https://www.waffen-widmer.ch' },
  { name: 'Swiss P Defence / RUAG',   meta: 'Thun BE',                  href: 'https://www.swissp-defence.com' },
  { name: 'Waffen Zimmermann',        meta: 'Luzern LU',                href: 'https://www.waffen-zimmermann.ch' },
  { name: 'Armurerie Saint-Hubert',   meta: 'Martigny VS',              href: 'https://www.armureriesainthubert.ch' },
];

// ─── AKTIONEN ────────────────────────────────────────────────────────────────
export const PROMOS: BannerItem[] = [
  { name: 'Frühjahrsputz bei Ingold',   meta: '10% auf Reinigungssets · bis 31. März', href: '#' },
  { name: '7.5×55 Swiss ab CHF 0.65',   meta: 'Munitions-Abverkauf · Solange Vorrat',  href: '#' },
  { name: 'Inserat aufgeben — kostenlos', meta: 'gunmarket.ch · Jetzt starten',        href: '/inserat/neu' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
export function formatEventDate(dateStr: string, dateEndStr?: string): string {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d.toLocaleDateString('de-CH', { month: 'short' });
  if (!dateEndStr || dateEndStr === dateStr) return `${day}. ${month}`;
  const dEnd = new Date(dateEndStr);
  if (dEnd.getTime() === d.getTime()) return `${day}. ${month}`;
  const dayEnd = dEnd.getDate();
  const monthEnd = dEnd.toLocaleDateString('de-CH', { month: 'short' });
  if (month === monthEnd) return `${day}.–${dayEnd}. ${month}`;
  return `${day}. ${month} – ${dayEnd}. ${monthEnd}`;
}

export function getUpcomingEvents(): BannerEvent[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cutoff = new Date(today);
  cutoff.setDate(cutoff.getDate() + 90);

  return ALL_EVENTS
    .filter(ev => {
      const evDate = new Date(ev.dateEnd || ev.date);
      return evDate >= today && new Date(ev.date) <= cutoff;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
