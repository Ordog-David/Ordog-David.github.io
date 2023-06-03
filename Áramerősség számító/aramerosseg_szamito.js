function changeImage(target) {
    if (target.checked) {
        document.getElementById("image").src = "Aramkor.svg"
        document.getElementById("InputFields").style.visibility = "visible"
    } else {
        document.getElementById("image").src = "Aramkor_nyitott.svg"
        document.getElementById("InputFields").style.visibility = "hidden"
    }
}

function changeU0() {
    const U0 = kiolvaso("U0")
    const R1 = kiolvaso("R1")
    const R2 = kiolvaso("R2")
    const R3 = kiolvaso("R3")

    const R0 = R0_szamito(R1, R2, R3)
    const I0 = I_szamito(U0, R0, "I0")

    const I3 = I_szamito(U0, R3, "I3")
    const Ix = I0 - I3
    beallito(Ix, "I1")
    beallito(Ix, "I2")

    U_szamito(Ix, R1, "U1")
    U_szamito(Ix, R2, "U2")
    beallito(U0, "U3")
}

function changeU1() {
    const U1 = kiolvaso("U1")
    const R1 = kiolvaso("R1")
    const R2 = kiolvaso("R2")
    const R3 = kiolvaso("R3")

    const Ix = I_szamito(U1, R1, "I1")

    beallito(Ix, "I2")
    const U2 = U_szamito(Ix, R2, "U2")

    const U3 = U1 + U2
    I_szamito(U3, R3, "I3")
    beallito(U3, "U3")

    const R0 = R0_szamito(R1, R2, R3)
    I_szamito(U3, R0, "I0")
    beallito(U3, "U0")
}

function changeU2() {
    const U2 = kiolvaso("U2")
    const R1 = kiolvaso("R1")
    const R2 = kiolvaso("R2")
    const R3 = kiolvaso("R3")

    const Ix = I_szamito(U2, R2, "I2")

    beallito(Ix, "I1")
    const U1 = U_szamito(Ix, R1, "U1")

    const U3 = U1 + U2
    I_szamito(U3, R3, "I3")
    beallito(U3, "U3")

    const R0 = R0_szamito(R1, R2, R3)
    I_szamito(U3, R0, "I0")
    beallito(U3, "U0")
}

function changeU3() {
    const U3 = kiolvaso("U3")
    const R1 = kiolvaso("R1")
    const R2 = kiolvaso("R2")
    const R3 = kiolvaso("R3")

    const I3 = I_szamito(U3, R3, "I3")

    const Ix = I_szamito(U3, R1 + R2, "I1")
    U_szamito(Ix, R1, "U1")
    beallito(Ix, "I2")
    U_szamito(Ix, R2, "U2")

    const R0 = R0_szamito(R1, R2, R3)
    I_szamito(U3, R0, "I0")
    beallito(U3, "U0")
}

function changeI0() {
    const I0 = kiolvaso("I0")
    const R1 = kiolvaso("R1")
    const R2 = kiolvaso("R2")
    const R3 = kiolvaso("R3")

    const R0 = R0_szamito(R1, R2, R3)
    const U0 = U_szamito(I0, R0, "U0")

    const I3 = I_szamito(U0, R3, "I3")
    const Ix = I0 - I3
    beallito(Ix, "I1")
    beallito(Ix, "I2")

    U_szamito(Ix, R1, "U1")
    U_szamito(Ix, R2, "U2")
    beallito(U0, "U3")
}

function changeI1() {
    const Ix = kiolvaso("I1")
    const R1 = kiolvaso("R1")
    const R2 = kiolvaso("R2")
    const R3 = kiolvaso("R3")

    const U1 = U_szamito(Ix, R1, "U1")

    beallito(Ix, "I2")
    const U2 = U_szamito(Ix, R2, "U2")

    const U3 = U1 + U2
    I_szamito(U3, R3, "I3")
    beallito(U3, "U3")

    const R0 = R0_szamito(R1, R2, R3)
    I_szamito(U3, R0, "I0")
    beallito(U3, "U0")
}

function changeI2() {
    const Ix = kiolvaso("I2")
    const R1 = kiolvaso("R1")
    const R2 = kiolvaso("R2")
    const R3 = kiolvaso("R3")

    const U2 = U_szamito(Ix, R2, "U2")

    beallito(Ix, "I1")
    const U1 = U_szamito(Ix, R1, "U1")

    const U3 = U1 + U2
    I_szamito(U3, R3, "I3")
    beallito(U3, "U3")

    const R0 = R0_szamito(R1, R2, R3)
    I_szamito(U3, R0, "I0")
    beallito(U3, "U0")
}

function changeI3() {
    const I3 = kiolvaso("I3")
    const R1 = kiolvaso("R1")
    const R2 = kiolvaso("R2")
    const R3 = kiolvaso("R3")

    const U3 = U_szamito(I3, R1, "U1")
    beallito(U3, "U3")
    const R0 = R0_szamito(R1, R2, R3)
    beallito(U3, "U0")
    const U0 = U3
    const I0 = I_szamito(U0, R0, "I0")
    const Ix = I0 - I3
    beallito(Ix,"I2")
    beallito(Ix,"I1")
    const U2 = U_szamito(Ix, R2, "U2")
    const U1 = U_szamito(Ix, R1, "U1")
}

function changeR1() {
    changeU0()
}

function changeR2(target) {
    changeU0()
}

function changeR3(target) {
    changeU0()
}

function R0_szamito(R1, R2, R3) {
    const Rx = R1 + R2
    const R0 = R3 * Rx / (R3 + Rx)
    beallito(R0, "R0")
    return R0
}

function I_szamito(U, R, id) {
    const I = U / R
    beallito(I, id)
    return I
}

function U_szamito(I, R, id) {
    const U = I * R
    beallito(U, id)
    return U
}

function beallito(value, id) {
    document.getElementById(id).value = value
}

function kiolvaso(id) {
    const value = document.getElementById(id).value
    if (value == 0) {
        alert("A(z) " + id + " nem lehet nulla!")
        throw new Error("Invalid value")
    }
    return parseFloat(value)
}

changeImage(document.getElementById("switch"))
changeU0()
