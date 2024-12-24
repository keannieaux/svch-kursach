import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../store/slice/productSlice';
import { addToCart } from '../../store/slice/cartSlice';
import { addToFavorites } from '../../store/slice/favoriteSlice';
import './ProductDetail.css';
import heart from '../../img/heart.png';
import imagick from '../../img/Group.png'

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading, error } = useSelector(state => state.product);
  const { user } = useSelector(state => state.auth); // Получаем информацию о пользователе из состояния auth
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.images) {
      console.log('Product Images:', product.images); // Логирование изображений продукта
    }
  }, [product]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const sizes = product.size || [];
  const colors = product.colors || [];
  const images = product.ProductImages || []; 

  const numericPrice = typeof product.price === 'number' ? product.price : parseFloat(product.price);
  const formattedPrice = !isNaN(numericPrice) ? numericPrice.toFixed(2) : 'N/A';

  const handleAddToCart = () => {
    if (selectedSize) {
      dispatch(addToCart({
        userId: user.id, 
        productId: id,
        quantity: 1,
        size: selectedSize
      }));
      window.location.reload();
    } else {
      alert('Please select a size before adding to cart');
    }
  };

  const handleAddToFavorites = () => {
    if (user && id) {
        const favoriteData = { userId: user.id, productId: id };
        console.log("Adding to favorites:", favoriteData);
        dispatch(addToFavorites(favoriteData));
        window.location.reload(); 
    } else {
        alert('User or product ID is missing');
    }
  };

  return (
    <div className='kop'> 
    <div className='kooopl'>
    <div className="product-images">
          {images.slice(0, 4).map((image, index) => (
            <img key={index} src={`${process.env.REACT_APP_API_BASE_URL}/static/${image.url}`} alt={`${product.name} ${index + 1}`} />
          ))}
        </div>
      <div className="product-detail">
        <div className="product-info-detail">
          <div className="product-header">
            <h1>{product.name}</h1>
            <button className="favorite-button" onClick={handleAddToFavorites}>
            <img src={heart} className="hrert" onError={() => console.error("Error loading image")} />
            </button>
          </div>
<img src={imagick} className="productimg" onError={() => console.error("Error loading image")} />
          <div className="product-colors">
            {colors.map((color, index) => (
              <div
                key={index}
                className="color-option"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <p className="product-description">{product.description}</p>

          <div className="size-selector">
            <h3>Size</h3>
            <div className="size-grid">
              {sizes.map(size => (
                <button
                  key={size}
                  className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="product-actions">
            <span className="price">${formattedPrice}</span>
            <button className="add-to-cart1" onClick={handleAddToCart}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductDetail;
