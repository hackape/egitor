import IDE from "./ide";

const ide = new IDE();

((window || global) as any).ide = ide;
