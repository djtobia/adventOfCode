import { readInput } from "./helpers/fileReader.js";

const input = readInput("./input/day14.txt");

let mask = "";
let map = new Map();
//if input includes 'mask', set mask = input.split(' = ')[1];
//else, convert mem[location] = num to binary, and store in map(location)
input.forEach((entry) => {
  if (entry.includes("mask")) {
    mask = entry.split(" = ")[1];
  } else {
    let location = entry.split(" = ")[0].match(/\d+/g)[0];
    let binaryDigit = parseInt(entry.split(" = ")[1])
      .toString(2)
      .padStart(36, "0");
    map.set(location.toString(), maskDigit(mask, binaryDigit));
  }
});

let val = 0;
map.forEach((value) => {
  if (value !== 0) {
    val += value;
  }
});

console.log("Part 1:", val);
map = new Map();
input.forEach((entry) => {
  if (entry.includes("mask")) {
    mask = entry.split(" = ")[1];
  } else {
    const locations = maskAddress(
      mask,
      parseInt(entry.split(" = ")[0].match(/\d+/g)[0])
        .toString(2)
        .padStart(36, "0")
    );
    const val = parseInt(entry.split(" = ")[1]);
    locations.forEach((memAddress) => {
      map.set(memAddress, val);
    });
  }
});

val = 0;
map.forEach((value) => {
  if (value !== 0) {
    val += value;
  }
});
console.log("Part 2:", val);
function maskDigit(mask, digit) {
  let maskedDigit = digit.split("");
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] !== "X") {
      maskedDigit[i] = mask[i];
    }
  }
  return parseInt(maskedDigit.join(""), 2);
}

function maskAddress(mask, originalAddress) {
  //first change anddress to floating version
  let floatingAddress = originalAddress.split("");
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === "0") {
      continue;
    } else {
      floatingAddress[i] = mask[i];
    }
  }

  return buildAddress(floatingAddress);
}
function buildAddress(address) {
  const count = address.reduce((total, current) => {
    return current === "X" ? total + 1 : total;
  }, 0);
  const result = [];
  for (let i = 0; i < Math.pow(2, count); i++) {
    const f = i.toString(2).padStart(count, "0");
    let ri = 0;
    const ba = address.join("").replace(/X/g, () => f.charAt(ri++));
    const a = parseInt(ba, 2);
    result.push(a);
  }
  return result;
}
