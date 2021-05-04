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
}

function init(n, l, m) {
    NAME=n;
    LIFE=l;
    MONEY=m;
}

function showme(){
    window.alert(`Nom : ${NAME}  Vie : ${LIFE} Argent: ${MONEY} Reveillé : ${AWAKE}` );
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