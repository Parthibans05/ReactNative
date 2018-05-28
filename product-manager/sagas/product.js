import {
    put,
    takeLatest
} from "redux-saga/effects";
import * as actionCreators from "../actionCreators/product";
import * as detailActionCreator from "../actionCreators/productDetails";
import * as addProductCreator from "../actionCreators/addProduct";
import * as searchProductActionCreators from "../actionCreators/search";
import { Vibration } from 'react-native';
import {
    GET_PRODUCTS, ADD_PRODUCT, GET_PRODUCT_DETAIL, SEARCH_PRODUCTS, DELETE_PRODUCT
} from "../actionTypes/product";
import { takeEvery } from "redux-saga";

let URI = "http://172.16.107.83:4000";

function vibrate() {
    Vibration.vibrate(1000);
}

function* getProducts(action) {
    try {
        let products = yield fetch(`${URI}/products?_page=${action.page}&_limit=${action.limit}`).then(r => r.json());
        yield put(actionCreators.getProductsSuccess(products))
    } catch (error) {
        yield put(actionCreators.getProductsFailure(error))
    }
}

function* getProductDetail(action) {
    try {
        let productDetail = yield fetch(`${URI}/products/${action.id}`).then(r => r.json());
        yield put(detailActionCreator.getProductDetailSuccess(productDetail))
    } catch (error) {
        yield put(detailActionCreator.getProductFailure(error))
    }
}

function* addProduct(action) {
    try {
        let product = yield fetch(`${URI}/products`, {
            body: JSON.stringify(action.product),
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
        }).then(r => r.json());
        yield put(addProductCreator.addProductSuccess(product))
    } catch (error) {
        yield put(addProductCreator.addProductFailure(error))
    }
}

function* searchProduct(action) {
    try {
        let products = yield fetch(`${URI}/products?q=${action.searchText}&_page=${action.page}&_limit=${action.limit}`).then(r => r.json());
        yield put(searchProductActionCreators.getsearchProductSuccess(products))
    } catch (error) {
        yield put(searchProductActionCreators.getsearchProductFailure(error))
    }
}

function* deleteProduct(action) {
    try {
        let product = yield fetch(`${URI}/products/${action.id}`, {
            method: 'DELETE',}).then(r => r.json());
        yield put(actionCreators.deleteProductSuccess())
        yield vibrate
    } catch (error) {
        yield put(actionCreators.deleteProductFailure(error))
    }
}



export function* productWatchers() {
    yield [takeLatest(GET_PRODUCTS, getProducts),
    takeLatest(GET_PRODUCT_DETAIL, getProductDetail),
    takeEvery(ADD_PRODUCT, addProduct),
    takeLatest(SEARCH_PRODUCTS, searchProduct),
    takeLatest(DELETE_PRODUCT, deleteProduct),]
}