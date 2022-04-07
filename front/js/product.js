import { getProduct } from './lib/api.js';
//import cart from './lib/cart.js';

const product_id = new URL(window.location.href).searchParams.get("id")


console.log("DEBUT RECUPERATION PRODUIT AVEC ID PRODUIT", product_id);

console.log("JE RECUPERE UN PRODUIT", await getProduct(product_id));

const img = document.createElement("img");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productColor = document.getElementById("colors");
const productImg = document.querySelector(".item__img");

productImg.appendChild(img);

getArticle();

async function getArticle() {
    await fetch("http://localhost:3000/api/products/" + product_id)
    .then((response) => response.json())    
    .then(product => {
        img.setAttribute("src", product.imageUrl);
        img.setAttribute("alt", product.altTxt);    
        productTitle.textContent = product.name;
        productPrice.textContent = product.price;
        productDescription.textContent = product.description;
        document.title = product.name;
        
        for (let i=0; i < product.colors.length; i++) {
            let color = document.createElement("option");
            color.setAttribute("value", product.colors[i]);
            color.textContent = product.colors[i];
            productColor.appendChild(color);
        }  
    });          
}
    

