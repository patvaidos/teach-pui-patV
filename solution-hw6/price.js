//This JS file contains functionality for changing the product on the product details page (product.html) and updating the cart.
//Homework 3 and 4

class Roll {
  //The class Roll contains the product name (rollType), the glazing option (rollGlazing), the pack size (packSize), the base price (basePrice),
  //and the image URL directory (imageURL)
  rollType;
  rollGlazing;
  packSize;
  basePrice;
  imageURL;
  calculatedPrice;

  constructor(rollType, rollGlazing, packSize, basePrice, imageURL) {
    this.rollType = rollType;
    this.rollGlazing = rollGlazing;
    this.packSize = packSize;
    this.basePrice = basePrice;
    this.imageURL = imageURL;
  }

  updateElement() {
    //This function updates the DOM with the chosen object's properties (name, image, and price)
    let headerElement = document.querySelector(".product-subheading h2");
    headerElement.innerHTML = this.rollType + " Cinnamon Roll";

    let rollImage = document.querySelector(".productimg");
    rollImage.src = "products/" + this.imageURL;

    let rollPrice = document.querySelector("#total");
    rollPrice.innerHTML = "$" + this.basePrice;
  }
}
let cart = [];
if (localStorage.getItem("storedItems") != null) {
  let cart = retrieveFromLocalStorage();
} else {
  let cart = [];
}

//Global variables are defined here
let currentProduct;
const basePrice = 2.49;
let currentProductGlazing;
let currentProductPack;

//Default indexes for the glazing and pack inventories
let glazingIndex = 0;
let packIndex = 0;

//Array of objects to be added/removed from cart.

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

//-----------------Logic for adjusting price based on Glazing and Pack size choice. User can click on the-----------------------------------
//-------glazing and pack size options for their order using the dropdown menu and the price will update based on choice.--------------------

//Variables store the selected HTML element for glazing and pack size respectfully.
let selectGlazing = document.querySelector("#Glazing-Options");
let packSelect = document.querySelector("#Pack-Size");

function glazingValueChange() {
  //Takes the glazing value from HTML element and calculates the index to retrieve the value. Calculates price from index.

  glazingIndex = parseInt(selectGlazing.value);

  calculatePrice(glazingIndex, 0);
  currentProductGlazing = glazingIndex;
}

function packValueChange() {
  //Takes the pack value from HTML element and calculates the index to retrieve the value. Calculates price from index.

  packIndex = parseInt(packSelect.value);

  calculatePrice(0, packIndex);
  currentProductPack = packIndex;
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

function calculatePrice(glazing, pack) {
  //Calculates the final price of the purchase by using a price formula with variables from the glazing & pack size arrays.
  let finalPrice = currentProduct.basePrice;
  let selectedGlaze = glazingArray[glazingIndex].priceChange;
  let selectedPack = packArray[packIndex].priceChange;
  finalPrice = (currentProduct.basePrice + selectedGlaze) * selectedPack;
  finalPrice = finalPrice.toString();
  document.querySelector("#total").innerText = formatter.format(finalPrice);
}

//Formats the finalPrice answer into a currency format.
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

//Function calls for dynamically populating the dropdown menus
createGlazingDropdown();
createPackDropdown();

//------------------Here is the code for updating the DOM elements to match the user choice from the gallery menu.------------------------------
function parseProducts() {
  //Function that takes user input from Gallery page and creates a new Roll object and check choice against rollsData.js.
  //Defines the currentProduct global variable to remember choice for adding to cart.
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const chosenRoll = params.get("roll");

  let instanceProduct;
  rolls[chosenRoll];
  instanceProduct = new Roll(
    chosenRoll,
    currentProductGlazing,
    currentProductPack,
    rolls[chosenRoll].basePrice,
    rolls[chosenRoll].imageFile
  );
  instanceProduct.updateElement();
  console.log("Product base price: " + rolls[chosenRoll].basePrice);
  currentProduct = instanceProduct;
}

//Function call to parse products.
parseProducts();

// //Add to cart element

function addItemToCart(item) {
  cart.push(item);
  saveToLocalStorage();
}

let addButton = document.querySelector("#add_to_cart");
addButton.addEventListener("click", () => {
  addItemToCart(currentProduct);
});

//Homework 6 Code
function addNewItem(rollType, rollGlazing, packSize, basePrice, imageURL) {
  const item = new Roll(rollType, rollGlazing, packSize, basePrice, imageURL);
  addItemToCart(item);
  console.log("new item added!: " + cart);
  return item;
}
// function submitItem() {
//   const itemImage = document.querySelector(".productimg");

//   const itemName = document.querySelector("#title");

//   const itemPrice = document.querySelector("#price");

//   const itemGlazing = document.querySelector("#glazing");

//   const itemPackSize = document.querySelector("#packSize");

//   const cartItem = addNewItem(
//     itemName,
//     itemGlazing,
//     itemPackSize,
//     itemPrice,
//     itemImage
//   );
//   // createElement(cartItem);
//   cart.add(cartItem);
//   console.log(cartItem);
//   saveToLocalStorage();
// }

function saveToLocalStorage() {
  const cartArray = Array.from(cart);
  console.log("current cart: " + cart);
  console.log("cartArray: " + cartArray);
  const cartArrayString = JSON.stringify(cartArray);

  localStorage.setItem("storedItems", cartArrayString);
}

function retrieveFromLocalStorage() {
  const cartArrayString = localStorage.getItem("storedItems");
  const cartArray = JSON.parse(cartArrayString);
  for (const cartData of cartArray) {
    const cartItem = addNewItem(
      cartData.rollType,
      cartData.rollGlazing,
      cartData.packSize,
      cartData.basePrice,
      cartData.imageURL
    );

    console.log("cart from local storage: ");
    console.log(cart);
  }
  return cartArray;
}
