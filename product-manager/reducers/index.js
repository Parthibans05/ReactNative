import {
    combineReducers
} from "redux";
import productReducer from "./product";
import detailReducer from "./productDetail";
import addProductReducer from "./addProduct";
import storeReducer from "./store";
import searchReducer from "./search";
import {
    createNavigationReducer
} from "react-navigation-redux-helpers";
import {AppNavigator} from "../containers/AppNavigator";


const navReducer = createNavigationReducer(AppNavigator);

const rootReducer = combineReducers({
    productState: productReducer,
    detailState: detailReducer,
    addProductState: addProductReducer,
    searchState: searchReducer,
    storeState: storeReducer,
    navState: navReducer
})

export default rootReducer;