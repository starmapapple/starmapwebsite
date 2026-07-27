# Design QA

## Result

Passed.

The public homepage was rebuilt from the live Wix source at `https://www.starmap.id/`.
The new implementation uses the original StarMap imagery, logos, video, copy, colors,
and locally hosted Wix font files. The Wix mobile layout's fixed-width overflow was
intentionally replaced by a responsive layout.

## Evidence

- Source captures: `../../source-capture/desktop/`
- Implementation captures: `qa/implementation-desktop-*-v2.png`
- Side-by-side desktop comparisons: `qa/compare-desktop-*-v2.png`
- Final typography comparison: `qa/compare-desktop-ecommerce-v3.png`
- Mobile captures: `qa/implementation-mobile-*.png`
- Video modal capture: `qa/implementation-mobile-video-modal.png`

Desktop comparison viewport: 1280 × 720 CSS pixels. Captured content area:
1265 × 712 pixels.

Mobile verification viewport: 390 × 844 CSS pixels. Captured content area:
375 × 844 pixels.

Tablet verification viewport: 768 × 900 CSS pixels.

## Desktop measurements

The final implementation matches the live source section rhythm:

| Element | Wix source Y / size | Implementation Y / size |
| --- | ---: | ---: |
| Ecommerce heading | 995 / 81 | 995 / 81 |
| Production heading | 2927 / 81 | 2927 / 81 |
| Production gallery | 3117 / 1137×617 | 3117 / 1137×617 |
| Talent heading | 3847 / 81 | 3847 / 81 |
| Talent gallery | 4062 / 885×864 | 4062 / 885×864 |
| Events heading | 5011 / 81 | 5011 / 81 |
| Events gallery | 5229 / 885×864 | 5229 / 885×864 |
| Our Clients heading | 6213 / 81 | 6212 / 81 |
| Contact Us heading | 7025 / 84 | 7027 / 81 |

The talent and events galleries reproduce the Wix mosaic proportions instead of using
generic equal-width cards.

## Responsive checks

- Mobile document width: 375 pixels at a 390-pixel browser viewport; no page-level
  horizontal overflow.
- Tablet document width: 753 pixels at a 768-pixel browser viewport; no page-level
  horizontal overflow.
- Mobile galleries become touch-friendly horizontal carousels.
- The client wall becomes a two-column grid on mobile.
- Long headings wrap without clipping.

## Interaction checks

- WATCH VIDEO opens an accessible modal with native video controls.
- The modal closes through the close button and releases the body scroll lock.
- Talent gallery next control moved `scrollLeft` from 0 to 320 pixels on mobile.
- SEND resolves to `mailto:admin@billboardid.com`.
- GrupBeli resolves to `https://grupbeli.com/`.
- The map query contains the supplied Jakarta address, including `RT.4/RW.1`.

## Accessibility checks

- No images are missing `alt` attributes.
- No buttons are missing visible text or accessible names.
- No empty links were found.
- Heading order is consistent across all six homepage sections.
- Keyboard focus styles and reduced-motion handling are included.

## Iterations

1. Initial source-asset rebuild with responsive structure.
2. Replaced generic gallery sizing with source-measured Wix mosaic layouts.
3. Corrected the Wix font-file mapping and matched desktop section positions.
4. Removed source-inaccurate accent lines and SEND icon from Clients/Contact.
5. Tuned contact-map dimensions and mobile layout, then reran interaction and
   overflow checks.
