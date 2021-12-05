import * as fs from "fs";
function readInput(fileName: string, pattern: RegExp = /\r\n/) : Array<string> {
    return fs.readFileSync(fileName, "utf8").split(pattern);
  }

export { readInput };