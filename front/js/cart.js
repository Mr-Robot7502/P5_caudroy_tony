//Affichage des produits dans le panier 
function populateProductsInCart() {
    const product_id = new URL(window.location.href).searchParams.get("id");
    const productList = document.querySelector("#cart_items");
}