import * as actionTypes from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = ( id, qty, img, price ) =>  async (dispatch, getState) => {

    const { data } = await axios.get(`https://immense-citadel-20616.herokuapp.com/product?id=${id}`);
    
    dispatch ({
        type: actionTypes.ADD_TO_CART,
        payload: { 
            product: {
                  product: data[0].title,
                  img: data[0].img,
                  qty, 
                  id: data[0].id,
                  price: data[0].price
            }
        }
    })
 localStorage.setItem ('cart', JSON.stringify (getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispacth, getState) => {
    dispacth ({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id
    })
localStorage.setItem ('cart', JSON.stringify(getState().cart.cartItems))
}
