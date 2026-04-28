type ProductSchemaProps = {
  name: string;
  description: string;
  price: string;          // "99", "399", "1199" (numeric string for schema)
  priceCurrency?: string; // "EUR" par défaut
  url: string;            // chemin relatif ou absolu
  image?: string;         // URL absolue de l'image produit (optionnel)
  category?: string;      // par ex. "Communications/Radio"
  availability?:
    | "InStock"
    | "PreOrder"
    | "OutOfStock"
    | "Discontinued";
  sku: string;
  brand?: string;
};

/**
 * Injecte un JSON-LD schema.org/Product dans le head, conforme aux
 * Google Rich Results Test. Server Component pur, zéro JS client.
 */
export function ProductSchema({
  name,
  description,
  price,
  priceCurrency = "EUR",
  url,
  image,
  category = "Communications/LoRa Mesh Radio",
  availability = "PreOrder",
  sku,
  brand = "MAILLON",
}: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    sku,
    category,
    brand: { "@type": "Brand", name: brand },
    ...(image ? { image } : {}),
    offers: {
      "@type": "Offer",
      url: url.startsWith("http") ? url : `https://github.com/aissablk1/maillon${url}`,
      priceCurrency,
      price,
      availability: `https://schema.org/${availability}`,
      priceValidUntil: "2026-12-31",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "MAILLON" },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
