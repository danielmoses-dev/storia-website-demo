export interface Product {
  id: string;
  name: string;
  subName: string;
  price: string;
  description: string;
  folderPath: string;
  totalFrames?: number;
  themeColor: string;
  gradient: string;
  features: string[];
  stats: { label: string; val: string }[];
  section1: { title: string; subtitle: string };
  section2: { title: string; subtitle: string };
  section3: { title: string; subtitle: string };
  section4: { title: string; subtitle: string };
  detailsSection: { title: string; description: string; imageAlt: string };
  freshnessSection: { title: string; description: string };
  buyNowSection: {
    price: string;
    unit: string;
    processingParams: string[];
    deliveryPromise: string;
    returnPolicy: string;
  };
}

export const products: Product[] = [
  {
    id: "mango",
    name: "Cream Mango",
    subName: "Pure sunshine in every sip.",
    price: "₹120",
    description: "100% Real Alphonso Pulp • Rich in Vitamin C • Zero Preservatives",
    folderPath: "/images/mango",
    totalFrames: 240,
    themeColor: "#FFB74D",
    gradient: "linear-gradient(135deg, #FFB74D 0%, #FFA726 100%)",
    features: ["100% Real Alphonso", "Rich in Vitamin C", "Zero Preservatives"],
    stats: [
      { label: "Added Sugar", val: "0g" },
      { label: "Real Fruit", val: "100%" },
      { label: "Purity", val: "100%" },
    ],
    section1: { title: "Cream Mango.", subtitle: "Pure sunshine in every sip." },
    section2: {
      title: "Bursting with real Alphonso.",
      subtitle:
        "Hand-picked Alphonso mangoes, sun-ripened to peak brix and blended to velvety perfection.",
    },
    section3: {
      title: "Honest vitality & nutrition.",
      subtitle:
        "A natural energy boost packed with authentic vitamins that revitalize your day.",
    },
    section4: { title: "Made from real fruit, not concentrate.", subtitle: "" },
    detailsSection: {
      title: "Ratnagiri Alphonso Mastery",
      description:
        "Storia Cream Mango is crafted from hand-selected Ratnagiri Alphonso mangoes. Known worldwide for their rich sweetness and vibrant golden hue, these mangoes are processed within hours of harvest to preserve every drop of nutrient-rich goodness. It's not just a beverage; it's the authentic taste of summer.",
      imageAlt: "Storia Mango Details",
    },
    freshnessSection: {
      title: "The Storia Farm-to-Bottle Standard",
      description:
        "At Storia, we believe in snacks and drinks crafted with honesty. We partner directly with sustainable orchards. Every mango is picked at peak natural sweetness, gently pulped, and bottled fresh under strict cold-chain preservation to ensure vital vitamins and pure aroma stay uncompromised.",
    },
    buyNowSection: {
      price: "₹120",
      unit: "per 300ml bottle",
      processingParams: ["100% Real Fruit", "Cold Crafted", "Zero Artificial Colors"],
      deliveryPromise:
        "Direct cold-chain dispatch. Chilled packaging ensures peak orchard freshness.",
      returnPolicy:
        "Storia 100% Quality Guarantee. Not delighted? We'll replace it immediately.",
    },
  },
  {
    id: "chocolate",
    name: "Dutch Chocolate",
    subName: "Velvety smooth indulgence.",
    price: "₹140",
    description: "Authentic Dutch Cocoa • Silky Cream • Wholesome Energy",
    folderPath: "/images/chocolate",
    totalFrames: 239,
    themeColor: "#8D6E63",
    gradient: "linear-gradient(135deg, #8D6E63 0%, #5D4037 100%)",
    features: ["Dutch-Processed Cocoa", "Silky Smooth Texture", "Honest Ingredients"],
    stats: [
      { label: "Artificial Flavor", val: "0%" },
      { label: "Rich Cocoa", val: "100%" },
      { label: "Protein", val: "10g" },
    ],
    section1: { title: "Dutch Chocolate.", subtitle: "Velvety smooth indulgence." },
    section2: {
      title: "Decadence redefined.",
      subtitle:
        "Rich, dark Dutch cocoa blended to creamy silkiness for an honest, guilt-free treat.",
    },
    section3: {
      title: "Wholesome daily fuel.",
      subtitle:
        "Loaded with natural antioxidants and gentle nutrition to power your active lifestyle.",
    },
    section4: { title: "Indulgence without compromise.", subtitle: "" },
    detailsSection: {
      title: "Authentic Dutch Cocoa Craft",
      description:
        "Storia Dutch Chocolate Shake is an ode to chocolate lovers who appreciate genuine quality. Sourced from sustainably farmed cocoa, this shake offers a deep, aromatic chocolate flavor with a clean finish and zero chalky artificial aftertaste.",
      imageAlt: "Storia Chocolate Details",
    },
    freshnessSection: {
      title: "Cold-Crafted Perfection",
      description:
        "Excessive heat destroys subtle cocoa aromas. That's why Storia blends its chocolate shakes under strict temperature control. Every bottle delivers a café-style indulgence that satisfies your cravings with pure ingredients.",
    },
    buyNowSection: {
      price: "₹140",
      unit: "per 300ml bottle",
      processingParams: ["Dutch Cocoa", "Cold Blended", "No Chemical Stabilizers"],
      deliveryPromise:
        "Shipped in insulated protective coolers. Keeps chilled and fresh to your door.",
      returnPolicy: "Storia Satisfaction Guarantee. Love every sip or get your money back.",
    },
  },
  {
    id: "pomegranate",
    name: "Ruby Pomegranate",
    subName: "100% Cold-Pressed Elixir.",
    price: "₹150",
    description: "100% Pure Fruit Juice • Zero Added Sugar • Antioxidant Powerhouse",
    folderPath: "/images/pomegranate",
    totalFrames: 240,
    themeColor: "#E57373",
    gradient: "linear-gradient(135deg, #E57373 0%, #C62828 100%)",
    features: ["100% Pomegranate", "Zero Added Sugar", "Rich in Punicalagins"],
    stats: [
      { label: "Added Sugar", val: "0g" },
      { label: "Water Added", val: "0%" },
      { label: "Purity", val: "100%" },
    ],
    section1: { title: "Ruby Pomegranate.", subtitle: "Nature's ruby jewel." },
    section2: {
      title: "Explosion of real flavor.",
      subtitle:
        "Cold-pressed pomegranate arils delivering a crisp, tart, and sweet sensory delight.",
    },
    section3: {
      title: "Heart-healthy vitality.",
      subtitle:
        "Packed with powerful natural punicalagin antioxidants to rejuvenate and protect.",
    },
    section4: { title: "Pure fruit, honest taste.", subtitle: "" },
    detailsSection: {
      title: "The Ruby Elixir",
      description:
        "Each bottle of Storia 100% Ruby Pomegranate Juice is made from the juice of over 1 kg of whole pomegranates. We gently extract only the ruby arils without crushing the bitter white pith, producing an unmatched natural tart-sweet balance.",
      imageAlt: "Storia Pomegranate Details",
    },
    freshnessSection: {
      title: "Oxygen-Shielded Pressing",
      description:
        "Fresh pomegranate juice is delicate and reactive to oxygen. Our gentle extraction and immediate cold bottling lock in the deep ruby pigment and active polyphenols, bringing orchard-fresh vitality straight to your fridge.",
    },
    buyNowSection: {
      price: "₹150",
      unit: "per 300ml bottle",
      processingParams: ["100% Pure Juice", "Cold Pressed", "No Added Sugar"],
      deliveryPromise:
        "Direct from pressery to doorstep under temperature-controlled cold logistics.",
      returnPolicy: "Arrived damaged or unchilled? Instant replacement guarantee.",
    },
  },
];
