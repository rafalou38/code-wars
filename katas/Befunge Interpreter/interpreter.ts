import { Instruction } from "./types/instruction";
import { ISettings } from "./types/settings";
import { Vector2 } from "./vector2";

export class BefungeInterpreter {
  settings: ISettings;

  width: number;
  height: number;

  private pos = new Vector2(0, 0);

  private dir = new Vector2(1, 0);

  grid: (Instruction | string)[][];

  output = "";

  stack: number[] = [];

  private stringMode = false;
  private finished = false;
  private skipNext = false;

  constructor(code: string, settings: ISettings = {}) {
    this.settings = settings;

    if (settings.trim) code = code.trim();

    this.grid = this.transformToMatrix(code);

    this.height = this.grid.length;
    this.width = this.grid.map((r) => r.length).sort((a, b) => b - a)[0];

    this.normalizeGrid();
  }
  async run() {
    while (!this.finished) {
      if (this.settings.debug) this.showDebug();

      this.walk();
      this.pos.add(this.dir);
      this.pos.wrap(this.width, this.height);

      if (this.settings.wait) await this.waitKey();
    }
  }
  runSync() {
    while (!this.finished) {
      if (this.settings.debug) this.showDebug();

      this.walk();
      this.pos.add(this.dir);
      this.pos.wrap(this.width, this.height);

      if (this.settings.wait)
        console.warn("Don't use runSync if you want wait");
    }
  }

  private walk() {
    let instruction = this.grid[this.pos.y][this.pos.x];

    if (this.skipNext) return (this.skipNext = false);

    if (this.stringMode && instruction !== '"') {
      return this.stack.push(instruction.charCodeAt(0));
    }

    // instruction is a number
    if (!isNaN(parseInt(instruction))) {
      let num = parseInt(instruction);
      this.stack.push(num);
      return;
    }

    switch (instruction) {
      case "@": {
        this.finished = true;
        break;
      }
      case "#": {
        this.skipNext = true;
        break;
      }
      case " ": {
        break;
      }

      // change direction
      case "<": {
        this.dir.set(-1, 0);
        break;
      }
      case ">": {
        this.dir.set(1, 0);
        break;
      }
      case "v": {
        this.dir.set(0, 1);
        break;
      }
      case "^": {
        this.dir.set(0, -1);
        break;
      }
      case "?": {
        const newDir = [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ][Math.floor(Math.random() * 4)];
        this.dir.set(newDir[0], newDir[1]);
        break;
      }

      // logic direction
      case "_": {
        const [v] = this.pop(1);
        if (v === 0) {
          this.dir.set(1, 0);
        } else {
          this.dir.set(-1, 0);
        }
        break;
      }
      case "|": {
        const [v] = this.pop(1);
        if (v === 0) {
          this.dir.set(0, 1);
        } else {
          this.dir.set(0, -1);
        }
        break;
      }

      // arithmetic operations
      case "+": {
        const [a, b] = this.pop(2);
        this.stack.push(a + b);
        break;
      }
      case "-": {
        const [a, b] = this.pop(2);
        this.stack.push(a - b);
        break;
      }
      case "*": {
        const [a, b] = this.pop(2);
        this.stack.push(a * b);
        break;
      }
      case "/": {
        const [a, b] = this.pop(2);
        if (a === 0) this.stack.push(0);
        else this.stack.push(Math.round(a / b));
        break;
      }
      case "%": {
        const [b, a] = this.pop(2);
        if (a === 0) this.stack.push(0);
        else this.stack.push(b % a);
        break;
      }

      // logic
      case "!": {
        const [a] = this.pop(1);
        if (a === 0) this.stack.push(1);
        else this.stack.push(0);
        break;
      }
      case "`": {
        const [a, b] = this.pop(2);
        if (a > b) this.stack.push(1);
        else this.stack.push(0);
        break;
      }

      // stack manipulation
      case "\\": {
        const [a, b] = this.pop(2);
        this.stack.push(b, a);
        break;
      }
      case ":": {
        if (this.stack.length === 0) this.stack.push(0);
        this.stack.push(this.stack[this.stack.length - 1]);
        break;
      }
      case "$": {
        this.pop(1);
        break;
      }

      // strings
      case ".": {
        const [a] = this.pop(1);
        this.output += a.toString();
        if (!this.settings.debug) process.stdout.write(a.toString());

        break;
      }
      case ",": {
        const [a] = this.pop(1);
        this.output += String.fromCharCode(a);
        if (!this.settings.debug) process.stdout.write(String.fromCharCode(a));
        break;
      }
      case '"': {
        this.stringMode = !this.stringMode;
        break;
      }

      case "p": {
        const [v, x, y] = this.pop(3);

        this.grid[y][x] = String.fromCharCode(v);
        break;
      }
      case "g": {
        const [x, y] = this.pop(2);
        this.stack.push(this.grid[y][x].charCodeAt(0));
        break;
      }

      case undefined:
        console.error("found empty instruction");
        this.finished = true;
        break;
      default:
        console.log("Instruction not implemented:", instruction);
        break;
    }
  }

  private pop(count: number) {
    let poped = this.stack.splice(this.stack.length - count, count);
    poped = [
      ...new Array(count - poped.length).fill(0), //
      ...poped,
    ];

    return poped;
  }
  /** returns a 2D array with the code */
  private transformToMatrix(code: string): Instruction[][] {
    return code.split("\n").map((line) => line.split("") as Instruction[]);
  }
  private normalizeGrid() {
    this.grid = this.grid.map((row) => {
      if (row.length < this.width) {
        const remaining = new Array(this.width - row.length).fill(
          " "
        ) as Instruction[];
        return row.concat(remaining);
      } else {
        return row;
      }
    });
  }

  showDebug() {
    console.clear();
    console.log(
      this.grid
        .map((row, y) =>
          row
            .map((instruction, x) => {
              if (x == this.pos.x && y == this.pos.y) {
                return "\u001b[32m€\u001b[0m";
              } else {
                return instruction;
              }
            })
            .join("")
        )
        .join("\n")
    );

    console.log(`
    position: ${this.pos} dirrection: ${this.dir}
    stack: ${this.stack}
    output: ${this.output}
    `);
  }
  private async waitKey() {
    process.stdin.setRawMode(true);
    return new Promise((resolve, reject) =>
      process.stdin.once("data", (data) => {
        if (data.toString().match(/q/)) process.exit(1);
        process.stdin.setRawMode(false);
        resolve(null);
      })
    );
  }
}
