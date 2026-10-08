# Wau flyer layers

## Cinematic visual pass

Active background: `public/hero/jerai-afternoon.webp` (1774 × 887), with source `artwork/wau-bulan/jerai-afternoon.png`. This is an AI-refined interpretation of the original Gunung Jerai photo, not a new documentary photograph. Built-in imagegen prompt: preserve the mountain ridge and rural paddy-field setting; refine field and palm detail, retain cool atmospheric mountain depth, add restrained warm afternoon light from upper left, creamy clouds and soft blue sky. No people, kite, string or graphic overlays. Original landscape retained.

Active arm: `public/hero/wau-person-right-arm.webp`, source `artwork/wau-bulan/wau-person-right-arm.png`. Built-in imagegen corrected the reference's left hand to right-hand dorsal anatomy: back-of-hand visible, thumb on viewer's right, compact closed index/thumb pinch, remaining fingers curled. Preserve black blazer, cuff and bent-arm composition. Grip marker adjusted to (92%, 13.3%).

The visual pass reduces the cream overlay, shifts the person left, softens homepage botanical decoration, uses a thinner tensioned string and adds gentle continuous kite drift after launch. Reduced motion remains static. Mobile image sizing accounts for the large landscape crop rather than requesting a viewport-width thumbnail.

Generated using the built-in imagegen tool from the supplied portrait and approved hero preview. Final source PNGs are retained here; the website loads the optimized WebP versions in `public/hero/`. Temporary screenshots and rejected arm variants have been removed.

## Generation prompts

Body: Create a production photographic transparent PNG character asset for the portfolio hero. Use the original portrait for identity and the generated hero for pose. Output only head, neck and blazer torso, with no raised foreground arm. Preserve rectangular glasses, tan skin, side-parted black hair, black blazer, white collar and burgundy inner garment. Three-quarter rear/side view facing right, looking upward. Crop at lower chest; retain the shoulder surface for a separate sleeve overlay. Match soft sunny outdoor lighting. No background, text, kite or string; genuine alpha transparency.

Arm: Create a separate matching right arm layer, with black blazer sleeve, white cuff and tan hand pinching an imaginary kite string. Rounded shoulder near (20%, 60%), elbow near (53%, 85%), wrist near (74%, 43%) and fingers near (82%, 25%). Upper arm slopes down and right; forearm rises up and right. Match the body's perspective, material and lighting. No torso, head, string or background; genuine alpha transparency.

## Implementation and future interaction

`HeroWauPerson` composes body and arm independently. The arm has a shoulder transform origin and `--wau-arm-angle` CSS variable. Its grip marker supplies the rope endpoint on layout changes. The existing 3D kite, launch motion, reduced-motion behavior, and rope simulation remain in place.

This stage is decorative. A future drag controller must update the grip anchor during movement, constrain the shoulder rotation, and drive kite response. The arm currently has a fixed elbow bend; independent elbow movement needs an additional forearm layer with an overlapping joint. Do not imply that dragging is already supported.

The fallback uses the existing kite poster with an SVG string and both person layers even if WebGL/model loading fails.
