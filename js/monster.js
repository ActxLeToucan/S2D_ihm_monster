'use strict'

let NAME;
let LIFE;
let MONEY;
let AWAKE = true;

let texteMonster = document.getElementById('monster');
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
    init("Wilfrid", 25, 100);
    buttonShow.addEventListener("click", () => showme());
    buttonRun.addEventListener("click", () => run());
    buttonFight.addEventListener("click", () => fight());
    buttonEat.addEventListener("click", () => eat());
    buttonWork.addEventListener("click", () => work());
    

}



function init(n, l, m) {
    NAME=n;
    LIFE=l;
    MONEY=m;
}



function showme(){
    log(`Nom : ${NAME}  Vie : ${LIFE} Argent: ${MONEY} Reveillé : ${AWAKE}` );
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
    liste[0].textContent = `Life : ${LIFE}`;
    liste[1].textContent = `Money : ${MONEY}`;
    if (AWAKE) liste[2].textContent = `Awake`;
    else liste[2].textContent = `Asleep`;
}


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