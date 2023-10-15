const NUMBER_OF_DICE     = 2;
const diceContainer     = document.querySelector(".dice-container");
const btnRollDice       = document.querySelector(".btn-roll-dice");

const diceRollsResults    = [];
const roundResultsTable = document.querySelector("#results__container table tbody");

const maxDiceRolls = 11;
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


function AppendRoundResult(){
    let roundNumber = (diceRollsResults.length/2);
    let computerDiceRoll = diceRollsResults[diceRollsResults.length - 1];
    let playerDiceRoll = diceRollsResults[diceRollsResults.length - 2];
    let result = playerDiceRoll > computerDiceRoll ? "Vitória!" : (playerDiceRoll < computerDiceRoll ? "Derrota!" : "Empate!");
    let points = playerDiceRoll > computerDiceRoll ? 10 : (playerDiceRoll < computerDiceRoll ? 1 : 5);
    
    const tableRow = document.createElement("tr");
    const fragment = document.createDocumentFragment();
    const contents = [roundNumber, playerDiceRoll, computerDiceRoll, result, points];    
    contents.forEach((content) =>{
        const td = document.createElement("td")
        td.textContent = content;
        fragment.appendChild(td);
    });
    
    tableRow.appendChild(fragment);
    roundResultsTable.appendChild(tableRow);    
}

function createDice(number) {
    const dotPositionMatrix = {
        1: [
            [50, 50]
        ],
        2: [
            [20, 20],
            [80, 80]
        ],
        3: [
            [20, 20],
            [50, 50],
            [80, 80]
        ],
        4: [
            [20, 20],
            [20, 80],
            [80, 20],
            [80, 80]
        ],
        5: [
            [20, 20],
            [20, 80],
            [50, 50],
            [80, 20],
            [80, 80]
        ],
        6: [
            [20, 20],
            [20, 80],
            [50, 20],
            [50, 80],
            [80, 20],
            [80, 80]
        ]
    };

    const dice = document.createElement("div");

    dice.classList.add("dice");

    for (const dotPosition of dotPositionMatrix[number]) {
        const dot = document.createElement("div");

        dot.classList.add("dice-dot");
        dot.style.setProperty("--top", dotPosition[0] + "%");
        dot.style.setProperty("--left", dotPosition[1] + "%");
        dice.appendChild(dot);
    }

    return dice;
}

function randomizeDice(diceContainer, numberOfDice) {
    diceContainer.innerHTML = "";
    for (let i = 0; i < numberOfDice; i++) {
        const random = Math.floor((Math.random() * 6) + 1);
        const dice = createDice(random);
        diceContainer.appendChild(dice);
    }
}

randomizeDice(diceContainer, NUMBER_OF_DICE);

function GetDiceRollValue(){
    for (let i = 0; i < NUMBER_OF_DICE; i++) {
        diceRollsResults.push(diceContainer.children[i].childElementCount);
    }
}

function CalculatePlayerPoints() {
    let intResults = diceRollsResults.map(e => parseInt(e));
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

btnRollDice.addEventListener("click", () => {
    if(roundResultsTable.childElementCount < maxDiceRolls){
        const interval = setInterval(() => {
            randomizeDice(diceContainer, NUMBER_OF_DICE);
        }, 50);

        setTimeout(() => clearInterval(interval), 1000);
        setTimeout(() => {GetDiceRollValue()}, 1100)
        setTimeout(()=>{AppendRoundResult()} ,1200)
    }
    else
    {
        //Change Button Image
        ClassifyPlayer();
    }
});


