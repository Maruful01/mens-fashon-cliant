import React from 'react';
import { useForm } from 'react-hook-form';
import './ConfirmOrder.css';
import { Button, Form, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ConfirmOrder = () => {
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart; 
  let history = useHistory();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    const getCartCount = () => {
      return cartItems.reduce( (qty, item) => Number(item.product.qty) + qty, 0);
  }

  const getCartSubTotal = () => {
      return cartItems.reduce( (price, item) => Number(item.product.price) * Number(item.product.qty) + price, 0);
  }

  const onSubmit = (data) => {
    console.log (data);
    alert ("Your order is successfully submitted.")
    console.log (cartItems);
    history.push("/");
  };
    return (
        <div className="address">
             <Form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
                   {cartItems.map (data => 
            <div className="shopping-cart">
            <img src={data.product.img} alt="" />
            <div>
            <p   >{data.product.product}</p>

            <p>Qty: {data.product.qty}</p>
            <p>price: {data.product.price}</p>
            </div>

            <div>
            
            </div>

        </div> )}

                   <p style={{color: "gray"}}>Subtotal {getCartCount()} items</p>
                    <p style={{color: "gray"}}>Total price: {getCartSubTotal()} </p> 
                   <h3 style={{marginLeft: "5px", color: "gray"}}>Sign Up</h3>
                    <Form.Group controlId="exampleForm.ControlInput1">  
                    <Form.Label>Email</Form.Label>
                    <Form.Control {...register("email")} type="email" required placeholder="name@example.com" />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlInput1">  
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control {...register("phone")} type="phone" required placeholder="+8801799827366" />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlInput1">  
                    <Form.Label>District</Form.Label>
                    <Form.Control {...register("district")} type="text" required placeholder="Dhaka" />
                    </Form.Group>

                  <Form.Group controlId="exampleForm.ControlTextarea1">
                   <Form.Label>Your Address</Form.Label>
                   <Form.Control {...register("address")} as="textarea" required rows={3}  />
                   </Form.Group>

                   <Col xs="auto">
                    <Form.Check
                      {...register("payment")}
                      type="checkbox"
                      id="autoSizingCheck"
                      className="mb-2"
                      label="Cash on delivery"
                    />
                  </Col>
                  <button className="submit-btn" type="submit">Confirm order</button>
               </Form>
        </div>
    );
};

export default ConfirmOrder;