import { getProduct } from './lib/api.js';
import cart from './lib/cart.js';

const product_id = new URL(window.location.href).searchParams.get("id")

const img = document.createElement("img");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productColor = document.getElementById("colors");
const productImg = document.querySelector(".item__img");

let product = await getProduct(product_id);

document.title = product.name;
img.setAttribute("src", product.imageUrl);
img.setAttribute("alt", product.altTxt);
productImg.appendChild(img);
productTitle.textContent = product.name;
productPrice.textContent = product.price;
productDescription.textContent = product.description;

for (let i = 0; i < product.colors.length; i++) {
    let color = document.createElement("option");
    color.setAttribute("value", product.colors[i]);
    color.textContent = product.colors[i];
    productColor.appendChild(color);
}

/**
 * Ecouter sur l'évènement de click au panier
 * Pour pouvoir récupérer la quantité voulue (faire la vérification => quantité > 0 sinon erreur à afficher à l'utilisateur)
 */

// const product_string = JSON.stringify(product);
// console.log(product_string);
// console.log(JSON.parse(product_string));