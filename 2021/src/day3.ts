import { readInput } from "./helpers/filereader";
const input = readInput('./input/day3.txt');

const bitMap = new Array();
for(let i = 0; i < 12; i++){
    bitMap.push({'0':0,'1':0});
}
input.forEach(bits => {
    for(let i = 0; i < 12; i++){
        if(bits[i] === '0'){
            bitMap[i]['0']++;
        } else {
            bitMap[i]['1']++;
        }
    }
})

let gamma = '';
let epsilon = '';
bitMap.forEach(bit => {
    if(bit[0] > bit[1]){
        gamma = `${gamma}0`;
        epsilon = `${epsilon}1`;
    } else {
        gamma = `${gamma}1`;
        epsilon = `${epsilon}0`;
    }
})
const gammaAsDecimal = parseInt(gamma,2);
const epsilonAsDecimal = parseInt(epsilon, 2);
console.log('part 1');
console.log(gammaAsDecimal*epsilonAsDecimal);

/** Part 2 */
let oxy: Array<string> = [];
let co2: Array<string> = [];
input.forEach(num => {
    if(num[0] === '0'){
        if(bitMap[0][0] > bitMap[0][1]){
            oxy.push(num);
        }
        else {
            co2.push(num);
        }
    } else {
        if(bitMap[0][1] > bitMap[0][0]){
            oxy.push(num);
        }
        else {
            co2.push(num);
        }
    }
});
for(let i = 1; i < 12; i++){
    [oxy, co2] = filterEntries(oxy, co2, i);
}
const oxyAsDecimal = parseInt(oxy[0],2);
const co2AsDecimal = parseInt(co2[0],2);
console.log('part 2');
console.log(oxyAsDecimal * co2AsDecimal);

function filterEntries(mostCommon: Array<string>, leastCommon: Array<string>, index: number) : string[][]{
    let mostCommonCount = findMostCommon(mostCommon, index);

    let leastCommonCount = findMostCommon(leastCommon, index);
    const mostCommonFilter = mostCommonCount >= 0 ? '1' : '0';
    const leastCommonFilter = leastCommonCount >= 0 ? '0':'1';
    const result = [
        mostCommon.length > 1 ? mostCommon.filter(num => num[index] === mostCommonFilter) : mostCommon,
        leastCommon.length > 1 ? leastCommon.filter(num => num[index] === leastCommonFilter) : leastCommon
    ]
    return result;
}

function findMostCommon (mostCommon: string[], index: number) : number {
    let count = 0;
    for(let i = 0; i < mostCommon.length;i++) {
        if(mostCommon[i][index] === '0'){
            count--;
        } else {
            count++;
        }
    }
    return count;
}