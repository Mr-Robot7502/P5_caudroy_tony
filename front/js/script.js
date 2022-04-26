import { getProducts } from './lib/api.js';

function populateProductsInPage(products) {
    const productListElement = document.querySelector("#items");
    console.log(productListElement);
    products.forEach(product => {
        const htmlElement = populateProductInPage(product);
        productListElement.appendChild(htmlElement);
        console.log(product)
        console.log(htmlElement);
    });
}

function populateProductInPage(product) {
    const template = document.querySelector("#product_card");
    const productCardElement = document.importNode(template.content, true).querySelector('a');
    const productImg = productCardElement.querySelector('img');
    const productName = productCardElement.querySelector('.productName');
    const productDescription = productCardElement.querySelector('.productDescription');
    console.log(populateProductInPage)
    productCardElement.setAttribute('href', `./product.html?id=${product._id}`);
    productImg.setAttribute('src', product.imageUrl);
    productImg.setAttribute('alt', product.altTxt);
    productName.textContent = product.name;
    productDescription.textContent = product.description;
    console.log(productCardElement)

    return productCardElement;
}

try {
    const products = await getProducts();
    populateProductsInPage(products);

} catch (error) {
    console.error(error);
    alert(error);
}