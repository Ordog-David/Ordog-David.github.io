let n = 5;
var ranumber = [];
let i = 0;
let lista = [];
let num = -1
let k = 0

function generalas(n) {
    while(ranumber.length < n*n) {
    var num = Math.round(Math.random() * (n*n-1));
        if(ranumber.indexOf(num) === -1) {
            ranumber.push(num);
        }     
    }
helyezes(n)}
generalas(n);
console.log(ranumber)

function helyezes(n) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            console.log(j,lista)
            lista.push[i,j,ranumber[k]]
            k++ 
        }
    }
} 
function nezes (target) {
    x = target.cellIndex
    y = target.parentElement.rowIndex
    if (target.classList.contains('felfedve')){
        alert("Ne csalj!")
    }
    else {
        console.log("B",target)
        target.setAttribute('class', 'felfedve') 
        target.innerHTML = num 
    }
}


(init = () => {
    table = Array(n).fill().map(() => Array(n).fill())
    document.getElementById('t').innerHTML = `
    <table>
        ${Array(n).fill(`
        <tr>
        ${Array(n).fill(`<td onmouseup="nezes(this)" />`).join('')}
        </tr>
        `).join('')}
    </table>`
})()