const apiUrl = "http://localhost:3000/api";
const productService = "products";

function getFullUrl(service, parameter = null) {
    console.log("APPEL getFullUrl", service, parameter);
    let url = `${apiUrl}/${service}`;
    if (parameter !== null) url = `${url}/${parameter}`;

    return url;
}

async function getResource(service, parameter = null) {
    console.log("APPEL getResource", service, parameter);
    const url = getFullUrl(service, parameter);
    let result = null;

    try {
        console.log(url);
        result = await fetch(url);
    } catch (error) {
        console.error(error)
        throw new Error('An error occured during get operation');
    }

    const data = result.json()
    console.log("RETOUR getResource", data);
    return data;
}

async function postResource(service, form, parameter = null) {
    const url = getFullUrl(service, parameter);
}

export async function getProducts() {
    return await getResource(productService);
}

export async function getProduct(id) {
    console.log("APPELgetProducts", id);
    if (id == undefined) {
        throw new Error('Please provide an id parameter');
    }

    const product = await getResource(productService, id);
    console.log("RETOUR getProduct", product);

    return product
}

export async function makeOrder(cart, customer) {

}