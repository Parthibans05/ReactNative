import {
    GET_PRODUCT_DETAIL,
    GET_PRODUCT_DETAIL_SUCCESS,
    GET_PRODUCT_DETAIL_FAILURE,

} from "../actionTypes/product";

export function getProductDeatils(id) {
    return {
        type: GET_PRODUCT_DETAIL,
        id
    }
}
export function getProductDetailSuccess(product) {
    return {
        type: GET_PRODUCT_DETAIL_SUCCESS,
        product
    }
}

export function getProductFailure(error) {
    return {
        type: GET_PRODUCT_DETAIL_FAILURE,
        error
    }
}

