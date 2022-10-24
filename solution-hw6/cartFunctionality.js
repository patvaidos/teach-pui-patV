//This file manages all the functionality for
//Map of glazing names and price changes
const glazingMap = {
  Original: 0,
  "Sugar milk": 0,
  "Vanilla milk": 0.5,
  "Double chocolate": 1.5,
};

//Map of pack sizes and price changes
const packMap = {
  1: 1,
  3: 3,
  6: 5,
  12: 10,
};

//Class definition for products added to the cart.
class CartItem {
  rollType;
  rollGlazing;
  packSize;
  basePrice;
  imageURL;
  element;

  constructor(rollType, rollGlazing, packSize, basePrice, imageURL) {
    this.rollType = rollType;
    this.rollGlazing = rollGlazing;
    this.packSize = packSize;
    this.basePrice = basePrice;
    this.imageURL = imageURL;

    //This calls the calculatePrice() function later in the document and uses the mapped glazing and pack size price changes
    this.calculatedPrice = calculatePrice(
      this.basePrice,
      glazingMap[this.rollGlazing],
      packMap[this.packSize]
    );
  }

  createElement(deleteFunction) {
    //Copies the template from the HTML page to create HTML elements on the page.
    console.log("Adding item");
    let template = document.querySelector("#cart-item-template");
    console.log(template);
    let clone = template.content.cloneNode(true);
    this.element = clone.querySelector(".child-3-1");
    console.log("this.element: " + this.element);

    let container = document.querySelector(".container-3");
    container.prepend(this.element);

    let deleteButton = this.element.querySelector(".remove-button");
    deleteButton.addEventListener("click", () => {
      deleteFunction(".child-3-1");
    });

    this.updateCart();
  }

  updateCart() {
    //Updates the elements on the page to reflect roll item information
    let image = document.querySelector(".productimg");
    console.log(image);
    image.src = this.imageURL;

    let name = document.querySelector("#title");
    name.innerHTML = this.rollType + " Cinnamon Roll";

    let price = document.querySelector("#price");
    price.innerHTML = formatter.format(this.calculatedPrice);

    let glazing = document.querySelector("#glazing");
    glazing.innerHTML = this.rollGlazing;

    let packsize = document.querySelector("#packSize");
    packsize.innerHTML = "Pack Size: " + this.packSize;

    saveToLocalStorage();
  }
}

//Cart Set
let cartSet = new Set();
console.log(cartSet);
// function addToCart() {
//   //Adds the current product to the global cart array
//   console.log("Add to cart function passed");
//   const item = addNewItem();
//   saveToLocalStorage();
// }

function addNewItem(rollType, rollGlazing, packSize, basePrice, imageURL) {
  const item = new CartItem(
    rollType,
    rollGlazing,
    packSize,
    basePrice,
    imageURL
  );
  cartSet.add(item);
  console.log(cartSet);
  return item;
}

function deleteItem(item) {
  //Deletes item from cart
  item.element.remove();
  cartSet.delete(item);
  saveToLocalStorage();
}

// function cartFill() {
//   //Function to populate cart
//   for (let item of cart) {
//     item.createElement(() => {
//       deleteItem(item);
//     });
//   }
// }

function updateTotal() {
  //Updates the total price listed on the page.
  let total = 0;
  for (let item of cartSet) {
    console.log(cartSet);
    total = total + item.calculatedPrice;
  }
  let price = document.querySelector("#total");
  price.innerHTML = formatter.format(total);
}

function calculatePrice(basePrice, glazingPrice, packPrice) {
  //Calculates the total price of the products.
  return (basePrice + glazingPrice) * packPrice;
}

//Formats the finalPrice answer into a currency format.
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// cartFill();

//Homework 6 Local Storage

function submitItem() {
  const itemImage = document.querySelector(".productimg");
  console.log(image);

  const itemName = document.querySelector("#title");

  const itemPrice = document.querySelector("#price");
  // itemPrice.innerHTML = formatter.format(this.calculatedPrice);

  const itemGlazing = document.querySelector("#glazing");

  const itemPackSize = document.querySelector("#packSize");

  const cartItem = addNewItem(
    itemName,
    itemGlazing,
    itemPackSize,
    itemPrice,
    itemImage
  );
  createElement(cartItem);

  saveToLocalStorage();
}

function saveToLocalStorage() {
  const cartArray = Array.from(cartSet);
  console.log(cartSet);
  console.log(cartArray);
  const cartArrayString = JSON.stringify(cartArray);
  console.log(cartArrayString);

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
    createElement(cartItem);
    console.log(cartSet);
  }
}

if (localStorage.getItem("storedItems") != null) {
  retrieveFromLocalStorage();
}

updateTotal();
