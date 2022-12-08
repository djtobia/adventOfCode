import { readInput } from "./helpers/filereader";
import { FileSystem, Dir, File } from "./helpers/FileSystem";
const input = readInput("./input/day7.txt");

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
// this will figure out the sizes of all directories
fileSystem.head.calculateSize();
// find all dirs with size < 100000
const findAllUnderOneHundredK = (dir: Dir, size: number): number => {
  if(dir.size <= 100000) {
    size += dir.size;
  }
  for(let i = 0; i < dir.subDirs.length; i++) {
    size += findAllUnderOneHundredK(dir.subDirs[i], 0);
  }
  return size;
}

curr = fileSystem.head;
console.log("Part 1", findAllUnderOneHundredK(curr, 0));
curr = fileSystem.head;
const spaceNeeded = 30000000- (70000000 - curr.size);

const availableDirSizes: number[] = [];
// find all dir that are >= spaceNeeded
const findAllDirSizesNeeded =(dir: Dir) => {
  if (dir.size >= spaceNeeded) {
    availableDirSizes.push(dir.size);
  }

  for (let i = 0; i < dir.subDirs.length; i++) {
    findAllDirSizesNeeded(dir.subDirs[i]);
  }
}

findAllDirSizesNeeded(curr);
console.log("Part 2", availableDirSizes.sort((a,b) => a-b)[0]);





