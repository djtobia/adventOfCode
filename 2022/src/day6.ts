import { readInput } from "./helpers/filereader";

const input = readInput('./input/day6.txt').join('');

const allUnique = (chars: string[], length: number): boolean => {
  let unique = true;
  for (let i = 0; i < length; i++) {
    for (let j = i+1; j<length; j++) {
      if (chars[i] === chars[j]) {
        unique = false;
      }
    }
  }
  return unique;
}

const packetMarker = [];
const messageMarker = [];
let lastPacketIndex = 0;
let lastMarkerIndex = 0;
for(let i = 0; i < input.length; i++) {

  if (i < 4) {
    packetMarker.push(input[i]);
  }

  if (i < 14) {
    messageMarker.push(input[i]);
  }

  if (lastPacketIndex === 0 && packetMarker.length === 4 && allUnique(packetMarker, 4)) {
    lastPacketIndex = i;
  } else {
    packetMarker.shift();
    packetMarker.push(input[i]);
  }

  if (lastMarkerIndex === 0 && messageMarker.length === 14 && allUnique(messageMarker, 14)) {
    lastMarkerIndex = i;
  } else {
    messageMarker.shift();
    messageMarker.push(input[i]);
  }

  if (lastPacketIndex !== 0 && lastMarkerIndex !== 0) {
    break;
  }
}

console.log("Part 1", lastPacketIndex);
console.log("Part 2", lastMarkerIndex);
