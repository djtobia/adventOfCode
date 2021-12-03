"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filereader_1 = require("./helpers/filereader");
const input = filereader_1.readInput('./input/day2.txt');
let depth = 0;
let horiz = 0;
input.forEach(command => {
    if (command[0] === 'd') {
        depth += parseInt(command.split(' ')[1]);
    }
    else if (command[0] === 'u') {
        depth -= parseInt(command.split(' ')[1]);
    }
    else {
        horiz += parseInt(command.split(' ')[1]);
    }
});
console.log('part 1');
console.log(depth * horiz);
let aim = 0;
depth = 0;
input.forEach(command => {
    if (command[0] === 'd') {
        aim += parseInt(command.split(' ')[1]);
    }
    else if (command[0] === 'u') {
        aim -= parseInt(command.split(' ')[1]);
    }
    else {
        depth += parseInt(command.split(' ')[1]) * aim;
    }
});
console.log('aim', aim);
console.log('depth', depth);
console.log('horiz', horiz);
console.log(horiz * depth);
