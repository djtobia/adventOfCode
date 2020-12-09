import * as fs from "fs";
function readInput(fileName, pattern = null) {
  return fs.readFileSync(fileName, "utf8").split(pattern ? pattern : "\r\n");
}

export { readInput };
