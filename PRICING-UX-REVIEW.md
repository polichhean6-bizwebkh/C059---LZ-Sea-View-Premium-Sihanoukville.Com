# C059 client pricing UX refinement

Prepared 30 September 2026 for local review. No commit, push or deployment performed.

## Files changed

- `pricing.html`: quick residence filter group, image qualification, mobile enquiry bar and inline branded favicon.
- `assets/js/pricing.js`: five image-led residence cards, derived price/size/bedroom summaries, contextual WhatsApp links, coordinated quick filters and mobile enquiry state.
- `assets/css/pricing.css`: premium listing layout, consistent 16:9 images, stronger price hierarchy, accessible tap sizes, responsive grid and mobile bottom bar with footer clearance and safe-area padding.
- `PRICING-UX-REVIEW.md`: this report.

Homepage, shared assets/styles, exact inventory dataset, hero, detailed inventory/status filters, building-use information, payment copy and existing consultant contact details are unchanged.

## Cards and prices

| Card | Starting USD price | Available units | Approved existing image |
| --- | ---: | ---: | --- |
| Studio | $67,480 | 56 | units/lz-097.webp |
| 1 Bedroom | $138,801 | 2 | units/lz-045.webp |
| 2 Bedroom | $144,391 | 3 | units/lz-182.webp |
| 3 Bedroom | $208,790 | 3 | units/lz-126.webp |
| Penthouse | $572,520 | 2 | units/lz-058.webp |

Prices, available counts, sizes and specified bedroom counts derive from `LZ_PRICING`, not hardcoded marketing prices. Source dataset is unchanged. Studio is described as open-plan sleeping, without inventing a separate bedroom count. Penthouse shows 3–4 bedrooms. Artist impressions use the homepage's existing category mapping and are not represented as photographs of individual available units.

## Interaction and mobile

- All / Studio / 1 Bedroom / 2 Bedroom / 3 Bedroom / Penthouse buttons select available inventory, clear stale floor/search restrictions, highlight the category, and move focus/scroll to the inventory. Reduced-motion preferences are respected.
- View Available Units performs the same action. Enquire opens the existing consultant's WhatsApp with the residence type in the draft message; no message is automatically sent.
- Detailed dropdown selections and reset synchronise the quick-button highlight and mobile enquiry context.
- Desktop uses three columns, tablet two, mobile one. Card actions have minimum 44px targets. Floor rows retain their existing mobile-card presentation.
- Mobile bottom bar displays the selected category's starting price among available units and a contextual enquiry link. It is not a quote for a particular floor/search result or sold/reserved unit. Its label identifies the category, and its copy states that the price needs confirmation. Safe-area padding and bottom page clearance preserve access to the footer.

## QA and assumptions

- Re-ran independent inventory verification: all 268 source entries and all 66 quoted prices match the established source transcription. No prices/statuses were edited or taken from public websites.
- Checked at 1440, 1024, 768, 390 and 320px: no horizontal overflow; mobile bar hidden on desktop/tablet and visible on phones.
- Verified all five derived prices, all quick filters, all card enquiry URLs, image loading, reset, available/sold counts and penthouse navigation to floor 24.
- Existing pricing regression tests passed: reserved/sold/all filters, search, empty results, mobile navigation/Escape, unit enquiry context and homepage Pricing CTA.
- Reviewed desktop/mobile screenshots for price hierarchy, alignment, crops and readable mobile unit cards. No JavaScript, console or HTTP errors in final UX test.
- No new pricing/data assumptions. Written brief was supplied, but the referenced realestate.com.kh screenshot was not attached; implementation follows the written requirements and existing C059 visual identity.

Preview: http://127.0.0.1:8767/pricing.html
