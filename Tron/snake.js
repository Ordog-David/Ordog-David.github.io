var meret = 25;
var rows = 20;
var cols = 40;
var tabla;
var context; 

var kigX = meret * 5;
var kigY = meret * 5;
var kigX2 = meret * 30;
var kigY2 = meret * 15;

var SpeedX = 0;
var Speedy = 0;
var SpeedX2 = 0;
var Speedy2 = 0;

var kigyotest = [];
var kigyotest2 = [];


var almax;
var almay;

var halal = false;

window.onload = function() {
    tabla = document.getElementById("tabla");
    tabla.height = rows * meret;
    tabla.width = cols * meret;
    context = tabla.getContext("2d");

    etetes();
    document.addEventListener("keyup", irany);
    setInterval(update, 1000/10); 
}

function update() {
    if (halal) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, tabla.width, tabla.height);

    context.fillStyle="gold";
    context.fillRect(almax, almay, meret, meret);

    if (kigX == almax && kigY == almay) {
        kigyotest.push([almax, almay]);
        etetes();
    }
    if (kigX2 == almax && kigY2 == almay) {
        kigyotest2.push([almax, almay]);
        etetes();
    }

    for (let i = kigyotest.length-1; i > 0; i--) {
        kigyotest[i] = kigyotest[i-1];
    }
    if (kigyotest.length) {
        kigyotest[0] = [kigX, kigY];
    }

    for (let i = kigyotest2.length-1; i > 0; i--) {
        kigyotest2[i] = kigyotest2[i-1];
    }
    if (kigyotest2.length) {
        kigyotest2[0] = [kigX2, kigY2];
    }

    context.fillStyle="#00008b";
    kigX += SpeedX * meret;
    kigY += Speedy * meret;
    context.fillRect(kigX, kigY, meret, meret);
    for (let i = 0; i < kigyotest.length; i++) {
        context.fillRect(kigyotest[i][0], kigyotest[i][1], meret, meret);
    }
    
    context.fillStyle="#7A1B7A";
    kigX2 += SpeedX2 * meret;
    kigY2 += Speedy2 * meret;
    context.fillRect(kigX2, kigY2, meret, meret);
    for (let i = 0; i < kigyotest2.length; i++) {
        context.fillRect(kigyotest2[i][0], kigyotest2[i][1], meret, meret);
    }


    if (kigX < 0 || kigX > cols*meret || kigY < 0 || kigY > rows*meret) {
        halal = true;
        alert("Player 1 won");
    }
    if (kigX2 < 0 || kigX2 > cols*meret || kigY2 < 0 || kigY2 > rows*meret) {
        halal = true;
        alert("Player 1 won");
    }

    for (let i = 0; i < kigyotest.length; i++) {
        if (kigX == kigyotest[i][0] && kigY == kigyotest[i][1]) {
            halal = true;
            alert("Player 2 won");
        }
    }
    for (let i = 0; i < kigyotest2.length; i++) {
        if (kigX == kigyotest2[i][0] && kigY == kigyotest2[i][1]) {
            halal = true;
            alert("Player 2 won");
        }
    }
    for (let i = 0; i < kigyotest.length; i++) {
        if (kigX2 == kigyotest[i][0] && kigY2 == kigyotest[i][1]) {
            halal = true;
            alert("Player 2 won");
        }
    }
    for (let i = 0; i < kigyotest2.length; i++) {
        if (kigX2 == kigyotest2[i][0] && kigY2 == kigyotest2[i][1]) {
            halal = true;
            alert("Player 2 won");
        }
    }
}

function irany(e) {
    if (e.code == "ArrowUp" && Speedy != 1) {
        SpeedX = 0;
        Speedy = -1;
    }
    else if (e.code == "ArrowDown" && Speedy != -1) {
        SpeedX = 0;
        Speedy = 1;
    }
    else if (e.code == "ArrowLeft" && SpeedX != 1) {
        SpeedX = -1;
        Speedy = 0;
    }
    else if (e.code == "ArrowRight" && SpeedX != -1) {
        SpeedX = 1;
        Speedy = 0;
    }
    if (e.code == "KeyW" && Speedy2 != 1) {
        SpeedX2 = 0;
        Speedy2 = -1;
    }
    else if (e.code == "KeyS" && Speedy2 != -1) {
        SpeedX2 = 0;
        Speedy2 = 1;
    }
    else if (e.code == "KeyA" && SpeedX2 != 1) {
        SpeedX2 = -1;
        Speedy2 = 0;
    }
    else if (e.code == "KeyD" && SpeedX2 != -1) {
        SpeedX2 = 1;
        Speedy2 = 0;
    }
}


function etetes() {
    almax = Math.floor(Math.random() * cols) * meret;
    almay = Math.floor(Math.random() * rows) * meret;
}
