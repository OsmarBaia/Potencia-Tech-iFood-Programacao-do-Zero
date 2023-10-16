class Job {
    constructor(jobName, attackType) {
        this.jobName = jobName;
        this.attackType = attackType;
    }
    Attack(){
        console.log(`o ${this.jobName} atacou usando ${this.attackType}`)
    }
}

class Mage extends Job {
    constructor(){
        super("Mago", "Magia");
    }    
}

class Warrior extends Job {
    constructor(){
        super("Guerreiro", "Espada");
    }
}

class Monk extends Job {
    constructor(){
        super("Monge", "Artes Marciais");
    }
}

class Ninja extends Job {
    constructor(){
        super("Ninja", "Shuriken");
    }
}


const character={
    mage: new Mage(),
    warrior: new Warrior(),
    monk: new Monk(),
    ninja: new Ninja()
}

function main(){
    character.mage.Attack();
    character.warrior.Attack();
    character.monk.Attack();
    character.ninja.Attack();
}

main();