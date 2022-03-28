// Execution requête et récupération du résultat au format json//
// fetch("http://localhost:3000/api/products")
//     .then(function(res) {
//         if (res.ok)
//             return res.json();
//     })

// .then(function(products) {
//         console.log(products);


//         for (data of products) {
//             console.log(data)
//             document.getElementById("items")
//                 .innerHTML += `<a href="./product.html?id=${data._id}">
//                       <article>
//                       <img
//                       src="${data.imageUrl}"
//                       alt="${data.altTxt}"/>
//                       <h3 class="productName"> ${data.name}</h3>
//                       <p class="productDescription"> ${data.description}</p>
//                       </article>
//                   </a>`;
//         }
//     })
//     // message d'erreur en cas de non réponse //
//     .catch((error) => {
//         alert(error);
//     });

// import * as uneApi from './lib/api.js';
// import uneApi2 from './lib/api.js';
import { getProducts } from './lib/api.js';

function populateProductsInPage(products) {
    const productListElement = document.querySelector("#items");

    products.forEach(product => {
        const htmlElement = populateProductInPage(product);
        productListElement.appendChild(htmlElement);
    });
}

function populateProductInPage(product) {
    const template = document.querySelector("#product_card");
    const productCardElement = document.importNode(template.content, true).querySelector('a');
    const productImg = productCardElement.querySelector('img');
    const productName = productCardElement.querySelector('.productName');
    const productDescription = productCardElement.querySelector('.productDescription');

    productCardElement.setAttribute('href', `./product.html?id=${product._id}`);
    productImg.setAttribute('src', product.imageUrl);
    productImg.setAttribute('alt', product.altTxt);
    productName.textContent = product.name;
    productDescription.textContent = product.description;

    return productCardElement
}

try {
    const products = await getProducts();
    populateProductsInPage(products);

} catch (error) {
    console.error(error);
    alert(error);
}