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
  document.getElementById('szoveg').innerHTML += target.billentyu;
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
    { billentyu: ",", colSpan: 2 },
    { billentyu: "0" }
  ]
];
billentyuzet("billentyuzet", foBillentyuk);
billentyuzet("billentyuzet", numerikusBillentyuk);
