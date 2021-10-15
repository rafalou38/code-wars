class BefungeInterpreter {
  width: number;
  height: number;

  pos = new Vector2(0,0);

  

  grid: Instruction[][];

  stack: (number | string)[] = [];

  finished = false;

  constructor(code: string) {
    this.grid = this.transformToMatrix(code);
    this.height = this.grid.length;
    this.width = this.grid[0].length;

    while (finished) {
      this.walk();
    }
  }

  walk() {
    let instruction = this.grid[this.posX][this.posY];
  }

  /** returns a 2D array with the code */
  transformToMatrix(code: string): Instruction[][] {
    return code.split("\n").map((line) => line.split(""));
  }
}
