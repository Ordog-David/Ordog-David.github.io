function changemagassag() {
    const magassag = parseInt(document.getElementById("magassag").value)
    const osszeg = lehetosegek(magassag)
    document.getElementById("valasz").innerHTML = osszeg
}

 
function lehetosegek(magassag) {
    let osszeg = 0
    let keplet = document.getElementById("keplet")  
    if (magassag == 0) {
        keplet.innerHTML = "T[0] = 1"
        return 1
    }
    if (magassag == 1) {
        keplet.innerHTML = "T[1] = 2"
        return 2
    }
    osszeg += lehetosegek(magassag - 2)
    osszeg += 2 * lehetosegek(magassag - 1)
    keplet.innerHTML = "T[i] = T[i-2] + 2 x T[i-1]"
    return osszeg
}

changemagassag()