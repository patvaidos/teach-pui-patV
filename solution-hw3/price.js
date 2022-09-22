// define constants
class Product {
  priceChange;
  optionName;

  constuctor(priceChange, optionName) {
    this.priceChange = priceChange;
    this.optionName = optionName;
  }
}
const basePrice = 2.49;
let glazingIndex = 0;
let packIndex = 0;

let glazingSelectArray = [
  {
    optionName: "Keep original",
    priceChange: 0.0,
  },
  {
    optionName: "Sugar milk",
    priceChange: 0.0,
  },
  {
    optionName: "Vanilla milk",
    priceChange: 0.5,
  },
  {
    optionName: "Double chocolate",
    priceChange: 1.5,
  },
];

let packSelectArray = [
  {
    optionName: 1,
    priceChange: 1,
  },
  {
    optionName: 3,
    priceChange: 3,
  },
  {
    optionName: 6,
    priceChange: 5,
  },
  {
    optionName: 12,
    priceChange: 10,
  },
];

function glazingValueChange() {
  console.log("You selected (glazing)" + selectGlazing.value);

  glazingIndex = parseInt(selectGlazing.value);

  calculatePrice(glazingIndex, 0);
}

function packValueChange() {
  console.log("You selected (packValue)" + packSelect.value);

  packIndex = parseInt(packSelect.value);

  calculatePrice(0, packIndex);
}

let selectGlazing = document.querySelector("#Glazing-Options");
let packSelect = document.querySelector("#Pack-Size");

console.log(selectGlazing);
console.log(packSelect);
function createGlazingDropdown() {
  for (i = 0; i < 4; ++i) {
    //create an HTML element, choose from array of options using loop index, add to certain menu and display
    var option = document.createElement("option");
    option.text = glazingSelectArray[i].optionName;
    option.value = i;
    selectGlazing.add(option);
  }
  selectGlazing.addEventListener("change", glazingValueChange);
}

function createPackDropdown() {
  for (i = 0; i < 4; ++i) {
    //create an HTML element, choose from array of options using loop index, add to certain menu and display
    var option = document.createElement("option");
    option.text = packSelectArray[i].optionName;
    option.value = i;
    packSelect.add(option);
  }
  packSelect.addEventListener("change", packValueChange);
}

createGlazingDropdown();
createPackDropdown();

function calculatePrice(glazing, pack) {
  let finalPrice = basePrice;
  let selectedGlaze = glazingSelectArray[glazingIndex].priceChange;
  let selectedPack = packSelectArray[packIndex].priceChange;
  finalPrice = (basePrice + selectedGlaze) * selectedPack;
  console.log(finalPrice);
  finalPrice = finalPrice.toString();
  document.querySelector("#total").innerText = formatter.format(finalPrice);
}

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
