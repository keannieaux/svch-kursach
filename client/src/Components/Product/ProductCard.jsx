import React, { useEffect } from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import imagick from '../../img/Group.png'

const ProductCard = ({ _id, name, price, colors = [], images = [] }) => {
  const navigate = useNavigate();
  const numericPrice = typeof price === 'number' ? price : parseFloat(price);
  const formattedPrice = !isNaN(numericPrice) ? numericPrice.toFixed(2) : 'N/A';
  const imageUrl = images.length > 0 ? `${process.env.REACT_APP_API_BASE_URL}/static/${images[0].url}` : null;

  useEffect(() => {
    console.log("Image URL:", imageUrl);
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => console.log("Image loaded successfully");
    img.onerror = () => console.error("Error loading image");
  }, [imageUrl]);

  const handleClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div className='gapicki'>
          {imageUrl ? (
      <img src={imageUrl} alt={name} className="product-image1" onError={() => console.error("Error loading image")} />
    ) : (
      <div className="placeholder-image1"></div>
    )}
    <div className="product-card1" onClick={handleClick}>
      <div className="product-info1">
        <h3 className="product-name1">{name}</h3>
        <div className='colorplusprice'>
        <img src={imagick} alt={name} className="productimg" onError={() => console.error("Error loading image")} />
        <p className="product-price1">${formattedPrice}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductCard;
