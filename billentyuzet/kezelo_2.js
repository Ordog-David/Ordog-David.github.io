function billentyuzet(id, billentyuk) {
  let table = document.createElement('table');
  table.className = "billentyuzet"
  billentyuk.forEach(function(rowData) {
    let row = table.insertRow();
    rowData.forEach(function(cellData) {
      let cell = row.insertCell();
      cell.billentyu = cellData.billentyu;
      cell.textContent = cellData.billentyu;

      if ("colSpan" in cellData) {
        cell.colSpan = cellData.colSpan;
      }

      cell.addEventListener("click", (event) => onClick(event.target));
    });
  });
  document.getElementById(id).appendChild(table);
}
var szoveg = ""
function onClick(target) {
  if (target.billentyu === "C") {
    szoveg = "";
  } else {
    szoveg += target.billentyu;
  }
  document.getElementById('szamok').innerHTML = szoveg
}
var billentyuk = [
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
    { billentyu: "C", colSpan: 2 },
    { billentyu: "0" }
  ]
];
billentyuzet("billentyuzet", billentyuk);
