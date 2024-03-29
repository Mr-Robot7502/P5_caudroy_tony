import { getLocalStorageKey } from './lib/localStorage.js';
import { getLocalStorageQuantity } from'./lib/localStorage.js';
/**
 * ici, on fait en sorte d'exécuter le JS uniquement si la page HTML a été chargée * 
 */
window.addEventListener('DOMContentLoaded', async () => {

    let productsList = [];

    /**    Récuperation des produits du panier **/
    for (let i = 0; i < localStorage.length; i++) {
        // obtenir les produits à partir des clés du local storage
        const key = localStorage.key(i);
        // on ajoute le produit récupéré depuis le local storage grâce à la clé dans le tableau de produits créé précédemment 
        productsList.push(JSON.parse(localStorage[key]));
    }

    const titleCart = document.querySelector("h1");
    const sectionCart = document.querySelector(".cart");
    // Si mon local storage est vide //
    if (productsList.length == 0) {
        titleCart.innerHTML = "Votre panier est vide";
        sectionCart.style.display = "none";
        console.log("panier vide");
    } else {
        // Affichage des produits du LocalStorage, si panier le panier n'est pas vide  //
        const productCart = document.querySelector("#cart__items");

        // boucle pour insérer les articles un à un
        productsList.forEach(product => {
            // remplissage du template avec les bonnes données de produits
            const article = document.createElement("article");
            article.setAttribute("data-id", product.product_id);
            article.setAttribute("data-color", product.color);
            article.classList.add("cart__item");
            article.innerHTML = `<div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.description}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.color}</p>
                    <p>${product.price}€</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : ${product.quantity}</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>`;
            // insertion d'un produit dans le HTML
            productCart.appendChild(article);
            console.log(article)
        });
    }
    //*************************** Sélection du bouton supprimer **************************************//

    const btnDelete = document.querySelectorAll(".deleteItem");
    console.log(btnDelete)
    // boucle avec evenement lorsque je clique sur le bouton supprimer
    for (let i = 0; i < btnDelete.length; i++) {
        btnDelete[i].addEventListener("click", (event) => {
            // produit selectionné lorsque je clique sur le bouton supprimer
            let productToDeleteName = productsList[i].name;
            let productToDeleteId = productsList[i].product_id;
            let productToDeleteColor = productsList[i].color;
            // on récupère la clé du produit à supprimer dans le local storage
            let productToDeleteLocalStorageKey = getLocalStorageKey(productToDeleteId, productToDeleteColor);
            console.log(productToDeleteLocalStorageKey)
            // on écrase la variable products list avec le résultat du filtrage qui exclut le produit à supprimer
            productsList = productsList.filter(elt => elt.product_id !== productToDeleteId);
            // on supprime ce produit du local storage directement
            localStorage.removeItem(productToDeleteLocalStorageKey);
            console.log(localStorage);
            // refresh products list
            const productToDeleteHTMLElement = document.querySelector(`[data-id="${productToDeleteId}"][data-color="${productToDeleteColor}"]`);
            productToDeleteHTMLElement.remove();
            console.log(productToDeleteHTMLElement.remove);
            alert("Le " + productToDeleteName + " " + productToDeleteColor + " est supprimé")
        })
    };


    //*************************** Sélection de la quantité **************************************//


    const btnQuantity = document.querySelectorAll(".itemQuantity");
    console.log(btnQuantity)

    for (let q = 0; q < btnQuantity.length; q++) {
        btnQuantity[q].addEventListener("click", (event) => {
       
           // produit sélectionner lorsque je clique sur le bouton pour modifier la quantité
           let productToChangeName = productsList[q].name;
           console.log(productToChangeName)
           let productToChangeColor = productsList[q].color;
           console.log(productToChangeColor);
            let productToChangeId = productsList[q].product_id;
            console.log(productToChangeId)
            productsList[q].quantity = event.target.value;
            let productToChangeQuantity = productsList[q].quantity;
            console.log(productToChangeQuantity);
           // productsList = productsList.filter(elt => elt.product_id !== productToChangeQuantity);
            //console.log(productsList);
            let productToChangeQuantityInLocalStorageKey = getLocalStorageKey(productToChangeId, productToChangeColor);
            console.log(productToChangeQuantityInLocalStorageKey);
            productsList = productsList.filter(elt => elt.product_id !== productToChangeQuantity);

            localStorage.setItem(productToChangeQuantityInLocalStorageKey, JSON.stringify(productsList));
            console.log(localStorage)
          
        })
    };
    //*******variable prix total panier*******//

    let totalKanap = [];
    for (let q = 0; q < productsList.length; q++) {
        let productQuantity = productsList[q].quantity;
        totalKanap.push(productQuantity);
    };

    let totalBasket = [];
    for (let p = 0; p < productsList.length; p++) {
        let productPrice = productsList[p].price* productsList[p].quantity;
        totalBasket.push(productPrice);

        let reducerBasket = (accumulator, currentValue) => accumulator + currentValue;
        let totalBasketPrice = totalBasket.reduce(reducerBasket, 0);
        let reducerQuantity = (accumulator, currentValue) => accumulator + currentValue;
        let totalBasketQuantity = totalKanap.reduce(reducerQuantity, 0);
        let updateTotal = document.querySelector(".cart__price");
        updateTotal.innerHTML = `
            <div class="cart__price">
                        <p>Total (<span id="totalQuantity">${totalBasketQuantity}</span> articles) : <span id="totalPrice">${totalBasketPrice}</span> €</p>
                    </div>`;
    };

    function handleOrder() {
        // TODO logique de validation du formulaire
        // Ajout des Regex
        let form = document.querySelector(".cart__order__form");
        // //Création des expressions régulières
        let emailRegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        let nameRegExp = new RegExp(/^[a-zA-Z ,.'-]+$/);
        let addressRegExp = new RegExp(/^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/);

    }
})









