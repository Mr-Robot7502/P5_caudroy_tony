const apiUrl = "http://localhost:3000/api";
const productService = "products";

function getFullUrl(service, parameter = null) {
    let url = `${apiUrl}/${service}`;
    if (parameter !== null) url = `${url}/${parameter}`;

    return url;
}

async function getResource(service, parameter = null) {
    const url = getFullUrl(service, parameter);
    let result = null;

    try {
        result = await fetch(url);
    } catch (error) {
        console.error(error)
        throw new Error('An error occured during get operation');
    }

    const data = result.json()
    return data;
}

async function postResource(service, form, parameter = null) {
    const url = getFullUrl(service, parameter);
}

export async function getProducts() {
    return await getResource(productService);
}

export async function getProduct(id) {
    if (id == undefined) {
        throw new Error('Please provide an id parameter');
    }

    const product = await getResource(productService, id);

    return product
}

export async function makeOrder(cart, customer) {

}