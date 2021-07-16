import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartAction';
import { useParams } from 'react-router-dom';
import css from'./ProductDetails.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const ProductDetail = (props) => {
    // const {img, title, price, details} = props.cardData.detailData;
    // console.log ("Props", props)
    const { pd } = useParams();
    const pdId = pd.split(':');
    pdId.toString()
    const [product, setProduct] = useState([{img: null, title: null, price: null, detail: null}]);
    useEffect (() => {
        fetch ('https://immense-citadel-20616.herokuapp.com/product?id='+pdId[1])
        .then (res => res.json())
        .then (data => setProduct (data))
    }, [pd])
    const {img, title, price, detail, _id, id, qty} = product[0];
    console.log ("product", product[0]);

    const dispacth = useDispatch ();
    const addToCartHandler = () => {
        dispacth(addToCart(id, qty, title, img,  price));
    }
    return (
        <div className="pd-component">
            <div className="pd-grid">
            <img src={img} alt="" />
            <div style={{textAlign: "left"}}>
            <h2>{title}</h2>
            <h3>৳{price}</h3>
            <div style={{fontSize: "20px"}}>Quantity    <span style={{cursor: "pointer"}}>  -  <span>0</span>  +</span> 
            <span style={{color: "tomato", marginLeft: "10px", fontWeight: "bold"}}>In stock</span></div> <br />
            <Link to="/confirmOrder"><button style={{background: "linear-gradient(-45deg, #23a6d5, #23d5ab)"}}>Buy Now</button></Link>  <button onClick={() => addToCartHandler()}>+ Add to cart</button>
            </div>
            
            </div>
             
            <p style={{textAlign: "left", color: "gray"}}>{detail}</p>
        </div>
    );
};

export default ProductDetail;