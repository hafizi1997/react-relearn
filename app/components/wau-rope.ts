import { Vector3 } from "three";

/** Fixed-length Verlet rope; endpoints are driven by the kite and hand anchor. */
export class WauRope {
  readonly points: Vector3[];
  private readonly previous: Vector3[];
  private readonly delta = new Vector3();
  private readonly velocity = new Vector3();
  private segmentLength = 0;

  constructor(readonly count = 32) {
    this.points = Array.from({ length: count }, () => new Vector3());
    this.previous = this.points.map(() => new Vector3());
  }

  reset(start: Vector3, end: Vector3, length: number) {
    this.segmentLength = length / (this.count - 1);
    this.points.forEach((point, i) => {
      const t = i / (this.count - 1);
      point.lerpVectors(start, end, t);
      point.x += Math.sin(Math.PI * t) * length * 0.035;
      this.previous[i].copy(point);
    });
  }

  /** Feed or retrieve line as the kite travels, without resetting rope velocity. */
  setLength(length: number) {
    this.segmentLength = Math.max(0.1, length) / (this.count - 1);
  }

  step(start: Vector3, end: Vector3, dt: number, wind: number) {
    for (let i = 1; i < this.count - 1; i++) {
      const p = this.points[i];
      this.velocity.subVectors(p, this.previous[i]).multiplyScalar(0.985);
      this.previous[i].copy(p);
      p.add(this.velocity);
      p.x += wind * dt * dt;
      p.y -= 1.8 * dt * dt;
      p.z += wind * 0.18 * dt * dt;
    }
    // Project distances repeatedly, including fully weighted end segments.
    for (let pass = 0; pass < 36; pass++) {
      this.points[0].copy(start);
      this.points[this.count - 1].copy(end);
      for (let k = 0; k < this.count - 1; k++) {
        const i = pass % 2 ? this.count - 2 - k : k;
        const a = this.points[i], b = this.points[i + 1];
        this.delta.subVectors(b, a);
        const distance = this.delta.length();
        if (distance < 1e-8) continue;
        this.delta.multiplyScalar((distance - this.segmentLength) / distance);
        if (i === 0) b.sub(this.delta);
        else if (i === this.count - 2) a.add(this.delta);
        else { a.addScaledVector(this.delta, 0.5); b.addScaledVector(this.delta, -0.5); }
      }
    }
    this.points[0].copy(start);
    this.points[this.count - 1].copy(end);
  }
}
