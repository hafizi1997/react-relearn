import type { RefObject } from "react";

/** Separate body and arm layers; the grip follows the arm's shoulder pivot. */
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
        src="/hero/wau-person-body.webp"
        width={1254}
        height={1254}
        alt=""
        draggable={false}
      />
      <div className="hero-wau-person-arm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/wau-person-right-arm.webp"
          width={1254}
          height={1254}
          alt=""
          draggable={false}
        />
        <span className="hero-wau-person-grip" ref={gripRef} />
      </div>
    </div>
  );
}
