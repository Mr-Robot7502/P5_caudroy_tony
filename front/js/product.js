// Selection de la couleur, de la quantité et de "ajouter au panier"//
// const colorId = document.querySelector("#colors");
// const quantityId = document.querySelector("#quantity");
// const addToCard = document.querySelector("addToCard");

// const getProductId = () => {
//   return new URL(location.href).searchParams.get("id");
// };
// const productId = getProductId();

// fetch("http://localhost:3000/api/products/${productId}")
// .then((res) => {
//   if(res.ok) 
//   return res.json();
// })

// const productchosen = document.querySelector(".item_img")
// .innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
// document.querySelector("#title").textContent;
// document.querySelector("#descripton").textContent;
// document.querySelector("#price");

import { getProducts } from './lib/api.js'

getProducts()