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