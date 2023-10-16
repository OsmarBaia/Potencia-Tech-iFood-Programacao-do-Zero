const diceContainer     = document.querySelector(".dice-container");
const rankContainer     = document.querySelector("#container-rank");
const btnRollDice       = document.querySelector(".btn-roll-dice");


const NUMBER_OF_DICE     = 2;
const diceRollsResults    = [];
const roundResultsTable = document.querySelector("#results__container table tbody");

const maxDiceRolls = 11;
const pointsAmount ={
    victory: 10, drawn: 5, loses: 1
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

function Start(){
    rankContainer.style.display = "none";
}

function GetLastRoll(wantedChar){
    if(diceRollsResults.length >= 2 && diceRollsResults.length % 2 === 0){        
        if (wantedChar === "hero"){
            return diceRollsResults[diceRollsResults.length - 2];
        }                       
        
        if(wantedChar === "enemy"){
            return diceRollsResults[diceRollsResults.length - 1];
        }
    }
}

function GetRoundInfo(infoType){
    let heroDiceRoll = GetLastRoll("hero");
    let enemyDiceRoll = GetLastRoll("enemy");
    
    if(infoType === "result"){
       return heroDiceRoll > enemyDiceRoll ? "Vitória!" : (heroDiceRoll < enemyDiceRoll ? "Derrota!" : "Empate!");
    }
    
    if(infoType === "points"){
        return heroDiceRoll > enemyDiceRoll ? 10 : (heroDiceRoll < enemyDiceRoll ? 1 : 5);

    }
}

function GetCurrentRound(){
    return  (diceRollsResults.length/2);
}

function AppendRoundResult(){
    let heroDiceRoll = GetLastRoll("hero");
    let enemyDiceRoll = GetLastRoll("enemy");
    let roundNumber = GetCurrentRound();
    let roundResult = GetRoundInfo("result");
    let roundPoints =  GetRoundInfo("points");
    
    const tableRow = document.createElement("tr");
    const fragment = document.createDocumentFragment();
    const contents = [roundNumber, heroDiceRoll, enemyDiceRoll, roundResult, roundPoints];    
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
    let roundsResults = {
        victories: 0, drawn: 0, loses:0
    }    
    
    for (let i = 0; i < intResults.length; i += 2) {
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
    let rankTextValue = "";    
    for (let i = 0; i < rankings.length; i++) {
        if(playerPoints <= rankings[i][1]){
            rankTextValue = `O Herói tem saldo de <strong>${playerPoints}</strong> pontos e está no nível de <strong>${rankings[i][0]}<strong>`;
            break;
        }
        if(i === (rankings.length -1) && playerPoints >=  rankings[i][1]){
            rankTextValue = `"O Herói tem saldo de <strong>${playerPoints}</strong> pontos e está no nível de <strong>${rankings[i][0]}</strong>`;
        }
    }
    let textElement = document.createElement("p");    
    textElement.innerHTML = rankTextValue;    
    rankContainer.insertBefore(textElement, rankContainer.firstElementChild.nextSibling);
    rankContainer.style.display="";
}

function ToggleRollButton(){
    btnRollDice.disabled = btnRollDice.disabled===false;
}

btnRollDice.addEventListener("click", () => {
    ToggleRollButton();
    setTimeout(()=>{ToggleRollButton()} ,1400);

    if(roundResultsTable.childElementCount < maxDiceRolls){
        let interval = setInterval(() => {
            randomizeDice(diceContainer, NUMBER_OF_DICE);
        }, 50);

        setTimeout(() => clearInterval(interval), 1000);        
        setTimeout(() => {GetDiceRollValue()}, 1100);
        setTimeout(()=> {AppendRoundResult()} ,1200);
        setTimeout( ()=>{
            if(roundResultsTable.childElementCount >= maxDiceRolls){
                btnRollDice.innerText = "Rank!"
            }
        },1300);
    }
    else
    {
        ClassifyPlayer();
    }
});