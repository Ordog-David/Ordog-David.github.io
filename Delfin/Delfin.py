import random

#n = int(input("Lista hosszusaga: "))
n = 80

lista = []
for i in range(n):
    lista.append(random.randint(-5,3))
print("Mélységek:", lista)

def vizAlattiIdo(lista):
    vizAlattiIdo = 0
    for i in range(len(lista)):
        if lista[i] < 0:
            vizAlattiIdo += 1
    return vizAlattiIdo

def vizFelszinIdo(lista):
    vizFelszinIdo = 0
    for i in range(len(lista)):
        if lista[i] == 0:
            vizFelszinIdo += 1
    return vizFelszinIdo

def a(lista):
    vizAlatt = vizAlattiIdo(lista)
    vizFelszinen = vizFelszinIdo(lista)
    osszIdo = len(lista)
    print("Vízben töltött idő:", 100 * (vizAlatt + vizFelszinen) / osszIdo, "%")
    print("Víz alatt töltött idő:", 100 * vizAlatt / osszIdo, "%")

def b(lista):
    vizAlatt = vizAlattiIdo(lista)
    vizFelett = len(lista) - vizAlatt - vizFelszinIdo(lista)
    if vizFelett > vizAlatt:
        print("Több időt töltött a víz felett")
    elif vizFelett < vizAlatt:
        print("Több időt töltött a víz alatt")
    else:
        print("Ugyanannyit volt fent és lent is")

def c(lista):
    leghosszabb_kezdet = None
    leghosszabb_hossz = 0
    kezdet = None
    hossz = 0
    for i in range(len(lista)):
        if lista[i] > 0:
            if kezdet == None:
                kezdet = i
                hossz = 1
            else:
                hossz += 1
        else:
            if leghosszabb_hossz < hossz:
                leghosszabb_hossz = hossz
                leghosszabb_kezdet = kezdet
            kezdet = None
    if kezdet != None and leghosszabb_hossz < hossz:
        leghosszabb_hossz = hossz
        leghosszabb_kezdet = kezdet
    if leghosszabb_kezdet != None:
        print("A leghosszabb ugrás kezdete:", leghosszabb_kezdet, "hossza:", leghosszabb_hossz)
    else:
        print("Sosem ugrott ki a vízből!")

def d(lista):
    legutobbi_pozitiv = -2
    legutobbi_negativ = -2
    attores = 0
    for i in range(len(lista)):
        if lista[i] > 0:
            legutobbi_pozitiv = i
            if legutobbi_negativ + 1 == legutobbi_pozitiv:
                attores += 1
        if lista[i] < 0:
            legutobbi_negativ = i
            if legutobbi_pozitiv + 1 == legutobbi_negativ:
                attores += 1
    print("Áttörések száma:", attores)

def e(lista):
    merulesek = 0
    merul = False
    for i in range(len(lista)):
        if lista[i] <= -4:
            if merul == False:
                merulesek += 1
                merul = True
        else:
            merul = False
    print("Mély merülések száma:", merulesek)

a(lista)
b(lista)
c(lista)
d(lista)
e(lista)
#"Csak mert a fizika tanár jó fej és sokmindent próbál tanítani"
