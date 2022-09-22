class Product {
  //class Product contains object with a price change to be applied to the base price as well as the name of the option.
  priceChange;
  optionName;

  constuctor(priceChange, optionName) {
    this.priceChange = priceChange;
    this.optionName = optionName;
  }
}
//Global variables are defined here
const basePrice = 2.49;
//Default indexes for the glazing and pack inventories
let glazingIndex = 0;
let packIndex = 0;

//Arrays of Product objects glazing and packs, with attributes optionName, the name of the product and the price change applied to the base price.
let glazingArray = [
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

let packArray = [
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
//Variables store the selected HTML element for glazing and pack size respectfully.
let selectGlazing = document.querySelector("#Glazing-Options");
let packSelect = document.querySelector("#Pack-Size");

function glazingValueChange() {
  //Takes the glazing value from HTML element and calculates the index to retrieve the value. Calculates price from index.
  console.log("You selected (glazing)" + selectGlazing.value);

  glazingIndex = parseInt(selectGlazing.value);

  calculatePrice(glazingIndex, 0);
}

function packValueChange() {
  //Takes the pack value from HTML element and calculates the index to retrieve the value. Calculates price from index.
  console.log("You selected (packValue)" + packSelect.value);

  packIndex = parseInt(packSelect.value);

  calculatePrice(0, packIndex);
}

function createGlazingDropdown() {
  //Populates the glazing options dropdown menu with glazing objects.
  for (i = 0; i < 4; ++i) {
    var option = document.createElement("option");
    option.text = glazingArray[i].optionName;
    option.value = i;
    selectGlazing.add(option);
  }
  selectGlazing.addEventListener("change", glazingValueChange);
}

function createPackDropdown() {
  //Populates the pack options dropdown menu with glazing objects.
  for (i = 0; i < 4; ++i) {
    var option = document.createElement("option");
    option.text = packArray[i].optionName;
    option.value = i;
    packSelect.add(option);
  }
  packSelect.addEventListener("change", packValueChange);
}

createGlazingDropdown();
createPackDropdown();

function calculatePrice(glazing, pack) {
  //Calculates the final price of the purchase by using a price formula with variables from the glazing & pack size arrays.
  let finalPrice = basePrice;
  let selectedGlaze = glazingArray[glazingIndex].priceChange;
  let selectedPack = packArray[packIndex].priceChange;
  finalPrice = (basePrice + selectedGlaze) * selectedPack;
  console.log(finalPrice);
  finalPrice = finalPrice.toString();
  document.querySelector("#total").innerText = formatter.format(finalPrice);
}

//Formats the finalPrice answer into a currency format.
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
