//bag class
class Bag {
  constructor(bagType, bags = null) {
    this.bagType = bagType;
    this.innerBags = bags;
  }
}
// inner bag class
class InnerBag {
  constructor(num, name) {
    this.num = num;
    this.name = name;
  }
}

//parse function for parsing out inner bags
function parseInnerBag(bagString) {
  //first char is num
  const num = parseInt(bagString.charAt(0));
  if (bagString.includes(".")) {
    bagString = bagString.slice(1, bagString.length - 5).trim();
  } else {
    bagString = bagString.slice(1, bagString.length - 4).trim();
  }
  return new InnerBag(num, bagString);
  //split on bag, grab index 0
}

// TODO: iterate over map.
// TODO: for each entry in map, do the following:
//1: TODO: if bag can already hold a shiny gold bag, increment count
//2: TODO: if bag cannot hold one itself, for each of its inner bags, retrieve its mapped entry, and check if that inner bag can hold a shiny bag
//3: TODO: recurse if needed.
// ONCE SHINY GOLD FOUND go back to base case and increment count, then step to next item in maploop

const fs = require("fs");

const input = fs.readFileSync("./input/day7.txt", "utf8").split("\r\n");

//make bagMap from rules
const bagMap = new Map();
input.forEach((rule) => {
  if (rule.includes("no other")) {
    bags = rule.split("bags");
    const outerBag = new Bag(bags[0].trim());
    bagMap.set(outerBag, new Bag(outerBag));
  } else {
    bags = rule.split(",");
    const outerBagName = bags[0].split("bags")[0].trim();
    let innerBags = [];
    //parse out first inner bag from first string, loop will do the others
    innerBags.push(parseInnerBag(bags[0].split("contain")[1].trim()));
    for (let j = 1; j < bags.length; j++) {
      innerBags.push(parseInnerBag(bags[j].trim()));
    }
    bagMap.set(outerBagName, new Bag(outerBagName, innerBags));
  }
});

console.log(bagMap.size);
