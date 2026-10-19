# Storia — Interactive Scrollytelling Experience

A premium, high-performance scrollytelling web application showcasing **Storia** beverages through seamless 60fps canvas scroll-driven animations, instant product switching, and fluid responsive design.

![Storia Brand](public/logo.png)

---

## 🌟 Key Features

- **Fluid Canvas Scrollytelling Engine**: High-performance HTML5 Canvas rendering linked directly to scroll position, providing buttery-smooth 60fps frame scrubbing.
- **Instant Product Switching**: Seamless transition between Storia's signature beverages:
  - 🥭 **100% Alphonso Mango Juice**
  - 🍫 **Belgian Chocolate Thick Shake**
  - 🍷 **Royal Ruby Pomegranate Juice**
- **Zero-Latency Asset Optimization**: Over 700 1080p source frames losslessly converted to modern WebP sequences with concurrent multi-tier memory caching for zero visual delay.
- **Responsive & Mobile-First**: Tailored typography, responsive canvas scaling, and touch-optimized layout for fluid viewing across mobile phones, tablets, and desktop displays.
- **Storia Brand Design System**: Custom curated color schemes, glassmorphic UI elements, interactive nutrition metrics, and clean typography.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Rendering**: HTML5 2D Canvas with scroll-synchronized requestAnimationFrame loop

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/danielmoses-dev/storia-website-demo.git
cd storia-website-demo
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Project Structure

```
├── app/
│   ├── globals.css          # Custom animations and global Tailwind styles
│   ├── layout.tsx           # Metadata and root layout
│   └── page.tsx             # Interactive scrollytelling page and section layout
├── components/
│   ├── CanvasSequence.tsx   # Canvas scrollytelling engine with responsive rendering
│   ├── FlavorSelector.tsx   # Interactive beverage switcher pills
│   ├── HeroOverlay.tsx      # Scroll-synchronized title and description banners
│   ├── Navbar.tsx           # Glassmorphic responsive header with brand logo
│   └── ProductDetails.tsx   # Flavor notes, nutrition facts, and call-to-actions
├── data/
│   └── flavors.ts           # Flavor metadata, frame counts, and theme definitions
├── public/
│   ├── images/              # Optimized WebP frame sequences for all 3 beverages
│   ├── logo.png             # Storia brand logo
│   └── logo.webp            # Optimized web-ready logo
```

---

## 📄 License

This project is licensed under the MIT License.
