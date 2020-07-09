import {
    ADD_TO_CART,
    CART_ERROR,
    CLEAR_CART,
    DELETE_FROM_CART,
    GET_CART
} from "../actions/types";

const initialState = {
    cart: [],
    error: null,
    loading: true
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_CART:
        case ADD_TO_CART:
        case DELETE_FROM_CART:
            return {
                ...state,
                loading: false,
                cart: payload
            }
        case CLEAR_CART:
            return {
                ...state,
                loading: false,
                cart: []
            }

        case CART_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
} 