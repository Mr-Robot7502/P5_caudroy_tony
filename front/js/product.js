import { getProduct } from './lib/api.js';
import { addToCart } from './lib/cart.js';

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
    addToCart(product._id, color, quantity);
}

btnAdd.addEventListener('click', buttonAddToCartClicked);

/**
 * @todo appeler une fonction updateProductPage
 */
// updateProductPage();