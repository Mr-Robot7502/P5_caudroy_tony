export function getLocalStorageKey(productId, color) {
    return `${productId}_${color}`;
}
export function getLocalStorageQuantity(productId, quantity) {
    return `${productId}_${quantity}`;

}