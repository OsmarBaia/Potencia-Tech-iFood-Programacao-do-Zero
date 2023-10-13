const heroInfoCard_name = document.querySelector("#infoCard-heroName");
const heroInfoCard = document.querySelector("#hero-infoCard");
const heroNamingCard = document.querySelector("#hero-namingCard");
const heroInfoCard_expAmount = document.querySelector("#exp-amount");
const heroRankCard = document.querySelector("#hero-ranking");


const maxExp = 10001;
const expIncreaseFactor = 500;
function Start(){
    //Reset
    if (heroNamingCard.style.display !== "flex"){
        heroNamingCard.style.display = "flex";
    }   
    heroInfoCard.style.display = "none";
    heroRankCard.style.display="none";
}

function OpenHeroCard(){    
    const heroNaming_input = document.querySelector("#namingCard_input");
    heroInfoCard_name.innerText = heroNaming_input.value === "" ? "Thor" : heroNaming_input.value;
    heroInfoCard_expAmount.innerText = 0;
    
    heroInfoCard.style.display ="flex";
    heroNamingCard.style.display="none";
}

function CloseRanking(){
    if (heroRankCard.style.display !== "none"){
        heroRankCard.style.display = "none";
    }
    if(heroInfoCard.style.display === "none"){
        heroInfoCard.style.display = "flex";
    }
}

function AddExp(){
    let oldExpAmount = parseInt(heroInfoCard_expAmount.innerText);
    let newExpAmount = (oldExpAmount+expIncreaseFactor) <= maxExp ? oldExpAmount + expIncreaseFactor : maxExp;    
    heroInfoCard_expAmount.innerText = newExpAmount.toString();
}

// Desafio de Prático
function CalcHeroRankByExpAmount(){
    if (heroRankCard.style.display === "none"){
        heroRankCard.style.display = "flex";
    }
    
    if(heroInfoCard.style.display !== "none"){
        heroInfoCard.style.display = "none";
    }
    
    const heroRanking = document.querySelector("#ranking-text");
    let heroName =  heroInfoCard_name.innerText;
    let expAmount = parseInt(heroInfoCard_expAmount.innerText);
    
    const ranking =[
        [1000, "Ferro"],
        [2000, "Bronze"],
        [5000, "Prata"],
        [7000, "Ouro"],
        [8000, "Platina"],
        [9000, "Ascendente"],
        [10000, "Imortal"],
        [maxExp, "Radiante"]        
    ]
    
    for (let i = 0; i < ranking.length; i++) {
        if (expAmount <= ranking[i][0]) {
            let msg = `O Herói de nome <strong>${heroName}</strong> está no nível de <strong>${ranking[i][1]}<strong>`;        
            if(heroRanking !== undefined){
                heroRanking.innerHTML = msg;
            }else{
                alert(msg);
            }
            break;
        }
    }
}