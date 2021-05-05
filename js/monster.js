'use strict'

const FREQUENCE = 12000;

let NAME;
let LIFE;
let MONEY;
let AWAKE = true;

let boiteMonster = document.getElementById('monster');
let img = document.createElement("img");
let txt = boiteMonster.firstElementChild;
let actionBox = document.getElementById('actionbox');

let buttonNewLife = document.getElementById("b1");
let buttonRun = document.getElementById("b2");
let buttonFight = document.getElementById("b3");
let buttonSleep = document.getElementById("b4");
let buttonEat = document.getElementById("b5");
let buttonShow = document.getElementById("b6");
let buttonWork = document.getElementById("b7");
let buttonKill = document.getElementById("k");

let liste = Array.from(document.getElementsByTagName("li"));


window.addEventListener("load", () => go());


function go() {
    init(getName(), 25, 100);
    buttonShow.addEventListener("click", () => showme());
    buttonRun.addEventListener("click", () => run());
    buttonFight.addEventListener("click", () => fight());
    buttonEat.addEventListener("click", () => eat());
    buttonWork.addEventListener("click", () => work());
    buttonSleep.addEventListener("click", () => sleep());
    setInterval(() => {
        hasard();
    }, FREQUENCE);
    buttonKill.addEventListener("click", () => kill());
    buttonNewLife.addEventListener("click", () => newLife());
    displayStatus();
    boiteMonster.insertBefore(img, txt);
    style();
}



function init(n, l, m) {
    NAME=n;
    LIFE=l;
    MONEY=m;
}



function showme(){
    log(`Nom : ${NAME} | Vie : ${LIFE} | Argent: ${MONEY} | Reveillé : ${AWAKE}` );
    //displayStatus();
}

function log(message) {
    // creation de l'enfant
    let child = document.createElement("p");
    let content = document.createTextNode(message);
    child.appendChild(content);

    // on decale si ce n'est pas le 1er element
    if (actionBox.childElementCount !== 0) {
        let oldFirstChild = actionBox.firstElementChild;
        actionBox.insertBefore(child, oldFirstChild);
    }
    // sinon on ajoute
    else {
        actionBox.appendChild(child);
    }
}

// passer en parametre des varriables globales ca sert à rien, donc on n'a pas mis de parametres a cette fonction
function displayStatus() {
    liste[1].textContent = `Money : ${MONEY}`;
    if (AWAKE) liste[2].textContent = `Awake 😊`;
    else liste[2].textContent = `Asleep 💤`;

    let color;
    if (LIFE < 5) {
        color = "red";
        liste[0].textContent = `Life : ${LIFE} 💖`;
    } else if (LIFE < 10) {
        color = "orange";
        liste[0].textContent = `Life : ${LIFE} 🧡`;
    } else if (LIFE < 15) {
        color = "yellow";
        liste[0].textContent = `Life : ${LIFE} 💛`;
    } else {
        color = "green"; 
        liste[0].textContent = `Life : ${LIFE} 💚`;
    }
    boiteMonster.style.backgroundColor = color;

    let border;
    if (MONEY < 10) border = "0px";
    else if (MONEY < 25) border = "thin";
    else if (MONEY < 50) border = "medium";
    else border = "thick";
    boiteMonster.style.borderStyle = "solid";
    boiteMonster.style.borderWidth = border;

    rip();
}


/* ACTIONS */
function run() {
    // perte de 1 point de vie
    action("Le monstre court. Il perd 1 PV.", -1, 0);
}

function fight() {
    // perte de 3 points de vie
    action("Le monstre se bat. Il perd 3 PV.", -3, 0);
}

function work() {
    // perte d’1 point de vie et gain de 2 unités d’argent
    action("Le monstre travaille. Il perd 1 PV et gagne 2 UA.", -1, 2);
}

function eat() {
    // perte de 3 unités d’argent et gain de 2 points de vie
    action("Le monstre mange. Il gagne 2 PV et perd 3 UA.", 2, -3);
}

function action(msgAction, dPV, dUA) {
    let msg;
    if (AWAKE && LIFE > 0 && MONEY+dUA >= 0) {
        LIFE += dPV;
        MONEY += dUA;
        msg = msgAction;
        if (LIFE <= 0) {
            LIFE = 0;
            msg += " LE MONSTRE VIENT DE MOURIR.";
        }
    } else if (LIFE <= 0) {
        msg = "ACTION IMPOSSIBLE : Le monstre est mort."
    } else if (MONEY+dUA < 0) {
        msg = "ACTION IMPOSSIBLE : Le monstre est pauvre."
    } else {
        msg = "ACTION IMPOSSIBLE : Le monstre dort."
    }
    log(msg);
    showme();
    displayStatus();
}

function sleep() {
    if (AWAKE && LIFE > 0) {
        AWAKE = false;
        log("Le monstre s'endort.");
        showme();
        displayStatus();
        setTimeout(() => {
            AWAKE = true;
            log("Le monstre se réveille.");
            showme();
            displayStatus();
        }, 7000);
    } else if (!AWAKE) {
        log("ACTION IMPOSSIBLE : Le monstre dort déjà.");
    } else {
        log("ACTION IMPOSSIBLE : Le monstre est mort");
    }
}


function kill() {
    let msg;
    if (LIFE > 0) {
        LIFE = 0;
        MONEY = 0;
        msg = "Le monstre se fait tuer.";
    } else {
        msg = "ACTION IMPOSSIBLE : Le monstre est déjà mort."
    }
    log(msg);
    showme();
    displayStatus();
}

function newLife() {
    let msg;
    if (LIFE <= 0) {
        LIFE = 25;
        MONEY = 15;
        msg = "Le monstre est un phénix, il renaît de ses cendres !";
        style();
    } else {
        msg = "ACTION IMPOSSIBLE : Le monstre ne peut pas renaître s'il n'est pas mort.";
    }
    log(msg);
    showme();
    displayStatus();
}



function hasard() {
    let nb = Math.floor((Math.random() * 5));
    switch (nb) {
        case 0:
            run();
            break;
        case 1:
            fight();
            break;
        case 2:
            work();
            break;
        case 3:
            sleep();
            break;
        case 4:
            eat();
            break;
    }
}

// Améliorations
function style() {
    let favicon = document.createElement('link');
    favicon.setAttribute('rel','shortcut icon');
    favicon.setAttribute('href','./images/favicon.png');
    document.querySelector('head').appendChild(favicon);


    let alea = Math.floor((Math.random() * 6)) +1;
    img.src = `./images/${alea}.png`
    img.style.width = "75px";
    img.style.filter = "drop-shadow(0px 0px 5px #FFFFFF)"

    img.style.marginTop = "3px";
    img.style.padding = "0px";
    img.style.display = "block";
    img.style.marginLeft = "auto";
    img.style.marginRight = "auto";

    txt.style.textShadow = "0px 0px 5px #FFFFFF"
    txt.style.margin = "0px";
    txt.style.padding = "2px 0px 0px 0px";
    txt.style.textAlign = "center";
    txt.innerHTML = NAME;
}

function getName() {
    let tab = ["Wilfrid", "Godzilla", "Bubble", "Enzox", "Cyclopemyope", "Kebab", "Garfieldus", "Zbelele", "Boo", "Yeti", "FlipBrain"]
    let nb = Math.floor((Math.random() * tab.length));
    return tab[nb];
}

function rip() {
    if (LIFE <= 0) {
        img.src = "./images/rip.png";
    }
}