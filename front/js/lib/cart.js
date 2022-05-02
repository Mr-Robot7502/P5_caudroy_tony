// Avoir une variable qui permet de stocker les produits...
// Avoir une méthode pour récupérer et mettre à jour depuis le localstorage

let cartContent = [];
if (localStorage.getItem('cart') !== null) cartContent = JSON.parse(localStorage.getItem('cart'));

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

/**
    function deleteFromCart() {
        // Algo de suppression

        // Update du localstorage
    }
*/

export default { // Méthodes exposées vers l'extérieur
    addToCart,
    // Méthode suppression du panier
    // Méthode mise à jour quantité d'un produit dans le panier
}