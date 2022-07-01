import { getLocalStorageKey } from './lib/localStorage.js';
import { getProduct } from './lib/api.js';

/**
 * ici, on fait en sorte d'exécuter le JS uniquement si la page HTML a été chargée * 
 */
window.addEventListener('DOMContentLoaded', async () => {

    // on récupère l'id du produit depuis l'URL
    const product_id = new URL(window.location.href).searchParams.get("id");

    // on récupère les différents éléments HTML avec lesquels on va interagir
    const btnAddHTMLElement = document.querySelector("#addToCart");
    const productTitle = document.querySelector("#title");
    const productPrice = document.querySelector("#price");
    const productDescription = document.querySelector("#description");
    const productColorHTMLElement = document.querySelector("#colors"); // il s'agit du select contenant les options de couleur
    const productImg = document.querySelector(".item__img");
    const quantityInputHTMLElement = document.querySelector('#quantity'); // il s'agit de l'input de quantité

    // on récupère le produit depuis l'API (le backend )
    const product = await getProduct(product_id);
    
    // on change le titre de la page HTML
    document.title = product.name;

    // on va insérer dans la page les informations du produit pour un rendu visuel

    /**
     *  1)  on définit l'image du produit qu'on va insérer dans le DOM
     *      cet object image n'est pas pour l'instant affiché, il est juste en mémoire;
     *  2)  on définit les attributs de l'image (src, alt)
     *  3)  on insère l'image dans le DOM dans la div prévue à cet effet => `productImg.appendChild(img);`
     */
    const img = document.createElement("img");
    img.setAttribute("src", product.imageUrl);
    img.setAttribute("alt", product.altTxt);
    productImg.appendChild(img);

    // on fait pareil qu'avec l'image pour le contenu textuel du produit à afficher à l'utilisateur
    productTitle.textContent = product.name;
    productPrice.textContent = product.price;
    productDescription.textContent = product.description;
    
    // on remplit le select avec toutes les options de couleur
    for (let i = 0; i < product.colors.length; i++) {
        let color = document.createElement("option");
        color.setAttribute("value", product.colors[i]);
        color.textContent = product.colors[i];
        productColorHTMLElement.appendChild(color);
    }
    
    /**
     * fonction qui définit ce qu'il se passe quand on ajoute quelque chose au panier
     * 
     */
    function addToCart(product_id, color, quantity) {
        // on transforme en nombre entier la valeur de quantité récupérée depuis le HTML
        quantity = parseInt(quantity, 10); 
        
        /**
         * démonstration du fait qu'un JSON est la représentation sous forme de chaîne de caractères d'un objet JavaScript
         */
         const selectedProductToStoreInLocalStorage = {product_id, color, quantity}; // ceci est égal à {product_id: product_id, color: color, quantity: quantity}
         // ! la syntaxe raccourcie pour créer un objet ne fonctionne que si le nom de la variable et le nom de la clé dans l'objet sont les mêmes
         selectedProductToStoreInLocalStorage.name = product.name;
         selectedProductToStoreInLocalStorage.description = product.description;
         selectedProductToStoreInLocalStorage.price = product.price;
         selectedProductToStoreInLocalStorage.imageUrl = product.imageUrl;

         // récupération depuis le local storage
         // ! la valeur récupérée est un string
         let productObj = null;
         let productFromLocalStorage = localStorage.getItem(`${product_id}_${color}`);


        /* Je vérifie si on paner est vide, si c'est le cas, j'ajoute le produit*/
        if (!productFromLocalStorage) {
            //stockage dans le local storage
            localStorage.setItem(`${product_id}_${color}`, JSON.stringify(selectedProductToStoreInLocalStorage));
        } else {
            productObj = JSON.parse(productFromLocalStorage);
            productObj.quantity = productObj.quantity + quantity;
            localStorage.setItem(getLocalStorageKey(product_id, color), JSON.stringify(productObj));
            console.log(productObj)
        } 
        console.log(product)
    }


    /**
     * on utilise souvent le mot "handle" pour désigner des fonctions, qui réagissent à des évènements;
     * c'est une convention de nommer ce type de fonction selon le modèle handleSomething;
     * exemples =>
     *  - handleClick
     *  - handleChange
     *  - handleUserScrolledOnPage
     */
    function handleAddToCartClick() {
        const color = productColorHTMLElement.value;
        const quantity = quantityInputHTMLElement.value;
        if (quantity < 1 || quantity > 100) {
            alert("Veuillez saisir une quantité en 1 et 100");
            return; // on arrête la fonction
        }
        if (!color) {
            alert("Veuillez saisir une couleur");
            return;
        }
       
        addToCart(product._id, color, quantity);
         alert("Ajout du "+ document.title + " " + color );
    }
    btnAddHTMLElement.addEventListener('click', handleAddToCartClick);
    
});


