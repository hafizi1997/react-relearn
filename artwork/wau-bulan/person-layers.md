# Hero artwork

## Current assets

- Character: `public/hero/wau-character-tengkolok.webp`; editable source: `artwork/wau-bulan/wau-character-tengkolok.png`.
- Landscape: `public/hero/jerai-afternoon.webp` (1774 x 887); source: `artwork/wau-bulan/jerai-afternoon.png`. The original landscape photograph is retained at `public/hero/gunung jerai.avif`.
- Kite: `public/models/wau-bulan.glb`; static fallback: `public/hero/wau-bulan-flight.webp`. The Blender project and floral texture are retained here for editing.

The cartoon replaces the previous photographic body and arm. Obsolete assets and temporary verification screenshots have been removed.

## Generation notes

Created with built-in imagegen. Character prompt: a painterly Malay cartoon character in teal baju Melayu, cream-and-gold tengkolok and glasses, looking upward toward a wau; upper-body crop with raised right-hand grip, warm afternoon light and transparent background. No kite or string in the image because these are separate website elements.

Landscape prompt: preserve the Gunung Jerai mountain ridge and rural paddy-field setting; refine field and palm detail, retain cool atmospheric mountain depth, and add restrained warm afternoon light from upper left, creamy clouds and soft blue sky. No people, kite, string or graphic overlays. This is an AI-refined interpretation of the original photograph.

## Implementation

`HeroWauPerson` displays one transparent cartoon cutout. Its grip marker at (92.4%, 16.1%) supplies the rope endpoint on layout changes. Person size and crop are controlled by `.hero-wau-person` in `app/globals.css`.

The 3D kite launches then drifts gently; reduced motion stays static. If WebGL or model loading fails, the static kite poster and SVG string remain visible.

Hand dragging is not implemented. Independent arm movement will require separate character layers and a controller that updates the grip anchor, constrains movement and drives kite response.
