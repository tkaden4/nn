export interface Vector<T extends number> {
  mul(c: number): Vector<T>;
  add(v: Vector<T>): Vector<T>;
  elems: number[];
  dim: number;
}

export function vec<T extends number>(arr: number[]): Vector<T> {
  return {
    mul(c) {
      return vec(arr.map((x) => x * c));
    },
    add(v) {
      if (v.dim !== this.dim) {
        throw new Error(`${v.dim} != ${this.dim}`);
      }
      return vec(this.elems.map((zi, i) => zi + v.elems[i]));
    },
    elems: arr,
    dim: arr.length,
  };
}

export function vec2(...zs: [number, number]) {
  return vec<2>(zs);
}
