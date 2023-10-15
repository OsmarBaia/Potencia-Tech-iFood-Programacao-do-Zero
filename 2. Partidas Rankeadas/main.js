const maxDiceRolls = 22; // Must be a multiple of 2
const rollsResults = [];
const pointsAmount ={
    victory: 10, drawn: 5, loses: 1
}
const roundsResults = {
    victories: 0, drawn: 0, loses:0
}

const rankings = [
    ["Ferro",10],
    ["Bronze",20],
    ["Prata",50],
    ["Ouro",80],
    ["Diamante", 90],
    ["Lendário", 100],
    ["Imortal", 101]
]

function CalculatePlayerPoints() {
    let intResults = rollsResults.map(e => parseInt(e));
    for (let i = 0; i < intResults.length; i += 2) {
        console.log(`${(i/2)+1} Rodada - Player ${intResults[i]} x ${intResults[i+1]} Computador`);

        if (intResults[i] > intResults[i + 1]) {
            roundsResults.victories += 1;
        } else if (intResults[i] === intResults[i + 1]) {
            roundsResults.drawn += 1;
        } else {
            roundsResults.loses += 1;
        }
    }
    return roundsResults.victories * pointsAmount.victory + roundsResults.drawn * pointsAmount.drawn + roundsResults.loses * pointsAmount.loses;
}

function ClassifyPlayer(){
    let playerPoints = CalculatePlayerPoints();
    for (let i = 0; i < rankings.length; i++) {
        if(playerPoints <= rankings[i][1]){
            console.log(`"O Herói tem saldo de ${playerPoints} pontos e está no nível de ${rankings[i][0]}`)
            break;
        }
        if(i === (rankings.length -1) && playerPoints >=  rankings[i][1]){
            console.log(`"O Herói tem saldo de ${playerPoints} pontos e está no nível de ${rankings[i][0]}`)
        }
    }
}

function RollDice(){
    return Math.floor((Math.random() * 6) + 1);
}

for (let i = 0; i < maxDiceRolls; i++) {
    let num1 = RollDice();
    let num2 = RollDice();
    rollsResults.push(num1);
    rollsResults.push(num2);
    
    let newLine = `<tr>
        <td>${i+1}</td>
        <td>${num1}</td>
        <td>${num2}</td>
    </tr>`
    
    console.log(newLine);
}

ClassifyPlayer();

//WEB
//
// //Base code: Roll Dice! by Lena Stanley. Available at: https://codepen.io/lenasta92579651/pen/yLeVmdW
// const elDiceOne = document.getElementById('dice1');
// const elDiceTwo = document.getElementById('dice2');
// const elComeOut     = document.querySelector("#roll button");
//
// elComeOut.onclick   = function () {rollDices();};
//
// function ToggleRollButton(){
//     elComeOut.disabled = elComeOut.disabled === false;
// }
//
// function rollDice(dice){
//     let rolledNumber = Math.floor((Math.random() * 6) + 1);
//     for (let i = 1; i <= 6; i++) {
//         dice.classList.remove('show-' + i);
//         if (rolledNumber === i) {
//             dice.classList.add('show-' + i);
//         }
//     }
//     rollsResults.push(rolledNumber);
//     //setTimeout(rollDice,1000)
// }
// function rollDices(){
//     setTimeout(ToggleRollButton, 3000);
//     ToggleRollButton();
//
//     setTimeout(rollDice, 1500, elDiceOne);
//     rollDice(elDiceTwo);
// }
//
