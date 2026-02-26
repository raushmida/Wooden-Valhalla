# Wooden Valhalla — Product Requirements Document

**Version:** 1.0
**Date:** 2026-02-25
**Product Type:** Guitar Collection & Sales Website

---

## 1. Purpose

Wooden Valhalla is a personal website for a Gibson Les Paul collector to:
1. Showcase his current collection
2. Archive past guitars he's owned
3. List guitars currently available for sale

The site serves as both a credibility-building portfolio and a direct sales channel — eliminating dependence on Reverb, eBay, or other marketplace platforms for serious buyers.

---

## 2. Goals

| Goal | Success Metric |
|------|---------------|
| Showcase collection to build credibility | Visitors spend time browsing past/current guitars |
| Generate qualified buyer inquiries | Inbound contact form submissions from interested buyers |
| Establish a recognizable brand in the Les Paul community | Return visitors, social shares, word-of-mouth referrals |

---

## 3. Pages & Structure

### 3.1 Home
- Brand statement: who this is and what Wooden Valhalla is about
- Featured/hero guitar (current collection or for sale)
- Navigation to: Collection, Past Guitars, For Sale, About, Contact

### 3.2 Current Collection
- Grid of guitars currently owned (not for sale)
- Each card: photo, year, model name, one-line descriptor
- Clicking opens a detail page (see 3.6)

### 3.3 Past Guitars (Archive)
- Grid of guitars previously owned
- Same card format as current collection
- Purpose: builds credibility and tells the story of the collector's taste over time
- "SOLD" or "Previously Owned" label distinguishes from active inventory

### 3.4 For Sale
- Grid of guitars currently available for purchase
- Each card: photo, year, model, asking price
- Clicking opens a detail page with a prominent "Inquire" CTA
- Visually distinct from collection pages (buyer intent is different here)

### 3.5 About
- Short story about the owner, his history with Les Pauls, and the Wooden Valhalla name
- Builds trust and humanizes the brand
- Optional: photo of the owner with guitars

### 3.6 Guitar Detail Page (shared template)
Each guitar (current, past, or for sale) gets its own detail page with:

**Required fields:**
- Year
- Model (e.g., Les Paul Standard, Les Paul Custom, etc.)
- Finish/color
- Weight (in lbs — matters to buyers)
- Serial number
- Condition notes (honest, specific)
- Full description (story, provenance, what makes it notable)

**Media:**
- Photo gallery (minimum 8–10 photos: body front/back, headstock front/back, hardware, frets, any notable details or flaws)
- Video embed (YouTube or Vimeo) — played clean, demonstrates tone

**For Sale only:**
- Asking price
- "Inquire About This Guitar" button → contact form pre-populated with guitar name
- Shipping policy note

---

## 4. Functional Requirements

### 4.1 Contact / Inquiry
- Simple contact form: Name, Email, Message
- For sale inquiries: form pre-populated with guitar name
- Submissions go to owner's email (no public display)
- No user accounts, no checkout — this is a direct inquiry model, not e-commerce

### 4.2 Navigation
- Fixed or sticky header with: Logo | Collection | Past Guitars | For Sale | About | Contact
- Mobile: hamburger menu

### 4.3 Search / Filter (Phase 2)
- Not required at launch
- Future: filter by year, finish, model across all guitar pages

### 4.4 Media Handling
- Photos: hosted on-site or via CDN (Cloudflare, etc.)
- Videos: embedded from YouTube or Vimeo (owner manages uploads there)

---

## 5. Design Direction

- **Aesthetic:** Dark, warm, premium — think aged wood, vintage lighting, leather
- **Typography:** Mix of a serif or vintage display font for headings + clean sans-serif for body
- **Color palette:** Dark backgrounds (near-black, deep brown), warm gold/amber accents, white text
- **Photography is the hero** — layout should frame photos as the focal point, not compete with them
- **Mobile-first** — majority of browsing will happen on phones

---

## 6. Technical Requirements

| Requirement | Notes |
|-------------|-------|
| CMS | Owner needs to add/remove guitars without a developer. Recommend: Webflow, Squarespace, or a headless CMS like Sanity with a simple frontend |
| Hosting | Simple static or managed hosting. No backend required at launch |
| Domain | woodenvalhalla.com (or similar) |
| SSL | Required |
| Analytics | Google Analytics or Plausible for basic traffic data |
| Performance | Pages load fast even with high-res images — use lazy loading and image compression |

---

## 7. Out of Scope (Launch)

- Shopping cart / payment processing (direct inquiry model only)
- User accounts or wishlists
- Blog or editorial content
- Auction functionality
- Search/filter across guitars
- Email list / newsletter

---

## 8. Phased Roadmap

### Phase 1 — Launch
- Home, Collection, Past Guitars, For Sale, About, Contact
- Guitar detail page template
- Mobile-responsive design
- Contact form

### Phase 2 — Growth
- Filter/search by year, model, finish
- Instagram feed integration (pulls guitar posts automatically)
- Email list signup for "new arrivals" notifications

### Phase 3 — Optional
- Wanted list ("guitars I'm looking to buy")
- Price history or sold archive with prices
- Video-forward format (YouTube channel integration)
