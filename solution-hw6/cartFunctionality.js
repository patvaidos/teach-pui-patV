//This file manages all the functionality for the shopping cart

//Class definition for products added to the cart.
class CartItem {
  rollType;
  rollGlazing;
  packSize;
  basePrice;
  imageURL;
  // element;

  constructor(rollType, rollGlazing, packSize, basePrice, imageURL) {
    this.rollType = rollType;
    this.rollGlazing = rollGlazing;
    this.packSize = packSize;
    this.basePrice = basePrice;
    this.imageURL = imageURL;
  }

  createElement(deleteFunction, cartEle) {
    console.log("cartEle", cartEle);

    //Copies the template from the HTML page to create HTML elements on the page.

    let template = document.querySelector("#cart-item-template");
    console.log(template);
    let clone = template.content.cloneNode(true);
    const ele = clone.querySelector(".child-3-1");
    console.log("this.element: " + ele);

    let container = document.querySelector(".container-3");
    container.prepend(ele);

    let deleteButton = ele.querySelector(".remove-button");
    deleteButton.addEventListener("click", () => {
      deleteFunction(".child-3-1", cartEle);
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

function deleteItem(item, cartEle) {
  console.log(cartEle);
  //Deletes item from cart
  let HTMLelement = document.querySelector(item.toString());
  HTMLelement.remove();

  cartSet.delete(cartEle);

  let json = JSON.stringify(Array.from(cartSet));

  localStorage.setItem("storedItems", json);
  console.log("cartSet", cartSet);
  saveToLocalStorage();
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

//------------------------------------------------------Homework 6 Local Storage-------------------------------------------------------//

function saveToLocalStorage() {
  let cartArray = Array.from(cartSet);
  const cartArrayString = JSON.stringify(cartArray);

  localStorage.setItem("storedItems", cartArrayString);
  console.log(localStorage.getItem("storedItems"));
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
    cartItem.createElement(deleteItem, cartItem);
    console.log(cartSet);
    cartSet.add(cartItem);

    console.log("hererererer");
    console.log(cartItem);
    console.log(cartSet);
  }

  saveToLocalStorage();
  console.log("retrieved local storage");
  return cartSet;
}

updateTotal();
