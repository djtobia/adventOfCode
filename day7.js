//bag class
class Bag {
  constructor(bagType, bags = []) {
    this.bagType = bagType;
    this.innerBags = bags;
  }

  getInner(index) {
    return this.innerBags[index];
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
/**
 *
 * @param {string} bagString
 */
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

/**
 *
 * @param {string} bagName
 * @param {Map} bagMap
 */
function checkForShinyGoldBag(bagName, bagMap) {
  let bag = bagMap.get(bagName);
  for (let i = 0; i < bag.innerBags.length; i++) {
    let innerBag = bag.getInner(i);
    if (innerBag.name === "shiny gold") {
      return 1;
    } else {
      if (checkForShinyGoldBag(innerBag.name, bagMap)) {
        return 1;
      }
    }
  }
  return 0;
}

/**
 *
 * @param {string} bagName
 * @param {Map} bagMap
 */
function insideBagCount(bagName, bagMap) {
  let bag = bagMap.get(bagName);
  if (bag.innerBags.length === 0) {
    return 0;
  }
  let count = 0;
  for (let i = 0; i < bag.innerBags.length; i++) {
    const num = bag.innerBags[i].num;
    count += num + num * insideBagCount(bag.innerBags[i].name, bagMap);
  }
  return count;
}

const fs = require("fs");

const input = fs.readFileSync("./input/day7.txt", "utf8").split("\r\n");

//make bagMap from rules
const bagMap = new Map();
input.forEach((rule) => {
  if (rule.includes("no other")) {
    bags = rule.split("bags");
    const outerBag = new Bag(bags[0].trim());
    bagMap.set(bags[0].trim(), outerBag);
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
let count = 0;
for (let key of bagMap.keys()) {
  count += checkForShinyGoldBag(key, bagMap);
}
console.log("Part 1 :", count);
console.log("Part 2 :", insideBagCount("shiny gold", bagMap));
// console.log(checkForShinyGoldBag(bagMap.keys().next().value, bagMap, 0));
