import React from 'react';
import {Link} from "react-router-dom";
import CartBody from './CartBody';
import './Cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartAction';

const ShopingCart = () => {

    const dispacth = useDispatch ();

    const addToQtyHandler = (id, qty) => {
        dispacth(addToCart(id, qty));
    }

    const removeCart = (id) => {
        dispacth(removeFromCart(id));
    }

    const cart = useSelector((state) => state.cart);

    const { cartItems } = cart; 

    const cartLength = cartItems.length > 0;



    const getCartCount = () => {
        return cartItems.reduce( (qty, item) => Number(item.product.qty) + qty, 0);
    }

    const getCartSubTotal = () => {
        return cartItems.reduce( (price, item) => Number(item.product.price) * Number(item.product.qty) + price, 0);
    }
    
       cartItems.map (data => console.log (data.product.qty))
    return (
        <section>
            {
                cartLength ?  <div className="cart-Container">

                {
                   cartItems.map (product=>  <CartBody product={product} addToQtyHandler={addToQtyHandler} removeCart={removeCart} > </CartBody>) 
                }
                <div className="total-price">
                    <h2>Subtotal {getCartCount()} items</h2>
                    <h3>Total price: {getCartSubTotal()} </h3> 
                    <Link to="/confirmOrder"> <button 
                         style={{background: "none",
                          border: "none",
                           outline: "none",
                           fontSize: "20px",
                            background: "tomato",
                            color: "white", 
                            cursor: "pointer",
                            padding: "4px 14px",
                            borderRadius: "5px"}}>
                        Order now
                    </button>
                    </Link>
                </div>
                
            </div> 
            : <div>
                 <h1 style={{color: "red", marginTop: "100px"}}>Nothing is added in the cart</h1>
                  <Link to="/"><button>Back to home</button></Link>
            </div>
            }
           
        </section>
    );
};

export default ShopingCart;