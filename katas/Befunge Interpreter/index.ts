import { readFileSync } from "fs";
import { BefungeInterpreter } from "./interpreter";

function interpret(code: string) {
  const bef = new BefungeInterpreter(code, {
    debug: false,
    wait: false,
  });

  bef.runSync();
  return bef.output;
}

const code = readFileSync("./test.bf");
const result = interpret(code.toString("utf-8"));
console.log(result);
