import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Cart.css';

const CartBody = (props) => {

    const {product, id, img, price, qty} = props.product.product;
    return (
        
        <div className="shopping-cart">
            <img src={img} alt="" />
            <div>
            <p>{product}</p>
            <p>Price: ${price * qty}</p>
            </div>
             <p>Qty 
                 <select value={qty}  onChange={(e) => props.addToQtyHandler(id, e.target.value)} name="" id="">
                     <option>1</option>
                     <option>2</option>
                     <option>3</option>
                     <option>4</option>
                     <option>5</option>
                     <option>6</option>
                     <option>7</option>
                     <option>8</option>
                     <option>9</option>
                     <option>10</option>
                 </select>
             </p>
            <div>
            <button onClick={() => props.removeCart(id)} className="remove-btn">
            <i class="fas fa-times"></i>
            </button>
            </div>

        </div>
    );
};

export default CartBody;