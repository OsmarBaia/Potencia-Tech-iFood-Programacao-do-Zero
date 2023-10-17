// Dom Elements
const herosImgElement = document.querySelectorAll("#menu__image img");
const actionButtonsElement = document.querySelectorAll("#menu__action button");
const classNameElement = document.querySelector("#menu__className")
const herosAttackContainer = document.querySelector("#container-heroAttack");

let currentJob = 0;

let playerHero;

// Reset Sprites
function Start(){
    playerHero = new Hero();
    herosImgElement.forEach( e => {
        e.style.display = "none"
    })    
    herosImgElement[0].style.display = "";
    // herosAttackContainer.style.display = "none";
    
}

function toggleHeroAttackContainer(){
    herosAttackContainer.style.display = herosAttackContainer.style.display !== "none" ? "none" : "";
}

function ChangeJob(button){
    herosImgElement[currentJob].style.display = "none";    
    if(button === actionButtonsElement[0]){
        currentJob -= 1;
    }else{
        currentJob += 1;
    }
    
    if( currentJob < 0){
        currentJob = herosImgElement.length -1;
    }
    
    if(currentJob > herosImgElement.length -1){
        currentJob = 0;
    }
    
    herosImgElement[currentJob].style.display = "";    
    playerHero.job = playerHero.jobClass[currentJob];
    classNameElement.innerText = playerHero.job.jobName;
}

function AppendText(job){
    let classNameElement = document.querySelector("#container-heroAttack h2");
    classNameElement.innerText = job.jobName;

    // let textElement = document.createElement("p")
    let textElement = document.querySelector("#container-heroAttack p");
    textElement.innerHTML = `
            O  <strong> ${job.jobName} </strong> atacou usando <strong> ${job.attackType}</strong>
            `
}

class Job {
    constructor(jobName, attackType) {
        this.jobName = jobName;
        this.attackType = attackType;    
    }   
    
    Attack(){
        AppendText(this);
    }
}

class Mage extends Job {
    constructor(){
        super("mago", "magia");
    }    
}

class Warrior extends Job {
    constructor(){
        super("guerreiro", "espada");
    }
}

class Monk extends Job {
    constructor(){
        super("monge", "artes marciais");
    }
}

class Ninja extends Job {
    constructor(){
        super("ninja", "shuriken");
    }
}

class Hero {            
    jobClass = [
        new Warrior(), 
        new Mage(), 
        new Monk(), 
        new Ninja()
    ];
    
    constructor() {
        this.job = new Job();
        this.job = this.jobClass[currentJob];
    }
    
    Attack(){
        this.job.Attack();
    }
}

function ChooseHero(){
    toggleHeroAttackContainer();
    playerHero.Attack();
}

