import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryCard from './CategoryCard';
import { getAllCategories, setSelectedCategoryId } from '../../store/slice/CategorySlice';
import './category.css';
import { useNavigate } from 'react-router-dom';

const CategoryGrid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, isLoading, error } = useSelector(state => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCategoryClick = (categoryId) => {
    dispatch(setSelectedCategoryId(categoryId));
    // Навигация к странице продуктов категории
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className='flexick'>
      <div className="category-grid">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.name}
            image={category.image}
            onClick={() => handleCategoryClick(category.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
