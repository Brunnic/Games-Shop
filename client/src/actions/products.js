import axios from "axios";

import {
    PRODUCT_ERROR,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCT,
    GET_PRODUCTS
} from "./types";

const config = {
    headers: {
      "Content-Type": "application/json"
    }
}

export const getProducts = () => async dispatch => {
    try {
        const result = await axios.get("/api/product/getAll", config);

        dispatch({
            type: GET_PRODUCTS,
            payload: result.data
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: err.response
        });
    }
}

export const addProduct = (data, history) => async dispatch => {

    const jsonData = JSON.stringify(data);

    try {
        const result = await axios.post("/api/product/add", jsonData, config);

        dispatch({
            type: ADD_PRODUCT,
            payload: result.data
        });

        history.push("/");

    } catch (err) {
        
        dispatch({
            type: PRODUCT_ERROR,
            payload: err.response
        });
    }
}

export const getProduct = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/product/get/${id}`, config);

        dispatch({
            type: GET_PRODUCT,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: err.response
        });
    }
}