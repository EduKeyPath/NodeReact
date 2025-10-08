import axios from 'axios';
import {ADD_TO_CART, UPDATE_CART, REMOVE_CART, CLEAR_CART, SET_LOADING, GET_SIMILAR_PRODUCT_LIST} from '../constants/cartConstant';


export const addToCart = (pd) => ({
    type : ADD_TO_CART,
    payload : pd
})

export const updateCart = (data) => ({
    type : UPDATE_CART,
    payload : data
})

export const removeCart = (data) => ({
    type : REMOVE_CART,
    payload : data
})

export const clearCart = () => ({
    type : CLEAR_CART
})

export const setLoading = () => ({
    type : SET_LOADING
})

export const similarProductList = () => {

    return (dispatch) => {
        // const apiUrl = '/data.json';
        // fetch(apiUrl)
        // .then((res) => res.json())
        // .then((data) => {
        //     console.log(data);
        //     return dispatch({type : GET_SIMILAR_PRODUCT_LIST, payload : data})
        // })
        try {
            setTimeout(async () => {
                const response = await axios.get('/data.json');
                const data = response.data.data.product;
                dispatch({type : GET_SIMILAR_PRODUCT_LIST, payload : data})
                dispatch({ type : SET_LOADING });
            }, 1000);
        } catch (error) {
            console.error(error);
            dispatch({ type : SET_LOADING });
        }
    }
}
