class Dir {
  dirName: string;
  files: File[] = [];
  subDirs: Dir[] = [];
  previousDir: Dir | null;
  size: number = 0;
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

  setSize () {
    const fileSizes = this.getFileSizes();
    const dirSizes = this.getDirSizes(this,0);
    this.size = fileSizes + dirSizes;
    return this.size;
  }

  getFileSizes () {
    return this.files.map(file => file.getSize()).reduce((a,b)=> a+b, 0);
  }
  getDirSizes (dir: Dir, size: number) {
    if (dir.subDirs.length === 0) {
      return size;
    }

    for(let i = 0; i < dir.subDirs.length; i++) {
      size += dir.subDirs[i].calculateSize();
    }

    return size;
  }

  calculateSize () {
    return this.setSize();
  }
  toString () : string {
    let stringValue = `Directory: ${this.dirName}\n - Size: ${this.size} \n`;
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

  getSize () : number { return this.size; }
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