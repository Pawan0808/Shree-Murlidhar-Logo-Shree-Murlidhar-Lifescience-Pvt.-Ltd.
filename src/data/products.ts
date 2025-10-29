import ragiMaltChocolate from '@/assets/ragi-malt-chocolate.jpg';
import isabgolHusk from '@/assets/isabgol-husk.jpg';
import peptideProtein from '@/assets/peptide-protein.jpg';

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  badges: string[];
  highlights: string[];
  marketplaceLinks: { label: string; url: string }[];
  socialLinks?: {
    flipkart?: string;
    amazon?: string;
    insta?: string;
    blinkit?: string;
  };
  nutritionImage?: string;
  directions?: string;
  storage?: string;
  description?: string;
}

export const products: Product[] = [
  {
    id: "ragi-malt-chocolate",
    name: "Ragi Malt - Chocolate",
    category: "Ragi Malt",
    image: ragiMaltChocolate,
    badges: ["Iron Rich", "High Calcium", "Fibre Rich", "Digestive"],
    highlights: [
      "Rich in natural iron and calcium",
      "High dietary fiber content",
      "Supports digestive health",
      "Natural chocolate flavor"
    ],
    marketplaceLinks: [
      { label: "Buy on Flipkart", url: "https://flipkart.com/placeholder" },
      { label: "Buy on Amazon", url: "https://amazon.in/placeholder" }
    ],
    socialLinks: {
      flipkart: "https://www.flipkart.com/social-placeholder",
      amazon: "https://www.amazon.in/social-placeholder",
      insta: "https://www.instagram.com/social-placeholder",
      blinkit: "https://www.blinkit.com/social-placeholder",
    },
    directions: "Mix 2-3 tablespoons in 150ml water or milk. Stir well and consume.",
    storage: "Store in a cool, dry place. Keep away from direct sunlight.",
    description: "Our premium Ragi Malt in delicious chocolate flavor is packed with essential nutrients including iron, calcium, and dietary fiber. Perfect for all age groups."
  },
  {
    id: "ragi-malt-vanilla",
    name: "Ragi Malt - Vanilla",
    category: "Ragi Malt",
    image: ragiMaltChocolate,
    badges: ["Iron Rich", "High Calcium", "Fibre Rich", "Natural"],
    highlights: [
      "Rich in natural iron and calcium",
      "High dietary fiber content",
      "Natural vanilla flavor",
      "Gluten-free option"
    ],
    marketplaceLinks: [
      { label: "Buy on Flipkart", url: "https://flipkart.com/placeholder" },
      { label: "Buy on Amazon", url: "https://amazon.in/placeholder" }
    ],
    socialLinks: {
      flipkart: "https://www.flipkart.com/social-placeholder",
      amazon: "https://www.amazon.in/social-placeholder",
      insta: "https://www.instagram.com/social-placeholder",
      blinkit: "https://www.blinkit.com/social-placeholder",
    },
    directions: "Mix 2-3 tablespoons in 150ml water or milk. Stir well and consume.",
    storage: "Store in a cool, dry place. Keep away from direct sunlight.",
    description: "Natural vanilla flavored Ragi Malt offering complete nutrition with the goodness of finger millet."
  },
  {
    id: "isabgol-husk",
    name: "Isabgol Husk (99% Pure)",
    category: "Digestives",
    image: isabgolHusk,
    badges: ["99% Pure", "Digestive", "Natural", "Fiber Rich"],
    highlights: [
      "99% pure grade quality",
      "Natural digestive aid",
      "Rich in soluble fiber",
      "Supports regular bowel movement"
    ],
    marketplaceLinks: [
      { label: "Buy on Flipkart", url: "https://flipkart.com/placeholder" },
      { label: "Buy on Amazon", url: "https://amazon.in/placeholder" }
    ],
    socialLinks: {
      flipkart: "https://www.flipkart.com/social-placeholder",
      amazon: "https://www.amazon.in/social-placeholder",
      insta: "https://www.instagram.com/social-placeholder",
      blinkit: "https://www.blinkit.com/social-placeholder",
    },
    directions: "Mix 1-2 teaspoons in 200ml water. Drink immediately. Follow with another glass of water.",
    storage: "Store in airtight container. Keep away from moisture.",
    description: "Premium quality Isabgol (Psyllium) husk that supports digestive health and regularity."
  },
  {
    id: "peptide-protein-hp",
    name: "Peptide Protein HP",
    category: "Protein Supplements",
    image: peptideProtein,
    badges: ["High Protein", "Peptide Formula", "Muscle Building"],
    highlights: [
      "Advanced peptide protein formula",
      "Rapid absorption",
      "Supports muscle growth",
      "Enhanced bioavailability"
    ],
    marketplaceLinks: [
      { label: "Buy on Flipkart", url: "https://flipkart.com/placeholder" },
      { label: "Buy on Amazon", url: "https://amazon.in/placeholder" }
    ],
    socialLinks: {
      flipkart: "https://www.flipkart.com/social-placeholder",
      amazon: "https://www.amazon.in/social-placeholder",
      insta: "https://www.instagram.com/social-placeholder",
      blinkit: "https://www.blinkit.com/social-placeholder",
    },
    directions: "Mix 1 scoop (30g) in 200ml water or milk. Consume post-workout or as directed.",
    storage: "Store in cool, dry place. Close lid tightly after use.",
    description: "High-performance peptide protein for serious fitness enthusiasts. Proprietary food product (not for medicinal use)."
  },
  {
    id: "peptide-protein-diabetic",
    name: "Peptide Protein Diabetic",
    category: "Protein Supplements",
    image: peptideProtein,
    badges: ["Sugar Free", "Diabetic Friendly", "Low GI"],
    highlights: [
      "Zero added sugar",
      "Low glycemic index",
      "Diabetic-friendly formula",
      "Complete protein profile"
    ],
    marketplaceLinks: [
      { label: "Buy on Flipkart", url: "https://flipkart.com/placeholder" },
      { label: "Buy on Amazon", url: "https://amazon.in/placeholder" }
    ],
    socialLinks: {
      flipkart: "https://www.flipkart.com/social-placeholder",
      amazon: "https://www.amazon.in/social-placeholder",
      insta: "https://www.instagram.com/social-placeholder",
      blinkit: "https://www.blinkit.com/social-placeholder",
    },
    directions: "Mix 1 scoop (25g) in 200ml water. Consume as per dietary requirements.",
    storage: "Store in cool, dry place. Keep away from direct sunlight.",
    description: "Specially formulated protein supplement for diabetic individuals. Proprietary food product (not for medicinal use)."
  },
  {
    id: "peptide-protein-kids",
    name: "Peptide Protein Kids",
    category: "Protein Supplements",
    image: peptideProtein,
    badges: ["Kids Formula", "DHA Enriched", "Growth Support"],
    highlights: [
      "Age-appropriate protein levels",
      "DHA for brain development",
      "Essential vitamins and minerals",
      "Delicious taste kids love"
    ],
    marketplaceLinks: [
      { label: "Buy on Flipkart", url: "https://flipkart.com/placeholder" },
      { label: "Buy on Amazon", url: "https://amazon.in/placeholder" }
    ],
    socialLinks: {
      flipkart: "https://www.flipkart.com/social-placeholder",
      amazon: "https://www.amazon.in/social-placeholder",
      insta: "https://www.instagram.com/social-placeholder",
      blinkit: "https://www.blinkit.com/social-placeholder",
    },
    directions: "Mix 1 scoop (20g) in 150ml milk. Give to children above 2 years.",
    storage: "Store in cool, dry place. Keep away from children's reach.",
    description: "Nutritionally balanced protein supplement designed specifically for growing children. Proprietary food product (not for medicinal use)."
  },
  {
    id: "peptide-protein-mom",
    name: "Peptide Protein Mom",
    category: "Protein Supplements",
    image: peptideProtein,
    badges: ["Maternal Nutrition", "Folic Acid", "Iron Enriched"],
    highlights: [
      "Supports maternal health",
      "Rich in folic acid and iron",
      "Complete amino acid profile",
      "Easy to digest"
    ],
    marketplaceLinks: [
      { label: "Buy on Flipkart", url: "https://flipkart.com/placeholder" },
      { label: "Buy on Amazon", url: "https://amazon.in/placeholder" }
    ],
    socialLinks: {
      flipkart: "https://www.flipkart.com/social-placeholder",
      amazon: "https://www.amazon.in/social-placeholder",
      insta: "https://www.instagram.com/social-placeholder",
      blinkit: "https://www.blinkit.com/social-placeholder",
    },
    directions: "Mix 1 scoop (30g) in 200ml milk. Consume twice daily or as advised by healthcare professional.",
    storage: "Store in cool, dry place. Close container tightly after use.",
    description: "Specially formulated nutrition support for expecting and lactating mothers. Proprietary food product (not for medicinal use)."
  }
];

export const categories = [
  "All",
  "Ragi Malt",
  "Protein Supplements", 
  "Digestives"
];


export const certifications = [
  {
    name: "ISO Certified",
    description: "Ensuring global quality standards.",
    logo: "src/assets/iso.png",
  },
  {
    name: "GMP Certified",
    description: "Good Manufacturing Practices compliance.",
    logo: "src/assets/gmp.jpg",
  },
  {
    name: "FSSAI Certified",
    description: "Trusted food safety certification.",
    logo: "src/assets/fssai.jpg",
  },
  {
    name: "FDA Approved",
    description: "Safe and approved by regulatory authorities.",
    logo: "src/assets/FDA.jpg",
  },
];

export const companyInfo = {
  name: "Shree Murlidhar Lifescience Pvt. Ltd.",
  tagline: "One-stop destination for Healthy, Nutraceutical & Protein Products",
  address: "Plot No. 123, Industrial Area, Nashik, Maharashtra 422001",
  phone: "+91 9876543210",
  email: "info@smlifescience.com",
  customerCare: "+91 1800-123-4567",
  instagram: "@smlifescience"
};