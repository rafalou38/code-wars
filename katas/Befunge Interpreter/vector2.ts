export class Vector2 {
  x: number = 0;
  y: number = 0;

  constructor(x: number, y: number) {
    this.set(x, y);
  }
  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  add(vec: Vector2) {
    this.x += vec.x;
    this.y += vec.y;
  }
  wrap(width: number, height: number) {
    this.set(
      (width + this.x) % width, //
      (height + this.y) % height
    );
  }
  toString() {
    return `{ x: ${this.x} y: ${this.y} }`;
  }
}
