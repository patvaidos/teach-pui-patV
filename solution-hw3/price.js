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

let glazingSelect = [
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
// function displayOption(option) {
//   console.log(option);
//   let optionDisplay = document.querySelector("#Glazing-Options");
//   console.log(optionDisplay);
//   optionDisplay.innerText = option.optionName;
// }

function glazingValueChange() {
  console.log(selectGlazing);
  console.log("You selected (glazing)" + selectGlazing.value);

  let optionIndex = parseInt(selectGlazing.value);

  let optionToDisplay = glazingSelect[optionIndex];

  displayOption(optionToDisplay);
}

function packValueChange() {
  console.log(packSelect);
  console.log("You selected (packValue)" + packSelect.value);

  let optionIndex = parseInt(packSelect.value);

  let optionToDisplay = packSelect[optionIndex];

  displayOption(optionToDisplay);
}

let selectGlazing = document.querySelector("#Glazing-Options");
let packSelect = document.querySelector("#Pack-Size");

console.log(selectGlazing);
console.log(packSelect);
function createGlazingDropdown() {
  for (i = 0; i < 4; ++i) {
    //create an HTML element, choose from array of options using loop index, add to certain menu and display
    var option = document.createElement("option");
    option.text = glazingSelect[i].optionName;
    option.value = glazingSelect[i].priceChange;
    selectGlazing.add(option);
  }
  selectGlazing.addEventListener("change", glazingValueChange);
}

function createPackDropdown() {
  for (i = 0; i < 4; ++i) {
    //create an HTML element, choose from array of options using loop index, add to certain menu and display
    var option = document.createElement("option");
    console.log(option);
    option.text = packSelectArray[i].optionName;
    option.value = packSelectArray[i].priceChange;
    packSelect.add(option);
  }
  packSelect.addEventListener("change", packValueChange);
}

createGlazingDropdown();
createPackDropdown();
