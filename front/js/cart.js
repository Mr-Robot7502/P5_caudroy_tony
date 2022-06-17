import { getProduct } from './lib/api.js';

/**
 * ici, on fait en sorte d'exécuter le JS uniquement si la page HTML a été chargée * 
 */
 window.addEventListener('DOMContentLoaded', async () => {

    let userSelectedProducts = [];
    
    /**
     * Récuperation des produits du panier
     * 
     * 1) on ne sait pas à l'avance combien de produits sont dans le local storage, on doit vérifier si le local storage contient des clés
     * 2) on liste les clés du local storage existantes dans un tableau
     * 3) je boucle sur chacune de ces clés pour récupérer les valeurs de produits stockées par l'utilisateur
     * 
     */
    let localStorageKeys = [];
    for(let index = 0; index < localStorage.length; index++) {
        localStorageKeys.push(localStorage.key(index));
    }
    console.log(localStorageKeys);

    // TODO => étape 8
        // 1) récupérer la liste des clés du local storage
        // 2) vérifier si cette clé correspond au modèle de nommage (id_color) des clés de produits sélectionnés par l'utilisateur
            // tu peux utiliser les regex pour ça
        // 3) si oui, récupérer le produit, le parser pour faire un objet javascript
        // ... suite de l'algo

 });

