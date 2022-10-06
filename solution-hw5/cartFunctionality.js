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
  }
}

//Cart Set
let cart = new Set();

//Populate cart with items
let original = new CartItem(
  "Original",
  "Sugar milk",
  1,
  2.49,
  "products/original-cinnamon-roll.jpg"
);
cart.add(original);

let walnut = new CartItem(
  "Walnut",
  "Vanilla milk",
  12,
  3.49,
  "products/walnut-cinnamon-roll.jpg"
);
cart.add(walnut);

let raisin = new CartItem(
  "Raisin",
  "Sugar milk",
  3,
  2.99,
  "products/raisin-cinnamon-roll.jpg"
);
cart.add(raisin);

let apple = new CartItem(
  "Apple",
  "Original",
  3,
  3.49,
  "products/apple-cinnamon-roll.jpg"
);
cart.add(apple);

function addToCart(roll) {
  //Adds the current product to the global cart array
  console.log("Add to cart function passed");
  roll.createElement(deleteItem);
}

function deleteItem(item) {
  //Deletes item from cart
  item.element.remove();
  cart.delete(item);
}

function sampleCartFill() {
  //Function to populate cart
  for (let item of cart) {
    item.createElement(() => {
      deleteItem(item);
    });
  }
}

function updateTotal() {
  //Updates the total price listed on the page.
  let total = 0;
  for (let item of cart) {
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

sampleCartFill();
updateTotal();
