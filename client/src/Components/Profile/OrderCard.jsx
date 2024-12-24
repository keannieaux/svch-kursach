import React, { useEffect } from 'react';
import './OrderCard.css';
import { useNavigate } from 'react-router-dom';
import orderImage from '../../img/Rectangle.png';

const OrderCard = ({ id, name, price, size, status, images = [] }) => {
  const navigate = useNavigate();
  const numericPrice = price ? (typeof price === 'number' ? price : parseFloat(price)) : null;
  const formattedPrice = numericPrice !== null && !isNaN(numericPrice) ? numericPrice.toFixed(2) : 'N/A';
  const defaultImage = 'path/to/default-image.png';
  const imageUrl = images.length > 0 ? `${process.env.REACT_APP_API_BASE_URL}/static/${images[0]}` : defaultImage;

  useEffect(() => {
    console.log("OrderCard images:", images);
    console.log("OrderCard imageUrl:", imageUrl);
    console.log("OrderCard name:", name);
    console.log("OrderCard price:", price);
    console.log("OrderCard size:", size);
  }, [images, imageUrl, name, price, size]);

  const handleError = (e) => {
    e.target.src = defaultImage;
  };


  return (
    <div className="order-card">
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="order-image" onError={handleError} />
      ) : (
        <div className="placeholder-image"></div>
      )}
      <div className="order-info">
        <div className="order-details">
          <h3 className="order-name">{name}</h3>
          <img src={orderImage} className="order-color" onError={handleError} alt="Color" />
          <div className="order-size">
            <p>Size:</p>
            <p>{size}</p>
          </div>
        </div>
        <div className="order-actions">
          <p className="order-total">${formattedPrice}</p>
          <div className="order-status">
            <p>{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
