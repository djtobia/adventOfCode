"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filereader_1 = require("./helpers/filereader");
const input = filereader_1.readInput('./input/day1.txt').map((e) => parseInt(e));
let output = 0;
console.log('part 1');
for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) {
        output++;
    }
}
console.log(output);
console.log('part 2');
output = 0;
let test = input[0] + input[1] + input[2];
for (let i = 3; i < input.length; i++) {
    let comp = test - input[i - 3] + input[i];
    if (comp > test) {
        output++;
    }
}
console.log(output);
