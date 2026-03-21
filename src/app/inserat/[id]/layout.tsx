import type { Metadata } from "next";
import { initializeSchema, dbGet, dbAll } from "@/lib/db";
import { getKategorieLabel } from "@/lib/kategorie-labels";

interface ListingRow {
  id: string;
  titel: string;
  beschreibung: string;
  marke: string | null;
  modell: string | null;
  preis: number;
  kanton: string;
  hauptkategorie: string;
  status: string;
}

async function getListingData(id: string): Promise<{ listing: ListingRow; images: string[] } | null> {
  try {
    await initializeSchema();
    const listing = await dbGet<ListingRow>(
      "SELECT id, titel, beschreibung, marke, modell, preis, kanton, hauptkategorie, status FROM listings WHERE id = ?",
      [id]
    );

    if (!listing) return null;

    const imageRows = await dbAll<{ url: string }>(
      "SELECT url FROM listing_images WHERE listing_id = ? ORDER BY position ASC",
      [id]
    );
    const images = imageRows.map((img) => img.url);

    return { listing, images };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getListingData(id);

  if (!data) {
    return {
      title: "Inserat nicht gefunden",
      description: "Dieses Inserat existiert nicht oder wurde entfernt.",
    };
  }

  const { listing, images } = data;
  const name = [listing.marke, listing.modell].filter(Boolean).join(" ") || listing.titel;
  const beschreibungKurz =
    listing.beschreibung.length > 150
      ? listing.beschreibung.slice(0, 150) + "..."
      : listing.beschreibung;
  const preisText = `CHF ${listing.preis.toLocaleString("de-CH")}`;
  const ogImage = images.length > 0 ? images[0] : "/og-image.png";

  return {
    title: `${name} kaufen — ${listing.kanton}`,
    description: `${name} — ${preisText}. ${beschreibungKurz}`,
    openGraph: {
      type: "website",
      title: `${name} kaufen — ${listing.kanton} | GunMarket.ch`,
      description: `${name} — ${preisText}. ${beschreibungKurz}`,
      images: [{ url: ogImage, width: 800, height: 600, alt: name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — ${preisText}`,
      description: beschreibungKurz,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://gunmarket.ch/inserat/${id}`,
    },
  };
}

async function ProductJsonLd({ id }: { id: string }) {
  const data = await getListingData(id);
  if (!data) return null;

  const { listing, images } = data;
  const name = [listing.marke, listing.modell].filter(Boolean).join(" ") || listing.titel;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: listing.beschreibung,
    image: images.length > 0 ? images[0] : undefined,
    offers: {
      "@type": "Offer",
      price: listing.preis,
      priceCurrency: "CHF",
      availability:
        listing.status === "aktiv"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
      itemCondition: "https://schema.org/UsedCondition",
      url: `https://gunmarket.ch/inserat/${id}`,
    },
    category: listing.hauptkategorie,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

async function BreadcrumbJsonLd({ id }: { id: string }) {
  const data = await getListingData(id);
  if (!data) return null;

  const { listing } = data;
  const name = [listing.marke, listing.modell].filter(Boolean).join(" ") || listing.titel;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: "https://gunmarket.ch",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: getKategorieLabel(listing.hauptkategorie),
        item: `https://gunmarket.ch/kategorien/${listing.hauptkategorie}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function InseratLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <ProductJsonLd id={id} />
      <BreadcrumbJsonLd id={id} />
      {children}
    </>
  );
}
