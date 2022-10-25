//This file manages all the functionality for the shopping cart

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
  }

  createElement(deleteFunction) {
    //Copies the template from the HTML page to create HTML elements on the page.

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

// console.log("retrieved local storage");
// } else {
//   let cartSet = new Set();
// }

// function addToCart() {
//   //Adds the current product to the global cart array
//   console.log("Add to cart function passed");
//   const item = addNewItem();
//   saveToLocalStorage();
// }

function addNewItem(rollType, rollGlazing, packSize, basePrice, imageURL) {
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

function deleteItem(item) {
  //Deletes item from cart
  console.log(item);
  cartSet.delete(item);
  item.element.remove();
  saveToLocalStorage();
  updateCart();
  updateTotal();
}

function cartFill(cart) {
  //Function to populate cart
  for (let thing of cart) {
    thing.createElement(deleteItem(thing));
    console.log("Filling your cart");
  }
  updateTotal();
}

function updateTotal() {
  //Updates the total price listed on the page.
  let total = 0;
  let cartArray = Array.from(cartSet);
  for (let item of cartArray) {
    total = total + item.basePrice;
    console.log(item.basePrice);
  }
  let price = document.querySelector("#total");

  price.innerHTML = formatter.format(total);
  console.log("Total updated");
}

function calculatePrice(basePrice, glazingPrice, packPrice) {
  //Calculates the total price of the products.
  let finalPrice = (basePrice + glazingPrice) * packPrice;
  console.log(finalPrice);
  return finalPrice;
}

// cartFill();
updateTotal();

//Homework 6 Local Storage

// function submitItem() {
//   const itemImage = document.querySelector(".productimg");
//   console.log(image);

//   const itemName = document.querySelector("#title");

//   const itemPrice = document.querySelector("#price");
//   itemPrice.innerHTML = this.calculatedPrice;

//   const itemGlazing = document.querySelector("#glazing");

//   const itemPackSize = document.querySelector("#packSize");

//   const cartItem = addNewItem(
//     itemName,
//     itemGlazing,
//     itemPackSize,
//     itemPrice,
//     itemImage
//   );
//   createElement(cartItem);

//   saveToLocalStorage();
// }

function saveToLocalStorage() {
  let cartArray = Array.from(cartSet);
  console.log(cartSet);
  console.log(cartArray);
  const cartArrayString = JSON.stringify(cartArray);
  console.log(cartArrayString);

  localStorage.setItem("storedItems", cartArrayString);
}

function retrieveFromLocalStorage() {
  const cartArrayString = localStorage.getItem("storedItems");
  // console.log(localStorage.getItem("storedItems"));
  let cartArray = JSON.parse(cartArrayString);
  for (const cartData of cartArray) {
    const cartItem = addNewItem(
      cartData.rollType,
      cartData.rollGlazing,
      cartData.packSize,
      cartData.basePrice,
      cartData.imageURL
    );
    cartItem.createElement(deleteItem);
    cartSet.add(cartItem);
    console.log(cartSet);
  }

  saveToLocalStorage();
  console.log("retrieved local storage");
  let newSet = new Set(cartArray);
  return newSet;
  // console.log(cartArray);
  // cartFill(cartArray);
}

// let deleteButton = this.element.querySelector(".remove-button");
// deleteButton.addEventListener("click", () => {
//   deleteFunction(".child-3-1");
// });
updateTotal();
