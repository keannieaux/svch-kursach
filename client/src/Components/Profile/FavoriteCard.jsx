import React from 'react';
import './FavoriteCard.css';
import { useNavigate } from 'react-router-dom';
import imagecolor from '../../img/Rectangle.png';
import imagerec from '../../img/X.png';

const FavoriteCard = ({ _id, name, price, images = [], onRemove }) => {
  const navigate = useNavigate();
  const numericPrice = typeof price === 'number' ? price : parseFloat(price);
  const formattedPrice = !isNaN(numericPrice) ? numericPrice.toFixed(2) : 'N/A';
  const defaultImage = 'path/to/default-image.png'; // Укажите путь к стандартному изображению
  const imageUrl = images.length > 0 ? `${process.env.REACT_APP_API_BASE_URL}/static/${images[0]}` : defaultImage;

  const handleError = (e) => {
    e.target.src = defaultImage;
  };

  const handleClick = () => {
    navigate(`/product/${_id}`);
  };

  const handlePurchase = (e) => {
    e.stopPropagation();
    navigate(`/product/${_id}`);
  };

  return (
    <div className="product-card2" onClick={handleClick}>
      <img src={imageUrl} alt={name} className="product-image3" onError={handleError} />
      <div className="product-info">
        <div className="cart-product-info1">
          <button
            className="remove-button"
            onClick={(e) => {
              e.stopPropagation(); // Остановка всплытия события клика
              onRemove(_id);
            }}
          >
            <img src={imagerec} className="car-image" alt="Remove" />
          </button>
          <h3 className="product-name">{name}</h3>
          <img src={imagecolor} className="product-color" onError={handleError} alt="Color" />
        </div>
        <div className="cart-product-actions">
          <p className="product-price">${formattedPrice}</p>
          <button
            className="cart-product-buy"
            onClick={handlePurchase}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
