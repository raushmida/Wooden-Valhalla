# PRD: Wooden Valhalla ROI Calculator

**Version:** 1.0
**Date:** 2026-02-25

---

## 1. Purpose

A simple, interactive calculator embedded on the Wooden Valhalla website that helps potential buyers quantify the financial and experiential value of buying a Gibson Les Paul from Wooden Valhalla vs. a typical online marketplace (Reverb, eBay, Facebook groups).

This is a trust-building and lead generation tool — not a hard sell. The tone should make the buyer feel smarter for doing the math, not pressured. It serves Marcus (the serious player-collector persona) who already suspects marketplaces are costing him more than the sticker price, but hasn't put a number on it.

---

## 2. Target User

**Marcus** — the serious player-collector from the persona doc.
- Owns 3–8 guitars, shops in the $4,000–$20,000 range
- Buys Custom Shop reissues, limited runs, artist models
- Has been burned by at least one misrepresented online purchase
- Knows enough about guitars to appreciate honesty over hype

---

## 3. Core Concept

The calculator takes 4 simple inputs and outputs a personalized dollar figure representing what the buyer stands to save or protect by buying from a trusted, direct seller instead of a faceless marketplace listing.

The output is broken into clear categories so Marcus can see *where* the value comes from — not just a magic number.

---

## 4. Inputs

| # | Input | Type | Default | Range / Options |
|---|-------|------|---------|-----------------|
| 1 | **Guitar price** | Slider or text input | $8,000 | $4,000 – $20,000 |
| 2 | **Guitars bought online** (last 3 years) | Number stepper | 2 | 1 – 10 |
| 3 | **Ever received a misrepresented guitar?** | Toggle | No | Yes / No |
| 4 | **Hours spent searching per guitar** | Number stepper | 8 | 2 – 40 |

### Why these inputs

- **Guitar price** drives the dollar impact of every downstream calculation. A 5% fee on a $4K guitar is $200. On a $20K guitar, it's $1,000. Marcus needs to see his own number.
- **Guitars bought** scales the cumulative impact. One bad experience is a lesson; three is a pattern.
- **Misrepresentation toggle** unlocks a risk-adjusted value section and makes the results feel personal. If Marcus says "yes," the calculator acknowledges what he already knows.
- **Hours searching** converts his time into money and shows how much of it he's spending on noise vs. actual evaluation.

---

## 5. Output Categories

Each category shows a dollar amount and a one-sentence explanation. The total is displayed prominently at the bottom.

### 5.1 Marketplace Markup Avoided

**What it calculates:** The fees that marketplace sellers bake into their asking price.

- Reverb seller fee: ~5%
- Payment processing: ~3.3%
- Promoted listings (common at this price tier): ~2–6%
- **Conservative estimate: 8% of guitar price is platform overhead priced into the listing**

**Formula:** `guitar_price × 0.08`

**Display example:**
> *Marketplace overhead on an $8,000 guitar: **$640***
> Sellers don't eat platform fees — they price them in. Buying direct means the price reflects the guitar, not the platform.

---

### 5.2 Misrepresentation Risk Avoided

**What it calculates:** The expected cost of condition surprises — undisclosed refins, pickup swaps, fret wear glossed over, "light player wear" that's actually buckle rash.

- Industry estimates: ~15–20% of used guitar transactions over $3K have a material condition discrepancy
- Average value impact of a misrepresentation at this price tier: 12–25% of the guitar's value (a hidden refin on a $12K Custom Shop Historic can cost $2K–$4K in resale value)
- **Conservative estimate: 15% chance × 15% value hit**

**Formula:**
- If "misrepresented before" = No: `guitar_price × 0.15 × 0.15 × guitars_bought`
- If "misrepresented before" = Yes: `guitar_price × 0.25 × 0.15 × guitars_bought` (higher probability weight since their experience confirms the risk)

**Display example (Yes, misrepresented before):**
> *Risk exposure from undisclosed issues: **$600***
> You've already seen this firsthand. At Wooden Valhalla, every guitar gets 10+ photos, video, and condition notes that include the flaws — not just the beauty shots.

**Display example (No):**
> *Risk exposure from undisclosed issues: **$360***
> You haven't been burned yet. This is what you're avoiding by buying from a seller who documents everything, including what's wrong.

---

### 5.3 Time Saved Searching

**What it calculates:** The dollar value of hours spent scrolling bad listings, messaging unresponsive sellers, comparing suspect photos, and second-guessing descriptions.

