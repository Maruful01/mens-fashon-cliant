import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers ({
     cart: cartReducer
})
const middleware = [thunk];


const cartFromLocalStroage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
const INITIAL_STATE = {
     cart: {
          cartItems: cartFromLocalStroage
     }
}
const store = createStore (
       reducer,
       INITIAL_STATE,
       composeWithDevTools (applyMiddleware(...middleware))
     )

export default store;