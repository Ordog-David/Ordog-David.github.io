let n = 5;
var ranumber = [];
let i = 0;
let num = -1
let k = 0
console.log(k)
let clicked = false
let number = 0 
let random_list = []



function generalas(n) {
    while(ranumber.length < n*n) {
        var num = Math.round(Math.random() * (n*n-1));
        if(ranumber.indexOf(num) === -1) {
            ranumber.push(num);
        }     
    }
}
console.log(ranumber)
function nezes (target) {
    number = Number(target.innerHTML)
    x = target.cellIndex
    y = target.parentElement.rowIndex
    if (clicked == false){
        alert("Ne csalj!")
    }
    else {
        target.setAttribute('class', '')
        if (number == k) {
            k = k + 1
            console.log(k)
        }
        else {
            alert("Vesztettél")
            let table = document.getElementById("t").children[0]
            for (y = 0; y < n; y++) {
            let row = table.rows[y]
            for (x = 0; x < n; x++) {
            let cell = row.cells[x];
            cell.setAttribute('class','')
            }}
        }

    }
}
var button = document.getElementById("button");
button.addEventListener("click", function(e) {
    let table = document.getElementById("t").children[0]
    clicked = true
    k = 0
    for (y = 0; y < n; y++) {
        let row = table.rows[y]
        for (x = 0; x < n; x++) {
            let cell = row.cells[x];
            cell.setAttribute('class','hidden')
        }
   }
});

(init = () => {
    document.getElementById('t').innerHTML = `
    <table>
        ${Array(n).fill(`
        <tr>
        ${Array(n).fill(`<td onmouseup="nezes(this)" />`).join('')}
        </tr>
        `).join('')}
    </table>`
    generalas(n);
    let table = document.getElementById("t").children[0]
    i = 0;
    for (y = 0; y < n; y++) {
        let row = table.rows[y]
        for (x = 0; x < n; x++) {
            let cell = row.cells[x];
            cell.innerHTML = ranumber[i++]
        }
    }

})()
