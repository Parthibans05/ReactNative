import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE
} from "../actionTypes/product";

const initialState = {
    isLoading: false,
    ProductAddedFlag: false,
};

export default (prevState = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...prevState,
                isLoading: true,
                ProductAddedFlag: false,
            }
        case ADD_PRODUCT_SUCCESS:
            return {
                ...prevState,
                isLoading: false,
                ProductAddedFlag: true,
            }
        case ADD_PRODUCT_FAILURE:
            return {
                ...prevState,
                isLoading: false,
                ProductAddedFlag: false,
                error: action.error
            }
        default:
            return prevState;

    }
}