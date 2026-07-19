export type ProductGalleryImage = {
  src: string;
  alt: string;
  label: string;
};

export type Product = {
  slug: string;
  name: string;
  note: string;
  shortDescription: string;
  description: string;
  image: string;
  imageFit?: "contain" | "cover";
  highlights: string[];
  packSizes?: string[];
  gallery: ProductGalleryImage[];
  ingredients: string;
  usage: string;
  brandStory: string;
  benefits: string[];
  storage: string;
};

const productImages = {
  garamMasala: "/images/products/garam-masala-front.png",
  chickenMasala: "/images/products/chicken-masala.png",
  chickenMasalaBack: "/images/products/chicken-masala-back.png",
  blackPepperPowder: "/images/products/black-pepper-powder.png",
  sabjiMasala: "/images/products/sabji-masala.png",
  sabjiMasalaBack: "/images/products/sabji-masala-back.png",
} as const;

function galleryImage(
  src: string,
  name: string,
  label: string
): ProductGalleryImage {
  return {
    src,
    alt: `Kalpasi ${name} — ${label} view`,
    label,
  };
}

function packGallery(
  views: { src: string; label: string }[],
  name: string
): ProductGalleryImage[] {
  return views.map(({ src, label }) => galleryImage(src, name, label));
}

export const products: Product[] = [
  {
    slug: "garam-masala",
    name: "Garam Masala",
    note: "Warm & aromatic",
    shortDescription:
      "Stone-ground whole spices blended for depth in curries, dals, and biryanis.",
    description:
      "Our signature Garam Masala is slow-ground in small batches from whole spices — warm, layered, and unmistakably authentic. Every pack delivers the depth Indian kitchens have trusted for generations, without preservatives or artificial colour.",
    image: productImages.garamMasala,
    imageFit: "contain",
    highlights: [
      "100% Spice Content",
      "No Preservatives",
      "No Artificial Colours",
      "Rich Aroma",
      "Small-Batch Ground",
    ],
    packSizes: ["50 g", "100 g", "200 g"],
    gallery: packGallery(
      [
        { src: "/images/products/garam-masala-front.png", label: "Front" },
        { src: "/images/products/garam-masala-back.png", label: "Back" },
        { src: "/images/products/garam-masala-side-left.png", label: "Left side" },
        { src: "/images/products/garam-masala-side-right.png", label: "Right side" },
      ],
      "Garam Masala"
    ),
    ingredients:
      "Coriander, cumin, black pepper, cardamom, cinnamon, cloves, nutmeg, and other whole spices — 100% spice, no fillers.",
    usage:
      "Add toward the end of cooking or as a finishing touch in curries, dals, biryanis, and gravies. Start with ½ teaspoon per serving and adjust to taste.",
    brandStory:
      "Garam Masala is the heart of Kalpasi — the blend that inspired our promise of honest, preservative-free spices for every family table.",
    benefits: [
      "Layered warmth without harsh heat",
      "Consistent aroma batch after batch",
      "Versatile across North and South Indian dishes",
    ],
    storage:
      "Store in a cool, dry place away from sunlight. Reseal the pack tightly after each use.",
  },
  {
    slug: "chicken-masala",
    name: "Chicken Masala",
    note: "Savory & bold",
    shortDescription:
      "A rich chicken masala blend with deep aroma and balanced spice heat for tender, flavorful bites.",
    description:
      "Crafted for home cooks who want restaurant-style depth without compromise — our Chicken Masala balances savory warmth, gentle heat, and lasting aroma for gravies, grills, and tandoor-style preparations.",
    image: productImages.chickenMasala,
    imageFit: "contain",
    highlights: [
      "100% Spice Content",
      "No Preservatives",
      "No Artificial Colours",
      "Balanced Heat",
      "Rich Aroma",
    ],
    packSizes: ["50 g", "100 g"],
    gallery: packGallery(
      [
        { src: productImages.chickenMasala, label: "Front" },
      ],
      "Chicken Masala"
    ),
    ingredients:
      "Coriander, red chili, cumin, turmeric, black pepper, dried ginger, garlic, and complementary whole spices — no MSG or artificial flavour enhancers.",
    usage:
      "Marinate chicken with yogurt and 1–2 teaspoons per 500 g, or add to onion-tomato base while cooking. Adjust heat with extra chili if desired.",
    brandStory:
      "We developed this blend after years of feedback from families who wanted a trustworthy, all-in-one masala for weeknight chicken dishes.",
    benefits: [
      "Even coating for marinades and dry rubs",
      "Bold flavour without overpowering the protein",
      "Works for curry, roast, and pan-fry styles",
    ],
    storage:
      "Keep sealed in a cool, dry cupboard. Use within the best-before date on pack for peak aroma.",
  },
  {
    slug: "black-pepper-powder",
    name: "Black Pepper Powder",
    note: "Sharp & fragrant",
    shortDescription:
      "Finely ground black pepper with an unmistakable bite — perfect for gravies, marinades, and finishing.",
    description:
      "Single-origin black pepper, finely ground to preserve volatile oils and sharp fragrance. A pantry essential for finishing, marinades, and everyday seasoning with nothing added.",
    image: productImages.blackPepperPowder,
    imageFit: "contain",
    highlights: [
      "100% Spice Content",
      "No Preservatives",
      "No Artificial Colours",
      "Sharp & Fragrant",
      "Finely Ground",
    ],
    packSizes: ["50 g", "100 g"],
    gallery: packGallery(
      [
        { src: productImages.blackPepperPowder, label: "Front" },
      ],
      "Black Pepper Powder"
    ),
    ingredients: "100% black pepper — ground from whole peppercorns only.",
    usage:
      "Sprinkle on soups, salads, steaks, and gravies; add early in cooking for depth or at the end for bright heat.",
    brandStory:
      "Black pepper is the quiet hero of Indian and global kitchens — we grind it fresh in small runs so the bite stays true.",
    benefits: [
      "Clean, sharp heat",
      "Fine grind for even distribution",
      "Ideal finishing spice",
    ],
    storage:
      "Store airtight away from moisture. Avoid storing above the stove.",
  },
  {
    slug: "sabji-masala",
    name: "Sabji Masala",
    note: "Earthy & fresh",
    shortDescription:
      "An earthy sabji masala blend that brings everyday vegetables to life with warmth, aroma, and depth.",
    description:
      "Designed for daily sabji, stir-fries, and seasonal vegetables — this blend layers earthy coriander, gentle heat, and aromatic spices so simple produce tastes complete.",
    image: productImages.sabjiMasala,
    imageFit: "contain",
    highlights: [
      "100% Spice Content",
      "No Preservatives",
      "No Artificial Colours",
      "Everyday Versatile",
      "Rich Aroma",
    ],
    packSizes: ["50 g", "100 g", "200 g"],
    gallery: packGallery(
      [
        { src: productImages.sabjiMasala, label: "Front" },
      ],
      "Sabji Masala"
    ),
    ingredients:
      "Coriander, cumin, turmeric, red chili, amchur, and complementary spices — pure vegetable masala with no added starch.",
    usage:
      "Sauté with onion-tomato base or sprinkle ½–1 teaspoon per pan of vegetables while cooking. Pairs well with potatoes, beans, and mixed seasonal sabji.",
    brandStory:
      "Sabji Masala reflects our roots — honest, everyday cooking made exceptional with spices you can trust.",
    benefits: [
      "Brightens simple vegetables",
      "Balanced, not overly hot",
      "One blend for mixed sabji",
    ],
    storage:
      "Reseal after use; store in a cool, dry place for maximum freshness.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

/** Homepage card shape (subset of Product) */
export function getHomepageProducts() {
  return products.map(
    ({
      slug,
      name,
      note,
      shortDescription,
      image,
      imageFit,
    }) => ({
      slug,
      name,
      note,
      description: shortDescription,
      image,
      imageFit,
    })
  );
}
