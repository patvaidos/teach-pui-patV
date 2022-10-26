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
//Default indexes for the glazing and pack inventories
let glazingIndex = 0;
let packIndex = 0;

//Global variables are defined here
let currentProduct;

const basePrice = 2.49;
let currentProductGlazing;
let currentProductPack;

let cart = [];

if (localStorage.getItem("storedItems") != null) {
  cart = retrieveFromLocalStorage();
}

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
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const chosenRoll = params.get("roll");
  rolls[chosenRoll];

  let finalPrice = currentProduct.basePrice;
  let selectedGlaze = glazingArray[glazingIndex].priceChange;
  let selectedPack = packArray[packIndex].priceChange;
  finalPrice =
    (rolls[currentProduct.rollType].basePrice + selectedGlaze) * selectedPack;
  finalPrice = finalPrice.toString();
  document.querySelector("#total").innerText = formatter.format(finalPrice);
  currentProduct.basePrice = finalPrice;
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
  currentProduct = instanceProduct;
}

//Function call to parse products.
parseProducts();

// //Add to cart element
function addItemToCart(item) {
  let cartThing = createCartItem(
    item.rollType,
    glazingArray[selectGlazing.value].optionName,
    packArray[packSelect.value].optionName,
    item.basePrice,
    item.imageURL,
    item.calculatedPrice
  );

  cart.push(cartThing);
  console.log(cart);
  saveToLocalStorage();
}

//Button with event listener for add to cart button
let addButton = document.querySelector("#add_to_cart");
addButton.addEventListener("click", () => {
  addItemToCart(currentProduct);
});

//-------------------------------------------------------------------------Homework 6 Code-------------------------------------------------------------------------//
function createCartItem(rollType, rollGlazing, packSize, basePrice, imageURL) {
  //Creates a new cart
  const item = new Roll(rollType, rollGlazing, packSize, basePrice, imageURL);
  return item;
}

function saveToLocalStorage() {
  //Saves cart objects to local storage
  const cartArray = Array.from(cart);
  const cartArrayString = JSON.stringify(cartArray);
  localStorage.setItem("storedItems", cartArrayString);
}

function retrieveFromLocalStorage() {
  //Retrieves items from local storage
  const cartArrayString = localStorage.getItem("storedItems");
  const cartArray = JSON.parse(cartArrayString);
  for (const cartData of cartArray) {
    const cartItem = createCartItem(
      cartData.rollType,
      cartData.rollGlazing,
      cartData.packSize,
      cartData.basePrice,
      cartData.imageURL
    );
  }
  return cartArray;
}
