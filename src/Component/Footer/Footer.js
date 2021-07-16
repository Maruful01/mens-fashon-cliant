import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
    <section className="footer">
            <footer className="footer-component">
            <div>
                 <h5>INFORMATION</h5>
                 <p>About us</p>
                 <p>Contact Us</p>
            </div>

            <div>
                  <h5>CUSTOMER SERVICE</h5>
                  <p>Orders, Stock Availability & Pricing</p>
                  <p>Shipping & Replacement</p>
                  <p>Privacy Policy</p>
                  <p>Terms of Use</p>
            </div>

            <div>
                   <h5>CONTACT US</h5>
                   <p><i class="fas fa-map-marker-alt"></i> <span>Dhaka, Bangladesh</span></p>
                   <p><i class="fas fa-envelope-square"></i> <span>support@lotus.com</span></p>
                   <p><i class="fas fa-phone"></i> <span>+8801799827366</span></p>
            </div>
            
            </footer>
  </section>
    );
};

export default Footer;