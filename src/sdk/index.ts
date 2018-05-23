import IDE from "./IDE";

const ide = new IDE();

((window || global) as any).ide = ide;
