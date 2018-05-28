import {
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE

} from "../actionTypes/product";


export function getProducts(page, limit) {
    return {
        type: GET_PRODUCTS,
        page,
        limit
    }
}

export function getProductsSuccess(products) {
    return {
        type: GET_PRODUCTS_SUCCESS,
        products
    }
}

export function getProductsFailure(error) {
    return {
        type: GET_PRODUCTS_FAILURE,
        error
    }
}

export function deleteProduct(id, selectedIndex) {
    return {
        type: DELETE_PRODUCT,
        id,
        selectedIndex,
    }
}

export function deleteProductSuccess(index) {
    return {
        type: DELETE_PRODUCT_SUCCESS,
        index,
    }
}

export function deleteProductFailure() {
    return {
        type: DELETE_PRODUCT_FAILURE,
    }
}


