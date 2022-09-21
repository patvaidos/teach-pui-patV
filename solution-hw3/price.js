// define constants
const basePrice = 2.49;
const glazingPriceVariables = [0, 0, 0.5, 1.5];
const packingSizePrices = [1, 3, 5, 10];

// retrieve elements from HTML dropdown menus
// const dropdown =
// console.log(dropdown);
const glazingOptions = document.getElementById("Glazing Options");
// glazingOptions.addEventListener("click", onChange());

const packSizeOptions = document.getElementById("Pack Size");
// packSizeOptions.addEventListener("click", onChange());
console.log(glazingOptions);
console.log(packSizeOptions);
// event handler

function onChange() {
  //change option attribute to selected
  value = glazingOptions.getElementById("");
  index = glazingOptions.index;
  text = glazingOptions.text;
  let list = [value, index, text];
  return list;
}

//onChange or onClick??
glazingOptions.onchange = onChange();
console.log(onChange());

function choosePackPrice() {
  console.log(packSize);
}

// chooseGlazingPrice();
// choosePackPrice();

//bs class definition/constructor
// class Roll {
//   rollName;
//   glazingPrice;
//   packingSizePrice;
// }

// constructor(rollName, glazingPrice, packingSizePrice); {
//   this.rollName = rollName;
//   this.glazingPrice = glazingPrice;
//   this.packingSizePrice = packingSizePrice;
// };

// total price change
let totalPrice = document.querySelector(".add-to-cart");

function updatePrice(glazingPriceVariable, n) {
  let newPrice = (basePrice + glazingPriceVariable) * packingSizePrices[n];
  console.log(newPrice);
  document.getElementById;
  return newPrice;
}

// totalPrice.textContent = updatePrice();
