import type { RefObject } from "react";
import Image from "next/image";

/** Approved cartoon cutout with a measured grip for the separate kite string. */
export function HeroWauPerson({
  gripRef,
}: {
  gripRef: RefObject<HTMLSpanElement | null>;
}) {
  return (
    <div className="hero-wau-person">
      <Image
        className="hero-wau-person-body"
        src="/hero/wau-character-tengkolok.webp"
        width={1254}
        height={1254}
        alt=""
        draggable={false}
        sizes="220px"
        unoptimized
      />
      <span className="hero-wau-person-grip" ref={gripRef} />
    </div>
  );
}
