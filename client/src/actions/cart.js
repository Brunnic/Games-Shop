import axios from "axios";

import {
    GET_CART,
    ADD_TO_CART,
    DELETE_FROM_CART,
    CLEAR_CART,
    CART_ERROR
} from "./types";

const config = {
    headers: {
      "Content-Type": "application/json"
    }
}

export const getCart = () => async dispatch => {
    try {
        const res = await axios.get("/api/cart", config);

        dispatch({
            type: GET_CART,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: CART_ERROR,
            payload: err.response
        });
    }
}

export const addToCart = (data) => async dispatch => {
    try {
        const res = await axios.post("/api/cart/additem", data, config);

        dispatch({
            type: ADD_TO_CART,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: CART_ERROR,
            payload: err.response
        });
    }
}

export const removeFromCart = (title) => async dispatch => {
    try {
        const res = await axios.delete(`/api/cart/remove/${title}`, config);

        dispatch({
            type: DELETE_FROM_CART,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: CART_ERROR,
            payload: err.response
        });
    }
}

export const clearCart = () => async dispatch => {
    try {
        const res = await axios.delete("/api/cart/clear", config);

        dispatch ({
            type: CLEAR_CART,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: CART_ERROR,
            payload: err.response
        });
    }
}