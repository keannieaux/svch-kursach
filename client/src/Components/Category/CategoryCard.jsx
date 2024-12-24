import React, { useEffect } from 'react';
import './categorycard.css';

const CategoryCard = ({ title, image, onClick }) => {
  const imageUrl = `${process.env.REACT_APP_API_BASE_URL}/static/${image}`;

  useEffect(() => {
    console.log("Image URL:", imageUrl);
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => console.log("Image loaded successfully");
    img.onerror = () => console.error("Error loading image");
  }, [imageUrl]);

  return (
    <div className="category-card" onClick={onClick} style={{ backgroundImage: `url(${imageUrl})` }}>
      <h2 className="category-title">{title}</h2>
    </div>
  );
};

export default CategoryCard;
