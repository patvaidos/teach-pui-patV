const basePrice = 2.49;
const glazingPriceVariables = [0, 0, 0.5, 1.5];
packingSizePrices = [1, 3, 5, 10];
//
function choosePrice() {}

function updatePrice(glazingPriceVariable, n) {
  newPrice = (basePrice + glazingPriceVariable) * packingSizePrices[n];
  console.log(newPrice);
  return newPrice;
}
