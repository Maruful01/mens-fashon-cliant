import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import './Slider.css';

const Slider = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    const img1= "https://icms-image.slatic.net/images/ims-web/a0dc6aa4-d909-454a-afd6-d4ea20867a62.jpg_1200x1200.jpg";
    const img2 ="https://icms-image.slatic.net/images/ims-web/b9546001-f40a-4ad9-8ed3-a338779a6dac.jpg";
    const img3 = "https://icms-image.slatic.net/images/ims-web/39abd2d0-6b49-4ba9-875b-5cc96c6bff60.jpg";
    const img4 = "https://static-01.daraz.com.bd/skyline/i8/4fa3d437a8824ba38c65e0bc44a1e1a4-1188-300.jpg_desktop.jpg"
    return (
        <div className="slider-container">
 <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </div>
    );
};

export default Slider;