// Central source of truth for every service page.
// Add a new service here and it automatically gets:
//   - a route at /services/:slug (via ServicePage.jsx)
//   - a card on the /services overview page
//   - an entry in the Navbar "Services" dropdown (keep Navbar.jsx's
//     SERVICES array in sync with the slugs used here)

export const SERVICES_DATA = {
  portrait: {
    slug: "portrait",
    title: "Portrait Photography",
    shortTitle: "Portrait",
    tagline: "Portraits that feel like you, not a pose.",
    description:
      "Whether it's a solo headshot, a couple, or the whole family, we build a session around who you actually are. Natural light, relaxed direction, and edits that keep skin and detail looking real.",
    heroImage: "/images/services/portrait-hero.jpg",
    galleryCategory: "Portrait",
    highlights: [
      "Studio or on-location sessions",
      "Wardrobe & posing guidance included",
      "Private online gallery for selects",
      "Retouched high-res digital delivery",
    ],
    packages: [
      {
        name: "Essential",
        price: "From KSh 8,000",
        includes: [
          "45-min session",
          "1 location",
          "10 edited images",
          "Online gallery",
        ],
      },
      {
        name: "Signature",
        price: "From KSh 15,000",
        includes: [
          "90-min session",
          "2 locations",
          "25 edited images",
          "Outfit changes",
          "Print release",
        ],
      },
      {
        name: "Full Story",
        price: "From KSh 25,000",
        includes: [
          "Half-day session",
          "Multiple locations",
          "50+ edited images",
          "Behind-the-scenes reel",
        ],
      },
    ],
    faqs: [
      {
        q: "How many outfit changes can I bring?",
        a: "Most sessions comfortably fit 2–3 outfit changes without rushing. Let us know your plan when booking so we can pace the shoot.",
      },
      {
        q: "When will I get my photos?",
        a: "Sneak peeks within 48 hours, full edited gallery within 7–10 business days.",
      },
    ],
  },

  wedding: {
    slug: "wedding",
    title: "Wedding Photography",
    shortTitle: "Wedding",
    tagline: "Every glance, every detail, the whole day — told honestly.",
    description:
      "From the quiet morning prep to the last dance, we shoot documentary-style so the story stays true, with a few directed portraits woven in so you have those too.",
    heroImage: "/images/services/wedding-hero.jpg",
    galleryCategory: "Wedding",
    highlights: [
      "Full-day or multi-day coverage",
      "Second shooter available",
      "Engagement session option",
      "Same-week sneak-peek gallery",
    ],
    packages: [
      {
        name: "Intimate",
        price: "From KSh 45,000",
        includes: [
          "6 hours coverage",
          "1 photographer",
          "300+ edited images",
          "Online gallery",
        ],
      },
      {
        name: "Classic",
        price: "From KSh 80,000",
        includes: [
          "10 hours coverage",
          "2 photographers",
          "600+ edited images",
          "Engagement session",
          "USB + gallery",
        ],
      },
      {
        name: "Grand",
        price: "From KSh 120,000",
        includes: [
          "Multi-day coverage",
          "2 photographers + assistant",
          "1000+ edited images",
          "Same-day highlight reel",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you travel for destination weddings?",
        a: "Yes — travel and accommodation are quoted separately based on location.",
      },
      {
        q: "Can we customize a package?",
        a: "Absolutely, every wedding is different. Tell us your day and we'll build a package around it.",
      },
    ],
  },

  landscape: {
    slug: "landscape",
    title: "Landscape Photography",
    shortTitle: "Landscape",
    tagline: "Places worth remembering, framed the way they felt.",
    description:
      "Fine-art landscape and nature prints for homes, offices, and print publications, shot on location across Kenya's varied terrain.",
    heroImage: "/images/services/landscape-hero.jpg",
    galleryCategory: "Landscape",
    highlights: [
      "Licensed prints & digital use",
      "Custom location shoots on request",
      "Large-format print options",
      "Commercial licensing available",
    ],
    packages: [
      {
        name: "Print License",
        price: "From KSh 3,000",
        includes: [
          "Single image",
          "Personal use license",
          "High-res digital file",
        ],
      },
      {
        name: "Commercial License",
        price: "From KSh 12,000",
        includes: [
          "Single image",
          "Commercial use license",
          "Print + digital rights",
        ],
      },
      {
        name: "Custom Shoot",
        price: "Quote on request",
        includes: [
          "On-location shoot",
          "Full edited set",
          "Usage rights negotiated",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I request a shoot of a specific location?",
        a: "Yes, get in touch with the location and timeline and we'll quote based on travel and access.",
      },
    ],
  },

  event: {
    slug: "event",
    title: "Event Photography",
    shortTitle: "Event",
    tagline:
      "Corporate, social, or community — covered without getting in the way.",
    description:
      "Conferences, launches, parties, and community events, shot to capture atmosphere, key moments, and the people who made it happen.",
    heroImage: "/images/services/event-hero.jpg",
    galleryCategory: "Event",
    highlights: [
      "Solo or team coverage for larger events",
      "Fast same-day highlight turnaround",
      "Candid + posed group shots",
      "On-site printing add-on available",
    ],
    packages: [
      {
        name: "Half Day",
        price: "From KSh 20,000",
        includes: ["4 hours coverage", "1 photographer", "150+ edited images"],
      },
      {
        name: "Full Day",
        price: "From KSh 35,000",
        includes: [
          "8 hours coverage",
          "1–2 photographers",
          "300+ edited images",
          "Same-day highlights",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you cover multi-day conferences?",
        a: "Yes, multi-day coverage is quoted per day with a discount for consecutive bookings.",
      },
    ],
  },

  product: {
    slug: "product",
    title: "Product Photography",
    shortTitle: "Product",
    tagline: "Clean, consistent product shots that sell.",
    description:
      "Studio product photography for e-commerce, catalogs, and social — consistent lighting and backgrounds across your whole catalog.",
    heroImage: "/images/services/product-hero.jpg",
    galleryCategory: "Product",
    highlights: [
      "White background & lifestyle setups",
      "Bulk catalog pricing available",
      "Fast turnaround for online stores",
      "Consistent styling across SKUs",
    ],
    packages: [
      {
        name: "Starter",
        price: "From KSh 500/item",
        includes: ["White background", "Basic retouching", "Web-ready files"],
      },
      {
        name: "Catalog",
        price: "From KSh 350/item (20+)",
        includes: ["White background", "Full retouching", "Multiple angles"],
      },
      {
        name: "Lifestyle",
        price: "From KSh 1,200/item",
        includes: [
          "Styled lifestyle set",
          "Full retouching",
          "Social-ready crops",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you offer bulk discounts?",
        a: "Yes, pricing scales down per item as catalog size grows — send us your item count for a quote.",
      },
    ],
  },

  film: {
    slug: "film",
    title: "Film & Videography",
    shortTitle: "Film",
    tagline: "Motion, sound, and story — for the moments stills can't hold.",
    description:
      "Highlight reels, documentary-style event films, and short-form social content, shot and edited to match your brand or your day.",
    heroImage: "/images/services/film-hero.jpg",
    galleryCategory: "Film",
    highlights: [
      "Highlight reels & full-length edits",
      "Drone footage where permitted",
      "Social-ready short cuts included",
      "Custom licensed music scoring",
    ],
    packages: [
      {
        name: "Highlight",
        price: "From KSh 25,000",
        includes: [
          "3–5 min highlight film",
          "1 camera operator",
          "Licensed music",
        ],
      },
      {
        name: "Documentary",
        price: "From KSh 60,000",
        includes: [
          "Full-length edit",
          "2 camera operators",
          "Drone footage",
          "Social cutdowns",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you combine film and photography coverage?",
        a: "Yes — most clients book both together, and we coordinate crew so neither gets in the other's way.",
      },
    ],
  },

  editing: {
    slug: "editing",
    title: "Photo Editing & Retouching",
    shortTitle: "Editing",
    tagline: "Bring your own shots up to gallery standard.",
    description:
      "Color correction, skin retouching, background cleanup, and batch editing for photographers and studios who need a reliable second pass.",
    heroImage: "/images/services/editing-hero.jpg",
    galleryCategory: null,
    highlights: [
      "Batch editing for large shoots",
      "Skin & blemish retouching",
      "Color grading & correction",
      "Background removal/cleanup",
    ],
    packages: [
      {
        name: "Basic Pass",
        price: "From KSh 100/image",
        includes: ["Color correction", "Light retouching", "48hr turnaround"],
      },
      {
        name: "Full Retouch",
        price: "From KSh 300/image",
        includes: [
          "Advanced retouching",
          "Background cleanup",
          "Custom color grade",
        ],
      },
      {
        name: "Batch (50+)",
        price: "Quote on request",
        includes: [
          "Consistent batch editing",
          "Priority turnaround",
          "Revision round included",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you edit RAW files I shot myself?",
        a: "Yes, send RAW or high-res files and we'll match the style you're going for.",
      },
    ],
  },
};

// Ordered list for the /services overview grid — keeps display order
// independent from object key order.
export const SERVICES_ORDER = [
  "portrait",
  "wedding",
  "landscape",
  "event",
  "product",
  "film",
  "editing",
];
