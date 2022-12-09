class Tree {
  isVisible: boolean = false;
  scenicScore: number = 0;
  height: number;
  left: number = 0;
  right: number = 0;
  up: number = 0;
  down: number = 0;
  constructor (height: number) {
    this.height = height;
  }

  setIsVisible() {
    this.isVisible = true;
  }

  setLeft (num: number) {
    if (num === 0) {
      this.left = 1;
      return
    }
    this.left = num;
  }

  setRight (num: number) {
    if (num === 0) {
      this.right = 1;
      return
    }
    this.right = num;
  }

  setUp (num: number) {
    if (num === 0) {
      this.up = 1;
      return
    }
    this.up = num;
  }

  setDown (num: number) {
    if (num === 0) {
      this.down = 1;
      return
    }
    this.down = num;
  }

  setScenicScore () {
    // dont multiply with 0s
    this.scenicScore = this.up * this.down * this.left * this.right;
  }
}

function checkIsVisible (tree: Tree, trees: Tree[][], x: number, y: number): number {
  let isVisible = false;
  const height = tree.height;

  // go left until you hit the last tree, or a equal height or greater tree
  let count = 1;
  for(let i = y-1; i>=0; i--) {
    const compareTree = trees[x][i].height;
    if (compareTree >= height) {
      tree.setLeft(count);
      break;
    }
    if (i === 0 && compareTree < height) {
      tree.setIsVisible();
      isVisible = true;
    }
    count++;
  }

  if (tree.left === 0) {
    tree.setLeft(count-1);
  }

  count = 1;
  // do the same to the right
  for (let i = y+1; i < trees[x].length; i++){
    const compareTree = trees[x][i].height;
    if(compareTree >= height) {
      tree.setRight(count);
      break;
    }

    if(i === trees[x].length-1 && compareTree < height) {
      tree.setIsVisible();
      isVisible = true;
    }
    count++;
  }
  if (tree.right === 0) {
    tree.setRight(count-1);
  }

  // now up
  count = 1;
  for (let i = x-1; i >= 0; i--) {
    const compareTree = trees[i][y].height;
    if(compareTree >= height) {
      tree.setUp(count);
      break;
    }

    if (i === 0 && compareTree < height) {
      tree.setIsVisible();
      isVisible = true;
    }
    count++;
  }

  if (tree.up === 0) {
    tree.setUp(count-1);
  }

  count = 1;
  //now down
  for (let i = x + 1; i < trees.length; i++) {
    const compareTree = trees[i][y].height;
    if(compareTree >= height) {
      tree.setDown(count);
      break;
    }

    if (i === trees.length-1 && compareTree < height) {
      tree.setIsVisible();
      isVisible = true;
    }
    count++;
  }
  if (tree.down === 0) {
    tree.setDown(count-1);
  }

  tree.setScenicScore();
  return isVisible ? 1 : 0;
}

export { Tree, checkIsVisible };