let n = 16
let aknaszam = 40
let maradhely = n * n - aknaszam
let aknak = []
let halott = false;

aknagen = (max) => {
    for (let n = 0; n < max; ++n) {
        let akna
        do {
            akna = aknageneracio()
        } while (bennevan(akna))
        aknak.push(akna)
    }
}
aknageneracio = () => {
    let x = Math.floor(Math.random() * n)
    let y = Math.floor(Math.random() * n)
    return [x, y]
}
mutak = () => {
    for (const akna of aknak) {
        minemutat(akna)
    }
}
minemutat = (akna) => {
    let rows = document.getElementById('tabla').getElementsByTagName('tr');
    let columns = rows[akna[1]].getElementsByTagName('td');
    let cell = columns[akna[0]]
    cell.innerHTML = '💣'
}
bennevan = (coordinates) => {
    for (const akna of aknak) {
        if (akna[0] == coordinates[0] && akna[1] == coordinates[1]) {
            return true
        }
    }
    return false
}
onClick = (target) => {
    if (halott == true) {
        alert("Ne csalj")
    }
    else{
        if (target.innerHTML.trim() === "") {
            x = target.cellIndex
            y = target.parentElement.rowIndex
    
            if (bennevan([x, y])) {
                target.setAttribute('class', 'exploded')
                mutak()
                alert("Veszitettel!")
                halott = true
                return
            }
    
            let neighboursWithMines = bennevan([x - 1, y - 1])
                                    + bennevan([x - 1, y + 0])
                                    + bennevan([x - 1, y + 1])
                                    + bennevan([x + 0, y - 1])
                                    + bennevan([x + 0, y + 1])
                                    + bennevan([x + 1, y - 1])
                                    + bennevan([x + 1, y + 0])
                                    + bennevan([x + 1, y + 1]);
            target.innerHTML = neighboursWithMines
            target.setAttribute('class', 'clicked')
    
            if (--maradhely == 0) {
                mutak()
                alert("Nyertel!")
            }
    
            document.getElementById('remaining').innerHTML = maradhely
        }
    }
}
    
(init = () => {
    aknagen(aknaszam)
    document.getElementById('remaining').innerHTML = maradhely
    document.getElementById('tabla').innerHTML = `
    <table>
        ${Array(n).fill(`
        <tr>
        ${Array(n).fill(`<td onmouseup="onClick(this)" />`).join('')}
        </tr>
        `).join('')}
    </table>`
})()
