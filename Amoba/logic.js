lastMoved = "O", n = 3
let numb = 0;
inTable = (x, y) => {
    return currentX >= 0 && currentX < n && currentY >= 0 && currentY < n
}
onClick = target => {
    if (target.innerHTML.trim() == "") {
        lastMoved = lastMoved == "O" ? "X" : "O"
        target.innerHTML = lastMoved
        target.setAttribute('class', lastMoved)
        x = target.cellIndex
        y = target.parentElement.rowIndex
        table[x][y] = lastMoved
        setTimeout(() => [[1,1],[1,0],[0,1],[-1,1]].forEach(delta => {
            [deltaX, deltaY] = delta
            currentX = x
            currentY = y
            length = 0
            while (inTable(currentX, currentY) && table[currentX][currentY] === lastMoved) {
                console.log("fx", currentX, "y", currentY)
                currentX += deltaX
                currentY += deltaY
                length++
            }
            currentX = x
            currentY = y
            while (inTable(currentX, currentY) && table[currentX][currentY] === lastMoved) {
                console.log("bx", currentX, "y", currentY)
                currentX -= deltaX
                currentY -= deltaY
                length++
            }
            
            if (length > 3) {
                alert(`Nyert: ${lastMoved}`)
                init()
            }
            if (numb == 9) {
                alert("Döntetlen")
                init()
            }
            
        }), 100)
    }
numb = numb + 1}
(init = () => {
    numb = 0
    table = Array(n).fill().map(() => Array(n).fill())
    document.getElementById('t').innerHTML = `
    <table>
        ${Array(n).fill(`
        <tr>
        ${Array(n).fill(`<td onmouseup="onClick(this)" />`).join('')}
        </tr>
        `).join('')}
    </table>`
})()
