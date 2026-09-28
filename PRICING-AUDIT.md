# C059 pricing update — local review

Prepared 28 September 2026. Not committed, pushed or deployed.

## Scope and source

Authoritative source: client-supplied `LZ_Building_Premium.pdf`, one-page “Availability & Price List - Pre-Sale”. No issue date is printed. The source was extracted by cell geometry and reviewed as a rendered image, including the colour legend. The public reference page was not used for prices or payment terms.

The PDF review workflow informed the separation of grey hotel floors from residential sold inventory and confirmed white floor-13 entries as available. Every unit ID, floor, size, status and price was then checked against an independent transcription of the PDF.

## Inventory

268 numbered entries are represented: 212 residential units, 42 Shira Collection Hotel units, and 14 Retail & Services units. Floor 1 and ground-floor facilities are also represented, without inventing unit numbers.

| Residential status | Units |
| --- | ---: |
| Available | 66 |
| Reserved | 2 |
| Sold | 144 |
| Total | 212 |

Hotel floors 10–12 are explicitly labelled “Sold — Shira Collection Hotel”; those 42 entries are not included in the residential sold count. Reserved units are 2129 and 2130.

| Available category | Units | Size range, sqm | From, USD |
| --- | ---: | --- | ---: |
| Studio | 56 | 44.7–48.3 | $67,480 |
| 1 Bedroom | 2 | 89.4 | $138,801 |
| 2 Bedroom | 3 | 93.0 | $144,391 |
| 3 Bedroom | 3 | 133.92–137.46 | $208,790 |
| Penthouse | 2 | 271.6–367.0 | $572,520 |

## Files

- Modified `index.html`: Pricing navigation link after Residences and View Current Prices CTA only.
- Created `pricing.html`: dedicated page; existing header/footer identity, disclaimer, building-use information, qualified payment copy and consultant contact methods.
- Created `assets/css/pricing.css`: page-scoped responsive presentation; table rows become mobile cards.
- Created `assets/js/pricing-data.js`: complete static inventory, source precision retained, null prices where unquoted.
- Created `assets/js/pricing.js`: derived category summaries, status/floor/type/unit filters, expandable floor groups, contextual WhatsApp enquiry links and mobile navigation.
- Created `PRICING-AUDIT.md`: this report.

Existing shared stylesheet, homepage JavaScript, imagery, download files, facilities, investment, developer, gallery and contact content were not changed. Diagnostic scripts/screenshots remain outside the repository in the workspace `.c059-tools` folder.

## Uncertainties deliberately not guessed

- Floor 4 is absent from the PDF; it is not synthesised or marked sold.
- No source issue date, net/gross area definition or individual sold/reserved/hotel/retail price is supplied. These remain unstated; prices are null rather than zero.
- Studio classification follows the PDF footnote for 44.7 and 48.3 sqm residences; no bedroom count is invented for studios.
- Floor 13 uses only the supplied IDs 1321–1329; different sizes such as 89.4, 93.0 and 93.1 are not normalised.
- Penthouse N.2 is unit 2417, 4 bedrooms, Jacuzzi, 367.0 sqm, $770,350. Penthouse N.1 is unit 2418, 3 bedrooms, Jacuzzi, 271.6 sqm, $572,520. The PDF numbering is preserved.
- Payment copy is reused from the existing project's qualified payment section; no old reference-page booking amount or instalment duration is added.

## Verification

- Independent source comparison passed for all 268 IDs, floors, sizes, statuses and all 66 quoted prices. All 202 unpriced entries remain null.
- Category summaries derive solely from available records; no old reference-page starting prices are used.
- Headless Microsoft Edge: widths 320, 390, 768, 951, 1024 and 1440 tested with no horizontal page overflow on pricing; homepage checked at 320, 390, 951, 1024 and 1440.
- Verified All / Available / Reserved / Sold counts, category selection, reset, unit search, empty state, mobile navigation and Escape dismissal, homepage pricing CTA, and unit-specific WhatsApp price context.
- Desktop/mobile screenshots reviewed; corrected inherited accordion label rotation.
- No page JavaScript errors or failed HTTP resources during test navigation. Enquiry links were inspected without sending messages. No backend, checkout or reservation system added.

Local preview: http://127.0.0.1:8767/pricing.html
