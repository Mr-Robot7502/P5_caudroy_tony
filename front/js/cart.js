/**
 * ici, on fait en sorte d'exécuter le JS uniquement si la page HTML a été chargée * 
 */
 window.addEventListener('DOMContentLoaded', async () => {

    let productsList = [];
    
    /**    Récuperation des produits du panier **/
    for(let i = 0; i < localStorage.length; i++) {
        // obtenir les produits à partir des clés du local storage
        const key = localStorage.key(i);
        // on ajoute le produit récupéré depuis le local storage grâce à la clé dans le tableau de produits créé précédemment 
        productsList.push(JSON.parse(localStorage[key]));
    }
    console.log(productsList);

    const titleCart = document.querySelector("h1");
    const sectionCart = document.querySelector(".cart");
    // Si mon local storage est vide //
    if(productsList.length == 0) {
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
            article.setAttribute("data-id", product._id);
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
    //Sélection du bouton supprimer//
    const btnDelete = document.querySelectorAll(".deleteItem")
    console.log(btnDelete)
   // boucle avec evenement lorsque je clique sur le bouton supprimer
    for (let i = 0; i < btnDelete.length; i++){
        btnDelete[i].addEventListener("click", (event) =>{
            event.preventDefault();
            
            // produit selectionné lorsque je clique sur le bouton supprimer
            let deleteId = productsList[i].product_id;
            console.log(deleteId)
        })
    }

});

