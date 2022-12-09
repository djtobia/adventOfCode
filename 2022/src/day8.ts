import createTwoDArray from "./helpers/TwoDArrayBuilder";
import { Tree, checkIsVisible } from "./helpers/Tree";
const trees: Tree[][] = createTwoDArray("day8").map(trees => trees.map(tree => new Tree(tree)));


// set visible to the amount of outer trees there are.
let visible = (trees.length * 2) + ((trees[0].length-2)*2);

for (let x = 1; x < trees.length-1; x++) {
  for(let y = 1; y < trees[y].length-1; y++ ) {
   visible += checkIsVisible(trees[x][y],trees, x,y);
  }
}

console.log("Part 1", visible);

//convert into single line of trees
const oneLineTrees: Tree[] = [];
for (let x = 1; x < trees.length-1; x++) {
  for(let y = 1; y < trees[x].length-1; y++ ) {
   oneLineTrees.push(trees[x][y]);
  }
}
// sort by scenic score, and done
console.log("Part 2", oneLineTrees.sort((a, b) => b.scenicScore - a.scenicScore)[0].scenicScore);

