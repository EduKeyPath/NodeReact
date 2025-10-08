import {ADD_TO_CART, UPDATE_CART, REMOVE_CART, CLEAR_CART, SET_LOADING, GET_SIMILAR_PRODUCT_LIST} from '../constants/cartConstant';

const initialsate = {cartItems : [], cartCounter : 0, showLoading : true};

export const cartReducer = (state = initialsate, action) => {
    switch(action.type){
        case ADD_TO_CART : 
            let curCartObj = {...action.payload};
            curCartObj.cartQty = 1;
            let cartPd = [...state.cartItems, curCartObj];
            let cartAc = getCartItem(cartPd);
            return {...state, cartItems: cartPd, cartCounter: cartAc}
            break;
        
        case UPDATE_CART :
            let ucPayload = action.payload;
            let list = [...state.cartItems];
            list[ucPayload.indx]['cartQty'] = ucPayload.qty;
            let cartC = getCartItem(list);
            return {...state, cartItems: list,  cartCounter: cartC }
            break;

        case REMOVE_CART : 
            let rcPayload = action.payload;
            let cList = [...state.cartItems];
            cList.splice(rcPayload, 1);
            let cartRc = getCartItem(cList);
            return {...state,  cartItems: cList, cartCounter: cartRc}
            break;

        case CLEAR_CART : 
            return {...state,  cartItems: [], cartCounter : 0}
            break;
        
        case SET_LOADING :
            return { ...state, showLoading : false }

        case GET_SIMILAR_PRODUCT_LIST : 
            let data = action.payload;
            return { ...state, similarProduct : data}
            break;
        
        default :
            return state;
    }

}

function getCartItem(cartList) {
    if(cartList.length > 0) {
        let sum = cartList.reduce((total, item) =>  {
            return total + item.cartQty
        }, 0);
        return sum;
    } else {
        return 0;
    }
}