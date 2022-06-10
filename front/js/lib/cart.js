import { getProduct } from './api.js';

let cartContent = [];
if (localStorage.getItem('cart') !== null) cartContent = JSON.parse(localStorage.getItem('cart'));

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

// TODO => étape 8
    // 1) récupérer la liste des clés du local storage
    // 2) vérifier si cette clé correspond au modèle de nommage (id_color) des clés de produits sélectionnés par l'utilisateur
        // tu peux utiliser les regex pour ça
    // 3) si oui, récupérer le produit, le parser pour faire un objet javascript
    // ... suite de l'algo