import type { RefObject } from "react";

/** Approved cartoon cutout with a measured grip for the separate kite string. */
export function HeroWauPerson({
  gripRef,
}: {
  gripRef: RefObject<HTMLSpanElement | null>;
}) {
  return (
    <div className="hero-wau-person">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hero-wau-person-body"
        src="/hero/wau-character-tengkolok.webp"
        width={1254}
        height={1254}
        alt=""
        draggable={false}
      />
      <span className="hero-wau-person-grip" ref={gripRef} />
    </div>
  );
}
