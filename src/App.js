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
import NoMatch from './Component/NoMatch/NoMatch'
import Header from './Component/Home/Header/Header';
import ConfirmOrder from './Component/ConfirmOrder/ConfirmOrder';
import Address from './Component/Address/Address'
import Settings from './Component/Settings/Settings';
import ShopingCart from './Component/ShopingCart/ShopingCart';
import ProductDetail from './Component/ProductDetail/ProductDetail';
import Search from './Component/Home/Search/Search'
import { useState } from 'react';
import { createContext } from 'react';
import { useSelector } from 'react-redux';
import Login from './Component/Login/Login';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';

export const UserContext =  createContext ();

const App = (props) => {
  const [loggedInUser, setLoggedInUser] = useState ({name: null, email: null, password: null, image: null, mobile: null});
  const cartProduct =  props.cardData;

  return (
<div className="App">
  
     <Router>
         <div>
           <Header loggedInUser={loggedInUser}></Header>
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

             <Route path="/search">
                 <Search/>
             </Route>

             <PrivateRoute>
             <Route path="/confirmOrder">
                 <ConfirmOrder />
             </Route>
             </PrivateRoute>

             <Route path="*">
                <NoMatch />
             </Route>
      </Switch>
      </UserContext.Provider>
      </div>
      </Router>
</div>
  );
}

export default App;
