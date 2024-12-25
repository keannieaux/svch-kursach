import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Favorite.css';
import box from '../../img/box.png';
import heart from '../../img/heart.png';
import userimg from '../../img/user.png';
import FavoriteCard from './FavoriteCard';
import { getFavorites, removeFromFavorites } from '../../store/slice/favoriteSlice';
import { addToCart } from '../../store/slice/cartSlice';

const Favorite = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const favorites = useSelector(state => state.favorite.items);

  useEffect(() => {
    if (user && user.id) {
      dispatch(getFavorites(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    console.log("Loaded favorites:", favorites);
  }, [favorites]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleRemoveFavorite = (productId) => {
    dispatch(removeFromFavorites({ userId: user.id, productId }));
  };

  const handlePurchase = (productId) => {
    dispatch(addToCart({
      userId: user.id,
      productId,
      quantity: 1,
      size: 'M' 
    }));
  };

  return (
    <div className='opt'>
      <div className="side-buttons">
        <button className="side-button" onClick={() => handleNavigation('/profile')}><img src={userimg} alt="Profile" /></button>
        <button className="side-button" onClick={() => handleNavigation('/favorites')}><img src={heart} alt="Favorites" /></button>
        <button className="side-button" onClick={() => handleNavigation('/orders')}><img src={box} alt="Orders" /></button>
      </div>
      <div className="user-profile1">
        <div className="profile-section">
          <div className="favorites-grid">
            {favorites.length === 0 ? (
              <p>You have no favorite products.</p>
            ) : (
              favorites.map(favorite => (
                <div key={favorite.id} className="favorite-item">
                  <FavoriteCard
                    id={favorite.productId || favorite.id}
                    name={favorite.productName || "Без названия"}
                    price={favorite.productPrice || 0}
                    colors={favorite.productColors || []}
                    images={favorite.productImage ? [favorite.productImage] : []}
                    size={favorite.size || 'M'} 
                    onPurchase={handlePurchase}
                    onRemove={handleRemoveFavorite}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorite;