class Dir {
  dirName: string;
  files: File[] = [];
  subDirs: Dir[] = [];
  previousDir: Dir | null;
  constructor (dirName: string, previous: Dir | null) {
    this.dirName = dirName;
    this.previousDir = previous;
  }

  addSubDir (newDir: Dir) {
    this.subDirs.push(newDir);
  }

  addFile (file: File) {
    this.files.push(file);
  }

  findDir (name: string): Dir {
    const dirToReturn = this.subDirs.find(dir => dir.dirName === name);
    if (dirToReturn) {
      return dirToReturn;
    } else {
      return new Dir("", null);
    }
  }

  toString () : string {
    let stringValue = `Directory: ${this.dirName}\n`
    stringValue += ` - Parent Directory: ${this.previousDir?.dirName}\n -- Files \n ---`
    this.files.forEach(file => {
      stringValue += file.toString();
    })
    stringValue += "\n ";
    this.subDirs.forEach(subDir => {
      stringValue += subDir.toString();
    })
    return stringValue;
  }
}

class File {
  fileName: string;
  size: number;

  constructor (fileName: string, size: number) {
    this.fileName = fileName;
    this.size = size;
  }

  toString () : string {
    return ` File: ${this.fileName}, size: ${this.size}`;
  }
}

class FileSystem {
  head: Dir;

  constructor (head: Dir) {
    this.head = head;
  }

  toString() : string {
    return this.head.toString();
  }

}

export { FileSystem, Dir, File };