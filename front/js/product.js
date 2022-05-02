import { getProduct } from './lib/api.js';
import cart from './lib/cart.js';

const product_id = new URL(window.location.href).searchParams.get("id");
const btnAdd = document.querySelector("#addToCart");
const productTitle = document.querySelector("#title");
const productPrice = document.querySelector("#price");
const productDescription = document.querySelector("#description");
const productColor = document.querySelector("#colors");
const productImg = document.querySelector(".item__img");
const quantityInput = document.querySelector('#quantity');
const product = await getProduct(product_id);



/**
 * @todo Mettre dans une fonction updateProductPage
 */
document.title = product.name;
const img = document.createElement("img");
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
 * End todo
 */

// écouter l'évenement
//Lorsque je clique sur "ajouter au panier", je stocke le produit 


function buttonAddToCartClicked() {
    const color = productColor.value;
    const quantity = quantityInput.value;


    if (quantity < 1 || quantity > 100) {
        alert("Veuillez saisir une quantité en 1 et 100");
        return;
    }
    if (!color) {
        alert("Veuillez saisir une couleur");
        return;
    }
    alert("Ajout effectué");
    cart.addToCart(product._id, color, quantity);
}
// supprimer un produit du panier 
function removeToCart(product_id) {};
// Changer la quantité d'un produit dans le panier
function quantityToCart(product_id, quantity) {};

// cart.addProduct(product, quantity, color);
// cart.removeProduct(product.id);
// cart.updateProductQuantity(product.id, 6);

btnAdd.addEventListener('click', buttonAddToCartClicked);



// updateProductPage();