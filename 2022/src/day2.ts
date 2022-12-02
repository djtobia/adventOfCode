import { readInput } from "./helpers/filereader";

const input = readInput("./input/day2.txt");

let totalScore = 0;
const convertTheirs = (theirs: string) => {
  switch(theirs) {
    case 'A':
      return 'X';
    case 'B':
      return 'Y';
    default:
      return 'Z';
  }
}

input.forEach(line => {
  let [theirs, mine] = line.split(' ');
  switch(mine) {
    case 'X':
      totalScore += 1;
      break;
    case 'Y':
      totalScore += 2;
      break;
    default:
      totalScore += 3;
  }
  theirs = convertTheirs(theirs)

  if (theirs === mine) {
    totalScore += 3;
  } else if ((mine === 'X' && theirs === 'Z') || (mine === 'Y' && theirs === 'X') || (mine === 'Z' && theirs === 'Y') ) {
    totalScore += 6;
  }
});

console.log("Part 1", totalScore);
totalScore = 0;


interface Entry {
  points: number;
  opp: string;
  beats: string;
}

interface Lookup {
  [index: string] : Entry;
  A: {
    points: number;
    opp: string;
    beats: string;
  },
  B: {
    points: number;
    opp: string;
    beats: string;
  },
  C: {
    points: number;
    opp: string;
    beats: string;
  }

}
const lookup: Lookup = {
  A:
  {
    points: 1,
    opp: 'B',
    beats: 'C'
  },
  B: {
    points: 2,
    opp: 'C',
    beats: 'A'
   },
  C: {
      points: 3,
      opp: 'A',
      beats: 'B',
    }
  };
input.forEach(line => {
  const [their, mine] = line.split(' ');

  switch (mine) {
    case 'X':
      totalScore += lookup[lookup[their].beats].points;
      break;
    case 'Y':
      totalScore += 3 + lookup[their].points;
      break;
    default:
      totalScore += 6 + lookup[lookup[their].opp].points
  }
})

console.log("Part 2", totalScore);