'use strict'

let NAME;
let LIFE;
let MONEY;
let AWAKE = true;

function init(n, l, m) {
    NAME=n;
    LIFE=l;
    MONEY=m;
}

function showme(){
    window.alert(`Nom : ${NAME}  Vie : ${LIFE} Argent: ${MONEY} Reveillé : ${AWAKE}` );
}


window.addEventListener("load", () => {
    init("Wilfrid", 25, 100);
    showme();
})

let buttonNewLife = document.getElementById("b1");
let buttonRun = document.getElementById("b2");
let buttonFight = document.getElementById("b3");
let buttonSleep = document.getElementById("b4");
let buttonEat = document.getElementById("b5");
let buttonShow = document.getElementById("b6");
let buttonWork = document.getElementById("b7");
let buttonKill = document.getElementById("k");

let liste = Array.from(document.getElementsByTagName("li"));