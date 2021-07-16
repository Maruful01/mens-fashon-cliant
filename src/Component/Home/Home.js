import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Slider from './Header/Slider';
import Footer from '../Footer/Footer';
import './Home.css';
import { Spinner } from 'react-bootstrap';

const Home = (props) => {

   const spinner = "https://i.stack.imgur.com/hzk6C.gif";
    const [data, setData] = useState ([]);
    const [loading, setLoading] = useState (false);
    useEffect ( () => {
      setLoading (true);
      fetch ("https://immense-citadel-20616.herokuapp.com/products")
      .then(res => res.json())
       .then(data => setData(data))
       setTimeout (time , 2000);
    }, 
    [])

   const time = () => {
    setLoading (false);
}
    return (
        <section >
           {loading ? <div style={{marginTop: "20vh"}}> <img src={spinner} alt="" /> </div>  :
           <div>
          <Slider/>
          <div className="home">
          <div  className="cart-container">
              {
                data.map (product=> <Cart product={product} key={product._id}></Cart>)  
              }
            </div>
          </div>
          <Footer></Footer>
          </div>

        }
        </section>
    );
};

export default Home;