import React from 'react';
import { useSelector } from 'react-redux';
import Logo from '../../boyz.png';
import Search from '../Search/Search'
import '../Home.css';
import {
    BrowserRouter as Router,
    Link,
    useHistory
  } from "react-router-dom";
import { useState } from 'react';

const Header = ({loggedInUser}) => {
  let history = useHistory();
    const [search, setSearch] = useState (false);
    const [sData, setData] = useState ([]);
    const [click, setClick] = useState (false);
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart; 

   const searchInputHandler = (e) => {
    fetch ('https://immense-citadel-20616.herokuapp.com/search?ctg=' + e.target.value) 
    .then (res => res.json())
    .then (ans => setData (ans))
   }
    return (
        <section>
         <nav>
              <ul>
                <img className="logo" src={Logo} alt="" />

                <form className="search-form" action="" method="get">
                <input type="search" onChange={searchInputHandler}  name="" id="" placeholder="Search"/>
                <button type="submit"> <i class="fas fa-search"></i> </button>
                </form>
                 
               {
                 search ?  <form className="search-form-sm" action="" method="get">
                 <input type="search" name="" onChange={searchInputHandler} id="" placeholder="Search"/>
                 <button type="submit"> <i class="fas fa-search"></i> </button>
                 </form> : ""
               }
                 {
                   search ? <button className="sm-bar" onClick={() => setSearch (false)}> <i class="fas fa-times"></i> </button> :
                   <button className="sm-bar" onClick={() => setSearch (true)}> <i class="fas fa-search"></i> </button>
                 }
  
                {/* <button className="sm-bar"> <i class="fas fa-align-justify"></i> </button> */}
                <Link style={{textDecoration: "none", color: "white"}} to="/confirmOrder"> <button className="sm-bar"><span ><i class="fas fa-user"></i>  </span></button> </Link>
               <Link style={{textDecoration: "none", color: "white"}} to="/cart"> <button className="sm-bar"> <i class="fas fa-shopping-cart"></i> <span style={{fontSize: "15px", position: "relative", top: "-15px"}}>{cartItems.length}</span> </button></Link>
              </ul>

              <ul  className="float-right">
                 {/* <li>
                   <Link style={{textDecoration: "none", color: "white"}} to="/"> <span>Home</span> <i class="fas fa-home"></i></Link>
                 </li> */}

                 <li>
                 <Link style={{textDecoration: "none", color: "white"}} to="/cart"><span 
                 style={{color: 'white', position: 'relative',top: '0px', fontSize: '18px'}}>
                   {cartItems.length} item(s)  </span><i class="fas fa-shopping-cart"></i> </Link>

                 </li>

                 <li>
                    <Link style={{textDecoration: "none", color: "white"}} to="/confirmOrder">{loggedInUser.image ? <span>My Account  <img style={{height: "30px", borderRadius: "50%"}} src={loggedInUser.image} alt="" /></span> : <span style={{fontFamily: "'Courier New', Courier, monospace"}}>My Account  <i class="fas fa-user"></i>  </span>}</Link> 
                  </li>
{/* 
                 <li>
                    <Link style={{textDecoration: "none", color: "gray"}} to="/settings"><i class="fas fa-cog"></i> {loggedInUser.email}</Link>
                  </li> */}
                 
              </ul>
           </nav>
           <div className="lower-nav">
               <ul className="ul">
                 <li>
                 <Link style={{color: "gray", textDecoration: "none"}} to="/"> <i class="fas fa-home"></i> <span>Home</span> </Link>
                 </li>
                 <li className="ctg">
                   ctg <i style={{position: "relative", top: "5px"}}class="fas fa-caret-down"></i>
                   <ul className="sub-ul">
                     <li>T-shirt</li>
                     <li>Shirt</li>
                     <li>Sunglasses</li>
                     <li>Watches</li>
                     <li>Jeans</li>
                     <li>Pant</li>
                   </ul>
                 </li>
                 <li className="contact" style={{marginTop: "6px"}}><i class="fas fa-phone"></i> +8801799827366</li>
               </ul>
           </div>
           <Search sData={sData} ></Search>
        </section>
    );
};

export default Header;