- Valued at $75/hour (conservative for Marcus's income profile — engineer, attorney, or business owner)
- Estimate: Wooden Valhalla's documentation eliminates ~60% of the evaluation time because the photos, video, and condition notes answer questions before they're asked

**Formula:** `hours_searching × 0.60 × $75 × guitars_bought`

**Display example:**
> *Time recovered from not sifting through junk: **$720***
> That's 9.6 hours you didn't spend scrolling Reverb, zooming into blurry photos, and waiting for sellers to respond with "it's in great condition."

---

### 5.4 Documentation Value for Resale

**What it calculates:** The resale premium that comes from having thorough, professional-grade documentation from a known source.

- A guitar with provenance, multi-angle photography, and video holds value better than one with a Reverb listing screenshot
- **Conservative estimate: 3% resale value protection**

**Formula:** `guitar_price × 0.03 × guitars_bought`

**Display example:**
> *Resale value protected by real documentation: **$480***
> When you sell this guitar, you'll have 10+ photos, video, serial number records, and honest condition notes from a trusted source. That's worth more than "see my other listings."

---

### 5.5 Return & Dispute Costs Avoided

**What it calculates:** The cost of sending a guitar back when it's not what was described.

- Round-trip shipping for a guitar: $150–$250
- Restocking fees (common): 5–10%
- Time dealing with disputes: 3–5 hours
- **Applied only when misrepresentation probability triggers**

**Formula:**
- If "misrepresented before" = Yes: `($200 + (guitar_price × 0.05) + (4 × $75)) × 0.25`
- If "misrepresented before" = No: `($200 + (guitar_price × 0.05) + (4 × $75)) × 0.15`

**Display example:**
> *Avoided return and dispute costs: **$250***
> Shipping a $10K guitar back costs $200+ before you factor in restocking fees and the hours spent on the phone with PayPal.

---

## 6. Total Output

**Display:** Large, prominent number with a summary statement.

**Formula:** Sum of sections 5.1 through 5.5.

**Example output at $8,000 / 2 guitars / Yes misrepresented / 8 hours searching:**

| Category | Value |
|----------|-------|
| Marketplace markup avoided | $640 |
| Misrepresentation risk avoided | $600 |
| Time saved searching | $720 |
| Documentation resale value | $480 |
| Return & dispute costs avoided | $250 |
| **Total value** | **$2,690** |

**Summary statement:**
> "Buying two guitars at $8,000 from a source like Wooden Valhalla protects roughly **$2,690** in value you'd otherwise lose to platform fees, hidden issues, wasted time, and poor documentation. That's **16.8%** of your total spend."

---

## 7. CTA After Results

After the results display:

**Primary CTA:** "See What's Available" → links to the For Sale page
**Secondary CTA:** "Tell Me What You're Looking For" → links to the contact/inquiry form

Both CTAs should feel natural, not aggressive. The calculator already did the selling.

---

## 8. Design & UX

- **One screen.** No multi-step wizard. All 4 inputs visible at once, results update in real-time as inputs change.
- **Match the Wooden Valhalla design system.** Dark background, warm gold accents, Cormorant Garamond headings, Outfit body text.
- **No login, no email gate.** The calculator is freely accessible. It builds trust, not friction.
- **Mobile-first.** Inputs stack vertically on mobile. Results stack as cards.
- **Subtle animation.** Numbers should count up when inputs change, not just snap.

---

## 9. Tone Guidelines

- **Honest, not salesy.** The numbers are conservative on purpose. If Marcus checks the math, it should hold up.
- **Acknowledge his experience.** The "misrepresented before" toggle should change the copy, not just the numbers. He's been there. Validate that.
- **No superlatives.** No "amazing," no "incredible deal." Just math and straight talk.
- **Knowledgeable.** Reference specific guitar-world things (refins, pickup swaps, weight relief, buckle rash). Marcus will notice if this was written by someone who doesn't know guitars.

---

## 10. Technical Requirements

| Requirement | Notes |
|-------------|-------|
| Framework | Pure HTML/CSS/JS (matches existing site) or lightweight React |
| State | Client-side only, no backend needed |
| Analytics | Track: calculator loads, input changes, CTA clicks |
| Performance | Instant calculation — no loading states needed |
| Hosting | Same as main site |

---

## 11. What This Is NOT

- Not a pricing tool (it doesn't tell Marcus what a guitar is worth)
- Not a comparison shopping tool (it doesn't pull live Reverb listings)
- Not gated content (no email capture before using it)
- Not a guarantee or promise (copy should include a light disclaimer that savings are estimates)

---

## 12. Success Metrics

| Metric | Target |
|--------|--------|
| Calculator page views → For Sale page clicks | 15%+ click-through |
| Calculator page views → Inquiry form submissions | 5%+ conversion |
| Average time on calculator page | 45+ seconds |
| Bounce rate from calculator page | Below 50% |
