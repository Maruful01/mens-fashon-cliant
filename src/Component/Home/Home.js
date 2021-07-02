import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Footer from '../Footer/Footer';
import './Home.css';

const Home = (props) => {
    const [data, setData] = useState ([]);
    useEffect ( () => {
      fetch ("http://localhost:5000/products")
      .then(res => res.json())
       .then(data => setData(data))
    }, [])
    return (
        <section >
          <div style={{width: "60%", margin: "auto"}}>
          <div  className="cart-container">
              {
                data.map (product=> <Cart product={product} key={product._id}></Cart>)  
              }
            </div>
          </div>
  
         <Footer></Footer>
        </section>
    );
};

export default Home;