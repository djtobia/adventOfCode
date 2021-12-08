import { readInput } from "./helpers/filereader";

const input = readInput('./input/day6.txt')[0].split(',').map(x => parseInt(x));
let totalDays = 18;
let totalLength = 0;
for(let i = 0; i < input.length; i++){
    totalLength += getDemFish([input[i]], totalDays);
}
console.log('part 1');
console.log(totalLength);
console.log('part 2');

const fishArray: {[key: string]: number} = {
    '0':0,'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0
};
input.forEach((fish: number) => {
    fishArray[fish.toString()]++;
})
totalDays = 256;
console.log(findTotalLengths(fishArray, totalDays));
function getDemFish(fish: number[], days: number):number {
    for(let i = 1; i <= days; i++){
        let fishToAdd = 0;
        for(let j = 0; j < fish.length; j++){
            fish[j]--;
            if(fish[j] < 0){
                fish[j] = 6;
                fishToAdd++;
            }
        }
        for(let j = 0; j < fishToAdd; j++){
            fish.push(8);
        }
    }
    const total = fish.length;
    return total;
}

function findTotalLengths(fish: {[key: string]: number}, days: number) : number{
    const copy = {...fish};
    for(let i = 0; i < days; i++){
        grow(copy);
    }
    return Object.values(copy).reduce((acc,curr) => acc + curr);
}

function grow(fish: {[key: string]: number}){
    const tempZero = fish[0];
    for(let i = 0; i < 8; i++){
        fish[i] = fish[i+1];
    }
    fish[8] = tempZero;
    fish[6] += tempZero;
}