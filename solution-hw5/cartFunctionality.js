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

  populateCart(deleteFunction) {
    console.log("Adding item");
    let template = document.querySelector("#cart-item-template");
    console.log(template);
    let clone = template.content.cloneNode(true);
    this.element = clone.querySelector(".child-3-1");
    console.log("this.element: " + this.element);

    let container = document.querySelector(".container-3");
    container.prepend(this.element);

    // let image = document.querySelector("#productimg");
    // console.log(image);
    // image.src = this.imageURL;

    // let name = document.querySelector("title");
    // name.innerHTML = this.rollType + " Cinnamon Roll";

    // let price = document.querySelector(".price");
    // price.innerHTML = currentProduct.basePrice;

    // let glazing = document.querySelector(".glazing");
    // glazing = this.rollGlazing;

    // let packsize = document.querySelector(".packSize");
    // packsize = this.packSize;

    let deleteButton = this.element.querySelector("#remove-button");
    deleteButton.addEventListener("click", deleteFunction);

    this.updateCart();
  }
  updateCart() {
    let image = document.querySelector(".productimg");
    console.log(image);
    image.src = this.imageURL;

    let name = document.querySelector("#title");
    name.innerHTML = this.rollType + " Cinnamon Roll";

    let price = document.querySelector("#price");
    price.innerHTML = this.basePrice;

    let glazing = document.querySelector("#glazing");
    glazing = this.rollGlazing;

    let packsize = document.querySelector("#packSize");
    packsize = this.packSize;
  }
}

//Cart Array
let cart = [];

//Populate cart with items
let original = new CartItem(
  "Original",
  "Sugar Milk",
  1,
  2.49,
  "products/original-cinnamon-roll.jpg"
);
cart.push(original);

let walnut = new CartItem(
  "Walnut",
  "Vanilla Milk",
  12,
  39.9,
  "products/walnut-cinnamon-roll.jpg"
);
cart.push(walnut);

let raisin = new CartItem(
  "Raisin",
  "Sugar Milk",
  3,
  8.97,
  "products/raisin-cinnamon-roll.jpg"
);
cart.push(raisin);

let apple = new CartItem(
  "Apple",
  "Original",
  3,
  10.47,
  "products/apple-cinnamon-roll.jpg"
);
cart.push(apple);

console.log(cart);

//Add to cart element
// let cartElement = document.getElementById("add_to_cart");

// //Add to cart event handler.
// cartElement.onclick = addToCart;

function addToCart(roll) {
  //Adds the current product to the global cart array
  roll.populateCart(deleteItem);
  //   cart.push();
  console.log(cart);
}

function deleteItem(item) {
  //Deletes item from cart
  item.removeElement();
  cart.delete(item);
}

function sampleCartFill() {
  //Function to populate cart
  for (let item of cart) {
    addToCart(item);
  }
}
sampleCartFill();
