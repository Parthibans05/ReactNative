import {
    SEARCH_PRODUCTS,
    GET_SEARCH_PRODUCTS_SUCCESS,
    GET_SEARCH_PRODUCTS_FAILURE,
        
} from "../actionTypes/product";

export function searchProduct(page, limit, searchText) {
    return {
        type: SEARCH_PRODUCTS,
        searchText,
        page,
        limit,
        
    }
}

export function getsearchProductSuccess(products) {
    return {
        type: GET_SEARCH_PRODUCTS_SUCCESS,
        products,
    }
}

export function getsearchProductFailure(error) {
    return {
        type: GET_SEARCH_PRODUCTS_FAILURE,
        error
    }
}
