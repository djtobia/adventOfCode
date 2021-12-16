import { numbersDict } from "./helpers/day8Helpers"
import { readInput } from "./helpers/filereader";
const input = readInput('./input/day8.txt');

let count = 0;
input.forEach(line => {
   const digits = line.split(' | ')[1].split(' ');
   digits.forEach(digit => {
       if(digit.length === 2 || digit.length === 3 || digit.length === 4 || digit.length === 7){
            count++;
       }
   })
})

console.log('part 1', count);

// part 2, use dictionary to see how many each number needs
const segmentsAsNumbers: number[] = [];
input.forEach(line => {
    let [segments, digits] = line.split(' | ');
    const individualDigits = digits.split(' ').map(digit => digit.split('').sort().join(''));
    const allSegments = segments.split(' ').sort((a:string,b:string) => a.length - b.length);
    //one is [0], 7 is [1], 4 is [2], 8 is [9]
    const knownNumbers = {
        '1': allSegments[0].split('').sort(),
        '4': allSegments[2].split('').sort(),
        '7': allSegments[1].split('').sort(),
        '8': allSegments[9].split('').sort()
    }

    const numberCounts : { [key: string] : {[key:string]: number | undefined}} = {};
    for(let i = 3; i < 9; i++){
        const number = allSegments[i].split('').sort().join('');
        numberCounts[number] = {};
        for(const [key, value] of Object.entries(knownNumbers)){
            let count = 0;
            value.forEach(char => {
                if(number.indexOf(char) !== -1){
                    count++;
                }
            })
            numberCounts[number][key] = count;
        }
    }
    const digitsMap : {[key: string]: string} = {};
    for(const [key, digitMap] of Object.entries(numbersDict)){
        for(const [numberKey, valueMap] of Object.entries(numberCounts)){
            if(JSON.stringify(digitMap) === JSON.stringify(valueMap)){
                digitsMap[numberKey] = key;
            }
        }
    }
    for(const [digit, string] of Object.entries(knownNumbers)){
        digitsMap[string.join('')] = digit;
    }
    let digitString = '';
    individualDigits.forEach(digit => {
        digitString += digitsMap[digit];
    })
    segmentsAsNumbers.push(parseInt(digitString));
});

console.log('part 2', segmentsAsNumbers.reduce((acc,num) => acc + num, 0));