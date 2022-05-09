import { getProduct } from './api.js';

let cartContent = [];
if (localStorage.getItem('cart') !== null) cartContent = JSON.parse(localStorage.getItem('cart'));

// Ajouter au panier 

function addToCart(product_id, color, quantity) {

    quantity = parseInt(quantity, 10);

    const productFound = cartContent.find(cartItem => cartItem.product_id === product_id && cartItem.color === color);

    if (productFound !== undefined) {
        productFound.quantity += quantity;
    } else {
        cartContent.push({
            product_id: product_id,
            color: color,
            quantity: quantity,
        });
    }

    // Update du localstorage
    localStorage.setItem('cart', JSON.stringify(cartContent));
}

/*function deleteFromCart(product_id) {
    const productFound = cartContent.filter(cartItem => cartItem.product_id !== product_id)
    console.log(productFound)
    // Algo de suppression

    // Update du localstorage
    localStorage.setItem('cart', JSON.stringify(cartContent));
    console.log(cartContent)
}
*/

async function getCart() {
    return await Promise.all(cartContent.map(async content => {
        const product = await getProduct(content.product_id);

        return {
            product,
            quantity: content.quantity,
            color: content.color
        }
    }));
}

export { // Méthodes exposées vers l'extérieur
    addToCart,
    getCart,
}