import { readInput } from "./helpers/fileReader.js";

const input = readInput("./input/day10.txt")
  .map((val) => {
    return parseInt(val);
  })
  .sort((a, b) => {
    return a - b;
  });

let oneDiffs = 0;
//built in adaptor is largest + 3, so there already is one 3-diff
let threeDiffs = 1;
let prev = 0;
for (let i = 0; i < input.length; i++) {
  const num = input[i];
  if (num - prev === 1) {
    oneDiffs++;
  } else if (num - prev === 3) {
    threeDiffs++;
  }
  prev = num;
}

console.log("Part 1 :", oneDiffs * threeDiffs);
input.unshift(0);

input.push(input[input.length - 1] + 3);
//build graph
class Node {
  value = "";
  children = [];
  visited = false;

  constructor(val) {
    this.value = val;
  }

  addChild(childIndex) {
    this.children.push(childIndex);
  }
  getChildren() {
    return this.children;
  }
  toString() {
    return this.val;
  }
  getValue() {
    return this.value;
  }
  setVisited(value) {
    this.visited = value;
  }
  isVisited() {
    return this.visited;
  }
}

//loop over items in input to build graph
let list = [];
for (let i = 0; i < input.length; i++) {
  //create array of node objects
  list.push(new Node(input[i]));
}
//now iterate over list, adding child pointers
for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j < i + 4 && j < input.length; j++) {
    if (list[j].getValue() < list[i].getValue() + 4) {
      list[i].addChild(j);
    }
  }
}

let pathCount = 0;
function DFS(list, index) {
  const path = [];
  path.push(index);
  while (path.length) {
    let index = path.pop();
    if (!list[index].isVisited()) {
      list[index].setVisited(true);
    }
    if (list[index].getValue() === list[list.length - 1].getValue()) {
      pathCount++;
    } else {
      for (let i = 0; i < list[index].getChildren().length; i++) {
        if (!list[list[index].getChildren()[i]].isVisited()) {
          path.push(list[index].getChildren()[i]);
        }
      }
    }

    // path.pop();
    list[index].setVisited(false);
  }
}
DFS(list, 0);
console.log("Part 2:", pathCount);
console.log("Should be:", 56693912375296);
let pow7 = 0;
let pow2 = 0;
for (let i = 1; i < input.length - 1; i++) {
  let numberThreeBehind = i >= 3 ? input[i - 3] : -1000;
  if (input[i + 1] - numberThreeBehind === 4) {
    pow7++;
    pow2 -= 2;
  } else if (input[i + 1] - input[i - 1] === 2) {
    pow2++;
  }
}

console.log("Part 2:", Math.pow(2, pow2) * Math.pow(7, pow7));
