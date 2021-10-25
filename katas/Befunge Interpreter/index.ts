import { BefungeInterpreter } from "./interpreter";

const code = `
vv  <      <
    2
    ^  v<
 v1<?>3v4
    ^   ^
>  >?>  ?>5^
    v   v
 v9<?>7v6
    v  v<
    8
 .  >  >   ^
^<

`;

const bef = new BefungeInterpreter(code, {
  debug: true,
  wait: true,
}).run();
