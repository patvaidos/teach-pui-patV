// define constants
const basePrice = 2.49;
const glazingPriceVariables = [0, 0, 0.5, 1.5];
const packingSizePrices = [1, 3, 5, 10];

// retrieve elements from HTML dropdown menus
const dropdown = document.getElementsByClassName("dropdown_content");
console.log(dropdown);
const glazing = dropdown[0];
const packSize = dropdown[1];

// event handler

function chooseGlazingPrice() {
  console.log(glazing);
}

function choosePackPrice() {
  console.log(packSize);
}

chooseGlazingPrice();
choosePackPrice();
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
