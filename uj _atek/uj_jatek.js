let n = 5;
let cordinates = [];
let i = 0;
let lista = [];


 
function generalas (target) {
    if (target.classList.contains('felfedve')){
        alert("Ne csalj!")
    }
    else {
        let num = Math.floor(Math.random() * (n*n))
        while (cordinates.includes(num)) {
            let num = Math.floor(Math.random() * (n*n))
            console.log(num)
        }
        console.log("Siker")
        target.setAttribute('class', 'felfedve') 
        target.innerHTML = num 
        cordinates.push(num);
               
    }
}

(init = () => {
    document.getElementById('t').innerHTML = `
    <table>
        ${Array(n).fill(`
        <tr>
        ${Array(n).fill(`
        <td onmouseup="onClick(this)" 
        generalas(this)"/>.join('')}
        </tr>
        `).join('')}
    </table>`
})()
