import { MetadataRoute } from "next";
import { initializeSchema, dbAll } from "@/lib/db";
import { wissenWaffen, wissenMunition } from "@/lib/wissen-data";

const SITE_URL = "https://gunmarket.ch";

const KATEGORIEN = [
  "kurzwaffen",
  "buechsen",
  "flinten",
  "ordonnanzwaffen",
  "freie-waffen",
  "zubehoer",
];

const KANTONE = [
  "AG", "AI", "AR", "BE", "BL", "BS", "FR", "GE", "GL", "GR",
  "JU", "LU", "NE", "NW", "OW", "SG", "SH", "SO", "SZ", "TG",
  "TI", "UR", "VD", "VS", "ZG", "ZH",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/suche`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/wissen`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/wissen/waffen`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/wissen/munition`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/vereine`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/waffenrecht`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/sicherheit`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/agb`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/impressum`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/register`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const kategoriePages: MetadataRoute.Sitemap = KATEGORIEN.map((kat) => ({
    url: `${SITE_URL}/kategorien/${kat}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const kantonPages: MetadataRoute.Sitemap = KANTONE.map((kanton) => ({
    url: `${SITE_URL}/suche?kanton=${kanton}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  let inseratPages: MetadataRoute.Sitemap = [];
  try {
    await initializeSchema();
    const listings = await dbAll<{ id: string; updated_at: string }>(
      "SELECT id, updated_at FROM listings WHERE status = 'aktiv' ORDER BY created_at DESC"
    );

    inseratPages = listings.map((l) => ({
      url: `${SITE_URL}/inserat/${l.id}`,
      lastModified: l.updated_at ? new Date(l.updated_at) : new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));
  } catch {
    // DB not available during build
  }

  const wissenWaffenPages: MetadataRoute.Sitemap = wissenWaffen.map((w) => ({
    url: `${SITE_URL}/wissen/waffen/${w.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const wissenMunitionPages: MetadataRoute.Sitemap = wissenMunition.map((m) => ({
    url: `${SITE_URL}/wissen/munition/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...kategoriePages,
    ...kantonPages,
    ...inseratPages,
    ...wissenWaffenPages,
    ...wissenMunitionPages,
  ];
}
