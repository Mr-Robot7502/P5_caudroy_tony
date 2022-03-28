const apiUrl = "http://localhost:3000/api";

// const api = {
//     getProducts2: () => {},
//     getProduct2: () => {},
//     makeOrder2: () => {},
// }

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

    return result.json();
}

async function postResource(service, form, parameter = null) {
    const url = getFullUrl(service, parameter);
}

export async function getProducts() {
    return await getResource('products');
}

export function getProduct(id) {

}

export function makeOrder(cart, customer) {

}

// export default api;