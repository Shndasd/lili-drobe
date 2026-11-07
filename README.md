# LILI DROBE — Women's Vintage & Streetwear Archive

> *"Not every piece is made to be ordinary."*

**LILI DROBE** is a modern, high-fashion e-commerce web platform showcasing curated 1990s and Y2K women's streetwear, distressed leather trenches, archival motorsport racing bombers, Chantilly lace silk slip dresses, low-rise carpenter cargo trousers, and single-stitch tour baby tees.

Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, **React Router**, and **Lucide Icons**.

---

## Features

- **Editorial Aesthetic**: Warm cream and paper tones (`#FAF8F5`), bold typography (`Syne` display font paired with `Plus Jakarta Sans` and `Space Mono`), and high-fashion streetwear lookbook photography.
- **Shop Catalog & Deep Filtering**:
  - Department filtering: *Baby Tees & Tops*, *Leather & Jackets*, *Denim & Bottoms*, *Dresses & Skirts*, *Hoodies & Knits*, *Bags & Accessories*.
  - Garment condition grading: *Deadstock Vintage*, *Vintage Archive*, *Excellent Vintage*, *Like New*, *Good (Distressed)*.
  - Sizing selector (XS, S, M, L, 24, 25, 26, 27, 28, 30).
  - Price slider & live keyword search.
  - Sorting: *New Drops First*, *Price: Low to High*, *Price: High to Low*, *Most Coveted*, *Rare Grails*.
- **Contiguous Product Detail Page (PDP)**:
  - Multi-image gallery with thumbnail switcher.
  - Size matrix with fit advice & stock counter.
  - Tabular manual measurements (pit-to-pit, back length, shoulder width, waist, inseam).
  - Provenance details, materials, and garment care instructions.
  - Curated related archive suggestions.
- **Slide-Over Shopping Bag Drawer**:
  - Live quantity steppers.
  - Free shipping progress threshold meter ($150 target).
  - Interactive discount code engine (try `LILIDROBE10` or `FIRSTDROP15`).
  - Persistent shopping session saved in `localStorage`.
- **Wishlist Archive Vault**:
  - Save pieces with the heart icon.
  - 1-click move to bag.
  - LocalStorage persistence.
- **Realistic Checkout Flow**:
  - Customer contact & shipping address verification.
  - Courier methods: Standard Insured Dispatch, Express Air Courier, White-Glove Courier.
  - Payment simulation: Credit Card formatting, Apple Pay demo, Cash on Delivery.
  - Order confirmation screen with unique order reference (`LD-XXXXXX`) and receipt recap.
- **Fast Global Search Modal**:
  - Keyboard accessible overlay with instant filtering across names, eras, categories, and descriptions.
- **Quick View Modal**:
  - Inspect garments and select sizes without leaving the catalog.

---

## Quick Start (Local Development)

### 1. Install dependencies
```bash
npm install
```

### 2. Start dev server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 3. Build for production
```bash
npm run build
```
Production assets are generated in the `dist/` directory.

---

## GitHub Release Files

- **`lilidrobe-production-dist.zip`**: Pre-built static distribution bundle. Can be uploaded directly to GitHub Releases or deployed to Netlify / Vercel / GitHub Pages.
- **`lilidrobe-source-v1.0.0.zip`**: Complete source code package including all assets, components, and configuration.

---

## License

Apache-2.0
