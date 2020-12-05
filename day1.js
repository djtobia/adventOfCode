const fs = require('fs');

const expense = fs.readFileSync('./input/day1.txt', 'utf8').split('\r\n');
//find which 2 items add up to 2020

for(let i = 0; i< expense.length; i++){
    for(let j = i+1; j < expense.length; j++){
        for(let k = j+1; k < expense.length; k++){


        if(parseInt(expense[i]) + parseInt(expense[j]) + parseInt(expense[k])=== 2020){
            console.log(parseInt(expense[i]) * parseInt(expense[j]) * parseInt(expense[k]));
        }
    }
    }
}