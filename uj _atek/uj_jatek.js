let n = 5;
(init = () => {
    t = Array(n).fill().map(() => Array(n).fill())
    document.getElementById('t').innerHTML = `
    <table>
        ${Array(n).fill(`
        <tr>
        ${Array(n).fill(`<td onmouseup="c(this)" />`).join('')}
        </tr>
        `).join('')}
    </table>`
})()
sart = () => {
    
} 
c = () => {
}