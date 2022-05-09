import { getCart } from './lib/cart.js';

const cartContent = await getCart();
console.log(cartContent)

const listItem = document.querySelector("#cart__items");