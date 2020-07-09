import {
    GET_PRODUCTS,
    GET_PRODUCT,
    PRODUCT_ERROR,
    ADD_PRODUCT,
    DELETE_PRODUCT
} from "../actions/types";

const initialState = {
    product: null,
    products: {},
    loading: true,
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_PRODUCT:
        case ADD_PRODUCT:
            return {
                ...state,
                product: payload,
                loading: false
            }
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload,
                loading: false
            }
        case DELETE_PRODUCT:
        case PRODUCT_ERROR:
            return {
                ...state,
                product: null,
                loading: false,
                error: payload
            }
        
        default:
            return state;
    }
}