import { readInput } from "./helpers/filereader";
import { FileSystem, Dir, File } from "./helpers/FileSystem";
const input = readInput("./input/test.txt");
console.log(input);

const fileSystem = new FileSystem(new Dir("/", null));
let curr: Dir = fileSystem.head;
// build 'file system'
for (let i = 1; i < input.length; i++) {
  let line = input[i];
  // this is a command
  if (line.includes("$")) {
    line = line.slice(2);
    // don't need to do anything with ls
    if (line === 'ls') {
      continue;
    } else {
      const dirName = line.split(" ")[1];
      // find the next dir and move into it
      if (dirName === '..') {
        console.log("in here baby");
        if (curr.previousDir) {
          curr = curr.previousDir;
        }
      } else {
        curr = curr.findDir(dirName)
      }
    }
  } else {
    // create files or dirs
    if (line.includes("dir")) {
      const dirName = line.split(" ")[1];
      const newDir = new Dir(dirName, curr);
      curr.addSubDir(newDir);
    } else {
      const [fileSize, fileName] = line.split(" ");
      const newFile = new File(fileName, parseInt(fileSize));
      curr.addFile(newFile);
    }
  }
}

console.log(fileSystem.toString());


