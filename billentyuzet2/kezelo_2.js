let popszakma = "nem ilyen"
let betuk_lista = []
let convert = ""
let beirt = document.getElementById('szoveg').innerHTML
function billentyuzet(id, billentyuk) {
  
  let table = document.createElement('table');
  table.className = "billentyuzet"
  billentyuk.forEach(function(rowData) {
    let row = table.insertRow();
    rowData.forEach(function(cellData) {
      let cell = row.insertCell();
      cell.billentyu = cellData.billentyu;
      
      if ("szoveg" in cellData) {
        cell.textContent = cellData.szoveg;
      } else {
        cell.textContent = cellData.billentyu;
      }

      if ("colSpan" in cellData) {
        cell.colSpan = cellData.colSpan;
      }

      if ("rowSpan" in cellData) {
        cell.rowSpan = cellData.rowSpan;
      }
      cell.addEventListener("click", (event) => onClick(event.target));
    });
  });
  document.getElementById(id).appendChild(table);
}
function onClick(target) {
  betuk_lista.push(target.billentyu)
  console.log(betuk_lista)
  if (target.billentyu === "ㅤ") {
    console.log("siker")
    betuk_lista.pop()
    betuk_lista.pop()
    console.log("l:",betuk_lista)
    convert = betuk_lista.toString()
    console.log("b:",convert)
    convert = convert.replaceAll(",","")
    beirt = convert
  }
  else {
    beirt += target.billentyu
  }
  document.getElementById('szoveg').innerHTML = beirt;
  /*Szukseg van:
    - beolvasni a karomkodas listat
    - megnezni van-e a szovegben karomkodas
    - megtalalni melyik karomkodast tartalmazza
    - megtalalni a karomkodas helyet a szovegben
    - valasz a karomkodasra
    - backspace-t megcsinalni
  if (beirt.includes("K")) {
    console.log(beirt.indexOf())

  } */
  if (beirt.includes("ILYEN EZ A POPSZAKM") && popszakma == "nem ilyen") {
    alert("Ne tedd")
    popszakma = "ilyen"
  }
  for (var i = 0; i < karmokodas.length; i++) {
    if (beirt.includes(karmokodas[i])) {
      alert("Csúnyaszó észlelve: "+ karmokodas[i])
      alert("Cenzúra indítása")
      setTimeout(crasher, 3000)
      
      
    }
  }
  
  console.log(typeof beirt)   
}
let foBillentyuk = [
  [
    { billentyu: "Q" },
    { billentyu: "W" },
    { billentyu: "E" },
    { billentyu: "R" },
    { billentyu: "T" },
    { billentyu: "Z" },
    { billentyu: "U" },
    { billentyu: "I" },
    { billentyu: "O" },
    { billentyu: "P" }
  ],
  [
    { billentyu: "A" },
    { billentyu: "S" },
    { billentyu: "D" },
    { billentyu: "F" },
    { billentyu: "G" },
    { billentyu: "H" },
    { billentyu: "J" },
    { billentyu: "K" },
    { billentyu: "L" },
    { billentyu: "<br>", rowSpan: 2, szoveg: "⏎" }
  ],
  [
    { billentyu: "Y" },
    { billentyu: "X" },
    { billentyu: "C" },
    { billentyu: "V" },
    { billentyu: "B" },
    { billentyu: "N" },
    { billentyu: "M" },
    { billentyu: " ", colSpan: 2, szoveg: "____" }
  ]
];
let numerikusBillentyuk = [
  [
    { billentyu: "1" },
    { billentyu: "2" },
    { billentyu: "3" }
  ],
  [
    { billentyu: "4" },
    { billentyu: "5" },
    { billentyu: "6" }
  ],
  [
    { billentyu: "7" },
    { billentyu: "8" },
    { billentyu: "9" }
  ],
  [
    { billentyu: "," },
    { billentyu: "0" },
    //{ billentyu: "C" },
    { billentyu: "ㅤ" , szoveg:"←"} //←
  ]
];
//beirt = beirt.substring(0, beirt.lenght-2)
//let karomkodasok = FileReader.readAsArrayBuffer(karomkodas.txt)
/* ‎  */
//ㅤ ㅤ 

function crasher() {
  for (var j = 0; j < 4; j++) {
    visszaszamlalas = 3-j
    alert(visszaszamlalas)
  }
  console.log("Cenzúra elkezdése")
  for (var i = 5; i > 3; i = i + 1)
    {console.log(i); }
}

billentyuzet("billentyuzet", foBillentyuk);
billentyuzet("billentyuzet", numerikusBillentyuk);

let karmokodas = [
   "ILYEN EZ A POPSZAKMA",
  "FASZ",
  "SZAR",
  "GECI",
  "PICSA",
  "KURVA",
  "POCS",
  "BASZ",
  "KURT",
  "BAZD",
  "KRETEN",
  "NIGG",
  "FUTYI",
  "CIGAN",
  "SPERMA",
  "SEGG",
  "CSOCS",
  "LESZBIKUS",
  "MASZTURBACIO",
  "SZOP",
  "PENISZ",
  "PINA",
  "OVSZER",
  "PISA",
  "FING",
  "PORNO",
  "PUNCI",
  "BUSSY",
  "RIBANC",
  "CSICSKA",
  "FUCK",
  "DAMN",
  "HELL",
  "DICK",
  "COCK",
  "PUSSY",
  "MOTHERFUCK",
  "GODDAMN",
  "SHIT",
  "PISS",
  "CUM",
  "JIZZ",
  "SUCK",
  "FAP",
]
