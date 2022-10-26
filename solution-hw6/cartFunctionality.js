//This file manages all the functionality for the shopping cart
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
  calculatedPrice;
  // element;

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

  createElement(deleteFunction, cartEle) {
    //Copies the template from the HTML page to create HTML elements on the page, updates.
    let template = document.querySelector("#cart-item-template");

    let clone = template.content.cloneNode(true);
    const ele = clone.querySelector(".child-3-1");

    let container = document.querySelector(".container-3");
    container.prepend(ele);

    let deleteButton = ele.querySelector(".remove-button");
    deleteButton.addEventListener("click", () => {
      deleteFunction(".child-3-1", cartEle);
    });

    this.updateCart();
  }

  updateCart() {
    //Updates the elements on the page to reflect roll item information and saves cart info to local storage.
    let image = document.querySelector(".productimg");
    image.src = "products/" + this.imageURL;

    let name = document.querySelector("#title");
    name.innerHTML = this.rollType + " Cinnamon Roll";

    let price = document.querySelector("#price");
    price.innerHTML = formatter.format(this.basePrice);

    let glazing = document.querySelector("#glazing");
    glazing.innerHTML = this.rollGlazing;

    let packsize = document.querySelector("#packSize");
    packsize.innerHTML = "Pack Size: " + this.packSize;

    saveToLocalStorage();
    updateTotal();
  }
}
//Formats the finalPrice answer into a currency format.
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

//Cart Set
let cartSet = new Set();
if (localStorage.getItem("storedItems") != null) {
  cartSet = retrieveFromLocalStorage();
}

function addNewItem(rollType, rollGlazing, packSize, basePrice, imageURL) {
  //Function adds new item to cart.
  console.log("Adding item");
  const item = new CartItem(
    rollType,
    rollGlazing,
    packSize,
    basePrice,
    imageURL
  );

  return item;
}

function deleteItem(item, cartEle) {
  //Deleted item from DOM, local storage, and cart set.
  let HTMLelement = document.querySelector(item.toString());
  HTMLelement.remove();

  cartSet.delete(cartEle);

  let json = JSON.stringify(Array.from(cartSet));
  localStorage.setItem("storedItems", json);

  updateTotal();
  saveToLocalStorage();
}

function updateTotal() {
  //Updates the total price listed on the page.
  let total = 0;
  let cartArray = Array.from(cartSet);
  for (let item of cartArray) {
    total = total + parseFloat(item.basePrice);
  }
  let price = document.querySelector("#total");

  price.innerHTML = formatter.format(total);
  console.log("Total updated");
}

function calculatePrice(basePrice, glazingPrice, packPrice) {
  //Calculates the total price of the products.
  let finalPrice = (basePrice + glazingPrice) * packPrice;
  return finalPrice;
}

//------------------------------------------------------Homework 6 Local Storage-------------------------------------------------------//

function saveToLocalStorage() {
  //
  let cartArray = Array.from(cartSet);
  const cartArrayString = JSON.stringify(cartArray);

  localStorage.setItem("storedItems", cartArrayString);
  console.log(localStorage.getItem("storedItems"));
}

function retrieveFromLocalStorage() {
  const cartArrayString = localStorage.getItem("storedItems");
  let cartArray = JSON.parse(cartArrayString);
  for (const cartData of cartArray) {
    const cartItem = addNewItem(
      cartData.rollType,
      cartData.rollGlazing,
      cartData.packSize,
      cartData.basePrice,
      cartData.imageURL
    );
    cartItem.createElement(deleteItem, cartItem);
    cartSet.add(cartItem);
  }

  saveToLocalStorage();
  console.log("Retrieved local storage");
  return cartSet;
}

updateTotal();
