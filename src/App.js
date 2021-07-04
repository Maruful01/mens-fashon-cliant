import logo from './logo.svg';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Component/Home/Home';
import Address from './Component/Address/Address'
import Logo from './Component/boyz.png'
import Settings from './Component/Settings/Settings';
import ShopingCart from './Component/ShopingCart/ShopingCart';
import ProductDetail from './Component/ProductDetail/ProductDetail';
import { useState } from 'react';
import { createContext } from 'react';
import { useSelector } from 'react-redux';
import Login from './Component/Login/Login';

export const UserContext =  createContext ();

const App = (props) => {
  const [loggedInUser, setLoggedInUser] = useState ({name: null, email: null, password: null, image: null, mobile: null});
  const cartProduct =  props.cardData;

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart; 

  return (
<div className="App">
  
     <Router>
         <div>
            <nav>
              <ul>
                <img className="logo" src={Logo} alt="" />
              </ul>

              <ul  className="float-right">
                 <li>
                   <Link style={{textDecoration: "none", color: "tomato"}} to="/"><i class="fas fa-home"></i></Link>
                 </li>

                 <li>
                 <Link style={{textDecoration: "none", color: "green"}} to="/cart"><i class="fas fa-shopping-cart"></i> <span 
                 style={{color: 'red', position: 'relative',top: '-15px', fontSize: '20px'}}>
                    {cartItems.length}</span></Link>

                 </li>

                 <li>
                    <Link style={{textDecoration: "none", color: "gray"}} to="/login">{loggedInUser.image ? <img style={{height: "50px", borderRadius: "50%"}} src={loggedInUser.image} alt="" /> : <i class="fas fa-user"></i>  }</Link> 
                  </li>

                 <li>
                    <Link style={{textDecoration: "none", color: "gray"}} to="/settings"><i class="fas fa-cog"></i></Link>
                  </li>
                 
              </ul>
           </nav>
           <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
       <Switch>
            <Route path="/cart">
                 <ShopingCart />
             </Route>
             <Route path="/detail/:pd">
                 <ProductDetail />
             </Route>
             <Route exact path="/">
                 <Home/>
             </Route>
             <Route path="/settings">
                 <Settings/>
             </Route>
             <Route path="/address">
                 <Address/>
             </Route>

             <Route path="/login">
                 <Login/>
             </Route>
             <Route path="*" >
                  <Home/>
             </Route>
      </Switch>
      </UserContext.Provider>
      </div>
      </Router>
</div>
  );
}

export default App;
