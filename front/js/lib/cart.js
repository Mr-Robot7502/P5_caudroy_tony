// Avoir une variable qui permet de stocker les produits...
// Avoir une méthode pour récupérer et mettre à jour depuis le localstorage

const cartContent = [];

function addToCart(product_id, color, quantity) {
    cartContent.push({
        product_id: product_id,
        color: color,
        quantity: quantity,
    });

    console.log(cartContent);
}

export default { // Méthodes exposées vers l'extérieur
    addToCart
    // Méthode suppression du panier
    // Méthode mise à jour quantité d'un produit dans le panier
}