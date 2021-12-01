import * as fs from "fs";
function readInput(fileName: string, pattern: string = '') : Array<string> {
    return fs.readFileSync(fileName, "utf8").split(pattern ? pattern : "\r\n");
  }

export { readInput };