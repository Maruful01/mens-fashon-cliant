import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import './Cart.css';
import { UserContext } from '../../App';
import { addToCart } from '../../redux/actions/cartAction'
import { useDispatch, useSelector } from 'react-redux';


const Cart = (props) => {
     
    const [pid, setPd] = useContext (UserContext);

    let history = useHistory();
    const [ qty, setQty ] = useState (1);
    const [added, srtAdded] = useState(false);
    const {img, title, price, details, _id, id} = props.product;
    let { pd } = useParams();
   const dispacth = useDispatch ();
    const addToCartHandler = () => {
        dispacth(addToCart(id, qty, title, img,  price));
    }
    return (
         <div className="cart">
         <Link to={`/detail/:${id}`} style={{color: "black", textDecoration: "none"}}>
         {/* <img onClick={()=>props.cartFunction.addToDetailHandler({img:img, title:title, price:price,  details: details})} src={img} alt="" /> */}
         <img onClick={()=>srtAdded (false)} src={img} alt="" />
         
         <p style={{height: "45px", fontSize: "15px"}}>{title.substring(0, 50)}...</p>
         <p style={{fontSize: "20px", color: "tomato"}}>৳ {price}</p>
         </Link>
        {/* {  
            added ? <button  className="added-btn">Added</button> :
            <span onClick={()=> srtAdded(true)}> <button > Add to cart</button> </span> 
        } */}
        <button onClick={() => addToCartHandler()}> Add to cart</button>
         </div> 
    );
};

export default Cart;